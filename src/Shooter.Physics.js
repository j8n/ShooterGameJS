Shooter.Physics = (function(){

	var Physics = {

	}

	Physics.lineIntersectRect = function(line, rect){
		var line = line;
		var rect = rect;
		var rectEdges = Shooter.Lib.Calculator.getRectEdges(rect);

		for(var i=0; i<rectEdges.length; i++){
			var edge = rectEdges[i];
			if(Physics.lineIntersectLine(line, edge)){
				//console.log("ray hit object to position");
				return true;
			}else{
				continue;
			}
		}

		return false;
	}

	Physics.lineIntersectLine = function(lineOne, lineTwo){
		var q = (lineOne.p1.y - lineTwo.p1.y) * (lineTwo.p2.x - lineTwo.p1.x) - (lineOne.p1.x - lineTwo.p1.x) * (lineTwo.p2.y - lineTwo.p1.y);
		var d = (lineOne.p2.x - lineOne.p1.x) * (lineTwo.p2.y - lineTwo.p1.y) - (lineOne.p2.y - lineOne.p1.y) * (lineTwo.p2.x - lineTwo.p1.x);

		if(d === 0){
			return false;
		}

		var r = q / d;

		q = (lineOne.p1.y - lineTwo.p1.y) * (lineOne.p2.x - lineOne.p1.x) - (lineOne.p1.x - lineTwo.p1.x) * (lineOne.p2.y - lineOne.p1.y);

		var s = q / d;

		if( r < 0 || r > 1 || s < 0 || s > 1){
			return false;
		}

		return true;
	}

	// Collisions
	Physics.pointInRectCollision = function(point, rect){
		if(rect.x <= point.x && point.x <= (rect.x+rect.w) && rect.y <= point.y && point.y <= (rect.y+rect.h) ){
			return true;
		}else{
			return false;
		}
	}

	Physics.rectInRectCollision = function(rectOne, rectTwo){
		if(rectOne.x < rectTwo.x + rectTwo.w && rectOne.x + rectOne.w > rectTwo.x && rectOne.y < rectTwo.y + rectTwo.h && rectOne.w + rectOne.y > rectTwo.y) {
			return true;
		}else{
			return false;
		}
	}

	Physics.circeInCircleCollision = function(circleOne, circleTwo){
		var dx = circleOne.x - circleTwo.x;
		var dy = circleOne.y - circleTwo.y;
		var dis = Math.sqrt(dx*dx+dy*dy);
		
		if(dis <= circleOne.r+circleTwo.r){
			return true;
		}else{
			return false;
		}
	}

	Physics.circleInRectCollision = function(circle, rect){
		var disX = Math.abs(circle.x - rect.x - rect.w/2 );
		var disY = Math.abs(circle.y - rect.y - rect.h/2 );

		if(disX > ( (rect.w/2) + circle.r) ){
			return false;
		}
		if(disY > ( (rect.h/2) + circle.r )){
			return false;
		}

		if(disX <= (rect.w/2)){
			return true
		}
		if(disY <= (rect.h/2)){
			return true;
		}

		var dx = disX-rect.w/2;
		var dy = disY-rect.h/2;

		return (dx*dx+dy*dy <= (circle.r*circle.r) );
	}

	return Physics;

})();