(function(){
    'use strict';

    angular
        .module('app')
        .service('showNotificationService', showNotificationService)

        function showNotificationService(notify){
            this.show = show;

            function show(type, msg) {
                notify({ message:msg,
                     duration:3000,
                     position: 'right',
                     classes: 'notificate '+type.toString(),})
           };
        }
})();
