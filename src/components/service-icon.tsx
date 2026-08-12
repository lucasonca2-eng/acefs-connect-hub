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
    case "building":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <rect x="4" y="3" width="16" height="18" rx="1" />
          <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" />
          <path d="M10 21v-4h4v4" />
        </svg>
      );
    case "health":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <path d="M20.5 8.5c0 5-8.5 10.5-8.5 10.5S3.5 13.5 3.5 8.5a4.5 4.5 0 018-3 4.5 4.5 0 019 3z" />
        </svg>
      );
    case "auditorium":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <rect x="3" y="4" width="18" height="12" rx="1" />
          <path d="M3 20l4-4M21 20l-4-4M9 20h6" />
        </svg>
      );
    case "presentation":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <circle cx="12" cy="6" r="2.5" />
          <path d="M12 9v6M8 21l4-6 4 6M6 13h12" />
        </svg>
      );
    case "credit":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <circle cx="8" cy="8" r="5" />
          <circle cx="15" cy="15" r="5" />
        </svg>
      );
    case "radio":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <circle cx="12" cy="14" r="2.4" />
          <path d="M8.5 10.5a5 5 0 017 0M5.5 7.5a9 9 0 0113 0" />
          <path d="M6 14H4M20 14h-2" />
        </svg>
      );
    case "scale":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
          <path d="M12 3v18M6 7h12M6 7l-3 6a3 3 0 006 0l-3-6zM18 7l-3 6a3 3 0 006 0l-3-6z" />
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