const graphComponent = document.querySelector(".graph-component");

let dataState = [];
let today = "wed";

const fetchData = async function () {
  const response = await fetch("data.json");
  const data = await response.json();

  dataState = data;
  console.log(data);
};

const init = async function () {
  await fetchData();
  console.log(dataState);
  const markup = createMarkup(dataState);
  renderMarkup(markup);
};

init();

const createMarkup = function (data) {
  const markup = data
    .map(
      (item) => `
    <div class="${item.day} graph-item">
          <div class="amount-block inactive"> $${item.amount}</div>
          <div class="graph-bar ${
            item.day === today ? "blue-graph" : ""
          }" style="height:${item.amount * 3}px;"></div>
          <p>${item.day}</p>
        </div>
    `
    )
    .join("");
  return markup;
};

const renderMarkup = function (markup) {
  graphComponent.insertAdjacentHTML("beforeend", markup);
};

const toggleTargetClasslist = function (target, targetBar) {
  target.classList.toggle("inactive");
  targetBar.classList.toggle("bright");
};

const eventTypes = ["mouseover", "mouseout"];

eventTypes.forEach((eventType) => {
  graphComponent.addEventListener(eventType, (e) => {
    if (!e.target.classList.contains("graph-bar")) return;

    const targetBar = e.target.closest(".graph-item");
    const target = e.target
      .closest(".graph-item")
      .querySelector(".amount-block");

    toggleTargetClasslist(target, targetBar);
  });
});
