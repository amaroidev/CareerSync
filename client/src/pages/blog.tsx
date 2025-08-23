import { PageTransition } from "@/components/shared/PageTransition";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Blog() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground max-w-3xl mb-6">Read our latest articles on career development, job search strategies, and product updates.</p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border bg-card">No posts yet — coming soon.</div>
        </div>

        <div className="mt-6">
          <Link href="/signup">
            <Button>Get started and follow our updates</Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
