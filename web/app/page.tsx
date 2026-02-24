export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-semibold text-gray-900">
          Um olhar editorial sobre os movimentos culturais de Sergipe.
        </h1>
        <p className="text-xl text-gray-700">
          Articulamos iniciativas, analisamos processos e registramos os movimentos
          que moldam o cenário artístico e cultural do território.
        </p>
        <a
          href="/publicacoes"
          className="inline-block px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
        >
          Ver Publicações
        </a>
      </div>
    </main>
  )
}
