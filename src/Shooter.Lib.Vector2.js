Shooter.Lib.Vector2 = (function (){

	var Vector2 = function(x, y){
		this.x = x === undefined ? 0 : x;
		this.y = y === undefined ? 0 : y;
	}

	Vector2.prototype.add = function(vector){
		this.x = this.x + vector.x;
		this.y = this.y + vector.y;
	}

	Vector2.prototype.subtract = function(vector){
		this.x = this.x - vector.x;
		this.y = this.y - vector.y;
	}

	Vector2.prototype.multiply = function(value){
		this.x = this.x * value;
		this.y = this.y * value;
	}

	Vector2.prototype.divide = function(value){
		this.x = this.x / value;
		this.y = this.y / value;
	}

	Vector2.prototype.getMagnitude = function(){
		return Math.sqrt(this.x*this.x + this.y*this.y);
	}

	Vector2.prototype.normalize = function(){
		var m = this.getMagnitude();
		if(m === 0){return;}
		this.divide(m);
	}

	Vector2.prototype.getAngle = function(){
		return Math.atan(this.y / this.x);
	}

	Vector2.prototype.getDegreesAngle = function(){
		return (Math.atan(this.y / this.x) * 180/Math.PI);
	}

	Vector2.prototype.setToZero = function(){
		this.x = 0;
		this.y = 0;
	}

	Vector2.prototype.reversed = function(){
		this.x = -this.x;
		this.y = -this.y;
	}

	Vector2.prototype.rotate = function(radians){
		this.x = this.x * Math.cos(-Math.PI/2) - this.y * Math.sin(-Math.PI/2);
		this.y = this.x * Math.sin(-Math.PI/2) + this.y * Math.cos(-Math.PI/2);
	}

	Vector2.getAngleBetween = function(vectorOne, vectorTwo){
		return Math.atan2((vectorTwo.y - vectorOne.y),(vectorTwo.x - vectorOne.x))
	}

	Vector2.rotate = function(vector, radians){
		var x = vector.x * Math.cos(radians) - vector.y * Math.sin(radians);
		var y = vector.x * Math.sin(radians) + vector.y * Math.cos(radians);
		return new Vector2(x, y);
	}

	Vector2.subtract = function(vectorOne, vectorTwo){
		var x = vectorOne.x - vectorTwo.x;
		var y = vectorOne.y - vectorTwo.y;
		return new Vector2(x, y);
	}

	Vector2.add = function(vectorOne, vectorTwo){
		var x = vectorOne.x + vectorTwo.x;
		var y = vectorOne.y + vectorTwo.y;
		return new Vector2(x, y);
	}

	Vector2.multiply = function(vectorOne, valueOrVector){
		var x;
		var y;

		if(valueOrVector instanceof Vector2){
			var n = Vector2.dotProduct(vectorOne, valueOrVector);
			return n;
		}

		x = vectorOne.x * valueOrVector;
		y = vectorOne.y * valueOrVector;
		return new Vector2(x, y);
	}

	Vector2.divide = function(vectorOne, valueOrVector){
		var x;
		var y;

		if(valueOrVector === NaN){
			throw Error("value is no a number");
			return;
		}

		if(valueOrVector === null){
			throw Error("value is null");
			return;
		}

		if(valueOrVector instanceof Vector2){
			x = vectorOne.x / valueOrVector.x;
			y = vectorOne.y / valueOrVector.y;
			return new Vector2(x, y);
		}

		x = vectorOne.x / valueOrVector;
		y = vectorOne.y / valueOrVector;
		return new Vector2(x, y);
	}

	Vector2.copy = function(vector){
		return new Vector2(vector.x, vector.y);
	}

	Vector2.normalize = function(vector){
		var v = Vector2.copy(vector); 
		v.normalize();

		var x = v.x;
		var y = v.y;

		return new Vector2(x, y);
	}

	Vector2.getDistance = function(vectorOne, vectorTwo){
		var dx = vectorOne.x - vectorTwo.x;
		var dy = vectorOne.y - vectorTwo.y;
		var d = Math.sqrt(dx * dx + dy * dy);
		return d;
	}

	Vector2.dotProduct = function(vectorOne, vectorTwo){
		return (vectorOne.x * vectorTwo.x + vectorOne.y * vectorTwo.y);
	}

	Vector2.crossProduct = function(vectorOne, vectorTwo){
		return (vectorOne.x * vectorTwo.y - vectorOne.y * vectorTwo.x);
	}

	return Vector2;

})();
