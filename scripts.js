// STEPS
// get the month and year, and find amount of days
// append the days to a grid on the page
// append the date to the page
// highlight the current date


// namespace object
const calliePlanner = {};

// make array of months
calliePlanner.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// store the current month and year in global variables
calliePlanner.currentMonth = '';
calliePlanner.currentYear = '';

// make array of days of the week
// calliePlanner.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// make a function to get the next month
calliePlanner.nextMonth = ()=>{

    if(calliePlanner.currentMonth === 11){
        // add one to the year and set the month to 0
        calliePlanner.currentYear = calliePlanner.currentYear + 1;
        calliePlanner.currentMonth = 0;


        // call the show calendar function again
        calliePlanner.showCalendar();
    } else {
        // add one to the current month
        calliePlanner.currentMonth = calliePlanner.currentMonth + 1;

        // call the show calendar function again
        calliePlanner.showCalendar();
    }
}

// make a function to get the next month
calliePlanner.pastMonth = ()=>{

    if(calliePlanner.currentMonth === 0){
        // minus one from the year and set the month to 11
        calliePlanner.currentYear = calliePlanner.currentYear - 1;
        calliePlanner.currentMonth = 11;


        // call the show calendar function again
        calliePlanner.showCalendar();
    } else {
        // minus one from the current month
        calliePlanner.currentMonth = calliePlanner.currentMonth - 1;

        // call the show calendar function again
        calliePlanner.showCalendar();
    }
}


// make function that gets number of days of the month
calliePlanner.getNumOfDays = () => {
    // check what the date is at 32 days, then subtract from 32 to get the number of days in the month
    return 32 - (new Date(calliePlanner.currentYear, calliePlanner.currentMonth, 32).getDate());
}

// make a function that displays the calendar in a table
calliePlanner.showCalendar = () => {

    // make variables for the current date
    let today = new Date();

    // get first day of the current month
    let firstDay = (new Date(calliePlanner.currentYear, calliePlanner.currentMonth)).getDay();

    // call function to get the number of days in the month
    let daysInMonth = calliePlanner.getNumOfDays(calliePlanner.currentYear, calliePlanner.currentMonth);

    // grab the calendar element
    let calendar = document.getElementById('dynamicCalendar');

    // clear previous cells
    calendar.innerHTML = '';

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

                // check if the date matches todays date, then add class
                if(date === today.getDate() && calliePlanner.currentYear === today.getFullYear() && calliePlanner.currentMonth === today.getMonth()){
                    cell.classList.add('today');
                }

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
    document.getElementById('calendarTitle').innerHTML = `${calliePlanner.months[calliePlanner.currentMonth]} ${calliePlanner.currentYear}`;

}

// make function for event listeners
calliePlanner.eventListeners = () =>{


    // add event listeners for the buttons to change month
    
    // store the buttons in a variable
    const monthButtons = document.querySelectorAll('.changeMonth');

    // add the click event listener
    monthButtons.forEach((button)=>{
        button.addEventListener('click',(e)=>{

            // call function to change the month
            if(e.target.id === 'futureMonth'){
                calliePlanner.nextMonth();

            } else if (e.target.id === 'pastMonth'){
                calliePlanner.pastMonth();
            }
        })
    })


}

// init function
calliePlanner.init = ()=>{
    
    // get current date information
    calliePlanner.currentMonth = new Date().getMonth();
    calliePlanner.currentYear = new Date().getFullYear();

    
    // call function that displays calendar into a table
    calliePlanner.showCalendar();

    // call function for event listeners
    calliePlanner.eventListeners();
}

// document ready
document.addEventListener("DOMContentLoaded", ()=> {

    // call initializing function
    calliePlanner.init();
});