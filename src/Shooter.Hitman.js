Shooter.Hitman = function(x, y){
	// @Arguments
	var x = x;
	var y = y;

	// @Inheritance
	Shooter.GameObject.call(this);

	// @Variables
	var Physics = Shooter.Physics;
	var Geometry = Shooter.Geometry;
	var Vector2 = Shooter.Lib.Vector2;
	var Calculator = Shooter.Lib.Calculator;
	var drawForwardLine = false;
	var self = this;

	// @Data
	this.radius = Shooter.Data.Hitman.radius; 
	this.forwardSpeed = Shooter.Data.Hitman.speed;
	this.fireRate = Shooter.Data.Hitman.fireRate;
	this.healthMax = Shooter.Data.Hitman.health;
	this.health = this.healthMax;	
	this.range = Shooter.Data.Hitman.range;

	// @Vectors
	this.position = new Vector2(x, y);
	this.nextPosition = new Vector2(0,0);
	this.velocity = new Vector2(0,0);
	this.forwardVector = new Vector2(0, 0);

	// @Properties
	this.type = "Hitman";
	this.canBeHit = true;
	this.width = this.radius*2;
	this.height = this.radius*2;
	this.rotation = 0;
	this.nextFire = 0;
	this.mainColor = "#c00020";
	this.collidingColor = "#f00050";
	this.rectColor = this.mainColor;
	this.color = this.mainColor;
	this.isFiring = false;

	this.isColliding = false;
	this.forwardLine = new Shooter.Graphics.Line( new Shooter.Geometry.point(this.position.x, this.position.y), new Shooter.Geometry.point(this.position.x+this.forwardVector.x*1000, this.position.y+this.forwardVector.y*1000));
	this.objectRayHit = null;
	this.enemiesKilled = 0;

	// @Methods
	/**************************
		set state
	**************************/
	this.setState = function(state){
		switch (state){
			case "default":
				this.rectColor = this.color;
				break;

			case "searching":
				this.rectColor = "#f000a0";
				break;
		
			case "moving":
				this.rectColor = "#00f060";
				break;

			case "stationary":
				this.rectColor = "#202020";
				break;

			case "firing":
		}
	}

	/**************************
		shoot bullet
	**************************/
	this.shootBullet = function(){
		if(Shooter.Time.elapsedTime > this.nextFire ){
			this.nextFire = Shooter.Time.elapsedTime + this.fireRate;
			new Shooter.Projectile(this.position.x+this.forwardVector.x*this.radius, this.position.y+this.forwardVector.y*this.radius, this.forwardVector, this);
			this.isFiring = true;
		}else{
			//this.firing = false;
		}
	}

	/**************************
		set forward line
	**************************/
	this.setForwardLine = function(){
		this.forwardLine.p1.x = this.position.x;
		this.forwardLine.p1.y = this.position.y;
		this.forwardLine.p2.x = this.position.x+this.forwardVector.x*10000;
		this.forwardLine.p2.y = this.position.y+this.forwardVector.y*10000;
	}

	/**************************
		returns true if ray hit object (crate)

		@Param {Vector} worldPositionToRay
	**************************/
	this.rayToPosition = function(worldPositionToRay){
		var worldPositionToRay = worldPositionToRay;
		var thisLine = new Shooter.Geometry.line(new Shooter.Geometry.point(this.position.x, this.position.y),  new Shooter.Geometry.point(worldPositionToRay.x, worldPositionToRay.y));

		for(var i=0; i<Shooter.gameObjectsList.length; i++){
			var o = Shooter.gameObjectsList[i];
			if(o.type === "Crate"){
				var rect = new Geometry.rect(o.position.x, o.position.y, o.width, o.height);
				if(Physics.lineIntersectRect(thisLine, rect)){
					//console.log("ray hit object to position");
					return true;
				}else{
					continue;
				}
			}else if(o.type === "Hitman"){
				
			}
		}

		return false;
	}

	/**************************
		ray to all
	**************************/
	this.rayToAll = function(){
		var rayLine = this.forwardLine;
		this.objectRayHit = null;

		for(var i=0; i<Shooter.gameObjectsList.length; i++){
			var o = Shooter.gameObjectsList[i];

			if(o.type === "Crate"){
				var rect = new Geometry.rect(o.position.x, o.position.y, o.width, o.height);
				if(Physics.lineIntersectRect(rayLine, rect)){
					this.objectRayHit = o;
					return this.objectRayHit;
				}else{
					continue;
				}
			}else if(o.type === "Hitman"){
				var rect = new Geometry.rect(o.position.x-o.width/2, o.position.y-o.height/2, o.width, o.height);
				if(Physics.lineIntersectRect(rayLine, rect)){
					this.objectRayHit = o;
					return;
				}else{
					continue;
				}
			}else{
				continue;
			}
		}	
	}

	/**************************
		set forward line color
	**************************/
	this.setForwardLineColor = function(){
		if(this.objectRayHit === null){
			this.forwardLine.color = "#909090";
		}else{
			this.forwardLine.color = "#f02090";
		}
	}

	/**************************
		ray cast to all crates
	**************************/
	this.raycastFireLineToAllCrates = function(){
		for(var i=0; i<Shooter.gameObjectsList.length; i++){
			var o = Shooter.gameObjectsList[i];
		
			if(o.type === "Crate"){
				var rect = new Geometry.rect(o.position.x, o.position.y, o.width, o.height);
				//console.log("rect");
				//console.log(rect);

				//var rectVertices = Calculator.getRectVertices(rect);
				//console.log("rectVertices");
				//console.log(rectVertices);

				var rectEdges = Calculator.getRectEdges(rect);
				//console.log("rectEdges");
				//console.log(rectEdges);

				//var edgeTop = rectEdges[0];
				//var edgeRight = rectEdges[1];
				//var edgeBottom = rectEdges[2];
				//var edgeLeft = rectEdges[3];
//
				//if(Physics.lineIntersectLine(self.forwardLine, edgeLeft)){
				//	self.forwardLine = "#f00050";
				//}else{
				//	self.forwardLine = "#909090";
				//}

				// reset line color
				self.forwardLine.color = "#909090";

				for(var j=0; j<rectEdges.length; j++){
					var edge = rectEdges[j];
					//console.log("edge");
					//console.log(edge);
					if(Physics.lineIntersectLine(self.forwardLine, edge)){
						self.forwardLine.color = "#f00050";
						return;
					}else{
						continue;
					}
				}
			}else{
				continue;
			}
		}
	}
	
	// @Methods
	//this.collideToObjects = function(){
	//	var rectOne = new Physics.rect(this.position.x-this.width/2, this.position.y-this.height/2, this.width, this.height);
	//	var circle = new Physics.circle(this.position.x, this.position.y, this.radius);
	//	this.isColliding = false;
//
	//	for(var i=0; i<Shooter.gameObjectsList.length; i++){
	//		var o = Shooter.gameObjectsList[i];
	//		if(this === o){
	//			continue;
	//		}
	//		if(o.type === "Hitman"){
	//			if(Shooter.Physics.circleInRectCollision(circle, rectTwo)){
	//				this.isColliding = true;
	//				return true;
	//			}
	//		}else if(o.type === "Crate"){
	//			var rectTwo = new Physics.rect(o.position.x-o.width/2, o.position.y-o.height/2, o.width, o.height);
	//			//console.log(rectTwo);
	//			if(Shooter.Physics.circleInRectCollision(circle, rectTwo)){
	//				this.isColliding = true;
	//				return true;
	//			}
	//		}else{
	//			continue;
	//		}
	//	}
	//	return false;
//
	//}

	/**************************
		checks collision on next position
	**************************/
	this.collideNextPosToObjects = function(){
		//var rectOne = new Physics.rect(this.nextPosition.x-this.width/2, this.nextPosition.y-this.height/2, this.width, this.height);
		var circle = new Geometry.circle(this.nextPosition.x, this.nextPosition.y, this.radius);
		this.isColliding = false;

		if(Shooter.gameObjectsList.length < 1){
			return false;
		}

		for(var i=0; i<Shooter.gameObjectsList.length; i++){
			var o = Shooter.gameObjectsList[i];
			if(this === o){
				continue;
			}
			
			if(o.isWalkable){
				if(o.type === "HealthCrate"){
					//var rectTwo = new Physics.rect(o.position.x-o.width/2, o.position.y-o.height/2, o.width, o.height);
					var rectTwo = new Geometry.rect(o.position.x, o.position.y, o.width, o.height);
					if(Shooter.Physics.circleInRectCollision(circle, rectTwo)){
						this.isColliding = true;
						o.giveHealthBonusTo(this);
						// health crate 
						
					}
				}

				continue;
			}else{
				if(o.type === "Hitman"){
					var rectTwo = new Geometry.rect(o.position.x-o.width/2, o.position.y-o.height/2, o.width, o.height);
					if(Shooter.Physics.circleInRectCollision(circle, rectTwo)){
						this.isColliding = true;
						return true;
					}
				}else if(o.type === "Crate"){
					//var rectTwo = new Physics.rect(o.position.x-o.width/2, o.position.y-o.height/2, o.width, o.height);
					var rectTwo = new Geometry.rect(o.position.x, o.position.y, o.width, o.height);
					if(Shooter.Physics.circleInRectCollision(circle, rectTwo)){
						this.isColliding = true;
						return true;
					}
				}else {

				}
			}
		}

		return false;
	}

	/**************************
		sets position
	**************************/
	this.setPosition = function(){
		this.nextPosition.x = this.position.x + this.velocity.x;
		this.nextPosition.y = this.position.y + this.velocity.y;

		if(this.collideNextPosToObjects()){
			this.position.x = (this.position.x + -(this.velocity.x/10));
			this.position.y = (this.position.y + -(this.velocity.y/10));
		}else{
			this.position.x = this.nextPosition.x;
			this.position.y = this.nextPosition.y;
		}
	}

	/**************************
		moves hitman to direction
	**************************/
	this.moveForward = function(speed){
		var speed = (speed === undefined) ? this.forwardSpeed : speed;
		this.velocity.y = -speed * (Shooter.Time.deltaTime/100);
	}
	this.moveBackward = function(speed){
		var speed = (speed === undefined) ? this.forwardSpeed : speed;
		this.velocity.y = speed * (Shooter.Time.deltaTime/100);
	}
	this.moveLeft = function(speed){
		var speed = (speed === undefined) ? this.forwardSpeed : speed;
		this.velocity.x = -speed * (Shooter.Time.deltaTime/100);
	}
	this.moveRight = function(speed){
		var speed = (speed === undefined) ? this.forwardSpeed : speed;
		this.velocity.x = speed * (Shooter.Time.deltaTime/100);
	}

	/**************************
		reset the velocity
	**************************/
	this.resetVelocity = function(){
		this.velocity.x = 0;
		this.velocity.y = 0;
	}

	// @Drawings
	/**************************
		draws the health bar
	**************************/
	this.drawHealthBar = function(){
		var ctx = Shooter.context;
		var barWidth = this.width+6;
		var barHeight = 5;
		var healthWidth = ((barWidth / this.healthMax) * this.health);

		if(this.healthMax === Infinity){
			healthWidth = barWidth;
		}

		ctx.save();
		ctx.beginPath();
		//ctx.strokeStyle = (this.isColliding) ? this.collidingColor : this.color;
		ctx.strokeStyle = "#101010";
		ctx.rect(this.position.x-barWidth/2, this.position.y-this.height/2-10, barWidth, barHeight);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.fillStyle = "#ff0000";
		ctx.rect(this.position.x-barWidth/2, this.position.y-this.height/2-10, healthWidth, barHeight);
		ctx.fill();

		ctx.closePath();
		ctx.restore();
	}

	/**************************
		draws the body circle
	**************************/
	this.drawBodyCircle = function(){
		this.color = this.mainColor;
		var ctx = Shooter.context;

		ctx.save();
		ctx.beginPath();
		//ctx.strokeStyle = (this.isColliding) ? this.collidingColor : this.color;
		ctx.fillStyle = this.color;
		ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
		ctx.stroke();

		ctx.fill();

		ctx.closePath();
		ctx.restore();
	}

	/**************************
		draws the body rect
	**************************/
	this.drawBodyRect = function(){
		var ctx = Shooter.context;
		var rectOne = new Geometry.rect(this.position.x-this.width/2, this.position.y-this.height/2, this.width, this.height);

		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle = this.rectColor;
		ctx.rect(rectOne.x, rectOne.y, rectOne.w, rectOne.h);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}

	/**************************
		draws the forward vector
	**************************/
	this.drawForwardVector = function(){
		var ctx = Shooter.context;

		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "#f00050";
		ctx.strokeStyle = "#f00050";
		ctx.moveTo(this.position.x, this.position.y);
		ctx.lineTo(this.position.x + this.forwardVector.x*50, this.position.y + this.forwardVector.y*50);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}

	/**************************
		draws the range circle
	**************************/
	this.drawRange = function(){
		var ctx = Shooter.context;

		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle = "#0050f0";
		ctx.arc(this.position.x, this.position.y, this.range, 0, Math.PI * 2);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}
	
	/**************************
		draws the velocity vector
	**************************/
	this.drawVelocity = function(){
		var ctx = Shooter.context;

		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "#0050f0";
		ctx.strokeStyle = "#0050f0";
		ctx.moveTo(this.position.x, this.position.y);
		ctx.lineTo(this.position.x + this.velocity.x*10, this.position.y + this.velocity.y*10);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}

	/**************************
		draws the main debug methods
	**************************/
	this.drawMainDebug = function(){
		this.drawBodyRect();
		
		//this.drawRange();	
		//this.drawForwardVector();
		//this.drawVelocity();
	}

	/**************************
		main hitman draw method
	**************************/
	this.hitmanDraw = function(){
		this.drawBodyCircle();
		
		if(drawForwardLine){
			this.forwardLine.draw()
		}

		this.drawHealthBar();
	}

	/**************************
		main hitman update method
	**************************/
	this.hitmanUpdate = function(){
		// set position
		this.setPosition();

		// set forward line
		this.setForwardLine();

		// ray cast to all objects and get hit object
		this.rayToAll();

		// set forward line color
		this.setForwardLineColor();
	}

	/**************************
		late update hitman method
	**************************/
	this.hitmanLateUpdate = function(){
		// parent method
		//this.checkHealth();
		this.isFiring = false;
	}
}