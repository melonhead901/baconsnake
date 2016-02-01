var _ = require('lodash');
var Bacon = require('baconjs');

var Position = require('./position.ts').Position;
var Direction = require('./direction.ts').Direction;
var Keys = require('./inputs.ts').Keys;

var equalTo = function(expectedValue) {
  return function(value) {
    return value === expectedValue;
  };
};

function snakeHeadPosition(initialSnakeHeadPosition, keyPresses) {
  var leftTurns = keyPresses.filter(equalTo(Keys.LEFT)).map(function() {
    return Direction.turnLeft;
  });

  var rightTurns = keyPresses.filter(equalTo(Keys.RIGHT)).map(function() {
    return Direction.turnRight;
  });

  var turns = leftTurns.merge(rightTurns);

  var directionFacing = turns.scan(Direction.up(), function(lastDirection, turn) {
    return turn(lastDirection);
  });

  var forwardTick = keyPresses.filter(equalTo(Keys.UP));

  var directionFacingOnForwardTick = directionFacing.sampledBy(forwardTick);

  var headPosition = directionFacingOnForwardTick.scan(initialSnakeHeadPosition, function(currentPosition, direction) {
    return currentPosition.advance(direction);
  });

  return headPosition;
}

function snake(width, height, keyPresses) {
  var initialPosition = Position.at(3, 5);
  var headPosition = snakeHeadPosition(initialPosition, keyPresses);

  var snakeRenderData = Bacon.combineTemplate({
    head: headPosition,
    tail: Bacon.constant([]),
    food: null
  });
  return snakeRenderData;
}

module.exports = {
  snake: snake
};