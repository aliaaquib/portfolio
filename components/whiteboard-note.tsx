/** Handwritten margin note — invisible until whiteboard (teacher) mode is on. */
export function WhiteboardNote({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`wb-note font-signature leading-tight ${className}`}>
      {children}
    </span>
  );
}
