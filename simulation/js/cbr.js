var screensVal = 0;
var tries = 0;
var tampVar=0;
var layersCount = 0;
var top1 = 270, top2 = 240, top3 = 190, knifeTop = 228, knifeTop1 = 208;
var paperHeight = 15;
var checkClick = 0;
var qCount = 0;
// Prompt questions during simulation
var questions = {
	ans1:0,
	options:[],
	nextFunction:function(){},
	// setOptions:function(d1,d2,d3,d4){
		// questions.options = new Array(d1,d2,d3,d4);
	// },
	setOptions:function(d1,d2,d3,d4,d5){
		if(d5 == 0 && d4!=0)
			questions.options = new Array(d1,d2,d3,d4);
		else if(d4 == 0 && d5 == 0)
		{
			questions.options = new Array(d1,d2,d3);
		}
		else 
		{
			questions.options = new Array(d1,d2,d3,d4,d5);
		}
	},
	setAns:function(ans){
		if(simsubscreennum == 8){
			if(soilType == "Fine grained soil")
				questions.ans1 = 3;
			else if(soilType == "Sandy soil")
				questions.ans1 = 2;
		}
		else
		questions.ans1 = ans;
	},
	frameQuestions:function(qun){
		var myDiv  = document.getElementById("question-div");
		var myDiv1 = document.getElementById("divq");
		myDiv.style.visibility = "visible";
		if(simsubscreennum == 8)
			document.getElementById("divq").innerHTML = qun+""+soilType;
		else
			document.getElementById("divq").innerHTML = qun;
		//Create and append select list
		var selectList = document.createElement("select");
		selectList.setAttribute("id", "mySelect");
		selectList.setAttribute("autocomplete", "off");
		// selectList.setAttribute("onchange", "questions.setAnswer()");
		
		var button1 = document.createElement("input");
		button1.setAttribute("onclick","questions.setAnswer(this)");
		button1.setAttribute("type","button");
		button1.setAttribute("value","OK");
		
		// Appending the contents to the division
		myDiv1.appendChild(selectList);
		myDiv1.appendChild(button1);

	//Create and append the options
		for (var i = 0; i < questions.options.length; i++) {
			var opt = document.createElement("option");
			opt.setAttribute("value", questions.options[i]);
			opt.text = questions.options[i];
			selectList.appendChild(opt);
		}
	},
	setAnswer:function(ev){
		var x = document.getElementById("mySelect");
		var i = x.selectedIndex;
		if(i == 0)
		{
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You have not selected any value";
			document.getElementById("divq").appendChild(dispAns);		
			setTimeout(function(){
				dispAns.innerHTML = "";
			},200);
		}
		else if(i == questions.ans1)
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are right<span class='boldClass'>&#128077;</span> ";
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
		else
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are Wrong<span class='boldClass'>&#128078;</span><br>Answer is: "+x.options[questions.ans1].text;
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
	},
	setCallBack:function(cb){
		nextFunction = cb;
	},
	callNextFunction:function()
	{
		setTimeout(function()
		{
			// document.getElementById("question-div").innerHTML = "";
			document.getElementById("question-div").style.visibility = "hidden";
			nextFunction();
		},800);
	}
}


// $(function()
// {
	// $('input').on('input', function() {
		// questions.value = questions.value.match(/\d*(\.\d*)?/)[0];
	// });
// });
function navNext()
{
	for(temp=0;temp<=7;temp++)
	{
		document.getElementById("canvas"+temp).style.visibility="hidden";
	}
	simsubscreennum+=1;
	document.getElementById("canvas"+simsubscreennum).style.visibility="visible";
	document.getElementById("nextButton").style.visibility="hidden";
	magic();
}

//-----------------------------------------blink arrow on the next step---------------------------------------------
//blink arrow on the next step
function animatearrow()
{
     if (document.getElementById('arrow1').style.visibility=="hidden")
         document.getElementById('arrow1').style.visibility="visible";
     else
         document.getElementById('arrow1').style.visibility="hidden";
}

//stop blinking arrow
function myStopFunction() 
{
     clearInterval(myInt);
     document.getElementById('arrow1').style.visibility="hidden";
}

//animate arrow at position
function animateArrowATPosition(left,top,degg)
{
	document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:"+left+"px; top: "+top+"px; height: 30px; z-index: 10;";
	document.getElementById("arrow1").style.WebkitTransform = "rotate("+degg+"deg)"; 
	 // Code for IE9
	document.getElementById("arrow1").style.msTransform = "rotate("+degg+"deg)";
	 // Standard syntax
	document.getElementById("arrow1").style.transform = "rotate("+degg+"deg)";
}

