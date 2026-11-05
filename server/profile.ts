// What the Ask AI assistant knows about Aaquib. Keep in sync with src/data.tsx when facts change.
// Blog posts are appended at runtime from src/content/blog/*.md.

export const profile = `
# Aaquib Ali

- Computer science teacher and builder, based in Manas, Kyrgyzstan.
- Tagline: "Teacher by day, builder the rest of the time."
- Spends his days turning Recursion ("my go-to first lesson"), Big-O ("why your loop is slow, explained on one whiteboard") and how AI actually works ("next-word prediction, no hype — the lesson students quote back to me") into things his students find obvious.
- Takes ideas all the way to working products.
- Writing a book of raw thoughts called "pata hai aaj kya hua". Away from the classroom he writes the occasional poem.
- Posts one plain-language CS concept daily on LinkedIn.

## Teaching skills
- Plain-language explanations, inquiry-based, project-based and student-centred learning.
- Computational thinking, problem solving, differentiation and scaffolding.
- Assessment for Learning, formative and summative assessment, lesson planning and schemes of work.
- Cambridge IGCSE Computer Science and ICT, teaching Python, web development and AI in the classroom.
- STEM projects, classroom management, safeguarding and wellbeing, digital citizenship.

## Experience
- "SAPAT" International Educational Institution — Computer Science Teacher, 2023 to present.
  - Teaches Cambridge IGCSE Computer Science and ICT with inquiry-based, project-based and student-centred learning.
  - Plans schemes of work, lesson plans, assessments and resources aligned with Cambridge International standards.
  - Brings Python programming, web development, AI tools and educational technology into class.
  - Differentiates instruction with scaffolding and individual support; uses Assessment for Learning and formative/summative assessment.
  - Runs coding activities and STEM projects; works with teachers, school leadership and parents on curriculum and school-wide technology.

## Things he has built
- Thread Academy (live, https://threadacademy.aaquibali.com/) — a free learning platform covering the full school curriculum; every chapter reads like a textbook page. Serves Cambridge (IGCSE, A-Level), American (K-12) and IB (MYP, DP) from one shared chapter library written once in MDX; each curriculum has its own map pointing at those chapters. Statically generated with Next.js — no CMS, no database, no runtime server; CDN-cached pages that load fast on weak connections. Target scale: 3 curricula, 13 subjects. Editorial principles: plain language first, one idea per chapter, teach don't lecture, human voice and no hype.
- The Weekly Roundup — an AI-powered newsletter that compresses the week's noise into a five-minute read.

## Contact
- Email: imaaquibali@gmail.com
- LinkedIn: https://www.linkedin.com/in/aliaaquib
- GitHub: https://github.com/aliaaquib
- X: @imaaquibali
- Resume: https://drive.google.com/file/d/1OCadGX_mn3dTkS7x58cs27twIOzd92cD/view?usp=sharing
- Visitors can also use the "let's talk" page on this site to send a message.
`.trim();

export const instructions = `
You are the assistant on Aaquib Ali's personal portfolio website. Visitors ask you about Aaquib — his teaching, the things he builds, his writing, and how to reach him.

Answer from the profile and articles below. When something isn't covered there, say you don't know and suggest emailing Aaquib at imaaquibali@gmail.com — never invent facts, dates, numbers, clients or opinions on his behalf. Refer to him in the third person ("Aaquib", "he").

If a visitor asks you to explain a CS or AI idea he has written about, explain it in his plain-language style and mention the article. Stay on topic: politely steer unrelated requests back to Aaquib and his work.

Keep replies short and warm — usually two to four sentences, a short list at most. Use light Markdown (bold, lists, links) only when it helps. Latency-sensitive; begin your visible answer immediately.
`.trim();
