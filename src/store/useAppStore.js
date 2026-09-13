import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CHECKLIST_SECTIONS } from "../data/dailyChecklist";

export const TOTAL_DAYS = 66;

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function emptyChecklist() {
  const obj = {};
  CHECKLIST_SECTIONS.forEach((section) => {
    section.items.forEach((item) => {
      obj[`${section.key}.${item.key}`] = false;
    });
  });
  return obj;
}

function emptyDay() {
  return {
    date: null,
    checklist: emptyChecklist(),
    mood: null,
    todayFeel: "",
    whatHappened: "",
    achievement: "",
    feelingToday: "",
    selfTreatment: "",
    tomorrowNote: "",
    gratitude: ["", "", "", "", ""],
    dailyMessage: "",
    completed: false,
    completedAt: null,
  };
}

function emptyWeekQuran() {
  const days = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];
  const rows = {};
  days.forEach((d) => {
    rows[d] = { date: "", reading: "", notes: "" };
  });
  return rows;
}

function emptyWeek() {
  return {
    quran: emptyWeekQuran(),
    quranGoals: ["", "", ""],
    quranHabits: [false, false, false],
    reviewRatings: {
      faith: 5, calm: 5, selfTrust: 5, selfInvest: 5, health: 5,
      discipline: 5, focus: 5, relations: 5, happiness: 5,
    },
    proudOf: ["", "", ""],
    oneThingChanged: "",
    leaveBehindChecked: [],
    leaveBehindOther: "",
    focusOn: ["", "", ""],
    nextWeekPlan: ["", "", ""],
    letterToSelf: "",
    challengeTracker: Array(7).fill(false),
    challengeReflections: {},
  };
}

function emptyTodo() {
  return [];
}

// Stable fallback references so components never receive a freshly-created
// object from a selector (which would break useSyncExternalStore caching).
const DEFAULT_WEEK = emptyWeek();
const DEFAULT_DAY = emptyDay();


