describe('login service', function(){
    var API = 'http://127.0.0.1:8000/'
    var TOKEN = 'SomeCoolToken';
    var RESPONSE_SUCCESS = {token: TOKEN};
    var loginService, $httpBackend;
    var result, mock_user;

    beforeEach(angular.mock.module('login'));

    beforeEach(inject(function(_loginService_, _$httpBackend_, _$http_, _$cookieStore_){
        loginService = _loginService_;
        $httpBackend = _$httpBackend_;
        $http = _$http_;
        $cookieStore = _$cookieStore_;
    }));

    beforeEach(function(){
        result = {};
        mock_user = {username: 'kira',
                     password: 'qwerty123'}
    });

    it('should exist', function(){
        expect(loginService).toBeDefined();
    });

    describe('loginUser() function with valid user', function(){
        beforeEach(function() {
            spyOn(loginService, 'loginUser').and.callThrough();
        });

        it('should make api call',function(){
            var auth_url = 'api/token-auth/';
            $httpBackend.whenPOST('http://127.0.0.1:8000/api/token-auth/').respond(200, RESPONSE_SUCCESS);

            expect(loginService.loginUser).not.toHaveBeenCalled();
            expect(result).toEqual({});

            loginService.loginUser(mock_user).then(
            function(res){result = res.data;},
            function(res){result = {'error': true};});
            $httpBackend.flush();

            expect(loginService.loginUser).toHaveBeenCalledWith(mock_user);
            expect(result).toEqual({'token': TOKEN});
//            expect($http.defaults.headers.common['Authorization']).toEqual('Basic ' + TOKEN);
//            expect($rootScope.globals.currentUser).toEqual({
//                    'username': mock_user.username,
//                    'authdata': TOKEN
//                });
//            expect($cookieStore.get('globals')).toEqual($rootScope.globals);
        });
    });
});
