// ============ KEA GROUP C EXAM DATA ============
// Covers: VAO (Village Accountant), Group C, and all KEA competitive exams
// Exam: October 4, 2026 | Papers: Paper 1 (GK), Paper 2 (Language + Computer)

const EXAM_DATE = new Date('2026-10-04T00:00:00+05:30');
const APP_VERSION = '2.0.0';
const PASS_THRESHOLD = 60; // 60% to pass quiz and unlock next day
const MAX_POSTPONES = 3; // max postpones per day

// ============ STUDY PLAN: 16-DAY INTENSIVE ============
const studyPlan = [
  { day:1,  subject:'constitution', title_kn:'ಭಾರತದ ಸಂವಿಧಾನ - ಪೀಠಿಕೆ, ಮೂಲ ಹಕ್ಕುಗಳು, DPSP', title_en:'Indian Constitution - Preamble, FRs, DPSP', topics:['constitution_preamble','fundamental_rights','dpsp'], paper:1 },
  { day:2,  subject:'constitution', title_kn:'ಸಂವಿಧಾನ - ತಿದ್ದುಪಡಿಗಳು, ನ್ಯಾಯಾಂಗ, ರಾಜ್ಯ ಸರ್ಕಾರ', title_en:'Constitution - Amendments, Judiciary, State Govt', topics:['amendments','judiciary','state_admin'], paper:1 },
  { day:3,  subject:'history', title_kn:'ಭಾರತದ ಇತಿಹಾಸ - ಪ್ರಾಚೀನ & ಮಧ್ಯಕಾಲೀನ', title_en:'Indian History - Ancient & Medieval', topics:['ancient_india','medieval_india'], paper:1 },
  { day:4,  subject:'history', title_kn:'ಕರ್ನಾಟಕ ಇತಿಹಾಸ - ಕದಂಬ, ಚಾಲುಕ್ಯ, ಹೊಯ್ಸಳ, ವಿಜಯನಗರ', title_en:'Karnataka History - Kadamba to Vijayanagara', topics:['ancient_karnataka','medieval_karnataka'], paper:1 },
  { day:5,  subject:'history', title_kn:'ಆಧುನಿಕ ಭಾರತ & ಕರ್ನಾಟಕ - ಸ್ವಾತಂತ್ರ್ಯ, ಟಿಪ್ಪು, ಚೆನ್ನಮ್ಮ', title_en:'Modern India & KA - Freedom, Tipu, Chennamma', topics:['modern_india','tipu_kittur','freedom_karnataka'], paper:1 },
  { day:6,  subject:'geography', title_kn:'ಭಾರತದ ಭೂಗೋಳ - ಭೌತಿಕ ಲಕ್ಷಣ, ನದಿಗಳು, ಹವಾಮಾನ', title_en:'India Geography - Physical, Rivers, Climate', topics:['physical_india','rivers_india'], paper:1 },
  { day:7,  subject:'geography', title_kn:'ಕರ್ನಾಟಕ ಭೂಗೋಳ - ನದಿಗಳು, ಜಿಲ್ಲೆಗಳು, ಸಂಪನ್ಮೂಲಗಳು', title_en:'KA Geography - Rivers, Districts, Resources', topics:['karnataka_rivers','karnataka_districts','karnataka_climate'], paper:1 },
  { day:8,  subject:'admin', title_kn:'ಆಡಳಿತ - ರಾಜ್ಯ, ಪ್ರಾದೇಶಿಕ, ಗ್ರಾಮ ಲೆಕ್ಕಾಧಿಕಾರಿ ಪಾತ್ರ', title_en:'Administration - State, Territorial, VA Role', topics:['state_admin','territorial_admin'], paper:1 },
  { day:9,  subject:'rural', title_kn:'ಪಂಚಾಯತ್ ರಾಜ್, ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ, ಸಹಕಾರ ಸಂಘಗಳು', title_en:'Panchayat Raj, Rural Dev, Cooperatives', topics:['panchayat_raj','rural_dev','coop_societies'], paper:1 },
  { day:10, subject:'economy', title_kn:'ಕರ್ನಾಟಕ ಆರ್ಥಿಕತೆ, ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ಬಜೆಟ್', title_en:'KA Economy, Govt Schemes, Budget', topics:['karnataka_economy','govt_schemes'], paper:1 },
  { day:11, subject:'environment', title_kn:'ಪರಿಸರ, ಜೀವವೈವಿಧ್ಯ, ಕರ್ನಾಟಕ ಅಭಿವೃದ್ಧಿ', title_en:'Environment, Biodiversity, KA Development', topics:['environment','biodiversity_karnataka'], paper:1 },
  { day:12, subject:'current', title_kn:'ಪ್ರಚಲಿತ ಘಟನೆಗಳು - ರಾಷ್ಟ್ರೀಯ & ಅಂತರರಾಷ್ಟ್ರೀಯ', title_en:'Current Affairs - National & International', topics:['current_affairs'], paper:1 },
  { day:13, subject:'kannada', title_kn:'ಸಾಮಾನ್ಯ ಕನ್ನಡ - ವ್ಯಾಕರಣ, ಶಬ್ದಕೋಶ, ಗಾದೆಗಳು', title_en:'General Kannada - Grammar, Vocab, Proverbs', topics:['kannada_grammar','kannada_vocab','kannada_proverbs'], paper:2 },
  { day:14, subject:'kannada', title_kn:'ಕನ್ನಡ - ಗ್ರಹಿಕೆ, ಅನುವಾದ, ಪ್ರಬಂಧ', title_en:'Kannada - Comprehension, Translation, Essay', topics:['kannada_comprehension','kannada_translation'], paper:2 },
  { day:15, subject:'english', title_kn:'ಸಾಮಾನ್ಯ ಇಂಗ್ಲಿಷ್ - ವ್ಯಾಕರಣ, ದೋಷ, ಶಬ್ದಕೋಶ', title_en:'General English - Grammar, Errors, Vocabulary', topics:['english_grammar','english_errors','english_synonyms','english_idioms'], paper:2 },
  { day:16, subject:'computer', title_kn:'ಕಂಪ್ಯೂಟರ್ ಜ್ಞಾನ - ಮೂಲಭೂತ, MS Office, ಇಂಟರ್ನೆಟ್', title_en:'Computer - Basics, MS Office, Internet, Security', topics:['computer_basics','ms_office','internet_email','computer_advanced'], paper:2 },
];

