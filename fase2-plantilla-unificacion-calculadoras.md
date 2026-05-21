# Fase 2 — Plantilla objetivo y brechas por calculadora

## Plantilla única objetivo (orden estándar propuesto)

1. Calculadora
2. ¿Qué calcula esta herramienta?
3. Fórmula
4. Ejemplo resuelto
5. Cómo interpretar el resultado
6. Preguntas frecuentes
7. Calculadoras relacionadas

### Secciones opcionales (según tipo de calculadora)

- Parámetros
- Supuestos importantes
- Fórmulas utilizadas
- Visualización del contraste F
- Cuándo usar la corrección de Yates
- Recomendaciones prácticas
- Conceptos clave antes de empezar

## Criterio usado

- Se tomó como base el inventario normalizado (`inventario-secciones-calculadoras.csv`).
- Para cada página se compararon sus secciones con la plantilla objetivo.
- `Falta`: secciones de la plantilla no presentes en la página.
- `Sobra`: secciones presentes en la página que no están en la plantilla núcleo (quedan candidatas a opcionales/específicas).

## Brechas por página (falta/sobra)

### ab-testing-bayesiano.html
- Falta (2): Fórmula, Cómo interpretar el resultado
- Sobra (6): Test A/B bayesiano — Beta-Binomial, Modelo Beta-Binomial, Elección de la prior, P(B > A) mediante Monte Carlo, Interpretación de los resultados, Ventajas del enfoque bayesiano

### ab-testing-potencia.html
- Falta (3): ¿Qué calcula esta herramienta?, Fórmula, Cómo interpretar el resultado
- Sobra (13): MDE, potencia y tamaño muestral — A/B testing, Cómo leer el gráfico, Conceptos clave antes de empezar, Nivel de significación α — riesgo de falso positivo, Potencia estadística 1−β — capacidad de detectar un efecto real, MDE — efecto mínimo detectable, Tasa base p_A y tasa esperada p_B, Fórmulas utilizadas, Cómo interpretar cada resultado, Modo: Tamaño muestral, Modo: Potencia, Modo: MDE, Recomendaciones prácticas

### ab-testing-simulacion.html
- Falta (4): Calculadora, ¿Qué calcula esta herramienta?, Fórmula, Cómo interpretar el resultado
- Sobra (6): Simulación de experimentos A/B, Parámetros de simulación, Qué simula esta herramienta, ¿Para qué sirve simular un test A/B?, Cómo leer el histograma de z, Cómo leer la distribución de p-valores

### ab-testing-z-test.html
- Falta (2): Fórmula, Ejemplo resuelto
- Sobra (6): Test Z de conversión — A/B testing, Hipótesis y estadístico, Corrección por continuidad de Yates, Intervalo de confianza para la diferencia, Cuándo usar la corrección de Yates, Ejemplo resuelto: test Z en A/B testing

### anova.html
- Falta (2): ¿Qué calcula esta herramienta?, Fórmula
- Sobra (6): Calculadora online de ANOVA de un factor, ¿Qué contrasta el ANOVA?, Visualización del contraste F, Fórmulas del ANOVA de un factor, Supuestos importantes, Después de un ANOVA significativo

### bernoulli.html
- Falta (1): Calculadora
- Sobra (5): Distribución Bernoulli, Configuración, Resultado y visualización, Explicación breve, Parámetros

### beta.html
- Falta (1): Calculadora
- Sobra (6): Distribución Beta, Configuración, Resultado y visualización, Distribución beta, Explicación breve, Parámetros

### binomial.html
- Falta (1): Calculadora
- Sobra (7): Calculadora binomial online, Configuración, Resultado y visualización, Distribución binomial, Explicación breve, Parámetros, Ejemplo resuelto: éxitos en ensayos independientes

### centralf.html
- Falta (1): Calculadora
- Sobra (6): Calculadora F de Snedecor online, Configuración, Resultado y visualización, Distribución F de Snedecor, Explicación breve, Parámetros

### chi-cuadrado-bondad-ajuste.html
- Falta (0): —
- Sobra (4): Calculadora de chi-cuadrado de bondad de ajuste, Explicación breve, Hipótesis y estadístico, Contraste rápido

### chisquare.html
- Falta (1): Calculadora
- Sobra (6): Calculadora chi cuadrado online, Configuración, Resultado y visualización, Distribución chi-cuadrado, Explicación breve, Parámetros

### contraste-hipotesis-correlacion.html
- Falta (0): —
- Sobra (5): Calculadora online de contraste de hipótesis para la correlación de Pearson, Explicación breve, Hipótesis y estadísticos, Guía rápida de interpretación, ¿Por qué la transformación de Fisher?

