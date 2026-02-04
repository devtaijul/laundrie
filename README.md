# Nexaas - Nextjs SaaS Starter

## Technical Specification

### 1. System Architecture

#### 1.1 Technology Stack

- **Frontend**: Next.js 15 (App Router)
- **Backend**: Next.js Server Actions + API Routes
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Lucia Auth
- **State Management**: Tanstack Query + Server Actions
- **UI Components**: Shadcn/ui + Tailwind CSS
- **File Storage**: Amazon S3
- **Deployment**: Vercel (Frontend/Backend) + Supabase (Database)
- **Validation**: Zod
- **Testing**: Vitest + Testing Library

#### 1.2 Core Modules

1. User Management & Authentication
2. Organization Management
3. Inventory Management
4. Purchase Management
5. Sales Management
6. Financial Management
7. HR Management
8. Reporting & Analytics

### 2. Frontend Implementation

#### 2.1 Route Structure

```
app/
├── (auth)/
│   ├── login/
│   └── register/
├── (dashboard)/
│   ├── inventory/
│   ├── sales/
│   ├── purchases/
│   ├── finance/
│   └── reports/
└── layout.tsx
```

#### 2.2 Component Architecture

Components folder structure

```
components/
├── ui/          // Reusable UI components
├── inventory/   // Module-specific components
├── sales/
├── shared/      // Shared business components
└── forms/       // Form components
```

### 3. Authentication & Authorization

#### 3.1 Auth Schema

```typescript
// db/schema/auth.ts
import { pgTable, text, bigint } from "drizzle-orm/pg-core";
import { users } from "./app";

export const authUser = pgTable("auth_user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  activeOrganizationId: text("active_organization_id"),
  // other user attributes
});

export const authSession = pgTable("user_session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => authUser.id),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
});

export const authKey = pgTable("user_key", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => authUser.id),
  hashedPassword: text("hashed_password"),
});

// Types
export type AuthUser = typeof authUser.$inferSelect;
export type NewAuthUser = typeof authUser.$inferInsert;
```

### 5.2 Lucia Auth Configuration

```typescript
// auth/lucia.ts
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { pg } from "@lucia-auth/adapter-postgresql";
import { pool } from "@/lib/db/pool";
import { db } from "@/lib/db";
import { users, organizations, organizationMembers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";
import * as context from "next/headers";

/**
 * We need to import specific next/headers to work with middleware
 * instead of relying on the global `cookies()` function
 */
const { cookies, headers } = context;

/**
 * Initialize Lucia Auth with PostgreSQL adapter
 * This is the main configuration for Lucia Auth
 */
export const auth = lucia({
  env: process.env.NODE_ENV === "production" ? "PROD" : "DEV", // "PROD" if deployed to HTTPS
  middleware: nextjs_future(),
  sessionCookie: {
    // This sets the session cookie attributes
    expires: false, // Session cookies that expire when the browser is closed
    attributes: {
      // Additional cookie attributes
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // CSRF protection
    },
  },
  adapter: pg(pool, {
    // Table names for Lucia Auth
    user: "users", // Using the merged users table
    session: "user_session",
    key: "user_key",
  }),
  getUserAttributes: async (data) => {
    // Get user data with organization context
    const user = await db.query.users.findFirst({
      where: eq(users.id, data.id),
      with: {
        activeOrganization: true,
        organizations: {
          with: {
            organization: true,
          },
        },
      },
    });

    return {
      email: data.email,
      name: user?.name,
      activeOrganizationId: user?.activeOrganizationId,
      activeOrganization: user?.activeOrganization,
      organizations: user?.organizations,
    };
  },
});

export type Auth = typeof auth;

/**
 * Cache the auth request to prevent multiple database queries
 * This is important for performance in server components
 */
export const getPageSession = cache(async () => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});

/**
 * Helper to validate session in Server Actions and API Routes
 * This is separate from getPageSession as it needs to handle
 * different types of requests
 */
export async function validateRequest(
  request: Request,
  requireOrganization = true
) {
  const authRequest = auth.handleRequest(request);
  const session = await authRequest.validate();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (requireOrganization && !session.user.activeOrganizationId) {
    throw new Error("No active organization");
  }

  return session;
}

/**
 * Helper to get organization members with roles
 * This is useful for checking permissions
 */
export async function getOrganizationMembers(organizationId: string) {
  return db.query.organizationMembers.findMany({
    where: eq(organizationMembers.organizationId, organizationId),
    with: {
      user: true,
    },
  });
}

/**
 * Helper to check if user has required role in organization
 */
export async function validateRole(
  userId: string,
  organizationId: string,
  roles: string[]
) {
  const member = await db.query.organizationMembers.findFirst({
    where: eq(organizationMembers.userId, userId),
    and: eq(organizationMembers.organizationId, organizationId),
  });

  if (!member || !roles.includes(member.role)) {
    throw new Error("Unauthorized: Invalid role");
  }

  return member;
}

/**
 * Helper to handle auth errors
 */
export function handleAuthError(error: unknown): never {
  if (error instanceof Error) {
    throw new Error(`Authentication error: ${error.message}`);
  }
  throw new Error("Authentication error");
}

// Types for auth context
interface OrganizationData {
  id: string;
  name: string;
  subscriptionStatus: string;
}

interface OrganizationMemberData {
  id: string;
  role: string;
  organization: OrganizationData;
}

// Update Lucia namespace for better type inference
declare namespace Lucia {
  type Auth = import("./lucia").Auth;
  type DatabaseUserAttributes = {
    email: string;
    name: string | null;
    activeOrganizationId: string | null;
    activeOrganization: OrganizationData | null;
    organizations: OrganizationMemberData[];
  };
  type DatabaseSessionAttributes = {};
}
```

