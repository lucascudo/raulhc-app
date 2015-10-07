angular.module('starter.services', [ 'ngResource' ])

.factory('RaulFactory', function ($resource) {
    var baseUrl = "http://raulhc.cc/";
    return {
        ws: $resource("RaulHC WebService", {}, {
            getAgenda: {
                url: baseUrl + "/Agenda/JSON?data=:date",
                params: { date: "@date" },
                method: "GET"
            },
            getTemGente: {
                url: baseUrl + "tem-gente?type=json",
                method: "GET"
            },
        }),
        getHelpAppeal: function (callback) {
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
            callback(phrases.pop());
        }
    }
});