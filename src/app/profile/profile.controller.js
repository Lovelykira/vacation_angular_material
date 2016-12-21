(function(){
    'use strict';

    angular
        .module('profile')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['profileService', '$scope'];
    function profileCtrl(profileService, $scope){
        this.getUserInfo = getUserInfo;
        this.updateUserInfo = updateUserInfo;

        function getUserInfo(){
              profileService.getUser()
                  .then(function(res){
                      $scope.user = res.data;
                      console.log(res.data);
                  }, function(res){
                      console.log(res.data);
                  });
        }
        getUserInfo();

        function updateUserInfo(){
            var user = {'first_name':'not kira', 'pk': $scope.user.pk}
            profileService.updateUser(user)
               .then(function(res){
                      console.log(res.data);
                  }, function(res){
                      console.log(res.data);
                  });
        }

        ;
    }
})();
