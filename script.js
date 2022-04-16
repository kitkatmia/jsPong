import Ball from './Ball.js'
import Paddle from './Paddle.js'

const ball = new Ball(document.getElementById("ball")) // makes the ball id = ballElem in Ball.js
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById('computer-paddle'))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")

// Update loop - for every frame that happens, function is called and updates all positions
let lastTime

function update(time) {
    // Only run update code if you had a last time 
    if (lastTime != null) {
        const delta = time - lastTime
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue')) // get current hue as a float

        document.documentElement.style.setProperty('--hue', hue + delta * 0.01)
        
        if (isLose()) handleLose() // same thing as if (isLose()) {handleLose()}
    }
    lastTime = time
    // console.log(time)
    window.requestAnimationFrame(update) // runs every frame

}

function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
    const rect = ball.rect()
    if (rect.right >= window.innerWidth) { // if ball is outside the viewer's screen on the right side...
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1 // get the current player score, convert it to an integer, and add one
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }
    ball.reset()
    computerPaddle.reset()
}

document.addEventListener('mousemove', e => { // when mouse moves, set playerPaddle css postion to the y-coordinate that the mouse moved to
    // divide by window.innherHeight and multiply by 100 to get the percentage (which is what the css is written in terms of)
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update) // everytime you can change what's on the screen, this function is called