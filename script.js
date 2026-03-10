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

function getCalculatorNode() {
  return document.getElementById('calculator');
}

function mountCalculator(title, fields, onSubmit) {
  const container = getCalculatorNode();
  if (!container) {
    return;
  }

  const fieldsHtml = fields
    .map(
      (field) => `
        <label for="${field.id}">${field.label}</label>
        <input id="${field.id}" type="number" step="any" value="${field.defaultValue}">
      `,
    )
    .join('');

  container.innerHTML = `
    <section style="border:1px solid #dbe3f1;border-radius:12px;padding:16px;margin:16px 0;max-width:560px;background:#fff;">
      <h2 style="margin-top:0;">${title}</h2>
      <form id="calculator-form" style="display:grid;gap:10px;">
        ${fieldsHtml}
        <button type="submit" style="margin-top:8px;padding:10px 12px;border-radius:10px;border:none;background:#4f46e5;color:#fff;font-weight:700;cursor:pointer;">Calcular</button>
      </form>
      <p id="calculator-result" style="font-weight:700;margin:12px 0 0;"></p>
    </section>
  `;

  container.querySelector('#calculator-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const values = fields.map((field) => Number(container.querySelector(`#${field.id}`)?.value));
    const resultNode = container.querySelector('#calculator-result');

    if (!resultNode || values.some((value) => Number.isNaN(value))) {
      return;
    }

    resultNode.textContent = onSubmit(values);
  });
}

function factorial(n) {
  if (n < 0 || !Number.isInteger(n)) {
    return NaN;
  }
  let result = 1;
  for (let i = 2; i <= n; i += 1) {
    result *= i;
  }
  return result;
}

function combination(n, k) {
  if (k < 0 || k > n || !Number.isInteger(n) || !Number.isInteger(k)) {
    return NaN;
  }
  return factorial(n) / (factorial(k) * factorial(n - k));
}

function formatProbability(value) {
  if (!Number.isFinite(value)) {
    return 'Entrada no válida';
  }
  return `Resultado: ${value.toFixed(6)}`;
}

function renderNormalCalculator() {
  mountCalculator(
    'Calculadora normal (densidad)',
    [
      { id: 'mu', label: 'Media (μ)', defaultValue: 0 },
      { id: 'sigma', label: 'Desviación estándar (σ)', defaultValue: 1 },
      { id: 'x', label: 'Valor x', defaultValue: 0 },
    ],
    ([mu, sigma, x]) => {
      if (sigma <= 0) return 'σ debe ser mayor que 0';
      const density = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-((x - mu) ** 2) / (2 * sigma ** 2));
      return `Densidad f(x): ${density.toFixed(6)}`;
    },
  );
}

function renderBinomialCalculator() {
  mountCalculator(
    'Calculadora binomial (P(X = k))',
    [
      { id: 'n', label: 'Número de ensayos (n)', defaultValue: 10 },
      { id: 'k', label: 'Número de éxitos (k)', defaultValue: 3 },
      { id: 'p', label: 'Probabilidad de éxito (p)', defaultValue: 0.5 },
    ],
    ([n, k, p]) => {
      if (p < 0 || p > 1) return 'p debe estar entre 0 y 1';
      const comb = combination(n, k);
      if (!Number.isFinite(comb)) return 'n y k deben ser enteros y cumplir 0 ≤ k ≤ n';
      return formatProbability(comb * p ** k * (1 - p) ** (n - k));
    },
  );
}

function renderPoissonCalculator() {
  mountCalculator(
    'Calculadora Poisson (P(X = k))',
    [
      { id: 'lambda', label: 'Tasa media (λ)', defaultValue: 4 },
      { id: 'kpoisson', label: 'Número de eventos (k)', defaultValue: 2 },
    ],
    ([lambda, k]) => {
      if (lambda <= 0) return 'λ debe ser mayor que 0';
      if (!Number.isInteger(k) || k < 0) return 'k debe ser entero mayor o igual a 0';
      return formatProbability((Math.exp(-lambda) * lambda ** k) / factorial(k));
    },
  );
}

function renderTStudentCalculator() {
  mountCalculator(
    'Calculadora t de Student (estadístico t)',
    [
      { id: 'xbar', label: 'Media muestral (x̄)', defaultValue: 10 },
      { id: 'mu0', label: 'Media hipotética (μ)', defaultValue: 8 },
      { id: 's', label: 'Desviación muestral (s)', defaultValue: 2 },
      { id: 'nstudent', label: 'Tamaño de muestra (n)', defaultValue: 16 },
    ],
    ([xbar, mu, s, n]) => {
      if (s <= 0 || n <= 1) return 's debe ser > 0 y n debe ser > 1';
      const t = (xbar - mu) / (s / Math.sqrt(n));
      return `Estadístico t: ${t.toFixed(6)} (gl = ${Math.floor(n - 1)})`;
    },
  );
}

function renderChiCuadradaCalculator() {
  mountCalculator(
    'Calculadora chi-cuadrada (contribución por celda)',
    [
      { id: 'obs', label: 'Valor observado (O)', defaultValue: 18 },
      { id: 'esp', label: 'Valor esperado (E)', defaultValue: 15 },
    ],
    ([obs, esp]) => {
      if (esp <= 0) return 'E debe ser mayor que 0';
      const chi = ((obs - esp) ** 2) / esp;
      return `Contribución χ²: ${chi.toFixed(6)}`;
    },
  );
}

function renderExponencialCalculator() {
  mountCalculator(
    'Calculadora exponencial (P(X ≤ x))',
    [
      { id: 'lambdaExp', label: 'Tasa (λ)', defaultValue: 1.2 },
      { id: 'xexp', label: 'Tiempo x', defaultValue: 2 },
    ],
    ([lambda, x]) => {
      if (lambda <= 0 || x < 0) return 'λ debe ser > 0 y x debe ser ≥ 0';
      return formatProbability(1 - Math.exp(-lambda * x));
    },
  );
}
