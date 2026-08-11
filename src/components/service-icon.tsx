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
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}