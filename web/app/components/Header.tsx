import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <nav className="max-w-6xl mx-auto px-8 py-4 flex justify-center gap-8">
        <Link href="/" className="text-gray-900 hover:text-blue-700 transition-colors font-medium">
          Início
        </Link>
        <Link href="/o-que-somos" className="text-gray-900 hover:text-blue-700 transition-colors font-medium">
          O que somos
        </Link>
        <Link href="/pesquisa" className="text-gray-900 hover:text-blue-700 transition-colors font-medium">
          Pesquisa
        </Link>
        <Link href="/biblioteca" className="text-gray-900 hover:text-blue-700 transition-colors font-medium">
          Biblioteca
        </Link>
        <Link href="/parceiros" className="text-gray-900 hover:text-blue-700 transition-colors font-medium">
          Parceiros
        </Link>
        <Link href="/sobre" className="text-gray-900 hover:text-blue-700 transition-colors font-medium">
          Sobre
        </Link>
        <Link href="/publicacoes" className="text-gray-900 hover:text-blue-700 transition-colors font-medium">
          Publicacoes
        </Link>
      </nav>
    </header>
  )
}
