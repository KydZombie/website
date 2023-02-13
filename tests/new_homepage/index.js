let infoText = document.getElementById("infopanel");

// let variable;
// try {

//   .then(response => response.json())
//   .then(data => {
//     variable = data;
//     alert(variable);
//   });
// } catch(e) {
//   alert(e);
// }

async function getJson(url) {
  try {
  let response = await fetch("pages.json");
  let data = await response.json();
  } catch (e) {
    alert(e);
  }
}

getJson();

// let moreInfoPages = Array.from(
//   document.querySelectorAll(".pagelist:not(#mainlist)")
// );
// let listOpeners = Array.from(document.getElementsByClassName("subinfo"));

// listOpeners.forEach((element) => {
//   element.addEventListener("mouseenter", () => {
//     let page = document.getElementById(element.dataset.referencePage);
//     let filteredPages = moreInfoPages.filter(
//       (testPage) => !testPage.classList.contains(page)
//     );
//     filteredPages.forEach((element2) => {
//       element2.style = "display: none";
//     });
//     page.style = "display: flex";
//   });
// });

// function showInfo(text) {
//   infoText.innerHTML = text;
//   infoText.hidden = false;
// }

// function hideInfo() {
//   infoText.hidden = true;
// }