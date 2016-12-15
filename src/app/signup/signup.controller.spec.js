describe('signup controller', function(){

    var $controller, signupCtrl, signupService, $q, $state, $rootScope;
    var mock_user;

    beforeEach(angular.mock.module('signup'));

    beforeEach(inject(function(_$controller_, _signupService_, _$q_, _$state_, _$rootScope_){
        $controller = _$controller_;
        signupService = _signupService_;
        $q = _$q_;
        $state = _$state_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(function(){
        mock_user = {'username': 'test',
                     'password': 'test'};
    });

    beforeEach(function(){
        signupCtrl = $controller('signupCtrl', {signupService: signupService, $scope: {'user': mock_user}, $state: $state});
    });

    it('should pass', function(){
        expect(2+2).toEqual(4);
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

            spyOn($state, 'go').and.callFake(angular.noop);
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
                deferred.reject('Remote call error');
                return deferred.promise;
            });

            spyOn($state, 'go').and.callFake(angular.noop);
        });

        it('should call signupService.createUser() and log an error', function(){
//            signupCtrl.createUser(mock_user);
//            $rootScope.$digest();
//            expect(signupService.createUser).toHaveBeenCalled();
//            expect($state.go).not.toHaveBeenCalled();
        });
    });
});
