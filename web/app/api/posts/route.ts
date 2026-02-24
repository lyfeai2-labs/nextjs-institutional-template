import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
    try {
          const body = await req.json();
          const { title, slug, excerpt, content } = body;

      if (!title || !slug || !content) {
              return NextResponse.json(
                        { error: 'title, slug e content sao obrigatorios' },
                        { status: 400 }
                      );
            }

      const postsDir = path.join(process.cwd(), 'content/posts');

      if (!fs.existsSync(postsDir)) {
              fs.mkdirSync(postsDir, { recursive: true });
            }

      const date = new Date().toISOString().split('T')[0];

      const frontmatter = `---
      title: "${title}"
      slug: "${slug}"
      date: "${date}"
      excerpt: "${excerpt || ''}"
      ---
      `;

      const fileContent = frontmatter + '\n' + content;
          const filename = `${slug}.md`;
          const filePath = path.join(postsDir, filename);

      fs.writeFileSync(filePath, fileContent, 'utf-8');

      return NextResponse.json(
              { message: 'Post criado com sucesso', filename },
              { status: 201 }
            );
        } catch (err) {
          console.error('[api/posts] Erro:', err);
          return NextResponse.json(
                  { error: 'Erro interno ao criar o post' },
                  { status: 500 }
                );
        }
  }
