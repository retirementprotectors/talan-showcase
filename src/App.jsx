import React, { useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ReferenceLine, LabelList } from 'recharts';
import { TrendingUp, Target, Award, Trophy, Users, Star, Shield, Play, Video, X, FileText, Eye } from 'lucide-react';

// ============================================
// TALAN'S GAME DATA - 2025-26 SEASON
// ============================================
// Complete game-by-game data - all 32 regular season games
const gameData = [
  { date: '10/24', month: 'Oct', opponent: 'at Cedar Rapids', result: 'W 8-0', goals: 0, assists: 1, pts: 1, pim: 0, gw: 0, capsScore: 8, oppScore: 0 },
  { date: '10/31', month: 'Oct', opponent: 'Ames', result: 'W 4-2', goals: 0, assists: 1, pts: 1, pim: 0, gw: 0, capsScore: 4, oppScore: 2 },
  { date: '11/01', month: 'Nov', opponent: 'Cedar Rapids', result: 'W 3-2', goals: 0, assists: 1, pts: 1, pim: 0, gw: 0, capsScore: 3, oppScore: 2 },
  { date: '11/07', month: 'Nov', opponent: 'Mason City', result: 'W 2-1', goals: 1, assists: 0, pts: 1, pim: 0, gw: 0, capsScore: 2, oppScore: 1 },
  { date: '11/08', month: 'Nov', opponent: 'Omaha', result: 'W 6-5', goals: 0, assists: 0, pts: 0, pim: 0, gw: 0, capsScore: 6, oppScore: 5 },
  { date: '11/09', month: 'Nov', opponent: 'Omaha', result: 'W 5-2', goals: 0, assists: 2, pts: 2, pim: 0, gw: 0, capsScore: 5, oppScore: 2 },
  { date: '11/15', month: 'Nov', opponent: 'Boji', result: 'W 10-0', goals: 0, assists: 0, pts: 0, pim: 0, gw: 0, capsScore: 10, oppScore: 0 },
  { date: '11/16', month: 'Nov', opponent: 'Boji', result: 'W 3-0', goals: 0, assists: 1, pts: 1, pim: 0, gw: 0, capsScore: 3, oppScore: 0 },
  { date: '11/22', month: 'Nov', opponent: 'at Fremont', result: 'W 8-1', goals: 0, assists: 2, pts: 2, pim: 0, gw: 0, capsScore: 8, oppScore: 1 },
  { date: '11/23', month: 'Nov', opponent: 'at Fremont', result: 'W 6-2', goals: 0, assists: 2, pts: 2, pim: 0, gw: 0, capsScore: 6, oppScore: 2 },
  { date: '11/25', month: 'Nov', opponent: 'DM Oak Leafs', result: 'W 5-2', goals: 0, assists: 0, pts: 0, pim: 0, gw: 0, capsScore: 5, oppScore: 2 },
  { date: '12/06', month: 'Dec', opponent: 'Kansas City', result: 'W 6-2', goals: 1, assists: 2, pts: 3, pim: 2, gw: 1, capsScore: 6, oppScore: 2 },
  { date: '12/07', month: 'Dec', opponent: 'Kansas City', result: 'W 3-2', goals: 0, assists: 1, pts: 1, pim: 0, gw: 0, capsScore: 3, oppScore: 2 },
  { date: '12/13', month: 'Dec', opponent: 'at Sioux City', result: 'W 6-0', goals: 1, assists: 1, pts: 2, pim: 0, gw: 0, capsScore: 6, oppScore: 0 },
  { date: '12/14', month: 'Dec', opponent: 'at Sioux City', result: 'W 3-1', goals: 0, assists: 0, pts: 0, pim: 2, gw: 0, capsScore: 3, oppScore: 1 },
  { date: '12/19', month: 'Dec', opponent: 'at Cedar Rapids', result: 'W 6-0', goals: 0, assists: 1, pts: 1, pim: 0, gw: 0, capsScore: 6, oppScore: 0 },
  { date: '12/20', month: 'Dec', opponent: 'Quad City', result: 'W 7-1', goals: 0, assists: 1, pts: 1, pim: 0, gw: 0, capsScore: 7, oppScore: 1 },
  { date: '12/21', month: 'Dec', opponent: 'Quad City', result: 'W 9-1', goals: 0, assists: 0, pts: 0, pim: 0, gw: 0, capsScore: 9, oppScore: 1 },
  { date: '01/03', month: 'Jan', opponent: 'at Ames', result: 'W 3-2', goals: 0, assists: 0, pts: 0, pim: 0, gw: 0, capsScore: 3, oppScore: 2 },
  { date: '01/09', month: 'Jan', opponent: 'Ames', result: 'L 2-5', goals: 0, assists: 0, pts: 0, pim: 0, gw: 0, capsScore: 2, oppScore: 5 },
  { date: '01/13', month: 'Jan', opponent: 'at DM Oak Leafs', result: 'W 2-1', goals: 0, assists: 1, pts: 1, pim: 2, gw: 0, capsScore: 2, oppScore: 1 },
  { date: '01/24', month: 'Jan', opponent: 'at Mason City', result: 'W 8-2', goals: 0, assists: 0, pts: 0, pim: 0, gw: 0, capsScore: 8, oppScore: 2 },
  { date: '01/25', month: 'Jan', opponent: 'at Mason City', result: 'W 2-0', goals: 0, assists: 0, pts: 0, pim: 0, gw: 0, capsScore: 2, oppScore: 0 },
  { date: '01/30', month: 'Jan', opponent: 'at Quad City', result: 'W 9-0', goals: 0, assists: 2, pts: 2, pim: 0, gw: 0, capsScore: 9, oppScore: 0 },
  { date: '01/31', month: 'Jan', opponent: 'at Dubuque', result: 'L 1-2', goals: 0, assists: 1, pts: 1, pim: 2, gw: 0, capsScore: 1, oppScore: 2 },
  { date: '02/01', month: 'Feb', opponent: 'at Waterloo', result: 'W 9-2', goals: 0, assists: 0, pts: 0, pim: 0, gw: 0, capsScore: 9, oppScore: 2 },
  { date: '02/07', month: 'Feb', opponent: 'Dubuque', result: 'W 4-1', goals: 0, assists: 0, pts: 0, pim: 0, gw: 0, capsScore: 4, oppScore: 1 },
  { date: '02/08', month: 'Feb', opponent: 'Dubuque', result: 'W 2-0', goals: 0, assists: 0, pts: 0, pim: 4, gw: 0, capsScore: 2, oppScore: 0 },
  { date: '02/14', month: 'Feb', opponent: 'at Lincoln', result: 'W 5-1', goals: 0, assists: 0, pts: 0, pim: 0, gw: 0, capsScore: 5, oppScore: 1 },
  { date: '02/15', month: 'Feb', opponent: 'at Lincoln', result: 'W 4-2', goals: 0, assists: 1, pts: 1, pim: 0, gw: 0, capsScore: 4, oppScore: 2 },
  { date: '02/19', month: 'Feb', opponent: 'at Waterloo', result: 'W 5-4', goals: 0, assists: 1, pts: 1, pim: 0, gw: 0, capsScore: 5, oppScore: 4 },
  { date: '02/20', month: 'Feb', opponent: 'Waterloo', result: 'W 8-0', goals: 1, assists: 1, pts: 2, pim: 2, gw: 0, capsScore: 8, oppScore: 0 },
];

