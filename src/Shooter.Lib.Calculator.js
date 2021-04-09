
Shooter.Lib.Calculator = (function(){
	// --------------------
	var Calculator = {

	}

	Calculator.calcAngle = function(x1, y1, x2, y2){
		var angle = Math.atan2((y2-y1),(x2-x1));
		return angle;
	}

	// --------------------
	Calculator.degreesToRadians = function(degrees){
		var radians = degrees * (Math.PI/180);
		return radians;
	}

	// --------------------
	Calculator.radiansToDegrees = function(radians){
		var degrees = radians * (180/Math.PI);
		return degrees;
	}

	// --------------------
	Calculator.getVectorsXY = function(vector, radians){
		var x = vector * (Math.cos(radians));
		var y = vector * (Math.sin(radians));
		return [x,y];
	}

	Calculator.getDistance = function(x1, y1, x2, y2){
		var distanceX = x2 - x1;
		var distanceY = y2 - y1;
		var distance = Math.sqrt(distanceX*distanceX + distanceY*distanceY);
		return distance;
	}

	Calculator.randomNumberBetween = function(min, max){
		return Math.floor((Math.random() * max) + min);
	}

	Calculator.roundToNearest = function(v, inc){
		return Math.round(v/inc)*inc;
	}

	Calculator.floorToNearest = function(v, inc){
		return Math.floor(v/inc)*inc;
	}

	Calculator.ceilToNearest = function(v, inc){
		return Math.ceil(v/inc)*inc;
	}

	Calculator.numberInBetween = function(n, smaller, bigger){
		if(n === NaN || smaller === NaN || bigger === NaN){
			throw Error("parameters must be numbers");
		}

		if(smaller <= n && n <= bigger){
			return true;
		}
		return false;
	}

	Calculator.getCoordNeighbors = function(x, y, side){
		if(side === undefined){
			return [
				[x, 		y-1],
				[x+1, 		y-1],
				[x+1, 		y],
				[x+1, 		y+1],
				[x, 		y+1],
				[x-1,	 	y+1],
				[x-1, 		y],
				[x-1, 		y-1],
			];
		}else{
			return [
				[(x)*side, 			(y-1)*side],
				[(x+1)*side, 		(y-1)*side],
				[(x+1)*side, 		(y)*side],
				[(x+1)*side, 		(y+1)*side],
				[(x)*side, 			(y+1)*side],
				[(x-1)*side,	 	(y+1)*side],
				[(x-1)*side, 		(y)*side],
				[(x-1)*side, 		(y-1)*side],
			];
		}
	}

	// testing needed!!!
	/********************/
	Calculator.linearInterpolationOf = function(vectorOne, vectorTwo, x){
		return (vectorOne.y + (x - vectorOne.x) * (vectorTwo.y - vectorOne.y) / (vectorTwo.x -vectorOne.x));
	}

	Calculator.getRectVertices = function(rect){
		var Point = Shooter.Geometry.point;

		var vertices = [];

		var topLeft = new Point(rect.x, rect.y);
		var topRight = new Point(rect.x + rect.w, rect.y);
		var bottomRight = new Point(rect.x + rect.w, rect.y + rect.h);
		var bottomLeft = new Point(rect.x, rect.y + rect.h);


		vertices = [topLeft, topRight, bottomRight, bottomLeft];
		return vertices;
	}

	Calculator.getRectEdges = function(rect){
		var Line = Shooter.Geometry.line;
		var vertices = Calculator.getRectVertices(rect);

		//console.log("vertices in getRectEdges method");
		//console.log(vertices);

		var edgeTop = new Line(vertices[0], vertices[1]);
		var edgeRight = new Line(vertices[1], vertices[2]);
		var edgeBottom = new Line(vertices[2], vertices[3]);
		var edgeLeft = new Line(vertices[3], vertices[0]);

		var edges = [edgeTop, edgeRight, edgeBottom, edgeLeft];
		//console.log("edges in getRectEdges method");
		//console.log(edges);

		return edges;
	}

	return Calculator;

})();
