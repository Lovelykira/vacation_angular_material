(function (){

'use strict';


angular.module('history')
 .controller('historyCtrl', function ( $q, historyService, showNotificationService) {
            this.getHistory = getHistory;

            function getHistory(page, pageSize){
                return historyService.getUserHistory(page, pageSize)
                .then(function(res){
                    res.totalResultCount = res.count;
                    return res;
                }, function(data){
                    var result = {totalResultCount: 0,
                              results: []}
                    showNotificationService.show('error', 'Error occurred')
                    return result;
                });
            }
      });

  })();
