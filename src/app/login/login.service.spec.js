describe('login service', function(){
    var API;
    var TOKEN = 'SomeCoolToken';
    var RESPONSE_SUCCESS = {token: TOKEN};
    var RESPONSE_ERROR = {error: true};
    var loginService, $httpBackend, credentialsService;
    var result, mock_user;

    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module('login'));

    beforeEach(inject(function(_loginService_, _$httpBackend_, _$http_, _$cookieStore_, _credentialsService_, _API_URL_){
        loginService = _loginService_;
        $httpBackend = _$httpBackend_;
        $http = _$http_;
        $cookieStore = _$cookieStore_;
        credentialsService = _credentialsService_;
        API = _API_URL_;
    }));

    beforeEach(function(){
        result = {};
        mock_user = {username: 'kira',
                     password: 'qwerty123'};

        spyOn(credentialsService, 'setHeadersAndCookies').and.callFake(angular.noop);
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
            $httpBackend.whenPOST(API + 'api/token-auth/').respond(200, RESPONSE_SUCCESS);

            expect(loginService.loginUser).not.toHaveBeenCalled();
            expect(result).toEqual({});

            loginService.loginUser(mock_user)
                .then(function(res){
                      result = res;
                      },
                      function(res){
                      result = res.data;
                });
            $httpBackend.flush();

            expect(loginService.loginUser).toHaveBeenCalledWith(mock_user);
            expect(credentialsService.setHeadersAndCookies).toHaveBeenCalled();
            expect(result).toEqual(TOKEN);
        });
    });

    describe('loginUser() function with invalid user', function(){
        beforeEach(function() {
            spyOn(loginService, 'loginUser').and.callThrough();
        });

        it('should make api call',function(){
            var auth_url = 'api/token-auth/';
            $httpBackend.whenPOST(API + 'api/token-auth/').respond(404, RESPONSE_ERROR);

            expect(loginService.loginUser).not.toHaveBeenCalled();
            expect(result).toEqual({});

            loginService.loginUser(mock_user)
                .then(function(res){
                      result = res.data;
                      },
                      function(res){
                      result = res.data;
                });
            $httpBackend.flush();

            expect(loginService.loginUser).toHaveBeenCalledWith(mock_user);
            expect(credentialsService.setHeadersAndCookies).not.toHaveBeenCalled();
            expect(result).toEqual(RESPONSE_ERROR);
        });
    });
});
