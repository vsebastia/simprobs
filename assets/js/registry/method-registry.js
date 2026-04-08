export const METHOD_REGISTRY = {
  "$schemaVersion": "1.0.0",
  "generatedAt": "2026-04-08",
  "methods": [
    {
      "id": "distribution.general",
      "version": "1.0.0",
      "status": "stable",
      "family": "distribution",
      "title": "Calculadora general de distribuciones",
      "slug": "/",
      "engine": {
        "module": "domain/distributions/general.js",
        "export": "computeDistributionGeneral"
      }
    },
    {
      "id": "sample_size.one_proportion",
      "version": "1.0.0",
      "status": "stable",
      "family": "sample_size",
      "title": "Tamaño muestral para una proporción",
      "slug": "/tamano-muestral-una-proporcion.html",
      "engine": {
        "module": "domain/sample-size/one-proportion.js",
        "export": "computeOneProportionSampleSize"
      }
    },
    {
      "id": "sample_size.two_proportions",
      "version": "1.0.0",
      "status": "stable",
      "family": "sample_size",
      "title": "Tamaño muestral para dos proporciones",
      "slug": "/tamano-muestral-dos-proporciones.html",
      "engine": {
        "module": "domain/sample-size/two-proportions.js",
        "export": "computeTwoProportionsSampleSize"
      }
    },
    {
      "id": "sample_size.one_mean",
      "version": "1.0.0",
      "status": "stable",
      "family": "sample_size",
      "title": "Tamaño muestral para una media",
      "slug": "/tamano-muestral-una-media.html",
      "engine": {
        "module": "domain/sample-size/one-mean.js",
        "export": "computeOneMeanSampleSize"
      }
    },
    {
      "id": "sample_size.two_means",
      "version": "1.0.0",
      "status": "stable",
      "family": "sample_size",
      "title": "Tamaño muestral para diferencia de medias",
      "slug": "/tamano-muestral-diferencia-medias.html",
      "engine": {
        "module": "domain/sample-size/two-means.js",
        "export": "computeTwoMeansSampleSize"
      }
    }
  ]
};
