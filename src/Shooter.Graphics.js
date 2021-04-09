Shooter.Graphics = (function(){

	var Graphics = {
		list: [],
	}

	Graphics.Graphic = function(){
		this.color = "#909090";
	}

	Graphics.Point = function(x, y){
		// @Arguments
		var x = x;
		var y = y;

		// @Inheritance
		Shooter.Geometry.point.call(this, x, y);
		Graphics.Graphic.call(this);

		// @Methods
		this.draw = function(){
			//console.log(this);
			Shooter.context.save();
			Shooter.context.beginPath();
			Shooter.context.strokeStyle = this.color;
			Shooter.context.arc(this.x, this.y, 1, 0, Math.PI * 2);
			Shooter.context.stroke();
			Shooter.context.closePath();
			Shooter.context.restore();
		}
	}

	Graphics.Line = function(pointOne, pointTwo){
		// @Arguments
		var p1 = pointOne;
		var p2 = pointTwo;

		// @Inheritance
		Shooter.Geometry.line.call(this, pointOne, pointTwo);
		Graphics.Graphic.call(this);

		// @Methods
		this.draw = function(){
			//console.log(this);
			Shooter.context.save();
			Shooter.context.beginPath();
			Shooter.context.strokeStyle = this.color;
			Shooter.context.moveTo(this.p1.x, this.p1.y);
			Shooter.context.lineTo(this.p2.x, this.p2.y);
			Shooter.context.stroke();
			Shooter.context.closePath();
			Shooter.context.restore();
		}
	}

	Graphics.Rect = function(x, y, w, h){
		// @Arguments
		var x = x;
		var y = y;
		var w = w;
		var h = h;

		// @Inheritance
		Shooter.Geometry.rect.call(this, x, y, w, h);
		Graphics.Graphic.call(this);

		// @Methods
		this.draw = function(){
			//console.log(this);
			Shooter.context.save();
			Shooter.context.beginPath();
			Shooter.context.strokeStyle = this.color;
			Shooter.context.rect(this.x, this.y, this.w, this.h);
			Shooter.context.stroke();
			Shooter.context.closePath();
			Shooter.context.restore();
		}
	}

	Graphics.Circle = function(x, y, r){
		// @Arguments
		var x = x;
		var y = y;
		var r = r;

		// @Inheritance
		Shooter.Geometry.circle.call(this, x, y, r);
		Graphics.Graphic.call(this);

		// @Methods
		this.draw = function(){
			//console.log(this);
			Shooter.context.save();
			Shooter.context.beginPath();
			Shooter.context.strokeStyle = this.color;
			Shooter.context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
			Shooter.context.stroke();
			Shooter.context.closePath();
			Shooter.context.restore();
		}
	}

	return Graphics;
	
})();