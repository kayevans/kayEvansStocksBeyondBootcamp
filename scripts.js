// STEPS
// get the month and year, and find amount of days
// append the days to a grid on the page
// append the date to the page
// highlight the current date


// namespace object
const calliePlanner = {};

// make array of months
calliePlanner.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// make array of days of the week
// calliePlanner.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


// make function that gets number of days of the month
calliePlanner.getNumOfDays = (year, month) => {
    // check what the date is at 32 days, then subtract from 32 to get the number of days in the month
    return 32 - (new Date(year, month, 32).getDate());
}

// make a function that displays the calendar in a table
calliePlanner.showCalendar = (year, month) => {
    // get first day of the current month
    let firstDay = (new Date(year, month)).getDay();

    // call function to get the number of days in the month
    let daysInMonth = calliePlanner.getNumOfDays(year, month);

    // grab the calendar element
    let calendar = document.getElementById('calendar');

    // make for loop within for loop to append elements to the calendar
    // first loop to create the rows
    // second to populate the cells
    let date = 0;

    for(i = 0; i < 6; i++){
        // insert rows
        let row = calendar.insertRow();

        for(j = 0; j < 7; j++){
            // if it is the first row, and below the date then populate with nothing
            if(i === 0 && j < firstDay){
                // make a cell
                let cell = row.insertCell();

                // add text to the cell, make it empty
                let createTextNode = document.createElement('p');
                let text = document.createTextNode('');

                // append text to the text node
                createTextNode.appendChild(text);

                // append the num to the cell
                cell.appendChild(createTextNode);

            } else if(date >= daysInMonth){
                // if date becomes bigger than days in month then stop
                break;
            } else{
                // make date increase
                date++;

                // make a cell
                let cell = row.insertCell();

                // add text to the cell, make it empty
                let createTextNode = document.createElement('p');
                let text = document.createTextNode(date);

                // append text to the text node
                createTextNode.appendChild(text);

                // append the num to the cell
                cell.appendChild(createTextNode);
            }
        }

    }

    // grab the title of month and change it based on month
    document.getElementById('calendarTitle').innerHTML = `${calliePlanner.months[month]} ${year}`;

}

// make function for event listeners
calliePlanner.eventListeners = (currentMonth, currentYear) =>{

    // store the current month and year in local variables
    let month = currentMonth;
    let year = currentYear;

    // console.log('month:' + month, 'year:' + year);

    // add event listeners for the buttons to change month
    
    // store the buttons in a variable
    const monthButtons = document.querySelectorAll('.changeMonth');

    // add the click add event listener
    monthButtons.forEach((button)=>{
        button.addEventListener('click',(e)=>{
            if(e.target.id === 'futureMonth'){
                console.log('increase')
            } else if(e.target.id === 'pastMonth'){
                console.log('decrease')
            }

        })
    })


}

// init function
calliePlanner.init = ()=>{
    
    // get current date information
    let thisMonth = new Date().getMonth();
    let thisYear = new Date().getFullYear();

    
    // call function that displays calendar into a table
    calliePlanner.showCalendar(thisYear, thisMonth);

    // call function for event listeners
    calliePlanner.eventListeners(thisMonth, thisYear);
}

// document ready
document.addEventListener("DOMContentLoaded", ()=> {

    // call initializing function
    calliePlanner.init();
});