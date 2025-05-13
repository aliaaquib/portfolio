import Link from "next/link";
import { Blog, Project } from "@/types";
import { fetchMediumBlogs } from "@/lib/medium";
import { getProjects } from "@/lib/utils";
import { getPoetries } from "@/lib/poetry";  // Ensure this is imported

export default async function Home() {
  const projects = await getProjects();
  const blogs = await fetchMediumBlogs();
  const poetries = await getPoetries();  // Make sure this fetches poetry data

  return (
    <div className="mt-3">
      <p className="text-pretty text-lg font-medium text-muted-foreground">
        Hi there! I&apos;m Aaquib &ndash; a teacher, freelancer, and open-source
        dreamer. A curious soul who loves to{" "}
        <Link
          className="font-semibold underline underline-offset-2 transition hover:text-primary"
          href="https://github.com/aliaaquib"
          target="_blank"
        >
          code
        </Link>{" "}
        explore new things, and{" "}
        <Link
          className="font-semibold underline underline-offset-2 transition hover:text-primary"
          href="https://theweeklyroundup.medium.com/"
          target="_blank"
        >
          write
        </Link>{" "}
        about what I learn, create, and discover. You&apos;ll often find me lost
        in the worlds of{" "}
        <Link
          className="font-semibold underline underline-offset-2 transition hover:text-primary"
          href="/poetries"
          target="_self"
        >
          poetry
        </Link>{" "}
        and anime.
      </p>

      <br />

      <p className="text-pretty text-lg font-medium text-muted-foreground">
        I offer consulting and digital{" "}
        <Link
          className="font-semibold underline underline-offset-2 transition hover:text-primary"
          href="#"
          target="_blank"
        >
          service
        </Link>{" "}
        for small businesses and startups. Got an idea worth building?{" "}
        <Link
          className="font-semibold underline underline-offset-2 transition hover:text-primary"
          href="#"
          target="_blank"
        >
          get in touch!
        </Link>
      </p>

      {/* Projects Section */}
      <h2 className="mb-3 mt-10 text-2xl font-bold md:mt-14">Projects</h2>
      <p className="text-balance text-lg font-medium text-muted-foreground">
        Below are some of the projects I&apos;ve worked on.
      </p>
      <ul className="-mx-4 mt-8 flex flex-col gap-5 px-1 sm:px-0">
        {projects.map((project: Project) => (
          <li key={project.id}>
            <Link
              className="-my-2 flex select-none items-center gap-2.5 rounded-xl px-4 py-2 text-lg font-medium transition-colors duration-300 hover:bg-accent"
              href={project.url}
              target="_blank"
            >
              <p>{project.name}</p>
              <span className="h-px flex-1 bg-muted-foreground/20" />
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {/* Blog Section */}
      <h2 className="mb-3 mt-10 text-2xl font-bold md:mt-14">Blog</h2>
      <p className="text-balance text-lg font-medium text-muted-foreground">
        Wondering what’s been on my mind lately? Here are a few blog posts where I unpack ideas, experiments, and challenges.
      </p>
      <ul className="-mx-4 mt-8 flex flex-col gap-5 px-1 sm:px-0">
        {blogs.map((blog: Blog) => (
          <li key={blog.id}>
            <Link
              className="-my-2 flex select-none items-center gap-2.5 rounded-xl px-4 py-2 text-lg font-medium transition-colors duration-300 hover:bg-accent"
              href={blog.url}
              target="_blank"
            >
              <p>{blog.title}</p>
              <span className="h-px flex-1 bg-muted-foreground/20" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
