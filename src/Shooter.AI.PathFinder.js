Shooter.AI.PathFinder = (function(){

	// @Variables

	// @Methods
	function getChebyshevDistance(pointOne, pointTwo){
		var dx = Math.abs(pointTwo.x - pointOne.x);
		var dy = Math.abs(pointTwo.y - pointOne.y);
		return Math.max(dx, dy);
	}

	function getEuclideanDistance(pointOne, pointTwo){
		var dx = pointOne.x - pointTwo.x;
		var dy = pointOne.y - pointTwo.y;
		return Math.sqrt( dx * dx + dy * dy );
	}

	function getManhattanDistance(pointOne, pointTwo){
		var dx = pointOne.x - pointTwo.x;
		var dy = pointOne.y - pointTwo.y;
		return Math.abs(dx + dy);
	}

	function PathFinder(gridArray){
		var self = this;
		this.Nodes = gridArray;
		this.path = [];

		this.getNeighbors = function(parent){
			var top = Shooter.Grid.getNode(parent.x, parent.y- Shooter.mapBoxSide);
			var topRight = Shooter.Grid.getNode(parent.x+ Shooter.mapBoxSide, parent.y- Shooter.mapBoxSide);
			var right = Shooter.Grid.getNode(parent.x+ Shooter.mapBoxSide, parent.y);
			var rightBottom = Shooter.Grid.getNode(parent.x+ Shooter.mapBoxSide, parent.y+ Shooter.mapBoxSide);
			var bottom = Shooter.Grid.getNode(parent.x, parent.y+ Shooter.mapBoxSide);
			var bottomLeft = Shooter.Grid.getNode(parent.x- Shooter.mapBoxSide, parent.y+ Shooter.mapBoxSide);
			var left = Shooter.Grid.getNode(parent.x- Shooter.mapBoxSide, parent.y);
			var leftTop = Shooter.Grid.getNode(parent.x- Shooter.mapBoxSide, parent.y- Shooter.mapBoxSide);
			return [top, topRight, right, rightBottom, bottom, bottomLeft, left, leftTop];
		}

		this.changeToNodesPath = function(path){
			var nodePath = [];
			for(var i=0;i<path.length;i++){
				var pathNode = path[i];
				var node = this.getNode[pathNode[0], pathNode[1]];
				nodePath.push(node);
			}
			return nodePath;
		}

		this.reversePath = function(path){
			var pathReversed = [];
			for(var i=path.length-1;i>=0; i--){
				pathReversed.push(path[i]);
			}
			return pathReversed;
		}

		this.buildPath = function(endnode){
			var node;
			var path = [];
			path.push([endnode.x, endnode.y]);

			node = endnode;
			while(node.parent){
				node = node.parent;
				path.push([node.x, node.y]);

			}
			path = this.reversePath(path);
			//console.group("path");
			//console.log(path);
			//console.groupEnd();
			return path;
		}

		this.DijkstraFind = function(start, goal, pathNodesToFind){
			Shooter.Grid.resetNodesColor();
			Shooter.Grid.resetNodes();

			var pathNodesToFind = pathNodesToFind;

			var startingNode = Shooter.Grid.getNode(start[0], start[1]);
			var goalNode = Shooter.Grid.getNode(goal[0], goal[1]);

			startingNode.color = "#000000";

			//console.log("starting node");
			//console.log(startingNode);
			var OpenList = [];
			var ClosedList = [];

			//var startGridNode = Shooter.Grid.getNode(start[0], start[1]);
			//
			OpenList.push(startingNode);
			startingNode.closed = true;
			startingNode.gScore = 0;
			startingNode.fScore = 0;
			//startingNode.distanceFromGoal = getChebyshevDistance(startingNode, goalNode);

			//this.showNodeOnMap(startingNode,"#40f080");
			//this.showNodeOnMap(goalNode,"#ff00c0");
			//console.log(this.Nodes);
			var inc = 0;
			var pathNodesFound = 0;

			while(OpenList.length != 0){
				
				inc++;

				OpenList.sort(function(a, b){
					return a.gScore - b.gScore;
				});
				currentNode = OpenList.shift();
				//this.map.getBoxAt(currentNode).elem.innerHTML = currentNode.gScore;

				if(!currentNode.isWalkable){
					continue;
				}
				if(currentNode === goalNode){
					var path = this.buildPath(goalNode);
					return path;
				}
				currentNode.closed = true;
				var currentNeighbors = this.getNeighbors(currentNode);

				var currentGridNode = Shooter.Grid.getNode(currentNode.x, currentNode.y);
				currentGridNode.color = "#207020";


				for(var i=0;i<currentNeighbors.length;i++){
					var neighbor = currentNeighbors[i];
					if(neighbor != null){
						if(neighbor.isWalkable){
							if(neighbor.closed){
								continue;
							}
							
							// manhattan
							// + ( (neighbor.x - currentNode.x === 0 || neighbor.y - currentNode.y === 0) ? 10 : 14 )
							// just checking if diagonal
							// if diagonal set bigger score
							
							var ng;
							if(currentNode.x == neighbor.x || currentNode.y == neighbor.y){
								ng = currentNode.gScore + 1;
							}else{
								ng = currentNode.gScore + Math.sqrt(2);
							}

							if(!neighbor.closed || ng < neighbor.gScore){

								ClosedList.push(currentNode);
								neighbor.gScore = ng;
								neighbor.hScore = 10 * (getEuclideanDistance(neighbor, goalNode));

								neighbor.fScore = neighbor.gScore + neighbor.hScore;

								neighbor.parent = currentNode;

								OpenList.push(neighbor);
								neighbor.closed = true;
								//this.showNodeOnMap(neighbor,"#00f070");
								//console.log(inc);
							}
						}else{
							continue;
						}
					}
				}// end for loop neighbors
				//this.showNodeOnMap(goalNode,"#ff00f0");
			}

			return [];
			//console.log(this.Nodes);
		}

		this.FindPath = function(start_, goal_, pathNodesToFind){
			var pathNodesToFind = pathNodesToFind || Infinity;
			//this.createNodes();

			var startX = Shooter.Grid.toGrid(start_.x);
			var startY = Shooter.Grid.toGrid(start_.y);
			var endX = Shooter.Grid.toGrid(goal_.x);
			var endY = Shooter.Grid.toGrid(goal_.y);

			var start = [startX, startY];
			var goal = [endX, endY];

			this.path = this.DijkstraFind(start, goal, pathNodesToFind);

			return this.path;

			//var start = [start_.x, start_.y];
			//var goal = [goal_.x, goal_.y];
			//this.path = this.DijkstraFind(start, goal);
			//console.log(this.path);
			//return this.path;
		}
		
	}

	return PathFinder;

})();