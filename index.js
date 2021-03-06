/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = [];
const START = document.getElementById('start')

var gameInterval = null;

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
 
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge =positionToInteger(DODGER.style.left)+40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = positionToInteger(rock.style.left)+20;


    if (((rockLeftEdge<dodgerLeftEdge)&&(rockRightEdge<dodgerLeftEdge))||((rockLeftEdge>dodgerRightEdge)&&(rockRightEdge>dodgerRightEdge))){return false} else{return true}
    //if both rock edges are to the left of the dodgers left edge, or to the right of the right edge no collision, else collision 
    }
  
}
  

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top
GAME.appendChild(rock);
  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */


  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
if(checkCollision(rock)){endGame();}
if(top>400){GAME.removeChild(rock);ROCKS.shift();}
else{rock.style.top=`${top +=2}px`;
window.requestAnimationFrame(moveRock);}}

moveRock();
  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  for(var i=0;i<ROCKS.length;i++){ROCKS[i].remove();}
  window.removeEventListener('keydown',moveDodger);
  alert("YOU LOSE!");
}

function moveDodger(e) {
if(e.which==37)
{e.preventDefault();e.stopPropagation();moveDodgerLeft();} if(e.which==39){e.preventDefault();e.stopPropagation();moveDodgerRight();}
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
}

function moveDodgerLeft() {
 if(positionToInteger(dodger.style.left)>1) { 
dodger.style.left=`${positionToInteger(dodger.style.left)-4}px`;
window.requestAnimationFrame(moveDodgerLeft);}
}

function moveDodgerRight() {

  window.requestAnimationFrame(function(){
    if (positionToInteger(dodger.style.left)<360){
      dodger.style.left=`${positionToInteger(dodger.style.left)+4}px`;
      
    }
  });

}
 
/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
