(function(){
    'use strict';

    angular
        .module('profile')
        .service('profileService', profileService);

    function profileService($http, API_URL){
        this.getUser = getUser;
        this.updateUser = updateUser;

        function getUser(){
            return $http({
                method: 'GET',
                url: API_URL + 'api/users/'
            });
        }

        function updateUser(user){
            return $http({
                method: 'PATCH',
                url: API_URL + 'api/users/' + user.pk.toString() + '/',
                data: user
            });
        }
    }
})();