function magic()
{
	if(simsubscreennum==1)
	{
		myInt=setInterval(function(){animatearrow();},500);
		animateArrowATPosition(330,365,270);
		document.getElementById("can1-6").onclick=function()
		{
			myStopFunction();
			document.getElementById("can1-6").onclick="";
			document.getElementById("can1-6").style.animation="moveSeive236 1.5s forwards";
			setTimeout(function()
			{
				document.getElementById("can1-2").style.visibility="visible";
				// document.getElementById("p1-0").innerHTML = "Taken sample of soil is: "+soilType;
				myInt=setInterval(function(){animatearrow();},500);
				animateArrowATPosition(350,270,360);
				document.getElementById("can1-2").onclick=function()
				{
					myStopFunction();
					document.getElementById("can1-2").style.visibility="hidden";
					document.getElementById("can1-7").style.visibility="visible";
					document.getElementById("can1-7").style.animation="shift236 1s forwards";
					setTimeout(function()
					{
						document.getElementById("can1-7").style.left="100px";
						document.getElementById("can1-7").style.top="220px";
						document.getElementById("can1-7").style.transformOrigin="100% 80%";
						document.getElementById("can1-7").style.animation="shiftCa3 1s forwards";
						setTimeout(function()
						{
							// document.getElementById("p1-0").style.visibility = "hidden";
							document.getElementById("can1-6").src = "images/filled20.png";
							document.getElementById("can1-8").style.visibility="visible";
							document.getElementById("can1-7").style.visibility="hidden";
							document.getElementById("can1-9").style.visibility="visible";
							myInt=setInterval(function(){animatearrow();},500);
							animateArrowATPosition(310,250,-90);
							document.getElementById("can1-9").onclick=function()
							{
								myStopFunction();
								document.getElementById("can1-9").onclick="";
								document.getElementById("can1-9").style.animation="placeCap 1s forwards";
								setTimeout(function()
								{
									document.getElementById("can1-5").style.visibility="hidden";
									document.getElementById("can1-8").style.visibility="hidden";
									document.getElementById("can1-6").style.visibility="hidden";
									document.getElementById("can1-9").style.visibility="hidden";
									document.getElementById("can1-10").style.visibility="visible";
									document.getElementById("can1-11").style.visibility="visible";
									myInt=setInterval(function(){animatearrow();},500);
									animateArrowATPosition(230,360,360);
									document.getElementById("can1-10").onclick=function()
									{
										myStopFunction();
										document.getElementById("can1-10").onclick="";
										document.getElementById("can1-10").style.animation="moveSieveSet2 1s forwards";
										setTimeout(function()
										{
											document.getElementById("can1-10").style.width="110px";
										},980);
										setTimeout(function()
										{
											document.getElementById("can1-12").style.visibility="visible";
											myInt=setInterval(function(){animatearrow();},500);
											animateArrowATPosition(320,170,-90);
											document.getElementById("can1-12").onclick=function()
											{
												myStopFunction();
												document.getElementById("can1-12").onclick="";
												document.getElementById("can1-12").style="position:absolute; left:437.5px; top:195px;";
												document.getElementById("can1-11l").style.visibility="visible";
												myInt=setInterval(function(){animatearrow();},500);
												animateArrowATPosition(435,182.5,180);
												document.getElementById("can1-11l").onclick=function()
												{
													myStopFunction();
													document.getElementById("can1-11l").onclick="";
													document.getElementById("can1-11l").style="position:absolute; left:434px; top:176.5px;";
													setTimeout(function()
													{
														document.getElementById("can1-11r").style.visibility="visible";
														myInt=setInterval(function(){animatearrow();},500);
														animateArrowATPosition(625,182.5,360);
														document.getElementById("can1-11r").onclick=function()
														{
															myStopFunction();
															document.getElementById("can1-11r").onclick="";
															document.getElementById("can1-11r").style="position:absolute; left:545px; top:183px;";
															document.getElementById("can1-11on").style.visibility="visible";
															setTimeout(function()
															{
																myInt=setInterval(function(){animatearrow();},500);
																animateArrowATPosition(470,435,90);
																document.getElementById("can1-11on").onclick=function()
																{
																	myStopFunction();
																	document.getElementById("can1-11on").onclick="";
																	document.getElementById("can1-11on").style.visibility="hidden";
																	document.getElementById("can1-11onon").style.visibility="visible";
																	document.getElementById("can1-10").style="position:absolute; left:450px; top:195px; width:110px;";
																	document.getElementById("can1-10").style.animation="shake 0.5s 8";
																	setTimeout(function()
																	{
																		removeSieve();
																	},4000);
																}
															},500);
														}
													},500);
												}
											}
										},1000);
									}	
								},1100);
							}
						},1100);
					},1100);
				}
			},1800);
		}
	}
	
	else if(simsubscreennum==2)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can1-16b").style.visibility = "hidden";
		myInt=setInterval(function(){animatearrow();},500);
		animateArrowATPosition(620,435,360);
		document.getElementById("can2-6").onclick=function()
		{
			myStopFunction();
			document.getElementById("can2-6").onclick="";
			document.getElementById("can2-6").style.animation="spacerDiscMove 2.5s forwards";
			setTimeout(function()
			{
				document.getElementById("can2-7").style.visibility = "visible";
				myInt=setInterval(function(){animatearrow();},500);
				animateArrowATPosition(620,430,360);
				document.getElementById("can2-7").onclick=function()
				{
					myStopFunction();
					document.getElementById("can2-7").onclick="";
					document.getElementById("can2-7").style.animation="paperMove 2.5s forwards";
					setTimeout(function()
					{
						screensVal = 1;
						document.getElementById("can2-8").style.visibility = "visible";
						setDialog("Apply lubricating oil to the inner side of the mould to prevent stickiness of the soil to the mould.",480,180,120,300);	
					},2600);
				}
			},2600);
		}
	}
	else if(simsubscreennum==3)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can2-1").style.visibility = "hidden";
		document.getElementById("can2-2").style.visibility = "hidden";
		document.getElementById("can2-3").style.visibility = "hidden";
		document.getElementById("can2-6").style.visibility = "hidden";
		document.getElementById("can2-7").style.visibility = "hidden";
		document.getElementById("can2-8").style.visibility = "hidden";
		moveTrowel();
	}
	else if(simsubscreennum==4)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can3-1").style.visibility = "hidden";
		document.getElementById("can3-2").style.visibility = "hidden";
		document.getElementById("can3-3").style.visibility = "hidden";
		document.getElementById("can3-6").style.visibility = "hidden";
		document.getElementById("can3-7").style.visibility = "hidden";
		document.getElementById("can3-8").style.visibility = "hidden";
		document.getElementById("can3-15a").style.visibility = "hidden";
		tiltCylinder();
	}
	else if(simsubscreennum == 5)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can4-1").style.visibility = "hidden";
		document.getElementById("can4-2").style.visibility = "hidden";
		document.getElementById("can4-3").style.visibility = "hidden";
		document.getElementById("can4-5a").style.visibility = "hidden";
		document.getElementById("can4-6a").style.visibility = "hidden";
		document.getElementById("can4-7").style.visibility = "hidden";
		myInt=setInterval(function(){animatearrow();},500);
		animateArrowATPosition(670,380,-90);
		document.getElementById("can5-3").onclick=function()
		{
			myStopFunction();
			document.getElementById("can5-3").onclick="";
			document.getElementById("can5-3").style.animation="moveMould 1s forwards";
			setTimeout(function()
			{
				document.getElementById("can5-3a").style.visibility = "visible";
				setTimeout(function()
				{
					document.getElementById("can5-4").style.visibility = "visible";
					myInt=setInterval(function(){animatearrow();},500);
					animateArrowATPosition(640,380,360);
					document.getElementById("can5-4").onclick=function()
					{
						myStopFunction();
						document.getElementById("can5-4").onclick="";
						document.getElementById("can5-4").style.animation="setupPlunger 1s forwards";
						setTimeout(function()
						{
							document.getElementById("can5-4").style.visibility = "hidden";
							document.getElementById("can5-4a").style.visibility = "visible";
							document.getElementById("can5-4b").style.visibility = "visible";
							setTimeout(function()
							{
								document.getElementById("can5-5").style.visibility = "visible";
								myInt=setInterval(function(){animatearrow();},500);
								animateArrowATPosition(640,300,-90);
								document.getElementById("can5-5").onclick=function()
								{
									myStopFunction();
									document.getElementById("can5-5").onclick="";
									document.getElementById("can5-5").style.animation="halfWeightMove 1s forwards";
									setTimeout(function()
									{
										document.getElementById("can5-5a").style.visibility = "visible";
										setDialog("The penetration plunger of diameter 50mm is brought in contact with the soil and a load of 4kg(seating load) is applied so that contact between soil and plunger is established.",540,200,220,230);	
									},1800);
								}
							},500);
						},1200);
					}
				},500);
			},1200);
		}
	}
	else if(simsubscreennum == 6)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can5-1").style.visibility = "hidden";
		document.getElementById("can5-1a").style.visibility = "hidden";
		document.getElementById("can5-1b").style.visibility = "hidden";
		document.getElementById("can5-1c").style.visibility = "hidden";
		document.getElementById("can5-2").style.visibility = "hidden";
		document.getElementById("can5-2a").style.visibility = "hidden";
		document.getElementById("can5-2b").style.visibility = "hidden";
		document.getElementById("can5-3").style.visibility = "hidden";
		document.getElementById("can5-3a").style.visibility = "hidden";
		document.getElementById("can5-4").style.visibility = "hidden";
		document.getElementById("can5-4a").style.visibility = "hidden";
		document.getElementById("can5-4b").style.visibility = "hidden";
		document.getElementById("can5-5").style.visibility = "hidden";
		document.getElementById("can5-5a").style.visibility = "hidden";
		document.getElementById("can5-6").style.visibility = "hidden";
		document.getElementById("can5-7").style.visibility = "hidden";
		document.getElementById("result").style.visibility = "hidden";
		calculationTable(dataset1);
	}
	else if(simsubscreennum == 7)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("ss").style.visibility = "hidden";
	}
	else if(simsubscreennum == 8)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("chartContainer").style.visibility = "hidden";
		document.getElementById("g").style.visibility = "hidden";
		// document.getElementById("p8-0").innerHTML = "<strong>For the taken sample of soil: "+soilType+"</strong>";
		 if(p == 0){
			$("#cbcalculation").ejChart(
			{	
				primaryXAxis:
				{
					title: { text: 'Penetration in mm' ,
							font : { fontWeight : "Bold" ,
									fontFamily: "Verdana",
									size: '14px' }},
					labelFormat:"{value}",			
					// range: { min: 1000, max: 4000, interval: 500},              
					range: { min: 0, max: 15, interval: 1 } ,
					border: { 
							   color: "blue",
							   width: 2,
							   opacity: 0.5 ,
							   cornerRadius : 4
							 }, 

					//Customizing Chart title font 
					font:{ 
							 opacity: 1,
							 fontFamily: "Verdana",
							 color: "black",
							 size: '14px' 
						 }						 
				   
				},   
				 primaryYAxis:
				{
					title: { text: 'Axial Load in Kg/cm2' ,
							font : { fontWeight : "Bold" ,
									fontFamily: "Verdana",
									size: '14px' }},
					labelFormat:"{value}",
					// range: { min: 100, max: 400, interval: 50 },                       
					range: { min: 0, max: 9, interval: 1}  ,
					font:{ 
							 opacity: 1,
							 fontFamily: "Verdana",
							 color: "black",
							 size: '14px' 
						 }	
					
				},

				series: 
				[ 
					{
						points:[{x :  0 ,y : 0 },
								{x :  0.5 ,y : 2.32 },
								{x :  1.0 ,y : 3.38 },
								{x :  1.5 ,y : 3.98},
								{x :  2.0 ,y : 4.47 },
								{x :  2.5 ,y : 4.93 },
								{x :  3.0 ,y : 5.28 },
								{x :  4.0 ,y : 5.86 },
								{x :  5.0 ,y : 6.35 },
								{x :  7.0 ,y : 7.16 },
								{x :  10.0 ,y : 7.64 },
								{x :  12.5,y : 8.13 }
								],
						name:'Axial Load Vs Penetration',
						type: 'spline',
						fill:"#0066FF",
						border :{width:5},
						tooltip:{visible:true},
						marker:{
							shape: 'circle',
							size:
							{
								height: 5, width: 5
							},
							visible: true
						},					
						
					},
					{       // Add second series
				  points: [{x :  2.5 ,y : 0 },
							{x :  2.5 ,y : 4.93 },
							{x :  0,y : 4.93 },
					   ],   
					name:'Penetration at 2.5mm',
					dashArray:'5,5',					
					 type: 'line',
					 fill:"#a04000",
						border :{width:5},
						tooltip:{visible:true},
						marker:{
							shape: 'circle',
							size:
							{
								height: 5, width: 5
							},
							visible: true
						},					
					 // ...
					},
					{      // Add third series
				  points: [{x :  5 ,y : 0 },
							{x : 5 ,y : 6.35 },
							{x : 0,y : 6.35 },
					  ],     
					name:'Penetration at 5mm',
					dashArray:'5,5',					
					type: 'line',
					 fill:"#0e6655 ",
						border :{width:5},
						tooltip:{visible:true},
						marker:{
							shape: 'circle',
							size:
							{
								height: 5, width: 5
							},
							visible: true
						},	
					// ...
					},
				
				],
				commonSeriesOptions : {
					enableAnimation :true,
					animationDuration : 800 
				},
				load:"loadTheme",
				isResponsive: true,
				title :{text: 'Axial Load Vs Penetration'},
				legend:{visible:true,
						font : { fontWeight : "Bold" ,
						fontFamily: "Verdana",
						size: '12px' }}
			});
		}
		else if(p == 1){
		$("#cbcalculation").ejChart(
			{	
				primaryXAxis:
				{
					title: { text: 'Penetration in mm' ,
							font : { fontWeight : "Bold" ,
									fontFamily: "Verdana",
									size: '14px' }},
					labelFormat:"{value}",			
					// range: { min: 1000, max: 4000, interval: 500},              
					range: { min: 0, max: 15, interval: 1 } ,
					border: { 
							   color: "blue",
							   width: 2,
							   opacity: 0.5 ,
							   cornerRadius : 4
							 }, 

					//Customizing Chart title font 
					font:{ 
							 opacity: 1,
							 fontFamily: "Verdana",
							 color: "black",
							 size: '14px' 
						 }						 
				   
				},   
				 primaryYAxis:
				{
					title: { text: 'Axial Load in Kg/cm2' ,
							font : { fontWeight : "Bold" ,
									fontFamily: "Verdana",
									size: '14px' }},
					labelFormat:"{value}",
					// range: { min: 100, max: 400, interval: 50 },                       
					range: { min: 0, max: 9, interval: 1}  ,
					font:{ 
							 opacity: 1,
							 fontFamily: "Verdana",
							 color: "black",
							 size: '14px' 
						 }	
					
				},
				series: 
				[ 
					{
						points:[{x :  0 ,y : 0 },
								{x :  0.5 ,y : 2.08 },
								{x :  1.0 ,y : 3.13 },
								{x :  1.5 ,y : 3.72 },
								{x :  2.0 ,y : 4.11 },
								{x :  2.5 ,y : 4.51 },
								{x :  3.0 ,y : 4.96 },
								{x :  4.0 ,y : 5.46 },
								{x :  5.0 ,y : 5.91 },
								{x :  7.0 ,y : 6.62 },
								{x :  10.0 ,y : 7.27 },
								{x :  12.5,y : 7.96 }
								],
						name:'Axial Load Vs Penetration',
						type: 'spline',
						fill:"#0066FF",
						border :{width:5},
						tooltip:{visible:true},
						marker:{
							shape: 'circle',
							size:
							{
								height: 5, width: 5
							},
							visible: true
						},					
						
					},
					{       // Add second series
				  points: [{x :  2.5 ,y : 0 },
							{x :  2.5 ,y : 4.51 },
							{x :  0,y : 4.51 },
					   ],   
					name:'Penetration at 2.5mm',
					dashArray:'5,5',
					 type: 'line',
					 fill:"#a04000",
						border :{width:5},
						tooltip:{visible:true},
						marker:{
							shape: 'circle',
							size:
							{
								height: 5, width: 5
							},
							visible: true
						},					
					 // ...
					},
					{      // Add third series
				  points: [{x :  5 ,y : 0 },
							{x : 5 ,y : 5.91 },
							{x : 0,y : 5.91 },
					  ],     
					name:'Penetration at 5mm',
					dashArray:'5,5',
					type: 'line',
					 fill:"#0e6655 ",
						border :{width:5},
						tooltip:{visible:true},
						marker:{
							shape: 'circle',
							size:
							{
								height: 5, width: 5
							},
							visible: true
						},	
					// ...
					},
				
				],
				commonSeriesOptions : {
					enableAnimation :true,
					animationDuration : 800 
				},
				load:"loadTheme",
				isResponsive: true,
				title :{text: 'Axial Load Vs Penetration'},
				legend:{visible:true,
						font : { fontWeight : "Bold" ,
						fontFamily: "Verdana",
						size: '12px' }}
			});
		}
		else if(p == 2){
	$("#cbcalculation").ejChart(
        {	
			primaryXAxis:
            {
                title: { text: 'Penetration in mm' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",			
                // range: { min: 1000, max: 4000, interval: 500},              
				range: { min: 0, max: 15, interval: 1 } ,
				border: { 
                           color: "blue",
                           width: 2,
                           opacity: 0.5 ,
                           cornerRadius : 4
                         }, 

                //Customizing Chart title font 
                font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }						 
               
            },   
			 primaryYAxis:
            {
				title: { text: 'Axial Load in Kg/cm2' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",
				// range: { min: 100, max: 400, interval: 50 },                       
                range: { min: 0, max: 9, interval: 1}  ,
				font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }	
				
            },
			
			series: 
			[ 
				{
                    points:[{x :  0 ,y : 0 },
							{x :  0.5 ,y : 1.73 },
							{x :  1.0 ,y : 2.42},
							{x :  1.5 ,y : 3.03},
							{x :  2.0 ,y : 3.45 },
							{x :  2.5 ,y : 3.99 },
							{x :  3.0 ,y : 4.73 },
							{x :  4.0 ,y : 5.32},
							{x :  5.0 ,y : 5.75},
							{x :  7.0 ,y : 6.16},
							{x :  10.0 ,y :6.88},
							{x :  12.5,y : 7.73 }
							],
					name:'Axial Load Vs Penetration',
                    type: 'spline',
					fill:"#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
					
                },
				{       // Add second series
              points: [{x :  2.5 ,y : 0 },
						{x :  2.5 ,y : 3.99 },
						{x :  0,y : 3.99 },
                   ],   
				name:'Penetration at 2.5mm',
				dashArray:'5,5',				
                 type: 'line',
				 fill:"#a04000",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
                 // ...
				},
				{      // Add third series
              points: [{x :  5 ,y : 0 },
						{x : 5 ,y : 5.75 },
						{x : 0,y : 5.75 },
                  ],     
				name:'Penetration at 5mm',
				dashArray:'5,5',
                type: 'line',
				 fill:"#0e6655 ",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },	
                // ...
				},
            
			],
			commonSeriesOptions : {
				enableAnimation :true,
				animationDuration : 800 
			},
            load:"loadTheme",
			isResponsive: true,
			
			legend:{visible:true,
					font : { fontWeight : "Bold" ,
					fontFamily: "Verdana",
					size: '12px' }}
        });
	}
	else if(p == 3){
	$("#cbcalculation").ejChart(
        {	
			primaryXAxis:
            {
                title: { text: 'Penetration in mm' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",			
                // range: { min: 1000, max: 4000, interval: 500},              
				range: { min: 0, max: 15, interval: 1 } ,
				border: { 
                           color: "blue",
                           width: 2,
                           opacity: 0.5 ,
                           cornerRadius : 4
                         }, 

                //Customizing Chart title font 
                font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }						 
               
            },   
			 primaryYAxis:
            {
				title: { text: 'Axial Load in Kg/cm2' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",
				// range: { min: 100, max: 400, interval: 50 },                       
                range: { min: 0, max: 9, interval: 1}  ,
				font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }	
				
            },
			
			series: 
			[ 
				{
                    points:[{x :  0 ,y : 0 },
							{x :  0.5 ,y : 1.62},
							{x :  1.0 ,y : 3.02},
							{x :  1.5 ,y : 3.82},
							{x :  2.0 ,y : 4.20 },
							{x :  2.5 ,y : 4.77 },
							{x :  3.0 ,y : 5.33 },
							{x :  4.0 ,y : 5.64},
							{x :  5.0 ,y : 6.19},
							{x :  7.0 ,y : 6.85},
							{x :  10.0 ,y : 7.73},
							{x :  12.5,y : 8.42}
							],
					name:'Axial Load Vs Penetration',
                    type: 'spline',
					fill:"#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
					
                },
				{       // Add second series
              points: [{x :  2.5 ,y : 0 },
						{x :  2.5 ,y : 4.77 },
						{x :  0,y : 4.77 },
                   ],   
				name:'Penetration at 2.5mm',
				dashArray:'5,5',				
                 type: 'line',
				 fill:"#a04000",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
                 // ...
				},
				{      // Add third series
              points: [{x :  5 ,y : 0 },
						{x : 5 ,y : 6.19 },
						{x : 0,y : 6.19 },
                  ],     
				name:'Penetration at 5mm',
				dashArray:'5,5',
                type: 'line',
				 fill:"#0e6655 ",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },	
                // ...
				},
            
			],
			commonSeriesOptions : {
				enableAnimation :true,
				animationDuration : 800 
			},
            load:"loadTheme",
			isResponsive: true,
			
			legend:{visible:true,
					font : { fontWeight : "Bold" ,
					fontFamily: "Verdana",
					size: '12px' }}
        });
	}
	else if(p == 4){
	$("#cbcalculation").ejChart(
        {	
			primaryXAxis:
            {
                title: { text: 'Penetration in mm' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",			
                // range: { min: 1000, max: 4000, interval: 500},              
				range: { min: 0, max: 15, interval: 1 } ,
				border: { 
                           color: "blue",
                           width: 2,
                           opacity: 0.5 ,
                           cornerRadius : 4
                         }, 

                //Customizing Chart title font 
                font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }						 
               
            },   
			 primaryYAxis:
            {
				title: { text: 'Axial Load in Kg/cm2' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",
				// range: { min: 100, max: 400, interval: 50 },                       
                range: { min: 0, max: 9, interval: 1}  ,
				font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }	
				
            },
			
			series: 
			[ 
				{
                    points:[{x :  0 ,y : 0 },
							{x :  0.5 ,y : 2.08 },
							{x :  1.0 ,y : 3.35},
							{x :  1.5 ,y : 4.04},
							{x :  2.0 ,y : 4.59 },
							{x :  2.5 ,y : 5.32 },
							{x :  3.0 ,y : 5.91 },
							{x :  4.0 ,y : 6.85},
							{x :  5.0 ,y : 7.35},
							{x :  7.0 ,y : 8.05},
							{x :  10.0 ,y : 8.48},
							{x :  12.5,y : 9.16}
							],
					name:'Axial Load Vs Penetration',
                    type: 'spline',
					fill:"#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
					
                },
				{       // Add second series
              points: [{x :  2.5 ,y : 0 },
						{x :  2.5 ,y : 5.32 },
						{x :  0,y : 5.32},
                   ],   
				name:'Penetration at 2.5mm',
				dashArray:'5,5',				
                 type: 'line',
				 fill:"#a04000",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
                 // ...
				},
				{      // Add third series
              points: [{x :  5 ,y : 0 },
						{x : 5 ,y : 7.35 },
						{x : 0,y : 7.35 },
                  ],     
				name:'Penetration at 5mm',
				dashArray:'5,5',
                type: 'line',
				 fill:"#0e6655 ",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },	
                // ...
				},
            
			],
			commonSeriesOptions : {
				enableAnimation :true,
				animationDuration : 800 
			},
            load:"loadTheme",
			isResponsive: true,
			
			legend:{visible:true,
					font : { fontWeight : "Bold" ,
					fontFamily: "Verdana",
					size: '12px' }}
        });
	}
	else if(p == 5){
	$("#cbcalculation").ejChart(
        {	
			primaryXAxis:
            {
                title: { text: 'Penetration in mm' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",			
                // range: { min: 1000, max: 4000, interval: 500},              
				range: { min: 0, max: 15, interval: 1 } ,
				border: { 
                           color: "blue",
                           width: 2,
                           opacity: 0.5 ,
                           cornerRadius : 4
                         }, 

                //Customizing Chart title font 
                font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }						 
               
            },   
			 primaryYAxis:
            {
				title: { text: 'Axial Load in Kg/cm2' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",
				// range: { min: 100, max: 400, interval: 50 },                       
                range: { min: 0, max: 9, interval: 1}  ,
				font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }	
				
            },
			
			series: 
			[ 
				{
                    points:[{x :  0 ,y : 0 },
							{x :  0.5 ,y : 0.58 },
							{x :  1.0 ,y : 1.38},
							{x :  1.5 ,y : 2.31},
							{x :  2.0 ,y : 3.83 },
							{x :  2.5 ,y : 5.08 },
							{x :  3.0 ,y : 5.78 },
							{x :  4.0 ,y : 6.51},
							{x :  5.0 ,y : 7.12},
							{x :  7.0 ,y : 7.82},
							{x :  10.0 ,y : 8.22},
							{x :  12.5,y : 8.83}
							],
					name:'Axial Load Vs Penetration',
                    type: 'spline',
					fill:"#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
					
                },
				{       // Add second series
              points: [{x :  3.3 ,y : 0 },
						{x :  3.3 ,y : 6.02 },
						{x :  0,y : 6.02 },
                   ],   
				name:'Penetration at 2.5mm',
				dashArray:'5,5',				
                 type: 'line',
				 fill:"#a04000",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
                 // ...
				},
				{      // Add third series
              points: [{x :  5.8 ,y : 0 },
						{x : 5.8 ,y : 7.5 },
						{x : 0,y : 7.5 },
                  ],     
				name:'Penetration at 5mm',
				dashArray:'5,5',
                type: 'line',
				 fill:"#0e6655 ",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },	
                // ...
				},
				{      // Add 4th series
              points: [{x :  0.8 ,y : 0 },
						{x : 1.5 ,y : 2.31 },
                  ],     
				name:'Correction',
				dashArray:'5,5',
                type: 'line',
				 fill:"red",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },	
                // ...
				},
            
			],
			commonSeriesOptions : {
				enableAnimation :true,
				animationDuration : 800 
			},
            load:"loadTheme",
			isResponsive: true,
			
			legend:{visible:true,
					font : { fontWeight : "Bold" ,
					fontFamily: "Verdana",
					size: '12px' }}
        });
	}
	else if(p == 6){
	$("#cbcalculation").ejChart(
        {	
			primaryXAxis:
            {
                title: { text: 'Penetration in mm' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",			
                // range: { min: 1000, max: 4000, interval: 500},              
				range: { min: 0, max: 15, interval: 1 } ,
				border: { 
                           color: "blue",
                           width: 2,
                           opacity: 0.5 ,
                           cornerRadius : 4
                         }, 

                //Customizing Chart title font 
                font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }						 
               
            },   
			 primaryYAxis:
            {
				title: { text: 'Axial Load in Kg/cm2' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",
				// range: { min: 100, max: 400, interval: 50 },                       
                range: { min: 0, max: 9, interval: 1}  ,
				font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }	
				
            },
			
			series: 
			[ 
				{
                    points:[{x :  0 ,y : 0 },
							{x :  0.5 ,y : 0.35 },
							{x :  1.0 ,y : 1.15},
							{x :  1.5 ,y : 2.31},
							{x :  2.0 ,y : 3.76 },
							{x :  2.5 ,y : 5.08 },
							{x :  3.0 ,y : 5.94 },
							{x :  4.0 ,y : 6.59},
							{x :  5.0 ,y : 7.13},
							{x :  7.0 ,y : 7.96},
							{x :  10.0 ,y : 8.30},
							{x :  12.5,y : 9.02}
							],
					name:'Axial Load Vs Penetration',
                    type: 'spline',
					fill:"#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
					
                },
				{       // Add second series
              points: [{x :  3.3 ,y : 0 },
						{x :  3.3 ,y : 6.3 },
						{x :  0,y : 6.3 },
                   ],   
				name:'Penetration at 2.5mm',
				dashArray:'5,5',				
                 type: 'line',
				 fill:"#a04000",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
                 // ...
				},
				{      // Add third series
              points: [{x :  5.8 ,y : 0 },
						{x : 5.8 ,y : 7.5 },
						{x : 0,y : 7.5 },
                  ],     
				name:'Penetration at 5mm',
				dashArray:'5,5',
                type: 'line',
				 fill:"#0e6655 ",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },	
                // ...
				},
				{      // Add 4th series
              points: [{x :  0.8 ,y : 0 },
						{x : 1.5 ,y : 2.31 },
                  ],     
				name:'Correction',
				dashArray:'5,5',
                type: 'line',
				 fill:"red",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },	
                // ...
				},
            
			],
			commonSeriesOptions : {
				enableAnimation :true,
				animationDuration : 800 
			},
            load:"loadTheme",
			isResponsive: true,
			
			legend:{visible:true,
					font : { fontWeight : "Bold" ,
					fontFamily: "Verdana",
					size: '12px' }}
        });
	}

	}
}

function removeSieve()
{
	document.getElementById("can1-11onon").style.visibility="visible";
	myInt=setInterval(function(){animatearrow();},500);
	animateArrowATPosition(630,220,360);
	document.getElementById("can1-11r").onclick=function()
	{
		myStopFunction();
		document.getElementById("can1-11r").onclick="";
		document.getElementById("can1-11r").style.top="145px";
		myInt=setInterval(function(){animatearrow();},500);
		animateArrowATPosition(440,227,180);
		document.getElementById("can1-11l").onclick=function()
		{
			myStopFunction();
			document.getElementById("can1-11l").onclick="";
			document.getElementById("can1-11l").style.top="140px";
			myInt=setInterval(function(){animatearrow();},500);
			animateArrowATPosition(525,200,270);
			document.getElementById("can1-12").onclick=function()
			{
				myStopFunction();
				document.getElementById("can1-12").onclick="";		
				document.getElementById("can1-12").style.visibility="hidden";
				myInt=setInterval(function(){animatearrow();},500);
				animateArrowATPosition(525,220,270);
				document.getElementById("can1-10").onclick=function()
				{
					myStopFunction();
					document.getElementById("can1-10").style.visibility="hidden";
					document.getElementById("can1-11l").style.visibility="hidden";
					document.getElementById("can1-11r").style.visibility="hidden";
					document.getElementById("can1-11onon").style.visibility="hidden";
					document.getElementById("can1-11").style.visibility="hidden";
					document.getElementById("can1-5").style.visibility="visible";
					document.getElementById("can1-6").style.visibility="visible";
					document.getElementById("can1-6").src="images/2.36.png";
					document.getElementById("can1-8").style.visibility="visible";
					document.getElementById("can1-8").style.top="360px";
					document.getElementById("can1-9").style.visibility="visible";
					setTimeout(function()
					{
						myInt=setInterval(function(){animatearrow();},500);
						animateArrowATPosition(117,300,270);
						document.getElementById("can1-9").onclick=function()
						{
							myStopFunction();
							document.getElementById("can1-9").onclick="";		
							document.getElementById("can1-9").style.visibility="hidden";
							myInt=setInterval(function(){animatearrow();},500);
							animateArrowATPosition(117,350,270);
							document.getElementById("can1-6").onclick=function()
							{
								myStopFunction();
								document.getElementById("can1-6").onclick="";		
								document.getElementById("can1-6").style.visibility="hidden";
								for(let i=13;i<=17;i++){
									document.getElementById("can1-"+i).style.visibility = "visible";	
								}
								myInt = setInterval(function(){ animatearrow(); }, 500);
									animateArrowATPosition(305,470,90);	
									document.getElementById("can1-14").onclick=function()
									{
										myStopFunction();
										document.getElementById("can1-14").onclick="";
										document.getElementById("can1-14").style.visibility="hidden";
										document.getElementById('can1-17').style.visibility="visible";
										document.getElementById("can1-17").innerHTML = "150.00";	
										myInt = setInterval(function(){ animatearrow(); }, 500);
										animateArrowATPosition(415,470,90);	
										document.getElementById("can1-15").onclick=function()
										{
											myStopFunction();
											document.getElementById("can1-15").onclick="";
											document.getElementById('can1-15').style.visibility="hidden";
											document.getElementById("can1-17").innerHTML = "00.00";
											document.getElementById('can1-13').style.visibility="visible";
											myInt=setInterval(function(){animatearrow();},500);
											animateArrowATPosition(117,360,270);
											document.getElementById("can1-5").onclick=function()
											{
												myStopFunction();
												document.getElementById("can1-5").onclick="";
												document.getElementById("can1-8").style.visibility="hidden";									
												document.getElementById("can1-5").style.width = "180px";									
												document.getElementById("can1-5").src = "images/10-1.png";
												document.getElementById("can1-5").style.animation="movePan 1.8s forwards";
												setTimeout(function()
												{
													document.getElementById("can1-5").style = "position:absolute;left:175px;top:120px;width:180px";
													document.getElementById("can1-5").style.transformOrigin = "100% 50%";
													document.getElementById("can1-5").style.animation="shiftMud 1s forwards";
													setTimeout(function()
													{
														document.getElementById("can1-5").style.visibility="hidden";
														document.getElementById("can1-16").src = "images/plate2.png";
														document.getElementById("can1-17").innerHTML = "5000.0";
														setTimeout(function()
														{
															document.getElementById("can1-13").style.visibility="hidden";									
															document.getElementById("can1-14").style.visibility="hidden";									
															document.getElementById("can1-15").style.visibility="hidden";									
															document.getElementById("can1-17").style.visibility="hidden";									
															document.getElementById("can1-18").style.visibility="visible";									
															document.getElementById("can1-16").style="position:absolute; left:274px; top:400px;";
															var q1 = Object.create(questions);												
															generateQuestion(q1,"Optimum moisture content is :","","25% - 30%","10% - 14%","15% - 20%",0,3,pourWaterToMud,100,150,300,120);												
														},900);
													},900);
												},1900);
											}
										}
									}
							}
						}
					},500);
				}
			}
		}
	}
}
function pourWaterToMud()
{
	document.getElementById("p1-1").style.visibility = "visible";
	myInt=setInterval(function(){animatearrow();},500);
	animateArrowATPosition(580,350,360);
	document.getElementById("can1-18").onclick=function()
	{
		myStopFunction();
		document.getElementById("can1-18").onclick = "";
		document.getElementById("can1-18").style.transformOrigin = "80% 100%";
		document.getElementById("can1-18").style.animation="pourWater 1.5s forwards";
		setTimeout(function()
		{
			document.getElementById("can1-18").style.visibility="hidden";									
			document.getElementById("can1-19").style.visibility="visible";
			document.getElementById("can1-20").style.visibility="visible";
			setTimeout(function(){
				document.getElementById("can1-16").style.visibility="hidden";									
				document.getElementById("can1-16a").style.visibility="visible";									
			},1000);
			setTimeout(function(){
				document.getElementById("can1-19").style.visibility="hidden";
				document.getElementById("can1-20").style.visibility="hidden";
				document.getElementById("can1-21").style.visibility="visible";
				document.getElementById("p1-1").style.visibility = "hidden";
				myInt=setInterval(function(){animatearrow();},500);
				animateArrowATPosition(100,300,180);
				document.getElementById("can1-21").onclick=function()
				{
					myStopFunction();
					document.getElementById("can1-21").onclick = "";
					document.getElementById("can1-21").style.animation="trowel1Move 1s forwards";
					setTimeout(function(){
						document.getElementById("can1-21").style.visibility="hidden";
						document.getElementById("can1-21a").style.visibility="visible";
						document.getElementById("can1-21a").style.animation="trowel2Move 1.5s 3 forwards";
						setTimeout(function()
						{
							document.getElementById("can1-16a").style.visibility="hidden";
							document.getElementById("can1-16c").style.visibility="visible";
						},2000);
						setTimeout(function()
						{
							document.getElementById("can1-16c").style.visibility="hidden";
							document.getElementById("can1-16b").style.visibility="visible";
						},3000);
						setTimeout(function(){
							document.getElementById("can1-21a").style.visibility="hidden";
							document.getElementById("nextButton").style.visibility="visible";
						},3100);					
					},1000);
				}
			},1500);
		},1300);
	}	
}
function placeMould()
{
	myInt=setInterval(function(){animatearrow();},500);
	animateArrowATPosition(650,430,360);
	document.getElementById("can2-8").onclick=function()
	{
		myStopFunction();
		document.getElementById("can2-8").onclick="";
		document.getElementById("can2-8").style.animation="mouldMove 2.5s forwards";
		setTimeout(function()
		{
			document.getElementById("can2-2").style.visibility="visible";
			myInt=setInterval(function(){animatearrow();},500);
			animateArrowATPosition(280,340,180);
			document.getElementById("can2-2").onclick=function()
			{
				myStopFunction();
				document.getElementById("can2-2").onclick="";
				document.getElementById("can2-2").style.top = "362px";
				document.getElementById("can2-3").style.visibility="visible";
				myInt=setInterval(function(){animatearrow();},500);
				animateArrowATPosition(470,340,360);
				document.getElementById("can2-3").onclick=function()
				{
					myStopFunction();
					document.getElementById("can2-3").onclick="";
					document.getElementById("can2-3").style.top = "362px";
					document.getElementById("can2-3").style.left = "400px";
					var q3 = Object.create(questions);												
					generateQuestion(q3,"Filter paper is used to separate the spacer disc from the soil during compaction? Say True/False?","","False","True",0,0,2,screen2Proceed,100,120,300,150);
				}
			}
		},2600);
	}
}
function screen2Proceed()
{
	document.getElementById("nextButton").style.visibility="visible";
}
function moveTrowel()
{
	myInt=setInterval(function(){animatearrow();},500);
	animateArrowATPosition(50,200,-90);
	document.getElementById("can3-11").onclick=function()
	{
		myStopFunction();
		document.getElementById("can3-11").onclick="";
		if(layersCount == 0)
			document.getElementById("can3-11").style.animation="trowelMudMove 1s forwards ease";
		else if(layersCount == 1)
			document.getElementById("can3-11").style.animation="trowelMudMove1 1s forwards ease";
		else if(layersCount == 2)
			document.getElementById("can3-11").style.animation="trowelMudMove1a 1s forwards ease";
		else if(layersCount == 3)
			document.getElementById("can3-11").style.animation="trowelMudMove1b 1s forwards ease";
		else if(layersCount == 4)
			document.getElementById("can3-11").style.animation="trowelMudMove1c 1s forwards ease";
		setTimeout(function()
		{
			document.getElementById("can3-11").src = "images/trowel3.png";
			if(layersCount == 0)
				document.getElementById("can3-10").src = "images/plate5.png";
			else if(layersCount == 1)
				document.getElementById("can3-10").src = "images/plate5a.png";
			else if(layersCount == 2)
				document.getElementById("can3-10").src = "images/plate5b.png";
			else if(layersCount == 3)
				document.getElementById("can3-10").src = "images/plate5c.png";
			else if(layersCount == 4)
				document.getElementById("can3-10").src = "images/plate.png";
			fillMud();   
		},1100);
	}
}
function fillMud()
{
	document.getElementById("can3-11").style.animation="trowelMudMove2 2s 1 forwards";	
	setTimeout(function()
	{
		document.getElementById("can3-11").style.left = "230px";
		document.getElementById("can3-11").style.top = "220px";
		setTimeout(function(){
			document.getElementById("can3-11").style.transformOrigin="80% 100%";
			document.getElementById("can3-11").style.animation="rotTrowel 1.5s 1 forwards";	
			setTimeout(function()
			{
				document.getElementById("can3-11").style.visibility = "hidden";
				if(layersCount == 1){
					document.getElementById("can3-15").style.top = "340px;";
					document.getElementById("can3-15").style.visibility = "visible";
				}
				else if(layersCount == 2){
					document.getElementById("can3-15").style.top = "-30px;";
					document.getElementById("can3-15").style.visibility = "visible";
				}
				else if(layersCount == 3){
					document.getElementById("can3-15").style.top = "-10px;";
					document.getElementById("can3-15").style.visibility = "visible";
				}
				else if(layersCount == 4){
					document.getElementById("can3-15").style.top = "-5px;";
					document.getElementById("can3-15").style.visibility = "visible";
					document.getElementById("can3-8").src = "images/cul3.png";
				}
				else if(layersCount == 5){
					document.getElementById("can3-15").style.top = "-30px;";
					document.getElementById("can3-15").style.visibility = "visible";
				}
				setTimeout(function()
				{
					document.getElementById("can3-12").style.visibility = "visible";
					document.getElementById("can3-13").style.visibility = "visible";
					if(layersCount  == 0)
						setDialog("Each layer of soil is compacted by giving 56 evenly distributed blows using a hammer of weight 4.89kg. The top layer of the compacted soil is scratched.",450,170,130,340);
					else if(layersCount > 0)
					{
						tampMud();
					}
				},500);			
			},1800);
		},500);
	},2000);
}

