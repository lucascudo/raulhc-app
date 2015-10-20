angular.module("starter.services", [ "ngResource" ])

.factory("ComponentFactory", function () {
    return {
        getDatepicker: function (callback) {
            return {
              titleLabel: 'Selecione uma data',
              todayLabel: 'Hoje',
              closeLabel: 'Fechar',
              setLabel: 'Aplicar',
              weekDaysList: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
              monthList: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
              callback: callback
            }
        }
    };
})

.factory("RaulFactory", function ($http, $resource) {
    var baseUrl = "http://raulhc.cc/";
    return {
        getAgenda: function (data, successCallback, errorCallback) {
            return $resource(baseUrl, {}, {
                getAgendaFromRaulWS: {
                    url: baseUrl + "/Agenda/JSON?data=:date",
                    params: { date: "@date" },
                    method: "GET"
                }
            }).getAgendaFromRaulWS(data, function (agenda) {
                var needle = "Doc.Sede#ComoChegar";
                for (var i = 0; i < agenda.eventos.length; ++i) {
                    if (agenda.eventos[i].endereco.indexOf(needle) > -1) {
                        agenda.eventos[i].enderecoUrl = "http://raulhc.cc/Doc/Sede#ComoChegar";
                        agenda.eventos[i].endereco = agenda.eventos[i].endereco
                            .replace(needle, "").replace("n&ordm;", "");
                    }
                }
                agenda.eventos = agenda.eventos.reverse();
                successCallback(agenda);
            }, errorCallback);
        },
        getTemGente: function (successCallback, errorCallback) { 
            return $http({
                method: "GET",
                url: baseUrl + "/bin/tem-gente?type=plain"
            }).then(successCallback, errorCallback);
        }
    }
});