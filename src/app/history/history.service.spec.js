describe('historyService', function(){
    var $http, $httpBackend;
    var API = 'http://127.0.0.1:8000/';
    var RESPONSE_ERROR = {
        results: []
    }
    var RESPONSE_SUCCESS = {
        results: [{
            start_date: '2016-11-16',
            end_date: '2016-11-20',
            comment: 'comment',
            status: 'status'
        }]
    }
    var RESPONSE_SUCCESS_WITH_TOTAL = {
        results: [{
            start_date: '2016-11-16',
            end_date: '2016-11-20',
            comment: 'comment',
            status: 'status',
            total: '5'
        }]
    }
    var pageSize, page, result;

    beforeEach(angular.mock.module('history'));

    beforeEach(inject(function(_$http_, _historyService_, _$httpBackend_){
        $http = _$http_;
        $httpBackend = _$httpBackend_;
        historyService = _historyService_;
    }));

    beforeEach(function(){
        spyOn(historyService, 'getUserHistory').and.callThrough();
        spyOn(historyService, 'calcVacation').and.callThrough();
    });

    beforeEach(function(){
        pageSize = 5;
        page = 1;
        result = {};
    });

    describe('getUserHistory() with valid user', function(){

        it('should make api call and append total vacation to result', function(){
            var request = 'api/vacations/?limit=' + pageSize.toString() + '&offset=' + ((page - 1) * pageSize).toString();
            $httpBackend.whenGET(API + request).respond(200, RESPONSE_SUCCESS);

            expect(historyService.getUserHistory).not.toHaveBeenCalled();
            expect(result).toEqual({});

            historyService.getUserHistory(page, pageSize)
                .then(function(res){
                      result = res;
                }, function(res){
                      result = res;
                });

             $httpBackend.flush();

             expect(historyService.getUserHistory).toHaveBeenCalled();
             expect(result).toEqual(RESPONSE_SUCCESS_WITH_TOTAL);
        });

    });
});
