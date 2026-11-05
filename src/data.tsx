import type { ComponentType, ReactNode } from "react";
import type { IconBaseProps } from "react-icons";
import {
  FaBook,
  FaBrain,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaComments,
  FaEnvelope,
  FaFlask,
  FaGithub,
  FaGlobe,
  FaGraduationCap,
  FaHammer,
  FaLaptopCode,
  FaLayerGroup,
  FaLightbulb,
  FaLinkedin,
  FaPuzzlePiece,
  FaPython,
  FaRobot,
  FaSearch,
  FaShieldAlt,
  FaTasks,
  FaUsers,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  SiClaude,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMdx,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

export type IconType = ComponentType<IconBaseProps>;

export const site = {
  name: "Aaquib Ali",
  handle: "aaquibali",
  location: "Manas, Kyrgyzstan",
  coords: { lat: 40.945, lng: 72.9931 },
  /** Cities always pinned on the globe, alongside Manas and live visitor cities. */
  globePins: [
    { city: "Delhi", lat: 28.6139, lng: 77.209 },
    { city: "Dubai", lat: 25.2048, lng: 55.2708 },
    { city: "Tashkent", lat: 41.2995, lng: 69.2401 },
    { city: "Bishkek", lat: 42.8746, lng: 74.5698 },
  ],
  email: "imaaquibali@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1OCadGX_mn3dTkS7x58cs27twIOzd92cD/view?usp=sharing",
};

export const roles = ["Teacher", "Builder", "Writer", "AI Explainer"];

const B = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
);

export const aboutParagraphs: ReactNode[] = [
  <>
    Aaquib Ali is an <B>educator</B>, <B>technology enthusiast</B>, and <B>aspiring entrepreneur</B> who
    believes that education should evolve alongside technology. With a background in{" "}
    <B>Computer Science and Mathematics education</B>, he combines his experience in teaching with an
    interest in software development, artificial intelligence, and digital product design.
  </>,
];

/** Shown under "Who is Aaquib?" when the visitor clicks "Know more". */
export const aboutMore: ReactNode[] = [
  "His work extends beyond traditional classroom teaching. He is interested in identifying real challenges faced by teachers and students and developing practical, technology-driven solutions to address them. His approach brings together educational knowledge, creative problem-solving, and an entrepreneurial mindset.",
  "With a growing interest in AI-powered applications, EdTech platforms, web development, and user experience design, he aims to transform educational ideas into useful digital products. He is particularly interested in making learning more accessible, structured, engaging, and effective through technology.",
  "Rather than seeing himself solely as a teacher or developer, Aaquib is building an identity at the intersection of education, technology, innovation, and entrepreneurship.",
  "His broader vision is to move beyond simply using technology in education and start building the technology that shapes its future.",
];

export const techStack: { name: string; Icon: IconType; color: string }[] = [
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "MDX", Icon: SiMdx, color: "#1B1F24" },
  { name: "OpenAI", Icon: SiOpenai, color: "#000000" },
  { name: "Claude", Icon: SiClaude, color: "#D97757" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "#181717" },
  { name: "Vercel", Icon: SiVercel, color: "#000000" },
];

export const teachingSkills: { name: string; Icon: IconType }[] = [
  { name: "Plain-language explanations", Icon: FaComments },
  { name: "Inquiry-based learning", Icon: FaSearch },
  { name: "Project-based learning", Icon: FaHammer },
  { name: "Student-centred learning", Icon: FaUsers },
  { name: "Computational thinking", Icon: FaBrain },
  { name: "Problem solving", Icon: FaLightbulb },
  { name: "Differentiation", Icon: FaLayerGroup },
  { name: "Scaffolding", Icon: FaPuzzlePiece },
  { name: "Assessment for Learning", Icon: FaClipboardCheck },
  { name: "Formative & summative assessment", Icon: FaTasks },
  { name: "Lesson planning", Icon: FaBook },
  { name: "Schemes of work", Icon: FaCalendarAlt },
  { name: "Cambridge IGCSE CS & ICT", Icon: FaGraduationCap },
  { name: "Teaching Python", Icon: FaPython },
  { name: "Web development", Icon: FaLaptopCode },
  { name: "AI in the classroom", Icon: FaRobot },
  { name: "STEM projects", Icon: FaFlask },
  { name: "Classroom management", Icon: FaChalkboardTeacher },
  { name: "Safeguarding & wellbeing", Icon: FaShieldAlt },
  { name: "Digital citizenship", Icon: FaGlobe },
];

