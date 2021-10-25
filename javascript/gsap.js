// const gsapForHomePage = (trig, trigdiv, top, x) => {
// 	gsap
// 		.timeline({
// 			scrollTrigger: {
// 				trigger: trig,
//                 start : "top 100%"
// 			},
// 		})
// 		.to(trigdiv, {
// 			duration: 0.5,
// 			top: top,
// 			x: x,
// 		});
// };

gsap
	.timeline({
		scrollTrigger: {
			trigger: ".aboutUsSection",
			start: "top 60%",
		},
	})
	.to(".aboutUsSection", {
		duration: 1,
		x: '100%',
	});

gsap
	.timeline({
		scrollTrigger: {
			trigger: ".divpage",
			// start: "top 60%",
		},
	})
	.to(".divpage", {
		duration: 0.1,
		y: '0%',
	});

gsap
	.timeline({
		scrollTrigger: {
			trigger: ".sectionBEQ",
		},
	})
	.to(".sectionBEQ", {
        stagger : 0.1,
		duration: 0.5,
		left: '0%',
	});
gsap
	.timeline({
		scrollTrigger: {
			trigger: ".info",
		},
	})
	.to(".info", {
        stagger : 0.1,
		duration: 0.5,
		x: '0%',
	});

