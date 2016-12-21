(function(){
    'use strict';

    angular
        .module('profile')
        .controller('profileCtrl', profileCtrl);

    function profileCtrl(profileService, showNotificationService){
        var profileCtrl = this;
        profileCtrl.getUserInfo = getUserInfo;
        profileCtrl.updateUserInfo = updateUserInfo;

        function getUserInfo(){
              profileService.getUser()
                  .then(function(res){
                      profileCtrl.user = res.data;
                  }, function(res){

                  });
        }
        profileCtrl.getUserInfo();

        function updateUserInfo(){
            var changed_user = {
                                   pk: profileCtrl.user.pk,
                                   first_name: profileCtrl.user.first_name,
                                   last_name: profileCtrl.user.last_name,
                                   email: profileCtrl.user.email
                                }
            profileService.updateUser(changed_user)
               .then(function(res){
                      showNotificationService.show('success', 'Successfully changed');
                  }, function(res){
                      showNotificationService.show('error', 'Error occurred');
                  });
        }
    }
})();
