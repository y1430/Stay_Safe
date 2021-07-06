var PLAY = 1;
var END = 0;
var gameState = PLAY;

var life=5;
var Player, player_image, ground, background_image;
var obstacle1,obstacle1_image,obstacle2,obstacle2_image,obstacle3,obstacle3_image,obstacle4,obstacle4_image ,obstaclesGroup;
var score;
var  life_image,lifeAdd,lifeAdd_image;
var wall;
var restart, gameover_image;

function preload(){
  background_image=loadImage("background.png");
  player_image=loadImage("Player.png");
  obstacle1_image=loadImage("obstacle.png");
  obstacle2_image=loadImage("obstacle.png");
  obstacle3_image=loadImage("obstacle.png");
  obstacle4_image=loadImage("obstacle.png");
  life_image=loadImage("life.png");
  lifeAdd_image=loadImage("life+.png");
  gameover_image=loadImage("Mask Button.png");
}


function setup() {

  createCanvas(900,600);
  

  //creating background and adding image to it 
 ground=createSprite(500,300,600,1200);
 ground.addImage(background_image);
 ground.scale=1.2;
 ground.x = ground.width /2;
 ground.velocityX=-3;
 
 //creating player and adding image 
 Player=createSprite(60,400,500,500);
 Player.addImage(player_image);
 Player.scale=0.2;

 wall=createSprite(55,100,100,1200);
 wall.visible=false;

 restart=createSprite(300,300);
 restart.addImage(gameover_image);
restart.visible=false;

//creating germs/obstacles and adding image to them
/*obstacle1=createSprite(300,300,5,5);
obstacle1.addImage(obstacle1_image);
obstacle1.scale=0.3;

obstacle2=createSprite(450,500,5,5);
obstacle2.addImage(obstacle2_image);
obstacle2.scale=0.1;

obstacle3=createSprite(480,300,5,5);
obstacle3.addImage(obstacle3_image);
obstacle3.scale=0.3;

obstacle4=createSprite(300,300,5,5);
obstacle4.addImage(obstacle4_image);
obstacle4.scale=0.3;*/

obstaclesGroup=new Group();
livesGroup=new Group();
score=0;
}


function draw() {
  background("seagreen");  

if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
 //Player.velocityX=2;

 if (keyDown("UP_ARROW")){
  Player.y=Player.y-3;
  //console.log("UP_ARROW");
}

if (keyDown("DOWN_ARROW")){
  Player.y=Player.y+3;
 }
 
if (Player.isTouching(livesGroup)){
life++;
livesGroup.destroyEach();
}

for (var i=0; i<life; i++){
var l=createSprite(700+(i*20),50);
l.addImage(life_image);
l.scale=0.1;
}


 if (gameState===PLAY){
  //gameOver.visible=false;
//restart.visible=false;
  //  zombie.y=girl.y;
 //score = score + Math.round(getFrameRate()/60);

  spawnObstacles();
 spawnLives();

 
//ground.velocityX = -(4 + 3* score/100);
   
 if (ground.x < 0){
    ground.x = ground.width/2;
  }

  // if(score>0 && score%100 === 0){
   //  checkPointSound.play() 
  //}



if (Player.isTouching(obstaclesGroup)){
 // gameState=END;
  // dieSound.play();
  obstaclesGroup.destroyEach();
}


if (life===0 || obstaclesGroup.isTouching(wall)) {
  gameState=END;
}

drawSprites();

}

else if (gameState===END){
  obstaclesGroup.destroyEach();
  livesGroup.destroyEach();
  noStroke();
  fill("black");
  textSize(40);
  text("GAME OVER" , 300,300);

  if(mousePressedOver(reset)) {
    reset();
}
  
 
}

// function to spwn obstacles randomly 
function spawnObstacles() {
 /* if (obstaclesGroup.x<0){
    life++;
    console.log(life);
  }*/
  
  if (frameCount % 60 === 0){
  var obstacle = createSprite(900,450,10,40);
  obstacle.velocityX = -6 ;//+ score/100);
  
   //generate random obstacles
  var rand = Math.round(random(20,580));
  obstacle.y=rand;
   obstacle.addImage(obstacle1_image);
  obstacle.scale=random(0.1,0.3);
    obstaclesGroup.add(obstacle); 
     /*.add(obstacle2);
     obstaclesGroup.add(obstacle3);
     obstaclesGroup.add(obstacle4);*/
  // obstacle.debug=false;
obstacle.setCollider("circle",0,0,30);
//obstacle.debug=true;
  }
    
}

function spawnLives() {
  if (frameCount % 600 === 0){
    var life= createSprite(900,450,10,40);
    life.velocityX = -6 ;//+ score/100);
    
     //generate random obstacles
    var rand = Math.round(random(20,580));
  life.y=rand;
    life.addImage(lifeAdd_image);
  life.scale=random(0.1,0.3);
  
    livesGroup.add(life); 
    /* obstaclesGroup.add(obstacle1); 
       obstaclesGroup.add(obstacle2);
       obstaclesGroup.add(obstacle3);
       obstaclesGroup.add(obstacle4);*/
    // obstacle.debug=false;
  //obstaclesGroup.setCollider("circle",0,0,1);
    }
}
 
function reset(){
  gameState=PLAY;
restart.visible=false;
//restart.visible=false;
//girl.changeAnimation("girl_running",girl_running);
//  obstaclesGroup.destroyEach();
  score=0;
 // zombie.x=50;
 spawnObstacles();
 
}
    

