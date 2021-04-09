
Shooter.HealthCrate = function(x, y){
	// @Arguments 
	var x = x;
	var y = y;

	// @Variables
	var side = Shooter.mapBoxSide;

	// @Inheritance
	Shooter.Box.call(this, x, y, side, side);

	// @Properties
	this.type = "HealthCrate";
	this.color = "#0050f0";
	this.healthBonus = Shooter.Data.HealthCrate.healthBonus;
	this.image = Shooter.healthCrateImage;
	this.canBeHit = false;

	// @Methods
	this.giveHealthBonusTo = function(Hitman){
		// If hitman has max health return
		if(Hitman.health >= Hitman.healthMax){
			return false;
		}

		// add health bonus
		Hitman.health += this.healthBonus;

		// and if health is bigger than max health set it to the max value
		if(Hitman.health > Hitman.healthMax){
			Hitman.health = Hitman.healthMax;
		}

		// destroy this health crate and if ok return true
		if(this.destroy()){
			return true;
		}
	}

	/*******************
		main object draw method
	*******************/
	this.draw = function(ctx){
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = this.color;
		//ctx.rect(this.position.x-this.width/2, this.position.y-this.height/2, this.width, this.height);
		ctx.rect(this.position.x, this.position.y, this.width, this.height);
		//ctx.drawImage(this.image, this.position.x-this.width/2, this.position.y-this.height/2, this.width, this.height);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}

}