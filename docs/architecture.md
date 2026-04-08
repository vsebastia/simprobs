# Arquitectura objetivo (v2)

## Capas

- `domain/`: fórmulas y lógica estadística pura.
- `registry/`: catálogo declarativo de métodos disponibles.
- `ui/`: adaptadores y componentes de interacción.
- `app/`: bootstrap y ensamblado.

## Principios

1. Cada método estadístico vive en un módulo con una función `compute...`.
2. El registro define cómo descubrir y ejecutar métodos.
3. La UI nunca contiene fórmulas; solo orquesta inputs/outputs.
4. Se mantiene un bridge (`legacy-bridge.js`) para convivir con código histórico.

## Cobertura actual migrada

- Calculadora general de distribuciones (`distribution.general`).
- Tamaño muestral para:
  - una proporción,
  - dos proporciones,
  - una media,
  - diferencia de medias.

## Próximo paso recomendado

Conectar `script.js` para que use `window.registryApi` como proveedor principal y dejar su lógica actual como fallback.
