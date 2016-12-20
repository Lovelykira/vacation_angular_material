(function (){

    'use strict';

    angular
        .module('history')
        .service('historyService', historyService)


    function historyService($http){
        historyService = this;
        historyService.getUserHistory = getUserHistory;
        historyService.calcVacation = calcVacation;

        function calcVacation(start_date, end_date){
            var parts = end_date.split('-');
            var end_date = new Date(parts[0],parts[1]-1,parts[2]);
            parts = start_date.split('-');
            var start_date = new Date(parts[0],parts[1]-1,parts[2]);
            var oneDay = 24*60*60*1000;
            return (Math.floor(( Date.parse(end_date) - Date.parse(start_date) ) / oneDay) + 1).toString();
        }

        function getUserHistory (page, pageSize){
            return $http({
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/vacations/?limit=' + pageSize.toString() + '&offset=' + ((page - 1) * pageSize).toString()
                }).then(function(response) {
                    var result = response.data;

                    for(var i = 0; i < result.results.length; i++){
                        result.results[i].total = historyService.calcVacation(result.results[i].start_date, result.results[i].end_date)
                    }
                    return result;
                });
        }
    }
})();
