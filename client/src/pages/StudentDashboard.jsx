import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiSettings, FiLogOut, FiEye, FiEdit2, FiUpload, FiPlay, FiArrowLeft, FiSun, FiMoon } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('harian');
  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Check screen size and system preference for dark mode
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Data tugas harian
  const dailyTasks = [
    {
      id: 1,
      icon: '🪥',
      title: 'Sikat Gigi Pagi',
      status: 'completed',
      image: 'alika.jpg',
      action: 'edit'
    },
    {
      id: 2,
      icon: '🏫',
      title: 'Kuis Dongeng "Si Kancil"',
      status: 'completed',
      action: 'retry'
    },
    {
      id: 3,
      icon: '✋',
      title: 'Cuci Tangan',
      status: 'pending',
      action: 'upload'
    }
  ];

  // Data tugas mingguan
  const weeklyTasks = [
    {
      id: 1,
      icon: '🎮',
      title: 'Hitung Buah',
      status: 'completed',
      action: 'retry'
    },
    {
      id: 2,
      icon: '🎮',
      title: 'Tebak Binatang',
      status: 'pending',
      action: 'start'
    },
    {
      id: 3,
      icon: '✍️',
      title: 'Tracing Huruf & Angka',
      status: 'completed',
      image: 'alika.jpg',
      action: 'edit'
    }
  ];

  // Data badge
  const badges = [
    {
      id: 1,
      title: 'Anak Emas',
      description: 'Telah mencapai 300 Poin Tugas',
      color: 'orange',
      points: 50
    }
  ];

  // Data perpustakaan digital
  const library = {
    books: [
      {
        id: 1,
        title: 'Si Kancil',
        cover: 'book1.jpg',
        category: 'Dongeng'
      },
      {
        id: 2,
        title: 'Timun Mas',
        cover: 'book2.jpg',
        category: 'Dongeng'
      },
      {
        id: 3,
        title: 'Ayah Yang Sabar',
        cover: 'book3.jpg',
        category: 'Cerita Inspiratif'
      }
    ],
    songs: [
      {
        id: 1,
        title: 'Indonesia Raya',
        category: 'Kebangsaan'
      }
    ]
  };

  // Color scheme
  const colors = {
    light: {
      background: 'bg-gradient-to-br from-blue-50 to-green-50',
      card: 'bg-white',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      button: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    dark: {
      background: 'bg-gradient-to-br from-gray-900 to-gray-800',
      card: 'bg-gray-800',
      text: 'text-gray-100',
      textSecondary: 'text-gray-300',
      border: 'border-gray-700',
      button: 'bg-teal-600 hover:bg-teal-700 text-white'
    }
  };

  const currentColors = darkMode ? colors.dark : colors.light;

  const openBookModal = (book) => {
    setSelectedBook(book);
    setShowBookModal(true);
  };

  const handleBackToParent = () => {
    navigate('/');
  };

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${currentColors.background} ${currentColors.text}`}>
      {/* Header */}
      <header className={`p-4 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'} sticky top-0 z-10`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center text-xl">
              👧
            </div>
            <div>
              <h1 className="font-bold text-lg">HALO ALIKA!</h1>
              <p className={`text-sm ${currentColors.textSecondary}`}>Hari Ini: Rabu, 1 Okt</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-700'}`}
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
            
            <button 
              onClick={handleBackToParent}
              className={`px-3 py-1 rounded-full flex items-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
            >
              <FiArrowLeft className="mr-1" />
              <span className="hidden sm:inline">Orang Tua</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="container mx-auto px-4 pt-4">
        <div className={`flex border-b ${currentColors.border}`}>
          <button
            onClick={() => setActiveTab('harian')}
            className={`flex-1 py-2 font-medium text-sm ${activeTab === 'harian' ? `${darkMode ? 'text-green-400' : 'text-green-600'} border-b-2 ${darkMode ? 'border-green-400' : 'border-green-600'}` : currentColors.textSecondary}`}
          >
            {isMobile ? '🟢' : '🟢 HARIAN'}
          </button>
          <button
            onClick={() => setActiveTab('mingguan')}
            className={`flex-1 py-2 font-medium text-sm ${activeTab === 'mingguan' ? `${darkMode ? 'text-blue-400' : 'text-blue-600'} border-b-2 ${darkMode ? 'border-blue-400' : 'border-blue-600'}` : currentColors.textSecondary}`}
          >
            {isMobile ? '🔵' : '🔵 MINGGUAN'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4 pb-20 space-y-6">
        {/* Tugas Harian */}
        <AnimatePresence mode="wait">
          {activeTab === 'harian' && (
            <motion.section
              key="daily"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`rounded-xl shadow-sm p-4 ${currentColors.card}`}
            >
              <h2 className="font-bold text-lg mb-4">🎯 TUGAS HARIAN</h2>
              <div className="space-y-3">
                {dailyTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    whileHover={{ scale: 1.01 }}
                    className={`p-3 border ${currentColors.border} rounded-lg`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{task.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-medium">{task.title}</h3>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            task.status === 'completed' ? 
                              `${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}` : 
                              `${darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'}`
                          }`}>
                            {task.status === 'completed' ? '✅ Selesai' : '🔄 Proses'}
                          </span>
                          {task.image && (
                            <button className={`text-xs flex items-center ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                              <FiEye className="mr-1" /> Lihat
                            </button>
                          )}
                        </div>
                      </div>
                      <button className={`px-3 py-1 rounded-full text-xs flex items-center ${
                        task.action === 'edit' ? 
                          `${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}` :
                        task.action === 'upload' ? 
                          `${darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'}` :
                          `${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`
                      }`}>
                        {task.action === 'edit' ? (
                          <>
                            <FiEdit2 className="mr-1" /> {!isMobile && 'Edit'}
                          </>
                        ) : task.action === 'upload' ? (
                          <>
                            <FiUpload className="mr-1" /> {!isMobile && 'Upload'}
                          </>
                        ) : (
                          <>
                            <FiPlay className="mr-1" /> {!isMobile && 'Coba Lagi'}
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Tugas Mingguan */}
        <AnimatePresence mode="wait">
          {activeTab === 'mingguan' && (
            <motion.section
              key="weekly"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`rounded-xl shadow-sm p-4 ${currentColors.card}`}
            >
              <h2 className="font-bold text-lg mb-4">🏆 TUGAS MINGGUAN</h2>
              <div className="space-y-3">
                {weeklyTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    whileHover={{ scale: 1.01 }}
                    className={`p-3 border ${currentColors.border} rounded-lg`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{task.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-medium">{task.title}</h3>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            task.status === 'completed' ? 
                              `${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}` : 
                              `${darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'}`
                          }`}>
                            {task.status === 'completed' ? '✅ Selesai' : '🔄 Proses'}
                          </span>
                          {task.image && (
                            <button className={`text-xs flex items-center ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                              <FiEye className="mr-1" /> Lihat
                            </button>
                          )}
                        </div>
                      </div>
                      <button className={`px-3 py-1 rounded-full text-xs flex items-center ${
                        task.action === 'edit' ? 
                          `${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}` :
                        task.action === 'start' ? 
                          `${darkMode ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800'}` :
                          `${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`
                      }`}>
                        {task.action === 'edit' ? (
                          <>
                            <FiEdit2 className="mr-1" /> {!isMobile && 'Edit'}
                          </>
                        ) : task.action === 'start' ? (
                          <>
                            <FiPlay className="mr-1" /> {!isMobile && 'Mulai'}
                          </>
                        ) : (
                          <>
                            <FiPlay className="mr-1" /> {!isMobile && 'Coba Lagi'}
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Koleksi Badge */}
        <section className={`rounded-xl shadow-sm p-4 ${currentColors.card}`}>
          <h2 className="font-bold text-lg mb-4">🎖️ KOLEKSI BADGE</h2>
          <div className="space-y-3">
            {badges.map((badge) => (
              <div key={badge.id} className={`p-3 border ${currentColors.border} rounded-lg flex items-center`}>
                <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-orange-900' : 'bg-orange-100'} flex items-center justify-center text-xl mr-3`}>
                  🟠
                </div>
                <div>
                  <h3 className="font-medium">{badge.title}</h3>
                  <p className={`text-xs ${currentColors.textSecondary}`}>{badge.description}</p>
                  <span className={`text-xs ${darkMode ? 'text-yellow-400' : 'text-yellow-700'} font-medium`}>{badge.points} Poin</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Perpustakaan Digital */}
        <section className={`rounded-xl shadow-sm p-4 ${currentColors.card}`}>
          <h2 className="font-bold text-lg mb-4">📖 PERPUSTAKAAN DIGITAL</h2>
          
          <h3 className="font-medium mb-2">BUKU</h3>
          <div className="space-y-2 mb-4">
            {library.books.map((book) => (
              <div key={book.id} className={`border ${currentColors.border} rounded-lg p-3`}>
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded mr-3 flex items-center justify-center`}>
                    📖
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{book.title}</h4>
                    <p className={`text-xs ${currentColors.textSecondary}`}>{book.category}</p>
                  </div>
                  <button 
                    onClick={() => openBookModal(book)}
                    className={`px-3 py-1 ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} rounded-full text-xs flex items-center`}
                  >
                    <FiEye className="mr-1" /> {!isMobile && 'Baca'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-medium mb-2">LAGU</h3>
          <div className={`border ${currentColors.border} rounded-lg p-3`}>
            <div className="flex items-center">
              <div className={`w-12 h-12 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded mr-3 flex items-center justify-center`}>
                🎵
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{library.songs[0].title}</h4>
                <p className={`text-xs ${currentColors.textSecondary}`}>{library.songs[0].category}</p>
              </div>
              <button className={`px-3 py-1 ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'} rounded-full text-xs flex items-center`}>
                <FiPlay className="mr-1" /> {!isMobile && 'Putar'}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-t ${currentColors.border}`}>
        <div className="container mx-auto flex justify-around p-3">
          <button className={`flex flex-col items-center ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            <FiHome className="text-xl" />
            <span className="text-xs mt-1">Beranda</span>
          </button>
          <button className={`flex flex-col items-center ${currentColors.textSecondary}`}>
            <FiSettings className="text-xl" />
            <span className="text-xs mt-1">Pengaturan</span>
          </button>
          <button className={`flex flex-col items-center ${currentColors.textSecondary}`}>
            <FiLogOut className="text-xl" />
            <span className="text-xs mt-1">Keluar</span>
          </button>
        </div>
      </div>

      {/* Book Modal */}
      <AnimatePresence>
        {showBookModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowBookModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`rounded-xl w-full max-w-md p-6 ${currentColors.card}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-bold text-lg mb-4">{selectedBook?.title}</h3>
              <div className={`w-full h-48 rounded-lg mb-4 flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <span className="text-4xl">📖</span>
              </div>
              <div className="flex justify-between">
                <button className={`px-4 py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg text-sm`}>
                  Baca Nanti
                </button>
                <button className={`px-4 py-2 ${darkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg text-sm`}>
                  Baca Sekarang
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentDashboard;