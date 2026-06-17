import React, { useState, useEffect } from 'react';

// --- KONFIGURASI API ---
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwGR4Mnd3BISeX0IyD_tfuzEycuvHl7R5tyD205tT8yjEY4DrMmYHNSI6XQgouck5712g/exec";

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
const IconSave = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
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
const IconLightbulb = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
);
const IconMonitorPlay = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/><polygon points="10 7 15 10 10 13 10 7"/></svg>
);
const IconSparkles = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 17v4"/><path d="M17 19h4"/></svg>
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
  { id: 10, text: "Rendahnya Pelunasan Berkas Kasus Piutang Negara" },
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

const initialRiskValues = {
  1: { py: 6, res: 5 }, 2: { py: 16, res: 10 }, 3: { py: 13, res: 5 }, 4: { py: 10, res: 5 },
  5: { py: 6, res: 2 }, 6: { py: 9, res: 8 }, 7: { py: 14, res: 11 }, 8: { py: 8, res: 5 },
  9: { py: 13, res: 10 }, 10: { py: 14, res: 6 }, 11: { py: 9, res: 12 }, 12: { py: 14, res: 11 },
  13: { py: 11, res: 5 }, 14: { py: 11, res: 5 }, 15: { py: 11, res: 5 }, 16: { py: 11, res: 5 },
  17: { py: 5, res: 1 }, 18: { py: 16, res: 10 }, 19: { py: 18, res: 11 }, 20: { py: 8, res: 5 }
};

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

