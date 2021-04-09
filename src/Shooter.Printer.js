Shooter.Printer = (function(){

	var Printer = {
		printAll: true,
		printGame: false,
		printPlayer: false,
		printEnemy: false,
		printAI: false,
		printCrate: false,
		printTime: false,
		printFps: true,
		printCamera: false,
	}

	Printer.print = function(){
		Printer.printUI();
		Printer.printDebug();
		Printer.printDebugTwo();
	}

	Printer.printUI = function(){
		if(Shooter.player){
			Shooter.DOM.playerHealthElement.innerHTML = Shooter.player.enemiesKilled;	
		}
	}

	Printer.printDebug = function(){
		var panelOne = Shooter.DOM.debugPanelOne;

		panelOne.innerHTML = "";

		if(!Printer.printAll){
			return;
		}
		if(Shooter.debugAll){

			// Game
			if(Printer.printGame){	
				panelOne.innerHTML += "player rotation: "+ (Shooter.player.rotation).toFixed(2);
				panelOne.innerHTML += "<br>";
				panelOne.innerHTML += "distance to mouse position: "+ (Shooter.player.distanceToMousePosition).toFixed(2);
				panelOne.innerHTML += "<br>";
				panelOne.innerHTML += "enemies number: "+ (Shooter.Utils.getEnemiesList().length);
				panelOne.innerHTML += "<br>";
				panelOne.innerHTML += "obstacles number: "+ (Shooter.Utils.getObstaclesList().length);
				panelOne.innerHTML += "<br>";
				panelOne.innerHTML += "____________";
				panelOne.innerHTML += "<br>";
			}

			// Player
			if(Printer.printPlayer){
				panelOne.innerHTML += "player x: "+ Shooter.player.position.x.toFixed(3);
				panelOne.innerHTML += "<br>";
				panelOne.innerHTML += "player y: "+ Shooter.player.position.y.toFixed(3);
				panelOne.innerHTML += "<br>";
				panelOne.innerHTML += "player health: "+ (Shooter.player.health).toFixed(2);
				panelOne.innerHTML += "<br>";
				panelOne.innerHTML += "player colliding: "+ (Shooter.player.isColliding);
				panelOne.innerHTML += "<br>";
				panelOne.innerHTML += "player velocity x: "+ (Shooter.player.velocity.x);
				panelOne.innerHTML += "<br>";
				panelOne.innerHTML += "player velocity y: "+ (Shooter.player.velocity.y);
				panelOne.innerHTML += "<br>";
				panelOne.innerHTML += "player is firing: "+ (Shooter.player.isFiring);
				panelOne.innerHTML += "<br>";

				panelOne.innerHTML += "____________";
				panelOne.innerHTML += "<br>";
			}
			
			// crateOne
			if(Printer.printCrate){
				if(Shooter.crateOne !== null && Shooter.crateOne !== undefined){
					panelOne.innerHTML += "crate x: "+ Shooter.crateOne.position.x;
					panelOne.innerHTML += "<br>";
					panelOne.innerHTML += "crate y: "+ Shooter.crateOne.position.y;
					panelOne.innerHTML += "<br>";
					panelOne.innerHTML += "crate r x: "+ (Shooter.crateOne.position.x-Shooter.crateOne.width/2);
					panelOne.innerHTML += "<br>";
					panelOne.innerHTML += "crate r y: "+ (Shooter.crateOne.position.y-Shooter.crateOne.height/2);
					panelOne.innerHTML += "<br>";
					panelOne.innerHTML += "____________";
					panelOne.innerHTML += "<br>";
				}

			}
			
			// Enemy
			if(Printer.printEnemy){
				if(Shooter.enemyOne !== null && Shooter.enemyOne !== undefined){
					panelOne.innerHTML += "enemy x: "+ Shooter.enemyOne.position.x.toFixed(3);
					panelOne.innerHTML += "<br>";
					panelOne.innerHTML += "enemy y: "+ Shooter.enemyOne.position.y.toFixed(3);
					panelOne.innerHTML += "<br>";
					panelOne.innerHTML += "enemy one health: "+ Shooter.enemyOne.health.toFixed(2);
					panelOne.innerHTML += "<br>";
					panelOne.innerHTML += "enemy fire will hit player: "+ Shooter.enemyOne.fireWillHitPlayer;
					panelOne.innerHTML += "<br>";
					panelOne.innerHTML += "enemy destination x: "+ Shooter.enemyOne.directionToDestination.x;
					panelOne.innerHTML += "<br>";
					panelOne.innerHTML += "enemy destination y: "+ Shooter.enemyOne.directionToDestination.y;
					panelOne.innerHTML += "<br>";
					panelOne.innerHTML += "enemy hiting object: "+ Shooter.enemyOne.objectRayHit;
					panelOne.innerHTML += "<br>";
					if(Shooter.enemyOne.objectRayHit !== null){
						panelOne.innerHTML += "enemy hiting object's type: "+ Shooter.enemyOne.objectRayHit.type;
						panelOne.innerHTML += "<br>";
					}

					panelOne.innerHTML += "____________";
					panelOne.innerHTML += "<br>";					
				}
			}
			
			// AI
			if(Printer.printAI){
				if(Shooter.enemyOne !== null && Shooter.enemyOne !== undefined){
					panelOne.innerHTML += "enemy ai is searching place: "+ Shooter.enemyOne.AI.searchingPath;
					panelOne.innerHTML += "<br>";
					panelOne.innerHTML += "enemy ai is searching path to player: "+ Shooter.enemyOne.AI.isSearchingPath;
					panelOne.innerHTML += "<br>";
					panelOne.innerHTML += "enemy ai is stoped: "+ Shooter.enemyOne.AI.isStoped;
					panelOne.innerHTML += "<br>";
					panelOne.innerHTML += "enemy ai is moving: "+ Shooter.enemyOne.AI.isMoving;
					panelOne.innerHTML += "<br>";
					panelOne.innerHTML += "____________";
					panelOne.innerHTML += "<br>";
				}
			}
		}
	}

	Printer.printDebugTwo = function(){
		var panelTwo = Shooter.DOM.debugPanelTwo;

		panelTwo.innerHTML = "";

		if(!Printer.printAll){
			return;
		}

		// Fps
		if(Printer.printFps){
			panelTwo.innerHTML += "FPS: "+Shooter.Time.FPS.toFixed(0);
			panelTwo.innerHTML += "<br>";
		}

		// Time
		if(Printer.printTime){
			panelTwo.innerHTML += "deltaTime: "+Shooter.Time.deltaTimeP;
			panelTwo.innerHTML += "<br>";
		}

		// Camera
		if(Printer.printCamera){
			panelTwo.innerHTML += "camera x: "+Shooter.camera.position.x;
			panelTwo.innerHTML += "<br>";
			panelTwo.innerHTML += "camera y: "+Shooter.camera.position.y;
		}
	}

	return Printer;

})();