'use strict';
var Sequelize = require('sequelize');
var Config = require('./Config')();
var sequelize = new Sequelize('FuelStation_GVSU', Config.username, Config.password, {
	host: 'callsheet-mysql.cn6x6nhayn9c.us-west-2.rds.amazonaws.com',
	port: 3306,
    pool: {
        max: 10,
        min: 1,
        idle: 100
    }
});

var Choice = sequelize.define('choice', {
  ChoiceID: { 
	  type: Sequelize.INTEGER, 
	  primaryKey: true, 
      autoincrement: true, 
	  field: 'ChoiceID' 
  }, 
  CategoryID: { type: Sequelize.INTEGER, field: 'CategoryID' },
  name: { type: Sequelize.STRING, field: 'Name' }, 
  description: { type: Sequelize.STRING, field: 'Description' },
  type: { type: Sequelize.INTEGER, field: 'Type' },
  isActive: { type: Sequelize.BOOLEAN, field: 'IsActive' },
  isPre: { type: Sequelize.BOOLEAN, field: 'isPre' },
  isPost: { type: Sequelize.BOOLEAN, field: 'isPost' },
  isHydration: { type: Sequelize.BOOLEAN, field: 'isHydration' },
  isStaff: { type: Sequelize.BOOLEAN, field: 'isStaff' },
  isSnack: { type: Sequelize.BOOLEAN, field: 'isSnack' },
  isFree: { type: Sequelize.BOOLEAN, field: 'isFree' }
}, {
	tableName: 'Choices'
});

var moduleName = "CHOICE:";

module.exports.get = function(id,filter) {
    if (!id) return list(filter);
    console.log(moduleName, 'calling getSingle with id: ' + id);
    return sequelize.sync().then(function() {
        return Choice.findById(id).then(function(choice) {
            console.info(moduleName, 'choice record found');
            return {
                count: (choice)?1:0,
                choices: [ (choice)?choice.dataValues:null ]
            };
        })
    });
}

function list(filter) {
    console.log(moduleName, 'calling getAll because no id provided');
	return sequelize.sync().then(function() {
        if (filter) {
            var filterOption = {
                where: {
                    CategoryID: filter 
                } 
            };
            return Choice.findAndCountAll(filterOption);
        } else return Choice.findAndCountAll();
    }).then(function(result) {
		//return Athlete.findAndCountAll().then(function(result) {
        var choices = [];
        result.rows.forEach(function(choiceRow) {
            choices.push(choiceRow.dataValues);
        });
        return {
            count: result.count,
            choices: choices
        };
	});
}

module.exports.create = function(json) {
	return sequelize.sync().then(function() {
		console.info(moduleName, 'create a new choice using JSON provided');
		console.error('need to add json validation to choice creation');
		var choiceJson = json;//JSON.parse(json);
        choiceJson.CategoryID = 6;
		return Choice.create(json).then(function(choice) {
			console.info('choice successfully created');
			return choice;
		});
	});
};

module.exports.update = function(json) {
	return sequelize.sync().then(function() {
		console.info(moduleName, 'update a single choice using JSON provided');
		console.error('need to add json validation to choice update');
		var c = json;//JSON.parse(json);
		return Choice.update(
			json,
			{ where: { ChoiceID: json.ChoiceID } }
		).then(function(result) {
			console.info(moduleName, 'choice successfully updated');
			return result;
		});
	});
};

module.exports.delete = function(id) {
	return sequelize.sync().then(function() {
		console.info(moduleName, 'delete a choice by id');
		return Choice.destroy({ where: { ChoiceID: id } }).then(function(count) {
			console.info(moduleName, '(' + count.toString() + ') choices successfully deleted');
			return count;
		});
	});
};

module.exports.warm = function() {
    var id = '1';
    console.log(moduleName, 'keep warm calling getSingle with id: ' + id);
    return sequelize.sync().then(function() {
        return Choice.findById(id).then(function(choice) {
            console.info(moduleName, 'choice record found');
            return {
                count: (choice)?1:0,
                choices: [ (choice)?choice.dataValues:null ]
            };
        })
    });
}

module.exports.close = function() {
	sequelize.close();
};