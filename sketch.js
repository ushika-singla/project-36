var dogImg, happyDogImg, dog;
var database;
var foodS, foodStock;
var lastFed, fedTime, foodObj, feed;
var addFood, food1, foodCount, input, milk, milkImg;

function preload() {
  dogImg = loadImage("Images/Dog.png");
  happyDogImg = loadImage("Images/happy dog.png");
  milkImg = loadImage("Images/Milk.png");
  
}

function setup() {
  database = firebase.database();
  createCanvas(1000,300);

  dog = createSprite(650, 250);
  dog.scale = 0.3;
  dog.addImage(dogImg);

  milk = createSprite(565, 300);
  milk.addImage(milkImg);
  milk.scale = 0.1;
  milk.visible = false;
  milk.rotation = 55;
  
  food1 = new Food();
  
  food1.start();

  addFood = createButton("Add food");
  addFood.position(370, 45);
  addFood.mousePressed(addFoods);

 // input = createInput("Your Dog's Name");
  //input.position(150, 70);

  feed = createButton("Feed your Dog");
  feed.position(450, 45);
  feed.mousePressed(feedDog);

  canvas = createCanvas(800, 400);
}

function draw() {  
  background(46, 139, 87);

  food1.display();

  textSize (16);
  stroke("White");
  if(fedTime >= 12) {
    text("Last Feed: " + fedTime % 12 + " PM", 150, 60);
} else if(fedTime === 0){
    text("Last Feed: 12 AM", 150, 60);
} else {
    text("Last Feed: " + fedTime + " AM", 150, 60);
}

  drawSprites();
}

function feedDog() {
  food1.getFoodStock();
  food1.updateFedTime();

  if(foodCount === 0) {
    foodCount = 0;
    milk.visible = false;
    dog.addImage(dogImg);
  } else {
    food1.updateFoodStock(foodCount - 1);
    milk.visible = true;
    dog.addImage(happyDogImg);
  }
}

function addFoods() {
 food1.getFoodStock();

 food1.updateFoodStock(foodCount + 1); 
}