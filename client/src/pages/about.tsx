import { PageTransition } from "@/components/shared/PageTransition";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-4">About CareerSync</h1>
        <p className="text-muted-foreground max-w-3xl mb-6">
          CareerSync is a unified platform for job and scholarship discovery,
          application tracking, and career development. Our mission is to make the
          search and application process simple, transparent, and productive for
          students and professionals worldwide.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">What we build</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
          <li>Unified Dashboard with deadlines and opportunity recommendations</li>
          <li>Universal Search across jobs, internships, and scholarships</li>
          <li>Kanban-style Application Board and productivity tools</li>
          <li>Profile & Document Hub with secure storage and versions</li>
          <li>AI-powered matching and analytics to improve success rates</li>
        </ul>

        <div className="mt-8">
          <Link href="/signup">
            <Button size="lg">Create your free account</Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
