# Auditoría SEO de ProbLab

Fecha de revisión: 2026-05-14.

## Hallazgos corregidos

1. **Imagen social inconsistente.** La mayoría de páginas apuntaban a `https://problabtools.es/og-image.png`, pero el repositorio solo contiene `og-image.svg` y la PR no debe incluir binarios. Se unificaron las referencias sociales en `og-image.svg`, que ya está versionado como texto.
2. **Metas de caché en el HTML.** Varias landings tenían `meta http-equiv="Cache-Control"`, `Pragma` y `Expires` dentro del `<head>`. Estas directivas son redundantes frente a cabeceras HTTP reales y añaden ruido al HTML crítico. Se retiraron de las landings principales y se mantiene la política en `.htaccess`.
3. **Canonicalización incompleta.** Existían canonicals por página y redirección de `/index.html`, pero faltaba una regla explícita para consolidar `http://`, `https://www.` y `https://problabtools.es`. Se añadió una redirección 301 a `https://problabtools.es` para reducir URLs duplicadas.
4. **Caché de assets limitada.** Solo CSS y JS tenían caché larga. Se amplió a imágenes y fuentes, incluido `og-image.svg`, para mejorar rendimiento percibido y señales de experiencia de página.
5. **Compresión HTTP no declarada.** Se añadió compresión `DEFLATE` para HTML, CSS, JavaScript, JSON, XML y SVG cuando el servidor Apache la soporte.

## Aspectos que ya están bien

- Todas las 69 páginas HTML tienen `<title>`, `meta description`, canonical y un único `<h1>`.
- El sitemap contiene las 69 URLs HTML publicables y no se detectaron URLs obsoletas.
- `robots.txt` permite el rastreo e informa la URL del sitemap.
- Las meta descriptions son únicas en el conjunto revisado.

## Próximas mejoras recomendadas

1. **Contenido programático único por calculadora.** Añadir bloques de “cómo interpretar el resultado”, “fórmula”, “ejemplo resuelto” y “errores frecuentes” en cada herramienta. Esto ayuda a posicionar por búsquedas long-tail como “calculadora intervalo confianza proporción con ejemplo”.
2. **Datos estructurados más específicos.** Mantener `WebApplication`, pero añadir `SoftwareApplication`, `FAQPage` o `HowTo` solo cuando el contenido visible en la página lo respalde.
3. **Enlazado interno contextual.** En cada calculadora, enlazar hacia herramientas relacionadas: distribución normal ↔ tabla normal ↔ intervalos de confianza ↔ contrastes z/t. Usar anchors descriptivos, no genéricos.
4. **Rendimiento JavaScript.** Revisar scripts externos por página y diferir o cargar bajo demanda MathJax, jStat y librerías que no sean necesarias para el primer render.
5. **Medición real.** Conectar Search Console y Bing Webmaster Tools para revisar cobertura, consultas, CTR por página, Core Web Vitals y posibles duplicidades que no son visibles en el repositorio.
6. **Snippet y CTR.** Probar títulos más orientados a intención: “Calculadora binomial online: probabilidad, acumulada y percentiles” en lugar de títulos demasiado genéricos.
7. **Internacionalización futura.** Si se añaden versiones en otros idiomas, incorporar `hreflang` recíproco y canonicals por idioma.
