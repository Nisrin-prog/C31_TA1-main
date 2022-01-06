const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;

var bg_img;
var food;
var rabbit;

var button;
var bunny;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  blink.playing = true
  //eat.playing = true
  eat.looping = false
  blink.playing = true
 
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(65,80);
  button.size(50,50);
  button.mouseClicked(drop);

  button = createImg('cut_btn.png');
  button.position(200,60);
  button.size(50,50);
  button.mouseClicked(drop);
  
  button = createImg('cut_btn.png');
  button.position(355,200);
  button.size(50,50);
  button.mouseClicked(drop);
  rope = new Rope(7,{x:70,y:85});
  rope1 = new Rope(7,{x:370,y:215});
  rope2 = new Rope(7,{x:210,y:65});

  ground = new Ground(200,690,600,20);


  bunny = createSprite(230,620,100,100);
  bunny.addAnimation("blinking",blink)
  bunny.addAnimation("eating",eat)
  bunny.changeAnimation("blinking")
  bunny.scale = 0.2;

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con1 = new Link(rope1,fruit);
  fruit_con2 = new Link(rope2,fruit);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);
  if(fruit!==null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  rope1.show();
  rope2.show()
  Engine.update(engine);
  ground.show();
  bunny.frameDelay = 15
  eat.frameDelay  = 15
  
  collide(fruit,bunny)
  drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}
function collide(body,sprite){
  if(body!==null){
  var distance = dist(body.position.x,body.position.y,sprite.x,sprite.y)
  console.log(distance)
 
  
 
    if(distance<100){
      bunny.changeAnimation("eating")
      World.remove(world,fruit)
      fruit = null
    }
  }
}