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
            $resource(baseUrl, {}, {
                getAgenda: {
                    url: baseUrl + "/Agenda/JSON?data=:date",
                    params: { date: "@date" },
                    method: "GET"
                }
            }).getAgenda(data, function (agenda) {
                var needle = "Doc.Sede#ComoChegar";
                for (var i = 0; i < agenda.eventos.length; ++i) {
                    if (agenda.eventos[i].endereco.indexOf(needle) > -1) {
                        agenda.eventos[i].endereco = agenda.eventos[i].endereco.replace(needle, "");
                        agenda.eventos[i].enderecoUrl = "http://raulhc.cc/Doc/Sede#ComoChegar";
                    }
                }
                agenda.eventos = agenda.eventos.reverse();
                successCallback(agenda);
            }, errorCallback);
        },
        getTemGente: function (successCallback, errorCallback) { 
            $http({
                method: "GET",
                url: baseUrl + "/bin/tem-gente?type=plain"
            }).then(successCallback, errorCallback);
        },
        getHelpAppeal: function () {
            var phrases = [
                "Sem a sua ajuda muitos Padawans não chegarão a se tornar Jedis.",
                "Com a sua ajuda teremos um lugar para virar a noite hackeando e um sofá para dormir até o meio dia.",
                "Manter um espaço aberto e livre para aprendizagem custa grana.",
                "Ajude a manter esse espaço aberto. Doe um pequeno valor mensal. A autonomia tecnológica do futuro agradece.",
                "Com a sua ajuda poderemos continuar hackeando às 11:40 da noite de sexta-feira.",
                "Com a sua ajuda mantemos um lugar para tomar choque e facilitadores para dizer “Eu te disse” (Mães não deixam fazer isso em casa)."
            ];
            var limit = Math.floor(Math.random() * 1000) + 100;
            for (var i = 0; i < limit; ++i) {
                phrases.sort(function (a,b) {
                    return( parseInt( Math.random()*10 ) %2 );
                });
            }
            return phrases.pop();
        }
    }
});