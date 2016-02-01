_ = require('lodash')
Bacon = require('baconjs')

{Position} = require('./position.ts')
{Direction} = require('./direction.ts')
{Keys} = require('./inputs.ts')

# Returns a stream or property of snake head positions
snakeHeadPosition = (initialSnakeHeadPosition, keyPresses) ->
  equalTo = (expectedValue) ->
    return (value) -> value == expectedValue

  leftTurns = keyPresses.filter(equalTo(Keys.LEFT)).map(-> Direction.turnLeft)
  rightTurns = keyPresses.filter(equalTo(Keys.RIGHT)).map(-> Direction.turnRight)

  turns = leftTurns.merge(rightTurns)

  directionFacing = turns.scan Direction.up(), (lastDirection, turn) ->
    return turn(lastDirection)

  forwardTick = keyPresses.filter(equalTo(Keys.UP))

  directionFacingOnForwardTick = directionFacing.sampledBy(forwardTick)

  headPosition =
    directionFacingOnForwardTick.scan initialSnakeHeadPosition, (currentPosition, direction) ->
      return currentPosition.advance(direction)

  return headPosition


snake = (width, height, keyPresses) ->
  initialPosition = Position.at(3, 5)
  headPosition = snakeHeadPosition(initialPosition, keyPresses)

  snakeRenderData = Bacon.combineTemplate
    head: headPosition # (Stream/property of) a vector
    tail: Bacon.constant([]) # (Steam/property of) a list of vectors, can include head
    food: null # (Stream/property of) a Vector, possibly null

  return snakeRenderData

module.exports = {snake}