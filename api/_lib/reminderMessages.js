// ✏️ EDIT THIS FILE to change what the notifications say.
// {name} is replaced by the user's name (or removed if she didn't give one).
// {day} is replaced by her day in the 66-day challenge.

export const MORNING = [
  { title: "صباح الخير {name} ☀️", body: "ابدئي يومك بأذكار الصباح، وخذي لحظة هدوء مع نفسك 🌸", url: "/#/prayer" },
  { title: "صباحك نور {name} 🌸", body: "اليوم {day} من 66 — خطوة صغيرة اليوم تصنع فرقاً كبيراً ✨", url: "/#/" },
  { title: "يوم جديد، بداية جديدة 🌷", body: "لا تنسي أذكار الصباح وروتين العناية بنفسك 💗", url: "/#/prayer" },
  { title: "صباح الخير {name} 💫", body: "افتحي دفترك وحددي أهم 3 أهداف لليوم 📖", url: "/#/book" },
];

export const EVENING = [
  { title: "مساء الخير {name} 🌙", body: "حان وقت أذكار المساء، ثم راجعي يومك في الدفتر 📖", url: "/#/prayer" },
  { title: "قبل ما ينتهي اليوم 🌸", body: "اليوم {day} من 66 — هل أنهيتِ مهامك؟ سجلي إنجازك 💗", url: "/#/book" },
  { title: "مساؤك طمأنينة {name} ✨", body: "اكتبي 3 أشياء ممتنة لها اليوم، ولا تنسي العناية بالبشرة 🧴", url: "/#/journal" },
  { title: "ختام يوم جميل 🌙", body: "أذكار المساء ثم نوم هادئ — فخورة بالتزامك اليوم 🌷", url: "/#/prayer" },
];

const TOTAL_DAYS = 66;
const dayOfYear = (d) => Math.floor((d - Date.UTC(d.getUTCFullYear(), 0, 0)) / 86400000);

function challengeDay(startDate, now) {
  if (!startDate) return null;
  const start = new Date(startDate);
  if (Number.isNaN(start.getTime())) return null;
  const diff = Math.floor((now - start) / 86400000) + 1;
  return diff >= 1 && diff <= TOTAL_DAYS ? diff : null;
}

export function buildMessage(slot, { name, startDate } = {}, now = new Date()) {
  const list = slot === "evening" ? EVENING : MORNING;
  const day = challengeDay(startDate, now);

  // Skip variants that need {day} if we don't know it.
  const usable = list.filter((m) => day || !`${m.title}${m.body}`.includes("{day}"));
  const pick = usable[dayOfYear(now) % usable.length];

  const fill = (s) =>
    s
      .replaceAll("{day}", String(day ?? ""))
      .replaceAll(" {name}", name ? ` ${name}` : "")
      .replaceAll("{name}", name || "")
      .trim();

  return {
    title: fill(pick.title),
    body: fill(pick.body),
    url: pick.url,
    tag: `fatislaaay-${slot}`,
  };
}
