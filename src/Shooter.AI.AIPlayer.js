Shooter.AI.AIPlayer = function(enemy){
	// @Arguments
	var enemy = enemy;

	// @Inheritance

	// @Variables
	var self = this;
	var Calculator = Shooter.Lib.Calculator;

	// @Data
	this.finderRate = Shooter.AI.findPathRate;
	this.randomBeginTime = Calculator.randomNumberBetween(150, 2000);

	// @Vectors

	// @Properties
	this.enemy = enemy;
	//this.enemyPathToPlayer = [];
	this.currentPathToPlayer = [];
	this.canFindPath = true;
	this.nextFinderTime = 0;
	this.searchingPath = false;
	this.isSearchingPath = false;
	this.isStoped = true;
	this.isMoving = false;
	this.shotCanHit = false;
	this.distanceFromPlayer = 0;
	this.mustFindPath = true;

	this.isAvoiding = false;
	this.nextAvoidTime = 0;
	this.nextAvoidRate = 250;
	
	/// delay AI performing on start by random time
	this.startPerformingTime = Shooter.Time.elapsedTime + Calculator.randomNumberBetween(100, 1500);;

	// @Object instances
	this.pathFinder = new Shooter.AI.PathFinder(Shooter.Grid.gridList);
	this.pathModeller = new Shooter.AI.PathModeller(this.pathFinder);

	// @Methods
	this.getDistanceFromPlayer = function(){
		this.distanceFromPlayer = this.enemy.getDistanceFromPlayer();
	}

	this.checkIfMustFindPath = function(){
		this.mustFindPath = false;

		if(this.currentPathToPlayer.length === 0){
			this.mustFindPath = true;
			return true;
		}
		if(Shooter.Time.elapsedTime > this.nextFinderTime){
			if(!this.checkIfShotCanHit()){
				this.mustFindPath = true;
				this.nextFinderTime = Shooter.Time.elapsedTime + this.finderRate;
				return true;
			}
		}
	}

	this.checkIfShotCanHit = function(){
		if(this.enemy.fireWillHitPlayer){
			this.shotCanHit = true;
			return true;
		}else{
			this.shotCanHit = false;
			return false;
		}
	}

	this.mustAvoidFire = function(){
		
	}

	this.findPathToPlayerIfNeeded = function(){
		if(this.mustFindPath){
			this.enemy.setState("searching");
			this.searchingPath = true;
			this.currentPathToPlayer = this.pathFinder.FindPath(this.enemy.position, Shooter.player.position);
		}else{
			this.searchingPath = false;
		}
	}

	this.isCloseToPLayer = function(){
		var dis = this.distanceFromPlayer;
		if(dis <= this.enemy.range){
			return true;
		}else{
			return false;
		}
	}

	this.moveToPlayerPath = function(){
		//this.pathToPlayer.shift();
		this.enemy.pathToDestination = this.currentPathToPlayer;
		this.isMoving = true;
		this.isStoped = false;
		this.enemy.setState("moving");

	}

	// find the closest can hit postion
	// Kind Of PathFinder
	this.findClosestCanHitPosition = function(){
		Shooter.Grid.resetNodesColor();
		Shooter.Grid.resetNodes();
		
		var closedList = [];
		var openList = [];
		var sx = Shooter.toGrid(this.enemy.position.x);
		var sy = Shooter.toGrid(this.enemy.position.y);
		var foundClosestPosition = false;
		var maxIterations = 50;
		var currentIteration = 0;
		var startNode = Shooter.Grid.getNode(sx, sy);

		openList.push(startNode);
		closedList.push(startNode);

		while(!foundClosestPosition && currentIteration < maxIterations){
			currentIteration++;

			openList.sort(function(a, b){
				return a.gScore - b.gScore;
			});

			var currentNode = openList.shift();
			if(currentNode.is)

			var neighbors = Shooter.Grid.getNeighbors(startNode);

			for(var i=0; i<neighbors.length; i++){
				var neighbor = neighbors[i];

				if(neighbor === null){
					continue;
				}
			}
		}
	}

	this.takeCover = function(){
		this.findClosestCanHitPosition();
		// search for position that if there, player shot would not hit this enemy!
	}

	this.stopMoving = function(){
		this.isMoving = false;
		this.isStoped = true;
		this.enemy.setState("stationary");
		this.enemy.pathToDestination = [];
	}

	this.avoidPlayerFire = function(){
		if(Shooter.Time.elapsedTime > this.nextAvoidTime){

			if(!this.isAvoiding){
				if(Shooter.player.isFiring){
				
					var rx = Shooter.Lib.Calculator.randomNumberBetween(-1, 1);
					var ry = Shooter.Lib.Calculator.randomNumberBetween(-1, 1);
					var r = Shooter.Lib.Calculator.randomNumberBetween(1, 4);

					if(r === 1){
						this.enemy.moveForward(25);
					}else if(r === 2){
						this.enemy.moveBackward(25);
					}else if(r === 3){
						this.enemy.moveLeft(25);
					}else if(r === 4){
						this.enemy.moveRight(25);
					}

					this.isAvoiding = true;
				}

				this.nextAvoidTime = Shooter.Time.elapsedTime + this.nextAvoidRate;
			}else{
				this.isAvoiding = false;
			}
		}		
	}

	this.perform = function(){
		if(Shooter.Time.elapsedTime < this.startPerformingTime){
			return;
		}
		// find distance from player
		this.getDistanceFromPlayer();


		// check if must find path
		this.checkIfMustFindPath();


		// check if shot can hit player
		this.checkIfShotCanHit();


		// check if player is moving


		// if must find path find path
		this.findPathToPlayerIfNeeded();
		

		if(this.isCloseToPLayer()){
			if(this.shotCanHit){
				this.stopMoving();
				this.mustAvoidFire();
				this.enemy.fire();

			}else{
				this.moveToPlayerPath();
			}
		}else{
			this.moveToPlayerPath();
		}
	}

}



/************************************


!!!!! MUST FIRST FIND SHORTEST POSITION THAT ENEMY CAN SHOT AND HIT PLAYER !!!!!



this.perform = function(){
	if(Shooter.Time.elapsedTime < this.startPerformingTime){
		return;
	}
	// find distance from player
	this.getDistanceFromPlayer();


	// check if must find path
	this.checkIfMustFindPath();


	// check if shot can hit player
	this.checkIfShotCanHit();



	// check if player is moving




	// if must find path find path
	this.findPathToPlayerIfNeeded();
	



	if(this.isCloseToPLayer()){
		if(this.shotCanHit){
			this.stopMoving();
			this.mustAvoidFire();
			this.enemy.fire();

		}else{
			this.moveToPlayerPath();
		}
	}else{
		this.moveToPlayerPath();
	}




}










########## FRAME ##########
//Set Data
	• 	find distance from player

	• 	check if must find path

	• 	check if shot can hit player

	• 	check if player is moving and get direction of player movement





// Do Actions
	• 	if (must find path){
			find shortest path to player
			save path until next needed
		}

	• 	if (close to player) {
			if(shot can hit player){
				shot player
				stop moving*
			}else{
				keep moving
			}
		}else{
			just move on path
		}




// END 
	• 	if (path is short && player distance is big){
			must find new path = true
		}
************************************/










/**********************
	pseudoCode

	findClosestCanHitPosition (){
		
	}





**********************/


