define(['jquery', 'paper'], function($, Paper){
	var running = false;
	var poiSpeedL = 8;
	var poiSpeedR = 8;
	var armSpeedL = 8;
	var armSpeedR = 8;
	var armL;
	var armR;
	var pCenterL;
	var pTetherL;
	var pHeadL;
	var pCenterR;
	var pTetherR;
	var pHeadR;
	var lArmCenter;
	var rArmCenter;
	var lHand, rHand;
	var groupL;
	var groupR;




	function init(){
		armL = new Raster('armL');
		armR = new Raster('armR');

		armL.position = new Point ( 353, 200);
		armR.position = new Point ( 643	,205 );

		lArmCenter = new Point ( armL.bounds._x + armL.bounds._width, armL.bounds._y + armL.bounds._height / 2  );
		rArmCenter = new Point ( armR.bounds._x , armR.bounds._y + armR.bounds._height / 2  );

		pCenterL = new Path.Circle({
			center: new Point(300,200),
			radius: 5,
			strokeColor:'black',
			fillColor: 'black'
		});

		pTetherL = new Path.Line({
		    from: [300, 200],
		    to: [300, 350],
		    strokeColor: 'black'
		});

		

		pCenterR = new Path.Circle({
			center: new Point(700,200),
			radius: 5,
			strokeColor: 'black',
			fillColor: 'black'
		});

		pTetherR = new Path.Line({
		    from: [700, 200],
		    to: [700, 350],
		    strokeColor: 'black'
		});

		pHeadL = new Path.Circle({
			center: new Point(300,350),
			radius: 25,
			strokeColor: 'black',
			fillColor: 'red'
		});
		
		pHeadR = new Path.Circle({
			center: new Point(700,350),
			radius: 25,
			strokeColor: 'black',
			fillColor: 'red'
		});

		groupL = new Group();
		groupL.addChild(pCenterL);
		groupL.addChild(pHeadL);
		groupL.addChild(pTetherL);

		groupR = new Group();
		groupR.addChild(pHeadR);
		groupR.addChild(pTetherR);
		groupR.addChild(pCenterR);


	}

	$('#triggerButton').click(function(event){
		(running) ? running = false : running = true;
	});

	$('#resetButton').click(function(event){

		pCenterL.remove();
		pCenterR.remove();			

		pTetherL.remove();
		pTetherR.remove();

		pHeadL.remove();
		pHeadR.remove();

		armL.remove();
		armR.remove();

		init();
	});


	$("input[name=poiDirection]:radio").change(function (){ 
		poiSpeedL = poiSpeedL * -1;
		poiSpeedR = poiSpeedR * -1;
	});

	$("input[name=poiTiming]:radio").change(function () { 
		poiSpeedL = poiSpeedL * -1;
	});

	$("input[name=armDirection]:radio").change(function (){ 
		armSpeedL = armSpeedL * -1;
		armSpeedR = armSpeedR * -1;
	});

	$("input[name=armTiming]:radio").change(function () { 
		armSpeedL = armSpeedL * -1;
	});


	function onFrame (event){
		if (running){

			armL.rotate(armSpeedL, lArmCenter );
			armR.rotate(armSpeedR, rArmCenter );
			
			//group L
			pTetherL.rotate(poiSpeedL);
			pHeadL.rotate(poiSpeedL );

			//group R
			pTetherR.rotate(poiSpeedR);
			pHeadR.rotate(poiSpeedR);

			console.log('gx: ' + groupL.bounds._x + ' gy: ' + groupL.bounds._y);
			console.log('x: ' + armL.bounds.bottomLeft._x + ' y: ' + armL.bounds.bottomLeft._y);
			
		}
	}

	//DO ALL THE THINGS
	init();
});