describe('profileService', function(){
    var result, profileService, mock_user, mock_username, RESPONSE_SUCCESS, $httpBackend;
    var API = 'http://127.0.0.1:8000/';

    beforeEach(angular.mock.module('profile'));

    beforeEach(inject(function(_profileService_, _$httpBackend_){
        $httpBackend = _$httpBackend_;
        profileService = _profileService_;
    }));

    beforeEach(function(){
        mock_username = 'kira';
        mock_user = {username: mock_username,
                     password: 'unknown',
                     first_name: 'fn',
                     last_name: 'ln',
                     email:'email@domain.com'};
        RESPONSE_SUCCESS = mock_user;
        result= {}
    });

    describe('getUser', function(){
        beforeEach(function(){
           spyOn(profileService, 'getUser').and.callThrough();
        });

        it('should make API call to get current user', function(){
            var request = 'api/users/';
            $httpBackend.whenGET(API + request).respond(200, RESPONSE_SUCCESS);

            profileService.getUser(mock_username)
                .then(function(res){
                    result = res.data;
                }, function(res){
                    result = res.data;
                });
            $httpBackend.flush();
            expect(result).toEqual(RESPONSE_SUCCESS);
        });
    });

    describe('updateUser', function(){
        beforeEach(function(){
           spyOn(profileService, 'updateUser').and.callThrough();
        });

        it('should make API call to update current user', function(){
            var request = 'api/users/';
            $httpBackend.whenPUT(API + request).respond(200, RESPONSE_SUCCESS);

            profileService.updateUser(mock_username)
                .then(function(res){
                    result = res.data;
                }, function(res){
                    result = res.data;
                });
            $httpBackend.flush();
            expect(result).toEqual(RESPONSE_SUCCESS);
        });

    });

});
