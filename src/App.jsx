import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, ReferenceLine, LabelList } from 'recharts';
import { TrendingUp, Target, Award, Zap, Trophy, Users, Star, Shield, Play, Video, ChevronRight, Plus, X, Link, ExternalLink, FileText, Eye, Edit3 } from 'lucide-react';

// ============================================
// 📊 TALAN'S GAME DATA - UPDATE WEEKLY HERE
// ============================================
const gameData = [
  { date: '10/24', month: 'Oct', opponent: 'at Cedar Rapids', result: 'W 8-0', goals: 0, assists: 1, pts: 1, pim: 0, gw: 0, capsScore: 8, oppScore: 0 },
  { date: '10/31', month: 'Oct', opponent: 'Ames', result: 'W 4-2', goals: 0, assists: 1, pts: 1, pim: 0, gw: 0, capsScore: 4, oppScore: 2 },
  { date: '11/01', month: 'Nov', opponent: 'Cedar Rapids', result: 'W 3-2', goals: 0, assists: 1, pts: 1, pim: 0, gw: 0, capsScore: 3, oppScore: 2 },
  { date: '11/07', month: 'Nov', opponent: 'Mason City', result: 'W 2-1', goals: 1, assists: 0, pts: 1, pim: 0, gw: 0, capsScore: 2, oppScore: 1 },
  { date: '11/08', month: 'Nov', opponent: 'Omaha', result: 'W 6-5', goals: 0, assists: 0, pts: 0, pim: 0, gw: 0, capsScore: 6, oppScore: 5 },
  { date: '11/09', month: 'Nov', opponent: 'Omaha', result: 'W 5-2', goals: 0, assists: 2, pts: 2, pim: 0, gw: 0, capsScore: 5, oppScore: 2 },
  { date: '11/15', month: 'Nov', opponent: 'Spirit Lake', result: 'W 10-0', goals: 0, assists: 0, pts: 0, pim: 0, gw: 0, capsScore: 10, oppScore: 0 },
  { date: '11/16', month: 'Nov', opponent: 'Spirit Lake', result: 'W 3-0', goals: 0, assists: 1, pts: 1, pim: 0, gw: 0, capsScore: 3, oppScore: 0 },
  { date: '11/22', month: 'Nov', opponent: 'at Fremont', result: 'W 8-1', goals: 0, assists: 2, pts: 2, pim: 0, gw: 0, capsScore: 8, oppScore: 1 },
  { date: '11/23', month: 'Nov', opponent: 'at Fremont', result: 'W 6-2', goals: 0, assists: 2, pts: 2, pim: 0, gw: 0, capsScore: 6, oppScore: 2 },
  { date: '11/25', month: 'Nov', opponent: 'DM Oaks', result: 'W 5-2', goals: 0, assists: 0, pts: 0, pim: 0, gw: 0, capsScore: 5, oppScore: 2 },
  { date: '12/06', month: 'Dec', opponent: 'Kansas City', result: 'W 6-2', goals: 1, assists: 2, pts: 3, pim: 2, gw: 1, capsScore: 6, oppScore: 2 },
  { date: '12/07', month: 'Dec', opponent: 'Kansas City', result: 'W 3-2', goals: 0, assists: 1, pts: 1, pim: 0, gw: 0, capsScore: 3, oppScore: 2 },
  // 👆 ADD NEW GAMES HERE - Copy format above
];

// ============================================
// 🏆 LEAGUE LEADERS - UPDATE WEEKLY
// ============================================
const leagueLeaders = [
  { rank: 1, name: 'Cade Weiner', team: 'DBQ', pos: 'F', gp: 14, goals: 17, assists: 18, pts: 35, gradYear: 2028, class: 'So' },
  { rank: 2, name: 'Sammy Ruiz', team: 'DBQ', pos: 'F', gp: 14, goals: 8, assists: 16, pts: 24, gradYear: 2026, class: 'Sr' },
  { rank: 3, name: 'Xander Sheehy', team: 'DBQ', pos: 'F', gp: 14, goals: 9, assists: 14, pts: 23, gradYear: 2026, class: 'Sr' },
  { rank: 4, name: 'Maxx Myers', team: 'CAP', pos: 'F', gp: 13, goals: 10, assists: 12, pts: 22, gradYear: 2026, class: 'Sr' },
  { rank: 5, name: 'Cole Crawford', team: 'AMES', pos: 'D', gp: 12, goals: 7, assists: 14, pts: 21, gradYear: 2028, class: 'So', highlight: true },
  { rank: 6, name: 'Alex Heinkel', team: 'DBQ', pos: 'F', gp: 14, goals: 11, assists: 9, pts: 20, gradYear: 2027, class: 'Jr' },
  { rank: 7, name: 'Gage Behrens', team: 'CAP', pos: 'F', gp: 13, goals: 13, assists: 6, pts: 19, gradYear: 2026, class: 'Sr' },
  { rank: 8, name: 'Cale Buchan', team: 'WAT', pos: 'F', gp: 11, goals: 9, assists: 10, pts: 19, gradYear: 2027, class: 'Jr' },
  { rank: 9, name: 'Jensen Hill', team: 'DBQ', pos: 'F', gp: 14, goals: 9, assists: 10, pts: 19, gradYear: 2026, class: 'Sr' },
  { rank: 10, name: 'Logan Caldwell', team: 'WAT', pos: 'F', gp: 11, goals: 11, assists: 7, pts: 18, gradYear: 2026, class: 'Sr' },
  { rank: 11, name: 'Jarrett Parker', team: 'CAP', pos: 'F', gp: 10, goals: 10, assists: 7, pts: 17, gradYear: 2026, class: 'Sr' },
  { rank: 12, name: 'Talan Millang', team: 'CAP', pos: 'D', gp: 13, goals: 2, assists: 13, pts: 15, gradYear: 2027, class: 'Jr', isTalan: true },
  { rank: 13, name: 'Luke Logsdon', team: 'CAP', pos: 'F', gp: 13, goals: 11, assists: 5, pts: 16, gradYear: 2026, class: 'Sr' },
];

// All league defensemen
const allDefensemen = [
  { name: 'Cole Crawford', team: 'AMES', gp: 12, goals: 7, assists: 14, pts: 21, ppg: 1.75, gradYear: 2028, class: 'Sophomore' },
  { name: 'Talan Millang', team: 'CAP', gp: 13, goals: 2, assists: 13, pts: 15, ppg: 1.15, gradYear: 2027, class: 'Junior', isTalan: true },
  { name: 'Grady Stiles', team: 'CAP', gp: 13, goals: 3, assists: 4, pts: 7, ppg: 0.54, gradYear: 2026, class: 'Senior' },
  { name: 'Adam Wey', team: 'CAP', gp: 13, goals: 2, assists: 2, pts: 4, ppg: 0.31, gradYear: 2027, class: 'Junior' },
  { name: 'Luke Henely', team: 'CAP', gp: 13, goals: 2, assists: 1, pts: 3, ppg: 0.23, gradYear: 2027, class: 'Junior' },
  { name: 'Luke Behrens', team: 'CAP', gp: 12, goals: 0, assists: 3, pts: 3, ppg: 0.25, gradYear: 2028, class: 'Sophomore' },
  { name: 'William Reed', team: 'CAP', gp: 13, goals: 0, assists: 2, pts: 2, ppg: 0.15, gradYear: 2028, class: 'Sophomore' },
];

