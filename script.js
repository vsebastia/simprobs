let chart;

function formatAxisValue(value) {
    return Number(value.toFixed(2)).toString();
}

document.getElementById("distribution").addEventListener("change", loadParameters);
loadParameters();

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
}

function calculate() {

    const dist = document.getElementById("distribution").value;
    const calc = document.getElementById("calculation").value;
    const x = parseFloat(document.getElementById("xValue").value);
    const p1 = parseFloat(document.getElementById("param1").value);
    const p2 = document.getElementById("param2") ?
               parseFloat(document.getElementById("param2").value) : null;

    let result = null;

    try {

        if (dist === "normal") {
            if (calc === "pdf") result = jStat.normal.pdf(x, p1, p2);
            if (calc === "cdf") result = jStat.normal.cdf(x, p1, p2);
            if (calc === "quantile") {
                if (x < 0 || x > 1) throw "El cuantil requiere x entre 0 y 1";
                result = jStat.normal.inv(x, p1, p2);
            }
        }

        if (dist === "binomial") {
            if (calc === "pdf") result = jStat.binomial.pdf(x, p1, p2);
            if (calc === "cdf") result = jStat.binomial.cdf(x, p1, p2);
            if (calc === "quantile") {
                if (x < 0 || x > 1) throw "El cuantil requiere x entre 0 y 1";
                result = jStat.binomial.inv(x, p1, p2);
            }
        }

        if (dist === "poisson") {
            if (calc === "pdf") result = jStat.poisson.pdf(x, p1);
            if (calc === "cdf") result = jStat.poisson.cdf(x, p1);
            if (calc === "quantile") {
                if (x < 0 || x > 1) throw "El cuantil requiere x entre 0 y 1";
                result = poissonQuantile(x, p1);
            }
        }

        if (result === null || isNaN(result)) throw "Valores inválidos";

        document.getElementById("result").innerText =
            "Resultado: " + result.toFixed(6);

        drawChart(dist, p1, p2, calc, x);

    } catch (error) {
        document.getElementById("result").innerText = "Error: " + error;
    }
}

function drawChart(dist, p1, p2, calc, xValue) {

    const ctx = document.getElementById("chart").getContext("2d");

    if (chart) chart.destroy();

    let labels = [];
    let data = [];
    let backgroundColors = [];

    if (dist === "normal") {
        const step = p2 / 20;
        const start = p1 - 4 * p2;
        const end = p1 + 4 * p2;

        for (let i = start; i <= end + step / 2; i += step) {
            const xPoint = Number(i.toFixed(4));

            labels.push(xPoint);
            let y = jStat.normal.pdf(xPoint, p1, p2);
            data.push(y);

            if (calc === "cdf" && xPoint <= xValue)
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

            if (calc === "cdf" && i <= xValue)
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

            if (calc === "cdf" && i <= xValue)
                backgroundColors.push("rgba(37, 99, 235, 0.5)");
            else
                backgroundColors.push("rgba(37, 99, 235, 0.2)");
        }
    }

    chart = new Chart(ctx, {
        type: dist === "normal" ? "line" : "bar",
        data: {
            labels: labels,
            datasets: [{
                data: data,
                borderColor: "#2563eb",
                backgroundColor: backgroundColors,
                fill: dist === "normal",
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