// ============================================
// LEAGUE LEADERS - FINAL 2025-26 SEASON
// ============================================
const leagueLeaders = [
  { rank: 1, name: 'Aiden Paulsen', team: 'AMES', pos: 'F', gp: 31, goals: 39, assists: 31, pts: 70, gradYear: 2027, class: 'Jr' },
  { rank: 2, name: 'Cade Weiner', team: 'DBQ', pos: 'F', gp: 32, goals: 28, assists: 37, pts: 65, gradYear: 2028, class: 'So' },
  { rank: 3, name: 'Gavin Elliott', team: 'OAKS', pos: 'F', gp: 26, goals: 33, assists: 30, pts: 63, gradYear: 2026, class: 'Sr' },
  { rank: 4, name: 'Logan Caldwell', team: 'WAT', pos: 'F', gp: 31, goals: 35, assists: 28, pts: 63, gradYear: 2026, class: 'Sr' },
  { rank: 5, name: 'Cole Crawford', team: 'AMES', pos: 'D', gp: 32, goals: 22, assists: 40, pts: 62, gradYear: 2028, class: 'So', highlight: true },
  { rank: 6, name: 'Cale Buchan', team: 'WAT', pos: 'F', gp: 31, goals: 30, assists: 26, pts: 56, gradYear: 2027, class: 'Jr' },
  { rank: 7, name: 'Maxx Myers', team: 'CAP', pos: 'F', gp: 32, goals: 23, assists: 26, pts: 49, gradYear: 2026, class: 'Sr' },
  { rank: 8, name: 'Jarrett Parker', team: 'CAP', pos: 'F', gp: 27, goals: 29, assists: 19, pts: 48, gradYear: 2026, class: 'Sr' },
  { rank: 9, name: 'Owen Campbell', team: 'OAKS', pos: 'F', gp: 32, goals: 20, assists: 27, pts: 47, gradYear: 2026, class: 'Sr' },
  { rank: 10, name: 'Anderson Schiesl', team: 'OAKS', pos: 'F', gp: 30, goals: 25, assists: 21, pts: 46, gradYear: 2026, class: 'Sr' },
  { rank: 11, name: 'Xander Sheehy', team: 'DBQ', pos: 'F', gp: 31, goals: 15, assists: 28, pts: 43, gradYear: 2026, class: 'Sr' },
  { rank: 12, name: 'Sammy Ruiz', team: 'DBQ', pos: 'F', gp: 32, goals: 17, assists: 26, pts: 43, gradYear: 2026, class: 'Sr' },
  { rank: 13, name: 'Lane Wittrock', team: 'KC', pos: 'F', gp: 31, goals: 18, assists: 24, pts: 42, gradYear: 2026, class: 'Sr' },
  { rank: 14, name: 'Vincent Kutler', team: 'OJL', pos: 'F', gp: 32, goals: 20, assists: 22, pts: 42, gradYear: 2027, class: 'Jr' },
  { rank: 15, name: 'Gage Behrens', team: 'CAP', pos: 'F', gp: 31, goals: 28, assists: 13, pts: 41, gradYear: 2026, class: 'Sr' },
  { rank: 16, name: 'Gavin Montiel-Cline', team: 'FRE', pos: 'F', gp: 23, goals: 27, assists: 11, pts: 38, gradYear: 2026, class: 'Sr' },
  { rank: 17, name: 'Michael Grant', team: 'OAKS', pos: 'F', gp: 32, goals: 17, assists: 21, pts: 38, gradYear: 2026, class: 'Sr' },
  { rank: 18, name: 'Brody Lee', team: 'KC', pos: 'F', gp: 30, goals: 19, assists: 18, pts: 37, gradYear: 2026, class: 'Sr' },
  { rank: 19, name: 'JJ Hope', team: 'SC', pos: 'D', gp: 28, goals: 19, assists: 18, pts: 37, gradYear: 2027, class: 'Jr' },
  { rank: 20, name: 'Magnus Crinklaw', team: 'OJL', pos: 'F', gp: 29, goals: 19, assists: 17, pts: 36, gradYear: 2026, class: 'Sr' },
  { rank: 21, name: 'Isaac Flory', team: 'AMES', pos: 'F', gp: 32, goals: 19, assists: 17, pts: 36, gradYear: 2026, class: 'Sr' },
  { rank: 22, name: 'Alex Heinkel', team: 'DBQ', pos: 'F', gp: 31, goals: 19, assists: 17, pts: 36, gradYear: 2027, class: 'Jr' },
  { rank: 23, name: 'Kolby Beltz', team: 'CR', pos: 'F', gp: 31, goals: 21, assists: 15, pts: 36, gradYear: 2026, class: 'Sr' },
  { rank: 24, name: 'Cole Eckland', team: 'KC', pos: 'F', gp: 30, goals: 8, assists: 27, pts: 35, gradYear: 2026, class: 'Sr' },
  { rank: 25, name: 'Jagger Raisty', team: 'WAT', pos: 'F', gp: 32, goals: 15, assists: 20, pts: 35, gradYear: 2026, class: 'Sr' },
  { rank: 26, name: 'Paxon Sacre', team: 'CAP', pos: 'F', gp: 27, goals: 16, assists: 19, pts: 35, gradYear: 2026, class: 'Sr' },
  { rank: 27, name: 'Ryder Borrett', team: 'AMES', pos: 'F', gp: 32, goals: 14, assists: 19, pts: 33, gradYear: 2029, class: 'Fr' },
  { rank: 28, name: 'Luke Logsdon', team: 'CAP', pos: 'F', gp: 32, goals: 16, assists: 17, pts: 33, gradYear: 2027, class: 'Jr' },
  { rank: 29, name: 'Jensen Hill', team: 'DBQ', pos: 'F', gp: 31, goals: 16, assists: 16, pts: 32, gradYear: 2026, class: 'Sr' },
  { rank: 30, name: 'Logan Walsh', team: 'OJL', pos: 'F', gp: 31, goals: 18, assists: 14, pts: 32, gradYear: 2026, class: 'Sr' },
  { rank: 31, name: 'Kobe Powers', team: 'FRE', pos: 'F', gp: 25, goals: 19, assists: 13, pts: 32, gradYear: 2028, class: 'So' },
  { rank: 32, name: 'Max Gladson', team: 'OAKS', pos: 'D', gp: 32, goals: 6, assists: 25, pts: 31, gradYear: 2027, class: 'Jr' },
  { rank: 33, name: 'Ethan Holschlag', team: 'OAKS', pos: 'D', gp: 32, goals: 7, assists: 24, pts: 31, gradYear: 2026, class: 'Sr' },
  { rank: 34, name: 'Grady Christensen', team: 'CAP', pos: 'F', gp: 32, goals: 13, assists: 18, pts: 31, gradYear: 2027, class: 'Jr' },
  { rank: 35, name: 'Jax Trosper', team: 'SC', pos: 'F', gp: 26, goals: 15, assists: 15, pts: 30, gradYear: 2026, class: 'Sr' },
  { rank: 36, name: 'Mason Harn', team: 'WAT', pos: 'D', gp: 31, goals: 4, assists: 25, pts: 29, gradYear: 2026, class: 'Sr' },
  { rank: 37, name: 'Talan Millang', team: 'CAP', pos: 'D', gp: 32, goals: 4, assists: 23, pts: 27, gradYear: 2027, class: 'Jr', isTalan: true },
];