### contraste-hipotesis-dos-medias.html
- Falta (0): —
- Sobra (5): Calculadora online de contraste de hipótesis para dos medias, Explicación breve, Hipótesis y estadístico, Contraste rápido, ¿También hay versión con desviación poblacional conocida?

### contraste-hipotesis-dos-proporciones.html
- Falta (0): —
- Sobra (5): Calculadora online de contraste de hipótesis para dos proporciones, Explicación breve, Hipótesis y estadístico, Contraste rápido, Ejemplo resuelto: comparación de conversiones

### contraste-hipotesis-dos-varianzas.html
- Falta (1): Fórmula
- Sobra (4): Calculadora de contraste de dos varianzas (test F de Snedecor), Explicación breve, Hipótesis y estadístico, Contraste rápido

### contraste-hipotesis-medias-apareadas.html
- Falta (0): —
- Sobra (6): Calculadora online de contraste de hipótesis para medias apareadas, Explicación breve, Hipótesis y estadístico, Guía rápida de decisión, ¿Cuándo usar el diseño apareado?, Supuestos del test

### contraste-hipotesis-no-inferioridad.html
- Falta (1): Ejemplo resuelto
- Sobra (5): Calculadora online de contraste de no inferioridad y equivalencia, Explicación breve, Hipótesis y estadísticos, Guía rápida de interpretación, Ejemplo resuelto: no inferioridad de proporciones

### contraste-hipotesis-odds-ratio.html
- Falta (0): —
- Sobra (4): Calculadora de contraste de hipótesis para odds ratio, Explicación breve, Hipótesis y estadístico, Contraste rápido

### contraste-hipotesis-proporciones-apareadas.html
- Falta (0): —
- Sobra (6): Calculadora online del test de McNemar para proporciones apareadas, Explicación breve, Tabla 2×2 para datos apareados, Hipótesis y estadístico, Guía rápida de interpretación, ¿Por qué solo importan los pares discordantes?

### contraste-hipotesis-una-media.html
- Falta (0): —
- Sobra (5): Calculadora online de contraste de hipótesis para una media, Explicación breve, Hipótesis y estadístico, Contraste rápido, ¿Por qué hay dos fórmulas en este contraste?

### contraste-hipotesis-una-proporcion.html
- Falta (0): —
- Sobra (4): Calculadora online de contraste de hipótesis para una proporción, Explicación breve, Hipótesis y estadístico, Contraste rápido

### contraste-hipotesis-varianzas.html
- Falta (0): —
- Sobra (4): Calculadora de contrastes sobre varianzas, Explicación breve, Hipótesis y estadístico, Contraste rápido

### contraste-independencia-chi-cuadrado.html
- Falta (0): —
- Sobra (4): Calculadora de chi-cuadrado de independencia, Explicación breve, Hipótesis y estadístico, Contraste rápido

### exponential.html
- Falta (1): Calculadora
- Sobra (6): Calculadora de distribución exponencial, Configuración, Resultado y visualización, Distribución exponencial, Explicación breve, Parámetros

### gamma.html
- Falta (1): Calculadora
- Sobra (6): Distribución Gamma, Configuración, Resultado y visualización, Distribución gamma, Explicación breve, Parámetros

### geometric.html
- Falta (1): Calculadora
- Sobra (6): Distribución Geométrica, Configuración, Resultado y visualización, Distribución geométrica, Explicación breve, Parámetros

### hypergeometric.html
- Falta (1): Calculadora
- Sobra (6): Distribución Hipergeométrica, Configuración, Resultado y visualización, Distribución hipergeométrica, Explicación breve, Parámetros

### intervalo-confianza-diferencia-medias.html
- Falta (2): Fórmula, Cómo interpretar el resultado
- Sobra (6): Intervalo de confianza para la diferencia de medias, Explicación breve, Varianzas iguales (pooled), Varianzas distintas (Welch), Supuestos para la diferencia de medias independientes, ¿Varianzas iguales o distintas?

### intervalo-confianza-diferencia-proporciones.html
- Falta (2): Fórmula, Cómo interpretar el resultado
- Sobra (7): Intervalo de confianza para la diferencia de proporciones, Explicación breve, Método de Wald (aproximación normal), Método de Newcombe-Wilson (recomendado), Supuestos para comparar dos proporciones, ¿Wald o Newcombe-Wilson?, Referencias usadas

