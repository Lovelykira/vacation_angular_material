(function(){
    'use strict';

    angular
        .module('app')
        .service('credentialsService', credentialsService)

    function credentialsService($http, $rootScope, $cookieStore, $window){
        var credentialsService = this;
        credentialsService.setHeadersAndCookies = setHeadersAndCookies;
        credentialsService.clearHeadersAndCookies = clearHeadersAndCookies;

        function setHeadersAndCookies(username, token){
            $window.localStorage.setItem('token', token);
            $window.localStorage.setItem('username', username);
            $http.defaults.headers.common['Authorization'] = 'Token ' + token;
//            $cookieStore.put('globals', $rootScope.globals);
        }

        function clearHeadersAndCookies(){
            $window.localStorage.removeItem('token');
            $window.localStorage.removeItem('username');
            $http.defaults.headers.common['Authorization'] = '';
//            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = '';
        }
    }

})();
