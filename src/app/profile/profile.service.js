(function(){
    'use strict';

    angular
        .module('profile')
        .service('profileService', profileService);

    profileService.$inject = ['$http'];
    function profileService($http){
        this.getUser = getUser;
        this.updateUser = updateUser;

        function getUser(){
            return $http({
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/users/'
            });
        }

        function updateUser(user){
            return $http({
                method: 'PATCH',
                url: 'http://127.0.0.1:8000/api/users/' + user.pk.toString() + '/',
                data: user
            });
        }
    }
})();