This implementation includes:

1. Proper session cookie configuration
2. Organization context in user attributes
3. Cached session validation for server components
4. Request validation for server actions and API routes
5. Organization member and role validation
6. Error handling utilities
7. Proper TypeScript types

Usage examples:

```typescript
// In Server Component
export default async function Page() {
  const session = await getPageSession();
  if (!session) redirect("/login");

  return <div>Hello {session.user.name}</div>;
}

// In Server Action
export async function createItem(data: ItemData) {
  try {
    const session = await validateRequest(request);
    // Your logic here
  } catch (error) {
    handleAuthError(error);
  }
}

// In API Route
export async function GET(request: Request) {
  try {
    const session = await validateRequest(request);
    const members = await getOrganizationMembers(
      session.user.activeOrganizationId!
    );
    return Response.json(members);
  } catch (error) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// Role validation
export async function adminAction(data: AdminData) {
  const session = await validateRequest(request);
  await validateRole(session.user.id, session.user.activeOrganizationId!, [
    "OWNER",
    "ADMIN",
  ]);
  // Your admin logic here
}
```

### 5.3 Authentication Actions

```typescript
// app/actions/auth.ts
import { auth } from "@/auth/lucia";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { organizations, organizationMembers } from "@/db/schema";
import { authUser } from "@/db/schema/auth";

export async function login(email: string, password: string) {
  try {
    const key = await auth.useKey("email", email, password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    const sessionCookie = auth.createSessionCookie(session);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return session;
  } catch (e) {
    throw new Error("Invalid credentials");
  }
}

export async function signup(
  email: string,
  password: string,
  name: string,
  organizationName: string
) {
  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  // Create user and organization in a transaction
  return await db.transaction(async (tx) => {
    // Create user with merged schema
    await tx.insert(users).values({
      id: userId,
      email,
      name,
      hashedPassword,
    });

    // Create organization
    const [organization] = await tx
      .insert(organizations)
      .values({
        name: organizationName,
        subscriptionStatus: "TRIAL",
      })
      .returning();

    // Create organization membership
    await tx.insert(organizationMembers).values({
      userId,
      organizationId: organization.id,
      role: "OWNER",
      isDefault: true,
    });

    // Update user with active organization
    await tx
      .update(users)
      .set({ activeOrganizationId: organization.id })
      .where(eq(users.id, userId));

    // Create auth key
    await auth.createKey({
      userId,
      providerId: "email",
      providerUserId: email,
      password: hashedPassword,
    });

    // Create session
    const session = await auth.createSession({
      userId,
      attributes: {},
    });

    const sessionCookie = auth.createSessionCookie(session);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return session;
  });
}

export async function logout() {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (!session) {
    throw new Error("No session found");
  }
  await auth.invalidateSession(session.sessionId);
  const sessionCookie = auth.createSessionCookie(null);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
```

### 5.4 Middleware

