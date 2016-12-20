(function(){
    'use strict';

    angular
        .module('newRequest')
        .controller('newRequestCtrl', newRequestCtrl)

        newRequestCtrl.$inject = ['$scope', '$rootScope', 'newVacationRequestService', 'showNotificationService',
                                  '$timeout', 'notify'];
        function newRequestCtrl($scope, $rootScope, newVacationRequestService, showNotificationService, $timeout, notify){
            this.saveVacation = saveVacation;
            this.formatterDate = formatterDate;

            function formatterDate(date){
                return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
            }

            function saveVacation(){
                $scope.error = undefined;
                newVacationRequestService.getUser($rootScope.globals.currentUser.username)
                    .then(function(res){
                          var current_user_id = res.data.pk;
                          var vac = {
                              user: current_user_id,
                              start_date: formatterDate($scope.startDate),
                              end_date: formatterDate($scope.endDate),
                              comment: $scope.comment || ''
                          };
                          newVacationRequestService.saveVacation(vac)
                            .then(function(res){
                                    $scope.comment = '';
                                    $scope.startDate = new Date();
                                    $scope.minStartDate = new Date();
                                    showNotificationService.show('success', 'Successfully created!')
                                  },
                                  function(res){
                                    showNotificationService.show('error', 'Error occurred!')
                            });
                    }, function(res){
                          showNotificationService.show('error', 'Authentication error occurred!')
                    });
            }

           $scope.startDate = new Date();
           $scope.minStartDate = new Date();

           $scope.maxStartDate = new Date(
                $scope.minStartDate.getFullYear() + 1,
                $scope.minStartDate.getMonth(),
                $scope.minStartDate.getDate());

           $scope.endDate = new Date();

           $scope.maxEndDate = new Date(
                $scope.startDate.getFullYear(),
                $scope.startDate.getMonth(),
                $scope.startDate.getDate() + 13);

           $scope.calcVacation = function(){
              var oneDay = 24*60*60*1000;
              $scope.Vacation = (Math.floor(( Date.parse($scope.endDate) - Date.parse($scope.startDate) ) /
                                  oneDay) + 1).toString();
           }

           $scope.moveEndDate = function(){
              if ($scope.startDate > $scope.endDate){
                  $scope.endDate = new Date(
                    $scope.startDate.getFullYear(),
                    $scope.startDate.getMonth(),
                    $scope.startDate.getDate());
              }

              if ($scope.endDate > new Date( $scope.startDate.getFullYear(),
                                             $scope.startDate.getMonth(),
                                             $scope.startDate.getDate() + 13)){
                  $scope.endDate = new Date(
                    $scope.startDate.getFullYear(),
                    $scope.startDate.getMonth(),
                    $scope.startDate.getDate() + 13);
              }
              $scope.maxEndDate = new Date(
                $scope.startDate.getFullYear(),
                $scope.startDate.getMonth(),
                $scope.startDate.getDate() + 13);
           }
           $scope.calcVacation();
        }
})();