function tampMud()
{
	if(layersCount == 0)
	{
		myInt=setInterval(function(){animatearrow();},500);
		animateArrowATPosition(540,420,360);
		document.getElementById("can3-13").onclick=function()
		{
			myStopFunction();
			document.getElementById("can3-13").onclick="";
			document.getElementById("can3-12").style.animation="compactMove 2s forwards";	
			document.getElementById("can3-13").style.animation="downCompactMove 2s forwards";
			setTimeout(function(){
				document.getElementById("can3-14").style.visibility = "visible";
				setTimeout(function()
				{
					document.getElementById("can3-12b").style.visibility = "visible";
					document.getElementById("can3-12").style.visibility = "hidden";
					setTimeout(function()
					{
						if(tampVar == 0)
						{
							tampingMud(327,320,298,200);
						}
					},500);
				},900);
			},1800);
		}
	}
	else 
	{
		document.getElementById("can3-12b").style.visibility = "visible";
		document.getElementById("can3-12").style.visibility = "hidden";
		document.getElementById("can3-14").style.visibility = "visible";
		tampingMud(327,320,298,200);
	}
}

function tampingMud(paperleft,downCompactleft,compactLeft)
{
	tampVar++;
	setTimeout(function()
	{
		document.getElementById("can3-12b").style.animation="tamp2 0.5s forwards";
		setTimeout(function()
		{
			document.getElementById("can3-14").style="position:absolute;left:"+paperleft+"px;top:"+top1+"px;width:2.7%;height:"+paperHeight+"%";
			document.getElementById("can3-13").style="position:absolute;left:"+downCompactleft+"px;top:"+top2+"px;width:5%;";
			document.getElementById("can3-12b").style="position:absolute;left:"+compactLeft+"px;top:"+top3+"px;";
			setTimeout(function()
			{
				document.getElementById("can3-12b").style.animation="tamp2 0.5s forwards";
				if(paperleft == 310){
					resetHammer();
				}
				if(tampVar == 1)
					tampingMud(350,343,322);
				else if(tampVar == 2)
					tampingMud(327,320,298);
				else if(tampVar == 3)
				{
					if(layersCount == 1){
						document.getElementById("can3-15a").style.top = "350px";
						document.getElementById("can3-15a").style.visibility = "visible";
						document.getElementById("can3-15").style.top = "340px";
						document.getElementById("can3-15").style.visibility = "hidden";
					}
					else if(layersCount == 2){
						document.getElementById("can3-15a").style.top = "340px";
						document.getElementById("can3-15a").style.visibility = "visible";
						document.getElementById("can3-15").style.top = "320px";
						document.getElementById("can3-15").style.visibility = "hidden";
						paperHeight = 17;
					}
					else if(layersCount == 3){
						document.getElementById("can3-15a").style.top = "330px";
						document.getElementById("can3-15a").style.visibility = "visible";
						document.getElementById("can3-15").style.top = "310px";
						document.getElementById("can3-15").style.visibility = "hidden";
					}
					else if(layersCount == 4){
						document.getElementById("can3-15a").src = "images/lastMud.png";
						document.getElementById("can3-15a").style.top = "315px";
						document.getElementById("can3-15a").style.visibility = "visible";
						document.getElementById("can3-15").style.top = "300px";
						document.getElementById("can3-15").style.visibility = "hidden";
					}
					else if(layersCount == 5){
						document.getElementById("can3-15a").style.top = "270px";
						document.getElementById("can3-15a").style.visibility = "visible";
					}
					tampingMud(310,303,281,200);
				}
			},500);
		},500);
	},400);
}