```typescript
// middleware.ts
import { auth } from "@/auth/lucia";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const authRequest = auth.handleRequest(request);
  const session = await authRequest.validate();
  const path = request.nextUrl.pathname;

  // Public routes
  if (path === "/" || path.startsWith("/auth")) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protected routes
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Organization required routes
  if (path.startsWith("/dashboard") && !session.user.activeOrganizationId) {
    return NextResponse.redirect(new URL("/auth/setup", request.url));
  }

  // Admin routes
  if (
    path.startsWith("/admin") &&
    !session.user.organizations.some(
      (org) => org.role === "OWNER" || org.role === "ADMIN"
    )
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

### 5.5 Types

```typescript
// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./auth/lucia").Auth;
  type DatabaseUserAttributes = {
    email: string;
    name: string | null;
    activeOrganizationId: string | null;
    activeOrganization: {
      id: string;
      name: string;
      subscriptionStatus: string;
    } | null;
    organizations: Array<{
      id: string;
      role: string;
      organization: {
        id: string;
        name: string;
        subscriptionStatus: string;
      };
    }>;
  };
  type DatabaseSessionAttributes = {};
}
```

## 6. Data Fetching & State Management

### 6.1 Server-Side Data Fetching

```typescript
// app/(dashboard)/sales/page.tsx
import { db } from "@/lib/db";
import { sales } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function SalesPage() {
  const session = await auth();

  const salesData = await db.query.sales.findMany({
    where: eq(sales.organizationId, session.user.organizationId),
    with: {
      items: true,
      customer: true,
    },
  });

  return <SalesOverview sales={salesData} />;
}
```

### 6.2 Client-Side Data Fetching

```typescript
// hooks/useSales.ts
export function useSales(filters: SaleFilters) {
  const queryKey = ["sales", filters];

  return useQuery({
    queryKey,
    queryFn: () => fetchSalesData(filters),
    staleTime: 1000 * 60, // 1 minute
  });
}
```

## 7. Multi-tenancy Implementation

### 7.1 Database Strategy

- Each organization has a unique ID
- All tables include organizationId
- Database queries filtered by organizationId
- Drizzle middleware for automatic filtering

### 7.2 Drizzle Multi-tenancy Implementation

```typescript
// lib/db/index.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { type Session } from "lucia";
import * as schema from "@/db/schema";

// Initialize connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Create a type for our database instance with session context
export type DbContext = {
  session: Session | null;
};

// Create the database instance with schema
export const db = drizzle(pool, { schema });

// Higher-order function to create queries with organization context
export function withOrganization<T>(
  session: Session | null,
  queryFn: (db: typeof db) => Promise<T>
): Promise<T> {
  if (!session?.user?.organizationId) {
    throw new Error("Unauthorized: No organization context");
  }
  return queryFn(db);
}

// Utility function to handle database errors
export function handleDbError(error: unknown) {
  console.error("Database error:", error);
  throw new Error("An error occurred while accessing the database");
}

// Example repository pattern implementation
export const productsRepository = {
  async findMany(session: Session | null) {
    return withOrganization(session, async (db) => {
      try {
        return await db.query.products.findMany({
          where: eq(
            schema.products.organizationId,
            session.user.organizationId
          ),
          with: {
            category: true,
          },
        });
      } catch (error) {
        handleDbError(error);
      }
    });
  },

  async create(session: Session | null, data: NewProduct) {
    return withOrganization(session, async (db) => {
      try {
        const [product] = await db
          .insert(schema.products)
          .values({
            ...data,
            organizationId: session.user.organizationId,
          })
          .returning();
        return product;
      } catch (error) {
        handleDbError(error);
      }
    });
  },
};
```

This implementation provides several benefits:

1. Type Safety: Proper TypeScript types for database context
2. Security: Organization context is enforced at the database access layer
3. Reusability: Common pattern for all database queries
4. Maintainability: Centralized organization filtering logic
5. Performance: No query string manipulation, uses proper SQL parameters

The `withOrganization` higher-order function ensures that:

- All queries have proper organization context
- Unauthorized access is prevented at the database layer
- Organization ID is properly typed and validated
- Query composition remains flexible and type-safe

## 8. Subscription & Billing

### 8.1 Stripe Integration

```typescript
// app/api/webhook/stripe/route.ts
export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "customer.subscription.updated":
        await handleSubscriptionUpdate(event.data.object);
        break;
      // Handle other events
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Webhook error: " + error.message, { status: 400 });
  }
}
```

## 9. Deployment & DevOps

### 9.1 Vercel Configuration

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "DATABASE_URL": "@database_url",
    "NEXTAUTH_SECRET": "@nextauth_secret",
    "STRIPE_SECRET_KEY": "@stripe_secret_key"
  }
}
```

