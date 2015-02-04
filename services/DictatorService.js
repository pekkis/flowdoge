var $ = require('jquery');
var Promise = require('bluebird');
var Immutable = require('immutable');

var promisedDictators = Promise.resolve($.get('http://diktaattoriporssi.com/api/dictator'));

var DictatorService = {

    findAll: function() {

        return promisedDictators.then(function(dictators) {
            return Immutable.List(dictators);
        });

    }

};

module.exports = DictatorService;