import { features } from '../config/features';

export default function Biblioteca() {
  if (!features.biblioteca) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-slate-600">
          Este módulo não está disponível no plano atual.
        </p>
      </main>
    );
  }

  return (
    <main className="px-8 pb-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-semibold text-gray-900 mb-4">Biblioteca</h1>
      <p className="text-gray-600 mb-8">
        Acervo de recursos, documentos e materiais de referência.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl mb-3">📚</div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Documentos</h2>
          <p className="text-sm text-gray-600">
            Artigos, relatórios e publicações acadêmicas.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl mb-3">🔗</div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Links úteis</h2>
          <p className="text-sm text-gray-600">
            Referências externas e fontes de dados relevantes.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl mb-3">🎓</div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Tutoriais</h2>
          <p className="text-sm text-gray-600">
            Guias práticos e materiais educacionais.
          </p>
        </div>
      </div>
    </main>
  );
}
