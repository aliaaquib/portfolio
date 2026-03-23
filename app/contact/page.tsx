import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.05),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 bg-grid bg-[size:32px_32px] opacity-20" />

      <section className="relative mx-auto w-full max-w-4xl px-6 py-20 sm:px-10 lg:pl-20 lg:pr-14">
        <div className="space-y-10">
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted sm:text-xs">
              <Link href="/" className="transition-colors duration-200 hover:text-accent">
                ~/home
              </Link>
              <span className="text-muted/40">/</span>
              <span className="text-accent">contact</span>
            </div>
            <h1 className="text-2xl font-medium leading-tight text-strong sm:text-4xl">contact</h1>
            <p className="max-w-2xl text-xs leading-7 text-muted sm:text-sm">
              if you want to talk about teaching, writing, ai, automation, or building thoughtful
              systems, leave a note here and it will land in my inbox.
            </p>
            <div className="border-b border-muted/20" />
          </header>

          <form
            action="https://formsubmit.co/imaaquibali@gmail.com"
            method="POST"
            className="space-y-8 border-b border-muted/20 pb-10"
          >
            <input type="hidden" name="_subject" value="New portfolio contact message" />
            <input type="hidden" name="_captcha" value="false" />

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-[11px] uppercase tracking-[0.18em] text-accent/70 sm:text-xs"
              >
                name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full border-b border-muted/30 bg-transparent px-0 py-3 text-xs text-strong outline-none placeholder:text-muted/50 focus:border-accent sm:text-sm"
                placeholder="your name"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-[11px] uppercase tracking-[0.18em] text-accent/70 sm:text-xs"
              >
                email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full border-b border-muted/30 bg-transparent px-0 py-3 text-xs text-strong outline-none placeholder:text-muted/50 focus:border-accent sm:text-sm"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-[11px] uppercase tracking-[0.18em] text-accent/70 sm:text-xs"
              >
                query
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full resize-none border border-muted/20 bg-transparent px-4 py-4 text-xs leading-7 text-strong outline-none placeholder:text-muted/50 focus:border-accent sm:text-sm"
                placeholder="write your message here"
              />
            </div>

            <button
              type="submit"
              className="text-[11px] uppercase tracking-[0.18em] text-strong transition-colors duration-200 hover:text-accent sm:text-xs"
            >
              [send message]
            </button>
          </form>

          <SiteFooter />
        </div>
      </section>
    </main>
  );
}