### 9.2 GitHub Actions Workflow

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "20"
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
          vercel-args: "--prod"
```

## 10. Security Considerations

### 10.1 Security Headers

```typescript
// next.config.js
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};
```

### 10.2 Rate Limiting

```typescript
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for");

  // Implement your own rate limiting logic here
  // You can use any solution that fits your needs

  // Handle request
}
```

## 11. Performance Optimization

### 11.1 Image Optimization

```typescript
// next.config.js
module.exports = {
  images: {
    domains: ["your-s3-bucket.amazonaws.com"],
    formats: ["image/avif", "image/webp"],
  },
};
```

### 11.2 Caching Strategy

```typescript
// app/api/products/route.ts
export async function GET() {
  const products = await db.query.products.findMany();

  return new Response(JSON.stringify(products), {
    headers: {
      "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
    },
  });
}
```

## 12. Testing Strategy

### 12.1 Unit Tests

```typescript
// __tests__/api/products.test.ts
import { createProduct } from "@/app/actions/inventory";
import { db } from "@/lib/db";
import { products } from "@/db/schema";

describe("Product API", () => {
  beforeEach(async () => {
    await db.delete(products);
  });

  it("creates a product successfully", async () => {
    const product = await createProduct({
      name: "Test Product",
      price: 99.99,
      quantity: 10,
    });

    expect(product).toHaveProperty("id");
    expect(product.name).toBe("Test Product");
  });
});
```

### 12.2 Integration Tests

```typescript
// __tests__/api/products.test.ts
import { createProduct } from "@/app/actions/inventory";
import { db } from "@/lib/db";
import { products } from "@/db/schema";

describe("Product API", () => {
  beforeEach(async () => {
    await db.delete(products);
  });

  it("creates a product successfully", async () => {
    const product = await createProduct({
      name: "Test Product",
      price: 99.99,
      quantity: 10,
    });

    expect(product).toHaveProperty("id");
    expect(product.name).toBe("Test Product");
  });
});
```

## 13. Error Handling

### 13.1 Global Error Handler

```typescript
// app/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2>Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}
```

### 13.2 API Error Handling

```typescript
// lib/errors.ts
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 400,
    public code: string = "API_ERROR"
  ) {
    super(message);
    this.name = "API_ERROR";
  }
}

// Example usage in API route
export async function GET(req: Request) {
  try {
    // Your API logic here
    throw new APIError("Invalid request", 400, "INVALID_REQUEST");
  } catch (error) {
    if (error instanceof APIError) {
      return new Response(
        JSON.stringify({
          error: error.message,
          code: error.code,
        }),
        { status: error.statusCode }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        code: "INTERNAL_ERROR",
      }),
      { status: 500 }
    );
  }
}
```

### 13.3 Server Actions Error Handling

```typescript
// lib/errors.ts
export class ServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SERVER_ERROR";
  }
}

// app/actions/inventory.ts
export async function createProduct(data: NewProduct) {
  try {
    // Your logic here
  } catch (error) {
    throw new ServerError("Failed to create product");
  }
}
```

### 13.4 Database Error Handling

```typescript
// lib/errors.ts
export class DBError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = "DB_ERROR";
    this.originalError = originalError;
  }
}

// Example database error handling in server actions:
// app/actions/inventory.ts
export async function createProduct(data: NewProduct) {
  try {
    const product = await db.insert(products).values(data).returning();
    return product;
  } catch (error) {
    throw new DBError("Failed to create product", error);
  }
}
```

## 14. Getting Started

### 14.1 Prerequisites

- Node.js 20.x or later
- PostgreSQL 14.x or later
- AWS Account (for S3)
- Stripe Account

### 14.2 Installation

```bash
# Clone repository
git clone https://github.com/raikusy/next-15-saas.git

# Install dependencies
pnpm install

# Set up environment variables
cp env.example .env.local

# Run postgres with docker compose
docker compose up -d

# Run database migrations
pnpm run db:push

# Start development server
pnpm run dev
```

### 15.3 Environment Variables

```bash
# .env.example
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/zia

# AWS S3
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=your-aws-region
AWS_BUCKET_NAME=your-bucket-name

# Stripe
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# Auth Encryption
ENCRYPTION_KEY=MTIzNDU2Nzg5MDEyMzQ1Ng==
```
