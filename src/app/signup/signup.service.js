(function(){
    'use strict';

    angular
      .module('signup')
      .service('signupService', signupService);

      function signupService($http, API_URL){

          this.createUser = createUser;

          function createUser(user) {
              return $http({
                method: 'POST',
                url: API_URL + 'api/users/',
                data: user
            });
          }
      }
})();
