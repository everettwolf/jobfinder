angular.module('app', []);

angular.module('app').controller('testCtrl', function($scope) {
    $scope.jobs =[{
        title: 'Sales Person',
        description: 'sales'
    }, {
        title: 'Accountant',
        description: 'you will use the keyboard'
    }]
});