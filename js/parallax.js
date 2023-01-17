const hero = document.querySelector(".hero");
const laptop = document.querySelector(".laptop");
const layers = document.querySelectorAll(".layer");
const words = document.querySelectorAll(".Words");
const IT = document.querySelector(".name-backdrop");

const parallaxEffectMainPage = (trig, trigdiv, width , height , top , left) => {
	gsap
		.timeline({
			scrollTrigger: {
				trigger: trig,
				start : "top 60%",
			},
		})
		.to(trigdiv, {
			duration : 1.5,
			width : width,
			height: height,
			top : top,
			left: left,
		})
		.to(trigdiv, {
			autoAlpha: 0,
		})
		.to(".mainPagePhoto" , {
			autoAlpha: 1,
		})
		
};

if(window.innerWidth < 450 )
{
	parallaxEffectMainPage(".laptop" , ".laptop" , "39%" , "49%", "17%", "55%");
	parallaxEffectMainPage(".layer1" , ".layer1" , "48%" , "29%", "41%", "46%");
	parallaxEffectMainPage(".layer2" , ".layer2" , "52%" , "60%", "6%", "5%");
	parallaxEffectMainPage(".layer3" , ".layer3" , "25%" , "48%", "6.5%", "52%");
	parallaxEffectMainPage(".layer4" , ".layer4" , "17%" , "12%", "2%", "30%");
}
else {
	parallaxEffectMainPage(".laptop" , ".laptop" , "35%" , "49%", "17%", "59%");
	parallaxEffectMainPage(".layer1" , ".layer1" , "42%" , "35%", "49%", "49%");
	parallaxEffectMainPage(".layer2" , ".layer2" , "48%" , "75%", "6%", "12%");
	parallaxEffectMainPage(".layer3" , ".layer3" , "24%" , "48%", "9.5%", "55%");
	parallaxEffectMainPage(".layer4" , ".layer4" , "16%" , "15%", "0.5%", "35%");
}