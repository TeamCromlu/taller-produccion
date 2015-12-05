$(document).ready(mainMobile);
$(document).ready(mainDesktop);
$(document).ready(adiosMobile);
$(document).ready(adiosDesktop);

var contador = 1;

function mainMobile(){
	$(".Header__link").click(function(){
		//$("nav").toggle();
		if(contador==1){
			$(".Header__userList").animate({
				// z-index:"99",
				left:"0"
			});
			contador=0;
		}
		else{
			contador=1;
			$(".Header__userList").animate({
				left:"-100%"
			})
		}
	});
};

function adiosMobile(){
	$('.Header__optionMobile').click(function (){
		if (contador==0) {
			contador = 0;
			$('.Header__userList').animate({
				left:'-100%'
			});
			contador = 1;
		}
	});
};


function mainDesktop(){
	$(".Header__userDesktop").click(function(){
		//$("nav").toggle();
		if(contador==1){
			$(".Header__listDesktop").animate({
				// z-index:"99",
				right:"0"
			});
			contador=0;
		}
		else{
			contador=1;
			$(".Header__listDesktop").animate({
				right:"-100%"
			})
		}
	});
};

function adiosDesktop(){
	$('.Header__linkDesktop').click(function (){
		if (contador==0) {
			contador = 0;
			$('.Header__listDesktop').animate({
				right:'-100%'
			});
			contador = 1;
		}
	});
};