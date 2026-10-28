import { playTick } from "@/lib/tick";

const COLORS = ["#25D366", "#ff2d3c", "#facc15", "#67e8f9", "#ffffff", "#c4b5fd"];

export function celebrate(x: number, y: number) {
  const root = document.createElement("div");
  root.className = "celebrate-root";
  root.style.left = `${x}px`;
  root.style.top = `${y}px`;

  for (let i = 0; i < 32; i += 1) {
    const bit = document.createElement("span");
    bit.className = "celebrate-bit";
    const angle = (Math.PI * 2 * i) / 32 + (Math.random() - 0.5) * 0.35;
    const dist = 64 + Math.random() * 110;
    bit.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
    bit.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
    bit.style.background = COLORS[i % COLORS.length];
    bit.style.width = i % 4 === 0 ? "7px" : "5px";
    bit.style.height = bit.style.width;
    bit.style.animationDelay = `${Math.random() * 40}ms`;
    root.appendChild(bit);
  }

  document.body.appendChild(root);
  window.setTimeout(() => root.remove(), 900);
}

export function openWhatsApp(event: { preventDefault: () => void; clientX: number; clientY: number }, url: string) {
  event.preventDefault();
  playTick();
  celebrate(event.clientX, event.clientY);
  window.setTimeout(() => window.open(url, "_blank", "noopener,noreferrer"), 220);
}
