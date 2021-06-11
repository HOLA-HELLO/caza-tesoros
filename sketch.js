var path,boy,cash,diamonds,jwellery,sword, end;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg, endImg;
var felicidad = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Estados del Juego
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("money.png");
  diamondsImg = loadImage("regalo.png");
  jwelleryImg = loadImage("corazon.png");
  swordImg = loadImage("bomba.png");
  endImg = loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Fondo en movimiento
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//crear el niño que corre
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.setCollider("circle",0,0,750);
boy.debug = true;

end = createSprite(200,200);
end.addAnimation("ending", endImg);
end.visible = false;

  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //código para reiniciar el fondo
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
     felicidad=felicidad+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      felicidad=felicidad+100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
     felicidad=felicidad+150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
       swordGroup.destroyEach();
       end.visible = true;
       gameState = END;
        
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("felicidad: "+ felicidad,150,30);
  }

  
  if(gameState==END){
    
    jwelleryG.setVelocityXEach(0);
    jwelleryG.setLifetimeEach(-1);
    diamondsG.setVelocityXEach(0);
    diamondsG.setLifetimeEach(-1);
    cashG.setVelocityXEach(0);
    cashG.setLifetimeEach(-1);
    swordGroup.setVelocityXEach(0);
    swordGroup.setLifetimeEach(-1);
    
  }
  
}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.velocityY = 3;
  cash.lifetime = 250;
  cashG.add(cash);
  cash.scale = 0.8;
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.velocityY = 3;
  diamonds.lifetime = 250;
  diamondsG.add(diamonds);
  diamonds.scale = 0.8;
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.velocityY = 3;
  jwellery.lifetime = 250;
  jwelleryG.add(jwellery);
  jwellery.scale = 0.8;
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.velocityY = 3;
  sword.lifetime = 250;
  swordGroup.add(sword);
  sword.scale = 0.8;
  }
}