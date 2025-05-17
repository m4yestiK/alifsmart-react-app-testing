import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const roleOptions = [
  { 
    id: 'student', 
    label: 'Siswa',
    backendRole: 'siswa',
    animationSrc: 'https://lottie.host/81c48283-cf8e-4a98-947b-92daac184202/nOIfIRUeLe.lottie',
    color: 'from-blue-600 to-blue-800', 
    darkColor: 'from-blue-900 to-blue-950'
  },
  { 
    id: 'teacher', 
    label: 'Guru',
    backendRole: 'guru',
    animationSrc: 'https://lottie.host/dbb763c5-5ee1-442b-8634-4966e79a403d/FLjqCulT63.lottie',
    color: 'from-green-700 to-green-800', 
    darkColor: 'from-green-900 to-green-950'
  },
  { 
    id: 'admin', 
    label: 'Admin',
    backendRole: 'admin',
    animationSrc: 'https://lottie.host/bb913905-e04c-46c7-aacb-fd078199db6f/NhPnXaZJmt.lottie',
    color: 'from-purple-600 to-purple-800', 
    darkColor: 'from-purple-900 to-purple-950'
  },
];

const welcomeAnimationSrc = 'https://lottie.host/69f2bcd6-e906-491c-8d64-6e7887210a59/ErgWxLe6Nb.lottie';