// All confirmed defensemen - end of season (league-wide top D-men + Caps D-men)
const allDefensemen = [
  { name: 'Cole Crawford', team: 'AMES', gp: 32, goals: 22, assists: 40, pts: 62, ppg: 1.94, gradYear: 2028, class: 'Sophomore' },
  { name: 'JJ Hope', team: 'SC', gp: 28, goals: 19, assists: 18, pts: 37, ppg: 1.32, gradYear: 2027, class: 'Junior' },
  { name: 'Max Gladson', team: 'OAKS', gp: 32, goals: 6, assists: 25, pts: 31, ppg: 0.97, gradYear: 2027, class: 'Junior' },
  { name: 'Ethan Holschlag', team: 'OAKS', gp: 32, goals: 7, assists: 24, pts: 31, ppg: 0.97, gradYear: 2026, class: 'Senior' },
  { name: 'Mason Harn', team: 'WAT', gp: 31, goals: 4, assists: 25, pts: 29, ppg: 0.94, gradYear: 2026, class: 'Senior' },
  { name: 'Talan Millang', team: 'CAP', gp: 32, goals: 4, assists: 23, pts: 27, ppg: 0.84, gradYear: 2027, class: 'Junior', isTalan: true },
  { name: 'Demetri Tsiobanos', team: 'SC', gp: 30, goals: 7, assists: 16, pts: 23, ppg: 0.77, gradYear: 2027, class: 'Junior' },
  { name: 'Grady Stiles', team: 'CAP', gp: 32, goals: 4, assists: 14, pts: 18, ppg: 0.56, gradYear: 2026, class: 'Senior' },
];

// Class of 2027 (Juniors) - confirmed via sportngin roster pages
const juniorsOnly = [
  { name: 'Aiden Paulsen', team: 'AMES', pos: 'F', gp: 31, goals: 39, assists: 31, pts: 70 },
  { name: 'Cale Buchan', team: 'WAT', pos: 'F', gp: 31, goals: 30, assists: 26, pts: 56 },
  { name: 'Vincent Kutler', team: 'OJL', pos: 'F', gp: 32, goals: 20, assists: 22, pts: 42 },
  { name: 'JJ Hope', team: 'SC', pos: 'D', gp: 28, goals: 19, assists: 18, pts: 37 },
  { name: 'Alex Heinkel', team: 'DBQ', pos: 'F', gp: 31, goals: 19, assists: 17, pts: 36 },
  { name: 'Luke Logsdon', team: 'CAP', pos: 'F', gp: 32, goals: 16, assists: 17, pts: 33 },
  { name: 'Max Gladson', team: 'OAKS', pos: 'D', gp: 32, goals: 6, assists: 25, pts: 31 },
  { name: 'Grady Christensen', team: 'CAP', pos: 'F', gp: 32, goals: 13, assists: 18, pts: 31 },
  { name: 'Talan Millang', team: 'CAP', pos: 'D', gp: 32, goals: 4, assists: 23, pts: 27, isTalan: true },
  { name: 'Demetri Tsiobanos', team: 'SC', pos: 'D', gp: 30, goals: 7, assists: 16, pts: 23 },
];

// Opponent scoring data - full season (from standings + schedule)
const opponentScoringData = [
  { team: 'Boji', avgGoalsScored: 1.16, goalsVsCaps: 0.0, gamesVsCaps: 2, pctBelow: 100 },
  { team: 'Sioux City', avgGoalsScored: 2.50, goalsVsCaps: 0.5, gamesVsCaps: 2, pctBelow: 80 },
  { team: 'Cedar Rapids', avgGoalsScored: 2.97, goalsVsCaps: 0.67, gamesVsCaps: 3, pctBelow: 77 },
  { team: 'Dubuque', avgGoalsScored: 3.91, goalsVsCaps: 1.0, gamesVsCaps: 3, pctBelow: 74 },
  { team: 'Quad City', avgGoalsScored: 2.38, goalsVsCaps: 0.67, gamesVsCaps: 3, pctBelow: 72 },
  { team: 'DM Oak Leafs', avgGoalsScored: 4.78, goalsVsCaps: 1.5, gamesVsCaps: 2, pctBelow: 69 },
  { team: 'Mason City', avgGoalsScored: 2.13, goalsVsCaps: 1.0, gamesVsCaps: 3, pctBelow: 53 },
  { team: 'Waterloo', avgGoalsScored: 4.13, goalsVsCaps: 2.0, gamesVsCaps: 3, pctBelow: 52 },
  { team: 'Lincoln', avgGoalsScored: 2.81, goalsVsCaps: 1.5, gamesVsCaps: 2, pctBelow: 47 },
  { team: 'Fremont', avgGoalsScored: 2.59, goalsVsCaps: 1.5, gamesVsCaps: 2, pctBelow: 42 },
  { team: 'Kansas City', avgGoalsScored: 3.25, goalsVsCaps: 2.0, gamesVsCaps: 2, pctBelow: 38 },
  { team: 'Ames', avgGoalsScored: 3.78, goalsVsCaps: 3.0, gamesVsCaps: 3, pctBelow: 21 },
  { team: 'Omaha', avgGoalsScored: 3.53, goalsVsCaps: 3.5, gamesVsCaps: 2, pctBelow: 1 },
];