export const freelanceText =
  "Want a CS concept explained, a lesson built, or an idea turned into a working product? You can usually find me teaching, building, or writing — usually all three.";

export const experience = [
  {
    id: 1,
    company: "“SAPAT” International Educational Institution",
    logo: "/sapat-logo.png",
    location: "Manas",
    role: "Computer Science Teacher",
    period: "2023 — Present",
    description:
      "Teaching Cambridge IGCSE Computer Science and ICT with inquiry-based, project-based, and student-centred learning — developing computational thinking, problem-solving, and digital literacy.",
    responsibilities: [
      "Deliver engaging Cambridge IGCSE Computer Science and ICT lessons using inquiry-based, project-based, and student-centred learning strategies to develop computational thinking, problem-solving, and digital literacy.",
      "Plan and deliver schemes of work, lesson plans, assessments, and learning resources aligned with Cambridge International curriculum standards and learning objectives.",
      "Integrate Python programming, web development, artificial intelligence tools, and educational technology into classroom instruction to prepare students with future-ready digital skills.",
      "Differentiate instruction to meet diverse learning needs by implementing targeted teaching strategies, scaffolding, and individualized support that enable every learner to achieve their potential.",
      "Monitor student progress using Assessment for Learning (AfL), formative and summative assessments, providing timely feedback and intervention to improve academic performance.",
      "Foster an inclusive, positive, and well-managed classroom environment that promotes safeguarding, student wellbeing, collaboration, creativity, and responsible digital citizenship.",
      "Organize coding activities, STEM projects, and technology-based learning experiences that encourage innovation, teamwork, and real-world problem-solving.",
      "Collaborate with teachers, school leadership, and parents to support curriculum development, student achievement, and whole-school technology initiatives while contributing to continuous school improvement.",
    ],
    tools: ["Cambridge IGCSE", "Python", "Web Development", "AI Tools", "EdTech"],
  },
];

export const socials: { name: string; Icon: IconType; url: string }[] = [
  { name: "GitHub", Icon: FaGithub, url: "https://github.com/aliaaquib" },
  { name: "X (Twitter)", Icon: FaXTwitter, url: "https://x.com/imaaquibali" },
  { name: "LinkedIn", Icon: FaLinkedin, url: "https://www.linkedin.com/in/aliaaquib" },
  { name: "Email", Icon: FaEnvelope, url: "mailto:imaaquibali@gmail.com" },
];

