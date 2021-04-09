
(function(){
	var Input = {
		keyDown: null,

		Mouse: {
			windowX: 0,
			windowY: 0,
			gameContainerX: 0,
			gameContainerY: 0,
			canvasX: 0,
			canvasY: 0,
			worldX: 0,
			worldY: 0,

			// bools
			leftIsDown: false,
			wheelDown: false,
			rightIsDown: false,

			// methods
			onMove: null,
			onLeftDown: null,
			onRightDown: null,

			onLeftUp: null,
			onRightUp: null,

			onClick: null,
			onContextMenu: null,
		},

		Shift: {
			// properties
			keycode: "16",

			// bools 
			isDown: false,

			// methods
			down: null,
			pressed: null,
			up: null,			
		},

		Control: {
			// properties
			keycode: "17",

			// bools 
			isDown: false,

			// methods
			down: null,
			pressed: null,
			up: null,
		},

		Space: {
			// properties
			keycode: "32",

			// bools 
			isDown: false,

			// methods
			down: null,
			pressed: null,
			up: null,
			
		},

		Escape: {
			// properties
			keycode: "27",

			// bools 
			isDown: false,
			
			// methods
			down: null,
			pressed: null,
			up: null,
		},

		Enter: {
			// properties
			keycode: "13",

			// bools 
			isDown: false,

			// methods
			down: null,
			pressed: null,
			up: null,
		},



		W: {
			// properties
			keycode: "87",

			// bools 
			isDown: false,
			
			// methods
			down: null,
			pressed: null,
			up: null,
		},

		S: {
			// properties
			keycode: "83",

			// bools 
			isDown: false,
			
			// methods
			down: null,
			pressed: null,
			up: null,
		},

		A: {
			// properties
			keycode: "65",

			// bools 
			isDown: false,

			// methods
			down: null,
			pressed: null,
			up: null,
		},

		D: {
			// properties
			keycode: "68",
			
			// bools 
			isDown: false,

			// methods
			down: null,
			pressed: null,
			up: null,
		},

		UP: {
			// properties
			keycode: "38",

			// bools 
			isDown: false,

			// methods
			down: null,
			pressed: null,
			up: null,
		},

		DOWN: {
			// properties
			keycode: "40",

			// bools 
			isDown: false,

			// methods
			down: null,
			pressed: null,
			up: null,
		},

		LEFT: {
			// properties
			keycode: "37",

			// bools 
			isDown: false,

			// methods
			down: null,
			pressed: null,
			up: null,
		},

		RIGHT: {
			// properties
			keycode: "39",

			// bools 
			isDown: false,

			// methods
			down: null,
			pressed: null,
			up: null,
		},

		C: {
			// properties
			keycode: "67",
			
			// bools 
			isDown: false,

			// methods
			down: null,
			pressed: null,
			up: null,
		},

		X: {
			// properties
			keycode: "88",
			
			// bools 
			isDown: false,
			
			// methods
			down: null,
			pressed: null,
			up: null,
		},

		Z: {
			// properties
			keycode: "90",
			
			// bools 
			isDown: false,

			// methods
			down: null,
			pressed: null,
			up: null,
		},
		
		getKey: function(e){
			var unicode = e.keyCode ? e.keyCode : e.charCode;
			// Space Change turn !

			switch (unicode) {
				// left mouse button
				case 0:
				//console.warn("");
					return Input.Mouse;

					break;
				// right mouse button
				case 2:
				//console.warn("");
					return Input.Mouse;

					break;
				// Shift
				case 16:
					return Input.Shift;

					break;
				// control
				case 17:
					return Input.Control;

					break;
				// space
				case 32:
					return Input.Space;

					break;
				// escape
				case 27:
					return Input.Escape;

					break;
				// enter
				case 13:
					return Input.Enter;

					break;
				// W
				case 87:
					return Input.W;

					break;
				// W
				case 83:
					return Input.S;

					break;
				// A
				case 65:
					return Input.A;

					break;
				// D
				case 68:
					return Input.D;

					break;

				// left arrow
				case 37:
					return Input.LEFT;

					break;
				// right arrow
				case 39:
					return Input.RIGHT;

					break;
				// up arrow
				case 38:
					return Input.UP;

					break;
				// down arrow
				case 40:
					return Input.DOWN;

					break;
				// c
				case 67:
					return Input.C;

					break;
				// x
				case 88:
					return Input.X;

					break;
				// z
				case 90:
					return Input.Z;

					break;
			}

			//e.preventDefault();
		},

		setEventHandlers: function(canvas, gameContainer, camera){
			document.onkeydown = function(e){
			//GameInstance.canvas.onkeydown = function(e){
				var kd = Input.getKey(e);
				if(kd != null){
					kd.isDown = true;
					//console.log("key down");
					if(kd.down == null){
						//console.log("key on-down function is not set yet!");
					}else{
						kd.down();
					}
				}
			}

			document.onkeyup = function(e){
			//GameInstance.canvas.onkeyup = function(e){
				var kd = Input.getKey(e);
				if(kd != null){
					kd.isDown = false;
					if(kd.down == null){
						//console.log("key on-down function is not set yet!");
					}else{
						kd.down(e);
					}
				}
			}

			//document.onkeypress = function(e){
			//	var kd = Input.getKey(e);
			//	if(kd != null){
			//		//kd.isDown = false;
			//		if(kd.pressed == null){
			//			//console.log("key on-down function is not set yet!");
			//		}else{
			//			kd.pressed();
			//		}
			//	}
			//}

			canvas.onmousedown = function(e){
				// left
				if(e.button == 0){
					Input.Mouse.leftIsDown = true;

					if(Input.Mouse.onLeftDown == null){
						//console.warn("func not set yet!");
					}else{
						
						Input.Mouse.onLeftDown(e);
					}
				}else if(e.button == 1){

					Input.Mouse.wheelDown = true;
				
				}else if(e.button == 2){
					//console.log("right pressed");
					Input.Mouse.rightIsDown = true;
					if(Input.Mouse.onRightDown == null){
						//console.warn("func not set yet!");
					}else{
						
						Input.Mouse.onRightDown();
					}
				}

				//e.preventDefault();
			}

			canvas.onmouseup = function(e){
				if(e.button == 0){
					Input.Mouse.leftIsDown = false;

					if(Input.Mouse.onLeftUp == null){
						//console.warn("func not set yet!");
					}else{
						Input.Mouse.onLeftUp(e);
					}
				}else if(e.button == 1){
					
					Input.Mouse.wheelDown = false;
				
				}else if(e.button == 2){
					Input.Mouse.rightIsDown = false;

				}

				//e.preventDefault();
			}

			canvas.oncontextmenu = function(e){
				e.preventDefault();
				if(Input.Mouse.onContextMenu == null){
					//console.warn("func not set yet!");
				}else{
					Input.Mouse.onContextMenu();
				}
			}

			// on move
			document.onmousemove = function(e){
				Input.Mouse.windowX = e.pageX;
				Input.Mouse.windowY = e.pageY;
				//console.log(e);
			}

			gameContainer.onmousemove = function(e){
				Input.Mouse.gameContainerX = Input.Mouse.windowX - gameContainer.offsetLeft;
				Input.Mouse.gameContainerY = Input.Mouse.windowY - gameContainer.offsetTop;
			}

			canvas.onmousemove = function(e){
				Input.Mouse.canvasX = Input.Mouse.gameContainerX - canvas.offsetLeft;
				Input.Mouse.canvasY = Input.Mouse.gameContainerY - canvas.offsetTop;


				Input.Mouse.worldX = Input.Mouse.canvasX/camera.currentScale + (camera.position.x);
				Input.Mouse.worldY = Input.Mouse.canvasY/camera.currentScale + (camera.position.y);
				

				if(Input.Mouse.onMove == null){
					//console.warn("func not set yet!");
				}else{
					Input.Mouse.onMove();
				}
			}

			//console.log("events set!");
		},

		keyCodes: {
			3 : "break",
			8 : "backspace / delete",
			9 : "tab",
			12 : 'clear',
			13 : "enter",
			16 : "shift",
			17 : "ctrl ",
			18 : "alt",
			19 : "pause/break",
			20 : "caps lock",
			27 : "escape",
			32 : "spacebar",
			33 : "page up",
			34 : "page down",
			35 : "end",
			36 : "home ",
			37 : "left arrow ",
			38 : "up arrow ",
			39 : "right arrow",
			40 : "down arrow ",
			41 : "select",
			42 : "print",
			43 : "execute",
			44 : "Print Screen",
			45 : "insert ",
			46 : "delete",
			48 : "0",
			49 : "1",
			50 : "2",
			51 : "3",
			52 : "4",
			53 : "5",
			54 : "6",
			55 : "7",
			56 : "8",
			57 : "9",
			58 : ":",
			59 : "semicolon (firefox), equals",
			60 : "<",
			61 : "equals (firefox)",
			63 : "ß",
			64 : "@ (firefox)",
			65 : "a",
			66 : "b",
			67 : "c",
			68 : "d",
			69 : "e",
			70 : "f",
			71 : "g",
			72 : "h",
			73 : "i",
			74 : "j",
			75 : "k",
			76 : "l",
			77 : "m",
			78 : "n",
			79 : "o",
			80 : "p",
			81 : "q",
			82 : "r",
			83 : "s",
			84 : "t",
			85 : "u",
			86 : "v",
			87 : "w",
			88 : "x",
			89 : "y",
			90 : "z",
			91 : "Windows Key / Left ⌘ / Chromebook Search key",
			92 : "right window key ",
			93 : "Windows Menu / Right ⌘",
			96 : "numpad 0 ",
			97 : "numpad 1 ",
			98 : "numpad 2 ",
			99 : "numpad 3 ",
			100 : "numpad 4 ",
			101 : "numpad 5 ",
			102 : "numpad 6 ",
			103 : "numpad 7 ",
			104 : "numpad 8 ",
			105 : "numpad 9 ",
			106 : "multiply ",
			107 : "add",
			108 : "numpad period (firefox)",
			109 : "subtract ",
			110 : "decimal point",
			111 : "divide ",
			112 : "f1 ",
			113 : "f2 ",
			114 : "f3 ",
			115 : "f4 ",
			116 : "f5 ",
			117 : "f6 ",
			118 : "f7 ",
			119 : "f8 ",
			120 : "f9 ",
			121 : "f10",
			122 : "f11",
			123 : "f12",
			124 : "f13",
			125 : "f14",
			126 : "f15",
			127 : "f16",
			128 : "f17",
			129 : "f18",
			130 : "f19",
			131 : "f20",
			132 : "f21",
			133 : "f22",
			134 : "f23",
			135 : "f24",
			144 : "num lock ",
			145 : "scroll lock",
			160 : "^",
			161: '!',
			163 : "#",
			164: '$',
			165: 'ù',
			166 : "page backward",
			167 : "page forward",
			169 : "closing paren (AZERTY)",
			170: '*',
			171 : "~ + * key",
			173 : "minus (firefox), mute/unmute",
			174 : "decrease volume level",
			175 : "increase volume level",
			176 : "next",
			177 : "previous",
			178 : "stop",
			179 : "play/pause",
			180 : "e-mail",
			181 : "mute/unmute (firefox)",
			182 : "decrease volume level (firefox)",
			183 : "increase volume level (firefox)",
			186 : "semi-colon / ñ",
			187 : "equal sign ",
			188 : "comma",
			189 : "dash ",
			190 : "period ",
			191 : "forward slash / ç",
			192 : "grave accent / ñ",
			193 : "?, / or °",
			194 : "numpad period (chrome)",
			219 : "open bracket ",
			220 : "back slash ",
			221 : "close bracket ",
			222 : "single quote ",
			223 : "`",
			224 : "left or right ⌘ key (firefox)",
			225 : "altgr",
			226 : "< /git >",
			230 : "GNOME Compose Key",
			233 : "XF86Forward",
			234 : "XF86Back",
			255 : "toggle touchpad"
		},

	}; // End input

	Shooter.Input = Input;
	window.Input = Input;
})();
