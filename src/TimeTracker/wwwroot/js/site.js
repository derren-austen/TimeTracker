(function () {

    angular.module('TimeTrackerApp', [])

    .controller('TimeTrackerController', function ($http, $interval, $filter) {
        var vm = this;

        vm.timer = null;

        vm.message;

        vm.start;
        vm.end;

        vm.timeRecordCollection = [];

        vm.timerRunning = false;

        vm.StartTimer = function () {
            vm.start = $filter('date')(new Date(), 'HH:mm:ss');
            vm.end = '';
            vm.timerRunning = true;
            
            vm.timer = $interval(function () {
                var time = $filter('date')(new Date(), 'HH:mm:ss');
                vm.message = 'Timer active: ' + time;
            }, 500);
        };

        vm.StopTimer = function () {
            vm.Message = "Timer stopped.";
            vm.timerRunning = false;
            
            if (angular.isDefined(vm.timer)) {
                vm.message = 'Timer inactive';
                vm.end = $filter('date')(new Date(), 'HH:mm:ss');
                
                vm.timeRecordCollection.push({start: vm.start, end: vm.end});
                
                $interval.cancel(vm.timer);
            }
        };

        vm.removeTimeEntry = function (timeEntry) {
            var index = vm.timeRecordCollection.indexOf(timeEntry);
            if (index >= 0)
                vm.timeRecordCollection.splice(index, 1);
        };

    })


})();