const moment = require("moment");
moment.locale('tr');

const date = moment();
console.log(date.format('LLL'));
console.log(date.format('h:mm'));