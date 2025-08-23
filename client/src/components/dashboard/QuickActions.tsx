import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { User, Upload, FileText, Calculator } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      icon: <User className="text-primary" />,
      label: "Update Profile",
      href: "/profile",
      testId: "button-update-profile",
    },
    {
      icon: <Upload className="text-primary" />,
      label: "Upload Documents",
      href: "/profile",
      testId: "button-upload-documents",
    },
    {
      icon: <FileText className="text-primary" />,
      label: "Generate Resume",
      href: "/profile",
      testId: "button-generate-resume",
    },
    {
      icon: <Calculator className="text-primary" />,
      label: "GPA Calculator",
      href: "/profile",
      testId: "button-gpa-calculator",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start space-x-3 p-3 h-auto hover:bg-gray-50 transition-colors"
                data-testid={action.testId}
              >
                {action.icon}
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
