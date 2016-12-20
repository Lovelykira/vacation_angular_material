describe('login controller', function(){
    var $controller, loginCtrl, loginService, credentialsService, showNotificationService, $http, $cookieStore, $q,
        $rootScope, mock_user;
    var TOKEN = 'SomeCoolToken';
    var RESPONSE_SUCCESS = {data: {token: TOKEN}};
    var RESPONSE_ERROR = {'error': true};

    beforeEach(module('ui.router'));
    beforeEach(angular.mock.module('cgNotify'));
    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module('login'));

    beforeEach(inject(function(_$controller_, _loginService_, _credentialsService_, _showNotificationService_,
                               _$rootScope_, _$q_, _$state_){
        $controller = _$controller_;
        loginService = _loginService_;
        credentialsService = _credentialsService_;
        showNotificationService = _showNotificationService_;
        $rootScope = _$rootScope_;
        $q = _$q_;
        $state = _$state_;
        loginCtrl = $controller('loginCtrl', {loginService: loginService, credentialsService: credentialsService,
                                              showNotificationService: showNotificationService, $scope: {},
                                              $state: $state});
    }));

    beforeEach(function(){
        result = {};
        mock_user = {username: 'kira',
                     password: 'qwerty123'};
    });

    it('should exist', function(){
        expect(loginCtrl).toBeDefined();
    });

    describe('loginUser() function with a valid user', function(){

        beforeEach(function(){
            spyOn(loginCtrl, 'loginUser').and.callThrough();
            spyOn(credentialsService, 'setHeadersAndCookies').and.callFake(function(){});

            spyOn(loginService, 'loginUser').and.callFake(function(mock_user){
                var deferred = $q.defer();
                deferred.resolve(RESPONSE_SUCCESS);
                return deferred.promise;
            });
        });

        it("should call service's loginUser() function and set headers and cookies", function(){
            loginCtrl.loginUser(mock_user);
            $rootScope.$digest();

            expect(loginCtrl.loginUser).toHaveBeenCalledWith(mock_user);
            expect(loginService.loginUser).toHaveBeenCalledWith(mock_user);
            expect(credentialsService.setHeadersAndCookies).toHaveBeenCalledWith(mock_user.username, RESPONSE_SUCCESS.data.token);
        });
    });

    describe('loginUser() function with invalid user', function(){
        beforeEach(function(){
            spyOn(loginCtrl, 'loginUser').and.callThrough();
            spyOn(credentialsService, 'setHeadersAndCookies').and.callFake(function(){});
            spyOn(showNotificationService, 'show').and.callFake(function(){});

            spyOn(loginService, 'loginUser').and.callFake(function(mock_user){
                var deferred = $q.defer();
                deferred.reject(RESPONSE_ERROR);
                return deferred.promise;
            });
        });

        it("should call service's loginUser() and show notification about error", function(){
            loginCtrl.loginUser(mock_user);
            $rootScope.$digest();

            expect(loginCtrl.loginUser).toHaveBeenCalledWith(mock_user);
            expect(loginService.loginUser).toHaveBeenCalledWith(mock_user);
            expect(credentialsService.setHeadersAndCookies).not.toHaveBeenCalled();
            expect(showNotificationService.show).toHaveBeenCalled();
        });
    });
});
