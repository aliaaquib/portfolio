'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.status === 200) {
        toast.success("Form submitted successfully!");
        setForm({ name: "", email: "", phone: "", service: "", description: "" });
        setTimeout(() => router.push("/"), 2000);
      } else {
        toast.error(result.error || "There was an issue. Please try again.");
      }
    } catch (error) {
      toast.error("Submission failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-12 flex flex-col items-center px-4">
      <ToastContainer />
      <h2 className="mb-6 text-3xl font-bold">Get in Touch</h2>
      <p className="mb-8 max-w-2xl text-center text-lg text-muted-foreground">
        We would love to hear from you! Please fill out the form below.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">
        {/* Name and Email */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full">
            <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-muted bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="w-full">
            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-muted bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Phone and Service */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full">
            <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-muted bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="w-full">
            <label htmlFor="service" className="block text-sm font-medium text-muted-foreground">
              Service You Require
            </label>
            <select
              id="service"
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-muted bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="" disabled>Select a service</option>
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="SEO Services">SEO Services</option>
              <option value="UI/UX Design">UI/UX Design</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-muted-foreground">
            Project Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-muted bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Submit Button with Spinner */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-lg font-semibold text-background transition duration-300 hover:bg-primary/90 disabled:opacity-60"
        >
          {isLoading && (
            <span className="size-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
