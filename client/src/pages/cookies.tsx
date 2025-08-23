import { PageTransition } from "@/components/shared/PageTransition";
import { Link } from "wouter";

export default function Cookies() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
        <p className="text-muted-foreground max-w-3xl mb-6">
          Our site uses cookies to enhance your experience. This page explains
          which cookies we use and why. You can contact us to request cookie
          controls or more details.
        </p>
        <Link href="/contact">Cookie controls & contact</Link>
      </div>
    </PageTransition>
  );
}
