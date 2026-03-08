let chart;

function formatAxisValue(value) {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return "";
    }

    const normalizedValue = Math.abs(numericValue) < 1e-10 ? 0 : numericValue;
    return Number(normalizedValue.toFixed(4)).toString();
}

document.getElementById("distribution").addEventListener("change", loadParameters);
loadParameters();
document.getElementById("calculation").addEventListener("change", updateCdfControls);
document.getElementById("cdfMode").addEventListener("change", updateCdfControls);
updateCdfControls();


function updateCdfControls() {
    const calc = document.getElementById("calculation").value;
    const cdfModeGroup = document.getElementById("cdfModeGroup");
    const cdfMode = document.getElementById("cdfMode");
    const xValueLabel = document.getElementById("xValueLabel");
    const bValueGroup = document.getElementById("bValueGroup");

    const isCdf = calc === "cdf";

    cdfModeGroup.hidden = !isCdf;

    if (!isCdf) {
        bValueGroup.hidden = true;
        xValueLabel.innerText = calc === "quantile" ? "Probabilidad (entre 0 y 1)" : "Valor x";
        return;
    }

    if (cdfMode.value === "interval") {
        xValueLabel.innerText = "Valor a";
        bValueGroup.hidden = false;
        return;
    }

    xValueLabel.innerText = "Valor x";
    bValueGroup.hidden = true;
}

function getCdfValue(dist, value, p1, p2) {
    if (dist === "normal") return jStat.normal.cdf(value, p1, p2);
    if (dist === "binomial") return jStat.binomial.cdf(value, p1, p2);
    if (dist === "poisson") return jStat.poisson.cdf(value, p1);
    if (dist === "studentt") return jStat.studentt.cdf(value, p1);
    if (dist === "chisquare") return jStat.chisquare.cdf(value, p1);
    if (dist === "centralf") return jStat.centralF.cdf(value, p1, p2);
    if (dist === "exponential") return jStat.exponential.cdf(value, p1);
    if (dist === "negbin") return jStat.negbin.cdf(value, p1, p2);
    if (dist === "geometric") return geometricCdf(value, p1);
    throw "Distribución no soportada";
}

function resolveCdfResult(dist, cdfMode, x, b, p1, p2) {
    if (cdfMode === "left") {
        return { value: getCdfValue(dist, x, p1, p2), label: `P(X ≤ ${x})` };
    }

    if (cdfMode === "right") {
        if (["binomial", "poisson", "negbin", "geometric"].includes(dist)) {
            const adjusted = x - 1;
            return { value: 1 - getCdfValue(dist, adjusted, p1, p2), label: `P(X ≥ ${x})` };
        }

        return { value: 1 - getCdfValue(dist, x, p1, p2), label: `P(X ≥ ${x})` };
    }

    if (cdfMode === "interval") {
        if (!Number.isFinite(b)) {
            throw "Debes indicar un valor válido para b";
        }

        if (b < x) {
            throw "El intervalo debe cumplir a ≤ b";
        }

        if (["binomial", "poisson", "negbin", "geometric"].includes(dist)) {
            const lower = x - 1;
            return {
                value: getCdfValue(dist, b, p1, p2) - getCdfValue(dist, lower, p1, p2),
                label: `P(${x} ≤ X ≤ ${b})`
            };
        }

        return {
            value: getCdfValue(dist, b, p1, p2) - getCdfValue(dist, x, p1, p2),
            label: `P(${x} ≤ X ≤ ${b})`
        };
    }

    throw "Tipo de probabilidad acumulada no válido";
}

function poissonQuantile(probability, lambda) {
    if (probability < 0 || probability > 1) {
        throw "El cuantil requiere x entre 0 y 1";
    }

    if (probability === 1) {
        return Infinity;
    }

    let k = 0;
    let cumulative = jStat.poisson.pdf(k, lambda);

    while (cumulative < probability && k < 10000) {
        k += 1;
        cumulative += jStat.poisson.pdf(k, lambda);
    }

    return k;
}

function continuousQuantile(probability, cdfFn, lower, upper) {
    if (probability < 0 || probability > 1) {
        throw "El cuantil requiere x entre 0 y 1";
    }

    if (probability === 0) {
        return lower;
    }

    if (probability === 1) {
        return upper;
    }

    let left = lower;
    let right = upper;

    for (let i = 0; i < 80; i++) {
        const mid = (left + right) / 2;
        const value = cdfFn(mid);

        if (value < probability) {
            left = mid;
        } else {
            right = mid;
        }
    }

    return (left + right) / 2;
}

function geometricPmf(k, p) {
    if (k < 1 || !Number.isInteger(k)) {
        return 0;
    }

    return Math.pow(1 - p, k - 1) * p;
}