export type CaseStudy = {
  role: string;
  timeline: string;
  overview: string;
  problem: string;
  goals: string[];
  process: { title: string; body: string }[];
  solution: { title: string; body: string }[];
  outcome: string;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image?: string;
  liveUrl?: string;
  status: "live" | "building";
  stat?: string;
  category: string[];
  tech: string[];
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    id: "thread-academy",
    title: "Thread Academy",
    tagline: "A free learning platform covering the full school curriculum.",
    description:
      "A free learning platform covering the full school curriculum — every chapter reads like a textbook page. Three curricula, one chapter library, zero servers.",
    image: "/images/work/thread-academy.png",
    liveUrl: "https://threadacademy.aaquibali.com/",
    status: "live",
    stat: "3 curricula",
    category: ["Education", "Product"],
    tech: ["Next.js", "MDX", "Tailwind CSS", "Vercel"],
    caseStudy: {
      role: "Design, content and engineering",
      timeline: "Ongoing",
      overview:
        "Thread Academy is a free learning platform covering the full school curriculum — Cambridge, American and IB — where every chapter reads like a textbook page.",
      problem:
        "Each curriculum slices subjects and levels differently. Writing separate chapters for each one means three copies of the same lesson that slowly drift apart.",
      goals: [
        "Write every chapter once and reuse it across all three curricula",
        "Keep pages fast on weak connections",
        "Let one person maintain the whole library without it going stale",
      ],
      process: [
        { title: "Curriculum maps", body: "One map per curriculum — Cambridge (IGCSE, A-Level), American (K-12) and IB (MYP, DP) — each with its own level order." },
        { title: "Chapter library", body: "A single source of truth: MDX chapters with prose and components, written once and used three times." },
        { title: "Build", body: "Static export pre-renders every page at build time. No runtime server." },
        { title: "Pages", body: "Thousands of CDN-cached static pages that cost almost nothing to serve." },
      ],
      solution: [
        { title: "Fix once, fixed everywhere", body: "Curriculum maps point at shared chapters, so a correction lands in every curriculum at once." },
        { title: "No CMS, no database", body: "The files are the source of truth — and the files are the site. Nothing to break." },
        { title: "Plain language first", body: "One idea per chapter, human voice, no hype. Teach, don't lecture." },
      ],
      outcome: "3 curricula, 13 subjects, one chapter library.",
    },
  },
];

export type Lab = {
  id: string;
  title: string;
  description: string;
  subject: string;
  level?: string;
  image?: string;
  url: string;
};

/**
 * Simulators on the Labs page, newest first. `url` can be an outside link, or a page you put in
 * public/labs/ (e.g. public/labs/sorting.html → url: "/labs/sorting.html"). `image` is optional (16:9).
 *
 * Example:
 * { id: "sorting", title: "Sorting Visualiser", description: "Watch bubble, merge and quick sort race.",
 *   subject: "Computer Science", level: "IGCSE", image: "/labs/sorting.png", url: "/labs/sorting.html" },
 */
export const labs: Lab[] = [];

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number; // index into options
  explain: string;
  slug?: string; // blog post with the full explanation
};

