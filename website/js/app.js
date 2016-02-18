$(document).foundation();

$(function() {
  $("svg").slashesAndCircles({
    elements: $('.slashes, .circles'),
    avoid: [],
    allowAnimation: false
  });
});