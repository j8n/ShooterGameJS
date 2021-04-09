
Shooter.Crate = function(x, y, width, height){
	// @Arguments
	var x = x;
	var y = y;
	var width = width;
	var height = height;

	// @Inheritance
	Shooter.Box.call(this, x, y, width, height);

	// @Variables
	var Vector2 = Shooter.Lib.Vector2;

	// @Data

	// @Vectors
	this.position = new Vector2(x, y);

	// @Properties
	this.width = width;
	this.height = (height === undefined) ? this.width : height;
	this.type = "Crate";
	this.rect = new Shooter.Geometry.rect(this.position.x, this.position.y, this.width, this.height);
	this.vertices = Shooter.Lib.Calculator.getRectVertices(this.rect);
	this.edges = Shooter.Lib.Calculator.getRectEdges(this.rect);
	this.color = "#909090";
	this.isWalkable = false;
	this.canBeHit = true;

	// @Object instances

	// @Methods
	/**************************
		updates the gameobject
		called every frame
	**************************/
	this.update = function(){
		this.checkHealth();
	}

	/**************************
		object main draw method
	**************************/
	this.draw = function(ctx){
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = this.color;
		//ctx.rect(this.position.x-this.width/2, this.position.y-this.height/2, this.width, this.height);
		ctx.rect(this.position.x, this.position.y, this.width, this.height);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}

}