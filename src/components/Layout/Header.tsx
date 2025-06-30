import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function Header({ title, subtitle, children }: HeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-wwdc-blue to-wwdc-indigo text-white p-6 rounded-b-3xl shadow-wwdc"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display-small font-sf-pro">{title}</h1>
          {subtitle && (
            <p className="text-body-large text-blue-100 mt-2">{subtitle}</p>
          )}
        </div>
        {children && (
          <div className="flex items-center space-x-4">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
}