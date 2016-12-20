describe('credentialsService',function(){
    var mock_username, mock_token, $http, $rootScope, $cookieStore, credentialsService;

    beforeEach(angular.mock.module('app'));

    beforeEach(inject(function(_$http_, _$rootScope_, _$cookieStore_, _credentialsService_){
        $http = _$http_;
        $rootScope = _$rootScope_;
        $cookieStore = _$cookieStore_;
        credentialsService = _credentialsService_;
    }));

    beforeEach(function(){
        mock_username = 'kira';
        mock_token = 'SoMeToKeN'
    });

    describe('setHeadersAndCookies', function(){
        it('should set headers and cookies', function(){
              credentialsService.setHeadersAndCookies(mock_username, mock_token);
              expect($http.defaults.headers.common['Authorization']).toEqual('Token ' + mock_token);
              expect($cookieStore.get('globals').currentUser.username).toEqual(mock_username);
        });
    });

    describe('clearHeadersAndCookies', function(){
        it('should clear headers and cookies', function(){
              credentialsService.clearHeadersAndCookies();
              expect($http.defaults.headers.common['Authorization']).toEqual('');
              expect($cookieStore.get('globals')).not.toBeDefined();
        });
    });
});
