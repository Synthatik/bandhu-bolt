import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical,
  Crown,
  Shield,
  User,
  Mail,
  Calendar,
  Activity
} from 'lucide-react';
import { Header } from '../components/Layout/Header';
import { StatsCard } from '../components/Dashboard/StatsCard';

const userStats = [
  {
    label: 'Total Users',
    value: '12,543',
    change: '+12%',
    trend: 'up' as const,
    icon: Users,
    color: 'blue' as const
  },
  {
    label: 'Active Today',
    value: '3,421',
    change: '+8%',
    trend: 'up' as const,
    icon: Activity,
    color: 'green' as const
  },
  {
    label: 'Pro Subscribers',
    value: '2,156',
    change: '+15%',
    trend: 'up' as const,
    icon: Crown,
    color: 'purple' as const
  },
  {
    label: 'New This Week',
    value: '234',
    change: '+22%',
    trend: 'up' as const,
    icon: Calendar,
    color: 'teal' as const
  }
];

const mockUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'end_user',
    subscription: 'Pro',
    joinDate: '2024-01-15',
    lastActive: '2 min ago',
    status: 'online'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    role: 'end_user',
    subscription: 'Free',
    joinDate: '2024-02-20',
    lastActive: '1 hour ago',
    status: 'away'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    role: 'moderator',
    subscription: 'Lifetime',
    joinDate: '2023-12-01',
    lastActive: '5 min ago',
    status: 'online'
  },
  {
    id: '4',
    name: 'David Rodriguez',
    email: 'david@example.com',
    role: 'end_user',
    subscription: 'Pro',
    joinDate: '2024-03-10',
    lastActive: '2 days ago',
    status: 'offline'
  }
];

export function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         user.role === selectedFilter || 
                         user.subscription.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin': return Crown;
      case 'admin': return Shield;
      case 'moderator': return Shield;
      default: return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'text-amber-600 bg-amber-100';
      case 'admin': return 'text-purple-600 bg-purple-100';
      case 'moderator': return 'text-blue-600 bg-blue-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-wwdc-green';
      case 'away': return 'bg-wwdc-yellow';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      <Header 
        title="User Management" 
        subtitle="Manage and monitor all platform users"
      />
      
      <div className="px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {userStats.map((stat, index) => (
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
                { key: 'all', label: 'All Users' },
                { key: 'end_user', label: 'End Users' },
                { key: 'moderator', label: 'Moderators' },
                { key: 'admin', label: 'Admins' },
                { key: 'pro', label: 'Pro Users' },
                { key: 'free', label: 'Free Users' }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    selectedFilter === filter.key
                      ? 'bg-wwdc-blue text-white'
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
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-wwdc-blue/20 focus:border-wwdc-blue"
                />
              </div>
              <button className="btn-secondary flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-headline-medium font-sf-pro text-slate-800">
              Users ({filteredUsers.length})
            </h3>
            <button className="btn-primary">
              Add User
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-body-medium font-semibold text-slate-600">User</th>
                  <th className="text-left py-3 px-4 text-body-medium font-semibold text-slate-600">Role</th>
                  <th className="text-left py-3 px-4 text-body-medium font-semibold text-slate-600">Subscription</th>
                  <th className="text-left py-3 px-4 text-body-medium font-semibold text-slate-600">Join Date</th>
                  <th className="text-left py-3 px-4 text-body-medium font-semibold text-slate-600">Last Active</th>
                  <th className="text-left py-3 px-4 text-body-medium font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => {
                  const RoleIcon = getRoleIcon(user.role);
                  return (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-wwdc-blue to-wwdc-green rounded-full flex items-center justify-center text-white font-semibold">
                              {user.name.charAt(0)}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(user.status)} border-2 border-white rounded-full`} />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">{user.name}</p>
                            <p className="text-body-small text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${getRoleColor(user.role)}`}>
                          <RoleIcon className="w-4 h-4" />
                          <span className="text-label-medium font-medium capitalize">{user.role.replace('_', ' ')}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-label-medium font-medium ${
                          user.subscription === 'Pro' ? 'bg-purple-100 text-purple-700' :
                          user.subscription === 'Lifetime' ? 'bg-amber-100 text-amber-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {user.subscription}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-body-medium text-slate-600">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-body-medium text-slate-600">
                        {user.lastActive}
                      </td>
                      <td className="py-4 px-4">
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-headline-small font-sf-pro text-slate-600 mb-2">No users found</h3>
              <p className="text-body-medium text-slate-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}