function LoginDashboard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-redirect jika sudah login
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const userRole = JSON.parse(atob(token.split('.')[1]))?.role;
          const rolePaths = {
            siswa: '/siswa-dashboard',
            guru: '/guru-dashboard',
            admin: '/admin-dashboard'
          };
          if (userRole && rolePaths[userRole]) {
            window.location.href = rolePaths[userRole];
          }
        } catch (e) {
          console.error('Error parsing token:', e);
        }
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mediaQuery.matches);
    
    const handler = e => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    
    if (!selectedRole) {
      setErrorMessage('Silakan pilih peran Anda');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
          role: selectedRole.backendRole
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login gagal!');
      }

      const { accessToken, refreshToken } = await response.json();
      
      // Simpan token
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Redirect berdasarkan role
      const navigateTo = {
        siswa: '/siswa-dashboard',
        guru: '/guru-dashboard',
        admin: '/admin-dashboard'
      };
      
      window.location.href = navigateTo[selectedRole.backendRole];
      
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.message || 'Terjadi kesalahan saat login');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getAnimationSize = () => {
    if (windowWidth < 640) return { width: 120, height: 120 };
    if (windowWidth < 768) return { width: 140, height: 140 };
    if (windowWidth < 1024) return { width: 160, height: 160 };
    return { width: 180, height: 180 };
  };

  const getRoleButtonSize = () => {
    if (windowWidth < 640) return { width: 14, height: 14 };
    return { width: 16, height: 16 };
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-2 sm:p-4 transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      {/* Error Message */}
      {errorMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className={`p-3 rounded-lg mb-4 text-sm flex items-center shadow-lg ${
            darkMode 
              ? 'bg-red-800/90 text-red-100 backdrop-blur-sm' 
              : 'bg-red-100 text-red-800'
          }`}>
            <span className="mr-2">⚠️</span>
            {errorMessage}
          </div>
        </motion.div>
      )}

      {/* Glass morphism background elements */}
      <div className="fixed inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-20 ${
          darkMode ? 'bg-purple-600' : 'bg-blue-300'
        }`}></div>
        <div className={`absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-20 ${
          darkMode ? 'bg-blue-600' : 'bg-purple-200'
        }`}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative rounded-2xl shadow-2xl overflow-hidden w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl transition-all duration-300 ${
          darkMode 
            ? 'bg-gray-800/70 backdrop-blur-md border border-gray-700/50' 
            : 'bg-white/80 backdrop-blur-md border border-white/30'
        }`}
      >
        {/* Header Section */}
        <div className={`relative bg-gradient-to-r p-4 sm:p-6 text-white ${
          selectedRole 
            ? darkMode 
              ? selectedRole.darkColor 
              : selectedRole.color 
            : darkMode 
              ? 'from-gray-700/80 to-gray-800/80' 
              : 'from-blue-500/80 to-purple-500/80'
        }`}>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative flex flex-col items-center z-10">
            <div 
              className="mb-3 sm:mb-4"
              style={{ width: `${getAnimationSize().width}px`, height: `${getAnimationSize().height}px` }}
            >
              <DotLottieReact
                src={selectedRole ? roleOptions.find(r => r.id === selectedRole.id)?.animationSrc : welcomeAnimationSrc}
                loop
                autoplay
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            
            <div className="text-center w-full px-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 drop-shadow-md">
                {selectedRole ? `Login sebagai ${selectedRole.label}` : 'Selamat Datang'}
              </h1>
              <p className="text-white/90 text-sm sm:text-base drop-shadow-sm">
                Sistem E-learning Terpadu
              </p>
            </div>
            
            <button 
              onClick={toggleDarkMode}
              className={`absolute top-2 right-2 sm:top-4 sm:right-4 p-1 sm:p-2 rounded-full transition-all ${
                darkMode 
                  ? 'bg-gray-700/80 text-yellow-300 hover:bg-gray-600/80' 
                  : 'bg-white/80 text-gray-700 hover:bg-white'
              } backdrop-blur-sm shadow-sm`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Role Selection */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {roleOptions.map((role) => (
              <motion.button
                key={role.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex flex-col items-center p-2 sm:p-3 rounded-xl border-2 transition-all ${
                  selectedRole?.id === role.id 
                    ? `border-${role.color.split(' ')[1].replace('to-', '')} ${
                        darkMode 
                          ? `bg-${role.color.split(' ')[1].replace('to-', '')}/20 backdrop-blur-sm` 
                          : `bg-${role.color.split(' ')[1].replace('to-', '')}/10 backdrop-blur-sm`
                      }`
                    : darkMode 
                      ? 'border-gray-600/50 hover:border-gray-500 bg-gray-700/30 hover:bg-gray-700/50 backdrop-blur-sm' 
                      : 'border-gray-200/70 hover:border-gray-300 bg-white/50 hover:bg-white/70 backdrop-blur-sm'
                }`}
                onClick={() => setSelectedRole(role)}
              >
                <div 
                  className="mb-1 sm:mb-2"
                  style={{ width: `${getRoleButtonSize().width * 4}px`, height: `${getRoleButtonSize().height * 4}px` }}
                >
                  <DotLottieReact
                    src={role.animationSrc}
                    loop
                    autoplay
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <span className={`text-xs sm:text-sm font-medium ${
                  darkMode ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  {role.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Login Form */}
          <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1 sm:space-y-2">
              <label className={`block text-xs sm:text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`} htmlFor="email">
                Email
              </label>
              <motion.div whileFocus={{ scale: 1.01 }}>
                <input
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border transition-all focus:ring-2 focus:outline-none text-sm sm:text-base ${
                    darkMode 
                      ? 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:ring-blue-500 backdrop-blur-sm' 
                      : 'border-gray-300/70 bg-white/70 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm'
                  }`}
                  id="email"
                  type="email"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </motion.div>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label className={`block text-xs sm:text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`} htmlFor="password">
                Password
              </label>
              <motion.div whileFocus={{ scale: 1.01 }}>
                <input
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border transition-all focus:ring-2 focus:outline-none text-sm sm:text-base ${
                    darkMode 
                      ? 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:ring-blue-500 backdrop-blur-sm' 
                      : 'border-gray-300/70 bg-white/70 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm'
                  }`}
                  id="password"
                  type="password"
                  placeholder="Masukkan password Anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-2 sm:py-3 px-4 rounded-xl font-medium text-white transition-all flex items-center justify-center text-sm sm:text-base ${
                selectedRole 
                  ? `bg-gradient-to-r ${
                      darkMode ? selectedRole.darkColor : selectedRole.color
                    } hover:opacity-90 shadow-lg`
                  : 'bg-gray-500/80 cursor-not-allowed'
              } backdrop-blur-sm`}
              type="submit"
              disabled={!selectedRole || isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  <span>Sedang masuk...</span>
                </div>
              ) : (
                'Masuk'
              )}
            </motion.button>
          </form>
        </div>

        {/* Footer */}
        <div className={`px-4 sm:px-6 py-3 sm:py-4 text-center border-t transition-colors duration-300 ${
          darkMode 
            ? 'bg-gray-700/50 border-gray-600/50 backdrop-blur-sm' 
            : 'bg-white/50 border-gray-200/50 backdrop-blur-sm'
        }`}>
          <p className={`text-xs sm:text-sm ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Butuh bantuan?{' '}
            <a href="#" className={`${
              darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
            } hover:underline font-medium`}>
              Hubungi Kami
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginDashboard;