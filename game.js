//現所持金
var money=50;
var use=3;

var started=false;
//止めるか判定
var frag_left=false;
var flag_center=false;
var flag_right=false;

//既に止まっているか判定
var stop_left=false;
var stop_center=false;
var stop_right=false;

//止める位置
var end_left=0;
var end_center=0;
var end_right=0;

var left=document.getElementById("left");
var center=document.getElementById("center");
var right=document.getElementById("right");

//現在位置
var cur_left=0;
var cur_center=0;
var cur_right=0;

//速度指定
var verocity_left=60*12/100.0;
var verocity_center=-60*12/100.0;
var verocity_right=60*12/100.0;

//境界判定に使用
var bottom=60*21;

//残額0でリプレイを引くとGAMEOVER扱いになる対策
var repFlag=false;

//残り時間
var time_left=60;
var gaming=false;

//GAMEOVER時に時間の減少を止める用
var gameover_flag=false;

onload=init();

function init(){
	document.getElementById("time").style.textAlign="center";
	document.getElementById("money").style.textAlign="right";
	money=input_money();
	money_update();
	time_left=60;
	gameover_flag=false;
	var a=setInterval(function(){
		if(gameover_flag){
			clearInterval(a);
		}
		time_left-=1;
		document.getElementById("time").innerHTML=time_left;
		if(time_left==0){
			finish_flag=true;
			if(!gaming)	finish();
			clearInterval(a);
		}
	},1000);
	return;
}

function input_money(){
	var ret=prompt("所持コインを入力してください。");
	if(ret==null)	return 50;
	if(ret=="")	return 50;
	return ret;
}

function money_update(){
	if(money>=9999){
		document.getElementById("money").innerHTML="9999";
	}
	else{
		document.getElementById("money").innerHTML=("0000"+money).substr(-4);
	}
	return;
}

function start(){	
	document.getElementById("btn_start").src="pushed_btn.jpg";
	if(started){
		return;
	}
	
	document.getElementById("result").innerHTML="スロット";
	
	money-=use;
	if(money<0){
		use+=money;
		money=0;
	}
	money_update();
	
	document.getElementById("light1").src="blue_btn.jpg";
	document.getElementById("light2").src="green_btn.jpg";
	document.getElementById("light3").src="yellow_btn.jpg";
	document.getElementById("light4").src="green_btn.jpg";
	document.getElementById("light5").src="blue_btn.jpg";
	
	//変数の初期化
	started=true;
	gaming=true;
	repFlag=false;
	flag_left=flag_center=flag_right=false;
	stop_left=stop_center=stop_right=false;
	end_left=end_center=end_right=0;
	
	var left=document.getElementById("left");
	var center=document.getElementById("center");
	var right=document.getElementById("right");
	
	var func=setInterval(function(){
		//現在位置の移動
		if(!stop_left){
			cur_left+=verocity_left;
		}
		if(!stop_center){
			cur_center+=verocity_center;
		}
		if(!stop_right){
			cur_right+=verocity_right;
		}
	
		//終了フラグが立っていて超えたなら止める
		if(flag_left&&cur_left>end_left){
			stop_left=true;
			cur_left=end_left;
		}
		if(flag_center&&cur_center<end_center){
			stop_center=true;
			cur_center=end_center;
		}
		if(flag_right&&cur_right>end_right){
			stop_right=true;
			cur_right=end_right;
		}
		
		//境界を超えていたら元に戻す
		if(cur_left>=0){
			cur_left-=bottom;
		}
		if(cur_center<=-bottom){
			cur_center+=bottom;		
		}
		if(cur_right>=0){
			cur_right-=bottom;
		}
		
		//移動の適用
		left.style.top=cur_left+45+"px";
		left.style.clip="rect("+(-cur_left)+",60,"+(-cur_left+180)+",0)";
		center.style.top=cur_center+45+"px";
		center.style.clip="rect("+(-cur_center)+",60,"+(-cur_center+180)+",0)";
		right.style.top=cur_right+45+"px";
		right.style.clip="rect("+(-cur_right)+",60,"+(-cur_right+180)+",0)";
		
		if(stop_left&&stop_center&&stop_right){
			//終了処理
			end();
			money_update();
			if(money<=0&&!repFlag){
				gameover_flag=true;
				setTimeout("window.alert('GAMEOVER')",1000);
				setTimeout("init()",2000);
			}
			started=false;
			gaming=false;
			if(time_left<=0&&!repFlag)	finish();
			clearInterval(func);
			return;
		}
	},10);
}