### intervalo-confianza-media-poblacion-finita.html
- Falta (2): Fórmula, Preguntas frecuentes
- Sobra (6): Intervalo de confianza para una media (población finita), Explicación breve, Fórmula del IC con FPC, Cuándo el FPC es importante, Supuestos del modelo, Referencias

### intervalo-confianza-media-sigma-conocida.html
- Falta (0): —
- Sobra (5): Intervalo de confianza para una media (σ conocida), Explicación breve, Valores críticos z habituales, Supuestos del intervalo z, Cuándo usar este intervalo

### intervalo-confianza-media.html
- Falta (0): —
- Sobra (4): Intervalo de confianza para una media (σ desconocida), Explicación breve, Supuestos del intervalo t, Ejemplo resuelto: intervalo para una media

### intervalo-confianza-medias-apareadas.html
- Falta (1): Cómo interpretar el resultado
- Sobra (5): Intervalo de confianza para medias apareadas, Explicación breve, Supuestos para medias apareadas, ¿En qué se diferencia del IC para diferencia de medias independientes?, Referencias usadas

### intervalo-confianza-odds-ratio.html
- Falta (2): Fórmula, Cómo interpretar el resultado
- Sobra (8): Intervalo de confianza para odds ratio, Explicación breve, Método logarítmico de Woolf, Corrección de Haldane-Anscombe, Supuestos para el IC de odds ratio, ¿En qué se diferencia del IC para ratio de proporciones?, Cómo interpretar el intervalo, Referencias usadas

### intervalo-confianza-proporcion-poblacion-finita.html
- Falta (2): Fórmula, Preguntas frecuentes
- Sobra (6): Intervalo de confianza para una proporción (población finita), Explicación breve, Fórmula del IC con FPC, Cuándo el FPC es importante, Supuestos del modelo, Referencias

### intervalo-confianza-proporcion.html
- Falta (2): Fórmula, Cómo interpretar el resultado
- Sobra (7): Intervalo de confianza para una proporción, Explicación breve, Método de Wald (aproximación normal), Método de Wilson (score, recomendado), Supuestos para el IC de una proporción, Diferencias entre Wald y Wilson, ¿Cuándo usar cada método?

### intervalo-confianza-ratio-proporciones.html
- Falta (2): Fórmula, Cómo interpretar el resultado
- Sobra (8): Intervalo de confianza para ratio de proporciones, Explicación breve, Método logarítmico para el ratio de proporciones, Corrección para celdas cero, Supuestos para el ratio de proporciones, ¿En qué se diferencia del IC para odds ratio?, Cómo interpretar el intervalo, Referencias usadas

### intervalo-confianza-varianza.html
- Falta (1): Fórmula
- Sobra (5): Intervalo de confianza para una varianza, Explicación breve, Fórmula para la varianza, Fórmula para la desviación típica, Supuestos del intervalo chi-cuadrado

### kolmogorov-smirnov-bondad-ajuste.html
- Falta (0): —
- Sobra (4): Calculadora de Kolmogorov-Smirnov de bondad de ajuste, Explicación breve, Hipótesis y estadístico, Contraste rápido

### lognormal.html
- Falta (1): Calculadora
- Sobra (6): Distribución Log-normal, Configuración, Resultado y visualización, Distribución log-normal, Explicación breve, Parámetros

### negbin.html
- Falta (1): Calculadora
- Sobra (6): Calculadora binomial negativa online, Configuración, Resultado y visualización, Distribución binomial negativa, Explicación breve, Parámetros

### normal.html
- Falta (1): Calculadora
- Sobra (7): Calculadora normal online, Configuración, Resultado y visualización, Distribución normal, Explicación breve, Parámetros, Ejemplo resuelto: probabilidad bajo una normal

### poisson.html
- Falta (1): Calculadora
- Sobra (7): Calculadora de Poisson online, Configuración, Resultado y visualización, Distribución de Poisson, Explicación breve, Parámetros, Ejemplo resuelto: conteos por intervalo

### shapiro-wilk-normalidad.html
- Falta (0): —
- Sobra (4): Calculadora de Shapiro–Wilk (normalidad), Explicación breve, Hipótesis y estadístico, Contraste rápido

### studentt.html
- Falta (1): Calculadora
- Sobra (6): Calculadora t de Student online, Configuración, Resultado y visualización, Distribución t de Student, Explicación breve, Parámetros

### tamano-muestral-anova.html
- Falta (0): —
- Sobra (8): Calculadora de tamaño muestral para ANOVA, Explicación breve, Fórmula y método de cálculo, Cómo calcular f a partir de datos previos, Configuración rápida, Usos frecuentes, Supuestos del modelo, Referencias y lecturas adicionales

