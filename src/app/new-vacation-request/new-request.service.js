(function(){
    'use strict';

    angular
        .module('newRequest')
        .service('newVacationRequestService', newVacationRequestService)

    newVacationRequestService.$inject = ['$http'];

    function newVacationRequestService($http){
        this.saveVacation = saveVacation;
        this.getUser = getUser;

        function saveVacation (vacation) {
            return $http({
                method: 'POST',
                url: 'http://127.0.0.1:8000/api/vacations/',
                data: {'user': vacation.user,
                       'start_date': vacation.start_date,
                       'end_date': vacation.end_date,
                       'comment': vacation.comment
                       }
            });
        }

        function getUser(){
            return $http({
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/users/'
            });
        }
    }

})();
