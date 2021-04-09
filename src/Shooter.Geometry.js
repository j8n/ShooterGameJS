Shooter.Geometry = (function(){

	var Geometry = {

	}

	Geometry.Shape = function(){

	}

	// Constructors
	Geometry.rect = function(x,y,w,h){
		Geometry.Shape.call(this);
		
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	Geometry.circle = function(x,y,r){
		Geometry.Shape.call(this);

		this.x = x;
		this.y = y;
		this.r = r;
	}

	Geometry.point = function(x, y){
		Geometry.Shape.call(this);

		this.x = x;
		this.y = y;
	}

	Geometry.line = function(pointOne, pointTwo){
		Geometry.Shape.call(this);

		this.p1 = pointOne;
		this.p2 = pointTwo;
	}
	
	return Geometry;

})();