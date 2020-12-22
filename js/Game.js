class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100, 200);
    car1.addImage(car1Img);
    car2 = createSprite(300, 200);
    car2.addImage(car2Img);
    car3 = createSprite(500, 200);
    car3.addImage(car3Img);
    car4 = createSprite(700, 200);
    car4.addImage(car4Img);

    cars = [car1, car2, car3, car4];
    reachedFinishPoint = false;
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getFinishedPlayers();
    if(allPlayers !== undefined){
      background(90);
      image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
      //var display_position = 130;
      var index = 0; 
      var x = 190;
      var y; 
      for(var plr in allPlayers){
        index = index + 1;
        x = x + 230;
        y = displayHeight - allPlayers[plr].distance;
        cars[index - 1].x = x; 
        cars[index - 1].y = y;
        if(index == player.index){
          fill("red")
          stroke(10);
          ellipse(x, y, 60, 60);
          camera.position.x = displayWidth/2; 
          camera.position.y = cars[index - 1].y; 
        }
        //display_position+=20;
        textSize(25);
        textAlign(CENTER);
        text(allPlayers[plr].name, cars[index - 1].x, cars[index - 1].y + 80);
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null && reachedFinishPoint == false){
      player.distance +=50
      player.update();
    }

    if(player.distance > 4200 && reachedFinishPoint == false){
      Player.updateFinishedPlayers();
      player.rank = finishedPlayers; 
      player.update();
      reachedFinishPoint = true; 
    }

    drawSprites();
  }

  displayRank(){
    camera.position.x = 0;
    camera.position.y = 0;
    Player.getPlayerInfo();
    imageMode(CENTER);
    image(goldMedal, 0, -100, 250, 300);
    image(silverMedal, displayWidth / 4, displayHeight / 10 - 100, 225, 270);
    image(bronzeMedal, - displayWidth / 4, displayHeight / 9 - 100, 200, 240);
    
    textSize(30);
    textAlign(CENTER); 

    for(var plr in allPlayers){
      if(allPlayers[plr].rank == 1){
        text("1st : " + allPlayers[plr].name, 0, 85);
      }
      else if(allPlayers[plr].rank == 2){
        text("2nd : " + allPlayers[plr].name, displayWidth / 4, displayHeight / 10 + 75);
      }
      else if(allPlayers[plr].rank == 3){
        text("3rd : " + allPlayers[plr].name, - displayWidth / 4, displayHeight / 9 + 80);
      }
      else{
        text("Better Luck Next Time :) " + allPlayers[plr].name, displayWidth / 2, 100);
      }
    }
  }
}
