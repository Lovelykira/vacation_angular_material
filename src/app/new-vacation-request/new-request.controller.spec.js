describe('newRequestCtrl', function(){
     var $controller, newRequestCtrl, newVacationRequestService, showNotificationService, $rootScope, $q, $timeout, notify;
     var mock_user, mock_vacation, mock_username;
     var RESPONSE_SUCCESS = 'Remote call success';
     var RESPONSE_ERROR = {'error': true};
     var notification_text = {success: 'Successfully created!',
                              auth_error: 'Authentication error occurred!',
                              vacation_error: 'Error occurred!'}

     beforeEach(angular.mock.module('app'));
     beforeEach(angular.mock.module('cgNotify'));
     beforeEach(angular.mock.module('newRequest'));

     beforeEach(inject(function(_$controller_, _newVacationRequestService_, _showNotificationService_, _$rootScope_,
                                _$q_, _$timeout_, _notify_){
          $controller = _$controller_;
          newVacationRequestService = _newVacationRequestService_;
          showNotificationService = _showNotificationService_;
          $rootScope = _$rootScope_;
          $q = _$q_;
          $timeout = _$timeout_;
          notify = _notify_;
     }));

     beforeEach(function(){
        mock_username = 'kira';
        mock_user = '1';
        mock_vacation = {'user': mock_user,
                         'start_date': new Date(),
                         'end_date': new Date(),
                         'comment':'some comment'};
       $rootScope.globals = {currentUser: {username : mock_username}};
     });

     beforeEach(function(){
        newRequestCtrl = $controller('newRequestCtrl', {$scope: {}, $rootScope: $rootScope,
                                      newVacationRequestService: newVacationRequestService,
                                      showNotificationService: showNotificationService, $timeout: $timeout,
                                      notify: notify });
        spyOn(showNotificationService, 'show').and.callFake(angular.noop);
     });

    it('should be defined', function(){
        expect(newRequestCtrl).toBeDefined();
    });

    describe('saveVacation() with all valid data', function(){
        beforeEach(function(){
            spyOn(newVacationRequestService, 'saveVacation').and.callFake(function(vacation){
                var deferred = $q.defer();
                deferred.resolve(RESPONSE_SUCCESS);
                return deferred.promise;
            });

            spyOn(newVacationRequestService, 'getUser').and.callFake(function(user){
                var deferred = $q.defer();
                deferred.resolve(mock_username);
                return deferred.promise;
            });
        });

        it('should call newVacationRequestService.saveVacation()', function(){
              newRequestCtrl.saveVacation(mock_username);
              $rootScope.$digest();
              expect(newVacationRequestService.getUser).toHaveBeenCalledWith(mock_username);
              expect(newVacationRequestService.saveVacation).toHaveBeenCalled();
              expect(showNotificationService.show).toHaveBeenCalledWith('success', notification_text.success);
        });
    });

    describe('saveVacation() with all invalid user data', function(){
        beforeEach(function(){
            spyOn(newVacationRequestService, 'saveVacation').and.callFake(function(vacation){
                var deferred = $q.defer();
                deferred.resolve(RESPONSE_SUCCESS);
                return deferred.promise;
            });

            spyOn(newVacationRequestService, 'getUser').and.callFake(function(user){
                var deferred = $q.defer();
                deferred.reject(RESPONSE_ERROR);
                return deferred.promise;
            });
        });

        it('should call newVacationRequestService.saveVacation()', function(){
              newRequestCtrl.saveVacation(mock_username);
              $rootScope.$digest();
              expect(newVacationRequestService.getUser).toHaveBeenCalledWith(mock_username);
              expect(newVacationRequestService.saveVacation).not.toHaveBeenCalled();
              expect(showNotificationService.show).toHaveBeenCalledWith('error', notification_text.auth_error);
        });
    });

    describe('saveVacation() with all invalid vacation data', function(){
        beforeEach(function(){
            spyOn(newVacationRequestService, 'saveVacation').and.callFake(function(vacation){
                var deferred = $q.defer();
                deferred.reject(RESPONSE_ERROR);
                return deferred.promise;
            });

            spyOn(newVacationRequestService, 'getUser').and.callFake(function(user){
                var deferred = $q.defer();
                deferred.resolve(RESPONSE_SUCCESS);
                return deferred.promise;
            });
        });

        it('should call newVacationRequestService.saveVacation()', function(){
              newRequestCtrl.saveVacation(mock_username);
              $rootScope.$digest();
              expect(newVacationRequestService.getUser).toHaveBeenCalledWith(mock_username);
              expect(newVacationRequestService.saveVacation).toHaveBeenCalled();
              expect(showNotificationService.show).toHaveBeenCalledWith('error', notification_text.vacation_error);
        });
    });

});