function resetHammer()
{
	layersCount++;
	tampVar = 0;
	top1 = top1 - 12;
	top2 = top2 - 12;
	top3 = top3 - 12;
	document.getElementById("can3-14").style= "position:absolute; left:310px; top:"+top1+"px;width:2.7%;height:"+paperHeight+"%;cursor:pointer;visibility:hidden";
	document.getElementById("can3-13").style = "position:absolute; left:303px; top:"+top2+"px;width:5%;cursor:pointer;visibility:hidden";
	document.getElementById("can3-12b").style = "position:absolute; left:281px; top:"+top3+"px;cursor:pointer;visibility:hidden";
	document.getElementById("can3-12").style.visibility = "hidden";
	document.getElementById("can3-11").style.animation ="";
	document.getElementById("can3-11").style.transformOrigin ="";
	document.getElementById("can3-11").src = "images/trowel.png";
	document.getElementById("can3-11").style = "position:absolute; left:0px; top:200px;cursor:pointer;visibility:hidden";
	if(layersCount<5){
			document.getElementById("can3-17").style.visibility = "visible";
			document.getElementById("can3-17").style.animation="chop 2.5s forwards";
	}
	setTimeout(function(){
		document.getElementById("can3-17").style.animation="";
		document.getElementById("can3-17").style.visibility = "hidden";
		if(layersCount<3 || layersCount ==4)
		{
			document.getElementById("can3-11").style = "position:absolute; left:0px; top:200px;cursor:pointer;visibility:visible";
			moveTrowel();
		}
		else if(layersCount == 3)
		{
			document.getElementById("can3-9").style.visibility = "visible";
			setDialog("After 3rd layer, collar is also attached to the mould and process is continued.",450,160,120,340);
		}
		else if(layersCount == 5)
		{
			document.getElementById("can3-10").style.visibility = "hidden";
			setDialog("Collar is removed and excess soil is struck off.",450,160,120,340);
		}
	},2800);
}
function placeCollar()
{
	myInt=setInterval(function(){animatearrow();},500);
	animateArrowATPosition(640,440,360);
	document.getElementById("can3-9").onclick=function()
	{
		myStopFunction();
		document.getElementById("can3-9").onclick="";
		document.getElementById("can3-9").style.animation="collarMove 2.5s forwards";	
		setTimeout(function(){
			document.getElementById("can3-4").style.visibility = "visible";
			myInt=setInterval(function(){animatearrow();},500);
			animateArrowATPosition(285,320,180);
			document.getElementById("can3-4").onclick=function()
			{
				myStopFunction();
				document.getElementById("can3-4").onclick="";
				document.getElementById("can3-4").style.top="320px";
				document.getElementById("can3-5").style.visibility = "visible";
				myInt=setInterval(function(){animatearrow();},500);
				animateArrowATPosition(470,320,360);
				document.getElementById("can3-5").onclick=function()
				{
					myStopFunction();
					document.getElementById("can3-5").onclick="";
					document.getElementById("can3-5").style.top="320px";	
					document.getElementById("can3-11").style.visibility = "visible";
					moveTrowel();					
				}					
			}
		},2900);
	}
}
function removeCollarAndProceed()
{
	myInt=setInterval(function(){animatearrow();},500);
	animateArrowATPosition(470,360,360);
	document.getElementById("can3-5").onclick=function()
	{
		myStopFunction();
		document.getElementById("can3-5").onclick="";
		document.getElementById("can3-5").style.visibility = "hidden";	
		myInt=setInterval(function(){animatearrow();},500);
		animateArrowATPosition(285,360,180);
		document.getElementById("can3-4").onclick=function()
		{
			myStopFunction();
			document.getElementById("can3-4").onclick="";
			document.getElementById("can3-4").style.visibility = "hidden";
			myInt=setInterval(function(){animatearrow();},500);
			animateArrowATPosition(380,300,-90);
			document.getElementById("can3-9").onclick=function()
			{
				myStopFunction();
				document.getElementById("can3-9").onclick="";
				document.getElementById("can3-9").style.animation="collarMoveReverse 2.5s forwards";	
				setTimeout(function(){
					document.getElementById("can3-9").style.visibility = "hidden";
					document.getElementById("can3-16").style.visibility = "visible";
					setTimeout(function(){
						document.getElementById("can3-16").src = "images/knifeMud.png";
						document.getElementById("can3-16").style.animation="rotateKnife 1.8s forwards";
						setTimeout(function(){
							document.getElementById("can3-8").src = "images/mudFilledCylinder.png";
							setTimeout(function(){
								document.getElementById("can3-16").style.visibility = "hidden";
								document.getElementById("can3-7").src = "images/mudPaper.png"; 
								var q1 = Object.create(questions);												
								generateQuestion(q1,"Why scratching is done between each layer?","","Disturb the top layer","Remove portion of soil","Bonding between layers","None of the above",3,screen3Proceed,100,150,300,120);
							},1800);
						},500);
					},500);
				},2600);
			}
		}
	}	
}
function screen3Proceed()
{
	document.getElementById("nextButton").style.visibility = "visible";
}
function tiltCylinder()
{
	myInt=setInterval(function(){animatearrow();},500);
	animateArrowATPosition(470,400,360);
	document.getElementById("can4-3").onclick=function()
	{
		myStopFunction();
		document.getElementById("can4-3").onclick="";
		document.getElementById("can4-3").style.visibility = "hidden";	
		myInt=setInterval(function(){animatearrow();},500);
		animateArrowATPosition(285,400,180);
		document.getElementById("can4-2").onclick=function()
		{
			myStopFunction();
			document.getElementById("can4-2").onclick="";
			document.getElementById("can4-2").style.visibility = "hidden";
			myInt=setInterval(function(){animatearrow();},500);
			animateArrowATPosition(380,350,-90);
			document.getElementById("can4-6").onclick=function()
			{
				myStopFunction();
				document.getElementById("can4-6").onclick="";
				document.getElementById("can4-6").style.animation="mouldTilt 4.5s forwards";	
				setTimeout(function(){
					document.getElementById("can4-6").src = "images/tiltMould.png";
				},2500);
				setTimeout(function(){
					document.getElementById("can4-6").style.visibility = "hidden";
					document.getElementById("can4-6a").style.visibility = "visible";
					myInt=setInterval(function(){animatearrow();},500);
					animateArrowATPosition(380,400,-90);
					document.getElementById("can4-5").onclick=function()
					{
						myStopFunction();
						document.getElementById("can4-5").onclick="";
						document.getElementById("can4-5").style.animation="paperMove 2.5s reverse";
						setTimeout(function(){
							document.getElementById("can4-5").style.visibility = "hidden";
							myInt=setInterval(function(){animatearrow();},500);
							animateArrowATPosition(380,420,-90);
							document.getElementById("can4-4").onclick=function()
							{
								myStopFunction();
								document.getElementById("can4-4").onclick="";
								document.getElementById("can4-4").style.animation="spacerDiscMove 2.5s reverse";
								setTimeout(function(){
									document.getElementById("can4-4").style.visibility = "hidden";
									setDialog("New Filter paper is placed below inverted mould and surcharge weight of 2.5kg is placed on top surface of soil.",450,160,120,340);
								},800);
							}
						},800);
					}
				},4700);
			}
		}
	}
}
function placeInvertedMould()
{
	document.getElementById("can4-5a").style.visibility = "visible";
	myInt=setInterval(function(){animatearrow();},500);
	animateArrowATPosition(215,400,-90);
	document.getElementById("can4-5a").onclick=function()
	{
		myStopFunction();
		document.getElementById("can4-5a").onclick="";
		document.getElementById("can4-5a").style.animation="paper2Move 2.5s forwards";
		setTimeout(function(){
			myInt=setInterval(function(){animatearrow();},500);
			animateArrowATPosition(650,430,360);
			document.getElementById("can4-6a").onclick=function()
			{
				myStopFunction();
				document.getElementById("can4-6a").onclick="";
				document.getElementById("can4-6a").style.animation="mouldMove 2.5s forwards";
				setTimeout(function() {
					document.getElementById("can4-2").style.visibility="visible";
					myInt=setInterval(function(){animatearrow();},500);
					animateArrowATPosition(280,420,180);
					document.getElementById("can4-2").onclick=function()
					{
						myStopFunction();
						document.getElementById("can4-2").onclick="";
						document.getElementById("can4-2").style.top = "380px";
						document.getElementById("can4-3").style.visibility="visible";
						myInt=setInterval(function(){animatearrow();},500);
						animateArrowATPosition(470,420,360);
						document.getElementById("can4-3").onclick=function()
						{
							myStopFunction();
							document.getElementById("can4-3").onclick="";
							document.getElementById("can4-3").style.top = "380px";
							document.getElementById("can4-3").style.left = "400px";
							document.getElementById("can4-7").style.visibility = "visible";
							myInt=setInterval(function(){animatearrow();},500);
							animateArrowATPosition(620,435,360);
							document.getElementById("can4-7").onclick=function()
							{
								myStopFunction();
								document.getElementById("can4-7").onclick="";
								document.getElementById("can4-7").style.animation="surchargeWeightMove 2.5s forwards";
								setTimeout(function(){
									document.getElementById("can4-6a").src = "images/tiltMould3.png";
									var q4 = Object.create(questions);												
									generateQuestion(q4,"Which disc is placed on top of the mould? ","","Spacer Disc","Surcharge Weight","Slotted Weight","Plunger",2,screen2Proceed,100,120,300,150);
								},2300);
							}
						}
					}
				},2800);
			}
		},2800);
	}
}
function screen4Proceed()
{
	document.getElementById("nextButton").style.visibility = "visible";
}
function applyLoad()
{
	myInt=setInterval(function(){animatearrow();},500);
	animateArrowATPosition(225,400,360);
	document.getElementById("can5-1a").onclick=function()
	{
		myStopFunction();
		document.getElementById("can5-1a").onclick="";
		setTimeout(function(){
			document.getElementById("can5-1a").src = "images/hvWheel.png";
			document.getElementById("can5-1a").style.animation="rotLoad 1s 2 forwards";
			document.getElementById("can5-2b").style.animation="upperDialMove 4.8s forwards";
			setTimeout(function()
			{
				document.getElementById("can5-1a").src = "images/rotate1.png";
				setDialog("Dial readings are adjusted to zero. Load is applied such that penetration rate is 1.25mm per minute.",540,200,180,230);	
			},2200);
		},200);
	}
}
function takeReadings()
{
	myInt=setInterval(function(){animatearrow();},500);
	animateArrowATPosition(110,380,-90);
	document.getElementById("can5-1b").onclick=function()
	{
		myStopFunction();
		document.getElementById("can5-1b").style.visibility = "hidden";
		document.getElementById("can5-1c").style.visibility = "visible";
		document.getElementById("can5-6").style.transformOrigin = "40% 70%";
		document.getElementById("can5-6").style.animation="needl1Move 8s  forwards";
		document.getElementById("can5-7").style.transformOrigin = "40% 70%";
		document.getElementById("can5-7").style.animation="needl2Move 8s  forwards";
		document.getElementById("result").style.visibility = "visible";
		createTable(dataset1);

	}
}
function createTable(tableData) {
      var table = document.getElementById('result');
      var row = {};
      var cell = {};
    
     tableData.forEach(function(rowData) {
			row = table.insertRow(-1);
			rowData.forEach(function(cellData) {
			  cell = row.insertCell();
					cell.textContent = cellData;
			});
      });
	showTable();
}
   
