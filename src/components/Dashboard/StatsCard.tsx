import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'purple' | 'red' | 'teal' | 'orange';
}

const colorClasses = {
  blue: 'from-wwdc-blue to-blue-600',
  green: 'from-wwdc-green to-green-600',
  purple: 'from-wwdc-purple to-purple-600',
  red: 'from-wwdc-red to-red-600',
  teal: 'from-wwdc-teal to-teal-600',
  orange: 'from-wwdc-orange to-orange-600'
};

export function StatsCard({ label, value, change, trend, icon: Icon, color = 'blue' }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${
            trend === 'up' ? 'text-wwdc-green' : 'text-wwdc-red'
          }`}>
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-label-medium font-semibold">{change}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-display-small font-sf-pro text-slate-800 mb-1">{value}</h3>
        <p className="text-body-medium text-slate-600">{label}</p>
      </div>
    </motion.div>
  );
}