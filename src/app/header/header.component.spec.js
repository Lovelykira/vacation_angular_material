describe('header', function(){
    var credentialsService, $state, $scope, $sce, $controller, headerCtrl;

    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module('mainHeader'));

    beforeEach(inject(function(_credentialsService_, _$state_, _$sce_, _$controller_){
          credentialsService = _credentialsService_;
          $state = _$state_;
          $scope = {};
          $sce = _$sce_;
          $controller = _$controller_;
    }));

    beforeEach(function(){
        headerCtrl = $controller('headerCtrl', {credentialsService: credentialsService,
                                                $state: $state, $scope: $scope, $sce: $sce})
    })

    it('should have a logout function', function(){
        expect(headerCtrl).toBeDefined();
        expect(headerCtrl.logout).toBeDefined();
    });

    describe('logout()', function(){
        beforeEach(function(){
            spyOn(credentialsService, 'clearHeadersAndCookies').and.callFake(angular.noop);
            spyOn($state, 'go').and.callFake(angular.noop);
        });

        it('should call the function to clear headers and cookies and redirect to home', function(){
              headerCtrl.logout();
              expect(credentialsService.clearHeadersAndCookies).toHaveBeenCalled();
              expect($state.go).toHaveBeenCalled();
        });
    })
});
