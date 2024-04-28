window.onload = function(){
    let navlink = window.location.pathname;
    let activeNav = document.querySelector(`a[href="${navlink}"]`);
    activeNav.classList.add('active');

    //finction to display currecnt date
    getCurrentDate();
    displayWeather();
}


//date
function getCurrentDate() {
    const date = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const day = dayNames[date.getDay()];
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = monthNames[date.getMonth() + 1];
    const yyyy = date.getFullYear();
    let dateDiv = document.getElementById('date');
    dateDiv.textContent = `${day} ${dd} ${mm} ${yyyy}`;
}


//weather
async function displayWeather() {
    const apiKey = '1ca43d06560445725ff14e55ebff4df4';
    const zip = '144001';
    const code = 'in'
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${code}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const weatherData = await response.json();
    const curTemp = weatherData.main.temp; // temp in C.
    const location = weatherData.name;
    const cloud = weatherData.weather[0].main;

    const locDiv = document.getElementById("location");
    const tempDiv = document.getElementById('curTemp');
    const cloudDiv = document.getElementById('cloud');

    tempDiv.textContent = curTemp;
    locDiv.textContent = location;
    cloudDiv.textContent = cloud;
}

document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar')
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      selectable: true,
    })
    calendar.render()
})