// Class of 2027 (Juniors)
const juniorsOnly = [
  { name: 'Alex Heinkel', team: 'DBQ', pos: 'F', gp: 14, goals: 11, assists: 9, pts: 20 },
  { name: 'Cale Buchan', team: 'WAT', pos: 'F', gp: 11, goals: 9, assists: 10, pts: 19 },
  { name: 'Talan Millang', team: 'CAP', pos: 'D', gp: 13, goals: 2, assists: 13, pts: 15, isTalan: true },
  { name: 'Adam Wey', team: 'CAP', pos: 'D', gp: 13, goals: 2, assists: 2, pts: 4 },
  { name: 'Luke Henely', team: 'CAP', pos: 'D', gp: 13, goals: 2, assists: 1, pts: 3 },
];

// Opponent scoring data
const opponentScoringData = [
  { team: 'Cedar Rapids', avgGoalsScored: 2.8, goalsVsCaps: 1.0, gamesVsCaps: 2, pctBelow: 64 },
  { team: 'Ames', avgGoalsScored: 3.5, goalsVsCaps: 2.0, gamesVsCaps: 1, pctBelow: 43 },
  { team: 'Mason City', avgGoalsScored: 2.2, goalsVsCaps: 1.0, gamesVsCaps: 1, pctBelow: 55 },
  { team: 'Omaha', avgGoalsScored: 3.8, goalsVsCaps: 3.5, gamesVsCaps: 2, pctBelow: 8 },
  { team: 'Spirit Lake', avgGoalsScored: 1.5, goalsVsCaps: 0.0, gamesVsCaps: 2, pctBelow: 100 },
  { team: 'Fremont', avgGoalsScored: 2.4, goalsVsCaps: 1.5, gamesVsCaps: 2, pctBelow: 38 },
  { team: 'DM Oaks', avgGoalsScored: 3.2, goalsVsCaps: 2.0, gamesVsCaps: 1, pctBelow: 38 },
  { team: 'Kansas City', avgGoalsScored: 3.1, goalsVsCaps: 2.0, gamesVsCaps: 2, pctBelow: 35 },
];

const avgSuppression = Math.round(opponentScoringData.reduce((sum, t) => sum + t.pctBelow, 0) / opponentScoringData.length);

// ============================================
// 📋 TALAN'S BIO - UPDATE AS NEEDED
// ============================================
const talanStats = {
  gp: 13, goals: 2, assists: 13, pts: 15, ppg: 1.15, pim: 2, gw: 1,
  height: "6'3\"", weight: 195, position: 'D', number: 11, gradYear: 2027
};

// Monthly data - auto-calculated or update manually
const monthlyData = [
  { month: 'October', games: 2, goals: 0, assists: 2, pts: 2, ppg: 1.00 },
  { month: 'November', games: 9, goals: 1, assists: 8, pts: 9, ppg: 1.00 },
  { month: 'December', games: 2, goals: 1, assists: 3, pts: 4, ppg: 2.00 }
];

// Calculate cumulative stats automatically
const cumulativeData = gameData.reduce((acc, game, index) => {
  const prev = acc[index - 1] || { cumGoals: 0, cumAssists: 0, cumPts: 0 };
  acc.push({
    ...game,
    gameNum: index + 1,
    cumGoals: prev.cumGoals + game.goals,
    cumAssists: prev.cumAssists + game.assists,
    cumPts: prev.cumPts + game.pts
  });
  return acc;
}, []);

// Rankings calculations
const allPlayersByPts = [...leagueLeaders].sort((a, b) => b.pts - a.pts);
const talanPtsRankAll = allPlayersByPts.findIndex(p => p.isTalan) + 1;
const talanGoalsRankAll = 13;
const talanAssistsRankAll = 3;
const talanGoalsRankD = 2;
const talanAssistsRankD = 1;
const talanPtsRankD = 2;

// Helper to check if URL is a YouTube Clip
const getYouTubeClipId = (url) => {
  if (!url || typeof url !== 'string') return null;
  const clipMatch = url.match(/youtube\.com\/clip\/([a-zA-Z0-9_-]+)/);
  if (clipMatch && clipMatch[1]) return clipMatch[1];
  return null;
};

// Helper to extract YouTube video ID from various URL formats
const getYouTubeId = (url) => {
  if (!url || typeof url !== 'string') return null;
  
  // Clean the URL - trim whitespace and decode if needed
  const cleanUrl = url.trim();
  
  // Method 1: Look for v= parameter (most common)
  const vParam = cleanUrl.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (vParam && vParam[1]) return vParam[1];
  
  // Method 2: youtu.be short links
  const shortLink = cleanUrl.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortLink && shortLink[1]) return shortLink[1].split(/[?&]/)[0];
  
  // Method 3: /embed/ URLs
  const embedUrl = cleanUrl.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  if (embedUrl && embedUrl[1]) return embedUrl[1].split(/[?&]/)[0];
  
  // Method 4: /shorts/ URLs
  const shortsUrl = cleanUrl.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsUrl && shortsUrl[1]) return shortsUrl[1].split(/[?&]/)[0];
  
  // Method 5: /live/ URLs
  const liveUrl = cleanUrl.match(/youtube\.com\/live\/([a-zA-Z0-9_-]+)/);
  if (liveUrl && liveUrl[1]) return liveUrl[1].split(/[?&]/)[0];
  
  // Method 6: /v/ URLs (old format)
  const oldFormat = cleanUrl.match(/youtube\.com\/v\/([a-zA-Z0-9_-]+)/);
  if (oldFormat && oldFormat[1]) return oldFormat[1].split(/[?&]/)[0];
  
  // Method 7: If it looks like just a video ID (11 chars, alphanumeric with dashes/underscores)
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) return cleanUrl;
  
  return null;
};

// Helper to convert video URLs to embed URLs
const getEmbedUrl = (url) => {
  if (!url || typeof url !== 'string' || !url.trim()) return null;
  
  // YouTube Clips CANNOT be embedded - they must open in new tab
  // So we return null for clips to trigger the "open in new tab" UI
  const clipId = getYouTubeClipId(url);
  if (clipId) return null;
  
  // Regular YouTube videos CAN be embedded
  const ytId = getYouTubeId(url);
  if (ytId) return `https://www.youtube.com/embed/${ytId}?rel=0`;
  
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  
  // Hudl - these need to be opened in new tab (can't embed)
  if (url.includes('hudl.com')) return null;
  
  return null;
};

