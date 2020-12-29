var towerImg,tower,doorImg,door,doorsGroup;
var climber,climberImg,climbersGroup;
var ghostImg,ghost;
var invisibleBlockGroup, invisibleBlock;
var spookySound;
var PLAY=1;
var END=0;
var gameState="start";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300,100,100);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  ghost = createSprite(300,300,15,30);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
  
  climbersGroup = new Group();
  doorsGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background(0);
  if(gameState==="start"){
    ghost.velocityX=0;
    ghost.velocityY=0;
    
    tower.velocityY=1;
    stroke("red");
    fill("blue");
    textSize(30);
    text("Press 'space' to start", 200,250)
    
    if(keyDown("space") && gameState==="start"){
      gameState="PLAY";
      ghost.velocityY=-10;
    }
    
  }
  if(gameState==="PLAY") {
    
    if(keyDown("left")){
      ghost.x=ghost.x-4;
    }
    if(keyDown("right")){
      ghost.x=ghost.x+4;
    }
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
  ghost.velocityY=ghost.velocityY+0.8;
    spawnDoors();
    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
      
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      gameState="END";
      ghost.destroy();
      
    }
   
    drawSprites();
  }
  
  if (gameState === "END"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  
  if (tower.y>400){
    tower.y=300;
  }
  
   
  
}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = false;
    invisibleBlock.visible=false
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}