function finish(){
	window.alert("ゲーム終了。残りコイン数は"+money+"枚です。");
	init();
}

function stop(num){
	if(num==1){
		//leftを止める
		flag_left=true;
		document.getElementById("btn_left").src="black_btn.jpg";
		var move=Math.floor(bottom-cur_left)%60;
		end_left=Math.min(cur_left+move,0);
	}
	else if(num==2){
		//centerを止める
		flag_center=true;
		document.getElementById("btn_center").src="black_btn.jpg";
		var move=Math.ceil(bottom+cur_center)%60;
		end_center=Math.max(cur_center-move,-bottom);
	}
	else if(num==3){
		//rightを止める
		flag_right=true;
		document.getElementById("btn_right").src="black_btn.jpg";
		var move=Math.floor(bottom-cur_right)%60;
		end_right=Math.min(cur_right+move,0);
	}
	return;
}

function btn_release(num){
	if(num==1){
		//leftの画像を戻す
		document.getElementById("btn_left").src="red_btn.jpg";
	}
	else if(num==2){
		//centerの画像を戻す
		document.getElementById("btn_center").src="red_btn.jpg";
	}
	else if(num==3){
		//rightの画像を戻す
		document.getElementById("btn_right").src="red_btn.jpg";
	}
	else if(num==4){
		//startの画像を戻す
		document.getElementById("btn_start").src="start_btn.jpg";
	}
	return;
}