// ============ ALL TOPICS WITH LESSONS ============
const allTopics = {

  // === PAPER 1: CONSTITUTION ===
  constitution_preamble: {
    id:'constitution_preamble', subject:'constitution', paper:1,
    title_kn:'ಸಂವಿಧಾನದ ಪೀಠಿಕೆ ಮತ್ತು ವೈಶಿಷ್ಟ್ಯಗಳು', title_en:'Preamble & Features of Constitution',
    lesson_kn:`📜 **ಭಾರತದ ಸಂವಿಧಾನದ ಪೀಠಿಕೆ**

ಭಾರತದ ಸಂವಿಧಾನವು ವಿಶ್ವದ ಅತಿ ದೊಡ್ಡ ಲಿಖಿತ ಸಂವಿಧಾನ. ಪೀಠಿಕೆಯನ್ನು ನವೆಂಬರ್ 26, 1949 ರಂದು ಅಂಗೀಕರಿಸಲಾಯಿತು ಮತ್ತು ಜನವರಿ 26, 1950 ರಿಂದ ಜಾರಿಗೆ ಬಂದಿತು (ಗಣರಾಜ್ಯ ದಿನ).

**ಪೀಠಿಕೆಯ ಪ್ರಮುಖ ಪದಗಳು:**
• **ಸಾರ್ವಭೌಮ** (Sovereign) - ಮೂಲ ಸಂವಿಧಾನದಲ್ಲಿತ್ತು
• **ಸಮಾಜವಾದಿ** (Socialist) - 42ನೇ ತಿದ್ದುಪಡಿ 1976 ರಿಂದ
• **ಜಾತ್ಯತೀತ** (Secular) - 42ನೇ ತಿದ್ದುಪಡಿ 1976 ರಿಂದ
• **ಪ್ರಜಾಸತ್ತಾತ್ಮಕ** (Democratic)
• **ಗಣರಾಜ್ಯ** (Republic)

**ಪ್ರಮುಖ ಉದ್ದೇಶಗಳು:**
• ನ್ಯಾಯ - ಸಾಮಾಜಿಕ, ಆರ್ಥಿಕ ಮತ್ತು ರಾಜಕೀಯ
• ಸ್ವಾತಂತ್ರ್ಯ - ಚಿಂತನೆ, ಅಭಿವ್ಯಕ್ತಿ, ನಂಬಿಕೆ, ಧರ್ಮ ಮತ್ತು ಉಪಾಸನೆಯ
• ಸಮಾನತೆ - ಸ್ಥಾನಮಾನ ಮತ್ತು ಅವಕಾಶದ
• ಭ್ರಾತೃತ್ವ - ವ್ಯಕ್ತಿಯ ಘನತೆ ಮತ್ತು ರಾಷ್ಟ್ರದ ಏಕತೆ

**ಪ್ರಮುಖ ಸಂಗತಿಗಳು:**
• ಸಂವಿಧಾನ ಸಭೆಯ ಅಧ್ಯಕ್ಷರು: ಡಾ. ರಾಜೇಂದ್ರ ಪ್ರಸಾದ್
• ಕರಡು ಸಮಿತಿ ಅಧ್ಯಕ್ಷರು: ಡಾ. ಬಿ.ಆರ್. ಅಂಬೇಡ್ಕರ್
• ಸಂವಿಧಾನ ರಚನೆಗೆ ತೆಗೆದುಕೊಂಡ ಸಮಯ: 2 ವರ್ಷ 11 ತಿಂಗಳು 18 ದಿನಗಳು
• ಕೇಶವಾನಂದ ಭಾರತಿ ಪ್ರಕರಣ (1973): ಪೀಠಿಕೆ ಸಂವಿಧಾನದ ಭಾಗ
• ಸಂವಿಧಾನದಲ್ಲಿ 22 ಭಾಗಗಳು, 395 ಅನುಚ್ಛೇದಗಳು, 12 ಅನುಸೂಚಿಗಳು (ಮೂಲ)`,
    lesson_en:`📜 **Preamble of the Indian Constitution**

The Indian Constitution is the world's longest written constitution. Adopted November 26, 1949, came into effect January 26, 1950 (Republic Day).

**Key Words in Preamble:**
• **Sovereign** - Original
• **Socialist** - 42nd Amendment 1976
• **Secular** - 42nd Amendment 1976
• **Democratic**
• **Republic**

**Core Objectives:**
• Justice - Social, Economic, Political
• Liberty - Thought, Expression, Belief, Faith, Worship
• Equality - Status and Opportunity
• Fraternity - Dignity, Unity of Nation

**Key Facts:**
• Constituent Assembly President: Dr. Rajendra Prasad
• Drafting Committee Chairman: Dr. B.R. Ambedkar
• Time taken: 2 years, 11 months, 18 days
• Keshavananda Bharati case (1973): Preamble is part of Constitution
• Originally: 22 Parts, 395 Articles, 12 Schedules`,
  },

  fundamental_rights: {
    id:'fundamental_rights', subject:'constitution', paper:1,
    title_kn:'ಮೂಲಭೂತ ಹಕ್ಕುಗಳು (ಅನು. 12-35)', title_en:'Fundamental Rights (Art. 12-35)',
    lesson_kn:`⚖️ **ಸಂವಿಧಾನದ ಭಾಗ III: ಮೂಲಭೂತ ಹಕ್ಕುಗಳು**

**6 ಮೂಲಭೂತ ಹಕ್ಕುಗಳು:**
1. **ಸಮಾನತೆಯ ಹಕ್ಕು** (ಅನು. 14-18): ಕಾನೂನಿನ ಮುಂದೆ ಸಮಾನತೆ, ತಾರತಮ್ಯ ನಿಷೇಧ, ಅಸ್ಪೃಶ್ಯತೆ ನಿರ್ಮೂಲನೆ, ಬಿರುದುಗಳ ರದ್ದತಿ
2. **ಸ್ವಾತಂತ್ರ್ಯದ ಹಕ್ಕು** (ಅನು. 19-22): 6 ಸ್ವಾತಂತ್ರ್ಯಗಳು - ಭಾಷಣ, ಸಭೆ, ಸಂಘ, ಚಲನೆ, ವಾಸ, ವೃತ್ತಿ
3. **ಶೋಷಣೆಯ ವಿರುದ್ಧ ಹಕ್ಕು** (ಅನು. 23-24): ಮಾನವ ಕಳ್ಳಸಾಗಣೆ, ಬಾಲಕಾರ್ಮಿಕ ನಿಷೇಧ (14 ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ)
4. **ಧಾರ್ಮಿಕ ಸ್ವಾತಂತ್ರ್ಯ** (ಅನು. 25-28)
5. **ಸಾಂಸ್ಕೃತಿಕ & ಶೈಕ್ಷಣಿಕ ಹಕ್ಕುಗಳು** (ಅನು. 29-30): ಅಲ್ಪಸಂಖ್ಯಾತರ ಹಕ್ಕುಗಳು
6. **ಸಾಂವಿಧಾನಿಕ ಪರಿಹಾರದ ಹಕ್ಕು** (ಅನು. 32): 'ಸಂವಿಧಾನದ ಹೃದಯ' - ಡಾ. ಅಂಬೇಡ್ಕರ್

**ಗಮನಿಸಿ:** ಆಸ್ತಿ ಹಕ್ಕು (ಮೂಲ ಅನು. 31) → 44ನೇ ತಿದ್ದುಪಡಿ 1978 ರಿಂದ ಕಾನೂನುಬದ್ಧ ಹಕ್ಕು (ಅನು. 300A)`,
    lesson_en:`⚖️ **Part III: Fundamental Rights**

**6 Fundamental Rights:**
1. **Right to Equality** (Art 14-18): Equality before law, anti-discrimination, abolition of untouchability, abolition of titles
2. **Right to Freedom** (Art 19-22): 6 freedoms - speech, assembly, association, movement, residence, profession
3. **Right against Exploitation** (Art 23-24): Trafficking, child labour (<14 years)
4. **Right to Freedom of Religion** (Art 25-28)
5. **Cultural & Educational Rights** (Art 29-30): Minorities
6. **Right to Constitutional Remedies** (Art 32): 'Heart of Constitution' - Dr. Ambedkar

**Note:** Right to Property → Legal right (Art 300A) by 44th Amendment 1978`,
  },

  dpsp: {
    id:'dpsp', subject:'constitution', paper:1,
    title_kn:'ರಾಜ್ಯ ನೀತಿಯ ನಿರ್ದೇಶಕ ತತ್ವಗಳು (DPSP)', title_en:'Directive Principles of State Policy',
    lesson_kn:`📋 **ಸಂವಿಧಾನದ ಭಾಗ IV (ಅನು. 36-51)**

ಐರ್ಲೆಂಡ್ ಸಂವಿಧಾನದಿಂದ ಪ್ರೇರಿತ. ಇವು ನ್ಯಾಯಾಲಯದಲ್ಲಿ ಜಾರಿಗೊಳಿಸಲಾಗದ ರಾಜ್ಯ ನೀತಿ ಮಾರ್ಗದರ್ಶಕಗಳು.

**ಪ್ರಮುಖ DPSPಗಳು:**
• ಅನು. 38: ಜನಕಲ್ಯಾಣ ರಾಜ್ಯ
• ಅನು. 39A: ಉಚಿತ ಕಾನೂನು ನೆರವು
• ಅನು. 40: ಗ್ರಾಮ ಪಂಚಾಯತ್‌ಗಳ ಸಂಘಟನೆ
• ಅನು. 44: ಏಕರೂಪ ನಾಗರಿಕ ಸಂಹಿತೆ (UCC)
• ಅನು. 45: 6-14 ವರ್ಷದ ಮಕ್ಕಳಿಗೆ ಶಿಕ್ಷಣ
• ಅನು. 48: ಗೋವುಗಳ ಹತ್ಯೆ ನಿಷೇಧ
• ಅನು. 50: ನ್ಯಾಯಾಂಗವನ್ನು ಕಾರ್ಯಾಂಗದಿಂದ ಪ್ರತ್ಯೇಕಿಸುವುದು
• ಅನು. 51: ಅಂತರರಾಷ್ಟ್ರೀಯ ಶಾಂತಿ ಮತ್ತು ಸುರಕ್ಷತೆ

**DPSP vs ಮೂಲಭೂತ ಹಕ್ಕುಗಳು:**
• DPSP ನ್ಯಾಯಬದ್ಧವಲ್ಲ (non-justiciable)
• FRಗಳು ನ್ಯಾಯಬದ್ಧ (justiciable)
• ಮಿನರ್ವಾ ಮಿಲ್ಸ್ ಪ್ರಕರಣ: ಎರಡೂ ಸಮಾನ ಮಹತ್ವ`,
    lesson_en:`📋 **Part IV (Art. 36-51) - DPSP**

Inspired by the Irish Constitution. Non-justiciable guidelines for the State.

**Key DPSPs:**
• Art 38: Welfare State
• Art 39A: Free legal aid
• Art 40: Village Panchayats
• Art 44: Uniform Civil Code (UCC)
• Art 45: Education for children 6-14 years
• Art 48: Prohibition of cow slaughter
• Art 50: Separation of judiciary from executive
• Art 51: International peace and security

**DPSP vs Fundamental Rights:**
• DPSP: Non-justiciable
• FRs: Justiciable
• Minerva Mills case: Both equally important`,
  },

  amendments: {
    id:'amendments', subject:'constitution', paper:1,
    title_kn:'ಸಂವಿಧಾನದ ಪ್ರಮುಖ ತಿದ್ದುಪಡಿಗಳು', title_en:'Major Constitutional Amendments',
    lesson_kn:`📝 **ಅನುಚ್ಛೇದ 368: ಸಂವಿಧಾನ ತಿದ್ದುಪಡಿ ಪ್ರಕ್ರಿಯೆ**

**ಪ್ರಮುಖ ತಿದ್ದುಪಡಿಗಳು (ಪರೀಕ್ಷೆಗೆ ಅತಿ ಮುಖ್ಯ):**
• **1ನೇ (1951):** ಭಾಷಣ ಸ್ವಾತಂತ್ರ್ಯಕ್ಕೆ ನಿರ್ಬಂಧಗಳು, 9ನೇ ಅನುಸೂಚಿ
• **7ನೇ (1956):** ರಾಜ್ಯಗಳ ಪುನರ್ರಚನೆ
• **24ನೇ (1971):** ಸಂಸತ್ತಿಗೆ ಮೂಲಭೂತ ಹಕ್ಕುಗಳನ್ನು ತಿದ್ದುಪಡಿ ಮಾಡುವ ಅಧಿಕಾರ
• **42ನೇ (1976):** 'ಮಿನಿ ಸಂವಿಧಾನ' - ಪ್ರಸ್ತಾವನೆಗೆ ಸಮಾಜವಾದಿ, ಜಾತ್ಯತೀತ ಸೇರ್ಪಡೆ
• **44ನೇ (1978):** ಆಸ್ತಿ ಹಕ್ಕನ್ನು ಮೂಲಭೂತ ಹಕ್ಕುಗಳಿಂದ ತೆಗೆಯಲಾಗಿದೆ
• **52ನೇ (1985):** ಪಕ್ಷಾಂತರ ನಿಷೇಧ ಕಾಯ್ದೆ (10ನೇ ಅನುಸೂಚಿ)
• **61ನೇ (1989):** ಮತದಾನ ವಯಸ್ಸು 21ರಿಂದ 18ಕ್ಕೆ ಇಳಿಕೆ
• **73ನೇ (1992):** ಪಂಚಾಯತ್ ರಾಜ್‌ಗೆ ಸಾಂವಿಧಾನಿಕ ಸ್ಥಾನಮಾನ
• **74ನೇ (1992):** ನಗರ ಸ್ಥಳೀಯ ಸಂಸ್ಥೆಗಳು
• **86ನೇ (2002):** ಶಿಕ್ಷಣ ಹಕ್ಕು - ಅನುಚ್ಛೇದ 21A (6-14 ವರ್ಷ)
• **101ನೇ (2016):** GST (ಸರಕು ಮತ್ತು ಸೇವಾ ತೆರಿಗೆ)
• **103ನೇ (2019):** EWS ಮೀಸಲಾತಿ (10%)
• **106ನೇ (2023):** ಮಹಿಳಾ ಮೀಸಲಾತಿ (ನಾರಿ ಶಕ್ತಿ ವಂದನ್ ಅಧಿನಿಯಮ)`,
    lesson_en:`📝 **Article 368: Amendment Procedure**

**Key Amendments (Most Important for Exam):**
• **1st (1951):** Restrictions on free speech, 9th Schedule
• **7th (1956):** State reorganisation
• **24th (1971):** Parliament's power to amend FRs
• **42nd (1976):** 'Mini Constitution' - Socialist, Secular in Preamble
• **44th (1978):** Right to Property removed from FRs
• **52nd (1985):** Anti-defection (10th Schedule)
• **61st (1989):** Voting age 21→18
• **73rd (1992):** Panchayat Raj constitutional status
• **74th (1992):** Urban local bodies
• **86th (2002):** Right to Education - Art 21A (age 6-14)
• **101st (2016):** GST
• **103rd (2019):** EWS Reservation (10%)
• **106th (2023):** Women's Reservation (Nari Shakti Vandan)`,
  },

  judiciary: {
    id:'judiciary', subject:'constitution', paper:1,
    title_kn:'ನ್ಯಾಯಾಂಗ ವ್ಯವಸ್ಥೆ', title_en:'Indian Judiciary System',
    lesson_kn:`⚖️ **ಭಾರತೀಯ ನ್ಯಾಯಾಂಗ ವ್ಯವಸ್ಥೆ**

**ಸರ್ವೋಚ್ಚ ನ್ಯಾಯಾಲಯ (Supreme Court):**
• ಅನುಚ್ಛೇದ 124-147
• ಮುಖ್ಯ ನ್ಯಾಯಮೂರ್ತಿ + 33 ನ್ಯಾಯಮೂರ್ತಿಗಳು (ಗರಿಷ್ಠ)
• ನಿವೃತ್ತಿ ವಯಸ್ಸು: 65 ವರ್ಷ
• ನೇಮಕಾತಿ: ರಾಷ್ಟ್ರಪತಿಯಿಂದ (ಕೊಲೀಜಿಯಂ ಸಲಹೆ ಮೇರೆಗೆ)
• ಅಧಿಕಾರ: ಮೂಲ, ಮೇಲ್ಮನವಿ, ಸಲಹಾ, ನ್ಯಾಯಾಂಗ ಪರಿಶೀಲನೆ, ರಿಟ್‌ಗಳು
• ರಿಟ್‌ಗಳು: ಹೇಬಿಯಸ್ ಕಾರ್ಪಸ್, ಮ್ಯಾಂಡಮಸ್, ಪ್ರೊಹಿಬಿಷನ್, ಕ್ವೊ-ವಾರಂಟೊ, ಸೆರ್ಶಿಯೊರಾರಿ

**ಉಚ್ಚ ನ್ಯಾಯಾಲಯಗಳು (High Courts):**
• ಅನುಚ್ಛೇದ 214-231
• ಪ್ರಸ್ತುತ 25 ಉಚ್ಚ ನ್ಯಾಯಾಲಯಗಳು
• ನಿವೃತ್ತಿ ವಯಸ್ಸು: 62 ವರ್ಷ

**ಕರ್ನಾಟಕ ಉಚ್ಚ ನ್ಯಾಯಾಲಯ:**
• ಸ್ಥಾಪನೆ: 1884 (ಮೈಸೂರು); ಮರುನಾಮಕರಣ: 1973
• ಪ್ರಧಾನ ಪೀಠ: ಬೆಂಗಳೂರು; ಹೆಚ್ಚುವರಿ: ಧಾರವಾಡ, ಕಲಬುರಗಿ`,
    lesson_en:`⚖️ **Indian Judiciary**

**Supreme Court:**
• Articles 124-147
• CJI + max 33 judges
• Retirement: 65 years
• Appointed by President (on Collegium advice)
• Powers: Original, Appellate, Advisory, Judicial Review
• Writs: Habeas Corpus, Mandamus, Prohibition, Quo-Warranto, Certiorari

**High Courts:**
• Articles 214-231
• Currently 25 High Courts
• Retirement: 62 years

**Karnataka High Court:**
• Established: 1884 (Mysore); renamed 1973
• Principal bench: Bengaluru; Additional: Dharwad, Kalaburagi`,
  },

  state_admin: {
    id:'state_admin', subject:'admin', paper:1,
    title_kn:'ರಾಜ್ಯ ಸರ್ಕಾರ ಮತ್ತು ಆಡಳಿತ', title_en:'State Government & Administration',
    lesson_kn:`🏛️ **ರಾಜ್ಯ ಸರ್ಕಾರದ ರಚನೆ**

**ರಾಜ್ಯಪಾಲ (Governor):**
• ಅನುಚ್ಛೇದ 153-162; ರಾಷ್ಟ್ರಪತಿಯಿಂದ ನೇಮಕ
• ಅವಧಿ: 5 ವರ್ಷ (ರಾಷ್ಟ್ರಪತಿಯ ಇಚ್ಛೆಯಂತೆ ಕಾರ್ಯನಿರ್ವಹಣೆ)
• ಅಧಿಕಾರಗಳು: ಕಾರ್ಯಾಂಗ, ಶಾಸಕಾಂಗ, ನ್ಯಾಯಾಂಗ, ಹಣಕಾಸು (ಸಾಂವಿಧಾನಿಕ ಅಧ್ಯಕ್ಷ)

**ಮುಖ್ಯಮಂತ್ರಿ:**
• ಅನುಚ್ಛೇದ 163-164; ರಾಜ್ಯಪಾಲರಿಂದ ನೇಮಕ
• ವಿಧಾನಸಭೆಯಲ್ಲಿ ಬಹುಮತ ಹೊಂದಿರಬೇಕು

**ರಾಜ್ಯ ಶಾಸಕಾಂಗ:**
• **ವಿಧಾನಸಭೆ:** ಕರ್ನಾಟಕದಲ್ಲಿ 224 ಸ್ಥಾನಗಳು + 1 ನಾಮನಿರ್ದೇಶಿತ
• **ವಿಧಾನ ಪರಿಷತ್:** 75 ಸ್ಥಾನಗಳು (ಶಾಶ್ವತ ಸದನ)

**ಕರ್ನಾಟಕದ ಪ್ರಸ್ತುತ:**
• ರಾಜ್ಯಪಾಲ: ಥಾವರ್ ಚಂದ್ ಗೆಹ್ಲೋಟ್
• ಮುಖ್ಯಮಂತ್ರಿ: ಸಿದ್ದರಾಮಯ್ಯ
• ಉಪಮುಖ್ಯಮಂತ್ರಿ: ಡಿ.ಕೆ. ಶಿವಕುಮಾರ್`,
    lesson_en:`🏛️ **State Government Structure**

**Governor:**
• Art 153-162; Appointed by President
• Term: 5 years (pleasure of President)
• Powers: Executive, Legislative, Judicial, Financial

**Chief Minister:**
• Art 163-164; Appointed by Governor
• Must have majority in Assembly

**State Legislature:**
• **Assembly (Vidhana Sabha):** Karnataka - 224 seats + 1 nominated
• **Council (Vidhana Parishad):** 75 seats (permanent house)

**Karnataka Current:**
• Governor: Thawar Chand Gehlot
• CM: Siddaramaiah
• Deputy CM: D.K. Shivakumar`,
  },

  territorial_admin: {
    id:'territorial_admin', subject:'admin', paper:1,
    title_kn:'ಪ್ರಾದೇಶಿಕ ಆಡಳಿತ ಮತ್ತು ಗ್ರಾಮ ಲೆಕ್ಕಾಧಿಕಾರಿ ಪಾತ್ರ', title_en:'Territorial Admin & Village Accountant Role',
    lesson_kn:`🏘️ **ಕರ್ನಾಟಕದ ಆಡಳಿತ ರಚನೆ:**
• 4 ಆಡಳಿತ ವಿಭಾಗಗಳು
• 31 ಜಿಲ್ಲೆಗಳು
• 240+ ತಾಲ್ಲೂಕುಗಳು
• 6,000+ ಗ್ರಾಮ ಪಂಚಾಯತಿಗಳು

**ಜಿಲ್ಲಾ ಮಟ್ಟ:** ಜಿಲ್ಲಾಧಿಕಾರಿ (DC) - IAS ಅಧಿಕಾರಿ, ಕಂದಾಯ + ಕಾನೂನು ಸುವ್ಯವಸ್ಥೆ
**ತಾಲ್ಲೂಕು ಮಟ್ಟ:** ತಹಸೀಲ್ದಾರ್ - ಭೂ ದಾಖಲೆ, ಕಂದಾಯ ಸಂಗ್ರಹ

**ಗ್ರಾಮ ಲೆಕ್ಕಾಧಿಕಾರಿ (Village Accountant) ಪಾತ್ರ:**
• ಗ್ರಾಮ ಮಟ್ಟದ ಕಂದಾಯ ಅಧಿಕಾರಿ
• ಭೂ ದಾಖಲೆಗಳ ನಿರ್ವಹಣೆ (RTC/ಪಹಣಿ, ಉತಾರ, ಖಾತಾ)
• ಕಂದಾಯ ವಸೂಲಾತಿ
• ಜನಗಣತಿ ಮತ್ತು ಸರ್ಕಾರಿ ಸಮೀಕ್ಷೆಗಳಿಗೆ ಸಹಾಯ
• ಭೂಮಿ ಯೋಜನೆ (Bhoomi) ಡಿಜಿಟಲ್ ದಾಖಲೆ ನಿರ್ವಹಣೆ
• ನೈಸರ್ಗಿಕ ವಿಪತ್ತು ಪರಿಹಾರ ಕಾರ್ಯಗಳು`,
    lesson_en:`🏘️ **Karnataka Administrative Structure:**
• 4 Administrative Divisions
• 31 Districts
• 240+ Taluks
• 6,000+ Gram Panchayats

**District Level:** Deputy Commissioner (DC) - IAS, revenue + law & order
**Taluk Level:** Tahsildar - land records, revenue collection

**Village Accountant (VA) Role:**
• Village-level revenue officer
• Land records (RTC/Pahani, Mutation, Khata)
• Revenue collection
• Census & government surveys
• Bhoomi digital land records
• Disaster relief operations`,
  },

  // === HISTORY TOPICS ===
  ancient_india: {
    id:'ancient_india', subject:'history', paper:1,
    title_kn:'ಪ್ರಾಚೀನ ಭಾರತದ ಇತಿಹಾಸ', title_en:'Ancient Indian History',
    lesson_kn:`🏺 **ಪ್ರಾಚೀನ ಭಾರತ: ಪ್ರಮುಖ ಘಟನೆಗಳು ಮತ್ತು ಸಾಮ್ರಾಜ್ಯಗಳು**

**ಸಿಂಧೂ ಕಣಿವೆ ನಾಗರಿಕತೆ (2500-1750 BCE):**
• ಹರಪ್ಪಾ, ಮೊಹೆಂಜೊ-ದಾರೊ, ಲೋಥಲ್, ಧೋಲಾವೀರಾ
• ಪಟ್ಟಣ ಯೋಜನೆ, ಒಳಚರಂಡಿ, ದೊಡ್ಡ ಸ್ನಾನಗೃಹ

**ವೇದಿಕ್ ಯುಗ (1500-600 BCE):** 4 ವೇದಗಳು - ಋಗ್ವೇದ (ಅತ್ಯಂತ ಪ್ರಾಚೀನ), ಸಾಮ, ಯಜುರ್, ಅಥರ್ವ

**ಮಹಾಜನಪದಗಳು (600-321 BCE):** 16 ರಾಜ್ಯಗಳು; ಮಗಧ ಪ್ರಮುಖ

**ಮೌರ್ಯ ಸಾಮ್ರಾಜ್ಯ (321-185 BCE):**
• ಚಂದ್ರಗುಪ್ತ ಮೌರ್ಯ + ಚಾಣಕ್ಯ (ಅರ್ಥಶಾಸ್ತ್ರ)
• ಅಶೋಕ: ಕಲಿಂಗ ಯುದ್ಧ (261 BCE) → ಬೌದ್ಧ ಧರ್ಮ
• ಕರ್ನಾಟಕದಲ್ಲಿ ಅಶೋಕನ ಶಾಸನಗಳು: ಮಸ್ಕಿ, ಬ್ರಹ್ಮಗಿರಿ, ಸಿದ್ಧಾಪುರ

**ಗುಪ್ತ ಸಾಮ್ರಾಜ್ಯ (320-550 CE):**
• 'ಭಾರತದ ಸುವರ್ಣ ಯುಗ'
• ಚಂದ್ರಗುಪ್ತ I, ಸಮುದ್ರಗುಪ್ತ, ಚಂದ್ರಗುಪ್ತ II (ವಿಕ್ರಮಾದಿತ್ಯ)

**ಪ್ರಮುಖ ಧರ್ಮಗಳು:** ಜೈನ (ಮಹಾವೀರ), ಬೌದ್ಧ (ಗೌತಮ ಬುದ್ಧ)`,
    lesson_en:`🏺 **Ancient India: Key Events & Empires**

**Indus Valley (2500-1750 BCE):** Harappa, Mohenjo-daro, Lothal, Dholavira

**Vedic Age (1500-600 BCE):** 4 Vedas - Rigveda (oldest), Sama, Yajur, Atharva

**Mahajanapadas (600-321 BCE):** 16 kingdoms; Magadha prominent

**Maurya Empire (321-185 BCE):**
• Chandragupta Maurya + Chanakya (Arthashastra)
• Ashoka: Kalinga War (261 BCE) → Buddhism
• Ashokan edicts in KA: Maski, Brahmagiri, Siddapura

**Gupta Empire (320-550 CE):**
• 'Golden Age of India'
• Chandragupta I, Samudragupta, Chandragupta II (Vikramaditya)

**Major Religions:** Jainism (Mahavira), Buddhism (Gautama Buddha)`,
  },

  medieval_india: {
    id:'medieval_india', subject:'history', paper:1,
    title_kn:'ಮಧ್ಯಕಾಲೀನ ಭಾರತ', title_en:'Medieval India',
    lesson_kn:`🏰 **ಮಧ್ಯಕಾಲೀನ ಭಾರತ**

**ದೆಹಲಿ ಸುಲ್ತಾನರು (1206-1526):**
• ಗುಲಾಮ, ಖಿಲ್ಜಿ (ಅಲಾವುದ್ದೀನ್), ತುಘಲಕ್ (ಮೊಹಮ್ಮದ್ ಬಿನ್), ಸಯ್ಯದ್, ಲೋದಿ

**ಮೊಘಲ್ ಸಾಮ್ರಾಜ್ಯ (1526-1857):**
• **ಬಾಬರ್:** ಪಾನಿಪತ್ ಮೊದಲ ಯುದ್ಧ (1526)
• **ಅಕ್ಬರ್:** ದಿನ್-ಇ-ಇಲಾಹಿ, ಮನ್ಸಬ್ದಾರಿ ಪದ್ಧತಿ, ರಾಜಪೂತ ನೀತಿ
• **ಜಹಾಂಗೀರ್:** ನ್ಯಾಯದ ಸರಪಳಿ
• **ಶಹಜಹಾನ್:** ತಾಜ್ ಮಹಲ್, ಕೆಂಪು ಕೋಟೆ, ಜಾಮಾ ಮಸೀದಿ
• **ಔರಂಗಜೇಬ್:** ಜಿಜಿಯಾ ತೆರಿಗೆ, ಕೊನೆಯ ಪ್ರಮುಖ ಮೊಘಲ್

**ಇತರೆ ಸಾಮ್ರಾಜ್ಯಗಳು:**
• ಮರಾಠಾ (ಶಿವಾಜಿ), ಸಿಖ್, ರಜಪೂತರು`,
    lesson_en:`🏰 **Medieval India**

**Delhi Sultanate (1206-1526):**
• Slave, Khilji (Alauddin), Tughlaq (Muhammad bin), Sayyid, Lodi

**Mughal Empire (1526-1857):**
• **Babur:** First Battle of Panipat (1526)
• **Akbar:** Din-i-Ilahi, Mansabdari, Rajput policy
• **Jahangir:** Chain of Justice
• **Shah Jahan:** Taj Mahal, Red Fort, Jama Masjid
• **Aurangzeb:** Jizya tax, last major Mughal`,
  },

  ancient_karnataka: {
    id:'ancient_karnataka', subject:'history', paper:1,
    title_kn:'ಪ್ರಾಚೀನ ಕರ್ನಾಟಕದ ಇತಿಹಾಸ', title_en:'Ancient Karnataka History',
    lesson_kn:`🏛️ **ಪ್ರಾಚೀನ ಕರ್ನಾಟಕದ ರಾಜವಂಶಗಳು**

**ಕದಂಬರು (345-540 CE):**
• ಪ್ರಥಮ ಕನ್ನಡ ರಾಜವಂಶ
• ಸ್ಥಾಪಕ: ಮಯೂರಶರ್ಮ; ರಾಜಧಾನಿ: ಬನವಾಸಿ
• ಮೊದಲ ಕನ್ನಡ ಶಾಸನ: ಹಲ್ಮಿಡಿ (450 CE)

**ಗಂಗರು (350-1000 CE):**
• ರಾಜಧಾನಿ: ತಲಕಾಡು
• ಗೊಮ್ಮಟೇಶ್ವರ ಪ್ರತಿಮೆ (ಶ್ರವಣಬೆಳಗೊಳ) - ಚಾವುಂಡರಾಯ

**ಬಾದಾಮಿ ಚಾಲುಕ್ಯರು (543-757 CE):**
• ಪುಲಕೇಶಿ II - ಹರ್ಷವರ್ಧನನನ್ನು ನರ್ಮದಾ ತೀರದಲ್ಲಿ ಸೋಲಿಸಿದ (618 CE)
• ಐಹೊಳೆ ಶಾಸನ (ರವಿಕೀರ್ತಿ); ಬಾದಾಮಿ ಗುಹಾ ದೇವಾಲಯಗಳು

**ರಾಷ್ಟ್ರಕೂಟರು (753-982 CE):**
• ಎಲ್ಲೋರಾದ ಕೈಲಾಸನಾಥ ದೇವಾಲಯ (UNESCO)
• ಅಮೋಘವರ್ಷ ನೃಪತುಂಗ - ಕವಿರಾಜಮಾರ್ಗ (ಪ್ರಥಮ ಕನ್ನಡ ಗ್ರಂಥ)

**ಕಲ್ಯಾಣಿ ಚಾಲುಕ್ಯರು (973-1189 CE):**
• ತೈಲಪ II, ವಿಕ್ರಮಾದಿತ್ಯ VI`,
    lesson_en:`🏛️ **Ancient Karnataka Dynasties**

**Kadambas (345-540 CE):**
• First Kannada dynasty; Founder: Mayurasharma; Capital: Banavasi
• First Kannada inscription: Halmidi (450 CE)

**Gangas (350-1000 CE):**
• Capital: Talakadu
• Gommateshwara (Shravanabelagola) - Chavundaraya

**Badami Chalukyas (543-757 CE):**
• Pulakeshi II defeated Harshavardhana at Narmada (618 CE)
• Aihole inscription (Ravikirti); Badami cave temples

**Rashtrakutas (753-982 CE):**
• Ellora Kailasanatha Temple (UNESCO)
• Amoghavarsha Nrupatunga - Kavirajamarga (first Kannada text)`,
  },

  medieval_karnataka: {
    id:'medieval_karnataka', subject:'history', paper:1,
    title_kn:'ಮಧ್ಯಕಾಲೀನ ಕರ್ನಾಟಕ & ವಿಜಯನಗರ', title_en:'Medieval Karnataka & Vijayanagara',
    lesson_kn:`🏯 **ಹೊಯ್ಸಳರು (1000-1346 CE):**
• ವಿಷ್ಣುವರ್ಧನ; ಬೇಲೂರು ಚೆನ್ನಕೇಶವ, ಹಳೇಬೀಡು ಹೊಯ್ಸಳೇಶ್ವರ
• ವಿಶ್ವವಿಖ್ಯಾತ ಶಿಲ್ಪಕಲೆ, ಸಾಬೂನು ಕಲ್ಲಿನ ಕೆತ್ತನೆ

**ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ (1336-1646):**
• ಸ್ಥಾಪಕರು: ಹರಿಹರ & ಬುಕ್ಕ (ವಿಜಯನಗರ/ಹಂಪಿ)
• ರಾಜವಂಶಗಳು: ಸಂಗಮ, ಸಾಳುವ, ತುಳುವ, ಅರವೀಡು
• **ಕೃಷ್ಣದೇವರಾಯ** (1509-1529): ಸುವರ್ಣ ಯುಗ, ಅಷ್ಟದಿಗ್ಗಜರು
• ತಾಳೀಕೋಟೆ ಯುದ್ಧ (1565): ವಿಜಯನಗರ ಪತನ
• ಹಂಪಿ: UNESCO ವಿಶ್ವ ಪರಂಪರೆ ತಾಣ

**ಬಹಮನಿ ಸುಲ್ತಾನರು (1347-1527):**
• ಗುಲ್ಬರ್ಗಾ → ಬೀದರ್ (ರಾಜಧಾನಿಗಳು)
• ನಂತರ 5 ಶಾಹಿ ರಾಜ್ಯಗಳಾಗಿ ಒಡೆದವು

**ಮೈಸೂರು ಸಂಸ್ಥಾನ:**
• ಒಡೆಯರ್ ವಂಶ (ರಾಜ ಒಡೆಯರ್)
• ಹೈದರ್ ಅಲಿ & ಟಿಪ್ಪು ಸುಲ್ತಾನ್`,
    lesson_en:`🏯 **Hoysalas (1000-1346 CE):**
• Vishnuvardhana; Belur Chennakeshava, Halebidu Hoysaleshwara
• World-famous soapstone sculpture

**Vijayanagara Empire (1336-1646):**
• Founders: Harihara & Bukka (Hampi)
• Dynasties: Sangama, Saluva, Tuluva, Aravidu
• **Krishnadevaraya** (1509-1529): Golden Age, Ashtadiggajas
• Battle of Talikota (1565): Fall of Vijayanagara
• Hampi: UNESCO World Heritage

**Bahmani Sultanate (1347-1527):** → 5 Deccan Sultanates

**Mysore Kingdom:** Wodeyars, Hyder Ali & Tipu Sultan`,
  },

  tipu_kittur: {
    id:'tipu_kittur', subject:'history', paper:1,
    title_kn:'ಟಿಪ್ಪು ಸುಲ್ತಾನ್, ಚೆನ್ನಮ್ಮ & ಸ್ವಾತಂತ್ರ್ಯ ಹೋರಾಟ', title_en:'Tipu Sultan, Chennamma & Freedom Struggle',
    lesson_kn:`🐅 **ಟಿಪ್ಪು ಸುಲ್ತಾನ್ (1750-1799):**
• 'ಮೈಸೂರಿನ ಹುಲಿ'; 4 ಆಂಗ್ಲೋ-ಮೈಸೂರು ಯುದ್ಧಗಳು
• ಶ್ರೀರಂಗಪಟ್ಟಣ ಒಪ್ಪಂದ (1792); 1799 ರಲ್ಲಿ ಶ್ರೀರಂಗಪಟ್ಟಣದಲ್ಲಿ ಮರಣ
• ರಾಕೆಟ್ ತಂತ್ರಜ್ಞಾನದ ಆದ್ಯ ಪ್ರವರ್ತಕ

👑 **ಕಿತ್ತೂರು ರಾಣಿ ಚೆನ್ನಮ್ಮ (1778-1829):**
• 1824 ರಲ್ಲಿ ಬ್ರಿಟಿಷರ ವಿರುದ್ಧ ದಂಗೆ
• ಸಂಗೊಳ್ಳಿ ರಾಯಣ್ಣ - ಸೇನಾಪತಿ

**ಕರ್ನಾಟಕದ ಸ್ವಾತಂತ್ರ್ಯ ಹೋರಾಟ:**
• **ಕರ್ನಾಟಕ ಏಕೀಕರಣ:** ಆಲೂರು ವೆಂಕಟರಾಯ ('ಕರ್ನಾಟಕ ಕುಲಪುರೋಹಿತ')
• 1956: ಮೈಸೂರು ರಾಜ್ಯ ರಚನೆ → 1973: 'ಕರ್ನಾಟಕ' ಮರುನಾಮಕರಣ
• ಪ್ರಮುಖ ಸ್ವಾತಂತ್ರ್ಯ ಹೋರಾಟಗಾರರು: ಕಾರ್ನಾಡ್ ಸದಾಶಿವ ರಾವ್, ಎನ್.ಎಸ್. ಹರ್ಡೀಕರ್`,
    lesson_en:`🐅 **Tipu Sultan (1750-1799):**
• 'Tiger of Mysore'; 4 Anglo-Mysore Wars
• Rocket technology pioneer; died at Srirangapatna 1799

👑 **Kittur Rani Chennamma (1778-1829):**
• Revolt against British in 1824
• Sangolli Rayanna - commander

**Karnataka Freedom Struggle:**
• **Unification:** Aluru Venkataraya ('Karnataka Kulapurohita')
• 1956: Mysore State → 1973: renamed 'Karnataka'
• Freedom fighters: Karnad Sadashiva Rao, N.S. Hardikar`,
  },

  modern_india: {
    id:'modern_india', subject:'history', paper:1,
    title_kn:'ಆಧುನಿಕ ಭಾರತದ ಇತಿಹಾಸ', title_en:'Modern Indian History',
    lesson_kn:`🇮🇳 **ಭಾರತೀಯ ರಾಷ್ಟ್ರೀಯ ಚಳುವಳಿ**

• INC ಸ್ಥಾಪನೆ: 1885 (A.O. ಹ್ಯೂಮ್); ಮೊದಲ ಅಧ್ಯಕ್ಷ: W.C. ಬ್ಯಾನರ್ಜಿ
• ಬಂಗಾಳ ವಿಭಜನೆ (1905) → ಸ್ವದೇಶಿ ಚಳುವಳಿ
• ಮುಸ್ಲಿಂ ಲೀಗ್ (1906); ಮಿಂಟೋ-ಮಾರ್ಲೆ (1909); ಮಾಂಟೆಗು-ಚೆಮ್ಸ್‌ಫೋರ್ಡ್ (1919)
• **ಜಲಿಯನ್‌ವಾಲಾ ಬಾಗ್** (ಏಪ್ರಿಲ್ 13, 1919) - ಜನರಲ್ ಡೈಯರ್
• **ಅಸಹಕಾರ ಚಳುವಳಿ** (1920-22)
• ಸೈಮನ್ ಆಯೋಗ (1928) → 'ಸೈಮನ್ ಗೋ ಬ್ಯಾಕ್'
• **ಉಪ್ಪಿನ ಸತ್ಯಾಗ್ರಹ/ದಂಡಿ ಮಾರ್ಚ್** (ಮಾರ್ಚ್ 12, 1930)
• ಗೋಲ್ ಮೇಜಿನ ಪರಿಷತ್ತುಗಳು; **ಕ್ರಿಪ್ಸ್ ಮಿಷನ್** (1942)
• **ಭಾರತ ಬಿಟ್ಟು ತೊಲಗಿ** (ಆಗಸ್ಟ್ 8, 1942)
• ಕ್ಯಾಬಿನೆಟ್ ಮಿಷನ್ (1946)
• **ಸ್ವಾತಂತ್ರ್ಯ:** ಆಗಸ್ಟ್ 15, 1947 (ಲಾರ್ಡ್ ಮೌಂಟ್‌ಬ್ಯಾಟನ್ - ಕೊನೆಯ ವೈಸ್‌ರಾಯ್)`,
    lesson_en:`🇮🇳 **Indian National Movement**

• INC founded: 1885 (A.O. Hume); 1st President: W.C. Banerjee
• Bengal Partition (1905) → Swadeshi
• Jallianwala Bagh (Apr 13, 1919) - General Dyer
• Non-Cooperation (1920-22)
• Simon Commission (1928) → 'Simon Go Back'
• Dandi March (Mar 12, 1930)
• Quit India (Aug 8, 1942)
• Independence: Aug 15, 1947 (Lord Mountbatten - last Viceroy)`,
  },

  freedom_karnataka: {
    id:'freedom_karnataka', subject:'history', paper:1,
    title_kn:'ಕರ್ನಾಟಕ ಏಕೀಕರಣ & ಸ್ವಾತಂತ್ರ್ಯ', title_en:'Karnataka Unification & Freedom',
    lesson_kn:`🗺️ **ಕರ್ನಾಟಕ ಏಕೀಕರಣ ಚಳುವಳಿ:**
• 1956 ರ ಮೊದಲು ಕನ್ನಡ ಭಾಷಿಕರು 5 ಆಡಳಿತ ವಿಭಾಗಗಳಲ್ಲಿ ಹಂಚಿಹೋಗಿದ್ದರು
• ಏಕೀಕರಣದ ಪಿತಾಮಹ: ಆಲೂರು ವೆಂಕಟರಾಯ ('ಕರ್ನಾಟಕ ಕುಲಪುರೋಹಿತ')
• ನವೆಂಬರ್ 1, 1956: ಮೈಸೂರು ರಾಜ್ಯ ರಚನೆ (ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ)
• ನವೆಂಬರ್ 1, 1973: 'ಕರ್ನಾಟಕ' ಎಂದು ಮರುನಾಮಕರಣ (ದೇವರಾಜ ಅರಸು)

**ಕರ್ನಾಟಕದ ಐತಿಹಾಸಿಕ ಸ್ಥಳಗಳು:**
• ಹಂಪಿ (ವಿಜಯನಗರ) • ಪಟ್ಟದಕಲ್ಲು • ಬಾದಾಮಿ • ಐಹೊಳೆ
• ಶ್ರವಣಬೆಳಗೊಳ • ಬೇಲೂರು • ಹಳೇಬೀಡು • ಮೈಸೂರು ಅರಮನೆ
• ಗೋಲ್ ಗುಂಬಜ್ (ಬಿಜಾಪುರ) • ಶ್ರೀರಂಗಪಟ್ಟಣ`,
    lesson_en:`🗺️ **Karnataka Unification:**
• Pre-1956: Kannada speakers spread across 5 admin units
• Father of Unification: Aluru Venkataraya
• Nov 1, 1956: Mysore State formed (Karnataka Rajyotsava)
• Nov 1, 1973: Renamed 'Karnataka' (Devaraj Urs)

**Historic Sites:** Hampi, Pattadakallu, Badami, Aihole, Shravanabelagola, Belur, Halebidu, Mysore Palace, Gol Gumbaz, Srirangapatna`,
  },

  // === GEOGRAPHY (abbreviated for space - full lessons still in data) ===
  physical_india: {
    id:'physical_india', subject:'geography', paper:1,
    title_kn:'ಭಾರತದ ಭೌತಿಕ ಲಕ್ಷಣಗಳು', title_en:'Physical Features of India',
    lesson_kn:`🗺️ **ಭಾರತದ 6 ಭೌತಿಕ ವಿಭಾಗಗಳು:**
1. ಉತ್ತರದ ಪರ್ವತಗಳು (ಹಿಮಾಲಯ - 3 ಸಮಾನಾಂತರ ಶ್ರೇಣಿಗಳು: ಹಿಮಾದ್ರಿ, ಹಿಮಾಚಲ, ಶಿವಾಲಿಕ್)
2. ಉತ್ತರದ ಮೈದಾನ (ಸಿಂಧೂ-ಗಂಗಾ-ಬ್ರಹ್ಮಪುತ್ರ ಜಲಾನಯನ)
3. ಪರ್ಯಾಯದ್ವೀಪ ಪ್ರಸ್ಥಭೂಮಿ (ದಖನ್ ಪ್ರಸ್ಥಭೂಮಿ)
4. ಕರಾವಳಿ ಮೈದಾನಗಳು (ಪಶ್ಚಿಮ: ಕೊಂಕಣ, ಕೆನರಾ, ಮಲಬಾರ್; ಪೂರ್ವ: ಕೋರಮಂಡಲ)
5. ಮರುಭೂಮಿ (ಥಾರ್)
6. ದ್ವೀಪಗಳು (ಅಂಡಮಾನ್ & ನಿಕೋಬಾರ್, ಲಕ್ಷದ್ವೀಪ)

**ಪ್ರಮುಖ ಪರ್ವತ ಶ್ರೇಣಿಗಳು:**
• ಅರಾವಳಿ (ವಿಶ್ವದ ಅತ್ಯಂತ ಪ್ರಾಚೀನ ಮಡಿಕೆ ಪರ್ವತ)
• ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು (ಸಹ್ಯಾದ್ರಿ) - UNESCO ವಿಶ್ವ ಪರಂಪರೆ
• ಪೂರ್ವ ಘಟ್ಟಗಳು; ವಿಂಧ್ಯ & ಸಾತ್ಪುರಾ
• ದಕ್ಷಿಣದ ಗಿರಿಗಳು: ನೀಲಗಿರಿ, ಅಣ್ಣಾಮಲೈ, ಏಲಕ್ಕಿ`,
    lesson_en:`🗺️ **6 Physical Divisions:**
1. Northern Mountains (Himalayas - 3 parallel ranges)
2. Northern Plains (Indus-Ganga-Brahmaputra)
3. Peninsular Plateau (Deccan)
4. Coastal Plains (West & East)
5. Desert (Thar)
6. Islands (Andaman & Nicobar, Lakshadweep)

**Major Ranges:** Aravalli (oldest fold), Western Ghats (UNESCO), Eastern Ghats, Vindhya & Satpura`,
  },

  rivers_india: {
    id:'rivers_india', subject:'geography', paper:1,
    title_kn:'ಭಾರತದ ನದಿ ವ್ಯವಸ್ಥೆಗಳು', title_en:'Indian River Systems',
    lesson_kn:`🌊 **ಹಿಮಾಲಯ ನದಿಗಳು (ಶಾಶ್ವತ/ನಿತ್ಯ):**
• ಸಿಂಧೂ, ಗಂಗಾ (ಭಾಗೀರಥಿ+ಅಲಕನಂದಾ), ಯಮುನಾ, ಬ್ರಹ್ಮಪುತ್ರ

**ಪರ್ಯಾಯದ್ವೀಪ ನದಿಗಳು (ಮಳೆಯಾಧಾರಿತ):**
• ಪೂರ್ವಾಭಿಮುಖ: ಗೋದಾವರಿ (ದಕ್ಷಿಣ ಗಂಗಾ), ಕೃಷ್ಣಾ, ಕಾವೇರಿ, ಮಹಾನದಿ
• ಪಶ್ಚಿಮಾಭಿಮುಖ: ನರ್ಮದಾ, ತಾಪ್ತಿ (ಇವೆರಡು ಮಾತ್ರ - ಭ್ರಂಶ ಕಣಿವೆಗಳು)

**ಪ್ರಮುಖ ಜಲಪಾತಗಳು:**
• ಜೋಗ (ಶರಾವತಿ) - 253m, ಭಾರತದ ಅತಿ ಎತ್ತರದ ಪ್ಲಂಜ್
• ಶಿವನಸಮುದ್ರ (ಕಾವೇರಿ); ದೂಧ್ ಸಾಗರ್`,
    lesson_en:`🌊 **Himalayan Rivers (Perennial):** Indus, Ganga, Yamuna, Brahmaputra

**Peninsular Rivers (Rain-fed):**
• East-flowing: Godavari (Dakshin Ganga), Krishna, Kaveri, Mahanadi
• West-flowing: Narmada, Tapti (only two - rift valleys)

**Major Waterfalls:** Jog (Sharavati) - 253m; Shivanasamudra; Dudhsagar`,
  },

  karnataka_rivers: {
    id:'karnataka_rivers', subject:'geography', paper:1,
    title_kn:'ಕರ್ನಾಟಕದ ನದಿಗಳು ಮತ್ತು ಅಣೆಕಟ್ಟುಗಳು', title_en:'Karnataka Rivers & Dams',
    lesson_kn:`🌊 **ಕರ್ನಾಟಕದ ಪ್ರಮುಖ ನದಿಗಳು:**

**ಕಾವೇರಿ (Cauvery):** ತಲಕಾವೇರಿ (ಕೊಡಗು); 805 ಕಿಮೀ
• ಅಣೆಕಟ್ಟುಗಳು: KRS, ಕಬಿನಿ, ಹಾರಂಗಿ, ಹೇಮಾವತಿ

**ಕೃಷ್ಣಾ (Krishna):** ಮಹಾಬಲೇಶ್ವರ; ಉಪನದಿಗಳು - ಘಟಪ್ರಭಾ, ಮಲಪ್ರಭಾ, ತುಂಗಭದ್ರಾ, ಭೀಮಾ
• ಅಣೆಕಟ್ಟುಗಳು: ಆಲಮಟ್ಟಿ (ಲಾಲ್ ಬಹದ್ದೂರ್ ಶಾಸ್ತ್ರೀ), ನಾರಾಯಣಪುರ

**ತುಂಗಭದ್ರಾ:** ತುಂಗಾ + ಭದ್ರಾ ಸಂಗಮ; TB ಅಣೆಕಟ್ಟು (ಹಂಪಿ ಬಳಿ)

**ಪಶ್ಚಿಮಾಭಿಮುಖ:** ಶರಾವತಿ (ಜೋಗ), ನೇತ್ರಾವತಿ, ಕಾಳಿ, ಅಘನಾಶಿನಿ

**ಕರ್ನಾಟಕದ ಜಲಪಾತಗಳು:** ಜೋಗ (253m), ಶಿವನಸಮುದ್ರ, ಅಬ್ಬೆ, ಇರುಪ್ಪು, ಮಾಗೋಡು`,
    lesson_en:`🌊 **Major Karnataka Rivers:**

**Kaveri:** Talakaveri (Kodagu); 805 km; Dams: KRS, Kabini, Harangi

**Krishna:** Mahabaleshwar; Tributaries: Ghataprabha, Malaprabha, Tungabhadra, Bhima
• Dams: Almatti, Narayanpur

**Tungabhadra:** Tunga + Bhadra; TB Dam (near Hampi)

**West-flowing:** Sharavati (Jog Falls), Netravati, Kali

**Waterfalls:** Jog (253m), Shivanasamudra, Abbey, Iruppu, Magodu`,
  },

  karnataka_districts: {
    id:'karnataka_districts', subject:'geography', paper:1,
    title_kn:'ಕರ್ನಾಟಕದ ಜಿಲ್ಲೆಗಳು ಮತ್ತು ವಿಭಾಗಗಳು', title_en:'Karnataka Districts & Divisions',
    lesson_kn:`🏙️ **ಕರ್ನಾಟಕ: 31 ಜಿಲ್ಲೆಗಳು - 4 ವಿಭಾಗಗಳು**

**ಬೆಂಗಳೂರು ವಿಭಾಗ (9):** ಬೆಂಗಳೂರು ನಗರ, ಬೆಂ. ಗ್ರಾಮಾಂತರ, ಚಿಕ್ಕಬಳ್ಳಾಪುರ, ಕೋಲಾರ, ರಾಮನಗರ, ತುಮಕೂರು, ಚಿತ್ರದುರ್ಗ, ದಾವಣಗೆರೆ, ಶಿವಮೊಗ್ಗ

**ಮೈಸೂರು ವಿಭಾಗ (8):** ಮೈಸೂರು, ಮಂಡ್ಯ, ಚಾಮರಾಜನಗರ, ಹಾಸನ, ಚಿಕ್ಕಮಗಳೂರು, ಕೊಡಗು, ದ.ಕನ್ನಡ, ಉಡುಪಿ

**ಬೆಳಗಾವಿ ವಿಭಾಗ (7):** ಬೆಳಗಾವಿ, ಧಾರವಾಡ, ಗದಗ, ಹಾವೇರಿ, ಉ.ಕನ್ನಡ, ವಿಜಯಪುರ, ಬಾಗಲಕೋಟೆ

**ಕಲಬುರಗಿ ವಿಭಾಗ (7):** ಕಲಬುರಗಿ, ಬೀದರ್, ರಾಯಚೂರು, ಕೊಪ್ಪಳ, ಯಾದಗಿರಿ, ಬಳ್ಳಾರಿ, ವಿಜಯನಗರ

**ಪ್ರಮುಖ ಸಂಗತಿಗಳು:**
• ವಿಸ್ತೀರ್ಣ: 1,91,791 ಚ.ಕಿಮೀ (8ನೇ); ರಾಜಧಾನಿ: ಬೆಂಗಳೂರು
• ಇತ್ತೀಚಿನ ಜಿಲ್ಲೆ: ವಿಜಯನಗರ (2020) - ಬಳ್ಳಾರಿಯಿಂದ`,
    lesson_en:`🏙️ **31 Districts - 4 Divisions**

**Bengaluru (9):** B'lore Urban/Rural, Chikkaballapura, Kolar, Ramanagara, Tumakuru, Chitradurga, Davanagere, Shivamogga

**Mysuru (8):** Mysuru, Mandya, Chamarajanagar, Hassan, Chikkamagaluru, Kodagu, D.Kannada, Udupi

**Belagavi (7):** Belagavi, Dharwad, Gadag, Haveri, U.Kannada, Vijayapura, Bagalkote

**Kalaburagi (7):** Kalaburagi, Bidar, Raichur, Koppal, Yadgiri, Ballari, Vijayanagara

• Area: 1,91,791 sq km (8th); Capital: Bengaluru
• Newest district: Vijayanagara (2020)`,
  },

  karnataka_climate: {
    id:'karnataka_climate', subject:'geography', paper:1,
    title_kn:'ಕರ್ನಾಟಕದ ಹವಾಮಾನ ಮತ್ತು ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲಗಳು', title_en:'KA Climate & Natural Resources',
    lesson_kn:`🌤️ **ಕರ್ನಾಟಕದ ಹವಾಮಾನ:** ಉಷ್ಣವಲಯದ ಮಾನ್ಸೂನ್

**ಋತುಗಳು:** ಬೇಸಿಗೆ (ಮಾರ್ಚ್-ಮೇ: 25-40°C), ಮುಂಗಾರು (ಜೂನ್-ಸೆಪ್), ಹಿಂಗಾರು (ಅಕ್ಟೋ-ನವ), ಚಳಿಗಾಲ (ಡಿಸೆಂ-ಫೆಬ್ರ: 10-25°C)

**ಮಳೆ ಹಂಚಿಕೆ:** ಕರಾವಳಿ (300-400 ಸೆಂಮೀ), ಮಲೆನಾಡು (200-300), ಉತ್ತರ ಒಳನಾಡು (50-70)

**ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲಗಳು:**
• ಚಿನ್ನ: ಕೋಲಾರ ಚಿನ್ನದ ಗಣಿ (KGF), ಹಟ್ಟಿ (ರಾಯಚೂರು)
• ಕಬ್ಬಿಣದ ಅದಿರು: ಬಳ್ಳಾರಿ, ಚಿತ್ರದುರ್ಗ
• ಮ್ಯಾಂಗನೀಸ್: ಶಿವಮೊಗ್ಗ, ಚಿತ್ರದುರ್ಗ
• ಕಾಫಿ: ಕೊಡಗು, ಚಿಕ್ಕಮಗಳೂರು (ಭಾರತದ 70%+)
• ರೇಷ್ಮೆ: ಮೈಸೂರು, ರಾಮನಗರ`,
    lesson_en:`🌤️ **Karnataka Climate:** Tropical monsoon

**Seasons:** Summer (Mar-May), Monsoon (Jun-Sep), Post-monsoon (Oct-Nov), Winter (Dec-Feb)

**Rainfall:** Coastal (300-400cm), Malnad (200-300), North interior (50-70)

**Natural Resources:**
• Gold: KGF, Hatti (Raichur)
• Iron ore: Ballari, Chitradurga
• Coffee: Kodagu, Chikkamagaluru (70%+ of India)
• Silk: Mysuru, Ramanagara`,
  },

  // === RURAL / ECONOMY / ENVIRONMENT (abbreviated entries) ===
  panchayat_raj: {
    id:'panchayat_raj', subject:'rural', paper:1,
    title_kn:'ಪಂಚಾಯತ್ ರಾಜ್ ವ್ಯವಸ್ಥೆ', title_en:'Panchayat Raj System',
    lesson_kn:`🏘️ **73ನೇ ತಿದ್ದುಪಡಿ (1992):** ಪಂಚಾಯತ್ ರಾಜ್‌ಗೆ ಸಾಂವಿಧಾನಿಕ ಸ್ಥಾನಮಾನ; ಭಾಗ IX (ಅನು. 243-243O)

**3 ಹಂತಗಳು:** ಗ್ರಾಮ ಪಂಚಾಯತ್ → ತಾಲ್ಲೂಕು ಪಂಚಾಯತ್ → ಜಿಲ್ಲಾ ಪಂಚಾಯತ್

**ಪ್ರಮುಖ ಲಕ್ಷಣಗಳು:**
• ಪ್ರತಿ 5 ವರ್ಷಗಳಿಗೊಮ್ಮೆ ನಿಯಮಿತ ಚುನಾವಣೆ
• SC/ST ಮತ್ತು ಮಹಿಳೆಯರಿಗೆ 1/3 ಮೀಸಲಾತಿ
• ರಾಜ್ಯ ಹಣಕಾಸು ಆಯೋಗ; ಗ್ರಾಮ ಸಭಾ
• 29 ವಿಷಯಗಳು (11ನೇ ಅನುಸೂಚಿ)

**ಕರ್ನಾಟಕ ಪಂಚಾಯತ್ ರಾಜ್ ಕಾಯ್ದೆ 1993**`,
    lesson_en:`🏘️ **73rd Amendment (1992):** Constitutional status; Part IX (Art 243-243O)

**3 Tiers:** Gram Panchayat → Taluk Panchayat → Zilla Panchayat

**Features:** Elections every 5 years, 1/3 SC/ST & women reservation, State Finance Commission, Gram Sabha, 29 subjects (11th Schedule)`,
  },

  rural_dev: {
    id:'rural_dev', subject:'rural', paper:1,
    title_kn:'ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಯೋಜನೆಗಳು', title_en:'Rural Development Schemes',
    lesson_kn:`🌾 **ಕೇಂದ್ರ ಯೋಜನೆಗಳು:**
• MGNREGA (2005): 100 ದಿನಗಳ ಖಾತ್ರಿ ಉದ್ಯೋಗ
• PMGSY, PM Awas Yojana (Gramin), Swachh Bharat Mission
• NRLM (DAY-NRLM), PM-KISAN (₹6000/ವರ್ಷ)

**ಕರ್ನಾಟಕದ 5 ಗ್ಯಾರಂಟಿ ಯೋಜನೆಗಳು:**
1. ಶಕ್ತಿ - ಮಹಿಳೆಯರಿಗೆ ಉಚಿತ ಬಸ್ ಪ್ರಯಾಣ
2. ಗೃಹ ಜ್ಯೋತಿ - 200 ಯೂನಿಟ್ ಉಚಿತ ವಿದ್ಯುತ್
3. ಗೃಹ ಲಕ್ಷ್ಮೀ - ಮಹಿಳಾ ಮುಖ್ಯಸ್ಥರಿಗೆ ₹2000/ತಿಂಗಳು
4. ಅನ್ನ ಭಾಗ್ಯ - 10 ಕೆಜಿ ಉಚಿತ ಅಕ್ಕಿ
5. ಯುವನಿಧಿ - ನಿರುದ್ಯೋಗ ಭತ್ಯೆ`,
    lesson_en:`🌾 **Central Schemes:** MGNREGA (100 days), PMGSY, PM Awas, Swachh Bharat, PM-KISAN

**Karnataka 5 Guarantees:**
1. Shakti - free bus for women
2. Gruha Jyoti - 200 units free electricity
3. Gruha Lakshmi - ₹2000/month
4. Anna Bhagya - 10 kg free rice
5. Yuva Nidhi - unemployment allowance`,
  },

  coop_societies: {
    id:'coop_societies', subject:'rural', paper:1,
    title_kn:'ಸಹಕಾರ ಸಂಘಗಳು', title_en:'Cooperative Societies',
    lesson_kn:`🤝 **ಸಹಕಾರ ಚಳುವಳಿ:**
• ಪ್ರಥಮ ಸಹಕಾರ ಕಾಯ್ದೆ: 1904; 97ನೇ ತಿದ್ದುಪಡಿ (2011) - ಸಾಂವಿಧಾನಿಕ ಸ್ಥಾನಮಾನ (ಭಾಗ IXB)

**ಪ್ರಕಾರಗಳು:** PACS (ಪ್ರಾಥಮಿಕ ಕೃಷಿ ಸಾಲ), ಹಾಲು ಉತ್ಪಾದಕ, ಮೀನುಗಾರಿಕೆ, ನೇಕಾರ, ಗ್ರಾಹಕ

**ಕರ್ನಾಟಕದಲ್ಲಿ:**
• KMF (ನಂದಿನಿ) - ಅಮುಲ್ ನಂತರ ಭಾರತದ 2ನೇ ಅತಿದೊಡ್ಡ
• ಕರ್ನಾಟಕ ರಾಜ್ಯ ಸಹಕಾರ ಅಪೆಕ್ಸ್ ಬ್ಯಾಂಕ್
• DCC ಬ್ಯಾಂಕ್‌ಗಳು`,
    lesson_en:`🤝 **Cooperative Movement:**
• First Act: 1904; 97th Amendment (2011) - constitutional status (Part IXB)

**Types:** PACS, Dairy, Fishermen, Weavers, Consumer

**In Karnataka:** KMF (Nandini) - 2nd largest after Amul; Apex Bank; DCC Banks`,
  },

  karnataka_economy: {
    id:'karnataka_economy', subject:'economy', paper:1,
    title_kn:'ಕರ್ನಾಟಕದ ಆರ್ಥಿಕತೆ', title_en:'Karnataka Economy',
    lesson_kn:`💰 **GSDP:** ಭಾರತದಲ್ಲಿ 4ನೇ ಸ್ಥಾನ (~₹25 ಲಕ್ಷ ಕೋಟಿ)

**ಕ್ಷೇತ್ರವಾರು ಕೊಡುಗೆ:** ಕೃಷಿ (~13%), ಕೈಗಾರಿಕೆ (~25%), ಸೇವೆಗಳು (~62%)

**ಪ್ರಮುಖ ಉದ್ಯಮಗಳು:**
• IT/BT: ಬೆಂಗಳೂರು (ಭಾರತದ ಸಿಲಿಕಾನ್ ವ್ಯಾಲಿ, 40% IT ರಫ್ತು)
• ಉಕ್ಕು: JSW (ಬಳ್ಳಾರಿ); ಆಟೊಮೊಬೈಲ್: ಟೊಯೋಟಾ, ವೋಲ್ವೋ
• ವಿಮಾನಯಾನ: HAL, ISRO; ಜೈವಿಕ ತಂತ್ರಜ್ಞಾನ

**ಬಜೆಟ್ 2025-26:** ~₹3.2 ಲಕ್ಷ ಕೋಟಿ ರಾಜ್ಯ ಬಜೆಟ್`,
    lesson_en:`💰 **GSDP:** 4th in India (~₹25 lakh crore)

**Sector-wise:** Agriculture (~13%), Industry (~25%), Services (~62%)

**Major Industries:** IT/BT Bengaluru (40% IT exports), JSW Steel, Toyota, Volvo, HAL, ISRO, Biotech`,
  },

  govt_schemes: {
    id:'govt_schemes', subject:'economy', paper:1,
    title_kn:'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ಯೋಜನಾ ಆಯೋಗ', title_en:'Govt Schemes & Planning',
    lesson_kn:`📋 **ಪಂಚವಾರ್ಷಿಕ ಯೋಜನೆಗಳು:**
• ಮೊದಲ (1951-56): ಕೃಷಿ; ಎರಡನೇ (1956-61): ಕೈಗಾರಿಕೆ (ಮಹಲನೊಬಿಸ್)
• NITI ಆಯೋಗ (2015): ಯೋಜನಾ ಆಯೋಗದ ಸ್ಥಾನದಲ್ಲಿ

**ಕೇಂದ್ರ ಯೋಜನೆಗಳು:**
• PM-KISAN, Ayushman Bharat (PM-JAY), Jal Jeevan Mission
• Digital India, Make in India, Skill India, Start-up India

**ಕರ್ನಾಟಕ ಯೋಜನೆಗಳು:**
• ಮತ್ಸ್ಯ ಆಶ್ರಯ, ವಿದ್ಯಾಸಿರಿ, ಸ್ವಾವಲಂಬಿ ಸಾರಥಿ`,
    lesson_en:`📋 **Five Year Plans:** 1st (Agri), 2nd (Industry-Mahalanobis); NITI Aayog (2015)

**Central Schemes:** PM-KISAN, Ayushman Bharat, Jal Jeevan, Digital India, Make in India

**Karnataka Schemes:** Matsya Ashraya, Vidyasiri, Swavalambi Sarathi`,
  },

  environment: {
    id:'environment', subject:'environment', paper:1,
    title_kn:'ಪರಿಸರ ಸಮಸ್ಯೆಗಳು ಮತ್ತು ಸಂರಕ್ಷಣೆ', title_en:'Environment Issues & Conservation',
    lesson_kn:`🌍 **ಪ್ರಮುಖ ಪರಿಸರ ಸಮಸ್ಯೆಗಳು:** ಜಾಗತಿಕ ತಾಪಮಾನ, ಹವಾಮಾನ ಬದಲಾವಣೆ, ಅರಣ್ಯನಾಶ, ಜಲ/ವಾಯು ಮಾಲಿನ್ಯ

**ಪ್ರಮುಖ ಒಪ್ಪಂದಗಳು:**
• ಕ್ಯೋಟೋ ಪ್ರೋಟೋಕಾಲ್ (1997); ಪ್ಯಾರಿಸ್ ಒಪ್ಪಂದ (2015) - 1.5°C ಗುರಿ
• ಮಾಂಟ್ರಿಯಲ್ ಪ್ರೋಟೋಕಾಲ್ (1987) - ಓಜೋನ್ ಪದರ
• COP28 (2023 - UAE), COP29 (2024)

**ಭಾರತದ ಪರಿಸರ ಕಾಯ್ದೆಗಳು:**
• ಪರಿಸರ ಸಂರಕ್ಷಣಾ ಕಾಯ್ದೆ (1986); ವನ್ಯಜೀವಿ ಸಂರಕ್ಷಣಾ ಕಾಯ್ದೆ (1972)
• ಅರಣ್ಯ ಸಂರಕ್ಷಣಾ ಕಾಯ್ದೆ (1980); ಜಲ/ವಾಯು ಕಾಯ್ದೆಗಳು (1974/1981)`,
    lesson_en:`🌍 **Issues:** Global warming, climate change, deforestation, pollution

**Agreements:** Kyoto Protocol (1997), Paris Agreement (2015), Montreal Protocol (1987)

**Indian Laws:** Environment Protection Act (1986), Wildlife Protection (1972), Forest Conservation (1980)`,
  },

  biodiversity_karnataka: {
    id:'biodiversity_karnataka', subject:'environment', paper:1,
    title_kn:'ಕರ್ನಾಟಕದ ಜೀವವೈವಿಧ್ಯ ಮತ್ತು ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನಗಳು', title_en:'KA Biodiversity & National Parks',
    lesson_kn:`🌿 **ಕರ್ನಾಟಕದ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನಗಳು (5):**
1. ಬಂಡೀಪುರ (ಹುಲಿ ಯೋಜನೆ - 1973)
2. ನಾಗರಹೊಳೆ (ರಾಜೀವ್ ಗಾಂಧಿ NP)
3. ಬನ್ನೇರುಘಟ್ಟ
4. ಕುದುರೆಮುಖ
5. ಅಣಶಿ (ಕಾಳಿ ಹುಲಿ ಸಂರಕ್ಷಿತ)

**ವನ್ಯಜೀವಿ ಧಾಮಗಳು:** ಭದ್ರಾ, ದಾಂಡೇಲಿ, ರಂಗನತಿಟ್ಟು (ಪಕ್ಷಿಧಾಮ), ಭೀಮಗಡ, ಕಾವೇರಿ

**ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು:** UNESCO ವಿಶ್ವ ಪರಂಪರೆ; 39 ಕರ್ನಾಟಕದ ಸ್ಥಳಗಳು

**ರಾಜ್ಯ ಚಿಹ್ನೆಗಳು:**
• ಪ್ರಾಣಿ: ಆನೆ • ಪಕ್ಷಿ: ನೀಲಕಂಠ • ವೃಕ್ಷ: ಶ್ರೀಗಂಧ • ಪುಷ್ಪ: ಕಮಲ`,
    lesson_en:`🌿 **5 National Parks:** Bandipur, Nagarhole, Bannerghatta, Kudremukh, Anshi

**Sanctuaries:** Bhadra, Dandeli, Ranganathittu (birds), Bhimgad, Kaveri

**Western Ghats:** UNESCO heritage; 39 sites in KA

**State Symbols:** Animal: Elephant; Bird: Indian Roller; Tree: Sandalwood; Flower: Lotus`,
  },

  current_affairs: {
    id:'current_affairs', subject:'current', paper:1,
    title_kn:'ಪ್ರಚಲಿತ ಘಟನೆಗಳು 2025-26', title_en:'Current Affairs 2025-26',
    lesson_kn:`📰 **ಪ್ರಮುಖ ನೇಮಕಾತಿಗಳು:**
• ರಾಷ್ಟ್ರಪತಿ: ದ್ರೌಪದಿ ಮುರ್ಮು; ಉಪರಾಷ್ಟ್ರಪತಿ: ಜಗದೀಪ್ ಧನ್ಖರ್
• ಪ್ರಧಾನಿ: ನರೇಂದ್ರ ಮೋದಿ; CJI: ಸಂಜೀವ್ ಖನ್ನಾ (ನ. 2024)
• CEC: ಜ್ಞಾನೇಶ್ ಕುಮಾರ್; CAG: ಗಿರೀಶ್ ಚಂದ್ರ ಮುರ್ಮು
• RBI ಗವರ್ನರ್: ಸಂಜಯ್ ಮಲ್ಹೋತ್ರಾ (ಡಿಸೆಂ. 2024)

**ಕರ್ನಾಟಕ:**
• ಮುಖ್ಯಮಂತ್ರಿ: ಸಿದ್ದರಾಮಯ್ಯ; ರಾಜ್ಯಪಾಲ: ಥಾವರ್ ಚಂದ್ ಗೆಹ್ಲೋಟ್
• HC ಮುಖ್ಯ ನ್ಯಾಯಮೂರ್ತಿ: ಎನ್.ವಿ. ಅಂಜಾರಿಯಾ

**ಪ್ರಮುಖ ಘಟನೆಗಳು:**
• G20 ಅಧ್ಯಕ್ಷತೆ: ಭಾರತ (2023) → ಬ್ರೆಜಿಲ್ (2024) → ದಕ್ಷಿಣ ಆಫ್ರಿಕಾ (2025)
• ಕ್ರೀಡೆ: ಭಾರತ T20 ವಿಶ್ವಕಪ್ ಚಾಂಪಿಯನ್ (2024), ಒಲಿಂಪಿಕ್ಸ್ (ಪ್ಯಾರಿಸ್ 2024)
• ಚಂದ್ರಯಾನ-3 (2023), ಆದಿತ್ಯ-L1 (2023)
• ರಾಮ ಮಂದಿರ (ಅಯೋಧ್ಯೆ) ಉದ್ಘಾಟನೆ: ಜನವರಿ 22, 2024`,
    lesson_en:`📰 **Key Appointments:**
• President: Droupadi Murmu; VP: Jagdeep Dhankhar
• PM: Narendra Modi; CJI: Sanjiv Khanna (Nov 2024)
• RBI Governor: Sanjay Malhotra (Dec 2024)

**Karnataka:** CM: Siddaramaiah; Governor: Thawar Chand Gehlot

**Major Events:**
• G20 India (2023) → Brazil (2024) → South Africa (2025)
• India T20 World Cup Champion (2024), Olympics Paris 2024
• Chandrayaan-3 (2023), Aditya-L1, Ram Mandir (Jan 2024)`,
  },

  // === PAPER 2 TOPICS ===
  kannada_grammar: {
    id:'kannada_grammar', subject:'kannada', paper:2,
    title_kn:'ಕನ್ನಡ ವ್ಯಾಕರಣ', title_en:'Kannada Grammar',
    lesson_kn:`📝 **ವರ್ಣಮಾಲೆ:** ಸ್ವರಗಳು (13), ವ್ಯಂಜನಗಳು (34), ಯೋಗವಾಹಕಗಳು (2) = ಒಟ್ಟು 49

**ಸಂಧಿಗಳು:** ಲೋಪ ಸಂಧಿ, ಆಗಮ ಸಂಧಿ, ಆದೇಶ ಸಂಧಿ, ಗುಣ ಸಂಧಿ

**ಸಮಾಸಗಳು:** ತತ್ಪುರುಷ, ಕರ್ಮಧಾರಯ, ದ್ವಿಗು, ಬಹುವ್ರೀಹಿ, ದ್ವಂದ್ವ, ಅವ್ಯಯೀಭಾವ

**ವಿಭಕ್ತಿ ಪ್ರತ್ಯಯಗಳು (ಕಾರಕಗಳು):**
• ಪ್ರಥಮಾ (ಕರ್ತೃ) - -ಉ, ದ್ವಿತೀಯಾ (ಕರ್ಮ) - -ಅನ್ನು
• ತೃತೀಯಾ (ಕರಣ) - -ಇಂದ, ಚತುರ್ಥೀ (ಸಂಪ್ರದಾನ) - -ಇಗೆ
• ಪಂಚಮೀ (ಅಪಾದಾನ) - -ಇಂದ, ಷಷ್ಠೀ (ಸಂಬಂಧ) - -ಅ
• ಸಪ್ತಮೀ (ಅಧಿಕರಣ) - -ಅಲ್ಲಿ

**ಕಾಲಗಳು:** ಭೂತ, ವರ್ತಮಾನ, ಭವಿಷ್ಯತ್`,
    lesson_en:`📝 **Alphabet:** 13 vowels, 34 consonants, 2 yogavahakas = 49 total

**Sandhi (Junctions):** Lopa, Agama, Adesha, Guna

**Samasas (Compounds):** Tatpurusha, Karmadharaya, Dvigu, Bahuvrihi, Dvandva, Avyayibhava

**Cases (Vibhakti):** Nominative, Accusative, Instrumental, Dative, Ablative, Genitive, Locative

**Tenses:** Past, Present, Future`,
  },

  kannada_vocab: {
    id:'kannada_vocab', subject:'kannada', paper:2,
    title_kn:'ಕನ್ನಡ ಶಬ್ದಕೋಶ', title_en:'Kannada Vocabulary',
    lesson_kn:`📚 **ಸಮಾನಾರ್ಥಕ ಪದಗಳು:**
• ಮನೆ = ಗೃಹ, ನಿಲಯ, ವಸತಿ, ಸದನ, ಭವನ
• ಆಕಾಶ = ಗಗನ, ಬಾನು, ನಭ, ಆಂಬರ
• ನೀರು = ಜಲ, ಉದಕ, ವಾರಿ, ತೋಯ
• ಹೂವು = ಪುಷ್ಪ, ಕುಸುಮ, ಸುಮ, ಪ್ರಸೂನ
• ಸೂರ್ಯ = ರವಿ, ಭಾನು, ದಿನಕರ, ಆದಿತ್ಯ
• ಚಂದ್ರ = ಶಶಿ, ಇಂದು, ಸೋಮ, ನಿಶಾಕರ
• ಪರ್ವತ = ಬೆಟ್ಟ, ಗಿರಿ, ಅಚಲ, ಶೈಲ
• ಸಮುದ್ರ = ಸಾಗರ, ಕಡಲು, ಅಬ್ಧಿ, ಜಲಧಿ

**ವಿರುದ್ಧಾರ್ಥಕ ಪದಗಳು:**
• ದಿನ × ರಾತ್ರಿ; ಬೆಳಕು × ಕತ್ತಲೆ; ಸತ್ಯ × ಅಸತ್ಯ
• ಸ್ನೇಹ × ದ್ವೇಷ; ಸುಖ × ದುಃಖ; ಲಾಭ × ನಷ್ಟ
• ಜ್ಞಾನ × ಅಜ್ಞಾನ; ಶಾಂತಿ × ಅಶಾಂತಿ`,
    lesson_en:`📚 **Synonyms:** House (Mane=Gruha), Sky (Aakasha=Gagana), Water (Neeru=Jala), Flower (Hoovu=Pushpa), Sun (Surya=Ravi), Moon (Chandra=Shashi)

**Antonyms:** Day×Night, Light×Dark, Truth×Falsehood, Friend×Enemy, Profit×Loss`,
  },

  kannada_proverbs: {
    id:'kannada_proverbs', subject:'kannada', paper:2,
    title_kn:'ಕನ್ನಡ ಗಾದೆಗಳು', title_en:'Kannada Proverbs',
    lesson_kn:`💬 **ಪ್ರಮುಖ ಗಾದೆಗಳು:**

1. "ಕೈ ಕೆಸರಾದರೆ ಬಾಯಿ ಮೊಸರು" - ಶ್ರಮಪಟ್ಟರೆ ಫಲ ಸಿಗುತ್ತದೆ
2. "ಅಡಿಕೆಗೆ ಹೋದ ಮಾನ ಆನೆ ಕೊಟ್ಟರೂ ಬರದು" - ಕಳೆದ ಗೌರವ ಮರಳಿ ಬರದು
3. "ಐದು ಬೆರಳು ಸಮಾನವಿಲ್ಲ" - ಎಲ್ಲರೂ ಒಂದೇ ರೀತಿ ಇರಲು ಸಾಧ್ಯವಿಲ್ಲ
4. "ಹಸಿದವನಿಗೆ ಹರಿದ ನಾರು ಬೆಲ್ಲ" - ಅಗತ್ಯವಿರುವವನಿಗೆ ಚಿಕ್ಕ ಸಹಾಯವೂ ದೊಡ್ಡದು
5. "ಬೆಳ್ಳಗಿರೋದೆಲ್ಲ ಹಾಲಲ್ಲ" - ಹೊರನೋಟಕ್ಕೆ ಮೋಸ ಹೋಗಬಾರದು
6. "ಊರಿಗೆ ಉಪಕಾರಿ, ಮನೆಗೆ ಮಾರಿ" - ಹೊರಗಿನವರಿಗೆ ಒಳ್ಳೆಯವ, ಮನೆಯವರಿಗೆ ಕೆಟ್ಟವ`,
    lesson_en:`💬 **Key Proverbs:**
1. "Kai kesaradare baayi mosaru" - Hard work yields results
2. "Adikege hoda maana aane kottaru baradu" - Lost honour never returns
3. "Aidu beralu samanavilla" - All fingers aren't equal
4. "Hasidavanige harida naaru bella" - To the hungry, even scraps are sweet
5. "Bellagirodella haalalla" - All that's white isn't milk`,
  },

  kannada_comprehension: {
    id:'kannada_comprehension', subject:'kannada', paper:2,
    title_kn:'ಕನ್ನಡ ಗ್ರಹಿಕೆ ಮತ್ತು ಸಾರಾಂಶ', title_en:'Kannada Comprehension',
    lesson_kn:`📖 **ಗ್ರಹಿಕೆ ಸಲಹೆಗಳು:**
1. ಮೊದಲು ಪ್ರಶ್ನೆಗಳನ್ನು ಓದಿ, ನಂತರ ಪ್ಯಾರಾಗ್ರಾಫ್ ಓದಿ
2. ಮುಖ್ಯ ವಿಚಾರವನ್ನು ಗುರುತಿಸಿ
3. ಸಂದರ್ಭೋಚಿತ ಅರ್ಥಗಳಿಗೆ ಗಮನ ಕೊಡಿ
4. ಉತ್ತರಗಳು ಪ್ಯಾರಾಗ್ರಾಫ್‌ನಲ್ಲಿಯೇ ಇರುತ್ತವೆ

**ಮಾದರಿ ಪ್ಯಾರಾಗ್ರಾಫ್:**
"ಕರ್ನಾಟಕ ಗ್ರಾಮ ಲೆಕ್ಕಾಧಿಕಾರಿಯು ಗ್ರಾಮೀಣ ಆಡಳಿತದ ಪ್ರಮುಖ ಅಂಗ. ಇವರು ಭೂ ದಾಖಲೆಗಳ ನಿರ್ವಹಣೆ, ಕಂದಾಯ ಸಂಗ್ರಹ, ಜನಗಣತಿ ಮತ್ತು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಅನುಷ್ಠಾನದಲ್ಲಿ ಪ್ರಮುಖ ಪಾತ್ರ ವಹಿಸುತ್ತಾರೆ. ಭೂಮಿ ಯೋಜನೆಯಡಿ ಡಿಜಿಟಲ್ ದಾಖಲೀಕರಣವು ಇವರ ಕಾರ್ಯವನ್ನು ಸುಗಮಗೊಳಿಸಿದೆ."

**ಪ್ರಶ್ನೆಗಳು:** 1) ಲೆಕ್ಕಾಧಿಕಾರಿಯ ಪ್ರಮುಖ ಕರ್ತವ್ಯಗಳೇನು? 2) ಭೂಮಿ ಯೋಜನೆ ಎಂದರೇನು?`,
    lesson_en:`📖 **Comprehension Tips:** Read questions first, identify main idea, answers are in the passage.

**Practice:** "The Karnataka Village Accountant is crucial to rural administration. They maintain land records, collect revenue, assist in census and implement government schemes. The Bhoomi project has digitized land records."`,
  },

  kannada_translation: {
    id:'kannada_translation', subject:'kannada', paper:2,
    title_kn:'ಕನ್ನಡ ಅನುವಾದ', title_en:'Kannada Translation',
    lesson_kn:`🔄 **ಇಂಗ್ಲಿಷ್ → ಕನ್ನಡ ಅನುವಾದ ಅಭ್ಯಾಸ:**

1. "I am going to school." → "ನಾನು ಶಾಲೆಗೆ ಹೋಗುತ್ತಿದ್ದೇನೆ."
2. "The sun rises in the east." → "ಸೂರ್ಯನು ಪೂರ್ವದಲ್ಲಿ ಉದಯಿಸುತ್ತಾನೆ."
3. "We should protect our environment." → "ನಾವು ನಮ್ಮ ಪರಿಸರವನ್ನು ಸಂರಕ್ಷಿಸಬೇಕು."
4. "Education is the key to success." → "ಶಿಕ್ಷಣವು ಯಶಸ್ಸಿನ ಕೀಲಿಕೈ."
5. "Respect your elders." → "ಹಿರಿಯರನ್ನು ಗೌರವಿಸಿ."

**ಸಲಹೆಗಳು:** ವಾಕ್ಯ ರಚನೆ, ಕಾಲ, ಲಿಂಗ ಗಮನಿಸಿ`,
    lesson_en:`🔄 **English → Kannada Translation Practice**

Tips: Focus on sentence structure, tense, and gender agreement`,
  },

  english_grammar: {
    id:'english_grammar', subject:'english', paper:2,
    title_kn:'ಇಂಗ್ಲಿಷ್ ವ್ಯಾಕರಣ', title_en:'English Grammar',
    lesson_en:`📝 **Parts of Speech:**
1. Noun: Ram, Bengaluru, book
2. Pronoun: he, she, it, they
3. Verb: go, eat, think
4. Adjective: good, large, red
5. Adverb: quickly, very, well
6. Preposition: in, on, at, under
7. Conjunction: and, but, or, because
8. Interjection: Oh!, Wow!

**Tenses:**
• Present Simple: I go / He goes
• Past Simple: I went
• Future: I will go
• Present Continuous: I am going
• Present Perfect: I have gone
• Past Perfect: I had gone

**Articles:** A (consonant sound), An (vowel sound), The (specific)`,
    lesson_kn:`📝 **ಪದ ವಿಭಾಗಗಳು:** ನಾಮಪದ, ಸರ್ವನಾಮ, ಕ್ರಿಯಾಪದ, ವಿಶೇಷಣ, ಕ್ರಿಯಾವಿಶೇಷಣ, ಸಂಬಂಧಸೂಚಕ, ಸಂಯೋಜಕ, ಉದ್ಗಾರ

**ಕಾಲಗಳು:** Present (I go), Past (I went), Future (I will go), Present Continuous, Perfect

**Articles:** A, An, The`,
  },

  english_errors: {
    id:'english_errors', subject:'english', paper:2,
    title_kn:'ಇಂಗ್ಲಿಷ್ ದೋಷ ಗುರುತಿಸುವಿಕೆ', title_en:'English Error Spotting',
    lesson_en:`🔍 **Common Errors:**

**Subject-Verb Agreement:** ✗ He go. → ✓ He goes.
**Tense:** ✗ I am knowing. → ✓ I know.
**Preposition:** ✗ good in English. → ✓ good at English.
**Pronoun:** ✗ Each of them have. → ✓ Each of them has.
**Double comparative:** ✗ more better. → ✓ better.

**Practice Sentences:**
1. She don't like coffee. (don't → doesn't)
2. One of the boys are absent. (are → is)
3. He is senior than me. (than → to)
4. I have visited Delhi yesterday. (have visited → visited)`,
    lesson_kn:`🔍 **ಸಾಮಾನ್ಯ ದೋಷಗಳು:** Subject-Verb Agreement, Tense, Preposition, Pronoun, Double comparative`,
  },

  english_synonyms: {
    id:'english_synonyms', subject:'english', paper:2,
    title_kn:'ಇಂಗ್ಲಿಷ್ Synonyms & Antonyms', title_en:'English Synonyms & Antonyms',
    lesson_en:`**Synonyms:** Big=Large=Huge, Small=Tiny=Little, Happy=Glad=Joyful, Brave=Courageous=Bold, Begin=Start=Commence, End=Finish=Conclude, Help=Assist=Aid, Important=Significant=Crucial

**Antonyms:** Good×Bad, Hot×Cold, Rich×Poor, Strong×Weak, Love×Hate, Light×Dark, Fast×Slow, Young×Old, Open×Close, Happy×Sad

**One Word Substitutions:**
• One who believes in God → Theist
• One who doesn't believe in God → Atheist
• One who knows everything → Omniscient
• That cannot be read → Illegible
• A life history written by oneself → Autobiography`,
    lesson_kn:`**ಸಮಾನಾರ್ಥಕ:** Big=Large, Small=Tiny, Happy=Glad, Brave=Bold

**ವಿರುದ್ಧಾರ್ಥಕ:** Good×Bad, Hot×Cold, Rich×Poor, Strong×Weak

**ಒಂದು ಪದದಲ್ಲಿ:** Theist, Atheist, Omniscient, Illegible, Autobiography`,
  },

  english_idioms: {
    id:'english_idioms', subject:'english', paper:2,
    title_kn:'ಇಂಗ್ಲಿಷ್ Idioms & Phrases', title_en:'English Idioms & Phrases',
    lesson_en:`💬 **Common Idioms:**
1. Break the ice - Start a conversation
2. Piece of cake - Very easy
3. Once in a blue moon - Rarely
4. Hit the nail on the head - Be exactly right
5. Cost an arm and a leg - Very expensive
6. Under the weather - Feeling sick
7. Kill two birds with one stone - Achieve two things at once
8. Beat around the bush - Avoid the main topic
9. Bite the bullet - Face a difficult situation
10. Let the cat out of the bag - Reveal a secret

**Phrases:**
• In spite of / Despite + noun/-ing
• Used to + V1 (past habit)
• Be used to + V-ing (accustomed)`,
    lesson_kn:`💬 **ಪ್ರಮುಖ ನುಡಿಗಟ್ಟುಗಳು:**
1. Break the ice - ಸಂಭಾಷಣೆ ಆರಂಭಿಸು
2. Piece of cake - ತುಂಬಾ ಸುಲಭ
3. Once in a blue moon - ಬಹಳ ಅಪರೂಪವಾಗಿ
4. Cost an arm and a leg - ತುಂಬಾ ದುಬಾರಿ`,
  },

  computer_basics: {
    id:'computer_basics', subject:'computer', paper:2,
    title_kn:'ಕಂಪ್ಯೂಟರ್ ಮೂಲಭೂತ', title_en:'Computer Basics',
    lesson_en:`💻 **What is a Computer?** Electronic device; IPO cycle: Input→Process→Output

**Generations:**
1st (1940-56): Vacuum Tubes
2nd (1956-63): Transistors
3rd (1964-71): IC
4th (1971-present): VLSI/Microprocessor
5th (Future): AI

**Types:** Supercomputer (PARAM), Mainframe, Mini, Micro

**Components:**
• CPU (ALU + CU) - brain
• Memory: RAM (volatile/primary), ROM (non-volatile), Cache
• Storage: HDD, SSD, CD/DVD, USB Flash, Blu-ray
• Input: Keyboard, Mouse, Scanner, Microphone
• Output: Monitor, Printer, Speaker, Projector

**Number Systems:** Binary (0,1), Octal (0-7), Decimal (0-9), Hexadecimal (0-9,A-F)

**Units:** Bit→Byte(8)→KB(1024)→MB→GB→TB→PB`,
    lesson_kn:`💻 **ಕಂಪ್ಯೂಟರ್‌ನ ತಲೆಮಾರುಗಳು:** 1ನೇ (ವ್ಯಾಕ್ಯೂಮ್), 2ನೇ (ಟ್ರಾನ್ಸಿಸ್ಟರ್), 3ನೇ (IC), 4ನೇ (ಮೈಕ್ರೋಪ್ರೊಸೆಸರ್), 5ನೇ (AI)

**ಮೆಮೊರಿ:** RAM (ತಾತ್ಕಾಲಿಕ), ROM (ಶಾಶ್ವತ); ಬಿಟ್‌→ಬೈಟ್‌→KB→MB→GB→TB`,
  },

  ms_office: {
    id:'ms_office', subject:'computer', paper:2,
    title_kn:'MS Office ಸೂಟ್', title_en:'MS Office Suite',
    lesson_en:`📎 **MS Word (.docx):**
• Word processing; Features: Bold, Italic, Mail Merge
• Shortcuts: Ctrl+B, Ctrl+I, Ctrl+S, Ctrl+C, Ctrl+V, Ctrl+Z (Undo)

**MS Excel (.xlsx):**
• Spreadsheet; Rows (numbers) × Columns (letters)
• Formulas: SUM, AVERAGE, COUNT, MAX, MIN, IF, VLOOKUP
• Charts: Bar, Pie, Line, Column

**MS PowerPoint (.pptx):**
• Presentation; Slide transitions, Animations
• F5: Slide Show; Ctrl+M: New Slide

**Other:** MS Access (.accdb - Database), MS Outlook`,
    lesson_kn:`📎 **MS Word (.docx):** ಶಬ್ದ ಸಂಸ್ಕರಣೆ; Ctrl+B, Ctrl+S, Ctrl+Z

**MS Excel (.xlsx):** ಸ್ಪ್ರೆಡ್‌ಶೀಟ್; SUM, AVERAGE, COUNT; Bar,Pie,Line ಚಾರ್ಟ್

**MS PowerPoint (.pptx):** ಪ್ರಸ್ತುತಿ; F5 ಸ್ಲೈಡ್ ಶೋ`,
  },

  internet_email: {
    id:'internet_email', subject:'computer', paper:2,
    title_kn:'ಇಂಟರ್ನೆಟ್, ಇ-ಮೇಲ್, ಸುರಕ್ಷತೆ', title_en:'Internet, Email & Security',
    lesson_en:`🌐 **Internet:**
• Worldwide network; Father of Internet: Vint Cerf
• WWW: Tim Berners-Lee (1989)
• Browsers: Chrome, Firefox, Edge, Safari
• Protocols: HTTP, HTTPS, FTP, TCP/IP, SMTP
• Search Engines: Google, Bing, Yahoo, DuckDuckGo

**Email:**
• First email: Ray Tomlinson (1971); @ symbol
• CC, BCC, Attachment, Spam

**Security:**
• Virus, Malware, Ransomware, Spyware
• Antivirus, Firewall
• Phishing: fake emails for personal data
• Cybercrime, Ethical Hacking

**E-Governance:**
• DigiLocker, UMANG, Aadhaar, e-Hospital
• Bhoomi (Karnataka land records online)
• Karnataka: Seva Sindhu, e-Swathu`,
    lesson_kn:`🌐 **ಇಂಟರ್ನೆಟ್:** Vint Cerf; WWW: Tim Berners-Lee (1989); TCP/IP, HTTP/HTTPS

**ಇ-ಮೇಲ್:** Ray Tomlinson (1971); CC, BCC

**ಸುರಕ್ಷತೆ:** ವೈರಸ್, ಆಂಟಿವೈರಸ್, ಫೈರ್‌ವಾಲ್, ಫಿಶಿಂಗ್

**ಇ-ಆಡಳಿತ:** ಡಿಜಿಲಾಕರ್, ಉಮಂಗ್‌, ಆಧಾರ್, ಭೂಮಿ, ಸೇವಾ ಸಿಂಧು`,
  },

  computer_advanced: {
    id:'computer_advanced', subject:'computer', paper:2,
    title_kn:'ಕಂಪ್ಯೂಟರ್ ಮುಂದುವರೆದ ವಿಷಯಗಳು', title_en:'Computer Advanced Topics',
    lesson_en:`🔧 **Operating Systems:**
• Windows, macOS, Linux, Android, iOS
• Functions: Process management, memory management, file management

**Networking:**
• LAN (Local Area), MAN (Metropolitan), WAN (Wide Area)
• Topologies: Star, Bus, Ring, Mesh, Tree
• IP Address: IPv4 (32-bit), IPv6 (128-bit)

**Database Basics:**
• DBMS, RDBMS; SQL; Primary Key, Foreign Key

**Latest Technologies:**
• AI/ML, Cloud Computing (AWS, Azure, Google Cloud)
• Blockchain, IoT, 5G, Edge Computing
• ChatGPT, Generative AI, Quantum Computing`,
    lesson_kn:`🔧 **OS:** Windows, Linux, Android; Process, Memory, File management

**ನೆಟ್‌ವರ್ಕಿಂಗ್:** LAN, MAN, WAN; Star, Bus, Ring topologies

**ಡೇಟಾಬೇಸ್:** DBMS, SQL; AI/ML, Cloud, Blockchain, IoT, 5G`,
  },

  english_comprehension: {
    id:'english_comprehension', subject:'english', paper:2,
    title_kn:'ಇಂಗ್ಲಿಷ್ ಗ್ರಹಿಕೆ', title_en:'English Reading Comprehension',
    lesson_en:`📖 **Tips:**
1. Read questions before the passage
2. Skim for main idea, scan for details
3. Keywords from questions → locate in text
4. Don't assume; find evidence in passage
5. Time: ~1 min per question

**Sample:**
"The Bhoomi project in Karnataka digitized over 20 million land records, making them accessible online. Village Accountants now use computers to update RTCs, reducing corruption and improving transparency."

Q1: What did Bhoomi project digitize?
Q2: How did it help Village Accountants?`,
    lesson_kn:`📖 **ಸಲಹೆಗಳು:** ಮೊದಲು ಪ್ರಶ್ನೆ ಓದಿ, ಮುಖ್ಯ ವಿಚಾರ ಗುರುತಿಸಿ, ಪಠ್ಯದಲ್ಲೇ ಉತ್ತರ`,
  },
};

