// ========== GLOBAL VARIABLES ==========
let totalIncome = 0;
let expenses = [];
let expenseCategories = {};

// ======= DOM ELEMENTS =======
const incomeDisplay = document.querySelector(".income h2");
const spendingsDisplay = document.querySelector(".spendings h2");
const availableBalanceDisplay = document.querySelector(".availble-balance h2");
const incomeForm = document.getElementById("incomeForm");
const expenseForm = document.getElementById("expenseForm");

const expenseCtx = document.getElementById("expenseChart").getContext("2d");
const availBalCtx = document.getElementById("incomeChart").getContext("2d");
const spendingsCtx = document.getElementById("spendingsChart").getContext("2d");
const combinedCtx = document.getElementById("incomeExpensesChart").getContext("2d");

const topCategoriesContainer = document.createElement("ul");
topCategoriesContainer.className = "top-categories";
document.querySelector(".spend-categories").prepend(topCategoriesContainer);

// ========== GRADIENTS ==========
let gradientExpense = expenseCtx.createLinearGradient(0, 0, 0, 150);
gradientExpense.addColorStop(0, "rgba(255, 77, 79, 0.4)");
gradientExpense.addColorStop(1, "rgba(255, 77, 79, 0)");

let gradientBalance = availBalCtx.createLinearGradient(0, 0, 0, 150);
gradientBalance.addColorStop(0, "rgba(255, 165, 0, 0.4)");
gradientBalance.addColorStop(1, "rgba(255, 165, 0, 0)");

let gradientCombinedExpense = combinedCtx.createLinearGradient(0, 0, 0, 200);
gradientCombinedExpense.addColorStop(0, "rgba(255, 77, 79, 0.3)");
gradientCombinedExpense.addColorStop(1, "rgba(255, 77, 79, 0)");

let gradientCombinedBalance = combinedCtx.createLinearGradient(0, 0, 0, 200);
gradientCombinedBalance.addColorStop(0, "rgba(255, 165, 0, 0.3)");
gradientCombinedBalance.addColorStop(1, "rgba(255, 165, 0, 0)");

// ========== CHARTS ==========
let expenseChart = new Chart(expenseCtx, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Expenses",
            data: [],
            borderColor: "rgba(255, 77, 79, 0.6)",
            backgroundColor: gradientExpense,
            tension: 0.3,
            fill: true,
            pointRadius: 0
        }]
    },
    options: {
        scales: { x: { display: false }, y: { display: false } },
        plugins: { legend: { display: false } },
        responsive: true
    }
});

let availBalChart = new Chart(availBalCtx, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Available Balance",
            data: [],
            borderColor: "orange",
            backgroundColor: gradientBalance,
            tension: 0.3,
            fill: true,
            pointRadius: 0
        }]
    },
    options: {
        scales: { x: { display: false }, y: { display: false } },
        plugins: { legend: { display: false } },
        responsive: true
    }
});

let spendingsChart = new Chart(spendingsCtx, {
    type: "doughnut",
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: ["#FF7F50", "#DC143C", "#0b694a", "#3de7ae", "#6e08bc"],
            borderWidth: 0
        }]
    },
    options: {
        plugins: { legend: { display: false } },
        cutout: "60%",
        responsive: true,
        maintainAspectRatio: false
    }
});

let combinedChart = new Chart(combinedCtx, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
                label: "Expenses",
                data: [],
                borderColor: "#DC143C",
                backgroundColor: gradientCombinedExpense,
                fill: true,
                tension: 0.3,
                pointRadius: 2
            },
            {
                label: "Available Balance",
                data: [],
                borderColor: "#FFA500",
                backgroundColor: gradientCombinedBalance,
                fill: true,
                tension: 0.3,
                pointRadius: 2
            }
        ]
    },
    options: {
        scales: {
            x: { title: { display: true, text: "Entries" } },
            y: { title: { display: true, text: "Amount ($)" } }
        },
        plugins: {
            legend: { display: true, position: "top" }
        },
        responsive: true,
        maintainAspectRatio: false
    }
});

// ========== EVENT LISTENERS ==========
incomeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = prompt("Enter income amount:");
    const income = parseFloat(amount);
    if (!isNaN(income) && income > 0) {
        totalIncome += income;
        incomeDisplay.textContent = `$${totalIncome}`;
        updateAvailableBalance();
    }
});

expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = prompt("Enter expense amount:");
    const category = prompt("Enter category:");
    const expense = parseFloat(amount);
    if (!isNaN(expense) && expense > 0 && category) {
        expenses.push(expense);
        spendingsDisplay.textContent = `$${getTotalExpenses()}`;

        expenseCategories[category] = (expenseCategories[category] || 0) + expense;

        updateCharts(expense);
        updateAvailableBalance();
        updateCategoryUI();
    }
});

// ========== FUNCTIONS ==========
function getTotalExpenses() {
    return expenses.reduce((sum, val) => sum + val, 0);
}

function updateAvailableBalance() {
    const available = totalIncome - getTotalExpenses();
    availableBalanceDisplay.textContent = `$${available}`;
    updateAvailableBalanceChart(available);
    updateCombinedChart(expenses[expenses.length - 1] || 0, available);
}

function updateCharts(latestExpense) {
    // Here we push the latest individual expense amount, not cumulative sum:
    expenseChart.data.labels.push("");
    expenseChart.data.datasets[0].data.push(latestExpense);
    if (expenseChart.data.labels.length > 10) {
        expenseChart.data.labels.shift();
        expenseChart.data.datasets[0].data.shift();
    }
    expenseChart.update();

    // Pie chart (category breakdown)
    spendingsChart.data.labels = Object.keys(expenseCategories);
    spendingsChart.data.datasets[0].data = Object.values(expenseCategories);
    spendingsChart.update();
}

function updateAvailableBalanceChart(available) {
    availBalChart.data.labels.push("");
    availBalChart.data.datasets[0].data.push(available);
    if (availBalChart.data.labels.length > 10) {
        availBalChart.data.labels.shift();
        availBalChart.data.datasets[0].data.shift();
    }
    availBalChart.update();
}

function updateCombinedChart(latestExpense, available) {
    combinedChart.data.labels.push(`${expenses.length}`);
    combinedChart.data.datasets[0].data.push(latestExpense);
    combinedChart.data.datasets[1].data.push(available);
    if (combinedChart.data.labels.length > 10) {
        combinedChart.data.labels.shift();
        combinedChart.data.datasets[0].data.shift();
        combinedChart.data.datasets[1].data.shift();
    }
    combinedChart.update();
}

function updateCategoryUI() {
    const sorted = Object.entries(expenseCategories)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    topCategoriesContainer.innerHTML = "<h4>Top Categories</h4>";
    sorted.forEach(([cat, amount]) => {
        const li = document.createElement("li");
        li.textContent = `${cat}: $${amount}`;
        topCategoriesContainer.appendChild(li);
    });
}