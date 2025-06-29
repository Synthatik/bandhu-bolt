import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Save, 
  RotateCcw, 
  Eye, 
  Download, 
  Upload,
  Sparkles,
  Sun,
  Moon,
  Zap
} from 'lucide-react';
import { Header } from '../Layout/Header';
import { useTheme } from '../../contexts/ThemeContext';

const colorPalettes = {
  default: {
    name: 'Dream Purple',
    primary: '#a855f7',
    secondary: '#14b8a6',
    accent: '#f59e0b',
    background: '#f8fafc',
    surface: '#ffffff'
  },
  wwdc2024: {
    name: 'WWDC 2024',
    primary: '#007AFF',
    secondary: '#34C759',
    accent: '#FF9500',
    background: '#f2f2f7',
    surface: '#ffffff'
  },
  sunset: {
    name: 'Sunset Vibes',
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
    accent: '#ffe66d',
    background: '#fff5f5',
    surface: '#ffffff'
  },
  ocean: {
    name: 'Ocean Depths',
    primary: '#0077be',
    secondary: '#00a8cc',
    accent: '#ffd23f',
    background: '#f0f9ff',
    surface: '#ffffff'
  },
  forest: {
    name: 'Forest Green',
    primary: '#059669',
    secondary: '#0d9488',
    accent: '#f59e0b',
    background: '#f0fdf4',
    surface: '#ffffff'
  },
  midnight: {
    name: 'Midnight Dark',
    primary: '#8b5cf6',
    secondary: '#06b6d4',
    accent: '#f59e0b',
    background: '#0f172a',
    surface: '#1e293b'
  }
};

export function ThemeCustomizer() {
  const { currentTheme, updateTheme, resetTheme } = useTheme();
  const [selectedPalette, setSelectedPalette] = useState('default');
  const [customColors, setCustomColors] = useState(currentTheme);
  const [previewMode, setPreviewMode] = useState(false);

  const handleColorChange = (colorKey: string, value: string) => {
    setCustomColors(prev => ({
      ...prev,
      [colorKey]: value
    }));
  };

  const applyPalette = (paletteKey: string) => {
    const palette = colorPalettes[paletteKey as keyof typeof colorPalettes];
    setCustomColors(palette);
    setSelectedPalette(paletteKey);
  };

  const saveTheme = () => {
    updateTheme(customColors);
    // Here you would typically save to your backend
    console.log('Theme saved:', customColors);
  };

  const exportTheme = () => {
    const themeData = JSON.stringify(customColors, null, 2);
    const blob = new Blob([themeData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dream-assistant-theme.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const themeData = JSON.parse(e.target?.result as string);
          setCustomColors(themeData);
        } catch (error) {
          console.error('Invalid theme file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      <Header 
        title="Theme Customizer" 
        subtitle="Customize the platform's appearance and branding"
      />
      
      <div className="px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Color Palettes */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preset Palettes */}
            <div className="card">
              <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                Preset Palettes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(colorPalettes).map(([key, palette]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => applyPalette(key)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedPalette === key
                        ? 'border-purple-300 bg-purple-50'
                        : 'border-white/30 bg-white/50 hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex space-x-1">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: palette.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: palette.secondary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: palette.accent }}
                        />
                      </div>
                      <span className="font-medium text-slate-800">{palette.name}</span>
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-slate-500 mb-1">Primary: {palette.primary}</div>
                      <div className="text-xs text-slate-500">Secondary: {palette.secondary}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Custom Colors */}
            <div className="card">
              <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
                <Palette className="w-5 h-5 mr-2 text-purple-500" />
                Custom Colors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(customColors).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-slate-700 mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="w-12 h-12 rounded-lg border border-slate-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="flex-1 px-3 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-slate-800 mb-6">Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={saveTheme}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Theme</span>
                </button>
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`btn-secondary flex items-center space-x-2 ${
                    previewMode ? 'bg-purple-100 text-purple-700' : ''
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>{previewMode ? 'Exit Preview' : 'Preview'}</span>
                </button>
                <button
                  onClick={resetTheme}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={exportTheme}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <label className="btn-secondary flex items-center space-x-2 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Import</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={importTheme}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-slate-800 mb-6">Live Preview</h3>
              
              {/* Theme Preview */}
              <div 
                className="p-6 rounded-xl border-2 border-dashed border-slate-300"
                style={{ 
                  backgroundColor: customColors.background,
                  borderColor: customColors.primary + '40'
                }}
              >
                <div 
                  className="p-4 rounded-lg mb-4"
                  style={{ backgroundColor: customColors.surface }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: customColors.primary }}
                    >
                      <span className="text-white text-sm">🌙</span>
                    </div>
                    <div>
                      <h4 className="font-semibold" style={{ color: customColors.primary }}>
                        ChiChi
                      </h4>
                      <p className="text-xs text-slate-500">Your AI companion</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div 
                      className="p-3 rounded-lg text-white text-sm"
                      style={{ backgroundColor: customColors.primary }}
                    >
                      Hello! How are you feeling today?
                    </div>
                    <div 
                      className="p-3 rounded-lg text-sm ml-8"
                      style={{ 
                        backgroundColor: customColors.secondary + '20',
                        color: customColors.secondary
                      }}
                    >
                      I'm doing well, thank you for asking!
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button 
                    className="flex-1 py-2 px-4 rounded-lg text-white text-sm font-medium"
                    style={{ backgroundColor: customColors.primary }}
                  >
                    Primary Button
                  </button>
                  <button 
                    className="flex-1 py-2 px-4 rounded-lg text-sm font-medium border"
                    style={{ 
                      borderColor: customColors.secondary,
                      color: customColors.secondary,
                      backgroundColor: customColors.surface
                    }}
                  >
                    Secondary
                  </button>
                </div>
              </div>

              {/* Color Swatches */}
              <div className="mt-6">
                <h4 className="font-medium text-slate-700 mb-3">Color Swatches</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(customColors).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <div 
                        className="w-6 h-6 rounded border border-slate-300"
                        style={{ backgroundColor: value }}
                      />
                      <span className="text-xs text-slate-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Theme Info */}
            <div className="card">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Theme Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Active Users:</span>
                  <span className="font-medium">12,543</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Last Updated:</span>
                  <span className="font-medium">Just now</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Version:</span>
                  <span className="font-medium">2.1.0</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700">
                  <strong>Note:</strong> Theme changes will be applied to all users immediately. 
                  Consider testing in preview mode first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}