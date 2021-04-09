Shooter.Enemy = function(x, y){
	// @Arguments
	var x = x;
	var y = y;

	// @Inheritance
	Shooter.Hitman.call(this, x, y);

	// @Variables
	var Vector2 = Shooter.Lib.Vector2;
	var Physics = Shooter.Physics;
	var Geometry = Shooter.Geometry;
	var drawLineToPlayer = false;

	// @Data
	this.moveRate = Shooter.Data.Enemy.moveRate;;

	// @Vectors
	this.directionToDestination = new Vector2(0, 0);
	this.toPlayerVector = new Vector2(0, 0);

	// @Properties
	this.destination = null;
	this.nextMoveTime = 0;
	this.pathToDestination = [];
	this.lineToPlayer = (Shooter.player === null) ? null : new Shooter.Graphics.Line( new Shooter.Geometry.point(this.position.x, this.position.y), new Shooter.Geometry.point(Shooter.player.position.x, Shooter.player.position.y));
	this.fireWillHitPlayer = true;
	this.type = "Enemy";

	// @Object instances
	this.AI = new Shooter.AI.AIPlayer(this);

	// @Methods
	/**************************
		moves on path if exist
		called per frame
	**************************/
	this.moveOnPath = function(){
		if(this.pathToDestination.length > 2){
			var first = this.pathToDestination[0];
			var x = first[0];
			var y = first[1];

			this.setDirectionToDestination(x,y);
			this.setVelocityToDestination();

			if(this.checkIfPositionEqualsNode(x, y)){
				this.pathToDestination.shift();
			}
		}
	}

	/**************************
		checks if position equals node position
		calls Grid.toGrid method on both positions (rounds the values)
	**************************/
	this.checkIfPositionEqualsNode = function(x, y){
		var thisX = Shooter.Grid.toGrid(this.position.x);
		var thisY = Shooter.Grid.toGrid(this.position.y);
		var nodeX = Shooter.Grid.toGrid(x);
		var nodeY = Shooter.Grid.toGrid(y);
		if(thisX === nodeX && thisY === nodeY){
			return true;
		}else{
			return false;
		}
	}

	/**************************
		controls the gameobject
		called every frame
	**************************/
	this.control = function(){
		//this.moveToDestination();
		this.moveOnPath();
		this.rotate();
	}

	/**************************
		checks fire rate and if can hit
		fires to this forward direction
	**************************/
	this.fire = function(){
		this.shootBullet();
	}

	/**************************
		sets the lineToPLayer
	**************************/
	this.setLineToPLayer = function(){
		if(!Shooter.player)return;

		this.lineToPlayer.p1.x = this.position.x;
		this.lineToPlayer.p1.y = this.position.y;

		this.lineToPlayer.p2.x = Shooter.player.position.x;
		this.lineToPlayer.p2.y = Shooter.player.position.y;

		this.lineToPlayer.color = "red";
	}

	/**************************
		sets the forward vector
	**************************/
	this.setForwardVector = function(){
		if(!Shooter.player){
			return;
		}

		var dx = (Shooter.player.position.x - this.position.x);
		var dy = (Shooter.player.position.y - this.position.y);

		this.forwardVector.x = dx;
		this.forwardVector.y = dy;
		this.forwardVector.normalize();
	}

	/**************************
		sets the toPLayerVector
	**************************/
	this.setToPLayerVector = function(){
		if(!Shooter.player){
			return;
		}

		var dx = (Shooter.player.position.x - this.position.x);
		var dy = (Shooter.player.position.y - this.position.y);

		this.toPlayerVector.x = dx;
		this.toPlayerVector.y = dy;
	}

	/**************************
		rotates the gameobject based on player position
	**************************/
	this.rotate = function(){
		//this.setCenter();
		if(Shooter.player){
			var v = new Vector2(Shooter.player.position.x+Shooter.player.velocity.x, Shooter.player.position.y+Shooter.player.velocity.y);
			var a = Vector2.getAngleBetween(this.position, v);
			this.rotation = a;
		}
	}

	/**************************
		checks if ray hit the player
	**************************/
	this.checkIfRayHittingPlayer = function(){
		if(Shooter.player === null){
			return;
		}

		if(this.rayToPosition(Shooter.player.position)){
			this.fireWillHitPlayer = false;
			return false;
		}else{
			this.fireWillHitPlayer = true;
			return true;
		}
	}

	/**************************
		gets the euclidean distance from the player
	**************************/
	this.getDistanceFromPlayer = function(){
		if(!Shooter.player){
			return;
		}

		var dx = this.position.x - Shooter.player.position.x;
		var dy = this.position.y - Shooter.player.position.y;
		var dis = Math.sqrt(dx*dx+dy*dy);
		return dis;
	}

	/**************************
		sets the direction to estination
	**************************/
	this.setDirectionToDestination = function(x, y){
		var dx = x - this.position.x;
		var dy = y - this.position.y;
		this.directionToDestination.x = dx;
		this.directionToDestination.y = dy;
		this.directionToDestination.normalize();
	}

	/**************************
		sets the velocity to destination
	**************************/
	this.setVelocityToDestination = function(){
		this.velocity.x = this.directionToDestination.x * this.forwardSpeed* (Shooter.Time.deltaTime/100);
		this.velocity.y = this.directionToDestination.y * this.forwardSpeed* (Shooter.Time.deltaTime/100);
	}

	/**************************
		draws the destination vector
	**************************/
	this.drawDestinationVector = function(){
		var ctx = Shooter.context;

		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "#0050f0";
		ctx.strokeStyle = "#0050f0";
		ctx.moveTo(this.position.x, this.position.y);
		ctx.lineTo(this.position.x + this.directionToDestination.x*10, this.position.y + this.directionToDestination.y*10);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}

	/**************************
		draws the object
		called per frame in main render method
	**************************/
	this.draw = function(ctx){
		var ctx = ctx;

		// draw parent class 
		this.hitmanDraw();

		// draw line to player
		if(drawLineToPlayer){
			this.lineToPlayer.draw();
		}
		
		if(Shooter.showPaths){
			this.AI.pathModeller.drawPath();
		}

		if(Shooter.debugAll){
			this.drawMainDebug();
			//this.drawDestinationVector();
		}
	}

	/**************************
		updates the  gameobject
		called per frame
	**************************/
	this.update = function(){
		// reset velocity
		this.resetVelocity();

		// reset color
		this.rectColor = this.mainColor;

		// get input and control player
		this.AI.perform();

		// control
		this.control();

		// parent class update
		this.hitmanUpdate();

		// set line to player
		this.setLineToPLayer();

		// set to player vector (for firing)
		this.setForwardVector();

		// set to player vector (for raycasting to player)
		this.setToPLayerVector();

		// raycast to player position
		this.checkIfRayHittingPlayer();

		// parent class late update
		this.hitmanLateUpdate();
	}

}