describe('profileService', function(){
    var result, profileService, mock_user,  RESPONSE_SUCCESS, $httpBackend, API;

    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module('profile'));

    beforeEach(inject(function(_profileService_, _$httpBackend_, _API_URL_){
        $httpBackend = _$httpBackend_;
        profileService = _profileService_;
        API = _API_URL_;
    }));

    beforeEach(function(){
        mock_user = {pk:1,
                     username: 'kira',
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

            profileService.getUser()
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
            var request = 'api/users/'+ mock_user.pk.toString() + '/';
            $httpBackend.whenGET(API + request).respond(200, RESPONSE_SUCCESS);
            $httpBackend.whenPATCH(API + request).respond(200, RESPONSE_SUCCESS);

            profileService.updateUser(mock_user)
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
