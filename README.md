# 🏒 Talan Millang Hockey Showcase

**TalanShowcase.com** - Official analytics dashboard for Talan Millang, #11 Defenseman for the Des Moines Capitals.

## 🚀 Quick Deploy to Vercel (Recommended)

### Step 1: Create GitHub Account (if needed)
1. Go to [github.com](https://github.com)
2. Sign up for free account

### Step 2: Upload to GitHub
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `talan-showcase`
3. Keep it **Public** (free hosting)
4. Click **Create repository**
5. Click **uploading an existing file**
6. Drag the entire `talan-showcase` folder contents
7. Click **Commit changes**

### Step 3: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** → **Continue with GitHub**
3. Click **Add New...** → **Project**
4. Find `talan-showcase` and click **Import**
5. Click **Deploy** (all settings are auto-detected!)
6. Wait ~60 seconds... 🎉 **LIVE!**

### Step 4: Connect TalanShowcase.com (GoDaddy)
1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add domain: `talanshowcase.com`
4. Vercel will show you DNS records to add

**In GoDaddy:**
1. Go to GoDaddy → **My Products** → **DNS**
2. Delete any existing A records for @
3. Add these records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 600 |
| CNAME | www | cname.vercel-dns.com | 600 |

4. Wait 5-30 minutes for DNS propagation
5. **Done!** TalanShowcase.com is LIVE! 🏆

---

## 📊 Weekly Updates

### To update stats after games:

**Option A: Edit directly on GitHub**
1. Go to your repo on GitHub
2. Click `src/App.jsx`
3. Click the pencil icon (Edit)
4. Find the `gameData` array (line ~6)
5. Add new games following the format
6. Scroll down, click **Commit changes**
7. Vercel auto-deploys in ~30 seconds!

**Option B: Let Claude help**
Just share the new game stats and I'll generate the updated code!

### Data sections to update:

```javascript
// 📊 TALAN'S GAME DATA - Add new games here
const gameData = [
  // ... existing games ...
  { date: '12/14', month: 'Dec', opponent: 'New Team', result: 'W 5-1', 
    goals: 1, assists: 2, pts: 3, pim: 0, gw: 0, capsScore: 5, oppScore: 1 },
];

// 🏆 LEAGUE LEADERS - Update rankings weekly
const leagueLeaders = [ ... ];

// 📋 TALAN'S BIO - Update totals
const talanStats = {
  gp: 14, goals: 3, assists: 15, pts: 18, ppg: 1.29, pim: 2, gw: 1,
  height: "6'3\"", weight: 195, position: 'D', number: 11, gradYear: 2027
};
```

---

## 🛠 Local Development (Optional)

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build
```

---

## 📁 Project Structure

```
talan-showcase/
├── src/
│   ├── App.jsx        ← Main dashboard (edit stats here!)
│   ├── main.jsx       ← Entry point
│   └── index.css      ← Styles
├── public/
│   └── favicon.svg    ← Browser tab icon
├── index.html         ← HTML template
├── package.json       ← Dependencies
├── vite.config.js     ← Build config
├── tailwind.config.js ← Styling config
└── README.md          ← This file!
```

---

## ✨ Features

- 📈 **Interactive Charts** - Recharts visualizations
- 🏆 **League Rankings** - Compare vs all players & defensemen
- 🛡️ **Opponent Impact** - Defensive analytics
- 🎓 **Class of 2027** - Draft class comparison  
- 🎬 **Video Highlights** - YouTube/Vimeo/Hudl embed support
- 💾 **Persistent Highlights** - Saves to browser localStorage
- 📱 **Mobile Responsive** - Looks great on all devices

---

## 🆘 Need Help?

Ask Claude! Just share:
- New game stats
- Updated league standings
- Any issues you're seeing

I'll help generate the updated code or troubleshoot!

---

**Built with ❤️ for Talan Millang #11**
*Des Moines Capitals • Class of 2027 • Valley High School*