function showTable(){
	$('#result').show().find('tr').each(function (i,item){  
	var $row = $(item); 
	$row.hide();  
	$row.delay(i*500).fadeIn(500);
	});
	setTimeout(function(){
		document.getElementById("nextButton").style.visibility = "visible";
	},5400);
}

function calculationTable(tableData)
{
	 var table = document.getElementById('calculation');
	  var row = {};
	  var cell = {};
	var count = 0,count2 = 0;
	 tableData.forEach(function(rowData) {
		 if(count2 < tableData.length)
		 {
			count = 0;
			row = table.insertRow(-1);
			rowData.forEach(function(cellData) {
				if(count<rowData.length){
					cell = row.insertCell();
					cell.textContent = cellData;
					count++;
				}
				if(count>rowData.length-1)
				{
					// for(j=0;j<2;j++)
					// {
					var cell1 = row.insertCell();
					var t1 = document.createElement("input");
					t1.type = "text";
					t1.style.textAlign = "center";
					t1.setAttribute("oninput","checkInputValid(this)");
					t1.id = "t" + count;
					cell1.appendChild(t1);
					var cell2 = row.insertCell();
					var t2 = document.createElement("input");
					t2.type = "text";
					t2.style.textAlign = "center";
					t2.setAttribute("oninput","checkInputValid(this)");
					t2.id = "t" + count + count;
					cell2.appendChild(t2);
					t1.onkeyup = function(event){
						if(event.keyCode == 13){
							cell1.innerHTML = this.value;
							}
						};
					t2.onkeyup = function(event){
						if(event.keyCode == 13){
							cell2.innerHTML = this.value;
							}
						};
				}
				
			});
			count2++;
		 }
		if( count2 == tableData.length)
		 {
			// var cellLast = row.insertCell();
			var linebreak = document.createElement("br");
			document.getElementById("canvas6").appendChild(linebreak);
			var tLast = document.createElement("input");
			tLast.id = "verify";
			tLast.type = "button";
			tLast.value = "CHECK";
			tLast.onclick = function(){verifyValues(dataset2);};
			document.getElementById("canvas6").appendChild(tLast);
		 }
	  });
}
function isNumberKey(el)
{
   var ex = "/^[0-9]+\.?[0-9]*$/";
	if(ex.test(el.value)==false){
   el.value = el.value.substring(0,el.value.length - 1);
   }
}

function verifyValues(dataset2)
{
	var table1 = document.getElementById('calculation');
	var rowLength  = table1.rows.length;
	var cells;
	if(checkClick == 0)
	{
		var val = new Array();
		var val1;
		for(i=1;i<rowLength;i++)
		{
			val[i] = [];
			val1 = dataset2[i-1];   
			for(j=0;j<4;j++)
			{
				val[i][j] = table1.rows[i].cells[j].textContent;
				if(j == 2)
				{
					if(val[i][2] == val1[2]){
						table1.rows[i].cells[2].style.backgroundColor="lightgreen";
					}
					else {
					table1.rows[i].cells[2].style.backgroundColor="#f5b7b1";
					}
				
				}
				if(j == 3)
				{
					if(val[i][3] == val1[3] ){
						table1.rows[i].cells[3].style.backgroundColor="lightgreen";
					}
					else {
					table1.rows[i].cells[3].style.backgroundColor="#f5b7b1";
					}
				}
			}
		}
		checkClick++;
		document.getElementById("verify").value = "Get Correct Answer";
	}
	else if(checkClick == 1)
	{
		var count3 = 0;
		var row={};
		var cell={};
		var table2 = document.getElementById('calculation');
		var frow = table2.rows[0];
		document.getElementById("verify").style.visibility = "hidden";
		document.getElementById("nextButton").style.visibility = "visible";
		document.getElementById("verify").value = "Get Correct Answer";
		table2.innerHTML="";
		table2.appendChild(frow);
		 dataset2.forEach(function(rowData) {
			row = table2.insertRow(-1);
			rowData.forEach(function(cellData) {
					cell = row.insertCell();
					cell.textContent = cellData;
			});
		 });
	}
}
function checkInputValid(e) {
	e.value = e.value.match(/\d*(\.\d*)?/)[0];
}