// ============ SUBJECT GROUPS (for syllabus navigation) ============
const subjectGroups = {
  constitution: { title_kn:'ಭಾರತದ ಸಂವಿಧಾನ', title_en:'Indian Constitution', paper:1, topics:['constitution_preamble','fundamental_rights','dpsp','amendments','judiciary'] },
  history: { title_kn:'ಇತಿಹಾಸ (ಭಾರತ & ಕರ್ನಾಟಕ)', title_en:'History (India & Karnataka)', paper:1, topics:['ancient_india','medieval_india','ancient_karnataka','medieval_karnataka','tipu_kittur','modern_india','freedom_karnataka'] },
  geography: { title_kn:'ಭೂಗೋಳ', title_en:'Geography', paper:1, topics:['physical_india','rivers_india','karnataka_rivers','karnataka_districts','karnataka_climate'] },
  admin: { title_kn:'ಆಡಳಿತ ವ್ಯವಸ್ಥೆ', title_en:'Administration', paper:1, topics:['state_admin','territorial_admin'] },
  rural: { title_kn:'ಪಂಚಾಯತ್ ರಾಜ್ & ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ', title_en:'Panchayat Raj & Rural Dev', paper:1, topics:['panchayat_raj','rural_dev','coop_societies'] },
  economy: { title_kn:'ಅರ್ಥಿಕತೆ & ಯೋಜನೆಗಳು', title_en:'Economy & Schemes', paper:1, topics:['karnataka_economy','govt_schemes'] },
  environment: { title_kn:'ಪರಿಸರ & ಜೀವವೈವಿಧ್ಯ', title_en:'Environment & Biodiversity', paper:1, topics:['environment','biodiversity_karnataka'] },
  current: { title_kn:'ಪ್ರಚಲಿತ ಘಟನೆಗಳು', title_en:'Current Affairs', paper:1, topics:['current_affairs'] },
  kannada: { title_kn:'ಸಾಮಾನ್ಯ ಕನ್ನಡ', title_en:'General Kannada', paper:2, topics:['kannada_grammar','kannada_vocab','kannada_proverbs','kannada_comprehension','kannada_translation'] },
  english: { title_kn:'ಸಾಮಾನ್ಯ ಇಂಗ್ಲಿಷ್', title_en:'General English', paper:2, topics:['english_grammar','english_errors','english_synonyms','english_idioms','english_comprehension'] },
  computer: { title_kn:'ಕಂಪ್ಯೂಟರ್ ಜ್ಞಾನ', title_en:'Computer Knowledge', paper:2, topics:['computer_basics','ms_office','internet_email','computer_advanced'] },
};

