# @emeza/astro-ad-modules

Módulos publicitarios reutilizables para Astro: `AdBanner`, `AdBannerGroup`, `AdPopup` y `AdRail`. El código no contiene campañas, imágenes, tipografías ni enlaces de un cliente concreto. Cada sitio proporciona su contenido y su tema.

## Instalar desde el repositorio privado

El proyecto consumidor necesita acceso de lectura a `MrvnDrax/astro-ad-modules` mediante SSH. Recomendamos fijar un tag de versión para que cada despliegue use el mismo código:

```sh
pnpm add 'git+ssh://git@github.com/MrvnDrax/astro-ad-modules.git#v0.1.0'
```

En CI, configura una clave de despliegue de solo lectura o una identidad de GitHub con acceso al repositorio. Conserva esa credencial fuera del código y del lockfile. El paquete requiere Astro 7 en el proyecto consumidor. La publicación en un registro privado puede añadirse más adelante sin cambiar la API de los componentes.

```astro
---
import { AdBanner, AdPopup, AdRail } from '@emeza/astro-ad-modules';
import type { BannerConfig, PromotionConfig } from '@emeza/astro-ad-modules';

const banner: BannerConfig = {
  id: 'site-launch', format: 'horizontal', layout: 'split', title: 'Un mensaje claro',
  ctaLabel: 'Descubrir', href: '/servicios',
  media: { src: '/images/ad.webp', alt: 'Persona usando el servicio' },
  theme: { background: '#10243a', foreground: '#fff', accent: '#4bd8d0' },
};
const campaign: PromotionConfig = {
  id: 'site-popup', ctaLabel: 'Conocer promoción', href: '/promociones',
  media: { src: '/images/promo.webp', alt: 'Promoción vigente' },
};
---
<AdBanner banner={banner} />
<AdPopup promotion={campaign} frequency="session" />
<AdRail promotion={{ ...campaign, id: 'site-rail' }} side="right" mobileMode="dock" />
```

## Contrato

- Cada `id` debe ser único en la página y permanecer estable mientras dure la campaña. El cierre de banners y la frecuencia del popup usan ese identificador.
- El sitio consumidor aporta rutas de imagen válidas, textos alternativos, enlaces y colores. Para AVIF y recortes móviles, se pasan rutas explícitas; no se adivinan extensiones.
- `AdBanner` acepta horizontal `split`, `overlay`, `artwork`; cuadrado `overlay`, `artwork`. `AdBannerGroup` acomoda uno o dos por fila y verifica IDs repetidos dentro del grupo.
- `AdPopup` acepta `frequency="always|session|local"` y `delayMs`. `AdRail` acepta `side`, `mobileMode="hide|dock"`, `reopenDelayMs`, y `hideWhenVisible` para apartarse de secciones de lectura.
- El proyecto puede definir `--ad-font-display` y `--ad-font-body` en un contenedor. El paquete usa una fuente de reserva y no descarga tipografías.
- Se emiten eventos `adbanner:click`, `adbanner:dismiss` y `admodule:click`, `admodule:dismiss`, `admodule:open` para conectar analítica sin acoplarla al paquete.
- `preview` permite renderizar el popup y los laterales en un catálogo sin activar su comportamiento.

## Desarrollo

`examples/basic` consume el paquete por archivo local y ejercita los cuatro componentes sin depender de Rast Art.

```sh
pnpm --dir examples/basic install
pnpm check
pnpm build
```

Antes de etiquetar una versión, comprueba enlace, cierre, teclado, almacenamiento y vistas móvil, tablet y escritorio. Mantén `private: true` hasta configurar explícitamente un registro privado y el flujo de publicación.
