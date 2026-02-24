"use client";

import ClientLayout from "@/components/ClientLayout";
import Collection from "@/components/Collection";

export default function CollectionPage() {
  return (
    <ClientLayout>
      <div className="pt-16">
        <Collection />
      </div>
    </ClientLayout>
  );
}
