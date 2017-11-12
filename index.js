var Choice = require('./Choice');

var args = process.argv.slice(2);
//console.log(process.argv);

var choice = {
    ChoiceID: 3205,
	CategoryID: 1, 
    name: "Milky Way",
	description: "yo, dis an update CHOICE suckah",
	type: 0,
	isActive: false
};

//var id = 2;
//var filter = ('1,3,5,7').split(',');
//console.log("FILTER: ", filter);

//Choice.get(null, null).then(function(result) {    
Choice.get(3374, null).then(function(result) {    
	console.log(result);
	return;
}).catch(function(err) {
	console.error(err);
	return;
}).finally(function() {
	Choice.close();
	return;
});

function _logTest(id, filter) {
    console.log('ID: ', id);
    console.log('FILTER: ', filter);
};