import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { mockMonthlyIssues, mockIssueTypeDistribution, mockWorkOrderCompletion } from '@/data/mock-analytics';
import GradientText from '@/components/GradientText'; // Import GradientText

const COLORS = ['#C4972E', '#183747', '#7C8D89', '#E2A33B', '#3A7D44']; // Using Rovida palette

const Analytics = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-1 flex-col gap-4">
      <GradientText
        colors={["#C4972E", "#183747", "#C4972E"]} // Using Rovida gold and navy
        animationSpeed={5}
        className="text-2xl font-semibold md:text-3xl text-page-title"
      >
        {t('analytics')}
      </GradientText>
      <p className="text-rovida-slate-green-gray">Overview of key operational metrics.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full md:col-span-2 card-rovida">
          <CardHeader>
            <CardTitle className="text-rovida-navy">Monthly Issue Trends</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">Open vs. Closed issues over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockMonthlyIssues}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEB" />
                  <XAxis dataKey="month" stroke="#7C8D89" />
                  <YAxis stroke="#7C8D89" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', border: '1px solid #E9ECEB', borderRadius: '8px' }} itemStyle={{ color: '#111418' }} />
                  <Legend />
                  <Bar dataKey="open" fill="#C4972E" name="Open Issues" />
                  <Bar dataKey="closed" fill="#183747" name="Closed Issues" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="card-rovida">
          <CardHeader>
            <CardTitle className="text-rovida-navy">Issue Type Distribution</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">Breakdown of issues by type.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockIssueTypeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {mockIssueTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', border: '1px solid #E9ECEB', borderRadius: '8px' }} itemStyle={{ color: '#111418' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full md:col-span-2 card-rovida">
          <CardHeader>
            <CardTitle className="text-rovida-navy">Work Order Completion Rate</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">Monthly work order completion status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockWorkOrderCompletion}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEB" />
                  <XAxis dataKey="name" stroke="#7C8D89" />
                  <YAxis stroke="#7C8D89" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', border: '1px solid #E9ECEB', borderRadius: '8px' }} itemStyle={{ color: '#111418' }} />
                  <Legend />
                  <Bar dataKey="completed" fill="#3A7D44" name="Completed" />
                  <Bar dataKey="pending" fill="#E2A33B" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;