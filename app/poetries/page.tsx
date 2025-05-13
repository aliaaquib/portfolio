import { getPoetries } from "@/lib/poetry";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function PoetriesPage() {
  const poetries = await getPoetries();

  return (
    <div className="mt-3">
      <h2 className="mb-3 mt-10 text-2xl font-bold md:mt-14">Poetries</h2>
      <p className="text-balance text-lg font-medium text-muted-foreground">
        A collection of poetic musings that explore thoughts, emotions, and observations.
      </p>
      <ul className="-mx-4 mt-8 flex flex-col gap-5 px-1 sm:px-0">
        {poetries.length > 0 ? (
          poetries.map((poetry) => (
            <li key={poetry.id}>
              <Link
                className="-my-2 flex select-none items-center gap-2.5 rounded-xl px-4 py-2 text-lg font-medium transition-colors duration-300 hover:bg-accent"
                href={`/poetry/${poetry.id}`}
              >
                <p>{poetry.title}</p>
                <span className="h-px flex-1 bg-muted-foreground/20" />
                <p className="text-sm text-muted-foreground">
                  {poetry.description}
                </p>
              </Link>
            </li>
          ))
        ) : (
          <li className="text-muted-foreground">No poetries available.</li>
        )}
      </ul>

      {/* Back to homepage link with arrow */}
      <div className="mt-10">
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
