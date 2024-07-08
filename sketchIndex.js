const CURRENT_DATE = new Date();
const START_DATE = new Date(2024, 6, 6, CURRENT_DATE.getHours(), CURRENT_DATE.getMinutes(), CURRENT_DATE.getSeconds(), CURRENT_DATE.getMilliseconds());


function getDaysBetweenDates(startDate, endDate) {
  const timeDifference = endDate.getTime() - startDate.getTime();
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  console.log('DaysDiff: ', daysDifference + 1);
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

const container = document.getElementById('index-container');

console.log(START_DATE, CURRENT_DATE);
let numberOfDays = getDaysBetweenDates(START_DATE, CURRENT_DATE);
console.log(numberOfDays);
for (let i = 0; i < numberOfDays; i++) {
  let sketchDateString = getSketchDateString(i);
  console.log(sketchDateString);
  // let sketch = document.createElement('script');
  // sketch.src = 'sketches/' + sketchDateString + '.js';
  // container.appendChild(sketch);

  let sketchEl = document.createElement('div');
  sketchEl.className = 'sketch-item';
  sketchTitle = document.createElement('h2');
  sketchTitle.innerText = sketchDateString;
  sketchEl.appendChild(sketchTitle);
  sketchImg = document.createElement('img');
  sketchImg.src = 'images/' + sketchDateString + '.png';
  sketchEl.appendChild(sketchImg);

  container.appendChild(sketchEl);
}
