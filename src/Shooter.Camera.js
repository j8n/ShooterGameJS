

"use strict";
Shooter.Camera = function (canvas, options){
	// @Arguments 
	var canvas = canvas;
	var options = options || {};

	// @Variables
	var pixelMultiplier = 1;

	// @Properties
	var self = this;
	this.options = options;
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	this.width = canvas.width;
	this.height = canvas.height;
	this.position = {x: 0, y: 0};
	this.center = {x: 0, y: 0};
	this.realWidth = this.width;
	this.realHeight = this.height;
	this.translateSpeed = this.options.translateSpeed || 10;
	this.zoomInFactor = 2;
	this.zoomOutFactor = 0.5;
	this.zoomMax = Shooter.cameraMaxZoom;
	this.zoomMin = Shooter.cameraMinZoom;
	this.currentScale = 1;
	this.target = null;

	//**************************/
	//**************************/

	// set dimensions
	function setDimensions(){
		self.realWidth = self.width/self.currentScale;
		self.realHeight = self.height/self.currentScale;
	}

	// set center
	function setCenter(){
		self.center.x = self.position.x + self.realWidth*0.5;
		self.center.y = self.position.y + self.realHeight*0.5;
	}

	// set position
	function setPosition(x, y){
		self.position.x += (-x);
		self.position.y += (-y);
	}

	function goTo(x, y){
		var x = self.position.x - x;
		var y = self.position.y - y;
		translate(x, y);
	}

	function setScale(scale){
		var centerx = self.center.x;
		var centery = self.center.y;
		var px = self.position.x;
		var py = self.position.y;
		self.currentScale *= scale;
		goTo(0,0);
		self.ctx.scale(scale, scale);
		setDimensions();
		self.centerTo(centerx, centery);
	}

	function translate(x, y){
		self.ctx.translate(x, y);
		setPosition(x, y);
		setDimensions();
		setCenter();
	}

	this.centerTo = function(x, y){
		var x = this.position.x - x + this.realWidth/2;
		var y = this.position.y - y + this.realHeight/2;
		translate(x, y);
	}

	this.move = function(x, y){
		this.unsetTarget();
		translate(-x, -y);
	}

	this.zoomIn = function(){
		if(Shooter.enableZoomLimit){
			if(this.currentScale >= this.zoomMax){
				return;
			}
		}
		setScale(this.zoomInFactor);
	}

	this.zoomOut = function(){
		if(Shooter.enableZoomLimit){
			if(this.currentScale <= this.zoomMin){
				return;
			}
		}
		setScale(this.zoomOutFactor);
	}

	this.setTarget = function(object){
		this.target = object;
	}

	this.unsetTarget = function(){
		this.target = null;
	}

	this.followTarget = function(){
		if(this.target === null || this.target === undefined){return}
		this.centerTo(this.target.position.x, this.target.position.y);	
	}

	this.clear = function(){
		this.ctx.clearRect(this.position.x, this.position.y, this.realWidth, this.realHeight);
	}

	this.render = function(){
		this.clear();

		this.ctx.beginPath();
		this.ctx.fillStyle = "#d0d0c0";
		this.ctx.rect(0, 0, this.width, this.height);
		this.ctx.fill();
		this.ctx.closePath();
		
		for(var i=0; i<Shooter.gameObjectsList.length; i++){
			Shooter.gameObjectsList[i].draw(this.ctx);
		}

		if(Shooter.debugAll){
			//this.debugDraw();
		}		
	}

	function control(){
		var dx = 0;
		var dy = 0;

		if(Input.UP.isDown){
			dy = -self.translateSpeed/self.currentScale;
			self.move(dx, dy);
		}
		if(Input.DOWN.isDown){
			dy = self.translateSpeed/self.currentScale;
			self.move(dx, dy);
		}
		if(Input.LEFT.isDown){
			dx = -self.translateSpeed/self.currentScale;
			self.move(dx, dy);
		}
		if(Input.RIGHT.isDown){
			dx = self.translateSpeed/self.currentScale;
			self.move(dx, dy);
		}
	}

	this.debugDraw = function(){
		// center
		this.ctx.beginPath();
		this.ctx.fillStyle = "red";
		this.ctx.arc(this.center.x, this.center.y, 2.5, 0, Math.PI * 2);
		this.ctx.fill();
		this.ctx.closePath();
	}

	// camera update
	this.update = function(){
		control();
		//this.followTarget();
	}
};