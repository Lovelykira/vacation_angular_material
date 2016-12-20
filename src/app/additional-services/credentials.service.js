(function(){
    'use strict';

    angular
        .module('app')
        .service('credentialsService', credentialsService)

    credentialsService.$inject = ['$http', '$rootScope', '$cookieStore'];

    function credentialsService($http, $rootScope, $cookieStore){
        this.setHeadersAndCookies = setHeadersAndCookies;
        this.clearHeadersAndCookies = clearHeadersAndCookies;

        function setHeadersAndCookies(username, token){
            $http.defaults.headers.common['Authorization'] = 'Token ' + token;
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: token
                }
            };
            $cookieStore.put('globals', $rootScope.globals);
        }

        function clearHeadersAndCookies(){
            $http.defaults.headers.common['Authorization'] = '';
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = '';
        }
    }

})();
