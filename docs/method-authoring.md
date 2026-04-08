# Guía rápida para crear métodos

## 1) Crear módulo de dominio

Ruta sugerida por familia:

- `assets/js/domain/distributions/`
- `assets/js/domain/sample-size/`
- `assets/js/domain/hypothesis-tests/`
- `assets/js/domain/power/`

La función debe exportarse con nombre explícito, por ejemplo:

```js
export function computeTwoMeansPower(input) {
  // ...
  return { power, assumptions: [] };
}
```

## 2) Registrar método

Añadir entrada en:

- `assets/js/registry/method-registry.json` (contrato/documentación)
- `assets/js/registry/method-registry.js` (runtime)

Campos mínimos:

- `id`
- `family`
- `title`
- `engine.module`
- `engine.export`

## 3) Convenciones

- `id` estable y namespaced (`family.nombre_metodo`).
- Validación de entrada siempre en dominio.
- Salida con objetos serializables.
- Incluir `assumptions` cuando aplique.