const impactLabels = { 1: "Tidak Signifikan", 2: "Minor", 3: "Moderat", 4: "Signifikan", 5: "Sangat Signifikan" };
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
const RiskMarker = ({ id, text, onDragStart, onTouchStart, isClone }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      draggable={!isClone}
      onDragStart={(e) => (!isClone && onDragStart) ? onDragStart(e, id) : null}
      onTouchStart={(e) => (!isClone && onTouchStart) ? onTouchStart(e, id) : null}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-9 h-9 flex items-center justify-center cursor-grab active:cursor-grabbing transition-all z-30 drop-shadow-md shrink-0 marker-icon touch-none ${isClone ? 'opacity-80 scale-125' : 'hover:scale-125'}`}
    >
      <div className="absolute inset-0 bg-slate-900 rotate-45 rounded-sm shadow-black/50 shadow-sm border border-slate-700"></div>
      <div className="absolute inset-0 bg-slate-900 rotate-0 rounded-sm border border-slate-700"></div>
      <span className="relative text-white font-bold text-[11px] select-none">{id}</span>
      
      {!isClone && (
        <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-3 py-2 rounded-lg shadow-xl transition-all pointer-events-none z-[100] no-print w-48 text-center leading-snug border border-slate-600 ${isHovered ? 'scale-100' : 'scale-0'}`}>
          {text || `Risiko #${id}`}
        </div>
      )}
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children, zIndex = "z-[100]" }) => {
  if (!isOpen) return null;
  return (
    <div className={`fixed inset-0 ${zIndex} flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm no-print`}>
      <div className="bg-white w-full max-w-[98vw] md:max-w-3xl max-h-[95vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col">
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [tokenInput, setTokenInput] = useState("");
  const [activeToken, setActiveToken] = useState("");

  const [selectedPeriod, setSelectedPeriod] = useState("TW I");
  const [selectedBidang, setSelectedBidang] = useState("Semua Bidang");
  const [isLikelihoodModalOpen, setLikelihoodModalOpen] = useState(false);
  const [isImpactModalOpen, setImpactModalOpen] = useState(false);
  const [selectedRiskDetail, setSelectedRiskDetail] = useState(null);
  
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  
  const [showExplanationExample, setShowExplanationExample] = useState(false);
  const [showProjectionExample, setShowProjectionExample] = useState(false);
  const [showMitigationsImplementedExample, setShowMitigationsImplementedExample] = useState(false);
  const [showMitigationPlansExample, setShowMitigationPlansExample] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState(null);

  const [enhanceModalConfig, setEnhanceModalConfig] = useState({
      isOpen: false,
      field: null,
      originalText: "",
      enhancedText: "",
      isLoading: false,
  });

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
        initial[p][r.id] = { explanation: "", projection: "", mitigationsImplemented: [""], mitigationPlans: [""] };
      });
    });
    return initial;
  });

  useEffect(() => {
    const savedToken = localStorage.getItem('app_token');
    if (savedToken) {
      verifyTokenSilently(savedToken);
    } else {
      setIsCheckingAuth(false);
    }
  }, []);

  const verifyTokenSilently = async (token) => {
    try {
      const url = `${GOOGLE_SCRIPT_URL}?action=read&token=${encodeURIComponent(token)}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.status === 'success') {
        setIsAuthenticated(true);
        setActiveToken(token);
        if (data.positions) setRiskPositions(data.positions);
        if (data.details) setRiskDetailData(data.details);
      } else {
        localStorage.removeItem('app_token');
      }
    } catch (error) {
      console.error("Gagal auto-login:", error);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    if (draggedItemId) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [draggedItemId]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification(null);

    try {
      const url = `${GOOGLE_SCRIPT_URL}?action=read&token=${encodeURIComponent(tokenInput)}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.status === 'success') {
        setIsAuthenticated(true);
        setActiveToken(tokenInput);
        localStorage.setItem('app_token', tokenInput);
        setNotification({ type: 'success', message: 'Token Diterima. Selamat Datang!' });
        setTimeout(() => setNotification(null), 3000);
        if (data.positions) setRiskPositions(data.positions);
        if (data.details) setRiskDetailData(data.details);
      } else {
        setNotification({ type: 'error', message: data.message || 'Token Salah atau Ditolak Server!' });
        setTimeout(() => setNotification(null), 3000);
        setTokenInput("");
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Koneksi ke server gagal. Cek kembali URL/Jaringan.' });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveRisk = async (riskId) => {
    setIsLoading(true);
    setNotification(null);

    const payload = { action: 'save', token: activeToken, riskData: riskData, details: riskDetailData, positions: riskPositions };

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) });
        const result = await response.json();

        if (result.status === 'success') {
           setNotification({ type: 'success', message: `Data Risiko #${riskId} & Mapping Berhasil Disimpan!` });
           if (selectedRiskDetail) handleCloseRiskDetail();
        } else {
           setNotification({ type: 'error', message: result.message || 'Gagal menyimpan (Ditolak)' });
        }
        setTimeout(() => setNotification(null), 3000);
    } catch (error) {
        setNotification({ type: 'error', message: 'Gagal menyimpan data. Cek koneksi internet.' });
        setTimeout(() => setNotification(null), 5000);
    } finally {
        setIsLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!window.confirm("PENTING: Pastikan Anda sudah menyimpan data terbaru sebelum meng-generate laporan. Lanjutkan?")) return;

    setIsGenerating(true);
    setNotification(null);

    const payload = { action: 'generate', token: activeToken };

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) });
        const result = await response.json();

        if (result.status === 'success') {
           setNotification({ type: 'success', message: 'Laporan Slide berhasil dibuat dan mulai mengunduh...' });
           setTimeout(() => {
               const fileIdMatch = result.url.match(/\/d\/(.+?)\//);
               if (fileIdMatch && fileIdMatch[1]) {
                   const fileId = fileIdMatch[1];
                   const downloadUrl = `https://docs.google.com/presentation/d/${fileId}/export/pptx`;
                   const link = document.createElement('a');
                   link.href = downloadUrl;
                   link.setAttribute('download', 'Laporan_Risiko.pptx'); 
                   document.body.appendChild(link);
                   link.click();
                   document.body.removeChild(link);
               } else {
                   window.open(result.url, '_blank');
               }
               setNotification(null);
           }, 2000);
        } else {
           setNotification({ type: 'error', message: 'Gagal Generate: ' + (result.message || 'Error server.') });
           setTimeout(() => setNotification(null), 5000);
        }
    } catch (error) {
        setNotification({ type: 'error', message: 'Koneksi gagal. Mungkin proses di background sedang berjalan.' });
        setTimeout(() => setNotification(null), 7000);
    } finally {
        setIsGenerating(false);
    }
  };

  // --- AI API INTEGRATION (MELALUI GAS PROXY) ---
  const callGeminiAPI = async (promptText) => {
    // Memanggil Proxy GAS, bukan URL Google secara langsung
    const payload = {
        action: 'enhance',
        token: activeToken, // API proxy akan mengecek token login
        prompt: promptText
    };

    const delays = [1000, 2000, 4000];

    for (let i = 0; i < 3; i++) {
        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            
            if (result.status === 'success') {
                return result.text;
            } else {
                throw new Error(result.message || "Gagal mendapatkan respon dari AI Proxy");
            }
        } catch (error) {
            if (i === 2) throw error;
            await new Promise(res => setTimeout(res, delays[i]));
        }
    }
  };

  const handleEnhanceClick = async (field) => {
    if (!selectedRiskDetail) return;
    
    const currentText = riskDetailData[selectedPeriod][selectedRiskDetail.id][field];
    if (!currentText || currentText.trim().length === 0) {
        setNotification({ type: 'error', message: 'Silakan isi draf teks terlebih dahulu sebelum melakukan Enhance.' });
        setTimeout(() => setNotification(null), 3000);
        return;
    }

    const position = riskPositions[selectedPeriod][selectedRiskDetail.id];
    let likelihood = "-", impact = "-";
    if (position && position !== 'pool') {
        const parts = position.split('-');
        likelihood = parts[0];
        impact = parts[1];
    }

    setEnhanceModalConfig({
        isOpen: true,
        field: field,
        originalText: currentText,
        enhancedText: "",
        isLoading: true
    });

    let promptText = "";
    if (field === 'explanation') {
        promptText = `Saya sedang menyusun dokumen manajemen risiko pemerintahan/Kementerian Keuangan. 
Tolong tingkatkan dan perbaiki tata bahasa pada "Teks Saat Ini" mengenai Penjelasan Aktual risiko.
Risiko: "${selectedRiskDetail.text}"
Level Kemungkinan (1-5): ${likelihood}
Level Dampak (1-5): ${impact}
Teks Saat Ini: "${currentText}"

Instruksi Wajib:
1. Buat penjelasan ini menjadi formal, profesional, dan lugas.
2. Jelaskan dengan spesifik MENGAPA risiko ini berada pada Level Kemungkinan ${likelihood} dan Level Dampak ${impact}.
3. Tambahkan estimasi atau asumsi data kuantitatif secara logis yang mendukung level tersebut (misalnya persentase, jumlah bidang/berkas, atau nominal asumsi).
4. Jangan tambahkan format markdown (seperti bold/italic) secara berlebihan. Hasilkan teks paragraf biasa saja.`;
    } else if (field === 'projection') {
        promptText = `Saya sedang menyusun dokumen manajemen risiko pemerintahan/Kementerian Keuangan. 
Tolong tingkatkan dan perbaiki "Teks Saat Ini" mengenai Proyeksi Risiko untuk periode mendatang.
Risiko: "${selectedRiskDetail.text}"
Teks Saat Ini: "${currentText}"

Instruksi Wajib:
1. Buat proyeksi risiko ke depannya menjadi lebih komprehensif, logis, dan analitis menggunakan bahasa formal.
2. Identifikasi dan sebutkan faktor-faktor yang mungkin mempengaruhi pergerakan risiko tersebut di periode mendatang.
3. Jangan tambahkan format markdown secara berlebihan. Hasilkan teks paragraf biasa saja.`;
    }

    try {
        const result = await callGeminiAPI(promptText);
        setEnhanceModalConfig(prev => ({
            ...prev,
            enhancedText: result || "AI gagal memproses teks. Silakan coba lagi.",
            isLoading: false
        }));
    } catch (error) {
        setEnhanceModalConfig(prev => ({
            ...prev,
            enhancedText: "Terjadi kesalahan saat menghubungi layanan AI (" + error.message + ").",
            isLoading: false
        }));
    }
  };

  const applyAIEnhancement = () => {
    updateRiskDetail(enhanceModalConfig.field, enhanceModalConfig.enhancedText.trim());
    setEnhanceModalConfig({ isOpen: false, field: null, originalText: "", enhancedText: "", isLoading: false });
  };

  const closeAIEnhancement = () => {
    setEnhanceModalConfig({ isOpen: false, field: null, originalText: "", enhancedText: "", isLoading: false });
  };

  const handleDragStart = (e, riskId) => e.dataTransfer.setData("riskId", riskId);
  const handleDrop = (e, targetLocation) => {
    e.preventDefault();
    const riskId = e.dataTransfer.getData("riskId");
    if (riskId) {
      setRiskPositions(prev => ({ ...prev, [selectedPeriod]: { ...prev[selectedPeriod], [riskId]: targetLocation } }));
    }
  };
  const handleDragOver = (e) => e.preventDefault();

  const handleTouchStart = (e, riskId) => {
    const touch = e.touches[0];
    setDraggedItemId(riskId);
    setDragPosition({ x: touch.clientX, y: touch.clientY });
  };
  const handleTouchMove = (e) => {
    if (!draggedItemId) return;
    const touch = e.touches[0];
    setDragPosition({ x: touch.clientX, y: touch.clientY });
  };
  const handleTouchEnd = (e) => {
    if (!draggedItemId) return;
    const touch = e.changedTouches[0];
    let targetLocation = null;
    const dropzones = document.querySelectorAll('[data-droptarget]');
    for (let i = 0; i < dropzones.length; i++) {
        const rect = dropzones[i].getBoundingClientRect();
        if (touch.clientX >= rect.left && touch.clientX <= rect.right && touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
            targetLocation = dropzones[i].getAttribute('data-droptarget');
            break;
        }
    }
    if (targetLocation) {
        setRiskPositions(prev => ({ ...prev, [selectedPeriod]: { ...prev[selectedPeriod], [draggedItemId]: targetLocation } }));
    }
    setDraggedItemId(null);
  };

  const resetPositions = () => {
    if(window.confirm("Apakah Anda yakin ingin mereset posisi risiko untuk periode ini? Data yang belum disimpan ke Cloud akan hilang.")) {
        setRiskPositions(prev => ({ ...prev, [selectedPeriod]: Object.fromEntries(Array.from({ length: 20 }, (_, i) => [i + 1, 'pool'])) }));
    }
  };

  const getScoreForPeriod = (riskId, period) => {
    const pos = riskPositions[period][riskId];
    if (!pos || pos === 'pool') return '-';
    return bgNumbers[pos] || '-';
  };

  const handlePrint = () => window.print();

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
      return { ...prev, [selectedPeriod]: { ...prev[selectedPeriod], [selectedRiskDetail.id]: updatedRisk } };
    });
  };

  const removeListItem = (field, index) => {
    setRiskDetailData(prev => {
      const updatedRisk = { ...prev[selectedPeriod][selectedRiskDetail.id] };
      if (updatedRisk[field].length > 1) {
        updatedRisk[field] = updatedRisk[field].filter((_, i) => i !== index);
      }
      return { ...prev, [selectedPeriod]: { ...prev[selectedPeriod], [selectedRiskDetail.id]: updatedRisk } };
    });
  };

  const handleCloseRiskDetail = () => {
    setSelectedRiskDetail(null);
    setShowExplanationExample(false);
    setShowProjectionExample(false);
    setShowMitigationsImplementedExample(false);
    setShowMitigationPlansExample(false);
  };

  const getRiskStatus = (riskId, period) => {
    const detail = riskDetailData[period]?.[riskId];
    if (!detail) return "Belum Diisi";
    const hasExp = detail.explanation?.trim().length > 0;
    const hasProj = detail.projection?.trim().length > 0;
    const hasMitImpl = detail.mitigationsImplemented?.some(m => m.trim().length > 0);
    const hasMitPlan = detail.mitigationPlans?.some(m => m.trim().length > 0);
    if (!hasExp && !hasProj && !hasMitImpl && !hasMitPlan) return "Belum Diisi";
    if (hasExp && hasProj && hasMitImpl && hasMitPlan) return "Sudah Lengkap";
    return "Belum Lengkap";
  };

  const getStatusBadge = (status) => {
    if (status === "Sudah Lengkap") return <span className="inline-flex items-center justify-center w-full px-2 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-[9px] font-black uppercase tracking-wider border border-emerald-200">Sudah Lengkap</span>;
    if (status === "Belum Lengkap") return <span className="inline-flex items-center justify-center w-full px-2 py-1.5 bg-amber-100 text-amber-700 rounded-lg text-[9px] font-black uppercase tracking-wider border border-amber-200">Belum Lengkap</span>;
    return <span className="inline-flex items-center justify-center w-full px-2 py-1.5 bg-slate-100 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-wider border border-slate-200">Belum Diisi</span>;
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-800">
         <div className="flex flex-col items-center gap-4 text-indigo-600">
            <div className="w-12 h-12"><IconLoader /></div>
            <div className="font-bold tracking-widest uppercase animate-pulse">Memverifikasi Sesi Anda...</div>
         </div>
      </div>
    );
  }

  if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-800">
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
                        Risk Management Papabaruku
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
                            disabled={isLoading}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] mt-4 disabled:opacity-70 flex justify-center items-center gap-2"
                        >
                            {isLoading ? <div className="w-5 h-5"><IconLoader /></div> : "Masuk Aplikasi"}
                        </button>
                    </form>
                    <div className="mt-8 pt-6 border-t border-slate-100 w-full text-center">
                        <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                            BIDANG KIHI DJKN PAPABARUKU v1.1
                        </span>
                    </div>
                </div>
            </div>
        </div>
      );
  }

  return (
    <div 
        className="min-h-screen bg-slate-100 p-4 md:p-10 flex flex-col items-center font-sans text-slate-800"
        onTouchMove={draggedItemId ? handleTouchMove : undefined}
        onTouchEnd={draggedItemId ? handleTouchEnd : undefined}
    >
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

      {notification && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce ${notification.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
            <div className="font-bold">{notification.message}</div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 z-[200] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center flex-col gap-4 text-white">
            <div className="w-12 h-12"><IconLoader /></div>
            <div className="font-bold tracking-widest uppercase animate-pulse">Menyimpan Data...</div>
        </div>
      )}

      {isGenerating && (
        <div className="fixed inset-0 z-[200] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center flex-col gap-4 text-white p-8 text-center">
            <div className="w-16 h-16 text-indigo-400"><IconLoader /></div>
            <div className="font-black text-xl tracking-widest uppercase animate-pulse mt-4">Memproses Slide Laporan...</div>
            <div className="font-bold text-slate-300 max-w-md">Harap tunggu, sistem sedang membaca data, membuat grafik, dan menyisipkannya ke dalam template Slide Google. Ini dapat memakan waktu 30-60 detik.</div>
        </div>
      )}

      <button 
        onClick={() => {
            setIsAuthenticated(false);
            setTokenInput("");
            setActiveToken("");
            localStorage.removeItem('app_token');
        }}
        className="fixed bottom-5 right-5 z-50 p-3 bg-white text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full shadow-lg border border-slate-200 transition-all no-print"
        title="Keluar Aplikasi"
      >
        <div className="w-6 h-6"><IconLogOut /></div>
      </button>

      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-[2.5rem] overflow-hidden border border-slate-200 mb-10 print-area relative">
        <div className="bg-white p-8 border-b border-slate-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-100 flex items-center justify-center no-print">
                <div className="w-8 h-8 text-white"><IconLayoutGrid /></div>
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-slate-800 tracking-tight uppercase">Dashboard Matriks Risiko</h1>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full animate-pulse no-print ${isLoading || isGenerating ? 'bg-yellow-400' : 'bg-green-500'}`}></span>
                  PERIODE RISIKO - {selectedPeriod}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 items-center no-print">
              <button 
                onClick={handleGenerateReport} 
                disabled={isGenerating || isLoading}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-200 active:scale-95 disabled:opacity-70"
              >
                <div className="w-4 h-4"><IconMonitorPlay /></div> 
                {isGenerating ? "Memproses..." : "Generate Slide"}
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
                <div className="w-4 h-4"><IconRotateCcw /></div> Reset Posisi
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-50/50 p-8 border-b border-slate-200 no-print">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
              <div className="w-4 h-4 text-indigo-500"><IconChevronRight /></div>
              <span>Daftar Risiko Belum Terplot ({selectedPeriod})</span>
            </div>
            <div 
              data-droptarget="pool"
              onDrop={(e) => handleDrop(e, 'pool')}
              onDragOver={handleDragOver}
              className="min-h-[120px] bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-6 flex flex-wrap items-center justify-center gap-4 shadow-inner transition-all hover:border-indigo-400"
            >
              {Object.keys(riskPositions[selectedPeriod]).map(id => {
                const riskInfo = riskData.find(r => r.id === parseInt(id));
                return riskPositions[selectedPeriod][id] === 'pool' && (
                  <RiskMarker 
                    key={id} 
                    id={id} 
                    text={riskInfo ? riskInfo.text : ""} 
                    onDragStart={handleDragStart} 
                    onTouchStart={handleTouchStart}
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
                    const hasItems = items.length > 0;
                    
                    const isDarkBg = (l === 5 && i >= 4) || (l === 4 && i === 5) || (l === 3 && i === 5) || (l === 2 && i === 5) || (l === 1 && i === 5);
                    const activeNumberStyle = {
                        fontSize: '6rem', lineHeight: '1',
                        color: isDarkBg ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                        WebkitTextStroke: isDarkBg ? '2px rgba(255,255,255,0.3)' : '2px rgba(30,41,59,0.25)',
                        textShadow: isDarkBg ? '2px 2px 0px rgba(0,0,0,0.2), 4px 4px 10px rgba(0,0,0,0.3)' : '2px 2px 0px rgba(255,255,255,0.4), 4px 4px 10px rgba(0,0,0,0.15)',
                        zIndex: 40, opacity: 0.35
                    };
                    const inactiveNumberStyle = {
                        fontSize: '3rem', lineHeight: '1',
                        color: isDarkBg ? 'rgba(255,255,255,0.4)' : 'rgba(30,41,59,0.2)',
                        WebkitTextStroke: '0px transparent',
                        textShadow: 'none', zIndex: 10, opacity: 1
                    };
                    
                    return (
                      <td 
                        key={i} 
                        data-droptarget={key}
                        onDrop={(e) => handleDrop(e, key)} 
                        onDragOver={handleDragOver} 
                        className={`border border-slate-200 h-32 relative p-2 transition-all group ${getCellColor(l, i)}`}
                      >
                        <div 
                          className="absolute inset-0 flex items-center justify-center font-black pointer-events-none select-none transition-all duration-500 ease-out"
                          style={hasItems ? activeNumberStyle : inactiveNumberStyle}
                        >
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
                                    onTouchStart={handleTouchStart}
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

      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-[2.5rem] overflow-hidden border border-slate-200 p-8 print-area mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600 no-print">
              <div className="w-6 h-6"><IconFileText /></div>
            </div>
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Daftar Kejadian Risiko & Besaran Per Periode</h2>
          </div>
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
                <th className="p-4 w-20 text-center rounded-tl-2xl">Nomor</th>
                <th className="p-4">Kejadian Risiko</th>
                <th className="p-4 w-12 text-center border-r border-slate-600 bg-slate-700">Py</th>
                {periods.map(p => (
                  <th key={p} className={`p-4 w-16 text-center ${p === selectedPeriod ? 'bg-indigo-700' : ''}`}>
                    {p}
                  </th>
                ))}
                <th className="p-4 w-20 text-center bg-slate-700">Residual Harapan</th>
                <th className="p-4 w-28 text-center bg-slate-700 text-white">Status Form</th>
                <th className="p-4 w-28 text-center rounded-tr-2xl bg-indigo-600 no-print">Aksi Simpan</th>
              </tr>
            </thead>
            <tbody>
              {riskData
                .filter(risk => {
                    if (selectedBidang === "Semua Bidang") return true;
                    return bidangFilters[selectedBidang].includes(risk.id);
                })
                .map((risk) => {
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
                      <td className="p-4 text-center font-bold text-slate-500 bg-slate-50/50">
                        {scores.res}
                      </td>
                      <td className="p-3 text-center align-middle">
                        {getStatusBadge(getRiskStatus(risk.id, selectedPeriod))}
                      </td>
                      <td className="p-4 text-center no-print">
                        <button 
                            onClick={() => handleSaveRisk(risk.id)}
                            disabled={isLoading || isGenerating}
                            className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-xl transition-all font-bold text-[10px] uppercase tracking-wider disabled:opacity-50"
                            title="Simpan teks dan posisi matriks untuk risiko ini"
                        >
                            <div className="w-3.5 h-3.5"><IconSave /></div>
                            Simpan
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isLikelihoodModalOpen} onClose={() => setLikelihoodModalOpen(false)} title="Kriteria Kemungkinan Terjadinya Risiko">
          <div className="p-4 text-slate-500 text-sm italic">Area Kriteria Kemungkinan ditampilkan secara lengkap sesuai standar...</div>
      </Modal>

      <Modal isOpen={isImpactModalOpen} onClose={() => setImpactModalOpen(false)} title="Kriteria Dampak Risiko">
          <div className="p-4 text-slate-500 text-sm italic">Area Kriteria Dampak ditampilkan secara lengkap sesuai standar...</div>
      </Modal>

      <Modal isOpen={!!selectedRiskDetail} onClose={handleCloseRiskDetail} title={`Detail Pengelolaan Risiko - ${selectedPeriod}`}>
        {selectedRiskDetail && (
           <div className="space-y-6 pb-2">
              <div className="p-5 bg-indigo-50 rounded-[1.5rem] border-l-8 border-indigo-600 shadow-sm">
                <div className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-1">Kejadian Risiko #{selectedRiskDetail.id}</div>
                <p className="font-black text-slate-800 text-lg leading-tight uppercase">{selectedRiskDetail.text}</p>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2 p-4 bg-slate-50 rounded-[1.5rem] border border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-2">
                      <div className="w-1 h-4 bg-indigo-500 rounded-full"></div> Penjelasan Aktual
                    </label>
                    <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEnhanceClick('explanation')} 
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-colors font-bold text-[10px] uppercase tracking-wider shadow-md"
                          title="Tingkatkan kualitas tulisan dengan AI Google"
                        >
                          <div className="w-3 h-3"><IconSparkles /></div>
                          AI Enhance
                        </button>
                        <button 
                          onClick={() => setShowExplanationExample(!showExplanationExample)} 
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors font-bold text-[10px] uppercase tracking-wider"
                        >
                          <div className="w-3 h-3"><IconLightbulb /></div>
                          {showExplanationExample ? "Tutup Contoh" : "Lihat Contoh"}
                        </button>
                    </div>
                  </div>
                  
                  {showExplanationExample && (
                    <div className="p-3 bg-white text-slate-700 text-xs rounded-xl italic border border-slate-300 leading-relaxed shadow-sm">
                      <span className="font-bold">Contoh Pengisian:</span> "Berdasarkan pelaksanaan Sertifikasi BMN pada Kanwil DJKN Papua, Papua Barat, dan pada Triwulan II pada level Kanwil sudah tercapai. Namun terdapat potensi yang kemungkinan besar tidak terealisasi sebanyak 169 bidang tanah yang telah bersertipikat dan validasi pada tahun sebelumnya"
                    </div>
                  )}

                  <textarea 
                    className="w-full p-4 border-2 border-white bg-white rounded-2xl focus:border-indigo-400 focus:bg-white outline-none text-sm min-h-[100px] shadow-sm transition-all" 
                    value={riskDetailData[selectedPeriod][selectedRiskDetail.id].explanation || ""} 
                    onChange={(e) => updateRiskDetail('explanation', e.target.value)} 
                    placeholder="Tuliskan penjelasan aktual secara singkat di sini lalu klik tombol AI Enhance untuk mendapatkan tulisan yang lebih kuantitatif..."
                  />
                </div>

                <div className="space-y-2 p-4 bg-amber-50 rounded-[1.5rem] border border-amber-100">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black uppercase text-amber-600 tracking-wider flex items-center gap-2">
                      <div className="w-1 h-4 bg-amber-500 rounded-full"></div> Proyeksi Risiko
                    </label>
                    <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEnhanceClick('projection')} 
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-colors font-bold text-[10px] uppercase tracking-wider shadow-md"
                          title="Buat proyeksi lebih komprehensif dengan AI"
                        >
                          <div className="w-3 h-3"><IconSparkles /></div>
                          AI Enhance
                        </button>
                        <button 
                          onClick={() => setShowProjectionExample(!showProjectionExample)} 
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-xl hover:bg-amber-200 transition-colors font-bold text-[10px] uppercase tracking-wider"
                        >
                          <div className="w-3 h-3"><IconLightbulb /></div>
                          {showProjectionExample ? "Tutup Contoh" : "Lihat Contoh"}
                        </button>
                    </div>
                  </div>
                  
                  {showProjectionExample && (
                    <div className="p-3 bg-white text-amber-800 text-xs rounded-xl italic border border-amber-200 leading-relaxed shadow-sm">
                      <span className="font-bold">Contoh Pengisian:</span> "Proyeksi risiko pencapaian tersebut di Triwulan II diperkirakan dapat bergerak dari signifikan dan hampir pasti terjadi (19) menjadi sering terjadi dan moderat (14) dikarenakan adanya upaya koordinasi intensif."
                    </div>
                  )}

                  <textarea 
                    className="w-full p-4 border-2 border-white bg-white rounded-2xl focus:border-amber-400 focus:bg-white outline-none text-sm min-h-[100px] shadow-sm transition-all" 
                    value={riskDetailData[selectedPeriod][selectedRiskDetail.id].projection || ""} 
                    onChange={(e) => updateRiskDetail('projection', e.target.value)} 
                    placeholder="Tuliskan dasar proyeksi Anda di sini lalu gunakan fitur AI Enhance untuk elaborasi lebih lanjut..."
                  />
                </div>

                <div className="space-y-4 p-4 bg-emerald-50/50 rounded-[1.5rem] border border-emerald-100">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black uppercase text-emerald-700 tracking-wider flex items-center gap-2">
                      <div className="w-1 h-4 bg-emerald-500 rounded-full"></div> Mitigasi Terlaksana
                    </label>
                    <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setShowMitigationsImplementedExample(!showMitigationsImplementedExample)} 
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-xl hover:bg-emerald-200 transition-colors font-bold text-[10px] uppercase tracking-wider"
                        >
                          <div className="w-3 h-3"><IconLightbulb /></div>
                          {showMitigationsImplementedExample ? "Tutup Contoh" : "Lihat Contoh"}
                        </button>
                        <button onClick={() => addListItem('mitigationsImplemented')} className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200"><IconPlus /></button>
                    </div>
                  </div>
                  
                  {riskDetailData[selectedPeriod][selectedRiskDetail.id].mitigationsImplemented.map((item, idx) => (
                    <div key={idx} className="flex gap-2 group">
                      <input type="text" value={item} onChange={(e) => updateRiskDetail('mitigationsImplemented', e.target.value, idx)} className="flex-1 p-3 border-2 border-white bg-white focus:border-emerald-400 rounded-xl text-xs shadow-sm transition-all outline-none" placeholder="Tulis mitigasi yang telah dilakukan..." />
                      <button onClick={() => removeListItem('mitigationsImplemented', idx)} className="text-slate-300 hover:text-red-500 px-2"><IconTrash /></button>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 p-4 bg-blue-50/50 rounded-[1.5rem] border border-blue-100">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black uppercase text-blue-700 tracking-wider flex items-center gap-2">
                      <div className="w-1 h-4 bg-blue-500 rounded-full"></div> Rencana Mitigasi
                    </label>
                    <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setShowMitigationPlansExample(!showMitigationPlansExample)} 
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors font-bold text-[10px] uppercase tracking-wider"
                        >
                          <div className="w-3 h-3"><IconLightbulb /></div>
                          {showMitigationPlansExample ? "Tutup Contoh" : "Lihat Contoh"}
                        </button>
                        <button onClick={() => addListItem('mitigationPlans')} className="p-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"><IconPlus /></button>
                    </div>
                  </div>

                  {riskDetailData[selectedPeriod][selectedRiskDetail.id].mitigationPlans.map((item, idx) => (
                    <div key={idx} className="flex gap-2 group">
                      <input type="text" value={item} onChange={(e) => updateRiskDetail('mitigationPlans', e.target.value, idx)} className="flex-1 p-3 border-2 border-white bg-white focus:border-blue-400 rounded-xl text-xs shadow-sm transition-all outline-none" placeholder="Tulis rencana mitigasi ke depan..." />
                      <button onClick={() => removeListItem('mitigationPlans', idx)} className="text-slate-300 hover:text-red-500 px-2"><IconTrash /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex justify-between items-center bg-white">
                <button onClick={handleCloseRiskDetail} className="px-6 py-3 text-slate-500 hover:bg-slate-100 rounded-2xl font-bold text-xs uppercase transition-colors border border-transparent">Batal</button>
                <button 
                  onClick={() => handleSaveRisk(selectedRiskDetail.id)} 
                  disabled={isLoading}
                  className="px-8 py-3 bg-indigo-600 text-white flex items-center gap-2 rounded-2xl font-black text-xs uppercase shadow-xl hover:bg-indigo-700 transition-colors active:scale-95 disabled:opacity-50"
                >
                  <div className="w-4 h-4"><IconSave /></div>
                  Simpan Teks & Mapping
                </button>
              </div>
           </div>
        )}
      </Modal>

      <Modal isOpen={enhanceModalConfig.isOpen} onClose={closeAIEnhancement} title="Preview AI Enhancement" zIndex="z-[150]">
        <div className="space-y-6">
            {enhanceModalConfig.isLoading ? (
                <div className="flex flex-col items-center justify-center p-12 text-indigo-500">
                    <div className="w-12 h-12 mb-4"><IconLoader /></div>
                    <p className="font-bold text-sm tracking-widest uppercase animate-pulse">Sedang Menyusun Redaksi...</p>
                    <p className="text-xs text-slate-400 mt-2 text-center max-w-sm">AI sedang mengkaji data risiko Anda untuk menghasilkan penjelasan yang lebih profesional dan terstruktur melalui Google Apps Script.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                            <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Teks Saat Ini</h4>
                            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{enhanceModalConfig.originalText}</p>
                        </div>
                        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl space-y-2 shadow-inner">
                            <h4 className="text-[10px] font-black uppercase text-indigo-600 tracking-widest flex items-center gap-1">
                                <div className="w-3 h-3"><IconSparkles /></div> Hasil Rekomendasi AI
                            </h4>
                            <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-medium">{enhanceModalConfig.enhancedText}</p>
                        </div>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-100 flex justify-between items-center bg-white">
                        <button onClick={closeAIEnhancement} className="px-6 py-3 text-slate-500 hover:bg-slate-100 rounded-2xl font-bold text-xs uppercase transition-colors">Tolak Perubahan</button>
                        <button 
                            onClick={applyAIEnhancement} 
                            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white flex items-center gap-2 rounded-2xl font-black text-xs uppercase shadow-lg shadow-indigo-200 hover:scale-[1.02] transition-all active:scale-95"
                        >
                            <div className="w-4 h-4"><IconSparkles /></div>
                            Terapkan Hasil AI
                        </button>
                    </div>
                </>
            )}
        </div>
      </Modal>

      {draggedItemId && (
        <div 
          className="fixed pointer-events-none z-[9999]"
          style={{ left: dragPosition.x, top: dragPosition.y, transform: 'translate(-50%, -50%)' }}
        >
          <RiskMarker id={draggedItemId} text="" isClone={true} />
        </div>
      )}
    </div>
  );
};

export default App;