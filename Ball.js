const INITIAL_VELOCITY = .025
const VELOCITY_INCREASE = 0.000005

export default class ball {
    constructor(ballElem) {
        this.ballElem = ballElem
        this.reset()
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--x')) // what this does: (1) gets the style (css) for the passed element. (2) gets the value of the variable '--x'. (3) returns the float value of '--x'
    }

    set x(value) {
        this.ballElem.style.setProperty('--x', value)
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--y'))
    }

    set y(value) {
        this.ballElem.style.setProperty('--y', value)
    }

    rect() {
        return this.ballElem.getBoundingClientRect()
    }

    reset() {
        this.x = 50
        this.y = 50
        this.direction = { x: 0} // think of the direction as a vector

        while (
            Math.abs(this.direction.x) <= .2 || 
            Math.abs(this.direction.x) >= .9
        ) { // while ball is not moving ~basically~ only up and down OR side to side, execute...
            const heading = randomNumberBetween( 0, 2 * Math.PI) // random radian
            this.direction = { x: Math.cos(heading), y: Math.sin(heading)} // gives x and y coordinates of given random radian (think unit circle) to get a unit vector of lenght 1 (again, think unit circle)
        }
        this.velocity = INITIAL_VELOCITY
    }

    update(delta, paddleRects) {
        this.x += this.direction.x * this.velocity * delta // call get then set of function and execute them with given value (in this case, getting a random vector with the direction mutplied by the speed the ball moves at and delta, which represents the delay between the animation in our frames)
        this.y += this.direction.y * this.velocity * delta 
        this.velocity += VELOCITY_INCREASE * delta // increase velocity slowly but surely
        const rect = this.rect()


        if (rect.bottom >= window.innerHeight || rect.top <= 0) { // if y rect's corrdinates are greater or less than the window height then...
            this.direction.y *= -1 // reflect y direction
        }

        if (paddleRects.some(r => isCollision(r, rect))) { // if any of the of the paddle rects collide with r (aka the ball)...
            this.direction.x *= -1 // reflect x direction
        }
    }
}

function randomNumberBetween(min, max) {
    return Math.random() * (max-min) + min // takes random number and scales it to be within the (max-min) range. Then adds the minimum to make sure it's at least the minimum value
}

function isCollision (rect1, rect2) {
    return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
    )
}