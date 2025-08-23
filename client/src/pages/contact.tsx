import { PageTransition } from "@/components/shared/PageTransition";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Contact() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-4">Contact</h1>
        <p className="text-muted-foreground max-w-2xl mb-6">Have questions or need support? Reach out to us via the contact form or email:</p>
        <p className="mb-4">Email: <a href="mailto:hello@careersync.example" className="text-primary">hello@careersync.example</a></p>
        <p className="mb-6">If you'd like to report a bug or request a feature, include as much detail as possible and we'll respond shortly.</p>

        <Link href="/signup">
          <Button>Start with a free account</Button>
        </Link>
      </div>
    </PageTransition>
  );
}
