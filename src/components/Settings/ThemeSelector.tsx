import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor, Palette } from 'lucide-react';
import { useTheme, ThemeMode, ThemeColor } from '../../contexts/ThemeContext';

export function ThemeSelector() {
  const { mode, color, setMode, setColor } = useTheme();

  const modes: { key: ThemeMode; label: string; icon: React.ComponentType<any> }[] = [
    { key: 'light', label: 'Light', icon: Sun },
    { key: 'dark', label: 'Dark', icon: Moon },
    { key: 'auto', label: 'Auto', icon: Monitor }
  ];

  const colors: { key: ThemeColor; label: string; lightColor: string; darkColor: string }[] = [
    { key: 'blue', label: 'Blue', lightColor: '#007AFF', darkColor: '#0A84FF' },
    { key: 'purple', label: 'Purple', lightColor: '#a855f7', darkColor: '#c084fc' },
    { key: 'pink', label: 'Pink Touch', lightColor: '#ec4899', darkColor: '#f472b6' },
    { key: 'green', label: 'Green', lightColor: '#10b981', darkColor: '#34d399' },
    { key: 'orange', label: 'Orange', lightColor: '#f97316', darkColor: '#fb923c' },
    { key: 'teal', label: 'Teal', lightColor: '#14b8a6', darkColor: '#2dd4bf' }
  ];

  return (
    <div className="space-y-6">
      {/* Theme Mode */}
      <div>
        <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-4 flex items-center">
          <Sun className="w-4 h-4 mr-2" />
          Theme Mode
        </h4>
        <div className="grid grid-cols-3 gap-3">
          {modes.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`flex flex-col items-center space-y-2 p-4 rounded-xl border-2 transition-all ${
                mode === key
                  ? 'border-purple-300 bg-purple-50 dark:border-purple-600 dark:bg-purple-900/30'
                  : 'border-white/30 dark:border-slate-600/30 bg-white/50 dark:bg-slate-700/50 hover:border-purple-200 dark:hover:border-purple-700'
              }`}
            >
              <Icon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Theme Color */}
      <div>
        <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-4 flex items-center">
          <Palette className="w-4 h-4 mr-2" />
          Theme Color
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {colors.map((colorOption) => (
            <motion.button
              key={colorOption.key}
              onClick={() => setColor(colorOption.key)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all ${
                color === colorOption.key
                  ? 'border-purple-300 bg-purple-50 dark:border-purple-600 dark:bg-purple-900/30'
                  : 'border-white/30 dark:border-slate-600/30 bg-white/50 dark:bg-slate-700/50 hover:border-purple-200 dark:hover:border-purple-700'
              }`}
            >
              <div className="flex space-x-1">
                <div 
                  className="w-4 h-4 rounded-full border border-white/50"
                  style={{ backgroundColor: colorOption.lightColor }}
                />
                <div 
                  className="w-4 h-4 rounded-full border border-white/50"
                  style={{ backgroundColor: colorOption.darkColor }}
                />
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-300">{colorOption.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}