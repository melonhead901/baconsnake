_ = require('lodash')
Bacon = require('baconjs')

{Position} = require('./position.ts')
{Direction} = require('./direction.ts')
{Keys} = require('./inputs.ts')

# Returns a stream or property of snake head positions
snakeHeadPosition = (initialSnakeHeadPosition, keyPresses) ->
  equalTo = (expected) ->
    return (actual) -> actual == expected

  ups = keyPresses.filter(equalTo(Keys.UP))

  headPosition = ups.scan initialSnakeHeadPosition, (headPosition, upKeyPress) ->
    return headPosition.advance(Direction.up())

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