function cbrCheck(elem)
{
	qCount++;
	var idd = elem.id;
	if(idd == "cb25")
	{
		if(document.getElementById("cbr25").value == cbrDataset2[p][0]){
			document.getElementById("rightAns1").innerHTML = "<span style='color:green'>&#10004;</span>"
			document.getElementById("c25").innerHTML = "";
			document.getElementById("c25").style = "position:relative;left:265px;text-decoration-line: underline;text-decoration-style: double;";
			document.getElementById("c25").innerHTML =cbrDataset[p][0]+"%<span style='color:green'>&#10004;</span>";
			document.getElementById("p5").style.visibility = "visible";
			document.getElementById("c5").style.visibility = "visible";
		}
		else{
			// document.getElementById("cbr25").style.backgroundColor="#f5b7b1";
			document.getElementById("rightAns1").innerHTML = "<span style='color:red'>&#10008;</span>"
			if(qCount == 2)
			{
				qCount = 0;
				document.getElementById("cb25").value = "RESULT";
				document.getElementById("cb25").onclick = function(){secondCheck(this);}
			}
		}
	}
	else if(idd == "cb5")
	{
		if(document.getElementById("cbr5").value == cbrDataset2[p][1]){
			document.getElementById("rightAns2").innerHTML = "<span style='color:green'>&#10004;</span>"
			document.getElementById("c5").innerHTML = "";
			// document.getElementById("c25").style.textDecorationline= "double";
			document.getElementById("c5").style = "position:relative;left:265px;text-decoration-line: underline;text-decoration-style: double;";
			document.getElementById("c5").innerHTML =cbrDataset[p][1]+"%<span style='color:green'>&#10004;</span>";
			document.getElementById("hintspan").style.visibility = "visible";
			var q2 = Object.create(questions);																								
			generateQuestion(q2,"IRC recommended value for :","","20% - 80%","5% - 40%","5% - 15%",0,2,finalStatement,300,400,300,150);		
		}		
		else{
			// document.getElementById("cbr5").style.backgroundColor="#f5b7b1";
			document.getElementById("rightAns2").innerHTML = "<span style='color:red'>&#10008;</span>"
			if(qCount == 2)
			{
				qCount = 0;
				document.getElementById("cb5").value = "RESULT";
				document.getElementById("cb5").onclick = function(){secondCheck(this);}
			}
		}
	}
}
function secondCheck(elem)
{
	var idd = elem.id;
	if(idd == "cb25")
	{
		document.getElementById("c25").innerHTML = "";
		// document.getElementById("c25").style.textDecorationline= "double";
		document.getElementById("c25").style = "position:relative;left:265px;text-decoration-line: underline;text-decoration-style: double;";
		document.getElementById("c25").innerHTML =cbrDataset[p][0]+"%";
		document.getElementById("p5").style.visibility = "visible";
		document.getElementById("c5").style.visibility = "visible";
	}
	else if(idd == "cb5")
	{
		document.getElementById("c5").innerHTML = "";
		// document.getElementById("c25").style.textDecorationline= "double";
		document.getElementById("c5").style = "position:relative;left:265px;text-decoration-line: underline;text-decoration-style: double;";
		document.getElementById("c5").innerHTML =cbrDataset[p][1]+"%";
		document.getElementById("hintspan").style.visibility = "visible";
		var q2 = Object.create(questions);																								
		generateQuestion(q2,"IRC recommended value for :","","20% - 80%","5% - 40%","5% - 15%",0,2,finalStatement,300,400,300,150);	
	}
}

//To set the questions division
function generateQuestion(qObject,qn,op1,op2,op3,op4,op5,ansKey,fn,dleft,dright,dwidth,dheight)
{
	document.getElementById('question-div').style.left=dleft+"px";											
	document.getElementById('question-div').style.top=dright+"px";												
	document.getElementById('question-div').style.width=dwidth+"px";
	document.getElementById('question-div').style.height=dheight+"px";
	qObject.setOptions(op1,op2,op3,op4,op5);
	qObject.setAns(ansKey);
	qObject.frameQuestions(qn);	
	qObject.setCallBack(fn);	
}
function finalStatement()
{
	document.getElementById("hintspan").style.visibility = "hidden";
	document.getElementById("p8-1").style.visibility = "visible";
	document.getElementById("p8-1").style.animation  ="slidePara 2s forwards";
}	
function setDialog(textContent,leftPos,topPos,heightVal,widthVal)
{
	document.getElementById("divp").innerHTML = textContent;
	document.getElementById('dialog-div').style.left=leftPos+"px";											
	document.getElementById('dialog-div').style.top=topPos+"px";	
	if( simsubscreennum === 5 ) {
		document.getElementById('dialog-div').style.height=heightVal+"px";
		document.getElementById('dialog-div').style.width=widthVal+"px";
	}
	document.getElementById('dialog-div').style.visibility="visible";											
}

function hideDialog()
{
	document.getElementById("dialog-div").style.visibility = "hidden";
	// if(simsubscreennum == 1 && screensVal == 0)
	// {
		// pourWaterToMud();
	// }
	// else 
	if(simsubscreennum == 2 && screensVal == 1)
	{
		screensVal = 2;
		placeMould();
	}
	else if(simsubscreennum == 3 && screensVal == 2)
	{
		screensVal = 3;	
		tampMud();
	}
	else if(simsubscreennum == 3 && screensVal == 3)
	{
		screensVal = 4;
		placeCollar();
	}
	else if(simsubscreennum == 3 && screensVal == 4)
	{
		screensVal = 5;
		removeCollarAndProceed();
	}
	else if(simsubscreennum == 4 && screensVal == 5)
	{
		screensVal = 6;
		placeInvertedMould();
	}
	else if(simsubscreennum == 5 && screensVal == 6)
	{
		screensVal = 7;
		applyLoad();
	}
	else if(simsubscreennum == 5 && screensVal == 7)
	{
		screensVal = 8;
		takeReadings();
	}
}	
function setTopLeft(divid,leftPos,topPos,imgsrc)
{
	document.getElementById(divid).src = imgsrc;
	document.getElementById(divid).style.top = topPos+"px";
	document.getElementById(divid).style.left = leftPos+"px";
}

