import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, Globe, TrendingUp, AlertTriangle, Waves, MapPin, Clock } from 'lucide-react';
import InteractiveOceanMap from './InteractiveOceanMap';

interface DashboardProps {
  darkMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ darkMode }) => {
  const [realTimeData, setRealTimeData] = useState({
    activeFloats: 3847,
    dataPoints: 125643,
    activeUsers: 1247,
    anomalies: 3
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Ocean Data Analytics Dashboard
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Real-time ARGO float monitoring and ocean data visualization
        </p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Active ARGO Floats', 
            value: realTimeData.activeFloats.toLocaleString(), 
            change: '+127', 
            icon: Activity, 
            color: 'from-blue-500 to-cyan-400',
            bgColor: 'bg-blue-500/10'
          },
          { 
            title: 'Data Points Today', 
            value: realTimeData.dataPoints.toLocaleString(), 
            change: '+5.2K', 
            icon: TrendingUp, 
            color: 'from-green-500 to-emerald-400',
            bgColor: 'bg-green-500/10'
          },
          { 
            title: 'Active Users', 
            value: realTimeData.activeUsers.toLocaleString(), 
            change: '+89', 
            icon: Users, 
            color: 'from-purple-500 to-pink-400',
            bgColor: 'bg-purple-500/10'
          },
          { 
            title: 'Anomalies Detected', 
            value: realTimeData.anomalies.toString(), 
            change: '-2', 
            icon: AlertTriangle, 
            color: 'from-red-500 to-orange-400',
            bgColor: 'bg-red-500/10'
          }
        ].map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-2xl ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:shadow-2xl transition-all`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {metric.title}
                  </p>
                  <p className={`text-3xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {metric.value}
                  </p>
                  <p className={`text-sm mt-1 ${
                    metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {metric.change} from yesterday
                  </p>
                </div>
                <div className={`p-4 rounded-xl bg-gradient-to-r ${metric.color}`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Real-time Data Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Global Ocean Map */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className={`p-6 rounded-2xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Global ARGO Float Distribution
            </h3>
          </div>
          <div className="h-80 rounded-xl overflow-hidden">
            <InteractiveOceanMap darkMode={darkMode} />
          </div>
        </motion.div>

        {/* Live Data Stream */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className={`p-6 rounded-2xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-400 rounded-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Live Data Stream
            </h3>
          </div>
          <div className="space-y-3 h-64 overflow-y-auto">
            {[
              { id: 'XYZ123', location: 'Pacific Ocean', data: 'Temperature: 24.5°C', time: 'Just now' },
              { id: 'ABC456', location: 'Atlantic Ocean', data: 'Salinity: 35.2 PSU', time: '2 min ago' },
              { id: 'DEF789', location: 'Indian Ocean', data: 'Depth: 1,250m', time: '3 min ago' },
              { id: 'GHI012', location: 'Arctic Ocean', data: 'Temperature: -1.8°C', time: '5 min ago' },
              { id: 'JKL345', location: 'Southern Ocean', data: 'Current: 0.8 m/s', time: '7 min ago' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Float {item.id}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.data}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {item.time}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Temperature Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`p-6 rounded-2xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Temperature Trends
          </h3>
          <div className={`h-32 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
            <div className="text-center">
              <TrendingUp className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Interactive chart
              </p>
            </div>
          </div>
        </motion.div>

        {/* Salinity Levels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`p-6 rounded-2xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Salinity Distribution
          </h3>
          <div className={`h-32 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
            <div className="text-center">
              <Waves className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Salinity heatmap
              </p>
            </div>
          </div>
        </motion.div>

        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className={`p-6 rounded-2xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            System Health
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Data Processing', status: 98, color: 'bg-green-500' },
              { name: 'Float Connectivity', status: 94, color: 'bg-blue-500' },
              { name: 'API Response', status: 99, color: 'bg-purple-500' }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{item.name}</span>
                  <span className={darkMode ? 'text-white' : 'text-gray-900'}>{item.status}%</span>
                </div>
                <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.status}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
                    className={`${item.color} h-2 rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;