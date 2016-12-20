(function(){
    'use strict';

    angular
        .module('profile')
        .service('profileService', profileService);

    profileService.$inject = ['$http'];
    function profileService($http){
        this.getUser = getUser;

        function getUser(username){
            return $http({
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/users/'
            });
        }
    }
})();
