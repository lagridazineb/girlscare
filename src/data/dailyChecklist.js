// Structure mirrors "اليوم ال..." tracker page from the source book.
// Each section has a key, title, icon name (react-icons/fa or gi), and items.

export const DAY_NAME_AR = [
  "الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر",
  "الحادي عشر", "الثاني عشر", "الثالث عشر", "الرابع عشر", "الخامس عشر", "السادس عشر", "السابع عشر",
  "الثامن عشر", "التاسع عشر", "العشرون",
];

export function dayOrdinalAr(day) {
  if (day <= 20) return DAY_NAME_AR[day - 1];
  const tens = Math.floor(day / 10) * 10;
  const ones = day % 10;
  const tensWords = { 20: "العشرون", 30: "الثلاثون", 40: "الأربعون", 50: "الخمسون", 60: "الستون", 70: "السبعون" };
  if (ones === 0) return tensWords[tens] || `${day}`;
  return `${DAY_NAME_AR[ones - 1]} و${tensWords[tens]}`;
}

export const CHECKLIST_SECTIONS = [
  {
    key: "mind",
    title: "العقل والنفس",
    icon: "GiBrain",
    items: [
      { key: "breath", label: "تنفس هادئ، شهيق وزفير لمدة 5 دقائق على الأقل" },
      { key: "learn", label: "قراءة كتاب أو تعلم شيء جديد" },
    ],
  },
  {
    key: "faith",
    title: "علاقتي بالله",
    icon: "FaMosque",
    items: [
      { key: "fajr", label: "صلاة الفجر في وقتها" },
      { key: "prayers", label: "الصلوات في وقتها" },
      { key: "adhkar", label: "أذكار الصباح والمساء" },
      { key: "quran", label: "القرآن، ذكر، دعاء" },
    ],
  },
  {
    key: "body",
    title: "الجسم والصحة",
    icon: "FaHeartbeat",
    items: [
      { key: "exercise", label: "حركة / رياضة" },
      { key: "food", label: "غذاء متوازن" },
      { key: "water", label: "شرب الماء" },
      { key: "sleep", label: "نوم وراحة كافية" },
    ],
  },
  {
    key: "selfcare",
    title: "عنايتي بنفسي",
    icon: "FaSpa",
    items: [
      { key: "skincare", label: "عناية بالجسم والمظهر" },
      { key: "minutes10", label: "10 دقائق لنفسي" },
    ],
  },
  {
    key: "study",
    title: "عملي ودراستي",
    icon: "FaBookOpen",
    items: [
      { key: "learnNew", label: "قراءة كتاب أو تعلم شيء جديد" },
      { key: "goalStep", label: "خطوة نحو هدفي" },
    ],
  },
  {
    key: "relationships",
    title: "علاقاتي",
    icon: "FaUsers",
    items: [{ key: "silaRahm", label: "صلة رحم" }],
  },
  {
    key: "time",
    title: "وقتي",
    icon: "FaRegClock",
    items: [{ key: "noWaste", label: "لم أهدر وقتي فيما لا ينفع" }],
  },
  {
    key: "money",
    title: "مالي",
    icon: "FaWallet",
    items: [{ key: "mindful", label: "تصرف مالي بوعي، عدم تبذير" }],
  },
];

export const DAILY_AFFIRMATIONS = [
  "أنا قَوية في إيماني وعزيمتي.",
  "أنا جميلة كما خلقتني الله.",
  "أنا قادرة على تحقيق أحلامي.",
  "أنا أختار السلام والهدوء كل يوم.",
  "أنا أستحق الحب والاهتمام والسعادة.",
  "أنا أستطيع التغيير والنمو والتطور.",
];

export const GRATITUDE_VERSE = {
  text: "وَلَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
  source: "[إبراهيم: 7]",
};
