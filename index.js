const cardGrid = document.querySelector(".card-grid");
const years = document.querySelectorAll(".year");
const resetCard = document.querySelectorAll(".card");
const content = document.querySelector(".content");
const launchSuccessButton = document.querySelector(".launch-button-true");
const launchSuccessFalse = document.querySelector(".launch-button-false");
const launchAndLandButton = document.querySelector(".landing-button-true");
const launchAndLandFalse = document.querySelector(".landing-button-false");
// const loadResults = document.querySelector("")

launchAndLandButton.addEventListener("click", onLaunchAndLand);
launchSuccessButton.addEventListener("click", onLaunchSuccess);

//false landing filter function
async function onLaunchFalse() {
  const falseLaunch = await fetch(
    "https://api.spacexdata.com/v3/launches?limit=100"
  );
  const falseLaunchData = await falseLaunch.json();
  launchFalseHandler(falseLaunchData);
}

function launchFalseHandler(data) {
  resetCardGrid();
  data.forEach((element) => {
    const getLaunchData = element.launch_success;
    const getYear = element.launch_year;
    if (getLaunchData === false) {
      console.log(getLaunchData);
      createCard(getYear, element);
      return true;
    }
  });
}

//launch success filter
async function launchSuccess() {
  //request data from api
  const launchSuccessData = await fetch(
    `https://api.spacexdata.com/v3/launches?limit=100`
  );
  const mainData = await launchSuccessData.json();

  //add eventListener to each button and get value of it
  years.forEach((element) => {
    element.addEventListener("click", () => {
      const filteredYear = element.getAttribute("data-year");
      filterYear(filteredYear, mainData);
    });
  });
}

//default loading page
async function onPageLoad() {
  const pageLoad = await fetch(
    "https://api.spacexdata.com/v3/launches?limit=100"
  );
  const pageLoadData = await pageLoad.json();
  pageLoadHandler(pageLoadData);
}

function pageLoadHandler(data) {
  resetCardGrid();
  data.forEach((element) => {
    const getYear = element.launch_year;
    createCard(getYear, element);
  });
}

async function onLaunchSuccess() {
  const launchSuccess = await fetch(
    "https://api.spacexdata.com/v3/launches?limit=100&launch_success=true"
  );
  const launchSuccessData = await launchSuccess.json();
  filterLaunchSuccess(launchSuccessData);
}

//on launch and land click
async function onLaunchAndLand() {
  const launchAndLand = await fetch(
    "https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true"
  );
  const launchAndLandData = await launchAndLand.json();
  filterLaunchSuccess(launchAndLandData);
}

function filterLaunchSuccess(data) {
  resetCardGrid();
  data.forEach((element) => {
    const getYear = element.launch_year;
    createCard(getYear, element);
  });
}

function filterLaunchAndLand(data) {
  resetCardGrid();
  data.forEach((element) => {
    const getYear = element.launch_year;
    createCard(getYear, element);
  });
}

//filter data via year
function filterYear(year, data) {
  resetCardGrid();
  data.forEach((element) => {
    const getYear = element.launch_year;
    if (getYear === year) {
      createCard(getYear, element);
      return true;
    }
  });
  if (cardGrid.innerHTML === "") {
    noResult();
  }
}
function noResult() {
  const noResults = document.createElement("div");
  noResults.innerText = "No Results Found!";
  noResults.classList.add("no-results");
  cardGrid.append(noResults);
}
//reset display
function resetCardGrid() {
  const cardGrid = document.querySelector(".card-grid");
  cardGrid.innerHTML = "";
}

//create card info
function createCard(getYear, data) {
  const card = document.createElement("div");
  const img = document.createElement("img");

  const missionName = document.createElement("div");
  const flightNumber = document.createElement("span");
  const missionId = document.createElement("div");
  const launchYear = document.createElement("p");
  const missionIdLine = document.createElement("li");
  const successfulLaunch = document.createElement("div");
  const successfulLanding = document.createElement("div");
  const imageContainer = document.createElement("div");

  card.classList.add("card");
  img.classList.add("tile-image");
  launchYear.classList.add("launch-year");
  missionName.classList.add("mission-name");
  imageContainer.classList.add("image-container");

  img.src = data.links.mission_patch_small;
  launchYear.innerText = `Launch Year: ${getYear}`;
  missionName.innerText = data.mission_name;
  flightNumber.innerText = `#${data.flight_number}`;

  missionId.innerText = "Mission Ids: ";
  missionIdLine.innerText = "{}";
  successfulLaunch.innerText = `Successful Launch: ${data.launch_success}`;
  successfulLanding.innerText = "Launch Landing: ";

  cardGrid.append(card);
  imageContainer.append(img);
  card.append(imageContainer);
  card.append(missionName);
  missionName.append(flightNumber);
  card.append(missionId);
  card.append(missionIdLine);
  card.append(launchYear);
  card.append(successfulLaunch);
  card.append(successfulLanding);
  content.classList.remove("loading");
}

launchSuccess();
window.onload = onPageLoad;

// launchSuccessFalse.addEventListener("click", onLaunchFalse);
// launchAndLandFalse.addEventListener("click", onLandingFalse);

// async function onLandingFalse() {
//   const falseLanding = await fetch(
//     "https://api.spacexdata.com/v3/launches?limit=100"
//   );
//   const falseLandingData = await falseLanding.json();
//   landingFalseHandler(falseLandingData);
// }

// function landingFalseHandler(data) {
//   resetCardGrid();
//   data.forEach((element) => {
//     const getLandingData = element.launch_success;
//     const getYear = element.launch_year;
//     if (getLandingData === false) {
//       console.log(getLaunchData);
//       createCard(getYear, element);
//       return true;
//     }
//   });
// }