// Check if URL is a YouTube Clip (for showing appropriate UI message)
const isYouTubeClip = (url) => {
  return getYouTubeClipId(url) !== null;
};

// Helper to get YouTube thumbnail
const getYouTubeThumbnail = (url) => {
  // Regular YouTube videos have predictable thumbnails
  const ytId = getYouTubeId(url);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }
  // YouTube Clips don't have standard thumbnails (clip IDs aren't video IDs)
  // So we return null and the UI will show a play button overlay instead
  return null;
};

const COLORS = {
  purple: '#8B5CF6',
  indigo: '#6366F1',
  gray: '#94A3B8',
  green: '#10B981',
  gold: '#F59E0B',
  red: '#EF4444',
  blue: '#3B82F6'
};

// Talan's actual highlight clips - these show for everyone
const defaultHighlights = [
  { 
    id: 1, 
    title: '12/7/25 - Capitals v Jets', 
    description: 'Strong defensive play with physicality', 
    thumbnail: '🏒', 
    date: '12/07/2025', 
    url: 'https://youtube.com/clip/Ugkx3XuPOEbVntCqpfeO-1n4wjnqoCi6kBIf?si=4p7cSpOjoM1ERObH', 
    tags: ['Defensive Play', 'Hit', 'Breakout'] 
  },
  { 
    id: 2, 
    title: '12/7/25 - Capitals v Jets', 
    description: 'Smooth skating and breakout pass', 
    thumbnail: '🏒', 
    date: '12/07/2025', 
    url: 'https://youtube.com/clip/UgkxT_OXPTVcWUNSwdFkvgV0Z61u3cyaDqjf?si=X5J7oaWtaDQRBEPt', 
    tags: ['Defensive Play', 'Skating', 'Strength', 'Breakout'] 
  },
  { 
    id: 3, 
    title: '12/7/25 - Capitals v Jets', 
    description: 'Solid defensive positioning', 
    thumbnail: '🏒', 
    date: '12/07/2025', 
    url: 'https://youtube.com/clip/Ugkx2_6IfgaLX7dNieII93i61xERTqnwhJ-Q?si=744EgtLG1rIgcKs6', 
    tags: ['Defensive Play', 'Strength'] 
  },
  { 
    id: 4, 
    title: '12/7/25 - Capitals v Jets', 
    description: 'Physical play and puck retrieval', 
    thumbnail: '🏒', 
    date: '12/07/2025', 
    url: 'https://youtube.com/clip/UgkxD3ctIuaZMVFBpEFj84UdFkFzTodgiw_L?si=tuWlBGyvskzcuf2I', 
    tags: ['Defensive Play', 'Strength', 'Breakout'] 
  },
  { 
    id: 5, 
    title: '12/7/25 - Capitals v Jets', 
    description: 'Big hit and zone clearance', 
    thumbnail: '🏒', 
    date: '12/07/2025', 
    url: 'https://youtube.com/clip/UgkxO0IaXD0KvPV86tst0Jo-lqdf3wWYJKIE?si=z7D6_C1lu-UkRJwm', 
    tags: ['Defensive Play', 'Hit', 'Strength'] 
  },
];

