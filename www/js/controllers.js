angular.module('starter.controllers', [ 'ionic-datepicker' ])

.controller('AgendaCtrl', function ($ionicLoading, $rootScope, $scope, ComponentFactory, RaulWSFactory) {
    var loadAgenda = function (date) {
        $scope.datepickerObject.inputDate = date;
        date = date.getUTCFullYear() + '-' + ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' + ('00' + date.getUTCDate()).slice(-2);
        $ionicLoading.show({ template: 'loading' });
        RaulWSFactory.getAgenda({ "date": date }, function (agenda) {
			var needle = "Doc.Sede#ComoChegar";
            for (var i = 0; i < agenda.eventos.length; ++i) {
                if (agenda.eventos[i].endereco.indexOf(needle) > -1) {
                    agenda.eventos[i].endereco = agenda.eventos[i].endereco.replace(needle, "");
                    agenda.eventos[i].endereco = agenda.eventos[i].endereco.replace("n&ordm;", "Nº");
                    agenda.eventos[i].enderecoUrl = "http://raulhc.cc/Doc/Sede#ComoChegar";
                }
            }
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

.controller('TemGenteCtrl', function ($ionicLoading, $scope, RaulWSFactory) {
    $ionicLoading.show({ template: 'loading' });
    RaulWSFactory.getTemGente(function (res) {
        if (res && res.fechaEm && res.numPess) {
            function two(n) { return n<10 ? '0'+n : n }
            var now = new Date();
            var mOffset = now.getTimezoneOffset() % 60;
            var hOffset = (now.getTimezoneOffset()-mOffset) / 60;
            var fecha = new Date(res.fechaEm+'-'+two(hOffset)+':'+two(mOffset));
            fecha.setMinutes( fecha.getMinutes() - fecha.getTimezoneOffset() );
            var left = new Date(fecha -now);
            res.fechaEm = two(left.getUTCHours() - 3)+':'+two(left.getUTCMinutes())+':'+two(left.getUTCSeconds());
            $scope.temGente = { fechaEm: res.fechaEm, numPess: res.numPess, numPessArray: new Array(res.fechaEm) };
        } else {
            $scope.temGente = { numPess: 0 };
        }
        $ionicLoading.hide();
    }, function (error) {
        console.log(error);
        $scope.temGente = { numPess: 0 };
        $ionicLoading.hide();
    });
})

.controller('RaulCtrl', function ($scope, MediaSrv) {
	MediaSrv.loadMedia('audio/2015-06-10-Nelson-Pretto-Conexoes-Raul-Hacker-Club.mp3').then(function(media){
		$scope.media = media;
	});
});
