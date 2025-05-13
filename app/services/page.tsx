import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      title: "Web Development",
      description: "Building responsive and performant web applications using modern technologies like React, Next.js, and Tailwind CSS.",
    },
    {
      title: "UI/UX Design",
      description: "Designing intuitive and aesthetically pleasing user interfaces with a focus on user experience.",
    },
    {
      title: "SEO Optimization",
      description: "Improving website visibility and search engine ranking through best SEO practices.",
    },
    {
      title: "Content Writing",
      description: "Crafting compelling and clear copy for websites, blogs, and digital campaigns.",
    },
  ];

  return (
    <div className="mt-10 max-w-3xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Services</h1>
        <p className="text-lg text-muted-foreground">
          Here&apos;s a list of the services I offer to help you grow your digital presence.
        </p>
        <hr className="border-muted" />
      </div>

      <ul className="space-y-6">
        {services.map((service, index) => (
          <li key={index} className="rounded-xl border border-muted p-6 shadow-sm transition-colors hover:bg-accent/30">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-primary" size={20} />
              <h3 className="text-xl font-semibold">{service.title}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{service.description}</p>
          </li>
        ))}
      </ul>

      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-accent hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
