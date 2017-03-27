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

var id = 2;
var filter = ('1,3,5,7').split(',');
console.log("FILTER: ", filter);

//Choice.get(null, filter).then(function(student) {
//Choice.create(choice).then(function(student) {
Choice.update(choice).then(function(student) {
    
//Sport.get(null, filter).then(function(student) {
//Sport.get('XXX').then(function(student) {
//Sport.create(sport).then(function(student) {
//Sport.update(sport).then(function(student) {
//Sport.delete('XXX').then(function(result) {
	
//Athletes.delete(1165).then(function(result) {
//Athletes.update(ath).then(function(student) {
//Athletes.create(ath).then(function(student) {
//Athletes.get(id, filter).then(function(student) {
//	console.log(result);
	console.log(student);
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