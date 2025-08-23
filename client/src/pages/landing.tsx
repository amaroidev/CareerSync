import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Target, TrendingUp, Compass, Sparkles } from "lucide-react";
import { PageTransition, StaggeredContainer, StaggeredItem } from "@/components/shared/PageTransition";
import { motion } from "framer-motion";

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
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-background dark:from-primary-950/50 dark:to-background transition-colors duration-500">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div 
              className="flex items-center justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Compass className="h-12 w-12 text-primary mr-3" />
              </motion.div>
              <h1 className="text-4xl font-bold text-foreground">CareerSync</h1>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
              >
                <Sparkles className="h-6 w-6 text-primary ml-2" />
              </motion.div>
            </motion.div>
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Your comprehensive platform for career and education opportunities. 
              Discover, track, and succeed in your professional journey.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.location.href = '/api/login'}
                data-testid="button-login"
              >
                Get Started - Sign In
              </Button>
            </motion.div>
          </motion.div>

        {/* Features Grid */}
        <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" delay={0.1}>
          {features.map((feature, index) => (
            <StaggeredItem key={index}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="text-center hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm border-border hover:border-primary/50">
                  <CardHeader>
                    <motion.div 
                      className="flex justify-center mb-4"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggeredItem>
          ))}
        </StaggeredContainer>

        {/* Benefits Section */}
        <motion.div 
          className="bg-card/80 backdrop-blur-sm border border-border rounded-xl shadow-lg p-8 mb-16 transition-colors duration-300"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl font-bold text-center mb-8 text-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why Choose CareerSync?
          </motion.h2>
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
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-4 text-foreground"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Sync Your Career?
          </motion.h2>
          <motion.p 
            className="text-muted-foreground mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Join thousands of students and professionals who are advancing their careers with CareerSync.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.location.href = '/api/login'}
              data-testid="button-cta-login"
            >
              Start Your Journey Today
            </Button>
          </motion.div>
        </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
