angular.module('starter.filters', ['ngSanitize'])

.filter('checkRaulAddress', function() {
	return function(input) {
		var needle = "Doc.Sede#ComoChegar";
		var link = "<a href= \"#\" ng-click=\"goOutside('http://raulhc.cc/Doc/Sede#ComoChegar')\">";
		return (input.indexOf(needle) > -1)
			? input.replace(needle, link) + "</a>"
			: input;
	};
});