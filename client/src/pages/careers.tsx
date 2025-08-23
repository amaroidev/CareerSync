import { PageTransition } from "@/components/shared/PageTransition";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Careers() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-4">Careers at CareerSync</h1>
        <p className="text-muted-foreground max-w-3xl mb-6">
          We're building tools to help millions of students and professionals
          succeed. If you're passionate about education technology, AI-driven
          products, or developer tools, we'd love to hear from you.
        </p>

        <h2 className="text-xl font-semibold mb-3">Open positions</h2>
        <ul className="space-y-4 mb-6">
          <li className="p-4 rounded-lg border bg-card">No open roles yet — please check back soon or email <a href="mailto:jobs@careersync.example" className="text-primary">jobs@careersync.example</a></li>
        </ul>

        <div className="mt-6">
          <Link href="/contact">
            <Button variant="outline">Contact hiring team</Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
