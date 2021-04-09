Shooter.Utils = (function(){
	
	var Utils = {

	}

	Utils.forAllObjectsDo = function(func){
		if(Shooter.gameObjectsList.length <= 0){
			return;
		}
		for(var i=0; i<Shooter.gameObjectsList.length; i++){
			var o = Shooter.gameObjectsList[i];
			func(o, i);
		}
	}

	Utils.forEach = function(array, func){
		if(array.length <= 0){
			return -1;
		}
		for(var i=0; i<array.length; i++){
			var o = array[i];
			func(o, i);
		}
	}

	Utils.getEnemiesList = function(){
		var ar = [];
		Utils.forAllObjectsDo(function(o, i){
			if(o.type === "Enemy"){
				ar.push(o);
			}
		});

		return ar;
	}

	Utils.getHealthCratesList = function(){
		var ar = [];
		Utils.forAllObjectsDo(function(o, i){
			var o = o;
			if(o.type === "HealthCrate"){
				ar.push(o);
			}
		});

		return ar;
	}

	Utils.getCratesList = function(){
		var ar = [];
		Utils.forAllObjectsDo(function(o, i){
			var o = o;
			if(o.type === "Crate"){
				ar.push(o);
			}
		});

		return ar;
	}

	Utils.getObstaclesList = function(){
		var ar = [];
		Utils.forAllObjectsDo(function(o, i){
			var o = o;
			if(!o.isWalkable){
				ar.push(o);
			}
		});

		return ar;
	}

	Utils.getNonWalkableObjects = function(){
		var ar = [];
		Utils.forAllObjectsDo(function(o, i){
			if(!o.isWalkable){
				ar.push(o);
			}
		});

		return ar;
	}

	return Utils;
	
})();