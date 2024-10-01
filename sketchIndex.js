const CURRENT_DATE = new Date();
const START_DATE = new Date(2024, 6, 6, CURRENT_DATE.getHours(), CURRENT_DATE.getMinutes(), CURRENT_DATE.getSeconds(), CURRENT_DATE.getMilliseconds());

function getDaysBetweenDates(startDate, endDate) {
  const timeDifference = endDate.getTime() - startDate.getTime();
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  return Math.abs(Math.round(daysDifference)) + 1; // +1 to include the start date
}

function getSketchDateString(offset) {
  let sketchDate = new Date(START_DATE);
  sketchDate.setDate(START_DATE.getDate() + offset);
  let dayDigit = sketchDate.getDate();
  let day = dayDigit < 10 ? '0' + dayDigit : dayDigit;
  let monthDigit = sketchDate.getMonth() + 1;
  let month = monthDigit < 10 ? '0' + monthDigit : monthDigit;
  let year = sketchDate.getFullYear();
  return`${month}${day}${year}`;
}

function checkIfImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    
    if (img.complete) {
      resolve(true);
    } else {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    }
  });
}

function createSketchElement(sketchDateString, i) {
  let sketchEl = document.createElement('div');
  sketchEl.className = 'sketch-item';
  sketchEl.style.order = numberOfDays - i;
  sketchTitle = document.createElement('h2');
  sketchTitle.innerText = sketchDateString;
  sketchEl.appendChild(sketchTitle);
  sketchImg = document.createElement('img');
  sketchImg.src = 'images/' + sketchDateString + '.png';
  sketchEl.appendChild(sketchImg);
  sketchEl.addEventListener('click', (event) => {
    window.location.href = 'sketch.html?' + sketchDateString;
    event.preventDefault();
  });

  return sketchEl;
}
let numberOfDays = getDaysBetweenDates(START_DATE, CURRENT_DATE);
const sketchPromisesPageOne = [];
const sketchPromises = [];

let firstBatchCount = 0;
for (let i = numberOfDays - 1; i >= 0; i--) {
  let sketchDateString = getSketchDateString(i);
  let sketchPromise = checkIfImageExists(`images/${sketchDateString}.png`).then((exists) => {
    if (exists) {
      return createSketchElement(sketchDateString, i);
    }
    return null;
  });

  if (firstBatchCount < 10 && sketchPromise !== null) {
    sketchPromisesPageOne.push(sketchPromise);
    firstBatchCount++;
  } else if (sketchPromise !== null) {
    sketchPromises.push(sketchPromise);
  }
}

const container = document.getElementById('index-container');

Promise.all(sketchPromisesPageOne).then((sketchElements) => {
  sketchElements.forEach((sketchEl) => {
    container.appendChild(sketchEl);
  });
});

Promise.all(sketchPromises).then((sketchElements) => {
  sketchElements.forEach((sketchEl) => {
    container.appendChild(sketchEl);
  });
});