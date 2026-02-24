import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: 'Observatório Cultural de Sergipe',
  description: 'Site institucional do Observatório Cultural de Sergipe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-antialiased text-gray-800">
        <Header />
        <div className="pt-24">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
