var _fp = require('lodash/fp');
var _ = require('lodash');

let input = [
    { name: 'TV', price: 300, date: '2018-10-10' },
    { name: 'laptop', price: 600, date: '2018-10-12' },
    { name: 'PC', price: 800, date: '2018-09-05' },
    { name: 'owen', price: 300 },
    { name: 'Camera', price: 500, date: '2018-03-03' },
    { name: 'Fridge', price: 1000, date: '2018-12-11' },
    { name: 'table', price: 150, date: '2018-12-10' },
    { name: 'Sofa', price: 400, date: '2018-12-10' },
    { name: 'chair', date: '2018-09-10' },
    { name: 'Window', price: 300, date: '2018-05-05' }
];


function checkData(item){
    return item.name && item.price && item.date;
}

function capitalizeName(name){
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function addPrefix(price){
    return "$ " + price;
}

// function updateFields(item) {
//     return Object.assign({},
//         x,
//         {
//             name: capitalizeName(x.name),
//             price: addPrefix(x.price)
//         }
//     );
// }
const setItem = (propertypath, value) => (item) => {
    return _fp.set(propertypath, value, item);
 }

function upgradeItem(key, func) {
    return (item) => setItem(key, func(_fp.get(key, item)))(item);
}

function printResult(item, key) {
    console.log(`------`);
    item.map(x => console.log(x))
}

var result = _fp.flow(
    _fp.filter(checkData),
    _fp.map(upgradeItem('price', addPrefix)),
    _fp.map(upgradeItem('name', capitalizeName)),
    _fp.groupBy('date')
    // upgradeItem('price', addPrefix),
)(input);

var invalidData = _fp.reject(checkData)(input);
console.log("-----Invalid------")
invalidData.map(x => console.log(x))

console.log("-------Valid-------")
// console.log(result)
_fp.forOwn(printResult)(result)
///----------------------------------