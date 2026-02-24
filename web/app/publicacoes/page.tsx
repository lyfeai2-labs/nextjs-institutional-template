import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';
import { features } from '../config/features';

type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
};

function getAllPosts(): PostMeta[] {
  const postsDir = path.join(process.cwd(), 'content/posts');
  console.log('[getAllPosts] postsDir absoluto:', postsDir);
  if (!fs.existsSync(postsDir)) {
    console.log('[getAllPosts] Diretorio NAO encontrado:', postsDir);
    return [];
  }
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  console.log('[getAllPosts] Arquivos .md encontrados:', files);
  return files
    .map((filename) => {
      const filePath = path.join(postsDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      return {
        slug: data.slug || filename.replace('.md', ''),
        title: data.title || '',
              date: String(data.date || ''),
        excerpt: data.excerpt || '',
        coverImage: data.coverImage || '',
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default function Publicacoes() {
  if (!features.publicacoes) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-slate-600">
          Este módulo não está disponível no plano atual.
        </p>
      </main>
    );
  }

  const posts = getAllPosts();
  return (
    <main className="px-8 pb-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-semibold text-gray-900 mb-8">Publicações</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600">Nenhuma publicação encontrada.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/publicacoes/${post.slug}`}>
              <article className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                {post.coverImage && (
                  <div className="relative w-full h-48">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                            <span className="text-xs text-gray-400">{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
