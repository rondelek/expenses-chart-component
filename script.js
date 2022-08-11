const chartEl = document.getElementById('chart');
let totalEl = document.getElementById('total');

const formatMoneyToDollars = amt => 
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "USD" }).format(amt);

let maxDayAmt = '';
let maxDayName = ''

function generateChartItem(item) {
    const data = {
        dayName: item.day,
        dayAbbr: item.day.substring(0, 3).toLowerCase(),
        dayAmt: item.amount
    }
    let barColor = 'red';
    if (data.dayName === maxDayName) {
        barColor = 'cyan';
    }

    return `
    <div class="bars" aria-label="${data.dayName}'s spending was ${formatMoneyToDollars(data.dayAmt)}">
        <button class="bar ${barColor}" stats="${formatMoneyToDollars(data.dayAmt)}"; style="height:${data.dayAmt * 2}px;"></button>
        <div class="day">${data.dayAbbr}</div>
    </div>
    `
}

function getMaxAmountObject(arr) {
    return arr.reduce(function(prev, curr) {
        return (prev.amount > curr.amount) ? prev : curr
    })
}

// function sumNumbers(givenArr) {
//     return givenArr.reduce(function(total, num) {
//         num.amount += total.amount;
//         debugger
//         return num;
//     })
// }

async function fetchChartData() {
    const chartFetch = await fetch('./data.json');
    const chartData = await chartFetch.json();

    const findMax = getMaxAmountObject(chartData);
    maxDayName = findMax.day;
    maxDayAmt = findMax.amount;

    chartEl.innerHTML = chartData.map(i => generateChartItem(i)).join('');

    // const sumExpenses = sumNumbers(chartData);
    // totalEl.innerHTML 
    // console.log(sumExpenses.amount)
}


fetchChartData();

