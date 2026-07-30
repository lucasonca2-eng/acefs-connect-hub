export function ServiceIcon({ name }: { name: string }) {
  const stroke = { stroke: "currentColor", strokeWidth: 1.6, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;
  switch (name) {
    case "shield":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "certificate":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M7 9h10M7 12h6" />
          <path d="M9 17l-1 4 3-2 3 2-1-4" />
        </svg>
      );
    case "book":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z" />
          <path d="M4 19a2 2 0 012-2h13" />
        </svg>
      );
    case "network":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="12" cy="18" r="2.5" />
          <path d="M8 7l3 9M16 7l-3 9M8 6h8" />
        </svg>
      );
    case "balance":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <path d="M12 3v18M6 21h12M4 8h16M4 8l-2 6a3 3 0 006 0L6 8M18 8l-2 6a3 3 0 006 0l-2-6" />
        </svg>
      );
    case "building":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <rect x="4" y="3" width="16" height="18" rx="1.5" />
          <path d="M8 7h3M13 7h3M8 11h3M13 11h3M10 21v-4h4v4" />
        </svg>
      );
    case "mic":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0014 0M12 18v3M9 21h6" />
        </svg>
      );
    case "chart":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <path d="M4 20h16M7 16v-5M12 16V7M17 16v-8" />
        </svg>
      );
    case "coins":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <ellipse cx="9" cy="7" rx="5" ry="2.5" />
          <path d="M4 7v5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V7" />
          <path d="M10 17c.7 1.2 2.7 2 5 2 2.8 0 5-1.1 5-2.5v-5c0-1.4-2.2-2.5-5-2.5-.7 0-1.4.07-2 .2" />
        </svg>
      );
    case "heart":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <path d="M12 20s-7-4.4-7-9a4 4 0 017-2.6A4 4 0 0119 11c0 4.6-7 9-7 9z" />
        </svg>
      );
    case "bolt":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      );
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}