(function(){
    'use strict';

    angular
      .module('login')
      .service('loginService', loginService);

   loginService.$inject = ['$http'];

   function loginService ($http) {
      this.loginUser = loginUser;

      function loginUser(user) {
          return $http({
                method: 'POST',
                url: 'http://127.0.0.1:8000/api/token-auth/',
                data: {'username': user.username,
                       'password': user.password
                       }
          });
      };
   }

})();
