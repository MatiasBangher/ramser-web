/**
 * Single source of truth for business facts and page content.
 * Layout (JSON-LD/meta) and every component read from here.
 */

export const SITE_URL = 'https://ramser.netlify.app';

export const business = {
  name: 'RAMSER S.A.S',
  legalName: 'RamSer S.A.S Saneamiento Ambiental',
  tagline: 'Saneamiento Ambiental',
  phoneDisplay: '3644-598253',
  phoneIntl: '+54-3644-598253',
  phoneHref: 'tel:+543644598253',
  whatsappNumber: '543644598253',
  email: 'ramonbangher@yahoo.com.ar',
  facebook: 'https://www.facebook.com/profile.php?id=100064195952988',
  license: {
    number: '2952',
    short: 'Hab. Prov. N°2952',
    title: 'Habilitación Provincial N°2952',
    issuer: 'Ministerio de Salud - Provincia del Chaco',
  },
  address: {
    streetAddress: 'Av. Antártida Argentina',
    addressLocality: 'Pampa del Infierno',
    addressRegion: 'Chaco',
    addressCountry: 'AR',
    postalCode: '3708',
  },
  geo: { latitude: '-26.5051', longitude: '-61.1744' },
  priceRange: '$$',
  areasServed: ['Pampa del Infierno', 'Chaco', 'Región NEA', 'Noroeste Argentino', 'Argentina'],
} as const;

export const hours = {
  /** Schema.org opening hours specification. */
  spec: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
    { days: ['Saturday'], opens: '08:00', closes: '12:00' },
  ],
  weekdays: 'Lunes a Viernes de 08:00 a 18:00',
  saturday: 'Sábados de 08:00 a 12:00',
  summary: 'Lunes a Viernes 08:00 a 18:00 y Sábados 08:00 a 12:00',
} as const;

export const seo = {
  title: 'RAMSER S.A.S | Fumigación y Control de Plagas en Pampa del Infierno, Chaco',
  description:
    'Empresa de fumigación y control de plagas en Pampa del Infierno, Chaco. Desinsectación, desratización y saneamiento ambiental. Habilitación Provincial N°2952. Contacto: 3644-598253. Lunes a Viernes 08:00 a 18:00 y Sábados 08:00 a 12:00.',
  keywords:
    'fumigación Pampa del Infierno, control de plagas Chaco, desinsectación, desratización, saneamiento ambiental, fumigador profesional, exterminador, control de roedores, control de insectos, fumigación de viviendas, fumigación comercial, fumigación industrial, empresa de fumigación NEA, habilitación provincial 2952',
} as const;

export const offeredServices = [
  'Control de Plagas',
  'Fumigación',
  'Desinsectación',
  'Desratización',
  'Desinfección',
  'Saneamiento Ambiental',
  'Control de Roedores',
  'Control de Insectos',
  'Fumigación de Viviendas',
  'Fumigación Comercial',
  'Fumigación Industrial',
] as const;

const DEFAULT_MESSAGE = 'Hola, me interesa conocer más sobre sus servicios';

const messages = {
  header: DEFAULT_MESSAGE,
  hero: 'Hola, me interesa conocer más sobre sus servicios de fumigación',
  quote: 'Hola, me gustaría solicitar un presupuesto',
  contact: DEFAULT_MESSAGE,
  bar: DEFAULT_MESSAGE,
} as const;

