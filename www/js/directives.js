angular.module('starter.directives', [])

.directive('myPlayer', function () {
  return function (scope, element, attrs) {
  	element.bind('click', function() {
	 	var buttons = document.querySelectorAll(".my-player");
		for (var i = 0; i < buttons.length; i++) {
			if (buttons[i].classList.contains("hide")) {
				buttons[i].classList.remove("hide");
			} else {
				buttons[i].classList.add("hide");
			}
		}
	});
  };
});