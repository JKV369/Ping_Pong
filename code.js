var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["e8e875e4-a841-4b42-a02b-6488958ea70a","bedff16a-e58d-4d47-b3f5-cb777197e667","d5a524bc-e257-425c-be46-ebfb4cadb357","81b7c9cb-ffbd-47ec-b1dd-f395c809c15e","d6675fef-0bda-4bcb-951b-4dc9bbf0c30b"],"propsByKey":{"e8e875e4-a841-4b42-a02b-6488958ea70a":{"name":"Robot","sourceUrl":null,"frameSize":{"x":77,"y":69},"frameCount":1,"looping":true,"frameDelay":4,"version":"uKTIzDhk3xDY9LMvHEu8JPcbv11oTz4O","loadedFromSource":true,"saved":true,"sourceSize":{"x":77,"y":69},"rootRelativePath":"assets/e8e875e4-a841-4b42-a02b-6488958ea70a.png"},"bedff16a-e58d-4d47-b3f5-cb777197e667":{"name":"Player","sourceUrl":null,"frameSize":{"x":54,"y":86},"frameCount":1,"looping":true,"frameDelay":4,"version":"n8vRlSE6fgVYnVz0nevBVPgjUCDZ2vJv","loadedFromSource":true,"saved":true,"sourceSize":{"x":54,"y":86},"rootRelativePath":"assets/bedff16a-e58d-4d47-b3f5-cb777197e667.png"},"d5a524bc-e257-425c-be46-ebfb4cadb357":{"name":"Player_Kick","sourceUrl":null,"frameSize":{"x":73,"y":71},"frameCount":1,"looping":true,"frameDelay":4,"version":"uEJBWqKlvHPLc.CQsndW1AMrtx9PDr.Y","loadedFromSource":true,"saved":true,"sourceSize":{"x":73,"y":71},"rootRelativePath":"assets/d5a524bc-e257-425c-be46-ebfb4cadb357.png"},"81b7c9cb-ffbd-47ec-b1dd-f395c809c15e":{"name":"Player_Fall","sourceUrl":null,"frameSize":{"x":87,"y":50},"frameCount":1,"looping":true,"frameDelay":4,"version":"z_qi3MSmYGvBInEgHaaMhDl7PkHo_KJb","loadedFromSource":true,"saved":true,"sourceSize":{"x":87,"y":50},"rootRelativePath":"assets/81b7c9cb-ffbd-47ec-b1dd-f395c809c15e.png"},"d6675fef-0bda-4bcb-951b-4dc9bbf0c30b":{"name":"Ball","sourceUrl":null,"frameSize":{"x":20,"y":20},"frameCount":1,"looping":true,"frameDelay":4,"version":"GfCpQBceaMXZ9OpGdC2eH1zOIJUoj0dw","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":20,"y":20},"rootRelativePath":"assets/d6675fef-0bda-4bcb-951b-4dc9bbf0c30b.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----


var playerPaddle= createSprite(390,200,10,100);
    playerPaddle.setAnimation("Player");
    var computerPaddle= createSprite(10,200,10,100);
    computerPaddle.setAnimation("Robot");
    var ball= createSprite(200,200,20,20);
    ball.setAnimation("Ball");
   

function draw() {
  background(220);
  
  if (keyDown("up")) {
    playerPaddle.y=playerPaddle.y-10;
  }
  
  if (keyDown("down")) {
    playerPaddle.y=playerPaddle.y+10;
  }
  
  if(keyDown("space"))
  {
     ball.velocityX=2;
     ball.velocityY=3;
  }
  if (ball.isTouching(playerPaddle)){
   playerPaddle.setAnimation("Player_Kick");
  }
  
if   (ball.x<=320 && ball.x>=201){
  playerPaddle.setAnimation("Player");
}

if (ball.x>400){
playerPaddle.setAnimation("Player_Fall");
}
  computerPaddle.y=ball.y;

if(ball.isTouching(playerPaddle) || ball.isTouching(computerPaddle))
  {
    playSound("assets/category_accent/puzzle_game_accent_a_01.mp3");
  }
  drawnet();
  if(ball.x<0 || ball.x>400)
  {
    resetball();
  }
    
  createEdgeSprites();
  
 if(ball.isTouching(topEdge) || ball.isTouching(bottomEdge))
  {
    playSound("assets/category_digital/coin_3.mp3");
  }


  
  
  ball.bounceOff(topEdge);
  ball.bounceOff(bottomEdge);
  ball.bounceOff(computerPaddle);
  ball.bounceOff(playerPaddle);
  playerPaddle.bounceOff(topEdge);
  playerPaddle.bounceOff(bottomEdge);
  computerPaddle.bounceOff(topEdge);
  computerPaddle.bounceOff(bottomEdge);
  drawSprites();
  
}

function drawnet()
{  
  for(var num=0;num<400;num=num+20)
  {
    line(200,num,200,num+10);
  }
}

function resetball()
{
  ball.x=200;
  ball.y=200;
  ball.velocityY=0;
  ball.velocityX=0;
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