const avgSuppression = Math.round(opponentScoringData.reduce((sum, t) => sum + t.pctBelow, 0) / opponentScoringData.length);

// ============================================
// TALAN'S BIO - FINAL 2025-26 SEASON
// ============================================
const talanStats = {
  gp: 32, goals: 4, assists: 23, pts: 27, ppg: 0.84, pim: 14, gw: 1,
  height: "6'3\"", weight: 200, position: 'D', number: 11, gradYear: 2027
};

// Monthly breakdown data
const monthlyData = [
  { month: 'October', games: 2, goals: 0, assists: 2, pts: 2, ppg: 1.00 },
  { month: 'November', games: 9, goals: 1, assists: 8, pts: 9, ppg: 1.00 },
  { month: 'December', games: 7, goals: 2, assists: 6, pts: 8, ppg: 1.14 },
  { month: 'January', games: 6, goals: 0, assists: 4, pts: 4, ppg: 0.67 },
  { month: 'February', games: 8, goals: 1, assists: 3, pts: 4, ppg: 0.50 },
];

// Season split data
const seasonSplitData = [
  { split: 'First Half (Oct-Dec)', gp: 18, goals: 3, assists: 16, pts: 19, ppg: 1.06, pim: 4 },
  { split: 'Second Half (Jan-Feb)', gp: 14, goals: 1, assists: 7, pts: 8, ppg: 0.57, pim: 10 },
  { split: 'Full Season', gp: 32, goals: 4, assists: 23, pts: 27, ppg: 0.84, pim: 14 },
];

// Calculate cumulative stats from tracked games
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

// Rankings
const talanPtsRankAll = 37; // Actual league rank out of 338 skaters
const talanAssistsRankAll = 16;
const talanAssistsRankD = 5; // Crawford (40), Gladson (25), Harn (25), Holschlag (24), Talan (23)
const talanPtsRankD = 6; // Crawford (62), Hope (37), Gladson (31), Holschlag (31), Harn (29), Talan (27)
const talanPtsRankClass27 = 9; // Paulsen, Buchan, Kutler, Hope, Heinkel, Logsdon, Gladson, Christensen, Talan
const talanPtsRankClass27D = 3; // Hope (37), Gladson (31), Talan (27)

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
  const cleanUrl = url.trim();
  const vParam = cleanUrl.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (vParam && vParam[1]) return vParam[1];
  const shortLink = cleanUrl.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortLink && shortLink[1]) return shortLink[1].split(/[?&]/)[0];
  const embedUrl = cleanUrl.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  if (embedUrl && embedUrl[1]) return embedUrl[1].split(/[?&]/)[0];
  const shortsUrl = cleanUrl.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsUrl && shortsUrl[1]) return shortsUrl[1].split(/[?&]/)[0];
  const liveUrl = cleanUrl.match(/youtube\.com\/live\/([a-zA-Z0-9_-]+)/);
  if (liveUrl && liveUrl[1]) return liveUrl[1].split(/[?&]/)[0];
  const oldFormat = cleanUrl.match(/youtube\.com\/v\/([a-zA-Z0-9_-]+)/);
  if (oldFormat && oldFormat[1]) return oldFormat[1].split(/[?&]/)[0];
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) return cleanUrl;
  return null;
};

// Helper to convert video URLs to embed URLs
const getEmbedUrl = (url) => {
  if (!url || typeof url !== 'string' || !url.trim()) return null;
  const clipId = getYouTubeClipId(url);
  if (clipId) return null;
  const ytId = getYouTubeId(url);
  if (ytId) {
    const timeMatch = url.match(/[?&]t=(\d+)s?/);
    const startTime = timeMatch ? timeMatch[1] : null;
    return `https://www.youtube.com/embed/${ytId}?rel=0${startTime ? `&start=${startTime}` : ''}`;
  }
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  if (url.includes('hudl.com')) return null;
  return null;
};

const isYouTubeClip = (url) => {
  return getYouTubeClipId(url) !== null;
};

