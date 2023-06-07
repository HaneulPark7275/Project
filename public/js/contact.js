const frame = document.querySelector("section");
const lists = frame.querySelectorAll("article");

const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");
const deg = 72; //각각의 article요소가 회전할 각도
const len = lists.length - 1;
let i = 0;
let num = 0;
let active = 0;

//article의 개수만큼 반복
for (let el of lists) {
  el.style.transform = `rotate(${deg * i}deg) translateY(-100vh)`;
  i++;
}

function activation(index, lists) {
  for (let el of lists) {
    el.classList.remove("on");
  }
  lists[index].classList.add("on");
}

prev.addEventListener("click", () => {
  num++;
  frame.style.transform = `rotate(${deg * num}deg)`;
  active == 0 ? (active = len) : active--;
  activation(active, lists);
});
next.addEventListener("click", () => {
  num--;
  frame.style.transform = `rotate(${deg * num}deg)`;
  active == len ? (active = 0) : active++;
  activation(active, lists);
});
