describe('new vacation request service', function(){
    var newVacationRequestService, $httpBackend;
    var API;
    var RESPONSE_SUCCESS = {'success': true};
    var RESPONSE_SUCCESS_USER = {}
    var result, mock_vacation;

    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module('newRequest'));

    beforeEach(inject(function(_newVacationRequestService_, _$httpBackend_, _API_URL_){
        newVacationRequestService = _newVacationRequestService_;
        $httpBackend = _$httpBackend_;
        API = _API_URL_;
    }));

    beforeEach(function(){
        result = {};
        mock_user = {'username': 'kira',
                     'password': 'qwerty123'}
        mock_vacation = {'user': mock_user,
                         'start_date': new Date(),
                         'end_date': new Date(),
                         'comment':'some comment'};
        RESPONSE_SUCCESS_USER = {user: mock_user};
    });

    beforeEach(function(){
        spyOn(newVacationRequestService, 'saveVacation').and.callThrough();
    });

    it('should exist', function(){
        expect(newVacationRequestService).toBeDefined();
    });

    describe('saveVacation()', function(){

        it('should make API call to create vacation and return success', function(){
            var request = 'api/vacations/';
            $httpBackend.whenPOST(API + request).respond(200, RESPONSE_SUCCESS);

            expect(newVacationRequestService.saveVacation).not.toHaveBeenCalled();
            expect(result).toEqual({});

            newVacationRequestService.saveVacation(mock_vacation)
              .then(function(res){
                    result = res.data;
              }, function(res){
                    result = res.data;
              });

            $httpBackend.flush();

            expect(newVacationRequestService.saveVacation).toHaveBeenCalledWith(mock_vacation);
            expect(result).toEqual({'success': true});
        });
    });
});
