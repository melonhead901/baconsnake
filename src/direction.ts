/// <reference path="../typings/tsd.d.ts" />

import { Position } from './position.ts'

export class Direction {
    constructor(private direction: Position) {}

    public static up(): Direction {
        return Direction.fromComponents(0, -1)
    }

    public static down(): Direction {
        return Direction.fromComponents(0, 1)
    }

    public static left(): Direction {
        return Direction.fromComponents(0, -1)
    }

    public static right(): Direction {
        return Direction.fromComponents(-1, 0)
    }

    public static fromComponents(x: number, y: number): Direction {
        return new Direction(Position.at(x, y));
    }

    turnRight(): Direction {
        return Direction.fromComponents(this.direction.y, -this.direction.x);
    }

    turnLeft(): Direction {
        return Direction.fromComponents(-this.direction.y, this.direction.x);
    }

    asVector(): Position{
        return this.direction;
    }
}