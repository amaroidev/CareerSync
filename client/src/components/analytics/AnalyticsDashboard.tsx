import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  CheckCircle,
  Target,
  Calendar,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { StaggeredContainer, StaggeredItem } from '@/components/shared/PageTransition';

interface AnalyticsData {
  totalApplications: number;
  acceptanceRate: number;
  averageResponseTime: number;
  monthlyApplications: Array<{ month: string; applications: number; interviews: number }>;
  applicationsByType: Array<{ type: string; count: number; color: string }>;
  recentActivity: Array<{ action: string; opportunity: string; date: string; status: string }>;
}

const mockAnalyticsData: AnalyticsData = {
  totalApplications: 47,
  acceptanceRate: 12.8,
  averageResponseTime: 14,
  monthlyApplications: [
    { month: 'Jan', applications: 8, interviews: 2 },
    { month: 'Feb', applications: 12, interviews: 3 },
    { month: 'Mar', applications: 15, interviews: 4 },
    { month: 'Apr', applications: 9, interviews: 2 },
    { month: 'May', applications: 11, interviews: 5 },
    { month: 'Jun', applications: 13, interviews: 3 },
  ],
  applicationsByType: [
    { type: 'Jobs', count: 25, color: '#3b82f6' },
    { type: 'Internships', count: 15, color: '#10b981' },
    { type: 'Scholarships', count: 5, color: '#f59e0b' },
    { type: 'Grants', count: 2, color: '#8b5cf6' },
  ],
  recentActivity: [
    { action: 'Interview Scheduled', opportunity: 'Software Engineer - Google', date: '2 hours ago', status: 'interview' },
    { action: 'Application Submitted', opportunity: 'Data Science Internship - Meta', date: '1 day ago', status: 'applied' },
    { action: 'Offer Received', opportunity: 'Frontend Developer - Stripe', date: '3 days ago', status: 'accepted' },
    { action: 'Application Rejected', opportunity: 'ML Engineer - OpenAI', date: '5 days ago', status: 'rejected' },
  ]
};

export function AnalyticsDashboard() {
  const data = mockAnalyticsData;

  const getStatusColor = (status: string) => {
    const colors = {
      'interview': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'applied': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'accepted': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'interview': <Calendar className="h-3 w-3" />,
      'applied': <Clock className="h-3 w-3" />,
      'accepted': <CheckCircle className="h-3 w-3" />,
      'rejected': <Target className="h-3 w-3" />,
    };
    return icons[status as keyof typeof icons];
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <StaggeredContainer className="grid grid-cols-1 md:grid-cols-4 gap-4" delay={0.1}>
        <StaggeredItem>
          <motion.div whileHover={{ y: -2 }}>
            <Card className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                    <p className="text-2xl font-bold text-foreground">{data.totalApplications}</p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+12.5%</span>
                  <span className="text-sm text-muted-foreground ml-2">from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </StaggeredItem>

        <StaggeredItem>
          <motion.div whileHover={{ y: -2 }}>
            <Card className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Acceptance Rate</p>
                    <p className="text-2xl font-bold text-foreground">{data.acceptanceRate}%</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={data.acceptanceRate} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </StaggeredItem>

        <StaggeredItem>
          <motion.div whileHover={{ y: -2 }}>
            <Card className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                    <p className="text-2xl font-bold text-foreground">{data.averageResponseTime} days</p>
                  </div>
                  <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">-2.3 days</span>
                  <span className="text-sm text-muted-foreground ml-2">improvement</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </StaggeredItem>

        <StaggeredItem>
          <motion.div whileHover={{ y: -2 }}>
            <Card className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Interview Rate</p>
                    <p className="text-2xl font-bold text-foreground">34.6%</p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+5.2%</span>
                  <span className="text-sm text-muted-foreground ml-2">this month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </StaggeredItem>
      </StaggeredContainer>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Applications Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Monthly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.monthlyApplications}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--background)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="applications" fill="var(--primary)" radius={4} />
                  <Bar dataKey="interviews" fill="#10b981" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Applications by Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Applications by Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.applicationsByType}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ type, count }) => `${type}: ${count}`}
                    >
                      {data.applicationsByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {data.applicationsByType.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-foreground">{item.type}</span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{item.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-4 bg-accent/50 rounded-lg border border-border hover:bg-accent/70 transition-colors duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground">{activity.action}</h4>
                      <Badge className={getStatusColor(activity.status)}>
                        {getStatusIcon(activity.status)}
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.opportunity}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.date}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}