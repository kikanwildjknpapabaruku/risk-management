import React, { useState, useEffect } from 'react';

// --- KONFIGURASI API ---
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwGR4Mnd3BISeX0IyD_tfuzEycuvHl7R5tyD205tT8yjEY4DrMmYHNSI6XQgouck5712g/exec";

// --- KONSTANTA TOKEN ---
const STATIC_TOKEN = "kanwilDJKN#17";

// --- KOMPONEN IKON SVG INLINE ---
const IconAlertCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);
const IconChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
);
const IconRotateCcw = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 2V8H8.5"/><path d="M2.5 8C4.5 4.5 8 2.5 12 2.5C17.5 2.5 22 7 22 12.5C22 18 17.5 22.5 12 22.5C7.5 22.5 3.5 19.5 2.5 15.5"/></svg>
);
const IconLayoutGrid = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
);
const IconX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);
const IconFileText = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
);
const IconCalendar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
const IconPrinter = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
);
const IconPlus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);
const IconTrash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
);
const IconCloudUpload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
);
const IconLoader = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
);
const IconLock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const IconLogOut = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
);
const IconFilter = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
);

// --- KONSTANTA DATA ---
const riskData = [
  { id: 1, text: "Adanya keluhan/aduan layanan yang belum selesai ditindaklanjuti" },
  { id: 2, text: "Adanya pelaksanaan pemanfaatan BMN K/L yang tidak sesuai dengan ketentuan yang berlaku" },
  { id: 3, text: "Adanya ketidaksesuaian data sertipikat fisik, database pertanahan nasional, dan kondisi riil di lapangan" },
  { id: 4, text: "Kegiatan Pembinaan belum memenuhi harapan peserta pembinaan" },
  { id: 5, text: "Adanya penilai pada instansi pengguna yang belum aktif menilai​" },
  { id: 6, text: "Piutang negara yang disetor rendah" },
  { id: 7, text: "Adanya pembatalan lelang" },
  { id: 8, text: "Rendahnya kepatuhan K/L dalam pengawasan dan pengendalian BMN" },
  { id: 9, text: "BMN Berupa Tanah Tidak Dilengkapi Dokumen Kepemilikan (Sertipikat Hak Pakai)" },
  { id: 10, text: "Rendahnya Pelunasan Berkhas Kasus Piutang Negara" },
  { id: 11, text: "Adanya permohonan penilaian yang terlaksana lebih cepat dari SOP" },
  { id: 12, text: "Terdapat frekuensi Lelang HT dan Lelang Wajib BMN yang TAP (tidak laku)" },
  { id: 13, text: "Kegiatan Learning Organization belum terdokumentasi dengan baik​" },
  { id: 14, text: "Tidak tercapainya target output yang telah ditetapkan" },
  { id: 15, text: "Pemberkasan kearsipan tidak dilaksanakan sesuai ketentuan" },
  { id: 16, text: "Persepsi negatif masyarakat atas pemberitaan di media massa dan media sosial" },
  { id: 17, text: "Putusan Pengadilan Kalah" },
  { id: 18, text: "Adanya tangkap tangan, pungutan liar, tindakan korupsi​​" },
  { id: 19, text: "Ownership pegawai terhadap organisasi" },
  { id: 20, text: "Laporan Kinerja dan Risiko disampaikan terlambat/tidak sesuai ketentuan" }
];

// --- DATA BESARAN RISIKO AWAL (PY) DAN RESIDUAL HARAPAN ---
const initialRiskValues = {
  1: { py: 6, res: 5 },
  2: { py: 16, res: 10 },
  3: { py: 13, res: 5 },
  4: { py: 10, res: 5 },
  5: { py: 6, res: 2 },
  6: { py: 9, res: 8 },
  7: { py: 14, res: 11 },
  8: { py: 8, res: 5 },
  9: { py: 13, res: 10 },
  10: { py: 13, res: 6 },
  11: { py: 9, res: 12 },
  12: { py: 14, res: 11 },
  13: { py: 11, res: 5 },
  14: { py: 11, res: 5 },
  15: { py: 11, res: 5 },
  16: { py: 11, res: 5 },
  17: { py: 5, res: 1 },
  18: { py: 16, res: 10 },
  19: { py: 18, res: 11 },
  20: { py: 8, res: 5 }
};

// --- KONSTANTA FILTER BIDANG ---
const bidangFilters = {
  "Semua Bidang": [],
  "Bagian Umum": [1, 13, 14, 15, 20],
  "Bidang Pengelolaan Kekayaan Negara": [1, 2, 3, 4, 8, 9],
  "Bidang Lelang": [1, 7, 12],
  "Bidang Penilaian": [1, 5, 11],
  "Bidang Piutang Negara": [1, 4, 6, 10],
  "Bidang Kepatuhan Internal, Hukum, dan Informasi": [1, 16, 17, 18, 19, 20]
};

const periods = ["TW I", "TW II", "TW III", "TW IV"];
const levels = [5, 4, 3, 2, 1];
const impacts = [1, 2, 3, 4, 5];

const impactLabels = {
  1: "Tidak Signifikan",
  2: "Minor",
  3: "Moderat",
  4: "Signifikan",
  5: "Sangat Signifikan"
};

