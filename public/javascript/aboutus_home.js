const aboutUsOne = document.querySelector(".div-about-one");
const aboutUsTwo = document.querySelector(".div-about-two");
const aboutUsThree = document.querySelector(".div-about-three");

const aboutUsOneImage = document.querySelector(".about-us-one-image");
const aboutUsTwoImage = document.querySelector(".about-us-two-image");
const aboutUsThreeImage = document.querySelector(".about-us-three-image");

const aboutUsOneH1 = document.querySelector(".about-us-one-h1");
const aboutUsTwoH1 = document.querySelector(".about-us-two-h1");
const aboutUsThreeH1 = document.querySelector(".about-us-three-h1");

const aboutUsOneContent = document.querySelector(".about-us-one-content");
const aboutUsTwoContent = document.querySelector(".about-us-two-content");
const aboutUsThreeContent = document.querySelector(".about-us-three-content");

const aboutUsAnimi = (aboutUsDiv, image, h1, content) => {
  aboutUsDiv.addEventListener("mouseenter", () => {
    image.classList.toggle("aboutUs-Image");
    h1.classList.toggle("aboutUs-H1");
    content.classList.toggle("aboutUs-Content");
  });
};

aboutUsAnimi(aboutUsOne, aboutUsOneImage, aboutUsOneH1, aboutUsOneContent);
aboutUsAnimi(aboutUsTwo, aboutUsTwoImage, aboutUsTwoH1, aboutUsTwoContent);
aboutUsAnimi(
  aboutUsThree,
  aboutUsThreeImage,
  aboutUsThreeH1,
  aboutUsThreeContent
);
