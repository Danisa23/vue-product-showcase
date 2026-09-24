import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 7000
})

const blueprint = {
  laptop: {
    id: 101,
    title: 'AeroBook Pro 14',
    category: 'laptops',
    categoryLabel: 'Laptops',
    description: 'Laptop de aluminio pensada para productividad, estudio y trabajo híbrido con un perfil ligero y elegante.',
    brand: 'AeroTech',
    image: '/images/products/laptop.webp',
    price: 1299,
    rating: 4.8,
    stock: 12
  },
  headphones: {
    id: 102,
    title: 'Pulse ANC Headphones',
    category: 'audio',
    categoryLabel: 'Audio',
    description: 'Audífonos inalámbricos over-ear con diseño cómodo, sonido envolvente y enfoque en sesiones prolongadas.',
    brand: 'Pulse Audio',
    image: '/images/products/headphones.webp',
    price: 189,
    rating: 4.7,
    stock: 18
  },
  smartphone: {
    id: 103,
    title: 'Nova Phone X',
    category: 'smartphones',
    categoryLabel: 'Smartphones',
    description: 'Smartphone moderno con pantalla fluida, acabado premium y autonomía para acompañar toda la jornada.',
    brand: 'Nova Mobile',
    image: '/images/products/smartphone.webp',
    price: 799,
    rating: 4.6,
    stock: 15
  },
  smartwatch: {
    id: 104,
    title: 'Motion Smartwatch S',
    category: 'wearables',
    categoryLabel: 'Wearables',
    description: 'Reloj inteligente para actividad, notificaciones y seguimiento diario con un diseño sobrio y versátil.',
    brand: 'Motion Lab',
    image: '/images/products/smartwatch.webp',
    price: 229,
    rating: 4.5,
    stock: 11
  },
  keyboard: {
    id: 105,
    title: 'Core Mechanical 75',
    category: 'peripherals',
    categoryLabel: 'Periféricos',
    description: 'Teclado mecánico compacto con respuesta precisa para productividad, programación y gaming.',
    brand: 'Core Gear',
    image: '/images/products/keyboard.webp',
    price: 129,
    rating: 4.8,
    stock: 9
  },
  mouse: {
    id: 106,
    title: 'Flow Wireless Mouse',
    category: 'peripherals',
    categoryLabel: 'Periféricos',
    description: 'Mouse inalámbrico ergonómico con controles laterales y precisión estable para jornadas intensivas.',
    brand: 'Flow Devices',
    image: '/images/products/mouse.webp',
    price: 79,
    rating: 4.6,
    stock: 24
  },
  tablet: {
    id: 107,
    title: 'Tab Vision 11',
    category: 'tablets',
    categoryLabel: 'Tablets',
    description: 'Tablet versátil para estudio, entretenimiento y trabajo móvil con pantalla amplia y diseño delgado.',
    brand: 'Vision Tech',
    image: '/images/products/tablet.webp',
    price: 569,
    rating: 4.7,
    stock: 14
  },
  webcam: {
    id: 108,
    title: 'VisionCam 4K',
    category: 'cameras',
    categoryLabel: 'Cámaras',
    description: 'Webcam 4K para videollamadas, clases y streaming, con montaje estable y acabado profesional.',
    brand: 'Vision Tech',
    image: '/images/products/webcam.webp',
    price: 109,
    rating: 4.5,
    stock: 17
  }
}

const orderedKeys = ['laptop', 'headphones', 'smartphone', 'smartwatch', 'keyboard', 'mouse', 'tablet', 'webcam']

function fallbackItem(key) {
  return { ...blueprint[key], source: 'fallback', apiReference: null }
}

function normalizeApiProduct(key, source) {
  const base = blueprint[key]
  if (!source) return fallbackItem(key)

  return {
    ...base,
    title: source.title || base.title,
    description: base.description,
    brand: source.brand || base.brand,
    price: Number.isFinite(Number(source.price)) ? Number(source.price) : base.price,
    rating: Number.isFinite(Number(source.rating)) ? Number(source.rating) : base.rating,
    stock: Number.isFinite(Number(source.stock)) ? Number(source.stock) : base.stock,
    apiReference: source.title || null,
    source: 'api'
  }
}

async function getCategory(slug) {
  const { data } = await api.get(`/products/category/${slug}`)
  return Array.isArray(data?.products) ? data.products : []
}

export async function fetchProducts() {
  try {
    const results = await Promise.allSettled([
      getCategory('laptops'),
      getCategory('smartphones'),
      getCategory('tablets'),
      getCategory('mobile-accessories')
    ])

    const [laptopResult, smartphoneResult, tabletResult, accessoryResult] = results
    const laptops = laptopResult.status === 'fulfilled' ? laptopResult.value : []
    const smartphones = smartphoneResult.status === 'fulfilled' ? smartphoneResult.value : []
    const tablets = tabletResult.status === 'fulfilled' ? tabletResult.value : []
    const accessories = accessoryResult.status === 'fulfilled' ? accessoryResult.value : []

    const audio = accessories.find((item) => /airpods max|headphone/i.test(item.title || '')) || accessories.find((item) => /airpod|earphone|earbud|buds|audio/i.test(item.title || ''))
    const watch = accessories.find((item) => /watch/i.test(item.title || ''))

    const items = [
      normalizeApiProduct('laptop', laptops[0]),
      normalizeApiProduct('headphones', audio),
      normalizeApiProduct('smartphone', smartphones[0]),
      normalizeApiProduct('smartwatch', watch),
      fallbackItem('keyboard'),
      fallbackItem('mouse'),
      normalizeApiProduct('tablet', tablets[0]),
      fallbackItem('webcam')
    ]

    const apiCount = items.filter((item) => item.source === 'api').length
    const source = apiCount === items.length ? 'api' : apiCount > 0 ? 'hybrid' : 'fallback'
    const warning = source === 'hybrid'
      ? `${apiCount} productos se sincronizaron desde la API y ${items.length - apiCount} usan datos locales de respaldo.`
      : null

    return { items, source, warning }
  } catch (error) {
    return {
      items: orderedKeys.map(fallbackItem),
      source: 'fallback',
      warning: 'No fue posible conectar con la API. Se cargó el catálogo local de respaldo para mantener la aplicación operativa.',
      originalError: error?.message || 'Error de red'
    }
  }
}

export function getFallbackCatalog() {
  return orderedKeys.map(fallbackItem)
}
