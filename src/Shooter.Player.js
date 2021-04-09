Shooter.Player = function(x, y){
	// @Arguments
	var x = x;
	var y = y;

	// #Inheritance
	Shooter.Hitman.call(this, x, y);

	// @Variables
	var self = this;
	var Vector2 = Shooter.Lib.Vector2;

	// @Data
	this.forwardSpeed = Shooter.Data.Player.speed;
	this.fireRate = Shooter.Data.Player.fireRate;
	this.mainColor = "0020c0";


	// @Properties
	this.healthMax = Shooter.Data.Player.health; //1500;
	this.health = this.healthMax;
	this.type = "Player";
	this.distanceToMousePosition = 0;
	this.isFiring = false;

	// @Initialization

	// @Methods
	/**************************
		set forward method based on mouse position
	**************************/
	this.setForwardVector = function(){
		var dx = (Shooter.Input.Mouse.worldX - this.position.x);
		var dy = (Shooter.Input.Mouse.worldY - this.position.y);

		this.forwardVector.x = dx;
		this.forwardVector.y = dy;

		this.forwardVector.normalize();

	}

	/**************************
		moves the player object
		called every frame
	**************************/
	this.move = function(){		
		if(Shooter.Input.W.isDown){
			this.moveForward();
		}

		if(Shooter.Input.S.isDown){
			this.moveBackward();
		}

		if(Shooter.Input.A.isDown){
			this.moveLeft();
		}

		if(Shooter.Input.D.isDown){
			this.moveRight();
		}
	}

	/**************************
		rotates the player gameobject
		nased n mouse position
		called per frame
	**************************/
	this.rotate = function(){
		//this.setCenter();

		var v = new Vector2(Shooter.Input.Mouse.worldX, Shooter.Input.Mouse.worldY);
		var a = Vector2.getAngleBetween(this.position, v);

		this.rotation = a;
	}

	/**************************
		kills the player
		this method is Overriden
	**************************/
	this.die = function(){
		// Game over!!!
		this.destroy();
		Shooter.player = null;
		Shooter.gameOver();
	}

	/**************************
		controls the player 
		called every frame
	**************************/
	this.control = function(){
		this.move();
		this.rotate();
		this.fire();
	}

	/**************************
		checks player's fire rate and shoot to this forward direction
	**************************/
	this.fire = function(){
		if(Shooter.Input.Mouse.leftIsDown){
			this.shootBullet();
		}
	}

	/**************************
		set the distance from mouse position
	**************************/
	this.setDistanceToMousePosition = function(){
		var dx = this.position.x - Shooter.Input.Mouse.worldX;
		var dy = this.position.y - Shooter.Input.Mouse.worldY;
		this.distanceToMousePosition = Math.sqrt( (dx*dx) + (dy*dy) );
	}

	/**************************
		draws toMousePosition
	**************************/
	this.drawToMousePosition = function(){
		var ctx = Shooter.context;

		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "#00f050";
		ctx.strokeStyle = "#00f050";
		ctx.moveTo(this.position.x, this.position.y);
		ctx.lineTo(Shooter.Input.Mouse.worldX, Shooter.Input.Mouse.worldY);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}
	
	/**************************
		main player draw method
		called everfy frame on main game render method		
	**************************/
	this.draw = function(ctx){
		var ctx = ctx;

		// draw parent class 
		this.hitmanDraw();
		
		if(Shooter.debugAll){
			this.drawMainDebug();
			//this.drawToMousePosition();
		}
	}

	/**************************
		updates the player
		called every frame
	**************************/
	this.update = function(){
		// reset velocity
		this.resetVelocity();

		// get input and control player
		this.control();

		// parent class update
		this.hitmanUpdate();

		// set forward vector
		this.setForwardVector();

		// set distance to mouseposition
		this.setDistanceToMousePosition();

		// parent class late update
		this.hitmanLateUpdate();
	}

}