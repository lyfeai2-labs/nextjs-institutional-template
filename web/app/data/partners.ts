export type Partner = {
  name: string;
  href: string;
  logoSrc: string;
  alt: string;
  isProvisional: boolean;
};

export const partners: Partner[] = [
  {
    name: 'Parceiro Exemplo 1',
    href: 'https://example.com',
    logoSrc: '/partners/parceiro-1.jpeg',
    alt: 'Logo Parceiro 1',
    isProvisional: false,
  },
  {
    name: 'Parceiro Exemplo 2',
    href: 'https://example.com',
    logoSrc: '/partners/parceiro-2.jpeg',
    alt: 'Logo Parceiro 2',
    isProvisional: false,
  },
];
