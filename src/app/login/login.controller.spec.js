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

    beforeEach(inject(function(_$controller_, _loginService_, _showNotificationService_,
                               _$rootScope_, _$q_, _$state_){
        $controller = _$controller_;
        loginService = _loginService_;
        showNotificationService = _showNotificationService_;
        $rootScope = _$rootScope_;
        $q = _$q_;
        $state = _$state_;
        loginCtrl = $controller('loginCtrl', {loginService: loginService, showNotificationService: showNotificationService,
                                              $state: $state});
    }));

    beforeEach(function(){
        result = {};
        mock_user = {username: 'kira',
                     password: 'qwerty123'};
        loginCtrl.user = mock_user;
    });

    it('should exist', function(){
        expect(loginCtrl).toBeDefined();
    });

    describe('loginUser() function with a valid user', function(){

        beforeEach(function(){
            spyOn(loginCtrl, 'loginUser').and.callThrough();

            spyOn(loginService, 'loginUser').and.callFake(function(mock_user){
                var deferred = $q.defer();
                deferred.resolve(RESPONSE_SUCCESS);
                return deferred.promise;
            });
        });

        it("should call service's loginUser() function and set headers and cookies", function(){
            loginCtrl.loginUser();
            $rootScope.$digest();

            expect(loginCtrl.loginUser).toHaveBeenCalled();
            expect(loginService.loginUser).toHaveBeenCalledWith(mock_user);
        });
    });

    describe('loginUser() function with invalid user', function(){
        beforeEach(function(){
            spyOn(loginCtrl, 'loginUser').and.callThrough();
            spyOn(showNotificationService, 'show').and.callFake(angular.noop);

            spyOn(loginService, 'loginUser').and.callFake(function(mock_user){
                var deferred = $q.defer();
                deferred.reject(RESPONSE_ERROR);
                return deferred.promise;
            });
        });

        it("should call service's loginUser() and show notification about error", function(){
            loginCtrl.loginUser();
            $rootScope.$digest();

            expect(loginCtrl.loginUser).toHaveBeenCalledWith();
            expect(loginService.loginUser).toHaveBeenCalledWith(mock_user);
            expect(showNotificationService.show).toHaveBeenCalled();
        });
    });
});
