import { PageTransition } from "@/components/shared/PageTransition";
import { Link } from "wouter";

export default function Privacy() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground max-w-3xl mb-6">
          We take your privacy seriously. This page provides an overview of how
          we collect, use, and protect your data. For full details, please refer
          to the complete policy text (coming soon).
        </p>
        <Link href="/contact">Contact our privacy team</Link>
      </div>
    </PageTransition>
  );
}