function geometricCdf(k, p) {
    if (k < 1) {
        return 0;
    }

    return 1 - Math.pow(1 - p, Math.floor(k));
}

function geometricQuantile(probability, p) {
    if (probability < 0 || probability > 1) {
        throw "El cuantil requiere x entre 0 y 1";
    }

    if (probability === 1) {
        return Infinity;
    }

    return Math.ceil(Math.log(1 - probability) / Math.log(1 - p));
}

function negativeBinomialQuantile(probability, r, p) {
    if (probability < 0 || probability > 1) {
        throw "El cuantil requiere x entre 0 y 1";
    }

    if (probability === 1) {
        return Infinity;
    }

    let k = 0;
    let cumulative = jStat.negbin.pdf(k, r, p);

    while (cumulative < probability && k < 10000) {
        k += 1;
        cumulative += jStat.negbin.pdf(k, r, p);
    }

    return k;
}

function loadParameters() {
    const dist = document.getElementById("distribution").value;
    const container = document.getElementById("parameters");

    if (dist === "normal") {
        container.innerHTML = `
            <div class="form-group">
                <label>Media (μ)</label>
                <input type="number" id="param1" value="0">
            </div>
            <div class="form-group">
                <label>Desviación típica (σ)</label>
                <input type="number" id="param2" value="1" min="0.0001">
            </div>
        `;
    }

    if (dist === "binomial") {
        container.innerHTML = `
            <div class="form-group">
                <label>n</label>
                <input type="number" id="param1" value="10" min="1">
            </div>
            <div class="form-group">
                <label>p (entre 0 y 1)</label>
                <input type="number" id="param2" value="0.5" step="0.01" min="0" max="1">
            </div>
        `;
    }

    if (dist === "poisson") {
        container.innerHTML = `
            <div class="form-group">
                <label>λ</label>
                <input type="number" id="param1" value="4" min="0.0001">
            </div>
        `;
    }

    if (dist === "studentt") {
        container.innerHTML = `
            <div class="form-group">
                <label>Grados de libertad (ν)</label>
                <input type="number" id="param1" value="10" min="1" step="1">
            </div>
        `;
    }

    if (dist === "chisquare") {
        container.innerHTML = `
            <div class="form-group">
                <label>Grados de libertad (k)</label>
                <input type="number" id="param1" value="8" min="1" step="1">
            </div>
        `;
    }

    if (dist === "centralf") {
        container.innerHTML = `
            <div class="form-group">
                <label>Grados de libertad (d1)</label>
                <input type="number" id="param1" value="5" min="1" step="1">
            </div>
            <div class="form-group">
                <label>Grados de libertad (d2)</label>
                <input type="number" id="param2" value="10" min="1" step="1">
            </div>
        `;
    }

    if (dist === "exponential") {
        container.innerHTML = `
            <div class="form-group">
                <label>Tasa (λ)</label>
                <input type="number" id="param1" value="1" min="0.0001" step="0.1">
            </div>
        `;
    }

    if (dist === "negbin") {
        container.innerHTML = `
            <div class="form-group">
                <label>r (éxitos objetivo)</label>
                <input type="number" id="param1" value="5" min="1" step="1">
            </div>
            <div class="form-group">
                <label>p (entre 0 y 1)</label>
                <input type="number" id="param2" value="0.4" step="0.01" min="0.0001" max="0.9999">
            </div>
        `;
    }

    if (dist === "geometric") {
        container.innerHTML = `
            <div class="form-group">
                <label>p (entre 0 y 1)</label>
                <input type="number" id="param1" value="0.3" step="0.01" min="0.0001" max="0.9999">
            </div>
        `;
    }
}

