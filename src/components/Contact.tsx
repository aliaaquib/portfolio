import { motion } from "framer-motion";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { site, socials } from "../data";

// Get a free key at https://web3forms.com and put it in .env as VITE_WEB3FORMS_KEY.
// Without a key the form falls back to opening the visitor's email app.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

const field =
  "w-full bg-transparent border border-black/10 dark:border-white/15 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 outline-none focus:border-black/30 dark:focus:border-white/40 transition-colors duration-150";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const send = async () => {
    if (!name.trim() || !email.trim() || !message.trim() || status === "sending") return;
    const subject = `Let's work together - ${name.trim()}`;
    if (!WEB3FORMS_KEY) {
      const body = `${message.trim()}\n\n— ${name.trim()} (${email.trim()})`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setStatus("sending");
    try {
      const form = new FormData();
      form.append("access_key", WEB3FORMS_KEY);
      form.append("subject", subject);
      form.append("name", name.trim());
      form.append("email", email.trim());
      form.append("message", message.trim());
      const res = await (await fetch("https://api.web3forms.com/submit", { method: "POST", body: form })).json();
      if (res.success) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="w-full min-h-screen relative z-20 flex flex-col items-center pt-28 md:pt-36 pb-32 px-6 bg-[#FFFEFD] dark:bg-dark-bg transition-colors duration-150">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[520px]"
      >
        <div className="dashed-border-anim rounded-2xl w-full">
          <div className="bg-white dark:bg-dark-surface rounded-2xl p-7 md:p-9 transition-colors duration-150">
            <h1 className="font-instrument font-semibold text-2xl md:text-3xl text-gray-800 dark:text-white mb-2">Send a Message</h1>
            <p className="font-sans text-sm text-cherry-textSecondary dark:text-white/50 leading-relaxed mb-7">
              Want me to teach, build, or write something with you? Fill out the form and I'll get back to you within 24 hours.
            </p>
            <div className="flex flex-col gap-4">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className={field} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className={field} />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
                rows={5}
                className={`${field} resize-none`}
              />
              <button
                onClick={send}
                disabled={status === "sending" || status === "sent"}
                className="glare-button group flex items-center justify-center gap-2 w-full py-3.5 bg-white dark:bg-dark-surface3 border border-black/10 dark:border-white/15 rounded-xl font-medium text-sm text-gray-800 dark:text-white hover:shadow-soft-hover transition-all duration-150 disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    Sending
                    <LoaderCircle size={16} className="animate-spin" />
                  </>
                ) : status === "sent" ? (
                  <>
                    Message Sent
                    <Check size={16} />
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-1" />
                  </>
                )}
              </button>
              {status === "error" && (
                <p className="text-xs text-red-500 text-center">Couldn't send right now - please try again in a moment.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <h2 className="font-sans text-sm font-medium text-cherry-textSecondary dark:text-white/50 mb-4">Connect with me on socials</h2>
          <div className="flex flex-nowrap justify-center items-center gap-2.5">
            {socials.map(({ name: label, Icon, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="glare-button flex items-center justify-center bg-white dark:bg-dark-surface2 border border-black/5 dark:border-white/10 shadow-glass dark:shadow-none rounded-2xl w-12 h-12 transition-all duration-150"
              >
                <Icon size={18} className="text-[#181818] dark:text-white" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
