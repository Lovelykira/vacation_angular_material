(function(){
    'use strict';

    angular
      .module('signup')
      .service('signupService', signupService);

      signupService.$inject = ['$http'];

      function signupService($http){

          this.createUser = createUser;

          function createUser(user) {
              return $http({
                method: 'POST',
                url: 'http://127.0.0.1:8000/api/users/',
                data: {'username': user.username,
                       'password': user.password,
                       'last_name': user.last_name,
                       'first_name': user.first_name,
                       'email': user.email}
            });
          }
      }
})();