const getYouTubeThumbnail = (url) => {
  const ytId = getYouTubeId(url);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
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

// Talan's actual highlights - using timestamp URLs that work on all devices
const defaultHighlights = [
  {
    id: 1,
    title: '12/7/25 - Capitals v Jets',
    description: 'Strong defensive play with physicality',
    thumbnail: '',
    date: '12/07/2025',
    url: 'https://www.youtube.com/watch?v=1TFwT-PVpcw&t=3740s',
    tags: ['Defensive Play', 'Hit', 'Breakout']
  },
  {
    id: 2,
    title: '12/7/25 - Capitals v Jets',
    description: 'Smooth skating and breakout pass',
    thumbnail: '',
    date: '12/07/2025',
    url: 'https://www.youtube.com/watch?v=1TFwT-PVpcw&t=4278s',
    tags: ['Defensive Play', 'Skating', 'Strength', 'Breakout']
  },
  {
    id: 3,
    title: '12/7/25 - Capitals v Jets',
    description: 'Physical play and zone defense',
    thumbnail: '',
    date: '12/07/2025',
    url: 'https://www.youtube.com/watch?v=1TFwT-PVpcw&t=4881s',
    tags: ['Defensive Play', 'Strength']
  },
  {
    id: 4,
    title: '12/7/25 - Capitals v Jets',
    description: 'Solid positioning and puck retrieval',
    thumbnail: '',
    date: '12/07/2025',
    url: 'https://www.youtube.com/watch?v=1TFwT-PVpcw&t=6915s',
    tags: ['Defensive Play', 'Strength', 'Breakout']
  },
  {
    id: 5,
    title: '12/7/25 - Capitals v Jets',
    description: 'Big hit and zone clearance',
    thumbnail: '',
    date: '12/07/2025',
    url: 'https://www.youtube.com/watch?v=1TFwT-PVpcw&t=3741s',
    tags: ['Defensive Play', 'Hit', 'Strength']
  },
];

const availableTags = [
  'Goal', 'Assist', 'GWG', 'Penalty Kill', 'Power Play',
  'Defensive Play', 'Skating', 'Shot', 'Pass', 'Hit',
  'Block', 'Multi-Point', 'Strength', 'Breakout'
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [playingVideo, setPlayingVideo] = useState(null);
  const [filterTag, setFilterTag] = useState('All');

  const highlights = defaultHighlights;

  const openVideo = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Target size={16} /> },
    { id: 'results', label: 'Season Results', icon: <Trophy size={16} /> },
    { id: 'rankings', label: 'League Rankings', icon: <TrendingUp size={16} /> },
    { id: 'opponents', label: 'Opponent Impact', icon: <Shield size={16} /> },
    { id: 'class', label: 'Class of 2027', icon: <Users size={16} /> },
    { id: 'highlights', label: 'Highlights', icon: <Video size={16} /> },
  ];

  const filteredHighlights = filterTag === 'All'
    ? highlights
    : highlights.filter(h => h.tags && h.tags.includes(filterTag));

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
            <span className="text-amber-500 mt-1">&bull;</span>
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
                <p className="text-purple-200">Defenseman &bull; Des Moines Capitals &bull; Class of 2027</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4 text-sm flex-wrap">
              <span className="bg-white/20 px-3 py-1 rounded-full">Valley HS</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">{talanStats.height}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">{talanStats.weight} lbs</span>
              <span className="bg-green-500/30 px-3 py-1 rounded-full font-semibold">30-1-1 Record</span>
              <span className="bg-yellow-500/40 px-3 py-1 rounded-full font-semibold">First-Team All-Star</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold">{talanStats.pts}</div>
            <div className="text-purple-200">Total Points</div>
            <div className="text-sm mt-2 bg-white/20 px-3 py-1 rounded-full inline-block">
              {talanStats.gp} GP &bull; {talanStats.ppg} PPG
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
              Talan Millang finished the 2025-26 MWHSHL season as one of the most productive defensemen in the league,
              earning <strong>MWHSHL Varsity First-Team All-Star</strong> honors at defense. The 6'3" 200-pound
              junior anchored the blue line for a <strong>30-1-1 Des Moines Capitals</strong> squad coached by Tony Weil,
              who was named Coach of the Year. Through 32 games, Talan recorded <strong>27 points (4G, 23A)</strong>, ranking
              him <strong>#6 among all defensemen</strong> league-wide, <strong>#3 among Class of 2027 D-men</strong>,
              and <strong>#16 in assists out of all 338 skaters</strong> in the league.
            </p>
            <p className="mt-3">
              His 23 assists from the blue line demonstrate elite playmaking ability and vision that translates to any level.
              Combined with his physical frame and defensive reliability, Talan projects as a prototypical modern offensive
              defenseman—a two-way threat who can quarterback a power play while shutting down opponents in his own zone.
            </p>
          </NarrativeBox>

          {/* Awards Banner */}
          <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Award size={28} />
                <div>
                  <div className="text-xl font-bold">MWHSHL Varsity First-Team All-Star</div>
                  <div className="text-yellow-100">Defense &bull; 2025-26 Season</div>
                </div>
              </div>
              <div className="ml-auto text-right text-sm text-yellow-100">
                <div>Coach Tony Weil — Coach of the Year</div>
                <div>Jackson Fleming — All-League Goaltender</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Points" value={talanStats.pts} subtitle={`#${talanPtsRankAll} of 338 skaters`} icon={<Star className="text-yellow-500" size={20} />} highlight />
            <StatCard label="Goals" value={talanStats.goals} subtitle="32 games played" icon={<Target className="text-red-500" size={20} />} />
            <StatCard label="Assists" value={talanStats.assists} subtitle="#16 in league (338 skaters)" icon={<TrendingUp className="text-green-500" size={20} />} />
            <StatCard label="GWG" value={talanStats.gw} subtitle="Game Winners" icon={<Trophy className="text-amber-500" size={20} />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Cumulative Points Growth</h3>
              <p className="text-xs text-gray-400 mb-4">All 32 regular season games</p>
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
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Points Breakdown by Game</h3>
              <p className="text-xs text-gray-400 mb-4">All 32 regular season games</p>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={gameData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="opponent" tick={{ fontSize: 8 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="goals" stackId="pts" fill="#EF4444" name="Goals" />
                  <Bar dataKey="assists" stackId="pts" fill="#8B5CF6" name="Assists" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <ScoutsNotes notes={[
            "Elite size (6'3\" 200 lbs) with smooth skating ability and excellent gap control",
            "High hockey IQ\u2014consistently makes the right read on breakouts and zone entries",
            "23 assists from the blue line demonstrate vision and passing ability that sets him apart from peers",
            "Poised under pressure with the puck; rarely forces plays or turns it over",
            "First-Team All-Star selection validates his impact as a two-way defenseman at this level"
          ]} />
        </div>
      )}

      {/* Season Results Tab */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          <NarrativeBox title="Final Season Analysis">
            <p>
              Talan Millang's junior season with the Des Moines Capitals was a resounding success, capped by a
              <strong> MWHSHL Varsity First-Team All-Star</strong> selection at defense. His final line
              of <strong>27 points (4G, 23A) in 32 games</strong> placed him among the league's elite defensemen,
              finishing <strong>#6 overall among all D-men</strong>. Among Class of 2027 defensemen, he ranked
              <strong>#3</strong> behind JJ Hope (37 pts, SC) and Max Gladson (31 pts, OAKS).
            </p>
            <p className="mt-3">
              The season showed two distinct halves: an explosive first 13 games at 1.15 PPG, followed by a more
              physically demanding stretch against tougher competition. The full body of work earned him First-Team
              All-Star recognition—a testament to his consistency and two-way impact over the entire season.
            </p>
          </NarrativeBox>

          {/* Final Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-5 text-white text-center">
              <div className="text-purple-200 text-sm font-medium mb-1">Games Played</div>
              <div className="text-4xl font-bold">32</div>
              <div className="text-purple-100 text-sm mt-1">Full Season</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white text-center">
              <div className="text-green-200 text-sm font-medium mb-1">Total Points</div>
              <div className="text-4xl font-bold">27</div>
              <div className="text-green-100 text-sm mt-1">4G + 23A</div>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-5 text-white text-center">
              <div className="text-amber-200 text-sm font-medium mb-1">Points/Game</div>
              <div className="text-4xl font-bold">0.84</div>
              <div className="text-amber-100 text-sm mt-1">Season Average</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-5 text-white text-center">
              <div className="text-yellow-200 text-sm font-medium mb-1">Award</div>
              <div className="text-2xl font-bold leading-tight">First-Team All-Star</div>
              <div className="text-yellow-100 text-sm mt-1">Defense</div>
            </div>
          </div>

          {/* Season Splits */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Season Splits</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 text-gray-500">Split</th>
                    <th className="text-center py-2 px-3 text-gray-500">GP</th>
                    <th className="text-center py-2 px-3 text-gray-500">G</th>
                    <th className="text-center py-2 px-3 text-gray-500">A</th>
                    <th className="text-center py-2 px-3 text-gray-500 font-bold">PTS</th>
                    <th className="text-center py-2 px-3 text-gray-500">PPG</th>
                    <th className="text-center py-2 px-3 text-gray-500">PIM</th>
                  </tr>
                </thead>
                <tbody>
                  {seasonSplitData.map((row, idx) => (
                    <tr key={idx} className={`border-b border-gray-100 ${idx === 2 ? 'bg-purple-50 font-semibold' : ''}`}>
                      <td className="py-3 px-3 font-medium">{row.split}</td>
                      <td className="text-center py-3 px-3">{row.gp}</td>
                      <td className="text-center py-3 px-3">{row.goals}</td>
                      <td className="text-center py-3 px-3">{row.assists}</td>
                      <td className="text-center py-3 px-3 font-bold">{row.pts}</td>
                      <td className="text-center py-3 px-3">{row.ppg.toFixed(2)}</td>
                      <td className="text-center py-3 px-3">{row.pim}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monthly PPG Chart */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Points Per Game</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 1.5]} />
                <Tooltip />
                <Bar dataKey="ppg" fill="#8B5CF6" radius={[8, 8, 0, 0]} name="PPG">
                  <LabelList dataKey="ppg" position="top" formatter={(v) => v.toFixed(2)} />
                </Bar>
                <ReferenceLine y={0.84} stroke="#10B981" strokeDasharray="5 5" label={{ value: "Season Avg: 0.84", fill: "#10B981", fontSize: 10 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Split Comparison Chart */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Production by Season Half</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={seasonSplitData.slice(0, 2)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="split" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="goals" fill="#EF4444" name="Goals" radius={[4, 4, 0, 0]} />
                <Bar dataKey="assists" fill="#8B5CF6" name="Assists" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Milestones Achieved */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-5 text-white">
            <h3 className="text-xl font-bold mb-4">Season Milestones</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">20 PTS</div>
                <div className="text-green-300 text-sm font-semibold">Reached</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">25 PTS</div>
                <div className="text-green-300 text-sm font-semibold">Reached</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">27 PTS</div>
                <div className="text-yellow-300 text-sm font-semibold">Final Total</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">All-Star</div>
                <div className="text-yellow-300 text-sm font-semibold">First-Team</div>
              </div>
            </div>
          </div>

          {/* Caps Scoring Leaders */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Capitals Scoring Leaders (Final)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-2 text-gray-500">Player</th>
                    <th className="text-center py-2 px-2 text-gray-500">Pos</th>
                    <th className="text-center py-2 px-2 text-gray-500">GP</th>
                    <th className="text-center py-2 px-2 text-gray-500">G</th>
                    <th className="text-center py-2 px-2 text-gray-500">A</th>
                    <th className="text-center py-2 px-2 text-gray-500 font-bold">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Maxx Myers', pos: 'F', gp: 32, g: 23, a: 26, pts: 49 },
                    { name: 'Jarrett Parker', pos: 'F', gp: 27, g: 29, a: 19, pts: 48 },
                    { name: 'Gage Behrens', pos: 'F', gp: 31, g: 28, a: 13, pts: 41 },
                    { name: 'Paxon Sacre', pos: 'F', gp: 27, g: 16, a: 19, pts: 35 },
                    { name: 'Luke Logsdon', pos: 'F', gp: 32, g: 16, a: 17, pts: 33 },
                    { name: 'Grady Christensen', pos: 'F', gp: 32, g: 13, a: 18, pts: 31 },
                    { name: 'Talan Millang', pos: 'D', gp: 32, g: 4, a: 23, pts: 27, isTalan: true },
                    { name: 'Grady Stiles', pos: 'D', gp: 32, g: 4, a: 14, pts: 18 },
                    { name: 'Ryan Logan', pos: 'F', gp: 32, g: 7, a: 9, pts: 16 },
                  ].map((p, idx) => (
                    <tr key={idx} className={`border-b border-gray-100 ${p.isTalan ? 'bg-purple-100 font-semibold' : ''}`}>
                      <td className="py-2 px-2">{p.name} {p.isTalan && '\u2B50'}</td>
                      <td className="text-center py-2 px-2">
                        <span className={`px-2 py-0.5 rounded text-xs ${p.pos === 'D' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
                          {p.pos}
                        </span>
                      </td>
                      <td className="text-center py-2 px-2">{p.gp}</td>
                      <td className="text-center py-2 px-2">{p.g}</td>
                      <td className="text-center py-2 px-2">{p.a}</td>
                      <td className="text-center py-2 px-2 font-bold">{p.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-purple-50 rounded-lg text-center">
              <span className="text-purple-700 font-semibold">Talan led all Capitals defensemen in scoring by 9 points</span>
            </div>
          </div>

          <ScoutsNotes notes={[
            "27 points as a junior defenseman is elite production at this level\u2014validates First-Team All-Star selection",
            "23 assists demonstrate consistent playmaking throughout the entire season, not just hot streaks",
            "6'3\" 200 lbs with a full senior season ahead\u2014physical development trajectory is ideal",
            "Playing on a stacked roster (7 players with 27+ pts) means Talan earned his ice time and production",
            "Second-half schedule toughened up considerably; sustained production against better opponents"
          ]} />
        </div>
      )}

      {/* League Rankings Tab */}
      {activeTab === 'rankings' && (
        <div className="space-y-6">
          <NarrativeBox title="League Standing Analysis">
            <p>
              In a league dominated by forwards at the top of the scoring charts, Talan Millang stands out as one of
              only a handful of defensemen producing at an elite offensive level. His <strong>27 points</strong> place
              him <strong>#{talanPtsRankAll} overall</strong> in league scoring and <strong>#6 among all defensemen</strong>—behind
              Crawford (62), Hope (37), Gladson (31), Holschlag (31), and Harn (29).
            </p>
            <p className="mt-3">
              What makes Talan's production stand out is his <strong>23 assists&mdash;#16 in the entire league out of 338 skaters</strong> and
              <strong> #5 among all defensemen</strong>. His playmaking ability from the back end is rare at this level.
              At 6'3" 200 lbs, he has the size advantage over every D-man ahead of him except Crawford.
              Combined with his First-Team All-Star selection, these numbers paint the picture of a complete
              two-way defenseman who can drive offense while fulfilling his defensive responsibilities.
            </p>
          </NarrativeBox>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RankBadge category="Total Points" vsAll={talanPtsRankAll} vsD={talanPtsRankD} />
            <RankBadge category="Assists" vsAll={talanAssistsRankAll} vsD={talanAssistsRankD} />
            <RankBadge category="Among '27 D-Men" vsAll={talanPtsRankClass27} vsD={talanPtsRankClass27D} />
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">League Scoring Leaders (Final)</h3>
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
                  {leagueLeaders.map((player, idx) => {
                    const prevPlayer = leagueLeaders[idx - 1];
                    const showGap = prevPlayer && player.rank - prevPlayer.rank > 1;
                    return (
                    <React.Fragment key={idx}>
                      {showGap && (
                        <tr className="border-b border-gray-200">
                          <td colSpan={9} className="py-1 px-2 text-center text-gray-400 text-xs bg-gray-50">&#8942; ranks {prevPlayer.rank + 1}&ndash;{player.rank - 1} &#8942;</td>
                        </tr>
                      )}
                      <tr className={`border-b border-gray-100 ${player.isTalan ? 'bg-purple-100 font-semibold' : ''} ${player.pos === 'D' ? 'text-indigo-700' : ''}`}>
                        <td className="py-2 px-2">{player.rank}</td>
                        <td className="py-2 px-2">{player.name} {player.isTalan && '\u2B50'}</td>
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
                    </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">League Defensemen Scoring (Final)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={allDefensemen} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={130} />
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
            "Five defensemen outscored Talan\u2014but only Hope (5'8\" 140) and Gladson are Juniors; the other three are graduating Seniors",
            "23 assists rank #5 among all D-men; elite vision and distribution from the blue line",
            "At 6'3\" 200 lbs, Talan has a massive physical advantage over JJ Hope (5'8\" 140)\u2014size translates at higher levels",
            "Production came on a roster with 6 forwards scoring 31+ points\u2014competition for ice time and PP minutes was real",
            "First-Team All-Star validates the numbers\u2014coaches and scouts recognized his complete game"
          ]} />
        </div>
      )}

      {/* Opponent Impact Tab */}
      {activeTab === 'opponents' && (
        <div className="space-y-6">
          <NarrativeBox title="Defensive Impact Analysis">
            <p>
              The Des Moines Capitals' 30-1-1 season under Coach Tony Weil was built on suffocating team defense,
              and Talan Millang was a cornerstone of that success. Across 32 regular season games,
              opponents scored an average of <strong>{avgSuppression}% below their season scoring average</strong> when
              facing the Capitals. The team allowed just <strong>46 goals all season (1.44 GA/game)</strong> while
              scoring 164.
            </p>
            <p className="mt-3">
              The data reveals a consistent pattern: teams simply could not generate their normal offensive output against
              Des Moines. Spirit Lake was completely shut out in both meetings (100% suppression), while competitive
              teams like Cedar Rapids, Mason City, and Kansas City all scored significantly below their typical rates.
              This defensive foundation earned Tony Weil Coach of the Year honors.
            </p>
          </NarrativeBox>

          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-5 text-white">
            <h3 className="text-xl font-bold mb-2">The Capitals Shutdown Effect</h3>
            <p className="text-red-100">How opponents' offensive output dropped when facing the Des Moines Capitals (full season, all 13 opponents)</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Scoring Suppression: % Below Season Average vs Caps</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[...opponentScoringData].sort((a, b) => b.pctBelow - a.pctBelow)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="team" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} label={{ value: '% Below Average', angle: -90, position: 'insideLeft', fontSize: 11 }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Below Average']} />
                <Bar dataKey="pctBelow" radius={[8, 8, 0, 0]} name="% Below Avg">
                  {[...opponentScoringData].sort((a, b) => b.pctBelow - a.pctBelow).map((entry, index) => (
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
              <div className="text-3xl font-bold">164</div>
              <div className="text-purple-100 text-sm">Goals For</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white text-center">
              <div className="text-3xl font-bold">46</div>
              <div className="text-green-100 text-sm">Goals Against</div>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-4 text-white text-center">
              <div className="text-3xl font-bold">{avgSuppression}%</div>
              <div className="text-amber-100 text-sm">Avg Suppression</div>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl p-4 text-white text-center">
              <div className="text-3xl font-bold">1.44</div>
              <div className="text-red-100 text-sm">GA/Game</div>
            </div>
          </div>

          {/* League Standings */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">MWHSHL Final Standings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-2 text-gray-500">Team</th>
                    <th className="text-center py-2 px-2 text-gray-500">W</th>
                    <th className="text-center py-2 px-2 text-gray-500">L</th>
                    <th className="text-center py-2 px-2 text-gray-500">OTL</th>
                    <th className="text-center py-2 px-2 text-gray-500 font-bold">PTS</th>
                    <th className="text-center py-2 px-2 text-gray-500">GF</th>
                    <th className="text-center py-2 px-2 text-gray-500">GA</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { team: 'DM Capitals', w: 30, l: 1, otl: 1, pts: 61, gf: 164, ga: 46, isCaps: true },
                    { team: 'DM Oak Leafs', w: 28, l: 4, otl: 0, pts: 56, gf: 153, ga: 61 },
                    { team: 'Dubuque Saints', w: 22, l: 8, otl: 2, pts: 46, gf: 125, ga: 63 },
                    { team: 'Ames Cyclones', w: 21, l: 9, otl: 2, pts: 44, gf: 121, ga: 82 },
                    { team: 'Waterloo Warriors', w: 20, l: 11, otl: 1, pts: 41, gf: 132, ga: 100 },
                    { team: 'Omaha Jr Lancers', w: 19, l: 10, otl: 3, pts: 41, gf: 113, ga: 84 },
                    { team: 'Lincoln Jr Stars', w: 19, l: 11, otl: 2, pts: 40, gf: 90, ga: 73 },
                    { team: 'Kansas City Jets', w: 16, l: 15, otl: 1, pts: 33, gf: 104, ga: 87 },
                    { team: 'Cedar Rapids Riders', w: 12, l: 18, otl: 2, pts: 26, gf: 95, ga: 128 },
                    { team: 'Mason City Mohawks', w: 11, l: 20, otl: 1, pts: 23, gf: 68, ga: 100 },
                    { team: 'Sioux City Metros', w: 11, l: 20, otl: 1, pts: 23, gf: 80, ga: 132 },
                    { team: 'Fremont Warbirds', w: 8, l: 21, otl: 3, pts: 19, gf: 83, ga: 145 },
                    { team: 'Quad City Blues', w: 7, l: 25, otl: 0, pts: 14, gf: 76, ga: 164 },
                    { team: 'Boji Mammoths', w: 0, l: 31, otl: 1, pts: 1, gf: 37, ga: 176 },
                  ].map((t, idx) => (
                    <tr key={idx} className={`border-b border-gray-100 ${t.isCaps ? 'bg-purple-100 font-semibold' : ''}`}>
                      <td className="py-2 px-2">{t.team} {t.isCaps && '\u2B50'}</td>
                      <td className="text-center py-2 px-2">{t.w}</td>
                      <td className="text-center py-2 px-2">{t.l}</td>
                      <td className="text-center py-2 px-2">{t.otl}</td>
                      <td className="text-center py-2 px-2 font-bold">{t.pts}</td>
                      <td className="text-center py-2 px-2">{t.gf}</td>
                      <td className="text-center py-2 px-2">{t.ga}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <ScoutsNotes notes={[
            "Talan's defensive awareness complements his offensive game\u2014rarely caught out of position on the rush",
            "Strong stick and active in passing lanes; breaks up plays before they develop",
            "Physical presence at 6'3\" 200 lbs deters opponents from high-traffic areas",
            "Excellent at retrieving pucks and making quick outlet passes to start the transition",
            "Coach of the Year (Tony Weil) speaks to the team's defensive system\u2014Talan was a key part of that foundation"
          ]} />
        </div>
      )}

      {/* Class of 2027 Tab */}
      {activeTab === 'class' && (
        <div className="space-y-6">
          <NarrativeBox title="Class of 2027 Comparison">
            <p>
              Among confirmed Class of 2027 (Junior) players in the MWHSHL, Talan Millang stands as the
              <strong> #3 defenseman in total scoring</strong>, behind JJ Hope of Sioux City (37 pts) and
              Max Gladson of DM Oak Leafs (31 pts). Overall in his class, he ranks <strong>#9</strong> among
              10 confirmed Juniors in the top 37 league scorers—behind forwards Paulsen (70), Buchan (56),
              Kutler (42), Heinkel (36), Logsdon (33), Christensen (31), and D-men Hope (37) and Gladson (31).
            </p>
            <p className="mt-3">
              The key context: JJ Hope (5'8" 140 lbs) puts up impressive numbers but at a fraction of Talan's
              physical profile (6'3" 200 lbs). Size matters at higher levels—Talan's combination of offensive
              production, elite frame, and First-Team All-Star recognition makes him a standout recruiting
              prospect. Demetri Tsiobanos of Sioux City (23 pts) rounds out the Junior D-men behind Talan.
            </p>
          </NarrativeBox>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-5 text-white">
            <h3 className="text-xl font-bold mb-2">Class of 2027 (Juniors) &mdash; Final Standings</h3>
            <p className="text-indigo-100">Confirmed Junior scoring leaders in the MWHSHL &bull; 2025-26 Season</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Junior Scoring Leaders (Final)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={juniorsOnly} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 75]} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={130} />
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
                <li>&bull; <strong>#3 scoring D-man</strong> among all Juniors</li>
                <li>&bull; <strong>#9 overall</strong> in Junior class scoring (10 Juniors in top 37)</li>
                <li>&bull; <strong>MWHSHL First-Team All-Star</strong> (Defense)</li>
                <li>&bull; 23 assists rank #2 among Junior D-men (Gladson 25, Talan 23, Hope 18)</li>
              </ul>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Star className="text-indigo-600" size={24} />
                <h4 className="font-semibold text-indigo-800">Physical Profile</h4>
              </div>
              <ul className="space-y-2 text-sm text-indigo-700">
                <li>Height: <strong>6'3"</strong></li>
                <li>Weight: <strong>200 lbs</strong></li>
                <li>DOB: 08/18/2008</li>
                <li>Valley High School</li>
                <li>Shoots: Left</li>
              </ul>
            </div>
          </div>

          <ScoutsNotes notes={[
            "Prototypical modern defenseman frame at 6'3\" 200\u2014still has room to add muscle through senior year and beyond",
            "Production at this level as a Junior D-man is rare; projects well to higher competition",
            "Offensive instincts rival many forwards in his class; can run a power play at any level",
            "First-Team All-Star selection as a Junior speaks to his maturity and complete game",
            "With a full senior season ahead, his stock is trending up heading into the recruiting window"
          ]} />
        </div>
      )}

      {/* Highlights Tab */}
      {activeTab === 'highlights' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-xl p-5 text-white">
            <h3 className="text-xl font-bold mb-2">Highlight Reel</h3>
            <p className="text-red-100">Click to watch Talan's best plays from the 2025-26 season.</p>
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
                  {thumbnailUrl && playingVideo !== clip.id && (
                    <div className="absolute inset-0 bg-black/30"></div>
                  )}

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
                    <div
                      onClick={() => openVideo(clip.url)}
                      className="text-center cursor-pointer hover:scale-105 transition-transform relative z-[5]"
                    >
                      <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto shadow-lg hover:bg-red-700 transition-colors">
                        <Play className="text-white ml-1" size={40} fill="white" />
                      </div>
                      <p className="text-white text-sm mt-3 font-medium drop-shadow-lg">Watch Video</p>
                    </div>
                  ) : (
                    <div className="text-center relative z-[5]">
                      <div className="text-6xl mb-2">{clip.thumbnail}</div>
                      <p className="text-white/60 text-xs">No video URL</p>
                    </div>
                  )}

                  {playingVideo === clip.id && (
                    <button
                      onClick={() => setPlayingVideo(null)}
                      className="absolute top-2 left-2 px-3 py-1 bg-black/70 rounded-full text-white text-xs hover:bg-black/90 transition-colors z-10"
                    >
                      <X size={12} className="inline mr-1" /> Close
                    </button>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800">{clip.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{clip.description}</p>
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
                        <button onClick={() => openVideo(clip.url)} className="text-red-600 text-sm font-medium flex items-center gap-1 hover:text-red-800">
                          <Play size={14} /> Watch
                        </button>
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
              <p>No highlights found with tag &quot;{filterTag}&quot;</p>
              <button
                onClick={() => setFilterTag('All')}
                className="text-purple-600 font-medium mt-2 hover:underline"
              >
                Show all highlights
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-gray-400 text-sm">
        <p>Talan Millang #11 &bull; Des Moines Capitals &bull; 2025-26 Season Analytics</p>
        <p className="mt-1">MWHSHL Varsity First-Team All-Star (Defense) &bull; Class of 2027</p>
      </div>
    </div>
  );
}
