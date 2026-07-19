# 📚 KEA Group C Exam Prep App

**Bilingual (ಕನ್ನಡ + English) Self-Updating Study App for Karnataka Village Accountant (VAO) & All KEA Group C Competitive Exams**

🔗 **Exam Date: October 4, 2026**

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| 📅 **16-Day Intensive Plan** | Structured daily study covering full syllabus |
| 🔒 **Sequential Learning** | Days unlock one-by-one; must pass quiz (60%+) to proceed |
| ⏰ **Force Learning** | Smart reminders at 9AM, 2PM, 7PM, 10PM if day incomplete |
| ⏳ **Postpone System** | Max 3 postpones per day (120min → 60min → 30min reminders) |
| 📖 **30+ Detailed Lessons** | Every topic from Papers 1 & 2 with bilingual content |
| 📝 **Quiz Bank** | Topic-wise, subject-wise, day-wise, and Full Mock (25 Qs) |
| 📰 **Self-Updating Current Affairs** | Fetches from web + embedded data with 24hr auto-refresh |
| 🌐 **Bilingual (KN/EN)** | Toggle between Kannada & English anywhere |
| 🌓 **Dark/Light Mode** | Comfortable reading day or night |
| 📱 **PWA Support** | Add to Home Screen, works offline |
| 📊 **Progress Tracking** | Visual stats dashboard, % completion, quiz history |
| 📄 **Paper 1 (GK) & Paper 2 (Lang+Computer)** | Full syllabus coverage |

---

## 📋 Syllabus Coverage

### Paper 1: General Knowledge (100 Marks, 2 Hours)
- Constitution of India (Preamble, FRs, DPSP, Amendments, Judiciary)
- History of India & Karnataka (Ancient → Modern)
- Geography (India + Karnataka rivers, districts, climate)
- State & Territorial Administration
- Panchayat Raj, Rural Development, Cooperatives
- Karnataka Economy & Government Schemes
- Environment, Biodiversity & Current Affairs

### Paper 2: Language & Computer (100 Marks, 2 Hours)
- General Kannada (~35%): Grammar, Vocabulary, Proverbs, Translation, Comprehension
- General English (~35%): Grammar, Error Spotting, Synonyms, Idioms, Comprehension
- Computer Knowledge (~30%): Basics, MS Office, Internet, Email, Security

### Negative Marking: 0.25 per wrong answer

---

## 🛠️ Tech Stack

- Pure HTML/CSS/JS — no frameworks, no build step
- Service Worker for offline support
- localStorage for progress persistence
- RSS-to-JSON API for current affairs
- PWA manifest for mobile install

---

## 📱 Installation

### On Mobile (Android/iOS):
1. Open `index.html` in Chrome/Safari
2. Tap **"Add to Home Screen"** from browser menu
3. App opens like a native app, works offline

### On Desktop:
1. Open `index.html` in any browser
2. For best experience, use Chrome

---

## 📂 File Structure

```
karnataka-va-app/
├── index.html              # Main app shell
├── css/
│   └── style.css           # All styles (light/dark themes)
├── js/
│   ├── data.js             # Syllabus, 30+ lessons, quiz bank
│   ├── app.js              # Core logic, navigation, force-learning
│   └── current-affairs.js  # Self-updating news module
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker (offline cache)
└── README.md               # This file
```

---

## 🎯 16-Day Study Strategy

| Days | Focus | Paper |
|------|-------|-------|
| 1-2 | Constitution of India | P1 |
| 3-5 | History (India & Karnataka) | P1 |
| 6-7 | Geography | P1 |
| 8 | Administration | P1 |
| 9-10 | Panchayat Raj, Rural Dev, Economy | P1 |
| 11 | Environment & Current Affairs | P1 |
| 12 | Current Affairs deep dive | P1 |
| 13-14 | General Kannada | P2 |
| 15 | General English | P2 |
| 16 | Computer Knowledge | P2 |

---

## ⚠️ Important Notes

- All progress is stored in your browser's localStorage
- Clearing browser data will reset progress
- Current affairs auto-refresh every 24 hours
- Force-learning reminders work when the app is open
- For best results, study one day at a time and review previous days

---

**ಶುಭವಾಗಲಿ! 🙏 All the best for your exam!**