function calculate() {

    const dist = document.getElementById("distribution").value;
    const calc = document.getElementById("calculation").value;
    const x = parseFloat(document.getElementById("xValue").value);
    const b = document.getElementById("bValue") ? parseFloat(document.getElementById("bValue").value) : null;
    const cdfMode = document.getElementById("cdfMode").value;
    const p1 = parseFloat(document.getElementById("param1").value);
    const p2 = document.getElementById("param2") ?
               parseFloat(document.getElementById("param2").value) : null;

    let result = null;

    try {

        if (dist === "normal") {
            if (calc === "pdf") result = jStat.normal.pdf(x, p1, p2);
            if (calc === "cdf") result = resolveCdfResult(dist, cdfMode, x, b, p1, p2).value;
            if (calc === "quantile") {
                if (x < 0 || x > 1) throw "El cuantil requiere x entre 0 y 1";
                result = jStat.normal.inv(x, p1, p2);
            }
        }

        if (dist === "binomial") {
            if (calc === "pdf") result = jStat.binomial.pdf(x, p1, p2);
            if (calc === "cdf") result = resolveCdfResult(dist, cdfMode, x, b, p1, p2).value;
            if (calc === "quantile") {
                if (x < 0 || x > 1) throw "El cuantil requiere x entre 0 y 1";
                result = jStat.binomial.inv(x, p1, p2);
            }
        }

        if (dist === "poisson") {
            if (calc === "pdf") result = jStat.poisson.pdf(x, p1);
            if (calc === "cdf") result = resolveCdfResult(dist, cdfMode, x, b, p1, p2).value;
            if (calc === "quantile") {
                if (x < 0 || x > 1) throw "El cuantil requiere x entre 0 y 1";
                result = poissonQuantile(x, p1);
            }
        }

        if (dist === "studentt") {
            if (calc === "pdf") result = jStat.studentt.pdf(x, p1);
            if (calc === "cdf") result = resolveCdfResult(dist, cdfMode, x, b, p1, p2).value;
            if (calc === "quantile") {
                result = continuousQuantile(x, (v) => jStat.studentt.cdf(v, p1), -100, 100);
            }
        }

        if (dist === "chisquare") {
            if (calc === "pdf") result = jStat.chisquare.pdf(x, p1);
            if (calc === "cdf") result = resolveCdfResult(dist, cdfMode, x, b, p1, p2).value;
            if (calc === "quantile") {
                result = continuousQuantile(x, (v) => jStat.chisquare.cdf(v, p1), 0, Math.max(200, p1 * 15));
            }
        }

        if (dist === "centralf") {
            if (calc === "pdf") result = jStat.centralF.pdf(x, p1, p2);
            if (calc === "cdf") result = resolveCdfResult(dist, cdfMode, x, b, p1, p2).value;
            if (calc === "quantile") {
                result = continuousQuantile(x, (v) => jStat.centralF.cdf(v, p1, p2), 0, 100);
            }
        }

        if (dist === "exponential") {
            if (calc === "pdf") result = jStat.exponential.pdf(x, p1);
            if (calc === "cdf") result = resolveCdfResult(dist, cdfMode, x, b, p1, p2).value;
            if (calc === "quantile") {
                result = jStat.exponential.inv(x, p1);
            }
        }

        if (dist === "negbin") {
            if (calc === "pdf") result = jStat.negbin.pdf(x, p1, p2);
            if (calc === "cdf") result = resolveCdfResult(dist, cdfMode, x, b, p1, p2).value;
            if (calc === "quantile") {
                result = negativeBinomialQuantile(x, p1, p2);
            }
        }

        if (dist === "geometric") {
            if (calc === "pdf") result = geometricPmf(x, p1);
            if (calc === "cdf") result = resolveCdfResult(dist, cdfMode, x, b, p1, p2).value;
            if (calc === "quantile") {
                result = geometricQuantile(x, p1);
            }
        }

        if (result === null || isNaN(result)) throw "Valores inválidos";

        let resultLabel = "Resultado";

        if (calc === "cdf") {
            resultLabel = resolveCdfResult(dist, cdfMode, x, b, p1, p2).label;
        }

        document.getElementById("result").innerText =
            `${resultLabel}: ${result.toFixed(6)}`;

        drawChart(dist, p1, p2, calc, x, cdfMode, b);

    } catch (error) {
        document.getElementById("result").innerText = "Error: " + error;
    }
}


function shouldShadePoint(dist, point, cdfMode, xValue, bValue) {
    if (cdfMode === "left") {
        return point <= xValue;
    }

    if (cdfMode === "right") {
        return point >= xValue;
    }

    if (cdfMode === "interval") {
        return point >= xValue && point <= bValue;
    }

    return false;
}

