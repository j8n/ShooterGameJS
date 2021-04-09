"use strict";

Shooter.DOM = (function(){

	var DOM = {
		// @Dom elements
		startScreenElement: null,
		debugPanelOne: null,
		debugPanelTwo: null,
		gameContainer: null,
		uiPanel: null,
		playerHealthElement: null,
		playButton: null,
	}

	DOM.reset = function(){
		DOM.startScreenElement = null;
		DOM.debugPanelOne = null;
		DOM.debugPanelTwo = null;
		DOM.gameContainer = null;
		DOM.uiPanel = null;
		DOM.playerHealthElement  = null;
		DOM.playButton = null;
	}

	DOM.getElements = function(){
		DOM.debugPanelOne  = document.getElementById("debug-panel-one");
		DOM.debugPanelTwo = document.getElementById("debug-panel-two");
		DOM.uiPanel = document.getElementById("UI");
		DOM.playerHealthElement = document.getElementById("player-health-ui");
	}

	DOM.createGameContainer = function(){
		var e = document.createElement("div");
		e.style.position = "fixed";
		e.style.width = Shooter.width+"px";
		e.style.height = Shooter.height+"px";
		e.style.margin = "0 auto";
		document.body.appendChild(e);
		DOM.gameContainer = e;
		window.gameContainer = DOM.gameContainer;
		return e;
	}

	DOM.set = function(){
		
		// set width-height
		Shooter.width = window.innerWidth;
		Shooter.height = window.innerHeight;

		// get elements
		DOM.getElements();

		// create game container
		DOM.createGameContainer();

		// set body overflow to hidden
		document.body.style.overflow = "hidden";

		// set canvas and get context
		Shooter.canvas = document.createElement("canvas");
		Shooter.canvas.width = Shooter.width;
		Shooter.canvas.height = Shooter.height;
		Shooter.canvas.style.backgroundColor = "#101010";
		DOM.gameContainer.appendChild(Shooter.canvas);
		Shooter.context = Shooter.canvas.getContext("2d");

		Shooter.gridCanvas = document.createElement("canvas");
		Shooter.gridCanvas.width = Shooter.width;
		Shooter.gridCanvas.height = Shooter.height;
		DOM.gameContainer.appendChild(Shooter.gridCanvas);
		Shooter.gridCanvasContext = Shooter.gridCanvas.getContext("2d");

		Shooter.cratesCanvas = document.createElement("canvas");
		Shooter.cratesCanvas.width = Shooter.width;
		Shooter.cratesCanvas.height = Shooter.height;
		DOM.gameContainer.appendChild(Shooter.cratesCanvas);
		Shooter.cratesCanvasContext = Shooter.cratesCanvas.getContext("2d");
	}

	DOM.StartScreen = {
		elem: null,

		set: function(){
			DOM.StartScreen.elem = document.createElement("div");
			DOM.StartScreen.elem.id = "starting-screen";
			DOM.StartScreen.elem.style.position = "fixed";
			DOM.StartScreen.elem.style.top = "0";
			DOM.StartScreen.elem.style.bottom = "0";
			DOM.StartScreen.elem.style.left = "0";
			DOM.StartScreen.elem.style.right = "0";
			DOM.StartScreen.elem.style.top = "0";
			DOM.StartScreen.elem.style.textAlign = "center";
			DOM.StartScreen.elem.style.zIndex = "1000";
			DOM.StartScreen.elem.style.backgroundColor = "rgba(0, 120, 255, 0.7)";
			document.body.appendChild(DOM.StartScreen.elem);

			DOM.StartScreen.elem.onselectstart = function(e){
				e.preventDefault();
				return false;
			}

			var header = document.createElement("div");
			header.style.fontSize = "120px";
			header.style.fontWeight = "600";
			header.style.textAlign = "center";
			header.style.color = "#f0f0f0";
			header.innerHTML = "2D SHOOTER";
			DOM.StartScreen.elem.appendChild(header);

			var main = document.createElement("div");
			//main.style.border = "4px solid #f0f0f0";
			main.style.marginTop = "50px";
			main.style.textAlign = "center";
			main.style.display = "inline-block";
			main.style.width = "auto";
			main.style.padding = "25px 120px";
			main.style.fontSize = "24px";
			DOM.StartScreen.elem.appendChild(main);

			DOM.playButton = document.createElement("div");
			DOM.playButton.style.padding = "5px 50px";
			DOM.playButton.style.margin = "15px";
			DOM.playButton.style.border = "2px solid #f0f0f0";
			DOM.playButton.style.borderRadius = "2px";
			DOM.playButton.style.backgroundColor = "#f00060";
			DOM.playButton.style.fontSize = "24px";
			DOM.playButton.style.cursor = "pointer";
			DOM.playButton.style.color = "#ffffff";
			DOM.playButton.innerHTML = "Play";

			DOM.playButton.onclick = function(){
				Shooter.setup();
				DOM.StartScreen.elem.style.display = "none";
			}

			main.appendChild(DOM.playButton);
		},
	}

	return DOM;

})();