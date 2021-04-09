Shooter.AI.PathModeller = function(pathFinder){
	this.pathFinder = pathFinder;
	this.mapBoxes = this.pathFinder.mapBoxes;

	this.drawPath = function(path){
		var ctx = Shooter.context;
		if(this.pathFinder.path.length <= 0){
			return;
		}
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(this.pathFinder.path[0][0], this.pathFinder.path[0][1]);
		for(var i=1; i<this.pathFinder.path.length; i++){
			var mapBox = this.pathFinder.path[i];
			
			ctx.lineTo(mapBox[0], mapBox[1]);
		}
		ctx.strokeStyle = "#00a080";
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}	

}