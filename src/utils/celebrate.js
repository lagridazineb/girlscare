import confetti from "canvas-confetti";

export function celebrate() {
  const colors = ["#d6417a", "#f6cbd6", "#dcae5b", "#ffffff"];
  confetti({
    particleCount: 90,
    spread: 75,
    startVelocity: 32,
    origin: { y: 0.7 },
    colors,
    scalar: 0.9,
    ticks: 200,
  });
  setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 100,
      startVelocity: 20,
      origin: { y: 0.6 },
      colors,
      scalar: 0.7,
    });
  }, 200);
}
