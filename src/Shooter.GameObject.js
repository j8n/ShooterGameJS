Shooter.GameObject = function(x, y, direction){
	// push in array
	Shooter.gameObjectsList.push(this);

	// @Properties
	this.type = "gameObject";
	this.healthMax = Infinity;
	this.health = this.healthMax;
	this.isWalkable = true;
	this.canBeHit = false;

	// @Methods
	/**************************
		destroys object
	**************************/
	this.destroy = function(){
		if(Shooter.gameObjectsList.length <= 0){
			throw Error("error deleting object! instance does not exist in list!");
		}
		var i = this.getListNumber();

		if(i === -1){
			throw Error("Error deleting object! Undefined index (return value: -1)");
		}
		
		Shooter.gameObjectsList.splice(i, 1);
		//console.log("object destroyed");
		return true;
	}

	/**************************
		return the index of this object in the gameobject list!
	**************************/
	this.getListNumber = function(){
		var i = Shooter.gameObjectsList.indexOf(this);
		//console.log(i);
		if(i > -1 ){
			return i;
		}else{
			return -1;
		}
	}

	/************************** 
		get hit by damage
		@Param {Int} damage
		@Param {Hitman} hitman
	**************************/
	this.getHit = function(damage, hitman){
		this.health -= damage;
		if(this.checkHealth()){
			hitman.enemiesKilled ++;
		}
	}

	/**************************
		checks health
	**************************/
	this.checkHealth = function(){
		if(this.health <= 0){
			this.die();
			return true
		}else{
			return false;
		}
	}

	/**************************
		destroys object
		Method is been overriden in Shooter.Player
	**************************/
	this.die = function(){
		//Shooter.player.enemiesKilledList.push(this);
		this.destroy();
	}

}