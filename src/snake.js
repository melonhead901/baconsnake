var _ = require('lodash');
var Bacon = require('baconjs');

var Position = require('./position.ts').Position;
var Direction = require('./direction.ts').Direction;
var Keys = require('./inputs.ts').Keys;

var equalTo = function(expected) {
  return function(actual) {
    return actual === expected;
  };
};

function snakeHeadPosition(initialSnakeHeadPosition, keyPresses) {
  var ups = keyPresses.filter(equalTo(Keys.UP));

  var headPosition = ups.scan(initialSnakeHeadPosition, function(headPosition, upKeyPress) {
    return headPosition.advance(Direction.up());
  });

  return headPosition;
};

function snake(width, height, keyPresses) {
  var initialPosition = Position.at(3, 5);
  var headPosition = snakeHeadPosition(initialPosition, keyPresses);

  var snakeRenderData = Bacon.combineTemplate({
    head: headPosition,
    tail: Bacon.constant([]),
    food: null
  });

  return snakeRenderData;
};

module.exports = {
  snake: snake
};