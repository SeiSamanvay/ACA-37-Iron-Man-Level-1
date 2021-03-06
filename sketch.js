//Making Variables
var bg, backgroundImg;
var score = 0
var gState = "play"

//Preloading Images
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  Iron = loadImage("images/iron.png")
  Stone = loadImage("images/stone.png")
  D = loadImage("images/diamond.png")
  Sp = loadImage("images/spikes.png")
  Re = loadImage("images/restart.png")
}

//For generating Spikes
function genP(){
  Spi = createSprite(500,10,10,10)
  Spi.x = random(100,900)
  Spi.addImage(Sp)
  Spi.scale = 0.5
  Spi.velocityY = 4
  Spi.lifetime = 180
  SpG.add(Spi)
}

//For generating diamonds
function genD(){
  di = createSprite(500,10,10,10)
  di.x = random(100,900)
  di.addImage(D)
  di.scale = 0.4
  di.velocityY = 4
  di.lifetime = 180
  diG.add(di)
}

//For generating stones
function genS(){
  St = createSprite(500,10,10,60)
  St.x = random(100,900)
  St.addImage(Stone)
  St.scale = 0.6
  St.velocityY = 4
  St.lifetime = 180
  StG.add(St)
}

//For Restarting the game
function restart(){
  score =0
  RE .visible = false
  gState = "play"
  StG.destroyEach()
  diG.destroyEach()
  SpG.destroyEach()
  Man.y = 200

}

//Setting all the characters on the canvas
function setup() {
  //Adding the background
  createCanvas(1000,550);
  bg = createSprite(580,300,1000,600);
  bg.addImage(backgroundImg)
  bg.scale = 2

  //Adding th player - Iron Man
  Man = createSprite(500,200,40,40)
  Man.addImage(Iron)
  Man.scale = 0.25

  //Restarting the game
  RE = createSprite(520,310,30,40)
  RE.addImage(Re)
  RE.visible = false

  //All the groups 
  StG = new Group()
  diG = new Group()
  SpG = new Group()
}

//Setting up how the game will function
function draw() {
 if( gState == "play"){
   
   //Repeating the background
   bg.velocityY = 4
   if (bg.y > 600){
      bg.y = 300
   }
 
   //Controlling the player - Iron Man
   if(keyDown("up")){
     Man.velocityY = -6
   }

   if(keyDown("left")){
     Man.x -= 6
   }
   if(keyDown("right")){
     Man.x += 6
   }
   //Slowly increasing gravity
   Man.velocityY += 0.2 

   //Generating the obstacles
   if(frameCount%40 == 0){
     genS()
   }
   if(frameCount%100 == 0){
     genD()
     genP()
   }
  
   //For Iron man to collide and stand on stones 
   for(g = 0; g < StG.length; g+=1){
     h = StG.get(g)
     if(Man.isTouching(h)){
       Man.collide(h)
     }
   }

   //For Iron man to collect coins  
   for(f = 0;f < diG.length;f += 1){
     o = diG.get(f)
     if(Man.isTouching(o)){
       o.destroy()
       score += 1
       o = null
     }
   }

   //For reducing points if hit by Spikes 
   for(j = 0;j < SpG.length;j += 1){
     k = SpG.get(j)
     if(Man.isTouching(k)){
       k.destroy()
       k = null
       score -= 5
     }
   }

   //Conditions for failing the game
   if(score <= -10){
     gState = "stop"
     RE.visible = true
   }
   
   if(Man.y > 560){
     gState = "stop"
     RE.visible = true
   }
  

 //If game state changes
 }
 else{
   bg.velocityY = 0
   Man.velocityY = 0
   Man.velocityX = 0
   StG.setVelocityYEach(0)
   diG.setVelocityYEach(0)
   SpG .setVelocityYEach(0)
   StG.setLifetimeEach(-1)
   diG.setLifetimeEach(-1)
   SpG.setLifetimeEach(-1)
   if(mousePressedOver(RE))
      restart()
   }

   //Drawing all the characters
  drawSprites();

   //To show the score on the screen
     fill("white")
     textSize(20)
     stroke("blue")
     text("Diamonds collected: "+score,15,30)

   if(gState == "stop"){
     filter(GRAY)
     fill("white")
     textSize(50)
     stroke("red")
     text("You Lost ",420,250)     
   }  
}

