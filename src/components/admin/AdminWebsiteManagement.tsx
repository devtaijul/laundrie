"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogManagement } from "@/components/admin/website/BlogManagement";
import { FAQManagement } from "@/components/admin/website/FAQManagement";
import { LandingPageManagement } from "@/components/admin/website/LandingPageManagement";

export default function AdminWebsiteManagement() {
  const [activeTab, setActiveTab] = useState("blog");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Website Management
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your website content, pricing, and promotions
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-transparent border-b border-border rounded-none h-auto p-0 w-full justify-start">
          <TabsTrigger
            value="blog"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2.5"
          >
            Blog
          </TabsTrigger>
          <TabsTrigger
            value="faq"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2.5"
          >
            FAQ
          </TabsTrigger>
          <TabsTrigger
            value="landing"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2.5"
          >
            Landing Page
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blog" className="mt-6">
          <BlogManagement />
        </TabsContent>

        <TabsContent value="faq" className="mt-6">
          <FAQManagement />
        </TabsContent>

        <TabsContent value="landing" className="mt-6">
          <LandingPageManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
