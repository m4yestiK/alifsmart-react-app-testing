import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiBook, FiCalendar, FiUser, FiSettings, 
  FiBell, FiMessageSquare, FiBarChart2, FiCheck, 
  FiX, FiSun, FiMoon, FiMenu, FiChevronDown, FiChevronUp 
} from 'react-icons/fi';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState('beranda');
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSwitchingToStudent, setIsSwitchingToStudent] = useState(false);

  // Check screen size and system preference for dark mode
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sample data
  const childInfo = {
    name: "Alika Putri",
    class: "Kelas A1",
    age: "5 tahun",
    teacher: "Bu Siti",
    teacherPhone: "0812-XXXX-XXXX",
    avatar: "https://lottie.host/0c563cbf-94b5-479e-9260-86c44ded9184/saLJbGGsty.lottie"
  };

  const activities = [
    { task: "Sikat Gigi", status: "Dalam penilaian", comment: "Tidak ada komentar" },
    { task: "Cuci Tangan", status: "Dalam penilaian", comment: "Tidak ada komentar" },
    { task: "Kuis", status: "★★★★☆", comment: "Cukup baik, terus dikembangkan ya!" },
    { task: "Hitung Buah", status: "Dalam penilaian", comment: "Tidak ada komentar" },
    { task: "Tebak Binatang", status: "Dalam penilaian", comment: "Tidak ada komentar" },
    { task: "Tracing", status: "★★★★★", comment: "🔉 0:21", hasAudio: true }
  ];

  const dailyTasks = [
    { id: 1, time: "08:00", task: "Sikat Gigi", completed: true },
    { id: 2, time: "10:00", task: "Kuis & Cerita Dongeng", completed: true },
    { id: 3, time: "11:00", task: "Cuci Tangan", completed: false }
  ];

  const weeklyTasks = [
    { id: 1, task: "Tracing Huruf", completed: true },
    { id: 2, task: "Game Edukasi Hitung Buah", completed: true },
    { id: 3, task: "Game Edukasi Tebak Binatang", completed: false }
  ];

  const notifications = [
    { id: 1, type: "payment", message: "Pembayaran SPP 1 NOVEMBER 2025", action: "💳 CEK PEMBAYARAN", read: false },
    { id: 2, type: "meeting", message: "Parent Meeting", action: "🟢 BERGABUNG", read: false },
    { id: 3, type: "reminder", message: "Ananda Alika belum mengerjakan Tugas Harian Cuci Tangan, Yuk kerjakan!", read: false },
    { id: 4, type: "reminder", message: "Ananda Alika belum mengerjakan Tugas Mingguan Tebak Binatang, Yuk kerjakan!", read: false },
    { id: 5, type: "achievement", message: "Alika baru saja mendapatkan badge baru, Langit Emas!", read: false }
  ];

  const attendanceProgress = 66.6;

  // Color scheme
  const colors = {
    light: {
      primary: '#2e856e',
      secondary: '#38a169',
      accent: '#e6fffa',
      background: 'bg-gradient-to-br from-green-50 to-teal-50',
      card: 'bg-white',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      button: 'bg-green-600 hover:bg-green-700 text-white'
    },
    dark: {
      primary: '#2c7a7b',
      secondary: '#285e61',
      accent: '#234e52',
      background: 'bg-gradient-to-br from-gray-900 to-gray-800',
      card: 'bg-gray-800',
      text: 'text-gray-100',
      textSecondary: 'text-gray-300',
      button: 'bg-teal-600 hover:bg-teal-700 text-white'
    }
  };

  const currentColors = darkMode ? colors.dark : colors.light;

  const toggleTaskCompletion = (type, id) => {
    console.log(`Toggled ${type} task ${id}`);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, read: true} : n
    ));
    setShowNotificationBadge(notifications.some(n => !n.read && n.id !== id));
  };

  const handleSwitchToStudent = () => {
    setIsSwitchingToStudent(true);
    setTimeout(() => {
      navigate('/student');
      setIsSwitchingToStudent(false);
    }, 1500);
  };

  // Responsive breakpoints
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${currentColors.background} ${currentColors.text}`}>
      {/* Floating decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 ${
          darkMode ? 'bg-teal-500' : 'bg-green-300'
        }`}></div>
        <div className={`absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-10 ${
          darkMode ? 'bg-emerald-600' : 'bg-teal-200'
        }`}></div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={`p-4 shadow-sm ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md sticky top-0 z-10`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {isMobile && (
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full"
              >
                <FiMenu className="text-lg" />
              </button>
            )}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden"
            >
              <DotLottieReact
                src={childInfo.avatar}
                loop
                autoplay
                style={{ width: '100%', height: '100%' }}
              />
            </motion.div>
            <div>
              <h1 className="font-bold text-lg">TK Islam Alif</h1>
              <p className={`text-xs md:text-sm ${currentColors.textSecondary}`}>Dashboard Orang Tua</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-700'}`}
            >
              {darkMode ? <FiSun className="text-sm md:text-base" /> : <FiMoon className="text-sm md:text-base" />}
            </button>
            
            <div className="relative">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                <FiBell className="text-sm md:text-base" />
                {showNotificationBadge && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"
                  ></motion.span>
                )}
              </motion.button>
            </div>

            {/* Tombol Beralih ke Dashboard Siswa */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={handleSwitchToStudent}
                disabled={isSwitchingToStudent}
                className={`flex items-center px-3 py-2 rounded-full ${
                  darkMode ? 'bg-teal-700 hover:bg-teal-600' : 'bg-green-600 hover:bg-green-700'
                } text-white text-sm transition-all overflow-hidden`}
              >
                <AnimatePresence mode="wait">
                  {isSwitchingToStudent ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      <span className="hidden md:inline">Memuat...</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="content"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center"
                    >
                      <FiUser className="mr-1 text-xs md:text-sm" />
                      <span className="hidden md:inline">Siswa Mode</span>
                      <motion.span
                        animate={{ x: [0, 2, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="ml-1"
                      >
                        →
                      </motion.span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
          >
            <div className="p-4 space-y-2">
              {[
                { icon: <FiHome />, label: 'Beranda', id: 'beranda' },
                { icon: <FiBarChart2 />, label: 'Progress', id: 'progress' },
                { icon: <FiMessageSquare />, label: 'Chat', id: 'chat' },
                { icon: <FiBook />, label: 'Keuangan', id: 'keuangan' },
                { icon: <FiSettings />, label: 'Pengaturan', id: 'pengaturan' }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveMenu(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left ${
                    activeMenu === item.id
                      ? darkMode
                        ? 'bg-teal-900/50 text-white'
                        : 'bg-green-100 text-green-800'
                      : `hover:${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`
                  }`}
                >
                  <span className={`text-lg ${activeMenu === item.id ? 'text-green-500' : currentColors.textSecondary}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto p-4 flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-6">
        {/* Sidebar - Hidden on mobile, shown on tablet and desktop */}
        {!isMobile && (
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`hidden md:block md:col-span-1 rounded-xl shadow-sm p-4 ${currentColors.card} backdrop-blur-sm h-fit sticky top-20`}
          >
            <div className="flex flex-col space-y-2">
              {[
                { icon: <FiHome />, label: 'Beranda', id: 'beranda' },
                { icon: <FiBarChart2 />, label: 'Progress', id: 'progress' },
                { icon: <FiMessageSquare />, label: 'Chat', id: 'chat' },
                { icon: <FiBook />, label: 'Keuangan', id: 'keuangan' },
                { icon: <FiSettings />, label: 'Pengaturan', id: 'pengaturan' }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveMenu(item.id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg text-left transition-all ${
                    activeMenu === item.id
                      ? darkMode
                        ? 'bg-teal-900/50 text-white'
                        : 'bg-green-100 text-green-800'
                      : `hover:${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`
                  }`}
                >
                  <span className={`text-lg ${activeMenu === item.id ? 'text-green-500' : currentColors.textSecondary}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.aside>
        )}

        {/* Main Content */}
        <main className="md:col-span-3 space-y-4 md:space-y-6">
          {/* Profile Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-xl shadow-sm p-4 md:p-6 ${currentColors.card} backdrop-blur-sm`}
          >
            <h2 className="font-bold text-lg mb-3 md:mb-4 flex items-center">
              <span className="text-yellow-500 mr-2">★</span> Profil Singkat
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              {[
                { label: "Nama Anak", value: `${childInfo.name} (${childInfo.class})` },
                { label: "Usia", value: childInfo.age },
                { label: "Wali Kelas", value: `${childInfo.teacher} (📞 ${childInfo.teacherPhone})` }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -3 }}
                  className={`p-3 md:p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-green-50'}`}
                >
                  <p className={`text-xs md:text-sm ${currentColors.textSecondary}`}>{item.label}</p>
                  <p className="font-bold text-sm md:text-base">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Activity Summary */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`rounded-xl shadow-sm p-4 md:p-6 ${currentColors.card} backdrop-blur-sm`}
          >
            <h2 className="font-bold text-lg mb-3 md:mb-4">📊 Ringkasan Aktivitas</h2>
            <div className="overflow-x-auto">
              <div className="min-w-[500px] md:w-full">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <th className="text-left py-2 px-3 md:px-4 text-sm md:text-base">Tugas</th>
                      <th className="text-left py-2 px-3 md:px-4 text-sm md:text-base">Status</th>
                      <th className="text-left py-2 px-3 md:px-4 text-sm md:text-base">Komentar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((activity, index) => (
                      <motion.tr
                        key={index}
                        whileHover={{ backgroundColor: darkMode ? 'rgba(45, 55, 72, 0.5)' : 'rgba(240, 253, 250, 0.5)' }}
                        className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                      >
                        <td className="py-2 md:py-3 px-3 md:px-4 text-sm md:text-base">{activity.task}</td>
                        <td className="py-2 md:py-3 px-3 md:px-4 text-sm md:text-base">
                          {activity.status.includes("★") ? (
                            <span className="text-yellow-500">{activity.status}</span>
                          ) : (
                            activity.status
                          )}
                        </td>
                        <td className="py-2 md:py-3 px-3 md:px-4 text-sm md:text-base">
                          {activity.hasAudio ? (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setShowAudioPlayer(!showAudioPlayer)}
                              className="text-green-600 hover:underline"
                            >
                              {activity.comment}
                            </motion.button>
                          ) : (
                            activity.comment
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>

          {/* Progress Graph */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`rounded-xl shadow-sm p-4 md:p-6 ${currentColors.card} backdrop-blur-sm`}
          >
            <h2 className="font-bold text-lg mb-3 md:mb-4">📈 Grafik Perkembangan Mingguan</h2>
            <div className="space-y-2">
              <p className="text-sm md:text-base">Poin Kehadiran : 40</p>
              <div className={`w-full rounded-full h-3 md:h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${attendanceProgress}%` }}
                  transition={{ duration: 1, type: 'spring' }}
                  className="h-3 md:h-4 rounded-full bg-gradient-to-r from-green-500 to-teal-400"
                ></motion.div>
              </div>
              <p className={`text-xs md:text-sm ${currentColors.textSecondary}`}>{attendanceProgress}%</p>
            </div>
          </motion.section>

          {/* Active Tasks */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`rounded-xl shadow-sm p-4 md:p-6 ${currentColors.card} backdrop-blur-sm`}
          >
            <h2 className="font-bold text-lg mb-3 md:mb-4">🎯 Tugas Aktif</h2>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <h3 className="font-medium mb-2 text-sm md:text-base">Harian :</h3>
                <ul className="space-y-2">
                  {dailyTasks.map((task) => (
                    <motion.li 
                      key={task.id}
                      whileHover={{ x: 5 }}
                      className={`flex items-center space-x-2 md:space-x-3 p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-green-50'}`}
                    >
                      <span className={`text-xs md:text-sm ${currentColors.textSecondary}`}>{task.time}</span>
                      <span className="flex-1 text-sm md:text-base">{task.task}</span>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => toggleTaskCompletion('daily', task.id)}
                        className={`p-1 rounded-full ${task.completed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                      >
                        {task.completed ? <FiCheck size={14} /> : <FiX size={14} />}
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2 text-sm md:text-base">Mingguan :</h3>
                <ul className="space-y-2">
                  {weeklyTasks.map((task) => (
                    <motion.li 
                      key={task.id}
                      whileHover={{ x: 5 }}
                      className={`flex items-center justify-between p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-green-50'}`}
                    >
                      <span className="flex-1 text-sm md:text-base">{task.task}</span>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => toggleTaskCompletion('weekly', task.id)}
                        className={`p-1 rounded-full ${task.completed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                      >
                        {task.completed ? <FiCheck size={14} /> : <FiX size={14} />}
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Notifications */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`rounded-xl shadow-sm p-4 md:p-6 ${currentColors.card} backdrop-blur-sm`}
          >
            <h2 className="font-bold text-lg mb-3 md:mb-4">🔔 Notifikasi</h2>
            <div className="space-y-2 md:space-y-3">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => markNotificationAsRead(notification.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all border-l-4 ${
                    notification.type === 'payment' ? 'border-green-500 bg-green-50/50' :
                    notification.type === 'meeting' ? 'border-blue-500 bg-blue-50/50' :
                    notification.type === 'achievement' ? 'border-yellow-500 bg-yellow-50/50' :
                    'border-red-500 bg-red-50/50'
                  } ${darkMode ? 'bg-opacity-20' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm md:text-base">{notification.message}</p>
                    {!notification.read && (
                      <span className={`w-2 h-2 rounded-full ${notification.type === 'payment' ? 'bg-green-500' : 
                        notification.type === 'meeting' ? 'bg-blue-500' : 
                        notification.type === 'achievement' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                    )}
                  </div>
                  {notification.action && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-2 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded-full bg-green-600 text-white"
                    >
                      {notification.action}
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Gallery */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className={`rounded-xl shadow-sm p-4 md:p-6 ${currentColors.card} backdrop-blur-sm`}
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <h2 className="font-bold text-lg mb-1 md:mb-0">GALERI KARYA</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full ${currentColors.button} mt-2 md:mt-0 w-full md:w-auto justify-center`}
              >
                <span className="mr-1 md:mr-2">👁️</span> 
                <span className="text-xs md:text-sm">Lihat Galeri</span>
              </motion.button>
            </div>
            <p className={`mt-1 text-xs md:text-sm ${currentColors.textSecondary}`}>Lihat apa yang sudah ananda kerjakan!</p>
            
            {/* Sample gallery items */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-3 md:mt-4">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.03 }}
                  className={`aspect-square rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-3xl md:text-4xl">🎨</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </main>
      </div>

      {/* Audio Player Modal */}
      <AnimatePresence>
        {showAudioPlayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`p-4 md:p-6 rounded-xl w-full max-w-md ${currentColors.card}`}
            >
              <h3 className="font-bold text-lg mb-3 md:mb-4">Audio Komentar</h3>
              <div className={`p-3 md:p-4 rounded-lg mb-3 md:mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className="text-sm md:text-base">Memutar komentar Tracing (0:21)</p>
                <div className="mt-2 flex items-center space-x-3 md:space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 md:w-10 md:h-10 bg-green-600 text-white rounded-full flex items-center justify-center"
                  >
                    <span className="text-sm md:text-base">▶</span>
                  </motion.button>
                  <div className={`flex-1 rounded-full h-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}>
                    <div className="bg-green-500 h-2 rounded-full w-1/3"></div>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAudioPlayer(false)}
                className={`w-full py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg text-sm md:text-base`}
              >
                Tutup
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ParentDashboard;