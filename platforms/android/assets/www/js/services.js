angular.module('starter.services', [ 'ngResource' ])

.factory('RaulFactory', function($resource) {
    var baseUrl = "http://raulhc.cc/";
    return $resource("RaulHC WebService", {}, {
	getAgenda: {
            url: baseUrl + "/Agenda/JSON?data=:date",
            params: { date: "@date" },
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept-Charset": "UTF-8"
            }
        },
        getTemGente: {
            url: baseUrl + "tem-gente?type=json",
			method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept-Charset": "UTF-8"
            }
        }
    });
});