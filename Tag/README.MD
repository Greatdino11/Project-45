function timer(){
	frames = frameCount;
	seconds = Math.round(frames/30);
	if(seconds>=60){
		mins = Math.round(seconds/60);
		secone = ((seconds%60).toString()).padStart(2, '0');
		text(mins + ":" + secone, 200, 200);
	}
	else if(seconds<60){
		if(seconds<=9){
			text("0:0"+seconds,200,200);
		}
		else{
			text("0:"+seconds,200, 200);
		}
	}
}