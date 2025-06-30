import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  TrendingUp, 
  Heart,
  Activity,
  Clock,
  Star,
  Shield
} from 'lucide-react';
import { Header } from '../components/Layout/Header';
import { StatsCard } from '../components/Dashboard/StatsCard';
import { useAuth } from '../contexts/AuthContext';

const stats = [
  {
    label: 'Total Users',
    value: '12,543',
    change: '+12%',
    trend: 'up' as const,
    icon: Users,
    color: 'blue' as const
  },
  {
    label: 'Active Conversations',
    value: '8,921',
    change: '+8%',
    trend: 'up' as const,
    icon: MessageCircle,
    color: 'green' as const
  },
  {
    label: 'User Satisfaction',
    value: '98.5%',
    change: '+2%',
    trend: 'up' as const,
    icon: Heart,
    color: 'purple' as const
  },
  {
    label: 'Response Time',
    value: '0.8s',
    change: '-15%',
    trend: 'down' as const,
    icon: Clock,
    color: 'teal' as const
  }
];

export function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <Header 
        title={`Welcome back, ${user?.name}`} 
        subtitle="Here's what's happening with Dream Assistant today"
      />
      
      <div className="px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h3 className="text-headline-medium font-sf-pro text-slate-800 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { user: 'Sarah M.', action: 'Started new conversation with ChiChi', time: '2 min ago', type: 'chat' },
                { user: 'Michael R.', action: 'Completed onboarding', time: '5 min ago', type: 'user' },
                { user: 'Emma L.', action: 'Upgraded to Pro plan', time: '12 min ago', type: 'subscription' },
                { user: 'David K.', action: 'Left 5-star review', time: '18 min ago', type: 'review' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-white/50 rounded-xl">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'chat' ? 'bg-blue-100 text-wwdc-blue' :
                    activity.type === 'user' ? 'bg-green-100 text-wwdc-green' :
                    activity.type === 'subscription' ? 'bg-purple-100 text-wwdc-purple' :
                    'bg-orange-100 text-wwdc-orange'
                  }`}>
                    {activity.type === 'chat' ? <MessageCircle className="w-5 h-5" /> :
                     activity.type === 'user' ? <Users className="w-5 h-5" /> :
                     activity.type === 'subscription' ? <TrendingUp className="w-5 h-5" /> :
                     <Star className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-body-medium text-slate-800">{activity.action}</p>
                    <p className="text-body-small text-slate-500">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h3 className="text-headline-medium font-sf-pro text-slate-800 mb-6">System Health</h3>
            <div className="space-y-4">
              {[
                { metric: 'API Response Time', value: '145ms', status: 'good' },
                { metric: 'Database Performance', value: '99.9%', status: 'excellent' },
                { metric: 'Active Connections', value: '1,234', status: 'good' },
                { metric: 'Error Rate', value: '0.01%', status: 'excellent' }
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      metric.status === 'excellent' ? 'bg-wwdc-green' : 'bg-wwdc-blue'
                    }`} />
                    <span className="text-body-medium text-slate-700">{metric.metric}</span>
                  </div>
                  <span className="text-body-medium font-semibold text-slate-800">{metric.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Role-specific content */}
        {user?.role === 'super_admin' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <h3 className="text-headline-medium font-sf-pro text-slate-800 mb-6">Super Admin Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="btn-secondary flex items-center space-x-2 justify-center">
                <Shield className="w-4 h-4" />
                <span>Security Audit</span>
              </button>
              <button className="btn-secondary flex items-center space-x-2 justify-center">
                <Activity className="w-4 h-4" />
                <span>System Monitoring</span>
              </button>
              <button className="btn-secondary flex items-center space-x-2 justify-center">
                <TrendingUp className="w-4 h-4" />
                <span>Analytics Dashboard</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}