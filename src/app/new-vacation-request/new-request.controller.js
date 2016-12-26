(function(){
    'use strict';

    angular
        .module('newRequest')
        .controller('newRequestCtrl', newRequestCtrl)

        function newRequestCtrl( $rootScope, newVacationRequestService, showNotificationService, profileService,
                                 $timeout){
            var newRequestCtrl = this;
            newRequestCtrl.saveVacation = saveVacation;
            newRequestCtrl.formatterDate = formatterDate;

            function formatterDate(date){
                return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
            }

            function saveVacation(){
                profileService.getUser()
                    .then(function(res){
                          var current_user_id = res.data.pk;
                          var vac = {
                              user: current_user_id,
                              start_date: formatterDate(newRequestCtrl.startDate),
                              end_date: formatterDate(newRequestCtrl.endDate),
                              comment: newRequestCtrl.comment || ''
                          };
                          newVacationRequestService.saveVacation(vac)
                            .then(function(res){
                                    newRequestCtrl.comment = '';
                                    newRequestCtrl.startDate = new Date();
                                    newRequestCtrl.minStartDate = new Date();
                                    showNotificationService.show('success', 'Successfully created!')
                                  },
                                  function(res){
                                    showNotificationService.show('error', 'Error occurred!')
                            });
                    }, function(res){
                          showNotificationService.show('error', 'Authentication error occurred!')
                    });
            }

//           newRequestCtrl.startDate = new Date();
//           newRequestCtrl.minStartDate = new Date();
//
//           newRequestCtrl.maxStartDate = new Date(
//                newRequestCtrl.minStartDate.getFullYear() + 1,
//                newRequestCtrl.minStartDate.getMonth(),
//                newRequestCtrl.minStartDate.getDate());
//
//           newRequestCtrl.endDate = new Date();
//
//           newRequestCtrl.maxEndDate = new Date(
//                newRequestCtrl.startDate.getFullYear(),
//                newRequestCtrl.startDate.getMonth(),
//                newRequestCtrl.startDate.getDate() + 13);


           newRequestCtrl.startDate = moment().toDate();
           newRequestCtrl.minStartDate = moment().toDate();

           newRequestCtrl.maxStartDate = moment(newRequestCtrl.startDate).add(1, 'y').toDate();

           newRequestCtrl.endDate = moment(newRequestCtrl.startDate).toDate();
           newRequestCtrl.maxEndDate = moment(newRequestCtrl.startDate).add(13, 'd').toDate();

           newRequestCtrl.calcVacation = function(){
                newRequestCtrl.Vacation = moment(newRequestCtrl.endDate).diff(newRequestCtrl.startDate, 'd') + 1;
           }

           newRequestCtrl.moveEndDate = function(){
              if (newRequestCtrl.startDate > newRequestCtrl.endDate) {
                  newRequestCtrl.endDate = moment(newRequestCtrl.startDate).toDate();
              }
              if (moment(newRequestCtrl.endDate).diff(moment(newRequestCtrl.startDate), 'd') > 13) {
                  newRequestCtrl.endDate = moment(newRequestCtrl.startDate).add(13, 'd').toDate();
              }
              newRequestCtrl.maxEndDate = moment(newRequestCtrl.startDate).add(13, 'd').toDate();
           }





//           newRequestCtrl.calcVacation = function(){
//                var oneDay = 24*60*60*1000;
//                newRequestCtrl.Vacation = (Math.round(( Date.parse(newRequestCtrl.endDate) - Date.parse(newRequestCtrl.startDate) ) /
//                                  oneDay) + 1).toString();
//           }
//
//           newRequestCtrl.moveEndDate = function(){
//              if (newRequestCtrl.startDate > newRequestCtrl.endDate){
//                  newRequestCtrl.endDate = new Date(newRequestCtrl.startDate);
//              }
//
//              if (newRequestCtrl.endDate > new Date( newRequestCtrl.startDate.getFullYear(),
//                                             newRequestCtrl.startDate.getMonth(),
//                                             newRequestCtrl.startDate.getDate() + 13)) {
//                  newRequestCtrl.endDate = new Date(
//                      newRequestCtrl.startDate.getFullYear(),
//                      newRequestCtrl.startDate.getMonth(),
//                      newRequestCtrl.startDate.getDate() + 13 );
//              }
//              newRequestCtrl.maxEndDate = new Date(
//                newRequestCtrl.startDate.getFullYear(),
//                newRequestCtrl.startDate.getMonth(),
//                newRequestCtrl.startDate.getDate() + 13);
//           }
           newRequestCtrl.calcVacation();
        }
})();
