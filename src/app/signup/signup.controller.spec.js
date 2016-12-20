describe('signup controller', function(){

    var $controller, signupCtrl, signupService, showNotificationService, $q, $state, $rootScope;
    var mock_user;
    var RESPONSE_SUCCESS = { data: 'success' }
    var RESPONSE_ERROR = { data: {username: 'Invalid username'} }

    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module('signup'));

      beforeEach(inject(function(_$controller_, _signupService_, _showNotificationService_, _$q_, _$state_, _$rootScope_){
        $controller = _$controller_;
        signupService = _signupService_;
        showNotificationService = _showNotificationService_;
        $q = _$q_;
        $state = _$state_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(function(){
        mock_user = {'username': 'test',
                     'password': 'test'};
    });

    beforeEach(function(){
        signupCtrl = $controller('signupCtrl', {signupService: signupService,
                                                showNotificationService: showNotificationService,
                                                $scope: {'user': mock_user}, $state: $state});

        spyOn($state, 'go').and.callFake(angular.noop);
    });

    it('should be defined', function(){
        expect(signupCtrl).toBeDefined();
    });

    describe('createUser() with valid user', function(){
        beforeEach(function(){
            spyOn(signupService, 'createUser').and.callFake(function(){
                var deferred = $q.defer();
                deferred.resolve('Remote call success');
                return deferred.promise;
            });

        });

        it('should call signupService.createUser() and redirect to login', function(){
              signupCtrl.createUser(mock_user);
              $rootScope.$digest();
              expect(signupService.createUser).toHaveBeenCalled();
              expect($state.go).toHaveBeenCalledWith('login');
        });
    });

    describe('createUser() with invalid user', function(){
        beforeEach(function(){
            spyOn(signupService, 'createUser').and.callFake(function(){
                var deferred = $q.defer();
                deferred.reject(RESPONSE_ERROR);
                return deferred.promise;
            });

            spyOn(showNotificationService, 'show').and.callFake(angular.noop);

        });

        it('should call signupService.createUser() and show notification', function(){
            signupCtrl.createUser(mock_user);
            $rootScope.$digest();
            expect(signupService.createUser).toHaveBeenCalled();
            expect($state.go).not.toHaveBeenCalled();
            expect(showNotificationService.show).toHaveBeenCalled();
        });
    });
});
