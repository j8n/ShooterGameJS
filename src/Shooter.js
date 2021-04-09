

var Shooter = {
	// @Lists
	gameObjectsList: [],

	// @Rendering elements
	canvas: null,
	context: null,
	gridCanvas: null,
	gridCanvasContext: null,
	cratesCanvas: null,
	cratesCanvasContext: null,

	// @Properties
	width: 0,
	height: 0,
	mapBoxSide: 20,
	cratesNumberToSpawn: 50,
	healthCratesNumberToSpawn: 4,
	enemiesNumberToSpawn: 2,
	player: null,
	enemyOne: null,
	testLine: null,
	crateOne: null,
	barOne: null,
	healthCrateOne: null,

	// @Bools
	debugAll: true,
	createEnemyOne: true,
	createCrateOne: false,
	createTestLine: false,
	showPaths: false,
	drawGrid: false,
	drawMouse: false,
	playerHealth: 2000, //Infinity, // 1500, // Infinity,

}

Shooter.createImages = function(){
	Shooter.healthCrateImage = new Image();

	Shooter.healthCrateImage.src = "img/HealthCrate.png";
}

/*
Shooter.drawAllCrates = function(){
	if(Shooter.cratesDrawn){
		Shooter.context.drawImage(Shooter.cratesCanvas, 0, 0);
		return;
	}

	Shooter.Utils.forEach(Grid.gridList, function(o, i){
		var crate = o;

		Shooter.cratesCanvasContext.beginPath();
		Shooter.cratesCanvasContext.rect(crate.position.x, crate.position.y, crate.width, crate.height);
		Shooter.cratesCanvasContext.strokeStyle = crate.isWalkable ? "#909090" : "#101010" ;
		Shooter.cratesCanvasContext.stroke();
		Shooter.cratesCanvasContext.closePath();

	});
}
*/

Shooter.createRandomCrates = function(){
	
	for(var i=0; i<Shooter.cratesNumberToSpawn; i++){

		var rX = Shooter.Lib.Calculator.randomNumberBetween(2, Shooter.boxWidth-1);
		var rY = Shooter.Lib.Calculator.randomNumberBetween(2, Shooter.boxHeight-1);
		var rWidth = Shooter.Lib.Calculator.randomNumberBetween(1, 5);
		var rHeight = Shooter.Lib.Calculator.randomNumberBetween(1, 5);

		var randomX = rX*Shooter.mapBoxSide;
		var randomY = rY*Shooter.mapBoxSide;

		var randomWidth = rWidth*Shooter.mapBoxSide;
		var randomHeight = rHeight*Shooter.mapBoxSide;

		new Shooter.Crate(randomX, randomY, randomWidth, randomHeight);		
	}

}

Shooter.spawnHealthCrates = function(){
	if(Shooter.healthCratesNumberToSpawn <= 0){
		return;
	}

	if(Shooter.Utils.getHealthCratesList().length <= 0){
		for(var i=0; i<Shooter.healthCratesNumberToSpawn; i++){
			Shooter.spawn("HealthCrate");
		}
	}
}

Shooter.spawnEnemies = function(){
	if(Shooter.enemiesNumberToSpawn <= 0){
		return;
	}

	if(Shooter.Utils.getEnemiesList().length <= 0){
		for(var i=0; i<Shooter.enemiesNumberToSpawn; i++){
			Shooter.spawn("Enemy");
		}
	}
}

