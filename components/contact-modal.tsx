"use client";

import { useEffect, useState } from "react";

const RESUME_URL =
  "https://drive.google.com/file/d/1OCadGX_mn3dTkS7x58cs27twIOzd92cD/view?usp=sharing";

export function ContactButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-contact"))}
      className={className}
    >
      Contact me
    </button>
  );
}

export function ContactModalHost() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleOpen() {
      setOpen(true);
    }
    window.addEventListener("open-contact", handleOpen);
    return () => window.removeEventListener("open-contact", handleOpen);
  }, []);

  if (!open) return null;
  return <ContactModal onClose={() => setOpen(false)} />;
}

const ROWS: { label: string; value: React.ReactNode }[] = [
  {
    label: "Email",
    value: (
      <a href="mailto:imaaquibali@gmail.com" className="underline decoration-strong/30 underline-offset-4 hover:text-brandred hover:decoration-brandred">
        imaaquibali@gmail.com
      </a>
    ),
  },
  {
    label: "LinkedIn",
    value: (
      <a href="https://www.linkedin.com/in/aliaaquib" target="_blank" rel="noreferrer" className="underline decoration-strong/30 underline-offset-4 hover:text-brandred hover:decoration-brandred">
        Aaquib Ali ↗
      </a>
    ),
  },
  {
    label: "GitHub",
    value: (
      <a href="https://github.com/aliaaquib" target="_blank" rel="noreferrer" className="underline decoration-strong/30 underline-offset-4 hover:text-brandred hover:decoration-brandred">
        aliaaquib ↗
      </a>
    ),
  },
  {
    label: "Resume",
    value: (
      <a href={RESUME_URL} target="_blank" rel="noreferrer" className="underline decoration-strong/30 underline-offset-4 hover:text-brandred hover:decoration-brandred">
        Download
      </a>
    ),
  },
];

function ContactModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Contact Aaquib"
    >
      <button
        type="button"
        aria-label="Close contact dialog"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-strong/30 backdrop-blur-[2px]"
      />
      <div className="relative grid w-full max-w-2xl animate-contact-pop overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_rgba(63,58,52,0.3)] sm:grid-cols-[220px_1fr]">
        <div className="relative hidden min-h-full sm:block">
          <img
            src="/portrait.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="p-8 sm:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-signature text-[36px] leading-none text-strong">
                Aaquib Ali
              </p>
              <h2 className="mt-3 font-display text-4xl tracking-tight text-strong">
                Let&apos;s talk.
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl leading-none text-muted transition-colors hover:bg-strong/5 hover:text-strong"
            >
              ×
            </button>
          </div>
          <dl className="mt-8 space-y-5">
            {ROWS.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-6">
                <dt className="text-sm text-muted">{row.label}</dt>
                <dd className="text-[15px] font-medium text-strong">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
