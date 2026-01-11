const graphComponent = document.querySelector(".graph-component");

let dataState = [];

const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const todayDate = new Date();
const todayDayOfWeek = todayDate.getDay();
const day = daysOfWeek[todayDayOfWeek];

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
  const maxAmount = Math.max(...data.map((i) => i.amount));

  const markup = data
    .map((item) => {
      const ratio = item.amount / maxAmount;
      return `
    <div class="${item.day} graph-item">
          <div class="amount-block inactive"> $${item.amount}</div>
          <div class="graph-bar ${
            item.day === day ? "blue-graph" : ""
          }" style="--ratio: ${ratio}"></div>
          <p>${item.day}</p>
        </div>
    `;
    })
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
