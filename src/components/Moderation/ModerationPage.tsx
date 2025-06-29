import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Flag, 
  Eye, 
  MessageSquare, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Search,
  Filter,
  Download,
  Shield,
  TrendingUp
} from 'lucide-react';
import { Header } from '../Layout/Header';
import { StatsCard } from '../Dashboard/StatsCard';

const moderatorStats = [
  {
    label: 'Flagged Content',
    value: '23',
    change: '-15%',
    trend: 'down' as const,
    icon: Flag,
    color: 'red'
  },
  {
    label: 'Reviewed Today',
    value: '45',
    change: '+8%',
    trend: 'up' as const,
    icon: Eye,
    color: 'green'
  },
  {
    label: 'Active Chats',
    value: '1,234',
    change: '+12%',
    trend: 'up' as const,
    icon: MessageSquare,
    color: 'purple'
  },
  {
    label: 'Pending Reviews',
    value: '8',
    change: '-20%',
    trend: 'down' as const,
    icon: Clock,
    color: 'teal'
  }
];

const flaggedContent = [
  {
    id: 1,
    user: 'User #1234',
    message: 'I feel like ending it all...',
    reason: 'Self-harm indication',
    severity: 'critical',
    time: '5 min ago',
    assistant: 'ChiChi',
    status: 'pending'
  },
  {
    id: 2,
    user: 'User #5678',
    message: 'This stupid AI doesn\'t understand anything',
    reason: 'Inappropriate language',
    severity: 'low',
    time: '15 min ago',
    assistant: 'Alex',
    status: 'pending'
  },
  {
    id: 3,
    user: 'User #9012',
    message: 'Can you help me hack into...',
    reason: 'Illegal activity request',
    severity: 'high',
    time: '1 hour ago',
    assistant: 'Dr. Luna',
    status: 'pending'
  },
  {
    id: 4,
    user: 'User #3456',
    message: 'I want to hurt my ex-girlfriend',
    reason: 'Threat of violence',
    severity: 'high',
    time: '2 hours ago',
    assistant: 'River',
    status: 'reviewed'
  }
];

export function ModerationPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContent = flaggedContent.filter(item => {
    const matchesFilter = selectedFilter === 'all' || item.severity === selectedFilter || item.status === selectedFilter;
    const matchesSearch = item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAction = (id: number, action: 'approve' | 'reject' | 'escalate') => {
    console.log(`Action ${action} on item ${id}`);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-green-100 text-green-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Header 
        title="Content Moderation" 
        subtitle="Monitor and review flagged content to maintain a safe environment"
      />
      
      <div className="px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {moderatorStats.map((stat, index) => (
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

        {/* Filters and Search */}
        <div className="card mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All Items' },
                { key: 'critical', label: 'Critical' },
                { key: 'high', label: 'High Priority' },
                { key: 'pending', label: 'Pending Review' },
                { key: 'reviewed', label: 'Reviewed' }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedFilter === filter.key
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/50 text-slate-600 hover:bg-white/70 border border-white/30'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300"
                />
              </div>
              <button className="btn-secondary flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Flagged Content List */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center">
              <Flag className="w-5 h-5 mr-2 text-red-500" />
              Flagged Content ({filteredContent.length})
            </h3>
            <div className="flex items-center space-x-2">
              <button className="btn-secondary text-sm">
                Bulk Actions
              </button>
              <button className="btn-primary text-sm">
                Review All
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/50 rounded-xl border border-white/30 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.severity === 'critical' ? 'bg-red-500' :
                      item.severity === 'high' ? 'bg-orange-500' :
                      item.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <h4 className="font-medium text-slate-800">{item.user}</h4>
                      <p className="text-sm text-slate-500">Chatting with {item.assistant} • {item.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(item.severity)}`}>
                      {item.severity.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-slate-700 mb-2">Flagged Message:</p>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-slate-700 italic">"{item.message}"</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-slate-700 mb-1">Reason for Flag:</p>
                  <p className="text-sm text-slate-600">{item.reason}</p>
                </div>

                {item.status === 'pending' && (
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAction(item.id, 'approve')}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleAction(item.id, 'reject')}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Take Action</span>
                      </button>
                      <button
                        onClick={() => handleAction(item.id, 'escalate')}
                        className="flex items-center space-x-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
                      >
                        <AlertTriangle className="w-4 h-4" />
                        <span>Escalate</span>
                      </button>
                    </div>
                    
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                      <Eye className="w-4 h-4" />
                      <span>View Full Chat</span>
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">No flagged content found</h3>
              <p className="text-slate-500">All conversations are currently within guidelines.</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Moderation Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn-secondary flex items-center space-x-2 justify-center">
              <TrendingUp className="w-4 h-4" />
              <span>Content Analytics</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2 justify-center">
              <Users className="w-4 h-4" />
              <span>User Reports</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2 justify-center">
              <MessageSquare className="w-4 h-4" />
              <span>Chat Monitoring</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}