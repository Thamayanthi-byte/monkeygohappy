  var PLAY = 1;
  var END = 0;

  var gameState = 1;

  var obstacleGroup , bananaGroup
  var background,backgroundImage

  var monkey , monkey_running
  var banana ,bananaImage, obstacle, obstacleImage

  var bananaGroup
  var obstacleGroup

  var score = 0;
  var survivalTime = 0;

  var invisibleGround;

  function preload(){


  monkey_running =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");
    backgroundImage = loadImage ("download (2).jfif")
  }



  function setup() {
    createCanvas(670,400)

    background = createSprite (10, 200,20,20)
    background.addImage(backgroundImage)
    background.scale = 4.5;
    background.velocityX = -4;

    background.x = background.width /2;

    monkey = createSprite (80,325,20,20);
    monkey.addAnimation ("running",monkey_running);
    monkey.scale = 0.1

    invisibleGround = createSprite(390,350,1500,10);
    invisibleGround.visible = false;

    obstacleGroup = new Group();
    bananaGroup = new Group ();

    monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
    monkey.debug = true

  }

  function draw() {
    //background ("white")
     background.velocityX = -4;

    if (background.x < 0){
        background.x = background.width/2;
      }

   if (gameState === PLAY){
      background.velocityX = -4


    spawnbanana();
    spawnobstacles();

    if (keyDown ("space")&&monkey.y>100) {
      monkey.velocityY = -12;

  } 
   
     monkey.velocityY=monkey.velocityY+1
     
     if (monkey.isTouching(bananaGroup)){
       bananaGroup.destroyEach();
       score = score + 1
     }

  if (monkey.isTouching(obstacleGroup)){
    gameState = END ;
  }
   }
     if(gameState===END){
    background.velocityX = 0;

    survivalTime = 0;
       score = 0;

    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);


    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

   }

  monkey.collide(invisibleGround);

      drawSprites();

    text("X"+mouseX+","+"Y"+mouseY,mouseX,mouseY);
    
    stroke("white")
    textSize(20)
    fill("white")
    text("Score :"+score,500,50)

    stroke("white")
    textSize(40)
    fill("white")
    survivalTime=Math.ceil(frameCount/frameRate())
    text("Survival Time  :"+survivalTime,70,50)
    //text("X"+mouseX+","+"Y"+mouseY,mouseX,mouseY);

  }

  function spawnobstacles(){
   if (frameCount % 60 === 0){
     var obstacle = createSprite(600,340,10,40);

     obstacle.addImage(obstacleImage)
  obstacle.scale=0.2;


     obstacle.velocityX = -6;
     obstacle.lifetime = 300;

     obstacleGroup.add(obstacle)
   }
  }

  function spawnbanana(){

      if (frameCount % 60 === 0) {
    banana = createSprite(600,120,40,10);
      banana.y = Math.round(random(80,120));
      banana.addImage(bananaImage)
      banana.scale = 0.1;
      banana.velocityX = -3;

      //assign lifetime to the variable
      banana.lifetime = 200;
      bananaGroup.add(banana);
      }

  }