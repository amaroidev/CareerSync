import { PageTransition } from "@/components/shared/PageTransition";
import { Link } from "wouter";

export default function Terms() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground max-w-3xl mb-6">
          These terms govern your use of CareerSync. Use of the platform indicates
          acceptance of these terms. This page provides a summary; the full legal
          text will be available soon.
        </p>
        <Link href="/contact">Contact legal</Link>
      </div>
    </PageTransition>
  );
}
