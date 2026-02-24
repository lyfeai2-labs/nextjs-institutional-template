import { features } from '../config/features';

export default function Pesquisa() {
  if (!features.pesquisa) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-slate-600">
          Este módulo não está disponível no plano atual.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-16 px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-semibold text-gray-900 mb-6">
          Pesquisa
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Módulo de pesquisa analítica do Observatório.
        </p>
      </div>
    </main>
  );
}
