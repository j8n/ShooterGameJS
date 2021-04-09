Shooter.Projectile = function(x, y, direction, hitman){
	// @Arguments
	var x = x;
	var y = y;
	var direction = direction;
	var hitman = hitman;

	// @Inheritance
	Shooter.GameObject.call(this);

	// @Variables
	var self = this;
	var Vector2 = Shooter.Lib.Vector2;
	var Physics = Shooter.Physics;
	var Geometry = Shooter.Geometry;

	// @Vectors
	this.direction = direction;
	this.position = new Vector2(x, y);
	this.velocity = new Vector2(0, 0);

	// @Properties
	this.radius = Shooter.Data.Projectile.radius;
	this.speed = Shooter.Data.Projectile.speed;
	this.damage = Shooter.Data.Projectile.damage;
	this.color = Shooter.Data.Projectile.color;
	this.type = "Projectile";
	this.hitman = hitman;

	// @Initialization
	this.velocity.x = this.direction.x * this.speed // / (Shooter.Time.deltaTime/100);
	this.velocity.y = this.direction.y * this.speed // / (Shooter.Time.deltaTime/100);

	// @Methods
	this.hitObjects = function(){
		var circle = new Geometry.circle(this.position.x, this.position.y, 0.5);

		for(var i=0; i<Shooter.gameObjectsList.length; i++){
			var o = Shooter.gameObjectsList[i];

			if(o.canBeHit){
				if(o.type === "Player" || o.type === "Enemy"){
					var circeTwo = new Geometry.circle(o.position.x, o.position.y, o.radius);

					if(Physics.circeInCircleCollision(circle, circeTwo)){
						o.getHit(this.damage, this.hitman);
						this.destroy();
						return;
					}
				}else if(o.type === "Crate"){
					//var rectTwo = new Physics.rect(o.position.x-o.width/2, o.position.y-o.height/2, o.width, o.height);
					var rectTwo = new Geometry.rect(o.position.x, o.position.y, o.width, o.height);
					//console.log(rectTwo);
					if(Physics.circleInRectCollision(circle, rectTwo)){
						this.destroy();
						return;
					}
				}else if(o.type === "Projectile"){
					
				}else{

				}
			}else{
				// objetc cannot be hit by bullet
			}
		}
	}

	this.setPosition = function(){
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}

	this.update = function(){
		this.setPosition();
		this.hitObjects();
	}

	this.draw = function(ctx){
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}

	this.destroyAfterTime = function(){
		setTimeout(function(){
			self.destroy();
		}, 8000);
	}
	
	//this.destroyAfterTime();
}