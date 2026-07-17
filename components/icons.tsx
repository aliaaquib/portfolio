export function SendIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.8 3.7c.7-.3 1.4.4 1.1 1.1l-7 16c-.3.8-1.5.7-1.8-.1l-2.2-6.3-6.3-2.2c-.8-.3-.9-1.4-.1-1.8l16.3-6.7Z" />
    </svg>
  );
}

export function BackIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className={className}
    >
      <path d="M9 14 4 9l5-5" />
      <path d="M4 9h10a6 6 0 0 1 0 12h-1" />
    </svg>
  );
}
