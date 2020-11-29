//TAG
//developed by Anmol Deepak
//on Saturday November 28, 2020
//the game Tag is based on the real game Tag, but different
//so that you can play it easily at home during the times
//of the COVID-19 pandemic.

//sets up matter.js
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//creates all the global variables
var engine, world;
var player1, player2, upWall, btWall, ghWall;
var boing, platform1, platform2, platform3, gameState;
var player3, redI, player4, blueI, backOfTimer;
var it, frames, seconds, mins, sec1, sec2, sec3;

//loads all images and sounds
function preload()
{
	boing = loadSound('Boing-sound.mp3');
	redI = loadImage('red.png');
	blueI = loadImage('blue.png');
}

function setup() 
{
	//creates canvas
	createCanvas(1000, 700);
	//sets up matter.js
	engine = Engine.create();
	world = engine.world;

	//assigns value to gameState
	gameState = "start";

	//creates white rectangle underneath the timer
	backOfTimer = createSprite(500, 52.5, 510, 70);
	backOfTimer.shapeColor = "white";

	//creates the players
	player3 = createSprite(200,100,25,25);
	player3.addImage(redI);
	player3.scale = 0.7;

	player4 = createSprite(300,100,25,25);
	player4.addImage(blueI);
	player4.scale = 0.7;

	//creates the platforms which the players stand on
	platform1 = createSprite(200, 200, 400, 20);
	platform1.shapeColor = "red";

	platform2 = createSprite(500, 430, 200, 20);
	platform2.shapeColor = "red";

	platform3 = createSprite(370, 340, 235, 20);
	platform3.shapeColor = "red";

	platform4 = createSprite(500, 298, 456, 20);
	platform4.shapeColor = "red";

	platform5 = createSprite(789, 567, 345, 20);
	platform5.shapeColor = "red";

	platform6 = createSprite(123, 649, 132, 20);
	platform6.shapeColor = "red";

	//sets who is it
	it = Math.round(random(3,4))
}

function draw() {
		//sets up what to do if the gameState is "end"
		if(gameState === "end"){
			//clears the screen
			background(255, 153, 0);
			//displays the results
			stroke("black");
			strokeWeight(7);
			fill("white");
			textSize(80);
			text("Time's Up!", 320, 275);
			if(it === 3){
				text("The Winner is Blue!", 150, 425);
			}
			else if(it === 4){
				text("The Winner is Red!", 160, 425);
			}
		}

		//sets up what to do if the gameState is "start"
		else if(gameState = "start"){
			rectMode(CENTER);
			//creates background to refresh the screen 30 times every second
			background(255, 153, 0);
			//updates matter.js
			Engine.update(engine);

			//adds gravity to the players
			player3.velocityY+=1.5;
			player4.velocityY+=1.5;

			//adds controls to the players
			if(keyWentDown("W")){
				player3.velocityY = -20;
				boing.play();
			}

			if(keyDown("A")){
				player3.x = player3.x-10;
			}

			if(keyDown("D")){
				player3.x = player3.x+10;	
			}

			if(keyWentDown("UP")){
				player4.velocityY = -20;
				boing.play();
			}

			if(keyDown("LEFT")){
				player4.x = player4.x-10;
			}

			if(keyDown("RIGHT")){
				player4.x = player4.x+10;
			}

			//makes a player it if he touches the player who was it
			if(it === 3 && player3.collide(player4)){
				it = 4;
			}

			if(it === 4 && player4.collide(player3)){
				it = 3;
			}

			//creates the edges of the game area
			edges = createEdgeSprites();

			//sets all the collisions between players and other objects
			player3.collide(edges);
			player3.collide(platform1);
			player3.collide(platform2);
			player3.collide(platform3);
			player3.collide(platform4);
			player3.collide(platform5);
			player3.collide(platform6);
			player4.collide(edges);
			player4.collide(platform1);
			player4.collide(platform2);
			player4.collide(platform3);
			player4.collide(platform4);
			player4.collide(platform5);
			player4.collide(platform6);
			player4.collide(player3);
				
			//draws all the sprites
			drawSprites();

			//displays who is it
			if(it === 3){
				fill("black");
				stroke("black");
				textSize(14);
				text("IT", player3.x-5, player3.y-25);
			}
			if(it === 4){
				fill("black");
				stroke("black");
				textSize(14);
				text("IT", player4.x-5, player4.y-25);
			}

			//displays instructions of the game
			text("Welcome to Tag!", 820, 50);
			text("In tag, the goal is to not be it", 780, 70);
			text("by the time three minutes is over.", 770, 90);
			text("Blue is controlled by arrow keys", 775, 110);
			text("and Red is controlled by WASD.", 775, 130);

			//starts the timer function
			timer();
		}




}

function timer(){
	//calculates the time in seconds and minutes so that it can be displayed using string concatenation
	frames = frameCount;
	seconds = Math.round(frames/30);
	mins = Math.trunc(seconds/60);
	sec1 = seconds%60;
	sec2 = sec1.toString();
	sec3 = sec2.padStart(2, '0');
	//displays the time
	stroke("black");
	textSize(50);
	fill("black");
	text("Time Passed: " + mins + ":" + sec3 + "s", 275, 70);

	//if 3 minutes have passed, this ends the game
	if(seconds >= 180){
		gameState = "end";
	}
}