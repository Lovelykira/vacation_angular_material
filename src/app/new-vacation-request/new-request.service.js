(function(){
    'use strict';

    angular
        .module('newRequest')
        .service('newVacationRequestService', newVacationRequestService)

    function newVacationRequestService($http, API_URL){
        this.saveVacation = saveVacation;

        function saveVacation (vacation) {
            return $http({
                method: 'POST',
                url: API_URL + 'api/vacations/',
                data: {
                       'user': vacation.user,
                       'start_date': vacation.start_date,
                       'end_date': vacation.end_date,
                       'comment': vacation.comment
                       }
            });
        }
    }

})();
