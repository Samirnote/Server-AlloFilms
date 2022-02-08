
const filmsToSort = require('./simple.json');


filmsToSort.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity));

// console.log(filmsToSort);

// console.log(filmsToSort.slice(0, 5001));
const filmsOutput = filmsToSort.slice(0, 5001);
console.log(filmsOutput);

module.exports = filmsOutput;

// export default filmsOutput;