### tamano-muestral-chi-cuadrado-bondad.html
- Falta (2): Fórmula, Preguntas frecuentes
- Sobra (5): Calculadora de tamaño muestral para chi-cuadrado de bondad de ajuste, Explicación breve, Parámetro de no centralidad y potencia, Configuración rápida, Referencias

### tamano-muestral-chi-cuadrado-independencia.html
- Falta (2): Fórmula, Preguntas frecuentes
- Sobra (6): Calculadora de tamaño muestral para chi-cuadrado de independencia, Explicación breve, Parámetro de no centralidad y potencia, W de Cohen para tablas 2×2, Configuración rápida, Referencias

### tamano-muestral-contraste-una-media.html
- Falta (2): Fórmula, Preguntas frecuentes
- Sobra (5): Calculadora de tamaño muestral para contraste de una media, Explicación breve, Fórmula de tamaño muestral, Configuración rápida, Supuestos del modelo

### tamano-muestral-contraste-una-proporcion.html
- Falta (3): Fórmula, Cómo interpretar el resultado, Preguntas frecuentes
- Sobra (5): Calculadora de tamaño muestral para contraste de una proporción, Explicación breve, Fórmula de tamaño muestral, Configuración rápida, Supuestos del modelo

### tamano-muestral-correlacion.html
- Falta (0): —
- Sobra (7): Calculadora de tamaño muestral para correlación de Pearson, Explicación breve, Fórmula de tamaño muestral, Supuestos del modelo, Configuración rápida, Usos frecuentes, Referencias externas

### tamano-muestral-diferencia-medias.html
- Falta (0): —
- Sobra (7): Calculadora de tamaño muestral para dos medias, Explicación breve, Fórmula de tamaño muestral, Configuración rápida, Usos frecuentes, Supuestos del modelo, Referencias y lecturas adicionales

### tamano-muestral-diferencia-proporciones-ic.html
- Falta (0): —
- Sobra (8): Calculadora de tamaño muestral para la diferencia de proporciones (IC), Explicación breve, Fórmula de tamaño muestral, Interpretación del margen de error, Configuración rápida, Usos frecuentes, Supuestos del modelo, Referencias y lecturas adicionales

### tamano-muestral-dos-proporciones.html
- Falta (0): —
- Sobra (7): Calculadora de tamaño muestral para dos proporciones, Explicación breve, Fórmula de tamaño muestral, Configuración rápida, Usos frecuentes, Supuestos del modelo, Referencias y lecturas adicionales

### tamano-muestral-dos-varianzas.html
- Falta (2): Fórmula, Preguntas frecuentes
- Sobra (5): Calculadora de tamaño muestral para contraste de dos varianzas, Explicación breve, Fórmula de potencia exacta, Configuración rápida, Referencias

### tamano-muestral-fisher.html
- Falta (0): —
- Sobra (4): Calculadora de tamaño muestral para test exacto de Fisher (2×2), Explicación breve, Configuración rápida, Referencias

### tamano-muestral-kolmogorov-smirnov.html
- Falta (2): Fórmula, Preguntas frecuentes
- Sobra (5): Calculadora de tamaño muestral para el test de Kolmogorov–Smirnov, Explicación breve, Fórmula de potencia, Configuración rápida, Referencias

### tamano-muestral-media-poblacion-finita.html
- Falta (0): —
- Sobra (7): Calculadora de tamaño muestral para media en población finita, Explicación breve, Fórmula de tamaño muestral, Configuración rápida, Usos frecuentes, Supuestos del modelo, Referencias y lecturas adicionales

### tamano-muestral-medias-apareadas-ic.html
- Falta (0): —
- Sobra (8): Calculadora de tamaño muestral para medias apareadas (IC), Explicación breve, Fórmula de tamaño muestral, Relación entre σ_d, E y n, Configuración rápida, Usos frecuentes, Supuestos del modelo, Referencias y lecturas adicionales

### tamano-muestral-medias-apareadas.html
- Falta (0): —
- Sobra (7): Calculadora de tamaño muestral para medias apareadas, Explicación breve, Fórmula de tamaño muestral, Configuración rápida, Usos frecuentes, Supuestos del modelo, Referencias y lecturas adicionales

### tamano-muestral-no-inferioridad.html
- Falta (0): —
- Sobra (7): Calculadora de tamaño muestral para no inferioridad y equivalencia, Explicación breve, Fórmulas, Supuestos del modelo, Configuración rápida, Usos frecuentes, Referencias externas

