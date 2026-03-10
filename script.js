(function initProbLab() {
  const dist = document.body?.dataset?.distribution;

  if (!dist) {
    return;
  }

  switch (dist) {
    case 'normal':
      renderNormalCalculator();
      break;
    case 'binomial':
      renderBinomialCalculator();
      break;
    case 'poisson':
      renderPoissonCalculator();
      break;
    case 't-student':
      renderTStudentCalculator();
      break;
    case 'chi-cuadrada':
      renderChiCuadradaCalculator();
      break;
    case 'exponencial':
      renderExponencialCalculator();
      break;
    default:
      console.warn(`Distribución no reconocida: ${dist}`);
  }
})();

function renderNormalCalculator() {}

function renderBinomialCalculator() {}

function renderPoissonCalculator() {}

function renderTStudentCalculator() {}

function renderChiCuadradaCalculator() {}

function renderExponencialCalculator() {}
