describe('signup service', function(){
    var signupService, $httpBackend;
    var API = 'http://127.0.0.1:8000/'
    var RESPONSE_SUCCESS = {'success': true};
    var RESPONSE_ERROR = {'error': true};

    beforeEach(angular.mock.module('signup'));

    beforeEach(inject(function(_signupService_, _$httpBackend_, _$q_){
        signupService = _signupService_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
    }));

    it('should exist', function(){
        expect(signupService).toBeDefined();
    });

    describe('createUser()', function(){
        var result;
        var mock_user = {'username': 'test', 'password': 'test'};

        beforeEach(function(){
            result = {};
            spyOn(signupService, "createUser").and.callThrough();
        });

        it('should create user when valid data is posted', function(){
            var search = 'api/users/';
            $httpBackend.whenPOST(API + search).respond(200, RESPONSE_SUCCESS);

            expect(signupService.createUser).not.toHaveBeenCalled();
            expect(result).toEqual({});

            signupService.createUser(mock_user)
              .then(function(res){
                    result = res.data;
              });

            $httpBackend.flush();

            expect(signupService.createUser).toHaveBeenCalledWith(mock_user);
            expect(result).toEqual(RESPONSE_SUCCESS);
        });

        it('should create user when invalid data is posted', function(){
            var search = 'api/users/';
            $httpBackend.whenPOST(API + search).respond(404, RESPONSE_ERROR);

            expect(signupService.createUser).not.toHaveBeenCalled();
            expect(result).toEqual({});

            signupService.createUser(mock_user)
              .then(function(res){
                    result = res.data;
              }, function(res){
                    result = res.data;
              });

            $httpBackend.flush();

            expect(signupService.createUser).toHaveBeenCalledWith(mock_user);
            expect(result).toEqual(RESPONSE_ERROR);
        });
    });

});
