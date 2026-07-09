import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { getPosts } from '@/lib/posts';
import type { Metadata } from 'next';

export const revalidate = 60; // re-checks Sanity at most once a minute — new posts show up without a redeploy

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

// Local example posts use a simple { type: 'paragraph' | 'heading' | 'code' } shape.
// Real Sanity posts use Portable Text blocks ({ _type: 'block' | 'code' | 'image' })
// instead. This checks which shape we actually got and renders accordingly.
function isPortableText(body: any[]): boolean {
  return Array.isArray(body) && body.length > 0 && '_type' in body[0];
}

const portableTextComponents = {
  types: {
    code: ({ value }: any) => (
      <div className="rounded-xl overflow-hidden border border-hairline">
        <div className="bg-glass px-4 py-2 mono-font text-[11px] text-fg-muted">{value?.language || 'code'}</div>
        <pre className="bg-black/40 p-4 overflow-x-auto"><code className="mono-font text-sm text-fg whitespace-pre">{value?.code}</code></pre>
      </div>
    ),
  },
  block: {
    h2: ({ children }: any) => <h2 className="display-font text-xl text-fg pt-6">{children}</h2>,
    normal: ({ children }: any) => <p className="text-fg-muted leading-relaxed">{children}</p>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const href = value?.href || '#';
      const isExternal = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="text-violet underline underline-offset-2 hover:text-fg transition-colors"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const usingPortableText = isPortableText(post.body);
  const headings = usingPortableText ? [] : ((post.body || []) as any[]).filter((b) => b.type === 'heading') as { type: 'heading'; text: string; id: string }[];
  const related = posts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 2);

  return (
    <main className="min-h-screen pt-24">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors mb-8">
          <ArrowLeft size={15} /> Back to Blog
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="mono-font text-[10px] px-2 py-1 rounded-full border border-hairline text-fg-muted">{post.category}</span>
          {post.readTime && <span className="text-[11px] text-fg-muted flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>}
          {post.date && <span className="text-[11px] text-fg-muted flex items-center gap-1"><Calendar size={12} /> {post.date}</span>}
        </div>

        <h1 className="display-font text-3xl sm:text-4xl text-fg mb-4">{post.title}</h1>
        <p className="text-fg-muted text-lg leading-relaxed mb-10">{post.excerpt}</p>

        {headings.length > 0 && (
          <nav className="glass rounded-xl p-5 mb-12">
            <p className="mono-font text-[10px] tracking-[0.2em] text-fg-muted mb-3">TABLE OF CONTENTS</p>
            <ul className="space-y-1.5">
              {headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="text-sm text-fg-muted hover:text-violet transition-colors">{h.text}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="space-y-5">
          {usingPortableText ? (
            <PortableText value={post.body || []} components={portableTextComponents} />
          ) : (
            ((post.body || []) as any[]).map((block, i) => {
              if (block.type === 'paragraph') {
                return <p key={i} className="text-fg-muted leading-relaxed">{block.text}</p>;
              }
              if (block.type === 'heading') {
                return <h2 key={i} id={block.id} className="display-font text-xl text-fg pt-6">{block.text}</h2>;
              }
              if (block.type === 'code') {
                return (
                  <div key={i} className="rounded-xl overflow-hidden border border-hairline">
                    <div className="bg-glass px-4 py-2 mono-font text-[11px] text-fg-muted">{block.language}</div>
                    <pre className="bg-black/40 p-4 overflow-x-auto"><code className="mono-font text-sm text-fg whitespace-pre">{block.code}</code></pre>
                  </div>
                );
              }
              return null;
            })
          )}
        </div>

        {related.length > 0 && (
          <div className="mt-20 pt-10 border-t border-hairline">
            <p className="mono-font text-xs tracking-[0.3em] text-fg-muted mb-6">RELATED POSTS</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="glass rounded-xl p-5 hover:border-hairline transition-colors">
                  <h3 className="text-fg font-medium text-sm mb-1.5">{p.title}</h3>
                  <p className="text-fg-muted text-xs leading-relaxed">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
