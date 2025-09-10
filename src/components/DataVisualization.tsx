import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, MapPin, TrendingUp, Waves, Thermometer, Droplets } from 'lucide-react';

interface DataVisualizationProps {
  darkMode: boolean;
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ darkMode }) => {
  const [selectedChart, setSelectedChart] = useState('salinity');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [selectedChart]);

  const charts = [
    { id: 'salinity', name: 'Salinity Profile', icon: Droplets, color: 'from-blue-500 to-cyan-400' },
    { id: 'temperature', name: 'Temperature Map', icon: Thermometer, color: 'from-red-500 to-orange-400' },
    { id: 'depth', name: 'Depth Analysis', icon: TrendingUp, color: 'from-purple-500 to-pink-400' },
    { id: 'current', name: 'Ocean Currents', icon: Waves, color: 'from-green-500 to-blue-400' }
  ];

  const mockData = {
    salinity: {
      title: 'Salinity Profile - Indian Ocean',
      description: 'Vertical salinity distribution from ARGO float XYZ123',
      values: [
        { depth: '0m', value: '35.2 PSU', temp: '28°C' },
        { depth: '50m', value: '35.4 PSU', temp: '25°C' },
        { depth: '100m', value: '35.1 PSU', temp: '20°C' },
        { depth: '200m', value: '34.8 PSU', temp: '15°C' },
        { depth: '500m', value: '34.6 PSU', temp: '8°C' }
      ]
    },
    temperature: {
      title: 'Sea Surface Temperature - Global',
      description: 'Current temperature distribution across ocean regions',
      values: [
        { region: 'Equatorial Pacific', value: '28.5°C', trend: '+0.3°C' },
        { region: 'North Atlantic', value: '18.2°C', trend: '-0.1°C' },
        { region: 'Indian Ocean', value: '26.8°C', trend: '+0.2°C' },
        { region: 'Southern Ocean', value: '12.1°C', trend: '-0.2°C' }
      ]
    }
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          className={`h-12 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
        />
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className={`h-[600px] rounded-2xl ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}
    >
      {/* Header */}
      <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Data Visualization
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Interactive ocean data analysis
            </p>
          </div>
        </div>
      </div>

      {/* Chart Selector */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {charts.map((chart) => {
            const IconComponent = chart.icon;
            const isSelected = selectedChart === chart.id;
            
            return (
              <motion.button
                key={chart.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedChart(chart.id);
                  setIsLoading(true);
                }}
                className={`p-3 rounded-xl text-left transition-all ${
                  isSelected
                    ? `bg-gradient-to-r ${chart.color} text-white shadow-lg`
                    : darkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm font-medium">{chart.name}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Chart Content */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} h-96 overflow-y-auto`}>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {mockData[selectedChart as keyof typeof mockData] && (
                <>
                  <div>
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {mockData[selectedChart as keyof typeof mockData].title}
                    </h4>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {mockData[selectedChart as keyof typeof mockData].description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {mockData[selectedChart as keyof typeof mockData].values.map((item: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`p-4 rounded-lg border ${
                          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                        } hover:shadow-md transition-all`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {item.depth || item.region}
                            </p>
                            {item.temp && (
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Temperature: {item.temp}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-500">{item.value}</p>
                            {item.trend && (
                              <p className={`text-sm ${
                                item.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
                              }`}>
                                {item.trend}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {/* Mock Chart Placeholder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`mt-6 h-48 rounded-lg border-2 border-dashed ${
                  darkMode ? 'border-gray-600' : 'border-gray-300'
                } flex items-center justify-center`}
              >
                <div className="text-center">
                  <div className={`p-4 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} mx-auto mb-3`}>
                    <BarChart3 className={`w-8 h-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Interactive {selectedChart} chart would appear here
                  </p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Powered by Plotly.js visualization engine
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DataVisualization;