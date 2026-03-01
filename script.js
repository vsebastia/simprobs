let chart;

document.getElementById("distribution").addEventListener("change", loadParameters);
loadParameters();

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
                <input type="number" id="param2" value="1">
            </div>
        `;
    }

    if (dist === "binomial") {
        container.innerHTML = `
            <div class="form-group">
                <label>n</label>
                <input type="number" id="param1" value="10">
            </div>
            <div class="form-group">
                <label>p</label>
                <input type="number" id="param2" value="0.5">
            </div>
        `;
    }

    if (dist === "poisson") {
        container.innerHTML = `
            <div class="form-group">
                <label>λ</label>
                <input type="number" id="param1" value="4">
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

    let result;

    if (dist === "normal") {
        if (calc === "pdf") result = jStat.normal.pdf(x, p1, p2);
        if (calc === "cdf") result = jStat.normal.cdf(x, p1, p2);
        if (calc === "quantile") result = jStat.normal.inv(x, p1, p2);
    }

    if (dist === "binomial") {
        if (calc === "pdf") result = jStat.binomial.pdf(x, p1, p2);
        if (calc === "cdf") result = jStat.binomial.cdf(x, p1, p2);
        if (calc === "quantile") result = jStat.binomial.inv(x, p1, p2);
    }

    if (dist === "poisson") {
        if (calc === "pdf") result = jStat.poisson.pdf(x, p1);
        if (calc === "cdf") result = jStat.poisson.cdf(x, p1);
        if (calc === "quantile") result = jStat.poisson.inv(x, p1);
    }

    document.getElementById("result").innerText = 
        "Resultado: " + result.toFixed(6);

    drawChart(dist, p1, p2);
}

function drawChart(dist, p1, p2) {

    const ctx = document.getElementById("chart").getContext("2d");

    if (chart) chart.destroy();

    let labels = [];
    let data = [];

    if (dist === "normal") {
        for (let i = -5; i <= 5; i += 0.1) {
            labels.push(i);
            data.push(jStat.normal.pdf(i, p1, p2));
        }
    }

    if (dist === "binomial") {
        for (let i = 0; i <= p1; i++) {
            labels.push(i);
            data.push(jStat.binomial.pdf(i, p1, p2));
        }
    }

    if (dist === "poisson") {
        for (let i = 0; i <= 20; i++) {
            labels.push(i);
            data.push(jStat.poisson.pdf(i, p1));
        }
    }

    chart = new Chart(ctx, {
        type: dist === "normal" ? "line" : "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Función",
                data: data,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } }
        }
    });
}
