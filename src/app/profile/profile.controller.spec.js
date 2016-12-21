describe('profileCtrl', function(){
    var showNotificationService, profileService, $scope, $controller, profileCtrl, $rootScope, $q, $httpBackend, request,
        API;
    var mock_user = {pk:1,
                     username: 'kira',
                     password: 'unknown',
                     first_name: 'fn',
                     last_name: 'ln',
                     email:'email@domain.com'};
    var mock_changed_user = {pk:1,
                     username: 'kira',
                     password: 'unknown',
                     first_name: 'changed',
                     last_name: 'ln',
                     email:'email@domain.com'};

     var USER_RESPONSE_SUCCESS = {data: mock_user};

    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module('profile'));


    beforeEach(inject(function(_profileService_, _showNotificationService_, _$controller_, _$rootScope_, _$q_, _$httpBackend_, _API_URL_){
        showNotificationService = _showNotificationService_;
        profileService = _profileService_;
        $scope = {};
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        API = _API_URL_;
    }));

    beforeEach(function(){
        profileCtrl = $controller('profileCtrl', {profileService: profileService, $scope: $scope,
                                                  showNotificationService: showNotificationService});

        request = 'api/users/';
        $httpBackend.whenGET(API + request).respond(200, USER_RESPONSE_SUCCESS);
    });

    describe('getUserInfo()', function(){
          beforeEach(function(){
              spyOn(profileService, 'getUser').and.callFake(function(){
                  var deferred = $q.defer();
                  deferred.resolve(USER_RESPONSE_SUCCESS);
                  return deferred.promise;
              });
          });

          it('should save info about current user to controller', function(){
              profileCtrl.getUserInfo();
              $rootScope.$digest();
              expect(profileService.getUser).toHaveBeenCalled();
              expect(profileCtrl.user).toEqual(mock_user);
          });
    });

    describe('updateUserInfo()', function(){
          beforeEach(function(){
              spyOn(profileService, 'updateUser').and.callFake(function(){
                  var deferred = $q.defer();
                  deferred.resolve(USER_RESPONSE_SUCCESS);
                  return deferred.promise;
              });
          });

          it('should update user', function(){
              profileCtrl.user = mock_changed_user;
              profileCtrl.updateUserInfo();
              $rootScope.$digest();
              expect(profileService.updateUser).toHaveBeenCalled();
              expect(profileCtrl.user.first_name).toEqual('changed');
          });
    });
});
