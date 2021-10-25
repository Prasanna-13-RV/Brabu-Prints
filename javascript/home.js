const sliderFrontPage = document.querySelector(".sliderFrontPage");
const layers = document.querySelectorAll(".layer1");

const parallax = (args, e) => {
	args.forEach((arg) => {
		let speed = arg.getAttribute("data-speed");
		const x = (e.pageX * speed) / 100;
		const y = (e.pageY * speed) / 100;
		arg.style.transform = `translateX(${x}px) translateY(${y}px)`;
	});
};
sliderFrontPage.addEventListener("mousemove", (e) => {
	parallax(layers, e);
	const x = (e.pageX * 1) / 100;
	const y = (e.pageY * 1) / 100;
});

const parallax1 = document.querySelector(".parallax1");
const leafreadMore1 = document.querySelector(".leafreadMore1");
const leafreadMore2 = document.querySelector(".leafreadMore2");
const leafreadMore3 = document.querySelector(".leafreadMore3");
const leafSpan1 = document.querySelector(".leafSpan1");
const leafSpan2 = document.querySelector(".leafSpan2");
const leafSpan3 = document.querySelector(".leafSpan3");
const leafUl = document.querySelector(".leafUl");
const leaf1 = document.querySelector(".leaf1");
const leaf2 = document.querySelector(".leaf2");
const leaf3 = document.querySelector(".leaf3");
const paralaxH11 = document.querySelector(".paralaxH11");
const paralaxH12 = document.querySelector(".paralaxH12");
const paralaxH13 = document.querySelector(".paralaxH13");



leafreadMore1.addEventListener("click" , () => {
	// parallax1.style.background = `url(../img/EP1A3570.jpg)`;
	// parallax1.style.backgroundAttachment = "fixed";
	paralaxH11.style.marginTop = "6%";
	paralaxH12.style.marginTop = "0%";
	paralaxH13.style.marginTop = "0%";
	paralaxH11.style.paddingLeft = "0%";
	paralaxH12.style.paddingLeft = "6%";
	paralaxH13.style.paddingLeft = "6%";
	paralaxH11.style.textAlign = "center";
	paralaxH12.style.textAlign = "left";
	paralaxH13.style.textAlign = "left";
	leafSpan1.style.opacity = "1";
	leafSpan2.style.opacity = "0";
	leafSpan3.style.opacity = "0";
	leafUl.style.opacity = "0";
	leaf1.style.height = "60%";
	leaf2.style.height = "50%";
	leaf3.style.height = "50%";
	leaf1.style.borderRadius = "0%";
	leaf2.style.borderRadius = "0% 50% 0% 50%";
	leaf3.style.borderRadius = "0% 50% 0% 50%";
	leafreadMore1.style.display = "none";
	leafreadMore2.style.display = "block";
	leafreadMore3.style.display = "block";
})
leafreadMore2.addEventListener("click" , () => {
	// parallax1.style.background = `url(../img/EP1A3570.jpg)`;
	// parallax1.style.backgroundAttachment = "fixed";
	paralaxH11.style.marginTop = "0%";
	paralaxH12.style.marginTop = "6%";
	paralaxH13.style.marginTop = "0%";
	paralaxH11.style.paddingLeft = "6%";
	paralaxH12.style.paddingLeft = "0%";
	paralaxH13.style.paddingLeft = "6%";
	paralaxH11.style.textAlign = "left";
	paralaxH12.style.textAlign = "center";
	paralaxH13.style.textAlign = "left";
	leafSpan1.style.opacity = "0";
	leafSpan2.style.opacity = "1";
	leafSpan3.style.opacity = "0";
	leafUl.style.opacity = "0";
	leaf1.style.height = "50%";
	leaf2.style.height = "70%";
	leaf3.style.height = "50%";
	leaf1.style.borderRadius = "0% 50% 0% 50%";
	leaf2.style.borderRadius = "0%";
	leaf3.style.borderRadius = "0% 50% 0% 50%";
	leafreadMore1.style.display = "block";
	leafreadMore2.style.display = "none";
	leafreadMore3.style.display = "block";
})
leafreadMore3.addEventListener("click" , () => {
	// parallax1.style.background = `url(../img/EP1A3570.jpg)`
	// parallax1.style.backgroundAttachment = "fixed";
	paralaxH11.style.marginTop = "0%";
	paralaxH12.style.marginTop = "0%";
	paralaxH13.style.marginTop = "6%";
	paralaxH11.style.paddingLeft = "6%";
	paralaxH12.style.paddingLeft = "6%";
	paralaxH13.style.paddingLeft = "0%";
	paralaxH11.style.textAlign = "left";
	paralaxH12.style.textAlign = "left";
	paralaxH13.style.textAlign = "center";
	leafSpan1.style.opacity = "0";
	leafSpan2.style.opacity = "0";
	leafSpan3.style.opacity = "1";
	leafUl.style.opacity = "1";
	leaf1.style.height = "50%";
	leaf2.style.height = "50%";
	leaf3.style.height = "70%";
	leaf1.style.borderRadius = "0% 50% 0% 50%";
	leaf2.style.borderRadius = "0%";
	leaf3.style.borderRadius = "0% 50% 0% 50%";
	leaf1.style.borderRadius = "0% 50% 0% 50%";
	leaf2.style.borderRadius = "0% 50% 0% 50%";
	leaf3.style.borderRadius = "0%";
	leafreadMore1.style.display = "block";
	leafreadMore2.style.display = "block";
	leafreadMore3.style.display = "none";
})

