'use client';

import { useState } from 'react';

export default function AdminPage() {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('');

  async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus('Salvando...');
        try {
                const res = await fetch('/api/posts', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ title, slug, excerpt, content }),
                        });
                if (res.ok) {
                          setStatus('Post salvo com sucesso!');
                          setTitle('');
                          setSlug('');
                          setExcerpt('');
                          setContent('');
                        } else {
                          const data = await res.json();
                          setStatus('Erro: ' + (data.error || 'Falha ao salvar'));
                        }
              } catch (err) {
                setStatus('Erro ao conectar com a API');
              }
      }

  return (
        <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-2xl mx-auto">
                          <h1 className="text-3xl font-bold mb-8 text-gray-900">Admin — Novo Post</h1>
                          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
                                      <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Titulo</label>
                                                    <input
                                                                    type="text"
                                                                    value={title}
                                                                    onChange={(e) => setTitle(e.target.value)}
                                                                    required
                                                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    placeholder="Titulo do post"
                                                                  />
                                                  </div>
                                      <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                                                    <input
                                                                    type="text"
                                                                    value={slug}
                                                                    onChange={(e) => setSlug(e.target.value)}
                                                                    required
                                                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    placeholder="meu-post-aqui"
                                                                  />
                                                  </div>
                                      <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                                                    <input
                                                                    type="text"
                                                                    value={excerpt}
                                                                    onChange={(e) => setExcerpt(e.target.value)}
                                                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    placeholder="Resumo breve do post"
                                                                  />
                                                  </div>
                                      <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Conteudo</label>
                                                    <textarea
                                                                    value={content}
                                                                    onChange={(e) => setContent(e.target.value)}
                                                                    rows={10}
                                                                    required
                                                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                                                                    placeholder="Conteudo em Markdown..."
                                                                  />
                                                  </div>
                                      <div className="flex items-center justify-between">
                                                    <button
                                                                    type="submit"
                                                                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium transition-colors"
                                                                  >
                                                                    Salvar
                                                                  </button>
                                                    {status && (
                        <p className={`text-sm font-medium ${
                                          status.startsWith('Erro') ? 'text-red-600' : 'text-green-600'
                                        }`}>{status}</p>
                      )}
                                                  </div>
                                    </form>
                        </div>
              </div>
      );
  }
