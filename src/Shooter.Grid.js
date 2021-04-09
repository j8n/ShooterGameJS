Shooter.Grid = (function(){

	var Grid = {
		gridList: [],
		hasDrawn: false,
		nodesDistance: Shooter.mapBoxSide,
		boxWidth: 0,
		boxHeight: 0,
	};

	Grid.Node = function(x,y){
		// constant values
		this.x = x;
		this.y = y;
		this.isWalkable = true;

		// path finder values
		this.closed = false;
		this.parent = null;
		this.gScore = 0; // distance from parent
		this.hScore; // distance from goal , (default = manhattan Heuristic);
		this.fScore; // g+h
		this.weight = 1;
		this.strokeColor = "#b0b0b0";
		this.color = "transparent";

		this.isIn = function(array){
			for(var i=0;i<array.length;i++){
				if(this.x == array[i].x && this.y == array[i].y){
					return true;
				}
			}
			return false;
		}

		this.reset = function(){
			this.closed = false;
			this.parent = null;
			this.gScore = 0;
			this.hScore = 0;
			this.fScore = 0;
			this.weight = 1;
		}
	}


	Grid.toGrid = function(v){
		return Shooter.Lib.Calculator.roundToNearest(v, Shooter.mapBoxSide);
	}

	Grid.getNode = function(x, y){
		for(var i=0; i<Grid.gridList.length; i++){
			var n = Grid.gridList[i];
			if(n.x === x && n.y === y ){
				return n;
			}
		}
	}

	Grid.resetNodes = function(){
		for(var i=0; i<Grid.gridList.length; i++){
			var n = Grid.gridList[i];
			n.reset();
		}
	}

	// set Grid
	Grid.set = function(){
		Grid.gridList = [];
		
		var side = Grid.nodesDistance;

		for(var w=0; w<Shooter.boxWidth+1; w++){
			for(var h=0; h<Shooter.boxHeight+1; h++){
				var node = new Grid.Node(w*side, h*side);
				node.isWalkable = true;
				node.strokeColor = "#b0b0b0";
				node.color = "transparent";
				
				Grid.gridList.push(node);
			}
		}

		Grid.setNonWalkableNodes();

		var nonWalkableNodes = Shooter.getNodesWalkableOrNot(false);
		var walkableNodes = Shooter.getNodesWalkableOrNot(true);

		console.log(Grid.gridList);
	}

	Grid.resetNodesColor = function(){
		Shooter.Utils.forEach(Grid.gridList, function(o, i){
			o.color = o.strokeColor;
		});
	}

	Grid.drawMapGrid = function(){
		if(!Shooter.drawGrid){
			return;
		}
		if(Grid.hasDrawn){
			Shooter.context.drawImage(Shooter.gridCanvas, 0, 0);
			return;
		}

		var side = Shooter.mapBoxSide;
		var ctx = Shooter.gridCanvasContext;

		//ctx.save();
		Shooter.Utils.forEach(Grid.gridList, function(o, i){
			var node = o;
			ctx.beginPath();
			ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
			//ctx.strokeStyle = node.isWalkable ? "#909090" : "#101010" ;
			//ctx.strokeStyle = node.strokeColor;
			//ctx.stroke();

			ctx.fillStyle = node.color;
			ctx.fill();

			ctx.closePath();
		});

		Shooter.context.drawImage(Shooter.gridCanvas, 0, 0);
		//ctx.restore();
		//Grid.hasDrawn = true;
	}

	Grid.setNonWalkableNodes = function(){
		var objectsThatNonWalkable = Shooter.Utils.getNonWalkableObjects();

		Shooter.Utils.forEach(Grid.gridList, function(o, i){
			var node = o;
			var point = new Shooter.Geometry.point(node.x, node.y);

			Shooter.Utils.forEach(objectsThatNonWalkable, function(o, i){
				var o = o;

				var rect = new Shooter.Geometry.rect(o.position.x, o.position.y, o.width, o.height)

				if(Shooter.Physics.pointInRectCollision(point, rect)){
					node.isWalkable = false;
				}
			});
		});
	}

	Shooter.getNodesWalkableOrNot = function(walkable){
		// true: walkable
		// false: !walkable
		var walkable = walkable;
		var ar = [];

		Shooter.Utils.forEach(Grid.gridList, function(o, i){
			var n = o;

			if(n.isWalkable && walkable){
				ar.push(n);
			}else if(!n.isWalkable && !walkable){
				ar.push(n);
			}
		});

		return ar;
	}

	/*
	Grid.setMapGrid = function(){
		var side = Shooter.nodesDistance;

		for(var w=0; w<this.boxWidth+1; w++){
			for(var h=0; h<this.boxHeight+1; h++){
				var node = {
					x: w*side,
					y: h*side,
					isWalkable: true,
				};
				Shooter.Grid.gridList.push(node);
			}
		}
		
		var nonWalkableObjects = Shooter.setNonWalkableNodes();
		console.log("non walkable objects: ");
		console.log(nonWalkableObjects);
		var nonWalkableNodes = Shooter.getNonWalkableNodes();
		console.log("non walkable nodes: ");
		console.log(nonWalkableNodes);
	}
	*/

	return Grid;

})();