/** Quiz of the day on Home: one question per day, in order, looping. Add more any time. */
export const quiz: QuizQuestion[] = [
  {
    question: "What does a recursive function need so it doesn't run forever?",
    options: ["A base case", "A global variable", "A for loop", "More memory"],
    answer: 0,
    explain:
      "Every call has to move towards a base case, the point where the function stops calling itself. Without one it's two mirrors facing each other: it never ends, until the program runs out of memory.",
    slug: "recursion-explained-simply",
  },
  {
    question: "A loop checks every item in a list of n items once. What's its Big-O?",
    options: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
    answer: 1,
    explain: "The work grows in step with the list: double the items, double the checks. That's O(n), linear time.",
    slug: "big-o-notation-plain-english",
  },
  {
    question: "Which of these grows fastest as n gets large?",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
    answer: 1,
    explain: "O(n²) usually means a loop inside a loop. With 1,000 items that's about a million steps.",
    slug: "big-o-notation-plain-english",
  },
  {
    question: "Binary search on a sorted list of 1,000,000 items needs roughly how many checks?",
    options: ["About 20", "About 1,000", "About 500,000", "About 1,000,000"],
    answer: 0,
    explain: "Each check halves what's left. 2²⁰ is about a million, so around 20 checks find any item. That's O(log n).",
    slug: "big-o-notation-plain-english",
  },
  {
    question: "In plain English, an API is most like…",
    options: ["A waiter carrying your order to the kitchen", "A database", "A programming language", "A web browser"],
    answer: 0,
    explain:
      "You ask for something (the request), the waiter takes it to the kitchen (the server) and brings back your food (the response). You never need to know how the kitchen works.",
    slug: "what-is-an-api",
  },
  {
    question: "A website replies with status code 404. What happened?",
    options: ["Success", "Not found", "The server crashed", "You're not logged in"],
    answer: 1,
    explain: "404 means the thing you asked for doesn't exist at that address. 200 is success, 401 is not logged in, 500 is a server error.",
    slug: "what-is-an-api",
  },
  {
    question: "What does DNS do?",
    options: ["Encrypts your data", "Speeds up your Wi-Fi", "Turns names like google.com into IP addresses", "Stores websites"],
    answer: 2,
    explain: "DNS is the internet's phone book: you type a name, it looks up the number (IP address) your computer actually needs to connect.",
    slug: "how-the-internet-actually-works",
  },
  {
    question: "When you load a web page, the data travels in small chunks called…",
    options: ["Pixels", "Cookies", "Packets", "Threads"],
    answer: 2,
    explain: "Data is split into packets that can take different routes and get reassembled at your end, like sending a book one numbered page at a time.",
    slug: "how-the-internet-actually-works",
  },
  {
    question: "At its core, how does a chatbot like ChatGPT or Claude write an answer?",
    options: ["It searches Google", "It copies a stored answer", "It predicts the next word, one at a time", "It thinks exactly like a human"],
    answer: 2,
    explain: "It's your phone keyboard's next-word guess, scaled up enormously: it picks a likely next word, adds it, and repeats.",
    slug: "how-ai-actually-works",
  },
  {
    question: "x = 5, then x = x + 2. What does print(x) show?",
    options: ["5", "7", "52", "An error"],
    answer: 1,
    explain: "x = x + 2 reads the old value (5), adds 2, and stores the result back in x. So x is now 7.",
  },
  {
    question: "Which of these is a valid Python variable name?",
    options: ["2score", "my-score", "my_score", "class"],
    answer: 2,
    explain:
      "Names can't start with a digit, can't contain a hyphen (Python reads it as minus), and can't be a reserved word like class. my_score is fine.",
  },
  {
    question: "What is the binary number 1010 in decimal?",
    options: ["8", "10", "12", "1010"],
    answer: 1,
    explain: "Reading right to left, the places are worth 1, 2, 4 and 8. 1010 has the 8 and the 2 switched on: 8 + 2 = 10.",
  },
];

export const linkedin = {
  profileUrl: "https://www.linkedin.com/in/aliaaquib",
  headline: "Computer Science Teacher (Cambridge IGCSE/A-Level) | One plain-language CS concept daily",
  posts: [
    {
      date: "5 Oct 2026",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7512824131122352128/",
      paragraphs: [
        "Teachers’ Day always makes me think back to the people who actually changed the trajectory of my life.",
        "We usually credit our success to hard work, opportunities, or right-place-right-time luck. But if you trace almost any skill, habit, or confident decision back to its root, there’s usually a teacher or mentor standing there.",
      ],
    },
    {
      date: "30 Sep 2026",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7510895261205016576/",
      paragraphs: [
        "OpenAI launched something yesterday called Dots, and I can't stop thinking about what I'd do with one.",
        "Plain version: it's an AI helper that doesn't wait for you to ask. You give it a job \"keep working on that\", \"watch this for me\" and it keeps going in the background on its own little computer, even after you close the chat. You can talk to it on Slack or Teams too.",
      ],
    },
    {
      date: "27 Sep 2026",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7509883564625395712/",
      paragraphs: [
        "Recursion broke my brain when I first learned it.",
        "Not the idea itself. The idea is stupidly simple. A function that calls itself. Done.",
        "What broke me was every tutorial explaining it like I already got it. Five paragraphs of setup before saying the one sentence that matters. So when I teach it now, I skip all that. I just say, stand between two mirrors.",
      ],
    },
    {
      date: "24 Sep 2026",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7508741825415761920/",
      paragraphs: [
        "My students asked me how AI actually works in class today. No hype, no jargon — here's the 5-minute version I gave them.",
        "You know how your phone's keyboard guesses your next word? AI is basically that.",
      ],
    },
  ],
};
