import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Target, TrendingUp, Compass } from "lucide-react";

export default function Landing() {
  const features = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Unified Opportunity Discovery",
      description: "Search jobs, scholarships, and internships in one place with AI-powered matching."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Application Tracking",
      description: "Kanban-style board to track your applications from saved to accepted."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Profile Management",
      description: "Comprehensive profile with academic, professional, and document management."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Smart Analytics",
      description: "Track your progress and get insights to improve your application success rate."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Compass className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">CareerSync</h1>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your comprehensive platform for career and education opportunities. 
            Discover, track, and succeed in your professional journey.
          </p>
          <Button 
            size="lg" 
            className="px-8 py-6 text-lg"
            onClick={() => window.location.href = '/api/login'}
            data-testid="button-login"
          >
            Get Started - Sign In
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose CareerSync?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">For Students & Job Seekers</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Find opportunities tailored to your profile and goals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Never miss a deadline with smart notifications</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Organize applications with our intuitive tracking system</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Build a comprehensive profile showcasing your achievements</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Platform Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Universal search across jobs and scholarships</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Drag-and-drop application status management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Secure document storage and management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Progress tracking and analytics dashboard</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Sync Your Career?</h2>
          <p className="text-gray-600 mb-6">
            Join thousands of students and professionals who are advancing their careers with CareerSync.
          </p>
          <Button 
            size="lg" 
            className="px-8 py-4"
            onClick={() => window.location.href = '/api/login'}
            data-testid="button-cta-login"
          >
            Start Your Journey Today
          </Button>
        </div>
      </div>
    </div>
  );
}