function drawChart(dist, p1, p2, calc, xValue, cdfMode = "left", bValue = null) {

    const ctx = document.getElementById("chart").getContext("2d");

    if (chart) chart.destroy();

    let labels = [];
    let data = [];
    let backgroundColors = [];

    if (dist === "normal") {
        const points = 160;
        const start = p1 - 4 * p2;
        const end = p1 + 4 * p2;
        const range = end - start;

        for (let i = 0; i <= points; i++) {
            const xPoint = Number((start + (i * range) / points).toFixed(4));

            labels.push(xPoint);
            let y = jStat.normal.pdf(xPoint, p1, p2);
            data.push(y);

            if (calc === "cdf" && shouldShadePoint(dist, xPoint, cdfMode, xValue, bValue))
                backgroundColors.push("rgba(37, 99, 235, 0.3)");
            else
                backgroundColors.push("rgba(37, 99, 235, 0.05)");
        }
    }

    if (dist === "binomial") {
        for (let i = 0; i <= p1; i++) {
            labels.push(i);
            let y = jStat.binomial.pdf(i, p1, p2);
            data.push(y);

            if (calc === "cdf" && shouldShadePoint(dist, i, cdfMode, xValue, bValue))
                backgroundColors.push("rgba(37, 99, 235, 0.5)");
            else
                backgroundColors.push("rgba(37, 99, 235, 0.2)");
        }
    }

    if (dist === "poisson") {
        for (let i = 0; i <= p1*3; i++) {
            labels.push(i);
            let y = jStat.poisson.pdf(i, p1);
            data.push(y);

            if (calc === "cdf" && shouldShadePoint(dist, i, cdfMode, xValue, bValue))
                backgroundColors.push("rgba(37, 99, 235, 0.5)");
            else
                backgroundColors.push("rgba(37, 99, 235, 0.2)");
        }
    }

    if (dist === "studentt") {
        const points = 200;
        const start = -6;
        const end = 6;
        const range = end - start;

        for (let i = 0; i <= points; i++) {
            const xPoint = Number((start + (i * range) / points).toFixed(4));
            labels.push(xPoint);
            data.push(jStat.studentt.pdf(xPoint, p1));
            backgroundColors.push(
                calc === "cdf" && shouldShadePoint(dist, xPoint, cdfMode, xValue, bValue) ? "rgba(37, 99, 235, 0.3)" : "rgba(37, 99, 235, 0.05)"
            );
        }
    }

    if (dist === "chisquare") {
        const points = 200;
        const start = 0;
        const end = Math.max(30, p1 * 3);
        const range = end - start;

        for (let i = 0; i <= points; i++) {
            const xPoint = Number((start + (i * range) / points).toFixed(4));
            labels.push(xPoint);
            data.push(jStat.chisquare.pdf(xPoint, p1));
            backgroundColors.push(
                calc === "cdf" && shouldShadePoint(dist, xPoint, cdfMode, xValue, bValue) ? "rgba(37, 99, 235, 0.3)" : "rgba(37, 99, 235, 0.05)"
            );
        }
    }

    if (dist === "centralf") {
        const points = 200;
        const start = 0;
        const end = 10;
        const range = end - start;

        for (let i = 0; i <= points; i++) {
            const xPoint = Number((start + (i * range) / points).toFixed(4));
            labels.push(xPoint);
            data.push(jStat.centralF.pdf(xPoint, p1, p2));
            backgroundColors.push(
                calc === "cdf" && shouldShadePoint(dist, xPoint, cdfMode, xValue, bValue) ? "rgba(37, 99, 235, 0.3)" : "rgba(37, 99, 235, 0.05)"
            );
        }
    }

    if (dist === "exponential") {
        const points = 200;
        const start = 0;
        const end = Math.max(10 / p1, 5);
        const range = end - start;

        for (let i = 0; i <= points; i++) {
            const xPoint = Number((start + (i * range) / points).toFixed(4));
            labels.push(xPoint);
            data.push(jStat.exponential.pdf(xPoint, p1));
            backgroundColors.push(
                calc === "cdf" && shouldShadePoint(dist, xPoint, cdfMode, xValue, bValue) ? "rgba(37, 99, 235, 0.3)" : "rgba(37, 99, 235, 0.05)"
            );
        }
    }

    if (dist === "negbin") {
        const maxX = Math.max(20, Math.ceil((p1 * (1 - p2)) / p2) + 20);

        for (let i = 0; i <= maxX; i++) {
            labels.push(i);
            data.push(jStat.negbin.pdf(i, p1, p2));
            backgroundColors.push(
                calc === "cdf" && shouldShadePoint(dist, i, cdfMode, xValue, bValue) ? "rgba(37, 99, 235, 0.5)" : "rgba(37, 99, 235, 0.2)"
            );
        }
    }

    if (dist === "geometric") {
        const maxX = Math.max(15, Math.ceil(8 / p1));

        for (let i = 1; i <= maxX; i++) {
            labels.push(i);
            data.push(geometricPmf(i, p1));
            backgroundColors.push(
                calc === "cdf" && shouldShadePoint(dist, i, cdfMode, xValue, bValue) ? "rgba(37, 99, 235, 0.5)" : "rgba(37, 99, 235, 0.2)"
            );
        }
    }

    const discreteDistributions = ["binomial", "poisson", "negbin", "geometric"];

    chart = new Chart(ctx, {
        type: discreteDistributions.includes(dist) ? "bar" : "line",
        data: {
            labels: labels,
            datasets: [{
                data: data,
                borderColor: "#2563eb",
                backgroundColor: backgroundColors,
                fill: !discreteDistributions.includes(dist),
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                        callback: (_, index) => formatAxisValue(labels[index])
                    }
                }
            }
        }
    });
}
