import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { slugify } from "@/lib/content";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

interface MdxRendererProps {
  mdx: Awaited<ReturnType<typeof serialize>>;
}

function MdxH1(props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  const { children, id, ...rest } = props;
  const headingId = slugify(String(children ?? ""));
  return <h1 id={headingId ?? id} {...rest}>{children}</h1>;
}

function MdxH2(props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  const { children, id, ...rest } = props;
  const headingId = slugify(String(children ?? ""));
  return <h2 id={headingId ?? id} {...rest}>{children}</h2>;
}

function MdxH3(props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  const { children, id, ...rest } = props;
  const headingId = slugify(String(children ?? ""));
  return <h3 id={headingId ?? id} {...rest}>{children}</h3>;
}

export function MdxRenderer({ mdx }: MdxRendererProps) {
  return (
    <MDXRemote
      {...mdx}
      components={{
        h1: MdxH1,
        h2: MdxH2,
        h3: MdxH3,
      }}
    />
  );
}
