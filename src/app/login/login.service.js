(function(){
    'use strict';

    angular
      .module('login')
      .service('loginService', loginService);

   function loginService ($http, API_URL, $rootScope, credentialsService) {
      this.loginUser = loginUser;

      function loginUser(user) {
          return $http({
                method: 'POST',
                url: API_URL + 'api/token-auth/',
                data: user
          })
            .then(function(res){
                credentialsService.setHeadersAndCookies(user.username, res.data.token);
                $rootScope.$emit('loginUser', user.username);
                return res.data.token;
            });
      };
   }

})();