const likelihoodLabels = {
  5: { top: "HAMPIR PASTI TERJADI", bottom: "Terjadi sangat sering (>80%)" },
  4: { top: "SERING TERJADI", bottom: "Kemungkinan besar (60-80%)" },
  3: { top: "KADANG TERJADI", bottom: "Mungkin terjadi (40-60%)" },
  2: { top: "JARANG TERJADI", bottom: "Kecil kemungkinan (20-40%)" },
  1: { top: "HAMPIR TIDAK TERJADI", bottom: "Sangat jarang (<20%)" }
};

const bgNumbers = {
  "5-1": 7, "5-2": 12, "5-3": 17, "5-4": 22, "5-5": 25,
  "4-1": 4, "4-2": 9,  "4-3": 14, "4-4": 19, "4-5": 24,
  "3-1": 3, "3-2": 8,  "3-3": 13, "3-4": 18, "3-5": 23,
  "2-1": 2, "2-2": 6,  "2-3": 11, "2-4": 16, "2-5": 21,
  "1-1": 1, "1-2": 5,  "1-3": 10, "1-4": 15, "1-5": 20,
};

const getCellColor = (l, i) => {
  if (l === 5) {
    if (i === 1) return 'bg-[#4ade80]'; 
    if (i === 2) return 'bg-[#facc15]'; 
    if (i === 3) return 'bg-[#fb923c]'; 
    return 'bg-[#ef4444] text-white';   
  }
  if (l === 4) {
    if (i === 1) return 'bg-[#60a5fa] text-white'; 
    if (i === 2) return 'bg-[#4ade80]';
    if (i === 3) return 'bg-[#facc15]';
    if (i === 4) return 'bg-[#fb923c]';
    return 'bg-[#ef4444] text-white';
  }
  if (l === 3) {
    if (i === 1) return 'bg-[#60a5fa] text-white';
    if (i === 2) return 'bg-[#4ade80]';
    if (i === 3) return 'bg-[#facc15]';
    if (i === 4) return 'bg-[#fb923c]';
    return 'bg-[#ef4444] text-white';
  }
  if (l === 2) {
    if (i === 1) return 'bg-[#60a5fa] text-white';
    if (i <= 3) return 'bg-[#4ade80]';
    if (i === 4) return 'bg-[#fb923c]';
    return 'bg-[#ef4444] text-white';
  }
  if (l === 1) {
    if (i <= 2) return 'bg-[#60a5fa] text-white';
    if (i === 3) return 'bg-[#4ade80]';
    if (i === 4) return 'bg-[#facc15]';
    return 'bg-[#ef4444] text-white';
  }
  return 'bg-white';
};

// --- KOMPONEN PEMBANTU ---

