const navLinks = document.querySelector(".navLinks");
const openBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".cancel-btn");
const container = document.querySelector(".cont");
const body = document.querySelector("body");
const liatag = document.querySelectorAll(".navLinks li a")

liatag.forEach(element => {
	element.addEventListener("click" , () => {
		navLinks.classList.remove("active")
	})
});

openBtn.addEventListener("click", () => {
	navLinks.classList.add("active");
	body.classList.add("noscroll");
});
closeBtn.addEventListener("click", () => {
	navLinks.classList.remove("active");
	body.classList.remove("noscroll");
});

const cardContent = document.querySelectorAll(".businessGrowth");
const scrollContent = document.querySelectorAll(".box");

scrollContent.forEach((element) => {
	element.addEventListener("click", function content() {
		cardContent.forEach((content) => {
			content.classList.remove("show");
		});
		scrollContent.forEach((content) => content.classList.remove("color"));
		this.classList.add("color");
		const carContentItems = document.querySelector(`.${this.id}-content`);
		carContentItems.classList.add("show");
	});
});

var x = window.matchMedia("(max-width: 700px)");

const gsapcard = (trig, trigdiv) => {
	gsap
		.timeline({
			scrollTrigger: {
				trigger: trig,
			},
		})
		.to(trigdiv, {
			duration: 0.6,
			x: 0,
			y: 0,
		});
};

gsapcard(".main-header", ".main-header");
// gsapcard(".gsaph1" , ".gsaph1")
gsapcard(".cardright1", ".cardright1");
gsapcard(".cardright2", ".cardright2");
gsapcard(".cardright3", ".cardright3");
gsapcard(".cardleft1", ".cardleft1");
gsapcard(".cardleft2", ".cardleft2");
gsapcard(".card2", ".card2");
gsapcard(".text-card1", ".text-card1");
gsapcard(".text-card2", ".text-card2");
gsapcard(".text-card3", ".text-card3");
gsapcard(".text-card4", ".text-card4");
gsapcard(".text-card5", ".text-card5");
gsapcard(".text-card6", ".text-card6");
gsapcard(".rightProjectPart1", ".rightProjectPart1");
gsapcard(".rightProjectPart2", ".rightProjectPart2");
gsapcard(".rightProjectPart3", ".rightProjectPart3");
gsapcard(".rightProjectPart4", ".rightProjectPart4");
gsapcard(".rightProjectPart5", ".rightProjectPart5");
gsapcard(".rightProjectPart6", ".rightProjectPart6");
gsapcard(".rightProjectPart7", ".rightProjectPart7");
gsapcard(".rightProjectPart8", ".rightProjectPart8");
gsapcard(".contain h1", ".contain h1");
gsapcard(".project h1", ".project h1");
gsapcard(".ourTeamcontent h1", ".ourTeamcontent h1");
gsapcard(".ourTeamcontent p", ".ourTeamcontent p");
gsapcard(".gallery h1", ".gallery h1");
gsapcard(".info", ".info");
gsapcard(".contactDetail", ".contactDetail");

const gsapcard4 = (trig, trigdiv) => {
	gsap
		.timeline({
			scrollTrigger: {
				trigger: trig,
			},
		})
		.from(trig, {
			scaleY: 0,
			x: 0,
			y: 0,
		});
};

gsapcard4(".galleryBox", ".galleryBox");

const ourTeamContainer = document.querySelector(".ourTeamContainer");

const gsapcard1 = (trig, trigdiv) => {
	gsap
		.timeline({
			scrollTrigger: {
				trigger: trig,
				start : "top 80%"
			},
		})
		.to(trigdiv, {
			duration: 0.4,
			x: 0,
			y: 0,
			rotation: "0",
		});
};
gsapcard1(".ourTeamContainer", ".ourTeamContainer");


const galleryaTag = document.querySelector(".galleryaTag");
const galleryaTag1 = document.querySelector(".galleryaTag1");
const showMore1 = document.querySelectorAll(".showMore1");
const showMore2 = document.querySelectorAll(".showMore2");


const showMoreButton = (button, options) => {
	button.addEventListener("click", () => {
		options.forEach((element) => {
			element.classList.toggle("displayjs");
		});
	button.style.display = "none";
	});
};
showMoreButton(galleryaTag, showMore1);
