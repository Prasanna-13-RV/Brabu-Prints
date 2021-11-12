const leafOne = document.querySelector(".leaf-one");
const leafTwo = document.querySelector(".leaf-two");
const leafThree = document.querySelector(".leaf-three");

const buttonOne = document.querySelector(".button-one");
const buttonTwo = document.querySelector(".button-two");
const buttonThree = document.querySelector(".button-three");

const leafContentOne = document.querySelector(".leaf-content-one");
const leafContentTwo = document.querySelector(".leaf-content-two");
const leafContentThree = document.querySelector(".leaf-content-Three");

const leafH1One = document.querySelector(".leaf-h1-one");
const leafH1Two = document.querySelector(".leaf-h1-two");
const leafH1Three = document.querySelector(".leaf-h1-three");

const content = (button, contentno) => {
  button.addEventListener("click", () => {
    contentno.classList.toggle("heading");
  });
};

content(buttonOne, leafContentOne);
content(buttonTwo, leafContentTwo);
content(buttonThree, leafContentThree);

const heightJs = (button, heightDif) => {
  button.addEventListener("click", () => {
    heightDif.classList.toggle("height");
  });
};

heightJs(buttonOne, leafOne);
heightJs(buttonTwo, leafTwo);
heightJs(buttonThree, leafThree);

const buttonrotateJs = (button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("buttonRotate");
  });
};
buttonrotateJs(buttonOne);
buttonrotateJs(buttonTwo);
buttonrotateJs(buttonThree);
