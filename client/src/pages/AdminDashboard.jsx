import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome, FiSettings, FiLogOut, FiUsers, FiBox, FiBriefcase,
  FiBarChart2, FiList, FiFilter, FiPlusSquare, FiEdit, FiTrash2,
  FiUpload, FiEye, FiEyeOff, FiPrinter, FiFileText, FiChevronDown,
  FiAlertTriangle, FiCheckCircle, FiTrendingUp, FiArchive, FiUserCheck, FiUserX, FiTool
} from 'react-icons/fi'; // Added more icons
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import { useNavigate } from 'react-router-dom'; // Assuming navigation might be needed later

// Helper component for progress bar
const ProgressBar = ({ value, color = 'green' }) => {
  const bgColor = darkMode ? 'bg-gray-600' : 'bg-gray-200';
  let progressColor;
  switch (color) {
    case 'green': progressColor = 'bg-green-500'; break;
    case 'blue': progressColor = 'bg-blue-500'; break;
    case 'yellow': progressColor = 'bg-yellow-500'; break;
    case 'red': progressColor = 'bg-red-500'; break;
    default: progressColor = 'bg-green-500';
  }

  return (
    <div className={`w-full ${bgColor} rounded-full h-2.5 relative`}>
      <div
        className={`${progressColor} h-2.5 rounded-full`}
        style={{ width: `${value}%` }}
      ></div>
      <span className="absolute w-full text-center text-xs right-0 top-0 leading-normal">{value}%</span>
    </div>
  );
};


// Global state for dark mode to be accessible by ProgressBar if needed outside component
let darkMode = false;