/** Builds the single wa.me quote link for a given CTA context. */
export function waLink(context: keyof typeof messages = 'header'): string {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(messages[context])}`;
}

export const nav = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Trabajos', href: '#trabajos' },
  { label: 'Contacto', href: '#contacto' },
] as const;

export const services = [
  {
    title: 'Control de Plagas',
    image: 'cl',
    caption: 'Tratamiento sobre zócalo',
    alt: 'Operario con mascarilla y traje blanco aplicando producto con lanza amarilla sobre el zócalo de una pared',
    body: 'Aplicamos tratamientos con la tecnología más reciente mediante el concepto de',
    highlight: 'Gestión Integrada de Plagas (M.I.P)',
    tail: ', eliminando problemas con mínimo impacto ambiental.',
  },
  {
    title: 'Control de Roedores',
    image: 'ratita',
    caption: 'Estación cebadera para roedores',
    alt: 'Estación cebadera negra para roedores junto a un muro de bloques, con un símbolo de prohibido sobre un roedor',
    body: 'Nuestros servicios garantizan protección con soluciones eficaces y seguras. Realizamos tratamientos en',
    highlight: 'comercios, fábricas, plantas de acopio, almacenes',
    tail: ' y cualquier tipo de instalación.',
  },
  {
    title: 'Saneamiento Ambiental',
    image: 'saneando',
    caption: 'Saneamiento frente a local comercial',
    alt: 'Operario con casco azul y equipo mochila aplicando tratamiento frente a un local comercial',
    body: 'Nuestros servicios abarcan el control de la contaminación y la prevención de enfermedades transmitidas por el medio ambiente con',
    highlight: 'métodos seguros y certificados',
    tail: '.',
  },
  {
    title: 'Equipos y Tecnología',
    image: 'fumigando',
    caption: 'Nebulización de jardín',
    alt: 'Operario con casco y mascarilla fumigando un jardín con equipo de nebulización',
    body: 'Contamos con un equipo de profesionales altamente capacitados que utilizan la última tecnología y los mejores productos.',
    highlight: 'Tu tranquilidad y protección son nuestra prioridad',
    tail: '.',
  },
] as const;

export const values = [
  { title: 'Rapidez', text: 'Respuesta inmediata a sus necesidades' },
  { title: 'Eficacia', text: 'Resultados garantizados en cada servicio' },
  { title: 'Disciplina', text: 'Metodología rigurosa y profesional' },
  { title: 'Confianza', text: 'Relaciones duraderas con nuestros clientes' },
] as const;

export const mission = {
  title: 'Misión',
  text: 'Contribuir a la salud de nuestros clientes y el medio ambiente, solucionando rápida y efectivamente los problemas de plagas urbanas, rurales e industriales, así como prevenir nuevas infestaciones, ofreciendo servicios de control profesional y productos de calidad para su control.',
} as const;

export const vision = {
  title: 'Visión',
  text: 'Nos proponemos ser la empresa líder en el mercado en la prestación de servicios, gestión y control de plagas, buscando siempre la confianza de nuestros clientes y proveedores, basándonos en la experiencia y profesionalismo de nuestro equipo.',
} as const;

export const valuesStatement =
  'Compromiso, honestidad y disciplina que creemos que todos nuestros clientes merecen, con los cuales creamos una relación de confianza para solucionar sus problemas de la mejor manera para que sigan confiando en nosotros.';

/** Process steps: labels only (no descriptive copy). */
export const process = ['Contacto', 'Visita y diagnóstico', 'Tratamiento', 'Seguimiento'] as const;

/** Sector wording taken verbatim from the original copy (mission + rodent service). */
export const scope = {
  label: 'Ámbitos',
  kinds: 'Urbanas, rurales e industriales',
  places: ['Comercios', 'Fábricas', 'Plantas de acopio', 'Almacenes'],
} as const;

export const gallery = [
  { image: 'fum2', caption: 'Nebulización en galpón industrial', position: '40% 50%', landscape: true, alt: 'Operario con casco azul y máscara nebulizando el interior de un galpón industrial, rodeado de una densa nube de producto' },
  { image: 'trab2', caption: 'Fumigación frente a locales comerciales', alt: 'Operario con casco azul fumigando con equipo mochila frente a locales comerciales con cortinas metálicas' },
  { image: 'fumigando', caption: 'Nebulización entre árboles', alt: 'Operario con casco y máscara nebulizando un jardín con una nube de producto entre los árboles' },
  { image: 'trab3', caption: 'Nebulización en depósito', alt: 'Operario con casco y máscara nebulizando el interior de un depósito con estantes de madera' },
  { image: 'trab4', caption: 'Producto sobre el césped de un patio', alt: 'Nube de producto de fumigación sobre el césped de un patio con árboles' },
  { image: 'trab5', caption: 'Fumigación en interior', alt: 'Operario con casco azul fumigando con equipo mochila el interior de un estudio con camillas de madera' },
] as const;