function end(){
	
	document.getElementById("light1").src="pushed_btn.jpg";
	document.getElementById("light2").src="pushed_btn.jpg";
	document.getElementById("light3").src="pushed_btn.jpg";
	document.getElementById("light4").src="pushed_btn.jpg";
	document.getElementById("light5").src="pushed_btn.jpg";
	/*
	left: 	rep(0)		2,7,11,16,19,
		orange(1)	1,6,9,13,17,
		watermelon(2)	15,20
		apple(3)	8,
		bell(4)		10,12,
		grape(5)	14,21
		cherry(6)	18
		bar(7)		4,5
		seven(8)	3
	*/
	var array_left=[1,0,8,7,7,1,0,3,1,4,0,4,1,5,2,0,1,6,0,2,5];
	var index_left=Math.floor(-cur_left/60+1e-6);
	var up_left=array_left[index_left];
	var mid_left=array_left[(index_left+1)%21];
	var low_left=array_left[(index_left+2)%21];
	/*
	center:	rep(0)		3,8,13,18,21
		orange(1)	1,6,11,16,19,
		watermelon(2)	9,10,
		apple(3)	15,
		bell(4)		12,
		grape(5)	14,20,
		cherry(6)	5,
		bar(7)		7,17,
		seven(8)	2,4,
	*/
	var array_center=[1,8,0,8,6,1,7,0,2,2,1,4,0,5,3,1,7,0,1,5,0];
	var index_center=Math.floor(-cur_center/60+1e-6);
	var up_center=array_center[index_center];
	var mid_center=array_center[(index_center+1)%21];
	var low_center=array_center[(index_center+2)%21];
	/*
	right: 	rep(0)		4,6,10,14,18,21
		orange(1)	1,5,9,13,17,
		watermelon(2)	2,8,
		apple(3)	11,
		bell(4)		12,
		grape(5)	15,20,
		cherry(6)	19,
		bar(7)		7,16,
		seven(8)	3,
	*/
	var array_right=[1,2,8,0,1,0,7,2,1,0,3,4,1,0,5,7,1,0,6,5,0];
	var index_right=Math.floor(-cur_right/60+1e-6);
	var up_right=array_right[index_right];
	var mid_right=array_right[(index_right+1)%21];
	var low_right=array_right[(index_right+2)%21];
	
	
	var add=0;
	var gorep=false;
	var gobonus=false;
	
	//mid-mid-mid
	if(equals(mid_left,mid_center,mid_right)){
		var flush=0;
		var shift=setInterval(function () {
			if(flush%2==0){
				document.getElementById("light3").src="yellow_btn.jpg";
			}
			else{
				document.getElementById("light3").src="pushed_btn.jpg";
			}
			flush+=1;
			if(flush>=9)	clearInterval(shift);
		},100);
		if(mid_left==0)	gorep=true;
		else if(mid_left>=7){
			gobonus=true;	add+=use*20;
		}
		else{
			add+=use*5;
		}
	}
	//up-up-up
	else if(equals(up_left,up_center,up_right)){
		var flush=0;
		var shift=setInterval(function () {
			if(flush%2==0){
				document.getElementById("light2").src="green_btn.jpg";
			}
			else{
				document.getElementById("light2").src="pushed_btn.jpg";
			}
			flush+=1;
			if(flush>=9)	clearInterval(shift);
		},100);
		if(up_left==0)	gorep=true;
		else if(up_left>=7){
			gobonus=true;	add+=use*20;
		}
		else{
			add+=use*5;
		}
	}
	//low-low-low
	else if(equals(low_left,low_center,low_right)){
		var flush=0;
		var shift=setInterval(function () {
			if(flush%2==0){
				document.getElementById("light4").src="green_btn.jpg";
			}
			else{
				document.getElementById("light4").src="pushed_btn.jpg";
			}
			flush+=1;
			if(flush>=9)	clearInterval(shift);
		},100);
		if(low_left==0)	gorep=true;
		else if(low_left>=7){
			gobonus=true;	add+=use*20;
		}
		else{
			add+=use*5;
		}
	}
	//up-mid-low
	else if(equals(up_left,mid_center,low_right)){
		var flush=0;
		var shift=setInterval(function () {
			if(flush%2==0){
				document.getElementById("light1").src="blue_btn.jpg";
			}
			else{
				document.getElementById("light1").src="pushed_btn.jpg";
			}
			flush+=1;
			if(flush>=9)	clearInterval(shift);
		},100);
		if(up_left==0)	gorep=true;
		else if(up_left>=7){
			gobonus=true;	add+=use*20;
		}
		else{
			add+=use*5;
		}
	}
	//low-mid-up
	else if(equals(low_left,mid_center,up_right)){
		var flush=0;
		var shift=setInterval(function () {
			if(flush%2==0){
				document.getElementById("light5").src="blue_btn.jpg";
			}
			else{
				document.getElementById("light5").src="pushed_btn.jpg";
			}
			flush+=1;
			if(flush>=9)	clearInterval(shift);
		},100);
		if(low_left==0)	gorep=true;
		else if(low_left>=7){
			gobonus=true;	add+=use*20;
		}
		else{
			add+=use*5;
		}
	}
	
	document.getElementById("result").innerHTML="";
	if(add>0){
		if(add>=use*20){
			document.getElementById("result").innerHTML="大当たり!!"+add+"枚獲得";
			money+=add;
			money_update()
		}
		else{
			document.getElementById("result").innerHTML="当たり!!"+add+"枚獲得";
			money+=add;
			money_update()
		}
	}
	if(gorep){
		document.getElementById("result").innerHTML+="　リプレイ";
		started=false;
		repFlag=true;
		flag_left=flag_center=flag_right=false;
		stop_left=stop_center=stop_right=false;
		end_left=end_center=end_right=0;
		money+=use;
		setTimeout("start()",750);
	}
	else if(add<=0){
		document.getElementById("result").innerHTML="残念!!はずれ!!";
	}
	return;
}

function equals(a,b,c){
	return (a==b&&b==c?true:false);
}
/*
		rep(0)		
		orange(1)	
		watermelon(2)	
		apple(3)	
		bell(4)		
		grape(5)	
		cherry(6)	
		bar(7)		
		seven(8)	
*/

//ショートカットキーの実装
document.onkeydown=function (e) {
	switch(e.keyCode){
		case 37: stop(1);	break;
		case 45: stop(2);	break;
		case 53: stop(3);	break;
		case 60:	start();	break;
		case 97: stop(1);	break;
		case 98: stop(2);	break;
		case 99:	stop(3);	break;
		case 101:	start();	break;
	}
}

document.onkeyup=function (e) {
	switch(e.keyCode){		
		case 37: btn_release(1);	break;
		case 45: btn_release(2);	break;
		case 53: btn_release(3);	break;
		case 60:	btn_release(4);	break;
		case 97: btn_release(1);	break;
		case 98: btn_release(2);	break;
		case 99:	btn_release(3);	break;
		case 101:	btn_release(4);	break;
	}
}
