describe('login controller', function(){
    var $controller, loginCtrl, loginService, $http, $cookieStore, $q, $rootScope, mock_user;
    var TOKEN = 'SomeCoolToken';

    beforeEach(angular.mock.module('login'));

    beforeEach(inject(function(_$controller_, _loginService_, _$http_, _$cookieStore_, _$q_, _$rootScope_){
        $controller = _$controller_;
        loginService = _loginService_;
        $http = _$http_;
        $cookieStore = _$cookieStore_;
        $q = _$q_;
        $rootScope = _$rootScope_;

        loginCtrl = $controller('loginCtrl', {loginService: loginService});
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
            spyOn(loginCtrl, 'setHeadersAndCookies').and.callFake(function(a,b){
                console.log('asdasdasdasdasdassd');
            });
            spyOn(loginCtrl, 'loginUser').and.callThrough();

            spyOn(loginService, 'loginUser').and.callFake(function(mock_user){
                console.log('mockedLoginService');
                var deferred = $q.defer();
                deferred.resolve({'token': TOKEN});
                console.log('mockedLoginService resolve');
                return deferred.promise;
            });

//            spyOn(loginCtrl, 'setHeadersAndCookies').and.callThrough();
        });

        it('should exist', function(){
            expect(loginCtrl.loginUser).toBeDefined();
        });

        it("should call service's loginUser() function and set headers and cookies", function(){
            loginCtrl.loginUser(mock_user);
            $rootScope.$apply();

            expect(loginService.loginUser).toHaveBeenCalledWith(mock_user);
            expect(loginCtrl.setHeadersAndCookies).toHaveBeenCalled();

            loginCtrl.setHeadersAndCookies('asd', 'asd');

//            expect($http.defaults.headers.common['Authorization']).toEqual('Basic ' + TOKEN);
//            expect($rootScope.globals.currentUser).toEqual({
//                    'username': mock_user.username,
//                    'authdata': TOKEN
//                });
//            expect($cookieStore.get('globals')).toEqual($rootScope.globals);
        });
    });
})