const RiskMarker = ({ id, text, onDragStart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart ? onDragStart(e, id) : null}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-9 h-9 flex items-center justify-center cursor-grab active:cursor-grabbing transition-all hover:scale-125 z-30 drop-shadow-md shrink-0 marker-icon"
    >
      <div className="absolute inset-0 bg-slate-900 rotate-45 rounded-sm shadow-black/50 shadow-sm border border-slate-700"></div>
      <div className="absolute inset-0 bg-slate-900 rotate-0 rounded-sm border border-slate-700"></div>
      <span className="relative text-white font-bold text-[11px] select-none">{id}</span>
      
      {/* Tooltip dengan state lokal - hanya muncul jika item ini dihover */}
      <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-3 py-2 rounded-lg shadow-xl transition-all pointer-events-none z-[100] no-print w-48 text-center leading-snug border border-slate-600 ${isHovered ? 'scale-100' : 'scale-0'}`}>
        {text || `Risiko #${id}`}
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm no-print">
      <div className="bg-white w-full max-w-[98vw] max-h-[95vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <div className="w-6 h-6 flex items-center justify-center"><IconX /></div>
          </button>
        </div>
        <div className="p-6 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- KOMPONEN UTAMA ---

const App = () => {
  // --- STATE AUTH ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenInput, setTokenInput] = useState("");

  const [selectedPeriod, setSelectedPeriod] = useState("TW I");
  const [selectedBidang, setSelectedBidang] = useState("Semua Bidang"); // State baru untuk filter bidang
  const [isLikelihoodModalOpen, setLikelihoodModalOpen] = useState(false);
  const [isImpactModalOpen, setImpactModalOpen] = useState(false);
  const [selectedRiskDetail, setSelectedRiskDetail] = useState(null);
  
  // Status untuk operasi API
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: '' }

  // Initial State Data
  const [riskPositions, setRiskPositions] = useState(() => {
    const initial = {};
    periods.forEach(p => {
      initial[p] = {};
      for (let i = 1; i <= 20; i++) initial[p][i] = 'pool';
    });
    return initial;
  });

  const [riskDetailData, setRiskDetailData] = useState(() => {
    const initial = {};
    periods.forEach(p => {
      initial[p] = {};
      riskData.forEach(r => {
        initial[p][r.id] = {
          explanation: "",
          mitigationsImplemented: [""],
          mitigationPlans: [""]
        };
      });
    });
    return initial;
  });

  // --- API INTEGRATION ---

  // 1. Fetch data on load
  useEffect(() => {
    const fetchData = async () => {
      // Hanya fetch data jika sudah login
      if (!isAuthenticated) return;

      setIsLoading(true);
      try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const data = await response.json();
        
        if (data && data.positions) {
            setRiskPositions(data.positions);
        }
        if (data && data.details) {
            setRiskDetailData(data.details);
        }
        
      } catch (error) {
        console.error("Gagal memuat data:", error);
        setNotification({ type: 'error', message: 'Gagal memuat data dari Spreadsheet.' });
        setTimeout(() => setNotification(null), 3000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]); // Dependency berubah ke isAuthenticated agar load data setelah login

  // 2. Save data function
  const handleSaveToCloud = async () => {
    setIsLoading(true);
    setNotification(null);

    const payload = {
        action: 'save',
        riskData: riskData, // Data referensi statis
        details: riskDetailData, // Data input user
        positions: riskPositions // Data posisi user
    };

    try {
        // Menggunakan fetch dengan method POST stringified body
        // Google Apps Script doPost menangani ini
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        setNotification({ type: 'success', message: 'Data berhasil disimpan ke Spreadsheet!' });
        setTimeout(() => setNotification(null), 3000);
    } catch (error) {
        console.error("Gagal menyimpan:", error);
        setNotification({ type: 'error', message: 'Gagal menyimpan data. Cek koneksi internet.' });
        setTimeout(() => setNotification(null), 5000);
    } finally {
        setIsLoading(false);
    }
  };


  const handleDragStart = (e, riskId) => {
    e.dataTransfer.setData("riskId", riskId);
  };

  const handleDrop = (e, targetLocation) => {
    e.preventDefault();
    const riskId = e.dataTransfer.getData("riskId");
    if (riskId) {
      setRiskPositions(prev => ({
        ...prev,
        [selectedPeriod]: {
          ...prev[selectedPeriod],
          [riskId]: targetLocation
        }
      }));
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const resetPositions = () => {
    if(window.confirm("Apakah Anda yakin ingin mereset posisi risiko untuk periode ini? Data yang belum disimpan ke Cloud akan hilang.")) {
        setRiskPositions(prev => ({
        ...prev,
        [selectedPeriod]: Object.fromEntries(
            Array.from({ length: 20 }, (_, i) => [i + 1, 'pool'])
        )
        }));
    }
  };

  const getScoreForPeriod = (riskId, period) => {
    const pos = riskPositions[period][riskId];
    if (!pos || pos === 'pool') return '-';
    return bgNumbers[pos] || '-';
  };

  const handlePrint = () => {
    window.print();
  };

  const updateRiskDetail = (field, value, index = null) => {
    if (!selectedRiskDetail) return;
    
    setRiskDetailData(prev => {
      const updatedPeriodData = { ...prev[selectedPeriod] };
      const updatedRisk = { ...updatedPeriodData[selectedRiskDetail.id] };
      
      if (index !== null) {
        const newList = [...updatedRisk[field]];
        newList[index] = value;
        updatedRisk[field] = newList;
      } else {
        updatedRisk[field] = value;
      }
      
      updatedPeriodData[selectedRiskDetail.id] = updatedRisk;
      return { ...prev, [selectedPeriod]: updatedPeriodData };
    });
  };

  const addListItem = (field) => {
    setRiskDetailData(prev => {
      const updatedRisk = { ...prev[selectedPeriod][selectedRiskDetail.id] };
      updatedRisk[field] = [...updatedRisk[field], ""];
      return {
        ...prev,
        [selectedPeriod]: {
          ...prev[selectedPeriod],
          [selectedRiskDetail.id]: updatedRisk
        }
      };
    });
  };

  const removeListItem = (field, index) => {
    setRiskDetailData(prev => {
      const updatedRisk = { ...prev[selectedPeriod][selectedRiskDetail.id] };
      if (updatedRisk[field].length > 1) {
        updatedRisk[field] = updatedRisk[field].filter((_, i) => i !== index);
      }
      return {
        ...prev,
        [selectedPeriod]: {
          ...prev[selectedPeriod],
          [selectedRiskDetail.id]: updatedRisk
        }
      };
    });
  };

  // --- HANDLER LOGIN ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (tokenInput === STATIC_TOKEN) {
        setIsAuthenticated(true);
        setNotification({ type: 'success', message: 'Token Diterima. Selamat Datang!' });
        setTimeout(() => setNotification(null), 3000);
    } else {
        setNotification({ type: 'error', message: 'Token Salah! Akses Ditolak.' });
        setTimeout(() => setNotification(null), 3000);
        setTokenInput("");
    }
  };

  // --- HALAMAN LOGIN (JIKA BELUM AUTH) ---
  if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-800">
             {/* NOTIFICATION TOAST LOGIN */}
            {notification && (
                <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce ${notification.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                    <div className="font-bold">{notification.message}</div>
                </div>
            )}

            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200">
                <div className="p-10 flex flex-col items-center">
                    <div className="p-5 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200 mb-6 flex items-center justify-center">
                        <div className="w-10 h-10 text-white"><IconLock /></div>
                    </div>
                    
                    <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight text-center mb-2">
                        Risk Management DJKN Papabaruku
                    </h1>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest text-center mb-8">
                        Restricted Access Area
                    </p>

                    <form onSubmit={handleLogin} className="w-full space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider pl-2">
                                Masukkan Token Akses
                            </label>
                            <div className="relative">
                                <input 
                                    type="password" 
                                    value={tokenInput}
                                    onChange={(e) => setTokenInput(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none text-center font-bold tracking-[0.3em] text-indigo-900 placeholder:tracking-normal transition-all"
                                    autoFocus
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] mt-4"
                        >
                            Masuk Aplikasi
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 w-full text-center">
                        <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                            Enterprise Risk System v2.1
                        </span>
                    </div>
                </div>
            </div>
        </div>
      );
  }

  // --- DASHBOARD UTAMA (JIKA SUDAH AUTH) ---
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-10 flex flex-col items-center font-sans text-slate-800">
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 10mm; }
          body { background: white !important; padding: 0 !important; margin: 0 !important; }
          .no-print { display: none !important; }
          .print-area { 
            width: 100% !important; 
            max-width: none !important; 
            border: none !important; 
            box-shadow: none !important; 
            margin: 0 !important;
            border-radius: 0 !important;
            padding: 0 !important;
            display: block !important;
          }
          th, td { border: 0.5pt solid #cbd5e1 !important; }
        }
      `}</style>

      {/* NOTIFICATION TOAST */}
      {notification && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce ${notification.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
            <div className="font-bold">{notification.message}</div>
        </div>
      )}

      {/* LOADING OVERLAY */}
      {isLoading && (
        <div className="fixed inset-0 z-[200] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center flex-col gap-4 text-white">
            <div className="w-12 h-12"><IconLoader /></div>
            <div className="font-bold tracking-widest uppercase animate-pulse">Sedang Memproses Data...</div>
        </div>
      )}

      {/* LOGOUT BUTTON (Fixed Bottom Right) */}
      <button 
        onClick={() => {
            setIsAuthenticated(false);
            setTokenInput("");
        }}
        className="fixed bottom-5 right-5 z-50 p-3 bg-white text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full shadow-lg border border-slate-200 transition-all no-print"
        title="Keluar Aplikasi"
      >
        <div className="w-6 h-6"><IconLogOut /></div>
      </button>

      {/* Main Container */}
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-[2.5rem] overflow-hidden border border-slate-200 mb-10 print-area">
        <div className="bg-white p-8 border-b border-slate-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-100 flex items-center justify-center no-print">
                <div className="w-8 h-8 text-white"><IconLayoutGrid /></div>
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-slate-800 tracking-tight uppercase">Dashboard Matriks Risiko</h1>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full animate-pulse no-print ${isLoading ? 'bg-yellow-400' : 'bg-green-500'}`}></span>
                  PERIODE RISIKO - {selectedPeriod}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 items-center no-print">
              
               {/* TOMBOL SIMPAN KE CLOUD */}
               <button onClick={handleSaveToCloud} disabled={isLoading} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                <div className="w-4 h-4"><IconCloudUpload /></div> Simpan ke Spreadsheet
              </button>

              <button onClick={handlePrint} className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl transition-all font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95">
                <div className="w-4 h-4"><IconPrinter /></div> Cetak PDF
              </button>

              <div className="relative flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                <div className="w-4 h-4 text-indigo-500"><IconCalendar /></div>
                <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} className="bg-transparent text-xs font-black uppercase tracking-widest text-slate-700 outline-none cursor-pointer">
                  {periods.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <button onClick={() => setLikelihoodModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-all font-bold text-xs uppercase tracking-wider border border-emerald-200">
                <div className="w-4 h-4"><IconFileText /></div> Kriteria Kemungkinan
              </button>
              
              <button onClick={() => setImpactModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-all font-bold text-xs uppercase tracking-wider border border-blue-200">
                <div className="w-4 h-4"><IconFileText /></div> Kriteria Dampak
              </button>
              
              <button onClick={resetPositions} className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl transition-all font-bold text-xs uppercase tracking-wider border border-slate-200 active:scale-95">
                <div className="w-4 h-4"><IconRotateCcw /></div> Reset
              </button>
            </div>
          </div>
        </div>

        {/* --- DAFTAR RISIKO BELUM TERPLOT (POOL AREA) --- */}
        <div className="bg-slate-50/50 p-8 border-b border-slate-200 no-print">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
              <div className="w-4 h-4 text-indigo-500"><IconChevronRight /></div>
              <span>Daftar Risiko Belum Terplot ({selectedPeriod})</span>
            </div>
            <div 
              onDrop={(e) => handleDrop(e, 'pool')}
              onDragOver={handleDragOver}
              className="min-h-[120px] bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-6 flex flex-wrap items-center justify-center gap-4 shadow-inner transition-all hover:border-indigo-400"
            >
              {Object.keys(riskPositions[selectedPeriod]).map(id => {
                // MENCARI DATA RISIKO BERDASARKAN ID
                const riskInfo = riskData.find(r => r.id === parseInt(id));
                return riskPositions[selectedPeriod][id] === 'pool' && (
                  <RiskMarker 
                    key={id} 
                    id={id} 
                    // MENGIRIM PROPS TEXT KE RISK MARKER
                    text={riskInfo ? riskInfo.text : ""} 
                    onDragStart={handleDragStart} 
                  />
                );
              })}
              {Object.values(riskPositions[selectedPeriod]).every(v => v !== 'pool') && (
                <div className="text-indigo-500 font-black text-xs uppercase tracking-widest animate-pulse">
                  Semua risiko periode ini telah dipetakan
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Matrix Area */}
        <div className="p-4 md:p-12 overflow-x-auto bg-white">
          <table className="w-full min-w-[1000px] table-fixed border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th colSpan="3" rowSpan="2" className="p-6 border border-slate-200">
                    <div className="flex flex-col items-center">
                      <span className="text-xl font-black text-slate-800 uppercase tracking-tighter italic">Risk Map</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Matriks Analisis Risiko 5x5</span>
                    </div>
                </th>
                <th colSpan="5" className="border border-slate-200 bg-slate-800 py-4 font-black text-base uppercase tracking-[0.4em] text-white">Level Dampak (Impact)</th>
              </tr>
              <tr className="bg-slate-100">
                {impacts.map(i => (
                  <th key={i} className="border border-slate-200 py-2">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-black text-slate-700">{i}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter leading-none mt-1">{impactLabels[i]}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {levels.map((l, idx) => (
                <tr key={l}>
                  {idx === 0 && (
                    <td rowSpan="5" className="border border-slate-200 bg-slate-800 w-16 text-center text-white font-black uppercase text-[10px] tracking-widest relative">
                      <div className="rotate-[-90deg] whitespace-nowrap absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        Level Kemungkinan
                      </div>
                    </td>
                  )}
                  <td className="border border-slate-200 bg-slate-50 w-20 text-center font-black text-2xl p-4 text-slate-700">
                    <div className="flex flex-col">
                      <span>{l}</span>
                    </div>
                  </td>
                  <td className="border border-slate-200 bg-white w-52 p-3 text-center align-middle">
                    <div className="flex flex-col leading-tight">
                      <span className="text-[10px] font-black uppercase text-slate-800">{likelihoodLabels[l].top}</span>
                    </div>
                  </td>
                  {impacts.map(i => {
                    const key = `${l}-${i}`;
                    const items = Object.keys(riskPositions[selectedPeriod]).filter(id => riskPositions[selectedPeriod][id] === key);
                    const textColorClass = (l === 5 && i >= 4) || (l === 4 && i === 5) || (l === 3 && i === 5) || (l === 2 && i === 5) || (l === 1 && i === 5) ? 'text-white/40' : 'text-slate-800/20';
                    
                    return (
                      <td 
                        key={i} 
                        onDrop={(e) => handleDrop(e, key)} 
                        onDragOver={handleDragOver} 
                        className={`border border-slate-200 h-32 relative p-2 transition-all group ${getCellColor(l, i)}`}
                      >
                        <div className={`absolute inset-0 flex items-center justify-center text-5xl font-black pointer-events-none select-none transition-all ${textColorClass}`}>
                          {bgNumbers[key]}
                        </div>
                        <div className="relative flex flex-wrap gap-2 justify-center items-center h-full z-20">
                          {items.map(id => {
                            const riskInfo = riskData.find(r => r.id === parseInt(id));
                            return (
                                <RiskMarker 
                                    key={id} 
                                    id={id} 
                                    text={riskInfo ? riskInfo.text : ""} 
                                    onDragStart={handleDragStart} 
                                />
                            );
                          })}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- TABEL DAFTAR KEJADIAN RISIKO --- */}
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-[2.5rem] overflow-hidden border border-slate-200 p-8 print-area mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600 no-print">
              <div className="w-6 h-6"><IconFileText /></div>
            </div>
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Daftar Kejadian Risiko & Besaran Per Periode</h2>
          </div>

          {/* FILTER BIDANG */}
          <div className="relative flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 no-print">
             <div className="w-4 h-4 text-indigo-500"><IconFilter /></div>
             <select 
               value={selectedBidang} 
               onChange={(e) => setSelectedBidang(e.target.value)} 
               className="bg-transparent text-xs font-black uppercase tracking-widest text-slate-700 outline-none cursor-pointer w-full max-w-[200px]"
             >
               {Object.keys(bidangFilters).map(bidang => (
                 <option key={bidang} value={bidang}>{bidang}</option>
               ))}
             </select>
          </div>

        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white uppercase text-[10px] tracking-widest text-left">
                <th className="p-4 w-24 text-center rounded-tl-2xl">Nomor</th>
                <th className="p-4">Kejadian Risiko</th>
                {/* KOLOM BARU: Py */}
                <th className="p-4 w-16 text-center border-r border-slate-600 bg-slate-700 text-white">Py</th>
                {periods.map(p => (
                  <th key={p} className={`p-4 w-20 text-center ${p === selectedPeriod ? 'bg-indigo-700' : ''}`}>
                    {p}
                  </th>
                ))}
                {/* KOLOM BARU: Residual Harapan */}
                <th className="p-4 w-24 text-center rounded-tr-2xl bg-slate-700 text-white">Residual Harapan</th>
              </tr>
            </thead>
            <tbody>
              {/* LOGIKA FILTER DI SINI */}
              {riskData
                .filter(risk => {
                    // Jika "Semua Bidang" dipilih, tampilkan semua
                    if (selectedBidang === "Semua Bidang") return true;
                    // Jika bidang spesifik dipilih, cek apakah ID risiko ada dalam array ID bidang tersebut
                    return bidangFilters[selectedBidang].includes(risk.id);
                })
                .map((risk, idx) => {
                  const scores = initialRiskValues[risk.id] || { py: '-', res: '-' };
                  return (
                    <tr 
                      key={risk.id} 
                      className={`border-b border-slate-100 hover:bg-slate-50 transition-colors group ${riskPositions[selectedPeriod][risk.id] !== 'pool' ? 'bg-indigo-50/30' : ''}`}
                    >
                      <td className="p-4 text-center font-bold text-slate-400">
                        #{risk.id.toString().padStart(2, '0')}
                      </td>
                      <td 
                        className="p-4 text-sm font-medium text-slate-700 leading-relaxed cursor-pointer hover:text-indigo-600 transition-colors"
                        onClick={() => setSelectedRiskDetail(risk)}
                      >
                        <span className="underline decoration-slate-200 underline-offset-4 group-hover:decoration-indigo-300">
                          {risk.text}
                        </span>
                      </td>
                      {/* CELL BARU: Py */}
                      <td className="p-4 text-center border-r border-slate-50 font-bold text-slate-500 bg-slate-50/50">
                        {scores.py}
                      </td>
                      {periods.map(p => (
                        <td key={p} className={`p-4 text-center border-r border-slate-50 font-black text-xs ${p === selectedPeriod ? 'text-indigo-600' : 'text-slate-400'}`}>
                          <div className={`py-1 rounded-md ${p === selectedPeriod && getScoreForPeriod(risk.id, p) !== '-' ? 'bg-indigo-100' : ''}`}>
                            {getScoreForPeriod(risk.id, p)}
                          </div>
                        </td>
                      ))}
                      {/* CELL BARU: Residual Harapan */}
                      <td className="p-4 text-center font-bold text-slate-500 bg-slate-50/50">
                        {scores.res}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODALS --- */}
      
      {/* Modal Kriteria Kemungkinan */}
      <Modal isOpen={isLikelihoodModalOpen} onClose={() => setLikelihoodModalOpen(false)} title="Kriteria Kemungkinan Terjadinya Risiko">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-200 text-xs">
            <thead className="bg-[#a3c15c] text-slate-900 font-bold uppercase">
              <tr>
                <th rowSpan="3" className="border border-slate-300 p-4 w-40 text-center">Level Kemungkinan</th>
                <th colSpan="3" className="border border-slate-300 p-3 text-center">Kriteria Kemungkinan</th>
              </tr>
              <tr>
                <th colSpan="2" className="border border-slate-300 p-2 text-center bg-[#bad675]">kemungkinan terjadinya non low frequency event dalam 1 periode analisis</th>
                <th rowSpan="2" className="border border-slate-300 p-2 text-center bg-[#bad675]">low frequency event</th>
              </tr>
              <tr>
                <th className="border border-slate-300 p-2 text-center bg-[#bad675] w-64">Persentase kemungkinan</th>
                <th className="border border-slate-300 p-2 text-center bg-[#bad675] w-64">Jumlah frekuensi</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                { level: "Hampir tidak terjadi (1)", pct: "p ≤ 1%", freq: "< 2 kali dalam 12 bulan terakhir", low: "≤ 1 kejadian dalam lebih dari 60 bulan terakhir" },
                { level: "Jarang terjadi (2)", pct: "1% < p ≤ 10%", freq: "2 kali s.d. 5 kali dalam 12 bulan terakhir", low: "Minimal 1 kejadian dalam 60 bulan terakhir" },
                { level: "Kadang terjadi (3)", pct: "10% < p ≤ 20%", freq: "6 s.d. 9 kali dalam 12 bulan terakhir", low: "Minimal 1 kejadian dalam 36 bulan terakhir" },
                { level: "Sering terjadi (4)", pct: "20% < p ≤ 50%", freq: "10 kali s.d. 12 kali dalam 12 bulan terakhir", low: "Minimal 1 kejadian dalam 24 bulan terakhir" },
                { level: "Hampir pasti terjadi (5)", pct: "p > 50%", freq: "> 12 kali dalam 12 bulan terakhir", low: "Minimal 1 kejadian dalam 12 bulan terakhir" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="border border-slate-200 p-4 font-medium text-left">{row.level}</td>
                  <td className="border border-slate-200 p-4 text-center">{row.pct}</td>
                  <td className="border border-slate-200 p-4 text-center">{row.freq}</td>
                  <td className="border border-slate-200 p-4 text-center">{row.low}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>

      {/* Modal Kriteria Dampak */}
      <Modal isOpen={isImpactModalOpen} onClose={() => setImpactModalOpen(false)} title="Kriteria Dampak Risiko">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-300 text-[10px] leading-tight">
            <thead className="bg-[#749241] text-white font-bold uppercase text-center">
              <tr>
                <th rowSpan="3" className="border border-slate-300 p-2 w-24">Level Dampak</th>
                <th colSpan="9" className="border border-slate-300 p-2 bg-[#a3c15c] text-slate-900">Area Dampak Risiko</th>
              </tr>
              <tr>
                <th colSpan="3" className="border border-slate-300 p-2 bg-[#bad675] text-slate-900">Beban Keuangan Negara</th>
                <th rowSpan="2" className="border border-slate-300 p-2 bg-[#bad675] text-slate-900 w-44">Penurunan Reputasi</th>
                <th rowSpan="2" className="border border-slate-300 p-2 bg-[#bad675] text-slate-900 w-44">Sanksi Pidana/Perdata</th>
                <th rowSpan="2" className="border border-slate-300 p-2 bg-[#bad675] text-slate-900 w-32">Kecelakaan Kerja</th>
                <th rowSpan="2" className="border border-slate-300 p-2 bg-[#bad675] text-slate-900 w-32">Gangguan Terhadap Layanan Organisasi</th>
                <th rowSpan="2" className="border border-slate-300 p-2 bg-[#bad675] text-slate-900 w-32">Proyek/Inisiatif Strategis</th>
                <th rowSpan="2" className="border border-slate-300 p-2 bg-[#bad675] text-slate-900 w-32">Penurunan Kinerja</th>
              </tr>
              <tr className="bg-[#e4efcd] text-slate-800">
                <th className="border border-slate-300 p-1 w-24">Fraud</th>
                <th className="border border-slate-300 p-1 w-24">Non Fraud penerimaan</th>
                <th className="border border-slate-300 p-1 w-24">Non Fraud lainnya</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 align-top">
              {/* LVL 1 */}
              <tr className="bg-white">
                <td className="border border-slate-300 p-2 font-bold bg-slate-50 italic">Tidak signifikan (1)</td>
                <td className="border border-slate-300 p-2">x ≤ Rp 1 Juta</td>
                <td className="border border-slate-300 p-2">x ≤ 1 permil</td>
                <td className="border border-slate-300 p-2">x ≤ 0,5 permil</td>
                <td className="border border-slate-300 p-2 leading-relaxed">Keluhan ≤ 10; Kepercayaan sangat baik; Kepuasan 4.25-5.0</td>
                <td className="border border-slate-300 p-2">Adm: Pejabat Eselon IV/Fungsional/Pelaksana</td>
                <td className="border border-slate-300 p-2">Ancaman fisik dan/atau psikis</td>
                <td className="border border-slate-300 p-2">x &lt; 15% jam operasional harian</td>
                <td className="border border-slate-300 p-2">Deviasi &lt; 1%; Budget &lt; 1%</td>
                <td className="border border-slate-300 p-2">X ≤ 5% target kinerja</td>
              </tr>
              {/* LVL 2 */}
              <tr className="bg-slate-50/30">
                <td className="border border-slate-300 p-2 font-bold bg-slate-50 italic">Minor (2)</td>
                <td className="border border-slate-300 p-2">Rp 1 jt &lt; x ≤ Rp 10 jt</td>
                <td className="border border-slate-300 p-2">1-5 permil</td>
                <td className="border border-slate-300 p-2">0,5-2,5 permil</td>
                <td className="border border-slate-300 p-2 leading-relaxed">Keluhan &gt; 10; Kepercayaan baik; Kepuasan 4.0-4.25</td>
                <td className="border border-slate-300 p-2">Perdata: ≤ 100jt; Adm: Eselon III</td>
                <td className="border border-slate-300 p-2">Cedera ringan, gangguan mental ringan</td>
                <td className="border border-slate-300 p-2">15-40% jam operasional harian</td>
                <td className="border border-slate-300 p-2">Deviasi 1-5%; Budget 1-5%</td>
                <td className="border border-slate-300 p-2">5-10% target kinerja</td>
              </tr>
              {/* LVL 3 */}
              <tr className="bg-white">
                <td className="border border-slate-300 p-2 font-bold bg-slate-50 italic">Moderat (3)</td>
                <td className="border border-slate-300 p-2">Rp 10 jt &lt; x ≤ Rp 100 jt</td>
                <td className="border border-slate-300 p-2">5-10 permil</td>
                <td className="border border-slate-300 p-2">2,5-5 permil</td>
                <td className="border border-slate-300 p-2 leading-relaxed">Pemberitaan negatif sosial/media lokal masif</td>
                <td className="border border-slate-300 p-2">Pidana ≤ 1 thn; Perdata ≤ 1M; Adm: Eselon II</td>
                <td className="border border-slate-300 p-2">Cedera sedang, gangguan mental sedang</td>
                <td className="border border-slate-300 p-2">40-65% jam operasional harian</td>
                <td className="border border-slate-300 p-2">Deviasi 5-10%; Budget 5-10%</td>
                <td className="border border-slate-300 p-2">10-20% target kinerja</td>
              </tr>
              {/* LVL 4 */}
              <tr className="bg-slate-50/30">
                <td className="border border-slate-300 p-2 font-bold bg-slate-50 italic">Signifikan (4)</td>
                <td className="border border-slate-300 p-2">Rp 100 jt &lt; x ≤ Rp 1 M</td>
                <td className="border border-slate-300 p-2">10-20 permil</td>
                <td className="border border-slate-300 p-2">5-10 permil</td>
                <td className="border border-slate-300 p-2 leading-relaxed">Pemberitaan negatif opinion leader nasional masif</td>
                <td className="border border-slate-300 p-2">Pidana 1-2 thn; Perdata ≤ 10M; Adm: Eselon I</td>
                <td className="border border-slate-300 p-2">Cedera berat, gangguan mental berat</td>
                <td className="border border-slate-300 p-2">65-80% jam operasional harian</td>
                <td className="border border-slate-300 p-2">Deviasi 10-20%; Budget 10-20%</td>
                <td className="border border-slate-300 p-2">20-25% target kinerja</td>
              </tr>
              {/* LVL 5 */}
              <tr className="bg-white">
                <td className="border border-slate-300 p-2 font-bold bg-slate-50 italic text-red-600">Sangat signifikan (5)</td>
                <td className="border border-slate-300 p-2">x &gt; Rp 1 M</td>
                <td className="border border-slate-300 p-2">x &gt; 20 permil</td>
                <td className="border border-slate-300 p-2">x &gt; 10 permil</td>
                <td className="border border-slate-300 p-2 leading-relaxed">Pemberitaan media massa internasional masif</td>
                <td className="border border-slate-300 p-2">Pidana &gt; 2 thn (Eselon I); Perdata &gt; 10M</td>
                <td className="border border-slate-300 p-2">Kematian</td>
                <td className="border border-slate-300 p-2">x ≥ 80% dari jam operasional harian</td>
                <td className="border border-slate-300 p-2">Deviasi ≥ 20%; Budget ≥ 20%</td>
                <td className="border border-slate-300 p-2">x &gt; 25% target kinerja</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>

      {/* Modal Detail Risiko (Daftar Kejadian) */}
      <Modal isOpen={!!selectedRiskDetail} onClose={() => setSelectedRiskDetail(null)} title={`Detail Pengelolaan Risiko - ${selectedPeriod}`}>
        {selectedRiskDetail && (
           <div className="space-y-6 pb-10">
              <div className="p-5 bg-indigo-50 rounded-[1.5rem] border-l-8 border-indigo-600 shadow-sm">
                <div className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-1">Kejadian Risiko #{selectedRiskDetail.id}</div>
                <p className="font-black text-slate-800 text-lg leading-tight uppercase">{selectedRiskDetail.text}</p>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                    <div className="w-1 h-4 bg-indigo-500 rounded-full"></div> Penjelasan Aktual
                  </label>
                  <textarea 
                    className="w-full p-4 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none text-sm min-h-[100px]" 
                    value={riskDetailData[selectedPeriod][selectedRiskDetail.id].explanation} 
                    onChange={(e) => updateRiskDetail('explanation', e.target.value)} 
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                      <div className="w-1 h-4 bg-emerald-500 rounded-full"></div> Mitigasi Terlaksana
                    </label>
                    <button onClick={() => addListItem('mitigationsImplemented')} className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100"><IconPlus /></button>
                  </div>
                  {riskDetailData[selectedPeriod][selectedRiskDetail.id].mitigationsImplemented.map((item, idx) => (
                    <div key={idx} className="flex gap-2 group">
                      <input type="text" value={item} onChange={(e) => updateRiskDetail('mitigationsImplemented', e.target.value, idx)} className="flex-1 p-3 border border-slate-200 rounded-xl text-xs" />
                      <button onClick={() => removeListItem('mitigationsImplemented', idx)} className="text-slate-300 hover:text-red-500"><IconTrash /></button>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                      <div className="w-1 h-4 bg-blue-500 rounded-full"></div> Rencana Mitigasi
                    </label>
                    <button onClick={() => addListItem('mitigationPlans')} className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><IconPlus /></button>
                  </div>
                  {riskDetailData[selectedPeriod][selectedRiskDetail.id].mitigationPlans.map((item, idx) => (
                    <div key={idx} className="flex gap-2 group">
                      <input type="text" value={item} onChange={(e) => updateRiskDetail('mitigationPlans', e.target.value, idx)} className="flex-1 p-3 border border-slate-200 rounded-xl text-xs" />
                      <button onClick={() => removeListItem('mitigationPlans', idx)} className="text-slate-300 hover:text-red-500"><IconTrash /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-slate-400 italic">Tekan "Simpan ke Spreadsheet" di dashboard utama untuk menyimpan permanen.</span>
                <button onClick={() => setSelectedRiskDetail(null)} className="px-10 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase shadow-xl hover:bg-indigo-700 transition-colors">Tutup</button>
              </div>
           </div>
        )}
      </Modal>

      <div className="mt-8 text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] text-center no-print">Seksi Kepatuhan Internal DJKN Papabaruku v1</div>
    </div>
  );
};

export default App;