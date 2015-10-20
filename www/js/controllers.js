angular.module('starter.controllers', [ 'ionic-datepicker' ])

.controller('AgendaCtrl', function ($ionicLoading, $rootScope, $scope, ComponentFactory, RaulFactory) {
    var loadAgenda = function (date) {
        $scope.datepickerObject.inputDate = date;
        date = date.getUTCFullYear() + '-' + ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' + ('00' + date.getUTCDate()).slice(-2);
        $ionicLoading.show({ template: 'loading' });
        RaulFactory.getAgenda({ "date": date }, function (agenda) {
            $scope.agenda = agenda;
            $ionicLoading.hide();
        }, function (error) {
            console.log(error);
            $scope.agenda = [];
            $ionicLoading.hide();
        });
    };
    
    $scope.datepickerObject = ComponentFactory.getDatepicker(function callback(date) {
        if (typeof date !== "undefined") {
            loadAgenda(date);
        }
    });
    
    loadAgenda(new Date());
})

.controller('ChatCtrl', function () {
    window.open("https://webchat.freenode.net/?channels=raulhc", "_blank");
})

.controller('ContatoCtrl', function ($rootScope) {
    $rootScope.goOutside("mailto:contato@raulhc.cc");
})

.controller('TemGenteCtrl', function ($ionicLoading, $scope, RaulFactory) {
    $ionicLoading.show({ template: 'loading' });
    RaulFactory.getTemGente(function (res) {
        $scope.temGente = res.data;
        $ionicLoading.hide();
    }, function (error) {
        console.log(error);
        $scope.temGente = "";
        $ionicLoading.hide();
    });
});
