(function () {

  'use strict';

  angular.module('pdb.redo.services', [])
  .service('pdbRedoService', ['$http', '$q', function($http, $q){

	this.createNewEvent = function(eventTypeArr){
		var eventObj = {};
		angular.forEach(eventTypeArr, function(eventType, index){
			var event;
			if (typeof MouseEvent == 'function') {
				// current standard
				event = new MouseEvent(eventType, { 'view': window, 'bubbles': true, 'cancelable': true });

			} else if (typeof document.createEvent == 'function') {
				// older standard
				event = document.createEvent('MouseEvents');
				event.initEvent(eventType, true /*bubbles*/, true /*cancelable*/);

			} else if (typeof document.createEventObject == 'function') {
				// IE 8-
				event = document.createEventObject();
			}

			eventObj[eventType] = event;
		});

		return eventObj;
	};

    this.getApiData = function(pdbId){
      //var apiUrl = '//www.cmbi.ru.nl/pdb_redo/cgi-bin/json.pl?id='+pdbId;
      var apiUrl = '//pdb-redo.eu/db/'+pdbId+'/pdbe.json';
  		var deferred = $q.defer();

      $http.get(apiUrl)
      .then(function(response) {
        deferred.resolve(response.data);
      }, function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

  }]);

}());
