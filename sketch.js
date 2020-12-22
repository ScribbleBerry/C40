var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var car1, car2, car3, car4, cars;
var car1Img, car2Img, car3Img, car4Img, trackImg;
var finishedPlayers = 0; 
var reachedFinishPoint;
var form, player, game;
var silverMedal, goldMedal, bronzeMedal;

function preload(){
  car1Img = loadImage("Images/car1.png");
  car2Img = loadImage("Images/car2.png");
  car3Img = loadImage("Images/car3.png");
  car4Img = loadImage("Images/car4.png");
  trackImg = loadImage("Images/track.jpg");
  goldMedal = loadImage("Images/gold.png");
  silverMedal = loadImage("Images/silver.png");
  bronzeMedal = loadImage("Images/bronze.png"); 
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight - 30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

}


function draw(){
  if(playerCount === 4 && finishedPlayers == 0){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(finishedPlayers == 4){
    game.update(2);
  }
  if(gameState == 2){
    game.displayRank();
  }
}
