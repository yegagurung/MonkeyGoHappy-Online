var monkey,monkey_running;
var jungle, invisibleGround;

var bananasGroup, bananaImage;
var obstaclesGroup,obstaclesImg;
var score;

var PLAY=1;
var END=0;
var gameState=PLAY;
function preload(){
monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  
  
  bananaImage = loadImage("banana.png");
  
  obstaclesImg = loadImage("stone.png");
}

function setup() {
  createCanvas(600, 200);
  

  monkey= createSprite(50,180,20,50);
  
  monkey.addAnimation("running", monkey_running);
  
  monkey.scale = 0.07;
  
  jungle= createSprite(200,180,400,400);
  
  jungle.x = jungle.width /2;
  jungle.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  bananasGroup = new Group();
  obstaclesGroup = new Group();
  score = 0;
}

function draw() {
  background(180);
  score = score + Math.round(getFrameRate()/60);
  
  if(gameState===PLAY){
     
      if(keyDown("space")) {
            monkey.velocityY = -10;
      }

  
  if (jungle.x < 0){
    jungle.x = jungle.width/2;
  }
      
  if(bananasGroup.isTouching(monkey)){
     bananasGroup.destroyEach();
     monkey.scale=monkey.scale+0.03
     }
   if(obstaclesGroup.isTouching(monkey)){
     //bananasGroup.destroyEach();
     monkey.scale=monkey.scale-0.03
     }
  if(monkey.scale<0.05){
      gameState=END;
     }
     monkey.velocityY = monkey.velocityY + 0.8;
     
    
  spawnbananas();
  spawnObstacles(); 
        
  }
 else if(gameState===END){
         jungle.velocityX=0;
         monkey.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
  bananasGroup.setVelocityXEach(0);
   obstaclesGroup.setLifetimeEach(-1);
   bananasGroup.setLifetimeEach(-1);
   
   
 }
  text("Score: "+ score, 500,50);
  

  
  monkey.collide(invisibleGround);
 
  drawSprites();
}

function spawnbananas() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananasGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
   obstacle.addImage(obstaclesImg);
    obstacle.scale = 0.20;
    obstacle.setCollider("rectangle",0,0,10,40,90);
    //assign scale and lifetime to the obstacle           
    //obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}