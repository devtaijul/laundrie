import "dotenv/config";

import { createHash } from "crypto";
import { prisma } from "./src/lib/prisma";
import { Role, TypeOfUse } from "./src/generated/prisma";

function generateRandomPart(length = 8) {
  return Math.random()
    .toString(36)
    .slice(2, 2 + length)
    .toUpperCase();
}

async function generateUniqueReferralCode(prefix: "10" | "20") {
  while (true) {
    const code = `${prefix}-${generateRandomPart()}`;

    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ tenDollarCode: code }, { twentyDollarCode: code }],
      },
      select: { id: true },
    });

    if (!existing) return code;
  }
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

async function clearDatabase() {
  console.log("🧹 Clearing database...");

  // Delete in child -> parent order to avoid FK conflicts.
  await prisma.orderEvent.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.review.deleteMany();
  await prisma.order.deleteMany();

  await prisma.giftCardRedemption.deleteMany();
  await prisma.giftCard.deleteMany();
  await prisma.referral.deleteMany();

  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();

  await prisma.website.deleteMany();
  await prisma.paymentSetting.deleteMany();
  await prisma.security.deleteMany();
  await prisma.adminNotification.deleteMany();
  await prisma.emailConfiguration.deleteMany();
  await prisma.sMSConfiguration.deleteMany();
  await prisma.authSetting.deleteMany();
  await prisma.customerNotification.deleteMany();
  await prisma.business.deleteMany();

  await prisma.user.deleteMany();

  console.log("✅ Database cleared.");
}

async function seedAdminAndSettings() {
  const adminEmail = "laundrie.nl@hotmail.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "Admin@123";
  const defaultGoogleClientId = process.env.SEED_GOOGLE_CLIENT_ID ?? "";
  const defaultGoogleClientSecret = process.env.SEED_GOOGLE_CLIENT_SECRET ?? "";

  const tenDollarCode = await generateUniqueReferralCode("10");
  const twentyDollarCode = await generateUniqueReferralCode("20");

  const adminUser = await prisma.user.create({
    data: {
      name: "Platform Admin",
      firstName: "Platform",
      lastName: "Admin",
      email: adminEmail,
      phone: "+31000000000",
      role: Role.ADMIN,
      useType: TypeOfUse.BUSINESS,
      marketing: false,
      notifications: true,
      isOver65: false,
      tenDollarCode,
      twentyDollarCode,
      passwordHash: hashToken(adminPassword),
      theme: "SYSTEM",
    },
  });

  console.log(`👤 Admin created: ${adminUser.email}`);

  const business = await prisma.business.create({
    data: {
      business_name: "Laundrie",
      business_email: "laundrie.nl@hotmail.com",
      phone: "+31000000000",
      whatsapp_number: "+31000000000",
      business_address: "Example Street 1",
      city: "Amsterdam",
      state: "Noord-Holland",
      zip_code: "1000AA",
      logo_url: "https://dummyimage.com/160x160/0f172a/ffffff.png&text=L",
      favicon_url: "https://dummyimage.com/64x64/0f172a/ffffff.png&text=L",
      description: "Default Laundrie business configuration",
    },
  });

  const paymentSetting = await prisma.paymentSetting.create({
    data: {
      cash_on_delivery: true,
      credit_devit: true,
      digital_wallet: true,
      bank_transfer: true,
      stripe_publishable_key: process.env.STRIPE_PUBLISHABLE_KEY ?? null,
      stripe_secret_key: process.env.STRIPE_SECRET_KEY ?? null,
    },
  });

  const security = await prisma.security.create({
    data: {
      two_factor_auth: false,
      session_timeout: 1800,
      max_login_attempts: 5,
      enable_ip_whitelist: false,
      ip_whitelist: [],
    },
  });

  const adminNotification = await prisma.adminNotification.create({
    data: {
      new_orders: true,
      customer_reviews: true,
      support_tickets: true,
    },
  });

  const emailConfiguration = await prisma.emailConfiguration.create({
    data: {
      host: "smtp.mailtrap.io",
      port: 2525,
      username: "smtp-username",
      password: "smtp-password",
      from: "no-reply@laundrie.local",
      name: "Laundrie",
    },
  });

  const smsConfiguration = await prisma.sMSConfiguration.create({
    data: {
      provider: "twilio",
      api_key: "twilio-api-key",
      auth_token: "twilio-auth-token",
      from_number: "+31000000000",
    },
  });

  const authSetting = await prisma.authSetting.create({
    data: {
      google_client_id: defaultGoogleClientId,
      google_client_secret: defaultGoogleClientSecret,
    },
  });

  const customerNotification = await prisma.customerNotification.create({
    data: {
      order_confirmation_email: true,
      driver_id_orders: true,
      order_completed_email: true,
      promotional_message: false,
    },
  });

  const website = await prisma.website.create({
    data: {
      businessId: business.id,
      payment_settings_id: paymentSetting.id,
      security_id: security.id,
      notification_id: adminNotification.id,
      email_config_id: emailConfiguration.id,
      sms_config_id: smsConfiguration.id,
      auth_setting_id: authSetting.id,
      customer_notification_id: customerNotification.id,
    },
  });

  console.log(`🌐 Website settings created: ${website.id}`);
  console.log(
    `🔐 Admin login -> email: ${adminEmail} | password: ${adminPassword}`,
  );
  console.log(
    `🔑 Google seed credentials -> clientId: ${defaultGoogleClientId ? "configured" : "empty"}, clientSecret: ${defaultGoogleClientSecret ? "configured" : "empty"}`,
  );
}

async function main() {
  await clearDatabase();
  await seedAdminAndSettings();
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
