describe('historyCtrl', function(){
    var $controller, $scope, $rootScope, $q, historyService, showNotificationService, historyCtrl;
    var page, pageSize;
    var RESPONSE_SUCCESS = {results: [{
            start_date: '2016-11-16',
            end_date: '2016-11-20',
            comment: 'comment',
            status: 'status'
        }]};
    var RESPONSE_ERROR = {error: 'true'};
    var error_mess = 'Error occurred';

    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module('history'));

    beforeEach(inject(function( _$controller_, _$rootScope_, _historyService_, _showNotificationService_, _$q_){
          $scope = {};
          $rootScope = _$rootScope_;
          $q = _$q_;
          historyService = _historyService_;
          showNotificationService = _showNotificationService_;
          $controller = _$controller_;
    }));

    beforeEach(function(){
        historyCtrl = $controller('historyCtrl', {$scope: $scope, $q: $q, historyService: historyService,
                                                  showNotificationService: showNotificationService});

        page = 1;
        pageSize = 5;
    });

    beforeEach(function(){
        spyOn(showNotificationService, 'show').and.callFake(angular.noop);
    });

    describe('getHistory() with valid data', function(){
        beforeEach(function(){
              spyOn(historyService, 'getUserHistory').and.callFake(function(){
                  var defered = $q.defer();
                  defered.resolve(RESPONSE_SUCCESS);
                  return defered.promise;
              });
        });
        it('should call historyCtrl.getHistory', function(){
            historyCtrl.getHistory(page, pageSize);
            $rootScope.$digest();
            expect(historyService.getUserHistory).toHaveBeenCalled();
            expect(showNotificationService.show).not.toHaveBeenCalledWith('error', error_mess);
        });
    });

    describe('getHistory() with invalid data', function(){
        beforeEach(function(){
              spyOn(historyService, 'getUserHistory').and.callFake(function(){
                  var defered = $q.defer();
                  defered.reject(RESPONSE_ERROR);
                  return defered.promise;
              });
        });
        it('should call historyCtrl.getHistory', function(){
            historyCtrl.getHistory(page, pageSize);
            $rootScope.$digest();
            expect(historyService.getUserHistory).toHaveBeenCalled();
            expect(showNotificationService.show).toHaveBeenCalledWith('error', error_mess);
        });
    });

});
