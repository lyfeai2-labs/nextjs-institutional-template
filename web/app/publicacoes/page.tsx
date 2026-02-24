import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';

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
        date: data.date || '',
        excerpt: data.excerpt || '',
        coverImage: data.coverImage || '',
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default function Publicacoes() {
  const posts = getAllPosts();
  return (
    <main className="px-8 pb-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-semibold text-gray-900 mb-8">Publicacoes</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600">Nenhuma publicacao encontrada.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/publicacoes/${post.slug}`}>
              <article className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
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
                <div className="p-4 flex flex-col flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 text-base mb-3 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