export const useAppStore = create(
  persist(
    (set, get) => ({
      // ---------- profile ----------
      profile: {
        name: "",
        startDate: null,
        pledgeSignature: "",
        onboarded: false,
        quiz: {
          whoAmI: "",
          trueWish: "",
          spiritualGoal: "",
          emotionalGoal: "",
          physicalGoal: "",
          careerGoal: "",
          financialGoal: "",
          futureGoal: "",
          values: "",
          challenges: "",
          legacy: "",
        },
      },

      setProfile: (patch) => set((state) => ({ profile: { ...state.profile, ...patch } })),
      setQuizAnswer: (key, value) =>
        set((state) => ({ profile: { ...state.profile, quiz: { ...state.profile.quiz, [key]: value } } })),
      completeOnboarding: (name) =>
        set((state) => ({
          profile: {
            ...state.profile,
            name,
            startDate: state.profile.startDate || todayISO(),
            onboarded: true,
          },
        })),

      // ---------- days ----------
      days: {}, // { [dayNumber]: dayObject }

      getDay: (dayNumber) => {
        const d = get().days[dayNumber];
        return d || DEFAULT_DAY;
      },

      updateDay: (dayNumber, patch) =>
        set((state) => {
          const existing = state.days[dayNumber] || emptyDay();
          return {
            days: {
              ...state.days,
              [dayNumber]: { ...existing, ...patch, date: existing.date || todayISO() },
            },
          };
        }),

      toggleCheck: (dayNumber, sectionKey, itemKey) =>
        set((state) => {
          const existing = state.days[dayNumber] || emptyDay();
          const field = `${sectionKey}.${itemKey}`;
          const newChecklist = { ...existing.checklist, [field]: !existing.checklist[field] };
          return {
            days: {
              ...state.days,
              [dayNumber]: { ...existing, checklist: newChecklist, date: existing.date || todayISO() },
            },
          };
        }),

      setGratitudeItem: (dayNumber, index, value) =>
        set((state) => {
          const existing = state.days[dayNumber] || emptyDay();
          const grat = [...existing.gratitude];
          grat[index] = value;
          return { days: { ...state.days, [dayNumber]: { ...existing, gratitude: grat } } };
        }),

      markDayComplete: (dayNumber) =>
        set((state) => {
          const existing = state.days[dayNumber] || emptyDay();
          return {
            days: {
              ...state.days,
              [dayNumber]: { ...existing, completed: true, completedAt: new Date().toISOString() },
            },
            currentDay: Math.min(TOTAL_DAYS, Math.max(state.currentDay, dayNumber + 1)),
          };
        }),

      // ---------- weeks ----------
      weeks: {}, // { [weekNumber]: weekObject }

      getWeek: (weekNumber) => get().weeks[weekNumber] || DEFAULT_WEEK,

      updateWeek: (weekNumber, patch) =>
        set((state) => {
          const existing = state.weeks[weekNumber] || emptyWeek();
          return { weeks: { ...state.weeks, [weekNumber]: { ...existing, ...patch } } };
        }),

      updateWeekQuranRow: (weekNumber, dayName, patch) =>
        set((state) => {
          const existing = state.weeks[weekNumber] || emptyWeek();
          return {
            weeks: {
              ...state.weeks,
              [weekNumber]: {
                ...existing,
                quran: { ...existing.quran, [dayName]: { ...existing.quran[dayName], ...patch } },
              },
            },
          };
        }),

      toggleLeaveBehind: (weekNumber, option) =>
        set((state) => {
          const existing = state.weeks[weekNumber] || emptyWeek();
          const has = existing.leaveBehindChecked.includes(option);
          const list = has
            ? existing.leaveBehindChecked.filter((o) => o !== option)
            : [...existing.leaveBehindChecked, option];
          return { weeks: { ...state.weeks, [weekNumber]: { ...existing, leaveBehindChecked: list } } };
        }),

      toggleChallengeDay: (weekNumber, dayIndex) =>
        set((state) => {
          const existing = state.weeks[weekNumber] || emptyWeek();
          const tracker = [...existing.challengeTracker];
          tracker[dayIndex] = !tracker[dayIndex];
          return { weeks: { ...state.weeks, [weekNumber]: { ...existing, challengeTracker: tracker } } };
        }),

      setChallengeReflection: (weekNumber, key, value) =>
        set((state) => {
          const existing = state.weeks[weekNumber] || emptyWeek();
          return {
            weeks: {
              ...state.weeks,
              [weekNumber]: {
                ...existing,
                challengeReflections: { ...existing.challengeReflections, [key]: value },
              },
            },
          };
        }),

      // ---------- todos ----------
      todos: emptyTodo(),
      addTodo: (text, dayNumber) =>
        set((state) => ({
          todos: [
            ...state.todos,
            { id: crypto.randomUUID(), text, done: false, dayNumber: dayNumber ?? null, createdAt: Date.now() },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
        })),
      deleteTodo: (id) => set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),
      editTodo: (id, text) =>
        set((state) => ({ todos: state.todos.map((t) => (t.id === id ? { ...t, text } : t)) })),

      // ---------- final pages ----------
      futureLetterAnswers: { remember: "", neverReturn: "", continueIn: "", promise: "" },
      setFutureLetterAnswer: (key, value) =>
        set((state) => ({ futureLetterAnswers: { ...state.futureLetterAnswers, [key]: value } })),

      finalCommitment: { habit: "", goal: "", noReturn: "", promise: "", signature: "", date: "" },
      setFinalCommitment: (patch) =>
        set((state) => ({ finalCommitment: { ...state.finalCommitment, ...patch } })),

      // ---------- ui / navigation ----------
      currentDay: 1,
      setCurrentDay: (n) => set({ currentDay: Math.min(TOTAL_DAYS, Math.max(1, n)) }),
      bookTargetPage: null,
      setBookTargetPage: (idx) => set({ bookTargetPage: idx }),

      // ---------- derived helpers ----------
      getProgress: () => {
        const state = get();
        const completedDays = Object.values(state.days).filter((d) => d.completed).length;
        return {
          completedDays,
          totalDays: TOTAL_DAYS,
          percent: Math.round((completedDays / TOTAL_DAYS) * 100),
          currentDay: state.currentDay,
        };
      },

      getStreak: () => {
        const state = get();
        let streak = 0;
        for (let d = state.currentDay; d >= 1; d--) {
          if (state.days[d]?.completed) streak++;
          else break;
        }
        return streak;
      },

      resetAll: () =>
        set({
          profile: {
            name: "", startDate: null, pledgeSignature: "", onboarded: false,
            quiz: { whoAmI: "", trueWish: "", spiritualGoal: "", emotionalGoal: "", physicalGoal: "", careerGoal: "", financialGoal: "", futureGoal: "", values: "", challenges: "", legacy: "" },
          },
          days: {},
          weeks: {},
          todos: [],
          currentDay: 1,
          futureLetterAnswers: { remember: "", neverReturn: "", continueIn: "", promise: "" },
          finalCommitment: { habit: "", goal: "", noReturn: "", promise: "", signature: "", date: "" },
        }),
    }),
    {
      name: "fatislaaay-storage",
      version: 1,
    }
  )
);