// spawns enemy once per frame until max number reached
Shooter.spawn = function(objectTypeToSpawn){
	var objectTypeToSpawn = objectTypeToSpawn;
	var canSpawnObject = false;

	do {
		var canSpawn = true;
		var rX = Shooter.Lib.Calculator.randomNumberBetween(1, Shooter.boxWidth-1);
		var rY = Shooter.Lib.Calculator.randomNumberBetween(1, Shooter.boxHeight-1);
		var randomX = rX*Shooter.mapBoxSide;
		var randomY = rY*Shooter.mapBoxSide;
		var shapeOfSpawnObject = null;

		//console.log(rX);
		//console.log(rY);
		//console.log(randomX);
		//console.log(randomY);

		if(objectTypeToSpawn === "HealthCrate"){
			shapeOfSpawnObject = new Shooter.Geometry.rect(randomX, randomY, Shooter.mapBoxSide, Shooter.mapBoxSide);

		}else if(objectTypeToSpawn === "Player" || objectTypeToSpawn === "Enemy"){
			shapeOfSpawnObject = new Shooter.Geometry.circle(randomX, randomY, Shooter.Data.Hitman.radius);
			//console.log(circle);
		}else{
			throw Error("not set yet");
		}

		for(var i=0; i<Shooter.gameObjectsList.length; i++){
			var o = Shooter.gameObjectsList[i];

			if(o.type === "Crate"){
				var rect = new Shooter.Geometry.rect(o.position.x, o.position.y, o.width, o.height);

				//console.log(rect);

				if(objectTypeToSpawn === "HealthCrate"){
					if(Shooter.Physics.rectInRectCollision(shapeOfSpawnObject, rect)){
						canSpawn = false;
						break;
					}else{
						canSpawn = true;
					}
				}else if(objectTypeToSpawn === "Player" || objectTypeToSpawn === "Enemy"){
					if(Shooter.Physics.circleInRectCollision(shapeOfSpawnObject, rect)){
						canSpawn = false;
						break;
					}else{
						canSpawn = true;
					}
				}
			}
		}

		if(canSpawn){
			canSpawnObject = true;

			if(objectTypeToSpawn === "Player"){
				Shooter.player = new Shooter.Player(randomX, randomY);
			}else if(objectTypeToSpawn === "Enemy"){
				if(Shooter.Utils.getEnemiesList().length <= 0){
					Shooter.enemyOne = new Shooter.Enemy(randomX, randomY);
				}else{
					new Shooter.Enemy(randomX, randomY);
				}
			}else if(objectTypeToSpawn === "HealthCrate"){
				if(Shooter.Utils.getHealthCratesList().length <= 0){
					Shooter.healthCrateOne = new Shooter.HealthCrate(randomX, randomY, Shooter.mapBoxSide, Shooter.mapBoxSide);
				}
				new Shooter.HealthCrate(randomX, randomY, Shooter.mapBoxSide, Shooter.mapBoxSide);
			}
		}
	} while (!canSpawnObject);

}

Shooter.setEvents = function(){
	Shooter.Input.setEventHandlers(Shooter.canvas, Shooter.DOM.gameContainer, Shooter.camera);
	console.log("events set");
}

Shooter.updateAll = function(){
	if(Shooter.gameObjectsList.length <= 0){
		return;
	}
	for(var i=0; i<Shooter.gameObjectsList.length; i++){
		var o = Shooter.gameObjectsList[i];
		o.update();
	}
}

Shooter.drawMousePosition = function(){
	if(Shooter.drawMouse){
		Shooter.context.save();
		Shooter.context.beginPath();
		Shooter.context.lineWidth = "3";
		Shooter.context.arc(Shooter.Input.Mouse.worldX, Shooter.Input.Mouse.worldY, 12, 0, 2*Math.PI);
		Shooter.context.strokeStyle = "#f08080";
		Shooter.context.stroke();
		Shooter.context.closePath();
		Shooter.context.restore();
	}
}

Shooter.testCreate = function(){
	// create test line and set 
	//if(Shooter.createTestLine){
	//	Shooter.testLine = new Shooter.Graphics.line(new Shooter.Geometry.point(0,0), new Shooter.Geometry.point(500, 500));
	//	Shooter.testLine.color = "#909090";
	//}
}

Shooter.testUpdate = function(){
	// test line updpate
	if(Shooter.testLine){
		if(Shooter.Physics.lineIntersectLine(Shooter.testLine, line)){
			Shooter.testLine.color = "#ff0050";
		}else{
			Shooter.testLine.color = "#909090";
		}
	}
}

