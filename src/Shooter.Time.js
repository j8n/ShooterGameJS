Shooter.Time = (function(){

	var Time = {
		simulationTime: 1,
		fps: 0,
		FPS: 0,
		rafId: null,

		deltaTime: 0, // time between updates
		timeStamp: 0, // current timestamp
		elapsedTime: 0, // time pased since start
		lastTime: 0, // last timestamp before current update
		timeStarted: 0, // time the simulation started (set once)
		second: 0,

		deltaTimeP: 0, // printables
		timeStampP: 0, // printables
		elapsedTimeP: 0, // printables
		lastTimeP: 0, // printables
		secondP: 0,

	};

	// Reset Time
	Time.reset = function(){
		Time.simulationTime = 1;
		Time.fps = 0;
		Time.FPS = 0;
		Time.rafId = null;

		Time.deltaTime = 0; // time between updates
		Time.timeStamp = 0; // current timestamp
		Time.elapsedTime = 0; // time pased since start
		Time.lastTime = 0; // last timestamp before current update
		Time.timeStarted = 0; // time the simulation started (set once)
		Time.second = 0;

		Time.deltaTimeP = 0; // printables
		Time.timeStampP = 0; // printables
		Time.elapsedTimeP = 0; // printables
		Time.lastTimeP = 0; // printables
		Time.secondP = 0;
	}

	Time.start = function(){
		this.reset();
		this.timeStarted = Date.now();
	}

	Time.getTimeStamp = function(){
		return performance.now();
	}

	Time.stop = function(){
		window.cancelAnimationFrame(Time.rafId);
	}

	Time.restart = function(update){
		this.reset();
		Time.raf(update);
	}

	Time.raf = function(callback){
		// update
		Time.rafId = window.requestAnimationFrame(callback);

		// set time
		Time.updateTime();
	}

	Time.updateTime = function(){
		var updateEndTime = performance.now();

		this.deltaTime = updateEndTime - this.lastTime;
		this.fps = 1000 / this.deltaTime;
		this.lastTime = updateEndTime;
		this.elapsedTime += this.deltaTime;
		this.second += this.deltaTime;

		if(this.second > 50){
			this.elapsedTimeP = this.elapsedTime / 1000;
		}

		if(this.second>500){
			
		}

		if(this.second>1000){
			this.FPS = this.fps;
			
			this.deltaTimeP = this.deltaTime;
			this.timeStampP = this.timeStamp;
			
			this.lastTimeP = this.lastTime;
			this.secondP = this.second;
			
			this.second = 0;
		}
	}

	return Time;

})();