function graph()
{
	document.getElementById('chartContainer').style.visibility = "visible";
	if(p == 0){
	$("#chartContainer").ejChart(
        {	
			primaryXAxis:
            {
                title: { text: 'Penetration in mm' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",			
                // range: { min: 1000, max: 4000, interval: 500},              
				range: { min: 0, max: 15, interval: 1 } ,
				border: { 
                           color: "blue",
                           width: 2,
                           opacity: 0.5 ,
                           cornerRadius : 4
                         }, 

                //Customizing Chart title font 
                font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }						 
               
            },   
			 primaryYAxis:
            {
				title: { text: 'Axial Load in Kg/cm2' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",
				// range: { min: 100, max: 400, interval: 50 },                       
                range: { min: 0, max: 9, interval: 1}  ,
				font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }	
				
            },

			series: 
			[ 
				{
                    points:[{x :  0 ,y : 0 },
							{x :  0.5 ,y : 2.32 },
							{x :  1.0 ,y : 3.38 },
							{x :  1.5 ,y : 3.98},
							{x :  2.0 ,y : 4.47 },
							{x :  2.5 ,y : 4.93 },
							{x :  3.0 ,y : 5.28 },
							{x :  4.0 ,y : 5.86 },
							{x :  5.0 ,y : 6.35 },
							{x :  7.0 ,y : 7.16 },
							{x :  10.0 ,y : 7.64 },
							{x :  12.5,y : 8.13 }
							],
					name:'Axial Load Vs Penetration',
                    type: 'spline',
					fill:"#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
					
                },
				{       // Add second series
              points: [{x :  2.5 ,y : 0 },
						{x :  2.5 ,y : 4.93 },
						{x :  0,y : 4.93 },
                   ],   
				name:'Penetration at 2.5mm',
				dashArray:'5,5',
                 type: 'line',
				 fill:"#a04000",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
                 // ...
				},
				{      // Add third series
              points: [{x :  5 ,y : 0 },
						{x : 5 ,y : 6.35 },
						{x : 0,y : 6.35 },
                  ],     
				name:'Penetration at 5mm',	
				dashArray:'5,5',
                type: 'line',
				 fill:"#0e6655 ",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },	
                // ...
				},
            
			],
			commonSeriesOptions : {
				enableAnimation :true,
				animationDuration : 800 
			},
            load:"loadTheme",
			isResponsive: true,
			
			legend:{visible:true,
					font : { fontWeight : "Bold" ,
					fontFamily: "Verdana",
					size: '12px' }}
        });
	}
	else if(p == 1){
	$("#chartContainer").ejChart(
        {	
			primaryXAxis:
            {
                title: { text: 'Penetration in mm' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",			
                // range: { min: 1000, max: 4000, interval: 500},              
				range: { min: 0, max: 15, interval: 1 } ,
				border: { 
                           color: "blue",
                           width: 2,
                           opacity: 0.5 ,
                           cornerRadius : 4
                         }, 

                //Customizing Chart title font 
                font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }						 
               
            },   
			 primaryYAxis:
            {
				title: { text: 'Axial Load in Kg/cm2' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",
				// range: { min: 100, max: 400, interval: 50 },                       
                range: { min: 0, max: 9, interval: 1}  ,
				font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }	
				
            },
			
			series: 
			[ 
				{
                    points:[{x :  0 ,y : 0 },
							{x :  0.5 ,y : 2.08 },
							{x :  1.0 ,y : 3.13},
							{x :  1.5 ,y : 3.72},
							{x :  2.0 ,y : 4.11 },
							{x :  2.5 ,y : 4.51 },
							{x :  3.0 ,y : 4.96 },
							{x :  4.0 ,y : 5.46},
							{x :  5.0 ,y : 5.91},
							{x :  7.0 ,y : 6.62},
							{x :  10.0 ,y : 7.27},
							{x :  12.5,y : 7.96 }
							],
					name:'Axial Load Vs Penetration',
                    type: 'spline',
					fill:"#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
					
                },
				{       // Add second series
              points: [{x :  2.5 ,y : 0 },
						{x :  2.5 ,y : 4.51 },
						{x :  0,y : 4.51 },
                   ],   
				name:'Penetration at 2.5mm',
				dashArray:'5,5',				
                 type: 'line',
				 fill:"#a04000",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
                 // ...
				},
				{      // Add third series
              points: [{x :  5 ,y : 0 },
						{x : 5 ,y : 5.91 },
						{x : 0,y : 5.91 },
                  ],     
				name:'Penetration at 5mm',
				dashArray:'5,5',
                type: 'line',
				 fill:"#0e6655 ",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },	
                // ...
				},
            
			],
			commonSeriesOptions : {
				enableAnimation :true,
				animationDuration : 800 
			},
            load:"loadTheme",
			isResponsive: true,
			
			legend:{visible:true,
					font : { fontWeight : "Bold" ,
					fontFamily: "Verdana",
					size: '12px' }}
        });
	}
	else if(p == 2){
	$("#chartContainer").ejChart(
        {	
			primaryXAxis:
            {
                title: { text: 'Penetration in mm' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",			
                // range: { min: 1000, max: 4000, interval: 500},              
				range: { min: 0, max: 15, interval: 1 } ,
				border: { 
                           color: "blue",
                           width: 2,
                           opacity: 0.5 ,
                           cornerRadius : 4
                         }, 

                //Customizing Chart title font 
                font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }						 
               
            },   
			 primaryYAxis:
            {
				title: { text: 'Axial Load in Kg/cm2' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",
				// range: { min: 100, max: 400, interval: 50 },                       
                range: { min: 0, max: 9, interval: 1}  ,
				font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }	
				
            },
			
			series: 
			[ 
				{
                    points:[{x :  0 ,y : 0 },
							{x :  0.5 ,y : 1.73 },
							{x :  1.0 ,y : 2.42},
							{x :  1.5 ,y : 3.03},
							{x :  2.0 ,y : 3.45 },
							{x :  2.5 ,y : 3.99 },
							{x :  3.0 ,y : 4.73 },
							{x :  4.0 ,y : 5.32},
							{x :  5.0 ,y : 5.75},
							{x :  7.0 ,y : 6.16},
							{x :  10.0 ,y :6.88},
							{x :  12.5,y : 7.73 }
							],
					name:'Axial Load Vs Penetration',
                    type: 'spline',
					fill:"#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
					
                },
				{       // Add second series
              points: [{x :  2.5 ,y : 0 },
						{x :  2.5 ,y : 3.99 },
						{x :  0,y : 3.99 },
                   ],   
				name:'Penetration at 2.5mm',
				dashArray:'5,5',				
                 type: 'line',
				 fill:"#a04000",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
                 // ...
				},
				{      // Add third series
              points: [{x :  5 ,y : 0 },
						{x : 5 ,y : 5.75 },
						{x : 0,y : 5.75 },
                  ],     
				name:'Penetration at 5mm',
				dashArray:'5,5',
                type: 'line',
				 fill:"#0e6655 ",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },	
                // ...
				},
            
			],
			commonSeriesOptions : {
				enableAnimation :true,
				animationDuration : 800 
			},
            load:"loadTheme",
			isResponsive: true,
			
			legend:{visible:true,
					font : { fontWeight : "Bold" ,
					fontFamily: "Verdana",
					size: '12px' }}
        });
	}
	else if(p == 3){
	$("#chartContainer").ejChart(
        {	
			primaryXAxis:
            {
                title: { text: 'Penetration in mm' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",			
                // range: { min: 1000, max: 4000, interval: 500},              
				range: { min: 0, max: 15, interval: 1 } ,
				border: { 
                           color: "blue",
                           width: 2,
                           opacity: 0.5 ,
                           cornerRadius : 4
                         }, 

                //Customizing Chart title font 
                font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }						 
               
            },   
			 primaryYAxis:
            {
				title: { text: 'Axial Load in Kg/cm2' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",
				// range: { min: 100, max: 400, interval: 50 },                       
                range: { min: 0, max: 9, interval: 1}  ,
				font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }	
				
            },
			
			series: 
			[ 
				{
                    points:[{x :  0 ,y : 0 },
							{x :  0.5 ,y : 1.62},
							{x :  1.0 ,y : 3.02},
							{x :  1.5 ,y : 3.82},
							{x :  2.0 ,y : 4.20 },
							{x :  2.5 ,y : 4.77 },
							{x :  3.0 ,y : 5.33 },
							{x :  4.0 ,y : 5.64},
							{x :  5.0 ,y : 6.19},
							{x :  7.0 ,y : 6.85},
							{x :  10.0 ,y : 7.73},
							{x :  12.5,y : 8.42}
							],
					name:'Axial Load Vs Penetration',
                    type: 'spline',
					fill:"#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
					
                },
				{       // Add second series
              points: [{x :  2.5 ,y : 0 },
						{x :  2.5 ,y : 4.77 },
						{x :  0,y : 4.77 },
                   ],   
				name:'Penetration at 2.5mm',
				dashArray:'5,5',				
                 type: 'line',
				 fill:"#a04000",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
                 // ...
				},
				{      // Add third series
              points: [{x :  5 ,y : 0 },
						{x : 5 ,y : 6.19 },
						{x : 0,y : 6.19 },
                  ],     
				name:'Penetration at 5mm',
				dashArray:'5,5',
                type: 'line',
				 fill:"#0e6655 ",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },	
                // ...
				},
            
			],
			commonSeriesOptions : {
				enableAnimation :true,
				animationDuration : 800 
			},
            load:"loadTheme",
			isResponsive: true,
			
			legend:{visible:true,
					font : { fontWeight : "Bold" ,
					fontFamily: "Verdana",
					size: '12px' }}
        });
	}
	else if(p == 4){
	$("#chartContainer").ejChart(
        {	
			primaryXAxis:
            {
                title: { text: 'Penetration in mm' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",			
                // range: { min: 1000, max: 4000, interval: 500},              
				range: { min: 0, max: 15, interval: 1 } ,
				border: { 
                           color: "blue",
                           width: 2,
                           opacity: 0.5 ,
                           cornerRadius : 4
                         }, 

                //Customizing Chart title font 
                font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }						 
               
            },   
			 primaryYAxis:
            {
				title: { text: 'Axial Load in Kg/cm2' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",
				// range: { min: 100, max: 400, interval: 50 },                       
                range: { min: 0, max: 9, interval: 1}  ,
				font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }	
				
            },
			
			series: 
			[ 
				{
                    points:[{x :  0 ,y : 0 },
							{x :  0.5 ,y : 2.08 },
							{x :  1.0 ,y : 3.35},
							{x :  1.5 ,y : 4.04},
							{x :  2.0 ,y : 4.59 },
							{x :  2.5 ,y : 5.32 },
							{x :  3.0 ,y : 5.91 },
							{x :  4.0 ,y : 6.85},
							{x :  5.0 ,y : 7.35},
							{x :  7.0 ,y : 8.05},
							{x :  10.0 ,y : 8.48},
							{x :  12.5,y : 9.16}
							],
					name:'Axial Load Vs Penetration',
                    type: 'spline',
					fill:"#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
					
                },
				{       // Add second series
              points: [{x :  2.5 ,y : 0 },
						{x :  2.5 ,y : 5.32 },
						{x :  0,y : 5.32 },
                   ],   
				name:'Penetration at 2.5mm',
				dashArray:'5,5',				
                 type: 'line',
				 fill:"#a04000",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
                 // ...
				},
				{      // Add third series
              points: [{x :  5 ,y : 0 },
						{x : 5 ,y : 7.35 },
						{x : 0,y : 7.35 },
                  ],     
				name:'Penetration at 5mm',
				dashArray:'5,5',
                type: 'line',
				 fill:"#0e6655 ",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },	
                // ...
				},
            
			],
			commonSeriesOptions : {
				enableAnimation :true,
				animationDuration : 800 
			},
            load:"loadTheme",
			isResponsive: true,
			
			legend:{visible:true,
					font : { fontWeight : "Bold" ,
					fontFamily: "Verdana",
					size: '12px' }}
        });
	}
	else if(p == 5){
	$("#chartContainer").ejChart(
        {	
			primaryXAxis:
            {
                title: { text: 'Penetration in mm' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",			
                // range: { min: 1000, max: 4000, interval: 500},              
				range: { min: 0, max: 15, interval: 1 } ,
				border: { 
                           color: "blue",
                           width: 2,
                           opacity: 0.5 ,
                           cornerRadius : 4
                         }, 

                //Customizing Chart title font 
                font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }						 
               
            },   
			 primaryYAxis:
            {
				title: { text: 'Axial Load in Kg/cm2' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",
				// range: { min: 100, max: 400, interval: 50 },                       
                range: { min: 0, max: 9, interval: 1}  ,
				font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }	
				
            },
			
			series: 
			[ 
				{
                    points:[{x :  0 ,y : 0 },
							{x :  0.5 ,y : 0.58 },
							{x :  1.0 ,y : 1.38},
							{x :  1.5 ,y : 2.31},
							{x :  2.0 ,y : 3.83 },
							{x :  2.5 ,y : 5.08 },
							{x :  3.0 ,y : 5.78 },
							{x :  4.0 ,y : 6.51},
							{x :  5.0 ,y : 7.12},
							{x :  7.0 ,y : 7.82},
							{x :  10.0 ,y : 8.22},
							{x :  12.5,y : 8.83}
							],
					name:'Axial Load Vs Penetration',
                    type: 'spline',
					fill:"#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
					
                },
				{       // Add second series
              points: [{x :  3.3 ,y : 0 },
						{x :  3.3 ,y : 6.02 },
						{x :  0,y : 6.02 },
                   ],   
				name:'Penetration at 2.5mm',
				dashArray:'5,5',				
                 type: 'line',
				 fill:"#a04000",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
                 // ...
				},
				{      // Add third series
              points: [{x :  5.8 ,y : 0 },
						{x : 5.8 ,y : 7.5 },
						{x : 0,y : 7.5 },
                  ],     
				name:'Penetration at 5mm',
				dashArray:'5,5',
                type: 'line',
				 fill:"#0e6655 ",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },	
                // ...
				},
				{      // Add 4th series
              points: [{x :  0.8 ,y : 0 },
						{x : 1.5 ,y : 2.31 },
                  ],     
				name:'Correction',
				dashArray:'5,5',
                type: 'line',
				 fill:"red",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },	
                // ...
				},
            
			],
			commonSeriesOptions : {
				enableAnimation :true,
				animationDuration : 800 
			},
            load:"loadTheme",
			isResponsive: true,
			
			legend:{visible:true,
					font : { fontWeight : "Bold" ,
					fontFamily: "Verdana",
					size: '12px' }}
        });
	}
	else if(p == 6){
	$("#chartContainer").ejChart(
        {	
			primaryXAxis:
            {
                title: { text: 'Penetration in mm' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",			
                // range: { min: 1000, max: 4000, interval: 500},              
				range: { min: 0, max: 15, interval: 1 } ,
				border: { 
                           color: "blue",
                           width: 2,
                           opacity: 0.5 ,
                           cornerRadius : 4
                         }, 

                //Customizing Chart title font 
                font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }						 
               
            },   
			 primaryYAxis:
            {
				title: { text: 'Axial Load in Kg/cm2' ,
						font : { fontWeight : "Bold" ,
								fontFamily: "Verdana",
								size: '14px' }},
                labelFormat:"{value}",
				// range: { min: 100, max: 400, interval: 50 },                       
                range: { min: 0, max: 9, interval: 1}  ,
				font:{ 
                         opacity: 1,
                         fontFamily: "Verdana",
                         color: "black",
                         size: '14px' 
                     }	
				
            },
			
			series: 
			[ 
				{
                    points:[{x :  0 ,y : 0 },
							{x :  0.5 ,y : 0.35 },
							{x :  1.0 ,y : 1.15},
							{x :  1.5 ,y : 2.31},
							{x :  2.0 ,y : 3.76 },
							{x :  2.5 ,y : 5.08 },
							{x :  3.0 ,y : 5.94 },
							{x :  4.0 ,y : 6.59},
							{x :  5.0 ,y : 7.13},
							{x :  7.0 ,y : 7.96},
							{x :  10.0 ,y : 8.30},
							{x :  12.5,y : 9.02}
							],
					name:'Axial Load Vs Penetration',
                    type: 'spline',
					fill:"#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
					
                },
				{       // Add second series
              points: [{x :  3.3 ,y : 0 },
						{x :  3.3 ,y : 6.3 },
						{x :  0,y : 6.3 },
                   ],   
				name:'Penetration at 2.5mm',
				dashArray:'5,5',				
                 type: 'line',
				 fill:"#a04000",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },					
                 // ...
				},
				{      // Add third series
              points: [{x :  5.8 ,y : 0 },
						{x : 5.8 ,y : 7.5 },
						{x : 0,y : 7.5 },
                  ],     
				name:'Penetration at 5mm',
				dashArray:'5,5',
                type: 'line',
				 fill:"#0e6655 ",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },	
                // ...
				},
				{      // Add 4th series
              points: [{x :  0.8 ,y : 0 },
						{x : 1.5 ,y : 2.31 },
                  ],     
				name:'Correction',
				dashArray:'5,5',
                type: 'line',
				 fill:"red",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },	
                // ...
				},
            
			],
			commonSeriesOptions : {
				enableAnimation :true,
				animationDuration : 800 
			},
            load:"loadTheme",
			isResponsive: true,
			
			legend:{visible:true,
					font : { fontWeight : "Bold" ,
					fontFamily: "Verdana",
					size: '12px' }}
        });
	}

	setTimeout(function(){
		document.getElementById("nextButton").style.visibility = "visible";
	},1000);
}
//code to get  pixel point in a page
// function getpx(event,elem)
// {
	// document.getElementById("1").innerHTML = event.pageX + " "+event.pageY;
// }