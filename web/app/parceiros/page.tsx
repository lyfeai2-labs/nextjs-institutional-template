'use client';
import Image from 'next/image';
import { useState } from 'react';
import { partners } from '../data/partners';
import type { Partner } from '../data/partners';

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(' ');
  const initials =
    parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  return (
    <div className="w-full h-28 flex items-center justify-center bg-gray-100 rounded-lg">
      <span className="text-3xl font-bold text-gray-400">{initials}</span>
    </div>
  );
}

function PartnerCard({ partner }: { partner: Partner }) {
  const [imgError, setImgError] = useState(false);
  return (
    <a
      href={partner.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col items-center gap-4 cursor-pointer"
    >
      <div className="relative w-full h-28">
        {imgError ? (
          <Initials name={partner.name} />
        ) : (
          <Image
            src={partner.logoSrc}
            alt={partner.alt}
            fill
            className="object-contain"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="text-center flex flex-col items-center gap-2 w-full">
        <p className="text-base font-semibold text-gray-900">{partner.name}</p>
        {partner.isProvisional && (
          <span className="text-xs text-gray-400 border border-gray-200 rounded px-2 py-0.5">
            link provisorio
          </span>
        )}
        <span className="mt-1 text-xs text-blue-700 group-hover:underline font-medium">
          Visitar
        </span>
      </div>
    </a>
  );
}

export default function Parceiros() {
  return (
    <main className="max-w-5xl mx-auto py-16 px-6">
      <h1 className="text-5xl font-semibold text-gray-900 mb-8">Parceiros</h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-14 max-w-3xl">
        O Observatorio e construido em rede. Reunimos organizacoes, cooperativas,
        iniciativas sociais e instituicoes comprometidas com o desenvolvimento
        sustentavel e a cultura do territorio. Conheca quem faz parte desta
        construcao coletiva.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {partners.map((partner) => (
          <PartnerCard key={partner.name} partner={partner} />
        ))}
      </div>
    </main>
  );
}
