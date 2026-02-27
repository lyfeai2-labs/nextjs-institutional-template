import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import Image from 'next/image';
import { features } from '../../config/features';

const postsDir = path.join(process.cwd(), 'content/posts');
console.log('[slug/page] postsDir absoluto:', postsDir);

function formatDatePtBR(dateStr?: string): string {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('pt-BR');
  }
export async function generateStaticParams() {
  if (!features.publicacoes) return [];
  if (!fs.existsSync(postsDir)) {
    console.log('[generateStaticParams] Diretorio NAO encontrado:', postsDir);
    return [];
  }
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  console.log('[generateStaticParams] Arquivos .md encontrados:', files);
  return files.map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
}

export default async function PublicacaoPage({ params }: { params: { slug: string } }) {
  if (!features.publicacoes) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-slate-600">
          Este módulo não está disponível no plano atual.
        </p>
      </main>
    );
  }

  const filePath = path.join(postsDir, `${params.slug}.md`);
  console.log('[PublicacaoPage] filePath:', filePath);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
    const dateStr = String(data.date || '');
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/publicacoes" className="text-blue-700 hover:underline text-sm mb-8 block">
        ← Voltar para Publicações
      </Link>
      {data.coverVideo && (
        <div className="w-full mb-8 rounded-xl overflow-hidden">
          <video
            src={data.coverVideo}
            controls
            autoPlay
            muted
            loop
            className="w-full h-auto rounded-xl"
          />
        </div>
      )}
      {!data.coverVideo && data.coverImage && (
        <div className="relative w-full h-72 mb-8 rounded-xl overflow-hidden">
          <Image
            src={data.coverImage}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <h1 className="text-4xl font-bold text-gray-900 mb-3">{data.title}</h1>
                        <p className="text-sm text-gray-500 mb-10">{formatDatePtBR(dateStr)}</p>
      <article
        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-img:rounded-xl prose-img:shadow-md"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </main>
  );
}
