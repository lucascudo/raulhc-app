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

.factory("RaulWSFactory", function ($http, $resource) {
    var baseUrl = "http://raulhc.cc/";
    return $resource(baseUrl, {}, {
        getAgenda: {
            url: baseUrl + "/Agenda/JSON?data=:date",
            params: { date: "@date" },
            method: "GET"
        },
        getTemGente: {
            url: baseUrl + "/bin/tem-gente?type=json",
            method: "GET"
        }
        
    });
});