### tamano-muestral-odds-ratio-ic.html
- Falta (0): —
- Sobra (8): Calculadora de tamaño muestral para odds ratio (IC), Explicación breve, Fórmulas, Cómo interpretar E_log, Configuración rápida, Usos frecuentes, Supuestos del modelo, Referencias y lecturas adicionales

### tamano-muestral-odds-ratio.html
- Falta (0): —
- Sobra (7): Calculadora de tamaño muestral para odds ratio (caso-control), Explicación breve, Fórmula de tamaño muestral, Supuestos del modelo, Configuración rápida, Usos frecuentes, Referencias externas

### tamano-muestral-proporcion-poblacion-finita.html
- Falta (0): —
- Sobra (8): Calculadora de tamaño muestral para proporción en población finita, Explicación breve, Fórmula de tamaño muestral, Efecto del factor de corrección, Configuración rápida, Usos frecuentes, Supuestos del modelo, Referencias y lecturas adicionales

### tamano-muestral-proporciones-apareadas.html
- Falta (0): —
- Sobra (7): Calculadora de tamaño muestral para proporciones apareadas, Explicación breve, Fórmula de tamaño muestral, Configuración rápida, Usos frecuentes, Supuestos del modelo, Referencias y lecturas adicionales

### tamano-muestral-shapiro-wilk.html
- Falta (1): Fórmula
- Sobra (6): Calculadora de tamaño muestral para el test de Shapiro–Wilk, Explicación breve, Fórmula de potencia (aproximación Jarque–Bera), Distribuciones de referencia, Configuración rápida, Referencias

### tamano-muestral-una-media.html
- Falta (0): —
- Sobra (8): Calculadora de tamaño muestral para una media, Explicación breve, Fórmula de tamaño muestral, Relación entre σ, E y n, Configuración rápida, Usos frecuentes, Supuestos del modelo, Referencias y lecturas adicionales

### tamano-muestral-una-proporcion.html
- Falta (0): —
- Sobra (8): Calculadora de tamaño muestral para una proporción, Explicación breve, Fórmula de tamaño muestral, Interpretación del margen de error, Configuración rápida, Usos frecuentes, Supuestos del modelo, Referencias y lecturas adicionales

### tamano-muestral-una-varianza.html
- Falta (2): Fórmula, Preguntas frecuentes
- Sobra (5): Calculadora de tamaño muestral para contraste de una varianza, Explicación breve, Fórmula de potencia exacta, Configuración rápida, Referencias

### tamano-muestral-varianza-ic.html
- Falta (0): —
- Sobra (8): Calculadora de tamaño muestral para la varianza (IC), Explicación breve, Fórmula del cociente U/L, Interpretación del cociente U/L, Configuración rápida, Usos frecuentes, Supuestos del modelo, Referencias y lecturas adicionales

### test-exacto-fisher.html
- Falta (0): —
- Sobra (4): Calculadora del test exacto de Fisher (2×2), Explicación breve, Hipótesis y estadístico, Contraste rápido

### uniform.html
- Falta (1): Calculadora
- Sobra (6): Distribución Uniforme, Configuración, Resultado y visualización, Distribución uniforme, Explicación breve, Parámetros

### weibull.html
- Falta (1): Calculadora
- Sobra (5): Distribución Weibull, Configuración, Resultado y visualización, Explicación breve, Parámetros

## Recomendación de unificación rápida

1. Añadir en todas las páginas, al menos: `¿Qué calcula esta herramienta?`, `Fórmula`, `Ejemplo resuelto`, `Cómo interpretar el resultado`, `Preguntas frecuentes` y `Calculadoras relacionadas`.
2. Mantener la sección `Calculadora` como bloque principal encima de contenido explicativo.
3. Tratar el resto como opcional según familia (distribuciones, contrastes, tamaño muestral, A/B testing).

## Top secciones más frecuentes (inventario actual)

- Calculadoras relacionadas: 73
- Ejemplo resuelto: 71
- ¿Qué calcula esta herramienta?: 70
- Explicación breve: 68
- Preguntas frecuentes: 64
- Cómo interpretar el resultado: 63
- Calculadora: 56
- Fórmula: 51
- Configuración rápida: 25
- Supuestos del modelo: 20
- Configuración: 16
- Resultado y visualización: 16
- Parámetros: 16
- Usos frecuentes: 16
- Hipótesis y estadístico: 15
- Fórmula de tamaño muestral: 14
- Referencias y lecturas adicionales: 13
- Contraste rápido: 12
- Referencias: 9
- Referencias usadas: 4