// Available tags for highlights
const availableTags = [
  'Goal', 
  'Assist', 
  'GWG', 
  'Penalty Kill',
  'Power Play', 
  'Defensive Play', 
  'Skating', 
  'Shot', 
  'Pass', 
  'Hit', 
  'Block', 
  'Multi-Point', 
  'Strength', 
  'Breakout'
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddHighlight, setShowAddHighlight] = useState(false);
  const [highlightUrl, setHighlightUrl] = useState('');
  const [highlightTitle, setHighlightTitle] = useState('');
  const [highlightDesc, setHighlightDesc] = useState('');
  const [highlightTags, setHighlightTags] = useState([]);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [filterTag, setFilterTag] = useState('All');
  const [editingHighlight, setEditingHighlight] = useState(null);
  
  // Always use the hardcoded highlights so everyone sees the same content
  const [highlights, setHighlights] = useState(defaultHighlights);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Target size={16} /> },
    { id: 'pace', label: 'Season Pace', icon: <TrendingUp size={16} /> },
    { id: 'rankings', label: 'League Rankings', icon: <Trophy size={16} /> },
    { id: 'opponents', label: 'Opponent Impact', icon: <Shield size={16} /> },
    { id: 'class', label: 'Class of 2027', icon: <Users size={16} /> },
    { id: 'highlights', label: 'Highlights', icon: <Video size={16} /> },
  ];

  const handleAddHighlight = () => {
    if (highlightTitle.trim()) {
      const newHighlight = {
        id: Date.now(),
        title: highlightTitle,
        description: highlightDesc || 'No description',
        url: highlightUrl,
        thumbnail: '🎬',
        date: new Date().toLocaleDateString(),
        tags: highlightTags
      };
      setHighlights([newHighlight, ...highlights]);
      setHighlightUrl('');
      setHighlightTitle('');
      setHighlightDesc('');
      setHighlightTags([]);
      setShowAddHighlight(false);
    }
  };

  const handleEditHighlight = (highlight) => {
    setEditingHighlight(highlight);
    setHighlightTitle(highlight.title);
    setHighlightDesc(highlight.description);
    setHighlightUrl(highlight.url || '');
    setHighlightTags(highlight.tags || []);
  };

  const handleSaveEdit = () => {
    if (editingHighlight && highlightTitle.trim()) {
      setHighlights(highlights.map(h => 
        h.id === editingHighlight.id 
          ? { ...h, title: highlightTitle, description: highlightDesc, url: highlightUrl, tags: highlightTags }
          : h
      ));
      setEditingHighlight(null);
      setHighlightTitle('');
      setHighlightDesc('');
      setHighlightUrl('');
      setHighlightTags([]);
    }
  };

  const toggleTag = (tag) => {
    setHighlightTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredHighlights = filterTag === 'All' 
    ? highlights 
    : highlights.filter(h => h.tags && h.tags.includes(filterTag));

  const handleDeleteHighlight = (id) => {
    setHighlights(highlights.filter(h => h.id !== id));
    if (playingVideo === id) setPlayingVideo(null);
  };

  // Narrative Component
  const NarrativeBox = ({ title, children }) => (
    <div className="bg-gradient-to-r from-slate-50 to-purple-50 border border-purple-200 rounded-xl p-5 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="text-purple-600" size={20} />
        <h3 className="font-semibold text-purple-800">{title}</h3>
      </div>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </div>
  );

  // Scout's Notes Component
  const ScoutsNotes = ({ notes }) => (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-5 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Eye className="text-amber-600" size={20} />
        <h3 className="font-semibold text-amber-800">Scout's Notes</h3>
      </div>
      <ul className="space-y-2">
        {notes.map((note, idx) => (
          <li key={idx} className="flex items-start gap-2 text-amber-900">
            <span className="text-amber-500 mt-1">•</span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  // Stat Card Component
  const StatCard = ({ label, value, subtitle, icon, highlight }) => (
    <div className={`p-4 rounded-xl ${highlight ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white' : 'bg-white border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-sm font-medium ${highlight ? 'text-purple-100' : 'text-gray-500'}`}>{label}</span>
        {icon}
      </div>
      <div className={`text-3xl font-bold ${highlight ? 'text-white' : 'text-gray-900'}`}>{value}</div>
      {subtitle && <div className={`text-xs mt-1 ${highlight ? 'text-purple-200' : 'text-gray-400'}`}>{subtitle}</div>}
    </div>
  );

  // Ranking Badge Component
  const RankBadge = ({ category, vsAll, vsD }) => (
    <div className="bg-white rounded-xl p-4 border border-gray-200">
      <div className="text-sm font-medium text-gray-500 mb-2">{category}</div>
      <div className="flex gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-600">#{vsAll}</div>
          <div className="text-xs text-gray-400">vs All</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">#{vsD}</div>
          <div className="text-xs text-gray-400">vs D-Men</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 rounded-2xl p-6 mb-6 text-white shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">11</div>
              <div>
                <h1 className="text-3xl font-bold">Talan Millang</h1>
                <p className="text-purple-200">Defenseman • Des Moines Capitals • Class of 2027</p>
              </div>
            </div>
            <div className="flex gap-4 mt-4 text-sm flex-wrap">
              <span className="bg-white/20 px-3 py-1 rounded-full">🏫 Valley HS</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">📏 {talanStats.height}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">⚖️ {talanStats.weight} lbs</span>
              <span className="bg-green-500/30 px-3 py-1 rounded-full">🏆 13-0 Record</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold">{talanStats.pts}</div>
            <div className="text-purple-200">Total Points</div>
            <div className="text-sm mt-2 bg-white/20 px-3 py-1 rounded-full inline-block">
              {talanStats.ppg} PPG
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-purple-50 border border-gray-200'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <NarrativeBox title="Season Overview">
            <p>
              Talan Millang has emerged as one of the premier offensive defensemen in the MWHSHL this season, 
              anchoring the blue line for an undefeated Des Moines Capitals squad. Through 13 games, the 6'3" 195-pound 
              junior has accumulated <strong>15 points (2G, 13A)</strong>, ranking him <strong>#12 overall</strong> in 
              league scoring and <strong>#2 among all defensemen</strong>. His playmaking ability is exceptional—averaging 
              exactly one assist per game—while maintaining elite discipline with only 2 penalty minutes all season.
            </p>
            <p className="mt-3">
              December has showcased an offensive surge, with Talan posting a <strong>2.00 PPG</strong> rate including 
              a game-winning goal against Kansas City. His ability to quarterback the power play and create offense 
              from the back end has been instrumental in the Capitals' perfect 13-0 record.
            </p>
          </NarrativeBox>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Points" value={talanStats.pts} subtitle={`#${talanPtsRankAll} in league`} icon={<Star className="text-yellow-500" size={20} />} highlight />
            <StatCard label="Goals" value={talanStats.goals} subtitle="#2 among D-Men" icon={<Target className="text-red-500" size={20} />} />
            <StatCard label="Assists" value={talanStats.assists} subtitle="#1 among D-Men" icon={<TrendingUp className="text-green-500" size={20} />} />
            <StatCard label="GWG" value={talanStats.gw} subtitle="Game Winners" icon={<Trophy className="text-amber-500" size={20} />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 Cumulative Points Growth</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={cumulativeData}>
                  <defs>
                    <linearGradient id="colorPts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="cumPts" stroke="#8B5CF6" strokeWidth={3} fill="url(#colorPts)" name="Points" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🔥 Monthly PPG Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={[0, 2.5]} />
                  <Tooltip />
                  <Bar dataKey="ppg" fill="#8B5CF6" radius={[8, 8, 0, 0]} name="PPG">
                    <LabelList dataKey="ppg" position="top" formatter={(v) => v.toFixed(2)} />
                  </Bar>
                  <ReferenceLine y={1.0} stroke="#10B981" strokeDasharray="5 5" label={{ value: "Season Avg", fill: "#10B981", fontSize: 10 }} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-3 p-3 bg-green-50 rounded-lg text-center">
                <span className="text-green-700 font-semibold">⬆️ 100% PPG increase in December!</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">🎯 Points Breakdown by Game</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={gameData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="opponent" tick={{ fontSize: 9 }} angle={-45} textAnchor="end" height={80} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="goals" stackId="pts" fill="#EF4444" name="Goals" />
                <Bar dataKey="assists" stackId="pts" fill="#8B5CF6" name="Assists" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <ScoutsNotes notes={[
            "Elite size (6'3\" 195 lbs) with smooth skating ability and excellent gap control",
            "High hockey IQ—consistently makes the right read on breakouts and zone entries",
            "Exceptional vision and passing ability; generates offense without sacrificing defensive positioning",
            "Poised under pressure with the puck; rarely forces plays or turns it over",
            "Strong candidate for top D-pair minutes at the next level; projects as a PP quarterback"
          ]} />
        </div>
      )}

      {/* Season Pace Tab */}
      {activeTab === 'pace' && (
        <div className="space-y-6">
          <NarrativeBox title="Season Projection Analysis">
            <p>
              With 13 games in the books and 19 remaining in the regular season, Talan Millang is on pace for a 
              <strong> historic offensive season from the blue line</strong>. His current 1.15 PPG projects to 
              <strong> 37 points</strong> over a full 32-game season—but December's 2.00 PPG surge suggests even 
              higher upside. Factor in playoff games (the Caps made the finals last year), and Talan could push 
              toward <strong>45+ total points</strong> this season.
            </p>
            <p className="mt-3">
              The remaining schedule presents a balanced mix: 6 games against weaker opponents (Metros, Riders, Blues) 
              where Talan historically racks up assists, 7 games against mid-tier teams, and 6 crucial matchups against 
              top competition (Saints, Oak Leafs, Jr Stars) that will test—and showcase—his abilities against the best.
            </p>
          </NarrativeBox>

          {/* Projection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
              <div className="text-blue-200 text-sm font-medium mb-1">Conservative Pace</div>
              <div className="text-4xl font-bold">34-37</div>
              <div className="text-blue-100 text-sm mt-1">Points (Regular Season)</div>
              <div className="mt-3 text-xs text-blue-200">Based on 1.07-1.15 PPG</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
              <div className="text-purple-200 text-sm font-medium mb-1">Projected Pace</div>
              <div className="text-4xl font-bold">38-42</div>
              <div className="text-purple-100 text-sm mt-1">Points (Regular Season)</div>
              <div className="mt-3 text-xs text-purple-200">Trend-adjusted (Dec surge)</div>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-5 text-white">
              <div className="text-amber-200 text-sm font-medium mb-1">Ceiling (w/ Playoffs)</div>
              <div className="text-4xl font-bold">45-50</div>
              <div className="text-amber-100 text-sm mt-1">Total Points</div>
              <div className="mt-3 text-xs text-amber-200">If Caps reach finals again</div>
            </div>
          </div>

          {/* Detailed Projections */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Projection Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 text-gray-500">Scenario</th>
                    <th className="text-center py-2 px-3 text-gray-500">GP</th>
                    <th className="text-center py-2 px-3 text-gray-500">PPG</th>
                    <th className="text-center py-2 px-3 text-gray-500">G</th>
                    <th className="text-center py-2 px-3 text-gray-500">A</th>
                    <th className="text-center py-2 px-3 text-gray-500 font-bold">PTS</th>
                    <th className="text-left py-2 px-3 text-gray-500">Reasoning</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 bg-green-50">
                    <td className="py-3 px-3 font-medium">✅ Current (Actual)</td>
                    <td className="text-center py-3 px-3">13</td>
                    <td className="text-center py-3 px-3">1.15</td>
                    <td className="text-center py-3 px-3">2</td>
                    <td className="text-center py-3 px-3">13</td>
                    <td className="text-center py-3 px-3 font-bold">15</td>
                    <td className="py-3 px-3 text-gray-600 text-xs">Verified stats through 12/7</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-medium">📉 Floor</td>
                    <td className="text-center py-3 px-3">32</td>
                    <td className="text-center py-3 px-3">1.07</td>
                    <td className="text-center py-3 px-3">4</td>
                    <td className="text-center py-3 px-3">30</td>
                    <td className="text-center py-3 px-3 font-bold">34</td>
                    <td className="py-3 px-3 text-gray-600 text-xs">Regression to Oct/Nov rate vs tough schedule</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-purple-50">
                    <td className="py-3 px-3 font-medium">📊 Expected</td>
                    <td className="text-center py-3 px-3">32</td>
                    <td className="text-center py-3 px-3">1.25</td>
                    <td className="text-center py-3 px-3">5</td>
                    <td className="text-center py-3 px-3">35</td>
                    <td className="text-center py-3 px-3 font-bold text-purple-700">40</td>
                    <td className="py-3 px-3 text-gray-600 text-xs">Dec surge sustained, opponent-adjusted</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 font-medium">📈 Ceiling</td>
                    <td className="text-center py-3 px-3">32</td>
                    <td className="text-center py-3 px-3">1.40</td>
                    <td className="text-center py-3 px-3">6</td>
                    <td className="text-center py-3 px-3">39</td>
                    <td className="text-center py-3 px-3 font-bold">45</td>
                    <td className="py-3 px-3 text-gray-600 text-xs">Dec pace continues, dominates weak opponents</td>
                  </tr>
                  <tr className="bg-amber-50">
                    <td className="py-3 px-3 font-medium">🏆 w/ Playoffs</td>
                    <td className="text-center py-3 px-3">36-40</td>
                    <td className="text-center py-3 px-3">1.25</td>
                    <td className="text-center py-3 px-3">6-7</td>
                    <td className="text-center py-3 px-3">39-43</td>
                    <td className="text-center py-3 px-3 font-bold text-amber-700">45-50</td>
                    <td className="py-3 px-3 text-gray-600 text-xs">If Caps reach finals (4-8 playoff games)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Remaining Schedule */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📅 Remaining Schedule Analysis (19 Games)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="font-semibold text-green-800">Easy (6 games)</span>
                </div>
                <div className="text-sm text-green-700 space-y-1">
                  <div>• Metros (1-9) × 2</div>
                  <div>• Riders (1-11) × 1</div>
                  <div>• Blues (4-6) × 3</div>
                </div>
                <div className="mt-2 text-xs text-green-600">Projected: 1.5-2.0 PPG</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="font-semibold text-yellow-800">Medium (7 games)</span>
                </div>
                <div className="text-sm text-yellow-700 space-y-1">
                  <div>• Cyclones (6-6) × 2</div>
                  <div>• Warriors (6-5) × 3</div>
                  <div>• Mohawks (8-4) × 2</div>
                </div>
                <div className="mt-2 text-xs text-yellow-600">Projected: 1.0-1.3 PPG</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="font-semibold text-red-800">Hard (6 games)</span>
                </div>
                <div className="text-sm text-red-700 space-y-1">
                  <div>• Saints (13-1) × 3</div>
                  <div>• Oak Leafs (9-3) × 1</div>
                  <div>• Jr Stars (8-3) × 2</div>
                </div>
                <div className="mt-2 text-xs text-red-600">Projected: 0.8-1.0 PPG</div>
              </div>
            </div>
            
            {/* Schedule Chart */}
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { difficulty: 'Easy', games: 6, projectedPts: 10, color: '#10B981' },
                { difficulty: 'Medium', games: 7, projectedPts: 8, color: '#F59E0B' },
                { difficulty: 'Hard', games: 6, projectedPts: 5, color: '#EF4444' },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="difficulty" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="projectedPts" name="Projected Points" radius={[8, 8, 0, 0]}>
                  {[
                    { difficulty: 'Easy', games: 6, projectedPts: 10, color: '#10B981' },
                    { difficulty: 'Medium', games: 7, projectedPts: 8, color: '#F59E0B' },
                    { difficulty: 'Hard', games: 6, projectedPts: 5, color: '#EF4444' },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList dataKey="projectedPts" position="top" formatter={(v) => `${v} pts`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="text-center text-sm text-gray-500 mt-2">
              Remaining 19 games: <strong className="text-purple-600">~23 projected points</strong> → <strong>38 total</strong> (conservative)
            </div>
          </div>

          {/* Monthly Projection */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 Projected Monthly Progression</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={[
                { month: 'Oct', actual: 2, projected: 2, games: 2 },
                { month: 'Nov', actual: 9, projected: 9, games: 9 },
                { month: 'Dec', actual: 4, projected: 8, games: 5 },
                { month: 'Jan', actual: null, projected: 9, games: 7 },
                { month: 'Feb', actual: null, projected: 10, games: 9 },
              ]}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="projected" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" fill="url(#colorProjected)" name="Projected" />
                <Area type="monotone" dataKey="actual" stroke="#8B5CF6" strokeWidth={3} fill="url(#colorActual)" name="Actual" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Milestones */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-5 text-white">
            <h3 className="text-xl font-bold mb-4">🎯 Milestone Tracker</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">20 PTS</div>
                <div className="text-purple-200 text-sm">~3 games away</div>
                <div className="text-xs text-purple-300 mt-1">Mid-December</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">25 PTS</div>
                <div className="text-purple-200 text-sm">~8 games away</div>
                <div className="text-xs text-purple-300 mt-1">Early January</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">30 PTS</div>
                <div className="text-purple-200 text-sm">~13 games away</div>
                <div className="text-xs text-purple-300 mt-1">Late January</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">40 PTS</div>
                <div className="text-purple-200 text-sm">Season goal</div>
                <div className="text-xs text-purple-300 mt-1">End of Feb</div>
              </div>
            </div>
          </div>

          {/* Key Matchups */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">⭐ Key Upcoming Matchups</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <div className="font-semibold text-red-800">vs Saints (13-1)</div>
                  <div className="text-sm text-red-600">Jan 31, Feb 7, Feb 8 — 3 games</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-red-700 font-medium">Showcase games</div>
                  <div className="text-xs text-red-500">Best D-corps in league</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <div className="font-semibold text-yellow-800">@ Oak Leafs (9-3)</div>
                  <div className="text-sm text-yellow-600">Jan 13</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-yellow-700 font-medium">Rivalry game</div>
                  <div className="text-xs text-yellow-500">Already beat them 5-2</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <div className="font-semibold text-green-800">@ Metros (1-9)</div>
                  <div className="text-sm text-green-600">Dec 13-14 — THIS WEEKEND</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-green-700 font-medium">Stat-padding opportunity</div>
                  <div className="text-xs text-green-500">Weakest team in league</div>
                </div>
              </div>
            </div>
          </div>

          <ScoutsNotes notes={[
            "December surge (2.00 PPG) may indicate adjustment period is over—expect sustained production",
            "6 games vs bottom-3 teams (Metros, Riders, Blues) present major point opportunities",
            "3 games vs Saints will be the ultimate test—strong performance here = major recruiting attention",
            "Playoff experience from last year's finals run should boost postseason production",
            "If current trajectory holds, 40+ points as a Junior D-man would be exceptional for any level"
          ]} />
        </div>
      )}

      {/* League Rankings Tab */}
      {activeTab === 'rankings' && (
        <div className="space-y-6">
          <NarrativeBox title="League Standing Analysis">
            <p>
              In a league dominated by forwards at the top of the scoring charts, Talan Millang stands out as a 
              rare offensive threat from the blue line. His <strong>15 points</strong> place him <strong>#12 overall</strong> in 
              league scoring—remarkable given that only <strong>two defensemen</strong> crack the top 20 scorers 
              (Cole Crawford of Ames leads D-men with 21 points).
            </p>
            <p className="mt-3">
              What makes Talan's production exceptional is its distribution: his <strong>13 assists lead all defensemen</strong> and 
              rank <strong>#3 in the entire league</strong>. Only Cade Weiner (18) and Sammy Ruiz (16) have more helpers—both 
              are forwards on the league's highest-scoring team in Dubuque. Among players on undefeated teams, 
              Talan's playmaking ability is unmatched from the back end.
            </p>
          </NarrativeBox>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RankBadge category="Total Points" vsAll={talanPtsRankAll} vsD={talanPtsRankD} />
            <RankBadge category="Goals" vsAll={`${talanGoalsRankAll}+`} vsD={talanGoalsRankD} />
            <RankBadge category="Assists" vsAll={talanAssistsRankAll} vsD={talanAssistsRankD} />
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">🏒 League Scoring Leaders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-2 text-gray-500">Rank</th>
                    <th className="text-left py-2 px-2 text-gray-500">Player</th>
                    <th className="text-center py-2 px-2 text-gray-500">Pos</th>
                    <th className="text-center py-2 px-2 text-gray-500">Team</th>
                    <th className="text-center py-2 px-2 text-gray-500">Class</th>
                    <th className="text-center py-2 px-2 text-gray-500">GP</th>
                    <th className="text-center py-2 px-2 text-gray-500">G</th>
                    <th className="text-center py-2 px-2 text-gray-500">A</th>
                    <th className="text-center py-2 px-2 text-gray-500 font-bold">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {leagueLeaders.slice(0, 15).map((player, idx) => (
                    <tr key={idx} className={`border-b border-gray-100 ${player.isTalan ? 'bg-purple-100 font-semibold' : ''} ${player.pos === 'D' ? 'text-indigo-700' : ''}`}>
                      <td className="py-2 px-2">{player.rank}</td>
                      <td className="py-2 px-2">{player.name} {player.isTalan && '⭐'}</td>
                      <td className="text-center py-2 px-2">
                        <span className={`px-2 py-0.5 rounded text-xs ${player.pos === 'D' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
                          {player.pos}
                        </span>
                      </td>
                      <td className="text-center py-2 px-2">{player.team}</td>
                      <td className="text-center py-2 px-2">{player.class}</td>
                      <td className="text-center py-2 px-2">{player.gp}</td>
                      <td className="text-center py-2 px-2">{player.goals}</td>
                      <td className="text-center py-2 px-2">{player.assists}</td>
                      <td className="text-center py-2 px-2 font-bold">{player.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">🛡️ League Defensemen Scoring</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={allDefensemen} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={120} />
                <Tooltip />
                <Bar dataKey="pts" radius={[0, 8, 8, 0]} name="Points">
                  {allDefensemen.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.isTalan ? COLORS.purple : COLORS.indigo} />
                  ))}
                  <LabelList dataKey="pts" position="right" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <ScoutsNotes notes={[
            "Only Cole Crawford (So., Ames) outscores Talan among D-men—and Crawford has the advantage of playing with a high-octane offense",
            "Talan's 13 assists are TIED for #1 among all defensemen league-wide",
            "His 2:13 goal-to-assist ratio demonstrates elite playmaking; not just a one-dimensional shooter",
            "Production is sustainable—consistent 1.00 PPG through Oct/Nov before December surge",
            "Two-way game allows coaches to deploy him in all situations without sacrificing offense"
          ]} />
        </div>
      )}

      {/* Opponent Impact Tab */}
      {activeTab === 'opponents' && (
        <div className="space-y-6">
          <NarrativeBox title="Defensive Impact Analysis">
            <p>
              The Des Moines Capitals' perfect 13-0 record isn't just about offensive firepower—it's built on 
              suffocating team defense, and Talan Millang is a cornerstone of that success. When facing the Capitals, 
              opponents score an average of <strong>{avgSuppression}% below their season scoring average</strong>.
            </p>
            <p className="mt-3">
              The data reveals a consistent pattern: teams simply can't generate their normal offensive output against 
              Des Moines. Spirit Lake was completely shut out in both meetings (100% suppression), while competitive 
              teams like Cedar Rapids, Mason City, and Kansas City all scored significantly below their typical rates. 
              Even Omaha—the only team to push the Caps—still fell 8% below their average.
            </p>
          </NarrativeBox>

          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-5 text-white">
            <h3 className="text-xl font-bold mb-2">🛡️ The Capitals Shutdown Effect</h3>
            <p className="text-red-100">How opponents' offensive output drops when they face Des Moines Capitals</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Opponent Goals: Season Average vs Against Caps</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={opponentScoringData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 5]} label={{ value: 'Goals per Game', position: 'bottom', fontSize: 11 }} />
                <YAxis dataKey="team" type="category" tick={{ fontSize: 11 }} width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgGoalsScored" fill="#94A3B8" name="Season Avg Goals" radius={[0, 4, 4, 0]} />
                <Bar dataKey="goalsVsCaps" fill="#10B981" name="Goals vs Capitals" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📉 Scoring Suppression: % Below Season Average vs Caps</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={opponentScoringData.sort((a, b) => b.pctBelow - a.pctBelow)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="team" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} label={{ value: '% Below Average', angle: -90, position: 'insideLeft', fontSize: 11 }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Below Average']} />
                <Bar dataKey="pctBelow" radius={[8, 8, 0, 0]} name="% Below Avg">
                  {opponentScoringData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.pctBelow >= 50 ? '#10B981' : entry.pctBelow >= 30 ? '#F59E0B' : '#EF4444'} />
                  ))}
                  <LabelList dataKey="pctBelow" position="top" formatter={(v) => `${v}%`} />
                </Bar>
                <ReferenceLine y={avgSuppression} stroke="#8B5CF6" strokeDasharray="5 5" strokeWidth={2} label={{ value: `Avg: ${avgSuppression}%`, fill: "#8B5CF6", fontSize: 11, position: 'right' }} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-4 justify-center text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10B981' }}></div>
                <span>50%+ suppression</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#F59E0B' }}></div>
                <span>30-49%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#EF4444' }}></div>
                <span>&lt;30%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-4 text-white text-center">
              <div className="text-3xl font-bold">69</div>
              <div className="text-purple-100 text-sm">Goals For</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white text-center">
              <div className="text-3xl font-bold">21</div>
              <div className="text-green-100 text-sm">Goals Against</div>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-4 text-white text-center">
              <div className="text-3xl font-bold">{avgSuppression}%</div>
              <div className="text-amber-100 text-sm">Avg Suppression</div>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl p-4 text-white text-center">
              <div className="text-3xl font-bold">1.6</div>
              <div className="text-red-100 text-sm">GA/Game</div>
            </div>
          </div>

          <ScoutsNotes notes={[
            "Talan's defensive awareness complements his offensive game—rarely caught out of position on the rush",
            "Strong stick and active in passing lanes; breaks up plays before they develop",
            "Physical presence deters opponents from high-traffic areas; not afraid to finish checks",
            "Excellent at retrieving pucks and making quick outlet passes to start the transition",
            "His +/- and team's GA when he's on ice support his two-way value (detailed +/- data TBD)"
          ]} />
        </div>
      )}

      {/* Class of 2027 Tab */}
      {activeTab === 'class' && (
        <div className="space-y-6">
          <NarrativeBox title="Class of 2027 Comparison">
            <p>
              Among verified Class of 2027 (Junior) players in the MWHSHL, Talan Millang stands alone as the 
              <strong> only defenseman producing at an elite offensive level</strong>. With 15 points, he trails only 
              forwards Alex Heinkel (20 pts, Dubuque) and Cale Buchan (19 pts, Waterloo) in his graduating class—both 
              of whom are pure offensive players.
            </p>
            <p className="mt-3">
              The gap between Talan and other Junior defensemen is staggering. The next-highest scoring Junior D-man 
              is his own teammate Adam Wey with just 4 points—meaning Talan has <strong>nearly 4x the production</strong> of 
              the next best in his class at his position. This elite offensive output, combined with his size and 
              defensive reliability, makes him a unique prospect in this draft class.
            </p>
          </NarrativeBox>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-5 text-white">
            <h3 className="text-xl font-bold mb-2">🎓 Class of 2027 (Juniors)</h3>
            <p className="text-indigo-100">Verified Junior scoring leaders in the MWHSHL</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Junior Scoring Leaders</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={juniorsOnly} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 25]} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={120} />
                <Tooltip />
                <Bar dataKey="pts" radius={[0, 8, 8, 0]} name="Points">
                  {juniorsOnly.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.isTalan ? COLORS.purple : entry.pos === 'D' ? COLORS.indigo : COLORS.gray} />
                  ))}
                  <LabelList dataKey="pts" position="right" formatter={(v) => `${v} pts`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-4 justify-center text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.purple }}></div>
                <span>Talan Millang (D)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.indigo }}></div>
                <span>Other Defensemen</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.gray }}></div>
                <span>Forwards</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="text-purple-600" size={24} />
                <h4 className="font-semibold text-purple-800">Class of 2027 Highlights</h4>
              </div>
              <ul className="space-y-2 text-sm text-purple-700">
                <li>✓ <strong>#1 scoring D-man</strong> among all Juniors</li>
                <li>✓ <strong>#3 overall</strong> in Junior class scoring</li>
                <li>✓ Only Junior defenseman in top 20 league scorers</li>
                <li>✓ <strong>3.75x more points</strong> than next Junior D-man</li>
              </ul>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Star className="text-indigo-600" size={24} />
                <h4 className="font-semibold text-indigo-800">Physical Profile</h4>
              </div>
              <ul className="space-y-2 text-sm text-indigo-700">
                <li>📏 Height: <strong>6'3"</strong></li>
                <li>⚖️ Weight: <strong>195 lbs</strong></li>
                <li>🎂 DOB: 08/18/2008</li>
                <li>🏫 Valley High School</li>
              </ul>
            </div>
          </div>

          <ScoutsNotes notes={[
            "Prototypical modern NHL defenseman frame at 6'3\" 195—still has room to add muscle",
            "Production at this level as a Junior defenseman is rare; projects well to higher competition",
            "Offensive instincts rival many forwards in his class; can run a power play at any level",
            "On an undefeated team, demonstrating he doesn't sacrifice team defense for personal stats",
            "High-character player; disciplined (2 PIM all season) and accountable in all three zones"
          ]} />
        </div>
      )}

      {/* Highlights Tab */}
      {activeTab === 'highlights' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-xl p-5 text-white">
            <h3 className="text-xl font-bold mb-2">🎬 Highlight Reel</h3>
            <p className="text-red-100">Click to play videos inline. Add YouTube, Vimeo, or Hudl links to showcase Talan's best plays.</p>
          </div>

          {/* Filter Tags */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h4 className="text-sm font-medium text-gray-600 mb-3">Filter by Tag:</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterTag('All')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterTag === 'All' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All ({highlights.length})
              </button>
              {availableTags.map(tag => {
                const count = highlights.filter(h => h.tags && h.tags.includes(tag)).length;
                if (count === 0) return null;
                return (
                  <button
                    key={tag}
                    onClick={() => setFilterTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filterTag === tag 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tag} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add/Edit Highlight Modal */}
          {(showAddHighlight || editingHighlight) && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    {editingHighlight ? 'Edit Highlight' : 'Add New Highlight'}
                  </h3>
                  <button 
                    onClick={() => { 
                      setShowAddHighlight(false); 
                      setEditingHighlight(null);
                      setHighlightTitle('');
                      setHighlightDesc('');
                      setHighlightUrl('');
                      setHighlightTags([]);
                    }} 
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      value={highlightTitle}
                      onChange={(e) => setHighlightTitle(e.target.value)}
                      placeholder="e.g., GWG vs Kansas City"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (YouTube, Vimeo, Hudl)</label>
                    <input
                      type="text"
                      value={highlightUrl}
                      onChange={(e) => setHighlightUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={highlightDesc}
                      onChange={(e) => setHighlightDesc(e.target.value)}
                      placeholder="Brief description of the play..."
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            highlightTags.includes(tag)
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => { 
                        setShowAddHighlight(false); 
                        setEditingHighlight(null);
                        setHighlightTitle('');
                        setHighlightDesc('');
                        setHighlightUrl('');
                        setHighlightTags([]);
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={editingHighlight ? handleSaveEdit : handleAddHighlight}
                      disabled={!highlightTitle.trim()}
                      className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {editingHighlight ? 'Save Changes' : 'Add Highlight'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHighlights.map(clip => {
              const thumbnailUrl = getYouTubeThumbnail(clip.url);
              const embedUrl = getEmbedUrl(clip.url);
              
              return (
              <div key={clip.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div 
                  className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative bg-cover bg-center"
                  style={thumbnailUrl && playingVideo !== clip.id ? { backgroundImage: `url(${thumbnailUrl})` } : {}}
                >
                  {/* Dark overlay for better button visibility when thumbnail is shown */}
                  {thumbnailUrl && playingVideo !== clip.id && (
                    <div className="absolute inset-0 bg-black/30"></div>
                  )}
                  
                  {/* Playing state - show iframe */}
                  {playingVideo === clip.id && clip.url && embedUrl ? (
                    <iframe
                      src={embedUrl}
                      className="w-full h-full absolute inset-0"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={clip.title}
                    />
                  ) : clip.url && embedUrl ? (
                    /* Has embeddable URL - show play button */
                    <div 
                      className="text-center cursor-pointer relative z-[5]" 
                      onClick={() => setPlayingVideo(clip.id)}
                    >
                      <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto hover:bg-red-700 transition-colors shadow-lg">
                        <Play className="text-white ml-1" size={40} fill="white" />
                      </div>
                      <p className="text-white text-sm mt-3 font-medium drop-shadow-lg">Click to play</p>
                    </div>
                  ) : clip.url ? (
                    /* Has URL but not embeddable (YouTube Clips, Hudl, etc) - show external link */
                    <a 
                      href={clip.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-center cursor-pointer hover:scale-105 transition-transform relative z-[5]"
                    >
                      <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto shadow-lg hover:bg-red-700 transition-colors">
                        <Play className="text-white ml-1" size={40} fill="white" />
                      </div>
                      <p className="text-white text-sm mt-3 font-medium drop-shadow-lg">
                        {isYouTubeClip(clip.url) ? 'Watch on YouTube' : 'Open Video'}
                      </p>
                      <p className="text-white/60 text-xs mt-1 drop-shadow">Opens in new tab</p>
                    </a>
                  ) : (
                    /* No URL - show placeholder */
                    <div className="text-center relative z-[5]">
                      <div className="text-6xl mb-2">{clip.thumbnail}</div>
                      <p className="text-white/60 text-xs">No video URL added yet</p>
                    </div>
                  )}
                  
                  {/* Edit Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleEditHighlight(clip); }}
                    className="absolute top-2 right-12 w-8 h-8 bg-blue-500/80 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors z-10"
                  >
                    <Edit3 size={14} />
                  </button>
                  {/* Delete Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteHighlight(clip.id); }}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors z-10"
                  >
                    <X size={16} />
                  </button>
                  {playingVideo === clip.id && (
                    <button 
                      onClick={() => setPlayingVideo(null)}
                      className="absolute top-2 left-2 px-3 py-1 bg-black/70 rounded-full text-white text-xs hover:bg-black/90 transition-colors z-10"
                    >
                      ✕ Close
                    </button>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800">{clip.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{clip.description}</p>
                  {/* Tags Display */}
                  {clip.tags && clip.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {clip.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-400">{clip.date}</span>
                    <div className="flex items-center gap-2">
                      {clip.url && embedUrl && playingVideo !== clip.id && (
                        <button onClick={() => setPlayingVideo(clip.id)} className="text-purple-600 text-sm font-medium flex items-center gap-1 hover:text-purple-800">
                          <Play size={14} /> Play
                        </button>
                      )}
                      {clip.url && !embedUrl && (
                        <a href={clip.url} target="_blank" rel="noopener noreferrer" className="text-red-600 text-sm font-medium flex items-center gap-1 hover:text-red-800">
                          <Play size={14} /> {isYouTubeClip(clip.url) ? 'Watch' : 'Open'}
                        </a>
                      )}
                      {playingVideo === clip.id && (
                        <button onClick={() => setPlayingVideo(null)} className="text-red-600 text-sm font-medium flex items-center gap-1 hover:text-red-800">
                          <X size={14} /> Stop
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
            })}
          </div>

          {filteredHighlights.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No highlights found with tag "{filterTag}"</p>
              <button 
                onClick={() => setFilterTag('All')} 
                className="text-purple-600 font-medium mt-2 hover:underline"
              >
                Show all highlights
              </button>
            </div>
          )}

          <button 
            onClick={() => setShowAddHighlight(true)}
            className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 hover:bg-purple-50/50 transition-all cursor-pointer"
          >
            <Plus className="mx-auto text-gray-400 mb-3" size={48} />
            <h4 className="font-semibold text-gray-600">Add New Highlight</h4>
            <p className="text-sm text-gray-400 mt-1">Click to add a video (YouTube, Vimeo, Hudl)</p>
          </button>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <Video className="text-blue-600" size={20} />
              Supported Video Platforms
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-blue-700">
              <div className="bg-white rounded-lg p-2 text-center">📺 YouTube</div>
              <div className="bg-white rounded-lg p-2 text-center">🎬 Vimeo</div>
              <div className="bg-white rounded-lg p-2 text-center">🏒 Hudl</div>
              <div className="bg-white rounded-lg p-2 text-center">🎥 LiveBarn</div>
            </div>
            <p className="text-xs text-blue-600 mt-3">Videos will play directly in the dashboard. Just paste the share link!</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-gray-400 text-sm">
        <p>Talan Millang #11 • Des Moines Capitals • 2025-26 Season Analytics</p>
        <p className="mt-1">Data verified from MWHSHL player profiles • TalanShowcase.com</p>
      </div>
    </div>
  );
}
