import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Globe, Bot, User, BarChart3, Cuboid as Cube } from 'lucide-react';
import MessageSkeleton from './MessageSkeleton';
import ARSimulationCard from './ARSimulationCard';
import DataCard from './DataCard';

interface ChatInterfaceProps {
  darkMode: boolean;
  onShowVisualization: (show: boolean) => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  hasVisualization?: boolean;
  hasAR?: boolean;
  data?: any;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ darkMode, onShowVisualization }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mockResponses = {
    'salinity': {
      content: 'Here are the latest salinity profiles from ARGO floats in the Indian Ocean. The data shows typical values ranging from 34.5 to 36.5 PSU at various depths.',
      hasVisualization: true,
      data: { type: 'salinity_profile', region: 'Indian Ocean' }
    },
    'temperature': {
      content: 'Temperature data from ARGO floats shows seasonal variations. Current surface temperatures range from 18°C to 28°C across different regions.',
      hasVisualization: true,
      data: { type: 'temperature_map', region: 'Global' }
    },
    'ar': {
      content: 'Launching AR simulation for ocean current visualization. This immersive view will help you understand 3D flow patterns.',
      hasAR: true,
      data: { type: 'current_simulation', region: 'Pacific Ocean' }
    },
    'float': {
      content: 'Here are active ARGO floats in your area of interest. Each float provides real-time oceanographic data.',
      data: { 
        floats: [
          { id: 'XYZ123', location: 'Indian Ocean', status: 'active', lastContact: '2 hours ago' },
          { id: 'ABC456', location: 'Pacific Ocean', status: 'active', lastContact: '1 hour ago' },
          { id: 'DEF789', location: 'Atlantic Ocean', status: 'maintenance', lastContact: '6 hours ago' }
        ]
      }
    },
    'default': {
      content: 'I\'m FloatChat, your AI assistant for ARGO ocean data analysis. I can help you visualize salinity profiles, temperature data, ocean currents, and provide information about ARGO floats. Try asking about "salinity profiles", "temperature data", or "show AR simulation".'
    }
  };

  const getResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('salinity')) return mockResponses.salinity;
    if (lowerInput.includes('temperature')) return mockResponses.temperature;
    if (lowerInput.includes('ar') || lowerInput.includes('simulation')) return mockResponses.ar;
    if (lowerInput.includes('float')) return mockResponses.float;
    return mockResponses.default;
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getResponse(inputValue);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        hasVisualization: response.hasVisualization,
        hasAR: response.hasAR,
        data: response.data
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      
      if (response.hasVisualization) {
        onShowVisualization(true);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Mock voice recording - in real app would integrate with Speech API
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInputValue('Show me salinity profiles for the Indian Ocean');
      }, 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`h-[600px] rounded-2xl ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
    >
      {/* Chat Header */}
      <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-t-2xl`}>
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ pulse: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center"
          >
            <Bot className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              FloatChat Assistant
            </h3>
            <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
              ● Online - Ready to help with ocean data
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[80%] ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-blue-600' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className={`p-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : darkMode
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  
                  {/* AR Simulation Card */}
                  {message.hasAR && message.data && (
                    <ARSimulationCard data={message.data} darkMode={darkMode} />
                  )}
                  
                  {/* Data Cards for Float Information */}
                  {message.data?.floats && (
                    <div className="grid grid-cols-1 gap-2">
                      {message.data.floats.map((float: any) => (
                        <DataCard key={float.id} data={float} darkMode={darkMode} />
                      ))}
                    </div>
                  )}
                  
                  {/* Visualization Indicator */}
                  {message.hasVisualization && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`flex items-center space-x-2 p-2 rounded-lg ${
                        darkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                      }`}
                    >
                      <BarChart3 className="w-4 h-4 text-blue-500" />
                      <span className={`text-xs ${
                        darkMode ? 'text-blue-300' : 'text-blue-700'
                      }`}>
                        Visualization available in side panel
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && <MessageSkeleton darkMode={darkMode} />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about ocean data, ARGO floats, or request visualizations..."
              rows={1}
              className={`w-full p-3 rounded-xl border resize-none transition-all focus:ring-2 focus:ring-blue-500/20 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleRecording}
              className={`p-3 rounded-xl transition-all ${
                isRecording 
                  ? 'bg-red-500 text-white' 
                  : darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
              }`}
            >
              <Mic className={`w-5 h-5 ${isRecording ? 'animate-pulse' : ''}`} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-xl transition-all ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
              }`}
            >
              <Globe className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl hover:from-blue-600 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatInterface;