// Part 1
let prices = [500,600,700];

// 1. Create a function called 'showPrices' that
//    will console.log() each price in the array prices

// 2. Call the function and pass it to the argument 'prices', which
//    is the variable above
//      
//    When you do this...
//    showPrices(prices)
//
//    You should see this in the browser console
//    500
//    600
//    700

function showPrices(param) {
    console.log(param[0])
    console.log(param[1])
    console.log(param[2])
}

showPrices(prices);











// Part 1
let data = {
    'iPhone 14': 3500,
    'S22': 3300,
    'Lenovo Laptop': 2700 
}

// 1. Create a function called 'showDataPrices' that
//    will console.log() each price in the object 'data'

// 2. Call the function and pass it to the argument 'data', which
//    is the variable above
//      
//    When you do this...
//    showDataPrices(data)
//
//    You should see this in the browser console
//    3500
//    3300
//    2700


function showDataPrices(param) {
    console.log(param['iPhone 14']);
    console.log(param['S22']);
    console.log(param['Lenovo Laptop'])
}

showDataPrices(data);