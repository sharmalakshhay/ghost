var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var ibGroup, ib;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.3 
  
  doorsGroup = new Group()
  climbersGroup = new Group()
  ibGroup = new Group()
}

function draw() {

  background(200);
  if (gameState==="play") {
    
  
  if(tower.y > 400){
      tower.y = 300
    }

    if (keyDown("space")) {
      ghost.velocityY = -5
    }
    ghost.velocityY = ghost.velocityY +0.5
  

    if (keyDown("right_arrow")) {
      ghost.x = ghost.x +5
      
    }
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x -5
      
    }

    if (climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }
    if (ibGroup.isTouching(ghost)||ghost.y>600) {
      ghost.destroy()
      gameState = "end"
    }
    spawndoors()
  
    drawSprites()
}
if (gameState==="end") {
  fill ("red")
  text ("GAME OVER",250,250)
}
}
function spawndoors (){
  if(frameCount%240===0){
    var door = createSprite(200,-50)
    var climber = createSprite(200,10)
    var ib = createSprite(200,15)
    ib.width = climber.width
    ib.height = 2

    door.x = Math.round(random(120,400))
    climber.x = door.x
    ib.x = door.x

    door.addImage(doorImg)
    climber.addImage(climberImg)

    door.velocityY = 1
    climber.velocityY = 1
    ib.velocityY = 1

    ghost.depth = door.depth
    ghost.depth+= 1
    door.lifetime = 800
    climber.lifetime = 800
    ib.lifetime = 800

    doorsGroup.add(door)
    climbersGroup.add(climber)
    ibGroup.add(ib) 
  }

  

}