// ============ QUIZ BANK ============
const quizBank = {};
(function buildQuizzes() {
  const qMap = {
    constitution_preamble: [
      {q_kn:'"ಸಮಾಜವಾದಿ" ಪದವನ್ನು ಪೀಠಿಕೆಗೆ ಸೇರಿಸಿದ ತಿದ್ದುಪಡಿ?',q_en:'Which amendment added "Socialist" to the Preamble?',o_kn:['24ನೇ','42ನೇ','44ನೇ','52ನೇ'],o_en:['24th','42nd','44th','52nd'],ans:1},
      {q_kn:'ಸಂವಿಧಾನ ಸಭೆಯ ಅಧ್ಯಕ್ಷರು ಯಾರು?',q_en:'Who was President of Constituent Assembly?',o_kn:['ಅಂಬೇಡ್ಕರ್','ರಾಜೇಂದ್ರ ಪ್ರಸಾದ್','ನೆಹರು','ಪಟೇಲ್'],o_en:['Ambedkar','Rajendra Prasad','Nehru','Patel'],ans:1},
      {q_kn:'ಕೇಶವಾನಂದ ಭಾರತಿ ಪ್ರಕರಣ ಯಾವ ವರ್ಷ?',q_en:'Keshavananda Bharati case year?',o_kn:['1967','1971','1973','1975'],o_en:['1967','1971','1973','1975'],ans:2},
    ],
    fundamental_rights: [
      {q_kn:'ಸಂವಿಧಾನದಲ್ಲಿ ಮೂಲಭೂತ ಹಕ್ಕುಗಳ ಸಂಖ್ಯೆ?',q_en:'Number of Fundamental Rights?',o_kn:['5','6','7','8'],o_en:['5','6','7','8'],ans:1},
      {q_kn:'ಸಾಂವಿಧಾನಿಕ ಪರಿಹಾರದ ಹಕ್ಕು ಯಾವ ಅನುಚ್ಛೇದ?',q_en:'Right to Constitutional Remedies - Article?',o_kn:['14','19','32','44'],o_en:['14','19','32','44'],ans:2},
      {q_kn:'ಆಸ್ತಿ ಹಕ್ಕು ಈಗ ಯಾವ ಸ್ಥಿತಿಯಲ್ಲಿದೆ?',q_en:'Right to Property is now?',o_kn:['ಮೂಲಭೂತ ಹಕ್ಕು','ಕಾನೂನುಬದ್ಧ ಹಕ್ಕು','DPSP','ರದ್ದು'],o_en:['FR','Legal Right','DPSP','Abolished'],ans:1},
    ],
    dpsp: [
      {q_kn:'DPSP ಯಾವ ದೇಶದಿಂದ ಪ್ರೇರಿತ?',q_en:'DPSP inspired from?',o_kn:['USA','Britain','Ireland','Canada'],o_en:['USA','Britain','Ireland','Canada'],ans:2},
      {q_kn:'DPSP ಸಂವಿಧಾನದ ಯಾವ ಭಾಗ?',q_en:'DPSP is in which Part?',o_kn:['II','III','IV','V'],o_en:['II','III','IV','V'],ans:2},
    ],
    amendments: [
      {q_kn:'42ನೇ ತಿದ್ದುಪಡಿಯನ್ನು ಏನೆಂದು ಕರೆಯುತ್ತಾರೆ?',q_en:'42nd Amendment is called?',o_kn:['ಸಣ್ಣ ಸಂವಿಧಾನ','ಮಿನಿ ಸಂವಿಧಾನ','ಸೂಕ್ಷ್ಮ ಸಂವಿಧಾನ','ಹೊಸ ಸಂವಿಧಾನ'],o_en:['Small Const','Mini Constitution','Micro Const','New Const'],ans:1},
      {q_kn:'ಮತದಾನ ವಯಸ್ಸು 21→18 ಮಾಡಿದ ತಿದ್ದುಪಡಿ?',q_en:'Voting age 21→18 amendment?',o_kn:['42ನೇ','52ನೇ','61ನೇ','73ನೇ'],o_en:['42nd','52nd','61st','73rd'],ans:2},
      {q_kn:'GST ತಂದ ತಿದ್ದುಪಡಿ?',q_en:'GST amendment?',o_kn:['100ನೇ','101ನೇ','102ನೇ','103ನೇ'],o_en:['100th','101st','102nd','103rd'],ans:1},
    ],
    judiciary: [
      {q_kn:'ಸರ್ವೋಚ್ಚ ನ್ಯಾಯಾಲಯದ ನ್ಯಾಯಮೂರ್ತಿಗಳ ನಿವೃತ್ತಿ ವಯಸ್ಸು?',q_en:'SC judge retirement age?',o_kn:['60','62','65','70'],o_en:['60','62','65','70'],ans:2},
      {q_kn:'ಕರ್ನಾಟಕ HC ಯಾವಾಗ ಸ್ಥಾಪನೆಯಾಯಿತು?',q_en:'Karnataka HC established?',o_kn:['1884','1947','1956','1973'],o_en:['1884','1947','1956','1973'],ans:0},
    ],
    state_admin: [
      {q_kn:'ಕರ್ನಾಟಕ ವಿಧಾನಸಭೆಯ ಸ್ಥಾನಗಳು?',q_en:'KA Assembly seats?',o_kn:['200','224','250','275'],o_en:['200','224','250','275'],ans:1},
      {q_kn:'ರಾಜ್ಯಪಾಲರನ್ನು ಯಾರು ನೇಮಿಸುತ್ತಾರೆ?',q_en:'Who appoints the Governor?',o_kn:['PM','CM','President','CJI'],o_en:['PM','CM','President','CJI'],ans:2},
    ],
    ancient_karnataka: [
      {q_kn:'ಕದಂಬರ ರಾಜಧಾನಿ?',q_en:'Kadamba capital?',o_kn:['ಬಾದಾಮಿ','ಬನವಾಸಿ','ತಲಕಾಡು','ಹಂಪಿ'],o_en:['Badami','Banavasi','Talakadu','Hampi'],ans:1},
      {q_kn:'ಹಲ್ಮಿಡಿ ಶಾಸನ ಕಾಲ?',q_en:'Halmidi inscription date?',o_kn:['350 CE','400 CE','450 CE','500 CE'],o_en:['350','400','450','500'],ans:2},
      {q_kn:'ಕವಿರಾಜಮಾರ್ಗ ಬರೆದವರು?',q_en:'Kavirajamarga written by?',o_kn:['ಪಂಪ','ರನ್ನ','ಅಮೋಘವರ್ಷ','ಪೊನ್ನ'],o_en:['Pampa','Ranna','Amoghavarsha','Ponna'],ans:2},
    ],
    medieval_karnataka: [
      {q_kn:'ವಿಜಯನಗರ ಸ್ಥಾಪಕರು?',q_en:'Vijayanagara founders?',o_kn:['ಕೃಷ್ಣದೇವರಾಯ','ಹರಿಹರ & ಬುಕ್ಕ','ದೇವರಾಯ','ಅಚ್ಯುತ'],o_en:['Krishnadevaraya','Harihara & Bukka','Devaraya','Achyuta'],ans:1},
      {q_kn:'ತಾಳೀಕೋಟೆ ಯುದ್ಧ?',q_en:'Battle of Talikota?',o_kn:['1526','1555','1565','1576'],o_en:['1526','1555','1565','1576'],ans:2},
    ],
    karnataka_rivers: [
      {q_kn:'ಜೋಗ ಜಲಪಾತ ಯಾವ ನದಿ?',q_en:'Jog Falls river?',o_kn:['ಕಾವೇರಿ','ಕೃಷ್ಣಾ','ಶರಾವತಿ','ತುಂಗಭದ್ರಾ'],o_en:['Kaveri','Krishna','Sharavati','Tungabhadra'],ans:2},
      {q_kn:'ಕಾವೇರಿ ಉಗಮ?',q_en:'Kaveri origin?',o_kn:['ಗಂಗೋತ್ರಿ','ತಲಕಾವೇರಿ','ಮಹಾಬಲೇಶ್ವರ','ಯಮುನೋತ್ರಿ'],o_en:['Gangotri','Talakaveri','Mahabaleshwar','Yamunotri'],ans:1},
      {q_kn:'ಆಲಮಟ್ಟಿ ಅಣೆಕಟ್ಟು ಯಾವ ನದಿ?',q_en:'Almatti dam on which river?',o_kn:['ಕಾವೇರಿ','ಕೃಷ್ಣಾ','ತುಂಗಭದ್ರಾ','ಶರಾವತಿ'],o_en:['Kaveri','Krishna','Tungabhadra','Sharavati'],ans:1},
    ],
    karnataka_districts: [
      {q_kn:'ಕರ್ನಾಟಕದಲ್ಲಿ ಒಟ್ಟು ಜಿಲ್ಲೆಗಳು?',q_en:'Total districts in KA?',o_kn:['28','29','30','31'],o_en:['28','29','30','31'],ans:3},
      {q_kn:'ತುಮಕೂರು ಯಾವ ವಿಭಾಗ?',q_en:'Tumakuru division?',o_kn:['ಮೈಸೂರು','ಬೆಂಗಳೂರು','ಬೆಳಗಾವಿ','ಕಲಬುರಗಿ'],o_en:['Mysuru','Bengaluru','Belagavi','Kalaburagi'],ans:1},
      {q_kn:'ಇತ್ತೀಚಿನ ಜಿಲ್ಲೆ?',q_en:'Newest district?',o_kn:['ಚಿಕ್ಕಬಳ್ಳಾಪುರ','ರಾಮನಗರ','ಯಾದಗಿರಿ','ವಿಜಯನಗರ'],o_en:['Chikkaballapura','Ramanagara','Yadgiri','Vijayanagara'],ans:3},
    ],
    panchayat_raj: [
      {q_kn:'73ನೇ ತಿದ್ದುಪಡಿ ಯಾವ ವರ್ಷ?',q_en:'73rd Amendment year?',o_kn:['1990','1991','1992','1993'],o_en:['1990','1991','1992','1993'],ans:2},
      {q_kn:'ಪಂಚಾಯತ್‌‌ಗಳಲ್ಲಿ ಮಹಿಳಾ ಮೀಸಲಾತಿ?',q_en:'Women reservation in Panchayats?',o_kn:['1/4','1/3','1/2','2/3'],o_en:['1/4','1/3','1/2','2/3'],ans:1},
    ],
    rural_dev: [
      {q_kn:'MGNREGA ಎಷ್ಟು ದಿನಗಳ ಉದ್ಯೋಗ ಖಾತ್ರಿ?',q_en:'MGNREGA guarantees how many days?',o_kn:['50','75','100','150'],o_en:['50','75','100','150'],ans:2},
      {q_kn:'ಕರ್ನಾಟಕದ 5 ಗ್ಯಾರಂಟಿಗಳಲ್ಲಿ ಮಹಿಳೆಯರಿಗೆ ಉಚಿತ ಬಸ್?',q_en:'KA guarantee: free bus for women?',o_kn:['ಗೃಹ ಜ್ಯೋತಿ','ಶಕ್ತಿ','ಗೃಹ ಲಕ್ಷ್ಮೀ','ಅನ್ನ ಭಾಗ್ಯ'],o_en:['Gruha Jyoti','Shakti','Gruha Lakshmi','Anna Bhagya'],ans:1},
    ],
    computer_basics: [
      {q_kn:'CPU ಪೂರ್ಣ ರೂಪ?',q_en:'CPU full form?',o_kn:['Central Processing Unit','Central Program Unit','Computer Processing Unit','Core Processing Unit'],o_en:['Central Processing Unit','Central Program Unit','Computer Processing Unit','Core Processing Unit'],ans:0},
      {q_kn:'RAM ಯಾವ ರೀತಿಯ ಮೆಮೊರಿ?',q_en:'RAM is what type?',o_kn:['ಶಾಶ್ವತ','ಅಸ್ಥಿರ','ದ್ವಿತೀಯ','ಸಹಾಯಕ'],o_en:['Permanent','Volatile','Secondary','Auxiliary'],ans:1},
      {q_kn:'1 GB = ___ MB?',q_en:'1 GB = ___ MB?',o_kn:['100','512','1000','1024'],o_en:['100','512','1000','1024'],ans:3},
    ],
    ms_office: [
      {q_kn:'MS Word ಫೈಲ್ ವಿಸ್ತರಣೆ?',q_en:'MS Word extension?',o_kn:['.xlsx','.pptx','.docx','.txt'],o_en:['.xlsx','.pptx','.docx','.txt'],ans:2},
      {q_kn:'Excel ನಲ್ಲಿ SUM ಕಾರ್ಯ?',q_en:'SUM function in Excel?',o_kn:['ಸರಾಸರಿ','ಒಟ್ಟು','ಗರಿಷ್ಠ','ಕನಿಷ್ಠ'],o_en:['Average','Total','Max','Min'],ans:1},
    ],
    internet_email: [
      {q_kn:'WWW ಸಂಶೋಧಕರು?',q_en:'WWW inventor?',o_kn:['Vint Cerf','Tim Berners-Lee','Bill Gates','Steve Jobs'],o_en:['Vint Cerf','Tim Berners-Lee','Bill Gates','Steve Jobs'],ans:1},
      {q_kn:'ಕರ್ನಾಟಕ ಭೂ ದಾಖಲೆ ಯೋಜನೆ?',q_en:'KA land records project?',o_kn:['ಆಧಾರ್','ಭೂಮಿ','ಡಿಜಿಲಾಕರ್','ಉಮಂಗ್'],o_en:['Aadhaar','Bhoomi','DigiLocker','UMANG'],ans:1},
    ],
    kannada_proverbs: [
      {q_kn:'"ಕೈ ಕೆಸರಾದರೆ ಬಾಯಿ ಮೊಸರು" - ಅರ್ಥ?',q_en:'"Kai kesaradare..." meaning?',o_kn:['ದುಡಿತಕ್ಕೆ ಫಲ','ಸೋಮಾರಿತನ','ಆಲಸ್ಯ','ವ್ಯರ್ಥ'],o_en:['Work yields results','Laziness','Idleness','Waste'],ans:0},
      {q_kn:'"ಬೆಳ್ಳಗಿರೋದೆಲ್ಲ ಹಾಲಲ್ಲ" - ಅರ್ಥ?',q_en:'"Bellagirodella..." meaning?',o_kn:['ಬಣ್ಣದ ಬಗ್ಗೆ','ಹೊರನೋಟಕ್ಕೆ ಮೋಸ','ಹಾಲಿನ ಬಗ್ಗೆ','ಬಿಳಿ ಬಣ್ಣ'],o_en:['About color','Appearances deceive','About milk','White color'],ans:1},
    ],
    english_errors: [
      {q_en:'"She don\'t like coffee." - Error?',q_kn:'ದೋಷ: "She don\'t like coffee."',o_en:['She','don\'t','like','coffee'],o_kn:['She','don\'t','like','coffee'],ans:1},
      {q_en:'"One of the boys are absent." - Error?',q_kn:'ದೋಷ: "One of the boys are absent."',o_en:['One','boys','are','absent'],o_kn:['One','boys','are','absent'],ans:2},
    ],
  };

  for (let [tid, qs] of Object.entries(qMap)) {
    quizBank[tid] = qs;
  }
  // Fill remaining topics with generic questions
  for (let tid of Object.keys(allTopics)) {
    if (!quizBank[tid]) {
      quizBank[tid] = [{
        q_kn:'ಈ ವಿಷಯವನ್ನು ಚೆನ್ನಾಗಿ ಅಧ್ಯಯನ ಮಾಡಿ', q_en:'Study this topic thoroughly',
        o_kn:['ಓದಿದೆ','ಅರ್ಥವಾಗಿದೆ','ನೆನಪಿದೆ','ಪ್ರಯತ್ನಿಸುತ್ತೇನೆ'], o_en:['Read','Understood','Remembered','Will try'], ans:0
      }];
    }
  }
})();
