import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage } from "@/lib/posts";

type ContentRendererProps = {
  body?: PortableTextBlock[];
  paragraphs?: string[];
};

function SanityImageBlock({ value }: { value: SanityImage }) {
  if (!value?.asset) {
    return null;
  }

  const width = value.asset.metadata?.dimensions?.width || 1200;
  const height = value.asset.metadata?.dimensions?.height || 675;

  return (
    <figure className="my-8 overflow-hidden rounded-[1.75rem] border border-muted/15 bg-black/[0.03]">
      <Image
        src={urlForImage(value).width(1400).height(Math.round((1400 / width) * height)).url()}
        alt={value.alt || ""}
        width={width}
        height={height}
        className="h-auto w-full object-cover"
        sizes="(min-width: 1024px) 608px, calc(100vw - 48px)"
      />
      {value.caption ? (
        <figcaption className="px-5 py-3 font-sans text-xs text-muted">{value.caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function ContentRenderer({ body, paragraphs = [] }: ContentRendererProps) {
  if (body?.length) {
    return (
      <PortableText
        value={body}
        components={{
          types: {
            image: SanityImageBlock,
          },
          block: {
            normal: ({ children }) => <p>{children}</p>,
            h2: ({ children }) => (
              <h2 className="pt-4 text-xl leading-tight text-strong sm:text-2xl">{children}</h2>
            ),
            h3: ({ children }) => <h3 className="pt-2 text-lg leading-tight text-strong">{children}</h3>,
            blockquote: ({ children }) => (
              <blockquote className="border-l border-strong/30 pl-5 italic text-muted">{children}</blockquote>
            ),
          },
          list: {
            bullet: ({ children }) => <ul className="list-disc space-y-2 pl-5">{children}</ul>,
            number: ({ children }) => <ol className="list-decimal space-y-2 pl-5">{children}</ol>,
          },
          marks: {
            link: ({ children, value }) => (
              <a
                href={value?.href}
                target={value?.blank ? "_blank" : undefined}
                rel={value?.blank ? "noreferrer" : undefined}
                className="underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
              >
                {children}
              </a>
            ),
            code: ({ children }) => (
              <code className="rounded-md bg-black/[0.05] px-1.5 py-0.5 font-sans text-[0.9em]">
                {children}
              </code>
            ),
          },
        }}
      />
    );
  }

  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
  );
}