const AdminDashboard = () => {
  // const navigate = useNavigate(); // Uncomment if using react-router
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState('beranda'); // Default view
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // State for password visibility (example for one table, would need to be more granular for multiple rows)
  const [showPassword, setShowPassword] = useState({});

  useEffect(() => {
    darkMode = isDarkMode; // Update global darkMode variable
  }, [isDarkMode]);

  const togglePasswordVisibility = (id) => {
    setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
  };


  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const adminInfo = {
    name: "Admin TK Alif",
    avatar: "https://lottie.host/5b590820-010b-4b80-812e-68d3bb9a8661/k1Jd36PZkP.lottie"
  };

  const colors = {
    light: {
      background: 'bg-slate-100',
      card: 'bg-white',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      mutedButton: 'bg-gray-200 hover:bg-gray-300 text-gray-700',
      header: 'bg-white/90',
      tableHeader: 'bg-slate-50',
      filterBg: 'bg-slate-50',
    },
    dark: {
      background: 'bg-gray-900',
      card: 'bg-gray-800',
      text: 'text-gray-100',
      textSecondary: 'text-gray-300',
      border: 'border-gray-700',
      button: 'bg-teal-500 hover:bg-teal-600 text-white',
      mutedButton: 'bg-gray-700 hover:bg-gray-600 text-gray-200',
      header: 'bg-gray-800/90',
      tableHeader: 'bg-gray-700/50',
      filterBg: 'bg-gray-700',
    }
  };
  const currentColors = isDarkMode ? colors.dark : colors.light;

  const sidebarMenuItems = [
    { icon: <FiHome />, label: 'Beranda', id: 'beranda' },
    { icon: <FiArchive />, label: 'Manajemen Kelas', id: 'manajemen_kelas' },
    { icon: <FiUserCheck />, label: 'Manajemen Guru', id: 'manajemen_guru' },
    { icon: <FiUsers />, label: 'Manajemen Siswa', id: 'manajemen_siswa' },
    { icon: <FiTool />, label: 'Manajemen Staff', id: 'manajemen_staff' },
    { icon: <FiTrendingUp />, label: 'Laporan', id: 'laporan_admin' },
    { icon: <FiList />, label: 'Audit Log', id: 'audit_log' },
    { icon: <FiSettings />, label: 'Pengaturan', id: 'pengaturan' },
    { icon: <FiLogOut />, label: 'Keluar', id: 'keluar' }
  ];

  const handleMenuClick = (id) => {
    if (id === 'keluar') {
      console.log("Logout action triggered");
      // Implement logout logic here
      // navigate('/login');
    } else {
      setActiveMenu(id);
      if (isMobile) setMobileMenuOpen(false);
    }
  };

  // --- Sample Data ---
  const dashboardStats = {
    totalMurid: 60,
    guruStaff: 7,
    kelasAktif: 5,
    tugasAktif: 25,
  };

  const daftarKelasData = [
    { id: 'A1', waliKelas: 'Bu Ani', murid: 15, kapasitas: 15 },
    { id: 'B2', waliKelas: 'Pak Budi', murid: 12, kapasitas: 15 },
    { id: 'C1', waliKelas: 'Bu Citra', murid: 10, kapasitas: 12 },
  ];
  
  const dataPengajarData = [
    { id: 1, nama: 'Ani W.', role: 'Guru Kelas', kelas: 'A1', status: 'Aktif', username: 'aniw', password: 'password123' },
    { id: 2, nama: 'Budi P.', role: 'Guru Olahraga', kelas: 'Semua', status: 'Aktif', username: 'budip', password: 'password123' },
  ];

  const dataStaffData = [
    { id: 1, nama: 'Dika', role: 'Security', status: 'Aktif', username: 'dika', password: 'password123' },
    { id: 2, nama: 'Budi S.', role: 'IT', status: 'Cuti', username: 'budis', password: 'password123' },
  ];

  const dataSiswaData = [
    { id: 1, nama: 'Alika P.', usia: '5.2', kelas: 'A1', orangTua: '0812XXXXXX', username: 'alika', password: 'password123' },
    { id: 2, nama: 'Bima S.', usia: '5.5', kelas: 'B2', orangTua: '0813XXXXXX', username: 'bima', password: 'password123' },
  ];

  const auditLogData = [
    { id: 1, waktu: '18/10 14:30', user: 'ani@alif.id', aksi: 'Tambah Murid', target: 'Alika Putri' },
    { id: 2, waktu: '18/10 15:12', user: 'budi@alif.id', aksi: 'Hapus Kelas', target: 'Kelas B' },
  ];


  // --- Render Views ---
  const renderBerandaAdmin = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className={`${currentColors.card} p-6 rounded-lg shadow`}>
        <h2 className="text-xl font-semibold mb-4">📊 DASHBOARD UTAMA</h2>
        <table className={`w-full text-left border-collapse ${currentColors.border}`}>
          <tbody>
            {[
              { label: "TOTAL MURID", value: dashboardStats.totalMurid },
              { label: "GURU & STAFF", value: dashboardStats.guruStaff },
              { label: "KELAS AKTIF", value: dashboardStats.kelasAktif },
              { label: "TUGAS AKTIF", value: dashboardStats.tugasAktif },
            ].map(item => (
              <tr key={item.label} className={`border-b ${currentColors.border}`}>
                <td className="py-3 px-4 font-medium">{item.label}</td>
                <td className="py-3 px-4 text-right">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {label: 'MANAJEMEN KELAS', id: 'manajemen_kelas', icon: <FiArchive className="mr-2"/>},
            {label: 'MANAJEMEN GURU', id: 'manajemen_guru', icon: <FiUserCheck className="mr-2"/>},
            {label: 'MANAJEMEN SISWA', id: 'manajemen_siswa', icon: <FiUsers className="mr-2"/>},
            {label: 'MANAJEMEN STAFF', id: 'manajemen_staff', icon: <FiTool className="mr-2"/>}
          ].map(btn => (
            <motion.button
              key={btn.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveMenu(btn.id)}
              className={`p-4 rounded-lg shadow flex items-center justify-center text-sm font-medium ${currentColors.button}`}
            >
              {btn.icon} {btn.label}
            </motion.button>
          ))}
      </div>
    </motion.div>
  );

  const renderManajemenKelas = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${currentColors.card} p-6 rounded-lg shadow space-y-4`}>
      <h2 className="text-xl font-semibold mb-4">🏫 MANAJEMEN KELAS</h2>
      <div className={`p-4 rounded-md ${currentColors.filterBg} flex flex-wrap gap-4 items-center`}>
        <FiFilter className="text-lg"/> <span className="font-medium">FILTER:</span>
        <div>
          <label className="text-sm mr-2">Tahun Ajaran:</label>
          <select className={`p-2 rounded text-sm ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white border'}`}>
            <option>2024/2025</option>
            <option>2023/2024</option>
          </select>
        </div>
        <div>
          <label className="text-sm mr-2">Jenjang:</label>
          <select className={`p-2 rounded text-sm ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white border'}`}>
            <option>Semua</option>
            <option>Playgroup</option>
            <option>TK A</option>
            <option>TK B</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className={`${currentColors.tableHeader}`}>
            <tr>
              {["Kelas", "Wali Kelas", "Murid", "Kapasitas"].map(h => <th key={h} className="p-3 font-semibold text-sm">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {daftarKelasData.map(k => (
              <tr key={k.id} className={`border-b ${currentColors.border} hover:${isDarkMode ? 'bg-gray-700' : 'bg-slate-50'}`}>
                <td className="p-3">{k.id}</td>
                <td className="p-3">{k.waliKelas}</td>
                <td className="p-3">{k.murid}/{k.kapasitas}</td>
                <td className="p-3"><ProgressBar value={Math.round((k.murid / k.kapasitas) * 100)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-2 pt-4">
        <button className={`flex items-center text-sm px-3 py-2 rounded ${currentColors.button}`}><FiPlusSquare className="mr-1"/> TAMBAH KELAS</button>
        <button className={`flex items-center text-sm px-3 py-2 rounded ${currentColors.mutedButton}`}><FiEdit className="mr-1"/> EDIT BATCH</button>
        <button className={`flex items-center text-sm px-3 py-2 rounded ${currentColors.mutedButton}`}><FiUpload className="mr-1"/> EXPORT</button>
      </div>
    </motion.div>
  );

  const renderManajemenGuru = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${currentColors.card} p-6 rounded-lg shadow space-y-4`}>
      <h2 className="text-xl font-semibold mb-4">👩‍🏫 MANAJEMEN GURU</h2>
       <div className={`p-4 rounded-md ${currentColors.filterBg} flex flex-wrap gap-4 items-center`}>
        <FiFilter className="text-lg"/> <span className="font-medium">FILTER:</span>
        <div>
          <label className="text-sm mr-2">Status:</label>
          <select className={`p-2 rounded text-sm ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white border'}`}>
            <option>Aktif</option>
            <option>Tidak Aktif</option>
          </select>
        </div>
        <div>
          <label className="text-sm mr-2">Kelas:</label>
          <select className={`p-2 rounded text-sm ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white border'}`}>
            <option>Semua</option>
            <option>A1</option><option>B2</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className={`${currentColors.tableHeader}`}>
            <tr>
              {["Nama", "Role", "Kelas", "Status", "Username", "Password", "Aksi"].map(h => <th key={h} className="p-3 font-semibold">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {dataPengajarData.map(guru => (
              <tr key={guru.id} className={`border-b ${currentColors.border} hover:${isDarkMode ? 'bg-gray-700' : 'bg-slate-50'}`}>
                <td className="p-3">{guru.nama}</td>
                <td className="p-3">{guru.role}</td>
                <td className="p-3">{guru.kelas}</td>
                <td className="p-3">{guru.status === 'Aktif' ? <FiCheckCircle className="text-green-500 inline"/> : <FiUserX className="text-red-500 inline"/>} {guru.status}</td>
                <td className="p-3">{guru.username}</td>
                <td className="p-3 flex items-center">
                  {showPassword[guru.id] ? guru.password : '********'}
                  <button onClick={() => togglePasswordVisibility(guru.id)} className="ml-2 p-1">
                    {showPassword[guru.id] ? <FiEyeOff /> : <FiEye />}
                  </button>
                </td>
                <td className="p-3">
                  <button className="mr-2 p-1 hover:text-blue-500"><FiEdit /></button>
                  <button className="p-1 hover:text-red-500"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-2 pt-4">
        <button className={`flex items-center text-sm px-3 py-2 rounded ${currentColors.button}`}><FiPlusSquare className="mr-1"/> TAMBAH GURU</button>
        <button className={`flex items-center text-sm px-3 py-2 rounded ${currentColors.mutedButton}`}><FiUpload className="mr-1"/> EXPORT</button>
      </div>
    </motion.div>
  );
  
  const renderManajemenStaff = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${currentColors.card} p-6 rounded-lg shadow space-y-4`}>
        <h2 className="text-xl font-semibold mb-4">👷‍♂️ MANAJEMEN STAFF</h2>
        <div className={`p-4 rounded-md ${currentColors.filterBg} flex flex-wrap gap-4 items-center`}>
            <FiFilter className="text-lg"/> <span className="font-medium">FILTER:</span>
            <div>
                <label className="text-sm mr-2">Status:</label>
                <select className={`p-2 rounded text-sm ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white border'}`}>
                    <option>Aktif</option>
                    <option>Cuti</option>
                    <option>Tidak Aktif</option>
                </select>
            </div>
            <div>
                <label className="text-sm mr-2">Role:</label>
                <select className={`p-2 rounded text-sm ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white border'}`}>
                    <option>Semua</option>
                    <option>Security</option>
                    <option>IT</option>
                    <option>Admin TU</option>
                </select>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className={`${currentColors.tableHeader}`}>
                    <tr>
                        {["Nama", "Role", "Status", "Username", "Password", "Aksi"].map(h => <th key={h} className="p-3 font-semibold">{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {dataStaffData.map(staff => (
                        <tr key={staff.id} className={`border-b ${currentColors.border} hover:${isDarkMode ? 'bg-gray-700' : 'bg-slate-50'}`}>
                            <td className="p-3">{staff.nama}</td>
                            <td className="p-3">{staff.role}</td>
                            <td className="p-3">
                                {staff.status === 'Aktif' ? <FiCheckCircle className="text-green-500 inline mr-1"/> : staff.status === 'Cuti' ? <FiAlertTriangle className="text-yellow-500 inline mr-1"/> : <FiUserX className="text-red-500 inline mr-1"/>}
                                {staff.status}
                            </td>
                            <td className="p-3">{staff.username}</td>
                            <td className="p-3 flex items-center">
                                {showPassword[`staff-${staff.id}`] ? staff.password : '********'}
                                <button onClick={() => togglePasswordVisibility(`staff-${staff.id}`)} className="ml-2 p-1">
                                    {showPassword[`staff-${staff.id}`] ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </td>
                            <td className="p-3">
                                <button className="mr-2 p-1 hover:text-blue-500"><FiEdit /></button>
                                <button className="p-1 hover:text-red-500"><FiTrash2 /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="flex flex-wrap gap-2 pt-4">
            <button className={`flex items-center text-sm px-3 py-2 rounded ${currentColors.button}`}><FiPlusSquare className="mr-1"/> TAMBAH STAFF</button>
            <button className={`flex items-center text-sm px-3 py-2 rounded ${currentColors.mutedButton}`}><FiUpload className="mr-1"/> EXPORT</button>
        </div>
    </motion.div>
  );

  const renderManajemenSiswa = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${currentColors.card} p-6 rounded-lg shadow space-y-4`}>
        <h2 className="text-xl font-semibold mb-4">👦 MANAJEMEN SISWA</h2>
        <div className={`p-4 rounded-md ${currentColors.filterBg} flex flex-wrap gap-4 items-center text-sm`}>
            <FiFilter className="text-lg"/> <span className="font-medium">FILTER:</span>
            {[
                {label: "Kelas", options: ["Semua", "A1", "B2"]},
                {label: "Status", options: ["Aktif", "Non Aktif"]},
                {label: "Tahun Masuk", options: ["2024", "2023"]},
            ].map(f => (
                <div key={f.label}>
                    <label className="mr-1">{f.label}:</label>
                    <select className={`p-2 rounded ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white border'}`}>
                        {f.options.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                </div>
            ))}
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className={`${currentColors.tableHeader}`}>
                    <tr>
                        {["Nama", "Usia", "Kelas", "Orang Tua", "Username", "Password", "Aksi"].map(h => <th key={h} className="p-3 font-semibold">{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {dataSiswaData.map(siswa => (
                         <tr key={siswa.id} className={`border-b ${currentColors.border} hover:${isDarkMode ? 'bg-gray-700' : 'bg-slate-50'}`}>
                            <td className="p-3">{siswa.nama}</td>
                            <td className="p-3">{siswa.usia}</td>
                            <td className="p-3">{siswa.kelas}</td>
                            <td className="p-3">🔒 {siswa.orangTua}</td>
                            <td className="p-3">{siswa.username}</td>
                            <td className="p-3 flex items-center">
                                {showPassword[`siswa-${siswa.id}`] ? siswa.password : '********'}
                                <button onClick={() => togglePasswordVisibility(`siswa-${siswa.id}`)} className="ml-2 p-1">
                                    {showPassword[`siswa-${siswa.id}`] ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </td>
                            <td className="p-3">
                                <button className="mr-2 p-1 hover:text-blue-500"><FiEdit /></button>
                                <button className="p-1 hover:text-red-500"><FiTrash2 /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="flex flex-wrap gap-2 pt-4">
            <button className={`flex items-center text-sm px-3 py-2 rounded ${currentColors.button}`}><FiPlusSquare className="mr-1"/> TAMBAH SISWA</button>
            <button className={`flex items-center text-sm px-3 py-2 rounded ${currentColors.mutedButton}`}><FiFileText className="mr-1"/> BUAT LAPORAN</button>
            <button className={`flex items-center text-sm px-3 py-2 rounded ${currentColors.mutedButton}`}><FiUpload className="mr-1"/> EXPORT</button>
        </div>
    </motion.div>
  );
  
  const renderLaporanAdmin = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className={`${currentColors.card} p-6 rounded-lg shadow`}>
            <h2 className="text-xl font-semibold mb-1 text-center">📊 LAPORAN BULANAN ADMIN</h2>
            <p className="text-center text-sm mb-4 ${currentColors.textSecondary}">📅 OKTOBER 2025</p>
            
            <div className={`${currentColors.card} p-4 rounded-md shadow-inner mb-6`}>
                <h3 className="font-semibold mb-3 text-center">📈 RINGKASAN KINERJA BULANAN</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    {[
                        { title: "KEHADIRAN", value: "85%", change: "+12% vs Sep'25", bar:85 },
                        { title: "TUGAS", value: "65%", change: "-5% vs Sep'25", bar:65 },
                        { title: "PEMBAYARAN", value: "92%", change: "(3 unpaid)", bar:92 },
                    ].map(item => (
                        <div key={item.title} className={`p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-slate-50'}`}>
                            <p className="font-medium text-sm">{item.title}</p>
                            <div className="my-2 h-6"><ProgressBar value={item.bar}/></div>
                            <p className="text-2xl font-bold">{item.value}</p>
                            <p className={`text-xs ${currentColors.textSecondary}`}>{item.change}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className={`${currentColors.card} p-4 rounded-md shadow-inner mb-6`}>
                <h3 className="font-semibold mb-3">🏫 DETAIL KELAS</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className={`${currentColors.tableHeader}`}>
                            <tr>{["Kelas", "Guru", "Kehadiran", "Pembayaran", "Aksi"].map(h => <th key={h} className="p-2 font-semibold">{h}</th>)}</tr>
                        </thead>
                        <tbody>
                            {[
                                { kelas: "A", guru: "Bu Dian", kehadiran: "92%", pembayaran: "100%" },
                                { kelas: "B", guru: "Pak Rudi", kehadiran: "88%", pembayaran: "85%" },
                                { kelas: "C", guru: "Bu Siti", kehadiran: "75%", pembayaran: "100%" },
                            ].map(k => (
                                <tr key={k.kelas} className={`border-b ${currentColors.border} hover:${isDarkMode ? 'bg-gray-700' : 'bg-slate-50'}`}>
                                    <td className="p-2">{k.kelas}</td>
                                    <td className="p-2">{k.guru}</td>
                                    <td className="p-2">{k.kehadiran}</td>
                                    <td className="p-2">{k.pembayaran}</td>
                                    <td className="p-2"><button className="p-1 hover:text-blue-500"><FiBarChart2 /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className={`${currentColors.card} p-4 rounded-md shadow-inner`}>
                 <h3 className="font-semibold mb-3">⚠️ CATATAN PENTING</h3>
                 <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><span className="text-red-500 font-semibold">🔴 Kelas C:</span> Kehadiran terendah (75%)</li>
                    <li><span className="text-red-500 font-semibold">🔴 3 Orang Tua (Kelas B)</span> belum lunasi SPP</li>
                    <li><span className="text-green-500 font-semibold">🟢 Kelas A:</span> Peningkatan 5% partisipasi dongeng</li>
                 </ul>
            </div>
            {/* Placeholder for Detail Kelas onClick */}
        </div>
    </motion.div>
  );

  const renderAuditLog = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${currentColors.card} p-6 rounded-lg shadow space-y-4`}>
      <h2 className="text-xl font-semibold mb-4">🛡️ AUDIT SISTEM LOG</h2>
      <div className={`p-4 rounded-md ${currentColors.filterBg} flex flex-wrap gap-4 items-center text-sm`}>
        <FiFilter className="text-lg"/> <span className="font-medium">FILTER:</span>
        {[
            {label: "User", options: ["Semua", "ani@alif.id", "budi@alif.id"]},
            {label: "Aksi", options: ["Semua", "Tambah Murid", "Hapus Kelas"]},
            {label: "Rentang Waktu", options: ["Minggu Ini", "Bulan Ini"]},
        ].map(f => (
            <div key={f.label}>
                <label className="mr-1">{f.label}:</label>
                <select className={`p-2 rounded ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white border'}`}>
                    {f.options.map(opt => <option key={opt}>{opt}</option>)}
                </select>
            </div>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className={`${currentColors.tableHeader}`}>
            <tr>{["WAKTU", "USER", "AKSI", "TARGET"].map(h => <th key={h} className="p-3 font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {auditLogData.map(log => (
              <tr key={log.id} className={`border-b ${currentColors.border} hover:${isDarkMode ? 'bg-gray-700' : 'bg-slate-50'}`}>
                <td className="p-3">{log.waktu}</td>
                <td className="p-3">{log.user}</td>
                <td className="p-3">{log.aksi}</td>
                <td className="p-3">{log.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-2 pt-4">
        <button className={`flex items-center text-sm px-3 py-2 rounded ${currentColors.mutedButton}`}><FiUpload className="mr-1"/> EXPORT CSV</button>
        <button className={`flex items-center text-sm px-3 py-2 rounded ${currentColors.mutedButton}`}><FiPrinter className="mr-1"/> CETAK</button>
      </div>
    </motion.div>
  );

  const renderPengaturan = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${currentColors.card} p-6 rounded-lg shadow`}>
      <h2 className="text-xl font-semibold mb-4">⚙️ PENGATURAN</h2>
      <p>Halaman pengaturan akan datang.</p>
      {/* Add settings options here */}
    </motion.div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'beranda': return renderBerandaAdmin();
      case 'manajemen_kelas': return renderManajemenKelas();
      case 'manajemen_guru': return renderManajemenGuru();
      case 'manajemen_staff': return renderManajemenStaff();
      case 'manajemen_siswa': return renderManajemenSiswa();
      case 'laporan_admin': return renderLaporanAdmin();
      case 'audit_log': return renderAuditLog();
      case 'pengaturan': return renderPengaturan();
      default: return renderBerandaAdmin();
    }
  };

  const isMobile = windowWidth < 768;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${currentColors.background} ${currentColors.text}`}>
      <motion.header
        initial={{ y: -20 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 300 }}
        className={`p-4 shadow-sm ${currentColors.header} backdrop-blur-md sticky top-0 z-20`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {isMobile && (
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-full"><FiMenu className="text-lg" /></button>
            )}
            <motion.div whileHover={{ scale: 1.05 }} className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 ${isDarkMode ? 'border-teal-500' : 'border-blue-500'}">
              <DotLottieReact src={adminInfo.avatar} loop autoplay style={{ width: '100%', height: '100%' }} />
            </motion.div>
            <div>
              <h1 className="font-bold text-lg">Admin Panel TK Alif</h1>
              <p className={`text-xs md:text-sm ${currentColors.textSecondary}`}>Selamat Datang, {adminInfo.name.split(' ')[0]}!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-700'}`}>
              {isDarkMode ? <FiSun className="text-sm md:text-base" /> : <FiMoon className="text-sm md:text-base" />}
            </button>
            {/* Notification icon can be added here if needed */}
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }} className={`overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md z-10`}
          >
            <div className="p-4 space-y-2">
              {sidebarMenuItems.map((item) => (
                <motion.button
                  key={item.id} whileTap={{ scale: 0.98 }} onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left ${activeMenu === item.id ? (isDarkMode ? 'bg-teal-900/50 text-white' : 'bg-blue-100 text-blue-800') : `hover:${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}`}
                >
                  <span className={`text-lg ${activeMenu === item.id ? (isDarkMode ? 'text-teal-400' : 'text-blue-600') : currentColors.textSecondary}`}>{item.icon}</span>
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4 md:gap-6">
        {!isMobile && (
          <motion.aside
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className={`md:w-64 rounded-xl shadow-sm p-4 ${currentColors.card} backdrop-blur-sm h-fit sticky top-24 z-10`}
          >
            <div className="flex flex-col space-y-2">
              {sidebarMenuItems.map((item) => (
                <motion.button
                  key={item.id} whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }} onClick={() => handleMenuClick(item.id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg text-left transition-all ${activeMenu === item.id ? (isDarkMode ? 'bg-teal-900/50 text-white' : 'bg-blue-100 text-blue-800') : `hover:${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}`}
                >
                  <span className={`text-lg ${activeMenu === item.id ? (isDarkMode ? 'text-teal-400' : 'text-blue-600') : currentColors.textSecondary}`}>{item.icon}</span>
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.aside>
        )}
        <main className="flex-1 space-y-4 md:space-y-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;