Shooter.testRender = function(){

	// draw test line
	if(Shooter.testLine){
		Shooter.testLine.draw();
	}
}

Shooter.reset = function(){
	Shooter.DOM.reset();
	Shooter.Time.reset();

}

Shooter.set = function(){
	// set start screen
	Shooter.DOM.StartScreen.set();

	// create container, canvas and get context
	Shooter.DOM.set();
}

Shooter.mewGame = function(options){
	var options = options || {};
}

Shooter.pause = function(){
	Shooter.Time.stop();
}

Shooter.gameOver = function(){
	Shooter.player = null;
	Shooter.pause();
	Shooter.reset();
}

Shooter.setup = function(){
	// create camera
	Shooter.camera = new Shooter.Camera(Shooter.canvas);

	// set box width and height
	Shooter.boxWidth = Math.floor(Shooter.width / Shooter.Grid.nodesDistance);
	Shooter.boxHeight = Math.floor(Shooter.height / Shooter.Grid.nodesDistance);

	// set global and input events
	Shooter.setEvents();

	// create images
	Shooter.createImages();
	
	// create gameobjects
	Shooter.create();

	// create grid (for pathfinders)
	Shooter.Grid.set();

	// center camera to the player position
	Shooter.camera.centerTo(Shooter.player.position.x, Shooter.player.position.y);

	// set camera target
	//Shooter.camera.setTarget(Shooter.player);

	// set time
	Shooter.Time.start();

	console.log("game set");

	// update
	Shooter.update();

	//console.log(Shooter.gameObjectsList);
}

Shooter.create = function(){
	// CRATES CREATION
	Shooter.createRandomCrates();
	Shooter.crateOne = (Shooter.createCrateOne) ? new Shooter.Crate(Shooter.mapBoxSide*15, Shooter.mapBoxSide*7, Shooter.mapBoxSide*4, Shooter.mapBoxSide*4) : null;
	//console.log(Shooter.crateOne);

	/// HEALTH CRATES CREATION
	Shooter.spawnHealthCrates();
	//Shooter.healthCrateOne = new Shooter.HealthCrate(600, 400);
	//console.log(Shooter.healthCrateOne);

	// create player
	//Shooter.player = new Shooter.Player(Shooter.Grid.toGrid(Shooter.width/2- Shooter.mapBoxSide/2), Shooter.Grid.toGrid(Shooter.height/2- Shooter.mapBoxSide/2));
	Shooter.spawn("Player");
	console.log(Shooter.player);

	// create enemies
	//Shooter.enemyOne = (Shooter.createEnemyOne) ? new Shooter.Enemy(Shooter.mapBoxSide*10, Shooter.mapBoxSide*10) : null;
	Shooter.spawnEnemies();
	console.log(Shooter.enemyOne);

	// test create
	Shooter.testCreate();

	console.log(Shooter.gameObjectsList);
}

Shooter.render = function(){
	// camera render all
	Shooter.camera.render();

	// test render
	Shooter.testRender();

	if(Shooter.debugAll){
		// draw grid
		Shooter.Grid.drawMapGrid();
		
		// draw mouse position
		Shooter.drawMousePosition();
	}

	//this.enemyOne.drawDestinationVector();
}

Shooter.update = function(){
	// every frame check if enemies exist. if not, create random enemies till max number
	Shooter.spawnEnemies();

	// every frame check if health crates exist. if not, create random health crates till max number
	Shooter.spawnHealthCrates();

	// update all
	Shooter.updateAll();

	// test update
	Shooter.testUpdate();

	// update camera
	Shooter.camera.update();

	// render all
	Shooter.render();

	// follow player position
	if(Shooter.player){
		Shooter.camera.centerTo(Shooter.player.position.x, Shooter.player.position.y);
	}

	// print all
	Shooter.Printer.print();

	// udpate
	Shooter.Time.raf(Shooter.update);

	//setTimeout(function(){
	//	Shooter.Time.stop();
	//}, 2000);
	//setTimeout(function(){
	//	Shooter.Time.restart(Shooter.update);
	//}, 4000);
}
