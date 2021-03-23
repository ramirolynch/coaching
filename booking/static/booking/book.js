function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');


// this function ampm changes format from ampm to 24 hour format 

function ampm(time) {

    if ((time.includes('p.m.')) && (time.includes(':'))) {

        const timeSplit = time.split(":");

        let timeParse = parseInt(timeSplit[0]);
        let hours = timeParse + 12;
        let minutes = timeSplit[1];
        let minutesSliced = minutes.slice(0,-5);
     
        let hoursminutes = hours + ":" + minutesSliced;

        return hoursminutes;
    }

    else if ((time.includes('p.m.')) && (!time.includes(':'))) {
        
        const timeSplit = time.split(":");
        
        let timeParse = parseInt(timeSplit[0]);
        let hours = timeParse + 12;
        let minutes = "00";
        let hoursminutes = hours + ":" + minutes;
        return hoursminutes;
    }

    else if ((time.includes('a.m.')) && (time.includes(':'))) {

        
        const timeSplit = time.split(":");

        let minutes = timeSplit[1].slice(0, -5);

        let hoursLength = timeSplit[0].length

        let hours = hoursLength == 1 ? "0" + timeSplit[0] : timeSplit[0];

        let hourMinutes = hours + ":" + minutes;
            
        return hourMinutes;
    }

    else if ((time.includes('a.m.')) && (!time.includes(":"))) {

        let hoursSliced = time.slice(0, -5);

        let hoursLength = hoursSliced.length;

        let hours = hoursLength == 1 ? "0" + hoursSliced : hoursSliced;
    
        let minutes = "00";
        let hoursminutes = hours + ":" + minutes;
        return hoursminutes;

    }

    else if (time.includes("midnight")) {
        let time24 = "23:59";
        return time24;
    }

    else if (time.includes("noon")) {
        
        let time24 = "12:00";
        return time24;
    }

    else {
        // this is how this application will handle an error in the time formatting:
        let time24 = "00:00";
        return time24;
    }

    }

// formats the date so that it can fill the edit schedule form
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function editSchedule(schedule_id) {

    const editBtn = document.querySelector(`#edit-${ schedule_id }`);
    const saveBtn = document.querySelector(`#save-${ schedule_id }`);
    const editForm = document.querySelector(`#edit_form-${ schedule_id }`);

    const availDateOld = document.querySelector(`#card-availdate-${ schedule_id }`);
    const availUntilOld = document.querySelector(`#card-availuntil-${ schedule_id }`);
    const availStartOld = document.querySelector(`#card-starttime-${ schedule_id }`);
    const availEndOld = document.querySelector(`#card-endtime-${ schedule_id }`);

    const availDateOldValue = availDateOld.innerHTML
    const availUntilOldValue = availUntilOld.innerHTML
    const availStartOldValue = availStartOld.innerHTML
    const availEndOldValue = availEndOld.innerHTML

    console.log(`hey this is the value ${availEndOldValue}`)

    const availDateOldValueSlice = availDateOldValue.slice(12)
    const availUntilOldValueSlice = availUntilOldValue.slice(13)
    const availStartOldValueSlice = availStartOldValue.slice(12)
    const availEndOldValueSlice = availEndOldValue.slice(10)

    console.log(`please check out ${availEndOldValueSlice}`);
        
    const availStartOldValueampm = ampm(availStartOldValueSlice);
    const availEndOldValueampm = ampm(availEndOldValueSlice);
    

    const availDateOldValueSliceDatetime = formatDate(availDateOldValueSlice);
    const availUntilOldValueSliceDatetime = formatDate(availUntilOldValueSlice);


    console.log(availEndOldValueampm);
    console.log(availStartOldValueampm);

    console.log(availDateOldValueSliceDatetime);


    const editAvail = document.querySelector(`#availdate-${schedule_id}`);
    const editUntil = document.querySelector(`#availuntil-${schedule_id}`);
    const editStart = document.querySelector(`#starttime-${schedule_id}`);
    const editEnd = document.querySelector(`#endtime-${schedule_id}`);

    editAvail.value = availDateOldValueSliceDatetime;
    editUntil.value = availUntilOldValueSliceDatetime;
    editStart.value = availStartOldValueampm;
    editEnd.value = availEndOldValueampm;

    
    console.log(editBtn);
    console.log(editForm);
    
    editForm.style.display = "block";
    editBtn.style.display = "none";
    saveBtn.style.display = "block";
    
    }
    
    
function saveSchedule(schedule_id) {

const availDate = document.querySelector(`#availdate-${ schedule_id}`)
const availUntil = document.querySelector(`#availuntil-${schedule_id}`)
const startTime = document.querySelector(`#starttime-${schedule_id}`)
const endTime = document.querySelector(`#endtime-${schedule_id}`)

const availDateContent = availDate.value;
const availUntilContent = availUntil.value;
const startTimeContent = startTime.value;
const endTimeContent = endTime.value;

const saveBtn = document.querySelector(`#save-${ schedule_id }`);

console.log(availDateContent);
console.log(availUntilContent);
console.log(startTimeContent);
console.log(endTimeContent);

console.log(`this is the value of availDateContent ${ availDateContent }`)

console.log(`the data type of dateBookingValue is ${typeof(availDateContent)}`)

const availDateYear = availDateContent.slice(0,4)
console.log(`this is availDateYear ${availDateYear}`)
const availDateMonth = parseInt(availDateContent.slice(5,7)) - 1;
console.log(`this is availDateMonth ${availDateMonth}`)
const availDateDay = availDateContent.slice(8,10)
console.log(`this is availDateDay ${availDateDay}`)

const availUntilYear = availUntilContent.slice(0,4)
console.log(`this is availUntilYear ${availUntilYear}`)
const availUntilMonth = parseInt(availUntilContent.slice(5,7)) - 1;
console.log(`this is availUntilMonth ${availUntilMonth}`)
const availUntilDay = availUntilContent.slice(8,10)
console.log(`this is availUntilDay ${availUntilDay}`)



fetch("/api/available/" + schedule_id + "/", {
        credentials: 'include',
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        mode: 'same-origin',
        body: JSON.stringify({  
            date_available : availDateContent,
            available_until : availUntilContent,
            start_time : startTimeContent,
            end_time : endTimeContent
        })
})
.then(function(response) {
        return response.json();
})
.then(function(data) {
        console.log("Data is ok", data);
    })
    .catch(function(ex) {
        console.log("parsing failed", ex);
    });


const availDateOld = document.querySelector(`#card-availdate-${ schedule_id }`);
const availUntilOld = document.querySelector(`#card-availuntil-${ schedule_id }`);
const availStartOld = document.querySelector(`#card-starttime-${ schedule_id }`);
const availEndOld = document.querySelector(`#card-endtime-${ schedule_id }`);

const months = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
let availDateFormat = new Date(availDateYear, availDateMonth, availDateDay)
let formattedAvailDateContent = months[availDateFormat.getMonth()] + " " + availDateFormat.getDate() + ", " + availDateFormat.getFullYear();
let formattedAvailDateContentStr = "Avail Date: " + formattedAvailDateContent;

let availUntilFormat = new Date(availUntilYear, availUntilMonth, availUntilDay)
let formattedAvailUntilContent = months[availUntilFormat.getMonth()] + " " + availUntilFormat.getDate() + ", " + availUntilFormat.getFullYear();
let formattedAvailUntilContentStr = "Avail Until: " + formattedAvailUntilContent;

console.log(formattedAvailDateContent)

function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    
    if (time.length > 1) { // If time format correct
        time = time.slice (1);  // Remove full string match value
        time[5] = +time[0] < 12 ? ' a.m.' : ' p.m.'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
    }
    
const formattedStartTimeContentStr = "Start Time: " + tConvert(startTimeContent);
const formattedEndTimeContentStr = "End Time: " + tConvert(endTimeContent);


availDateOld.textContent = formattedAvailDateContentStr;
availUntilOld.textContent = formattedAvailUntilContentStr;
availStartOld.textContent = formattedStartTimeContentStr;
availEndOld.textContent = formattedEndTimeContentStr;

const availDateOldContent = availDateOld.textContent;


console.log("This app is working");

console.log(availDateOldContent);


// postBod.textContent = textAreaContent;

const editBtn = document.querySelector(`#edit-${ schedule_id }`);
const editForm = document.querySelector(`#edit_form-${ schedule_id }`);

editForm.style.display = "none";
editBtn.style.display = "block";
saveBtn.style.display = "none";

}



    function deleteSchedule(schedule_id) {

    const cardDiv = document.querySelector(`#card-${ schedule_id }`);

    fetch("/api/available/" + schedule_id + "/", {
        credentials: 'include',
        method: 'DELETE',
        headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'X-CSRFToken': csrftoken
           },
        mode: 'same-origin'
    })
    .then(function(response) {
            return response.json();
    })
   .then(function(data) {
        console.log("Data is ok", data);
    })
    .catch(function(ex) {
        console.log("parsing failed", ex);
    });

    console.log("schedule was deleted")

    cardDiv.style.display = "none";
       
};


function editBooking(booking_id) {

    const editBtn = document.querySelector(`#edit-${ booking_id }`);
    const saveBtn = document.querySelector(`#save-${ booking_id }`);
    const editForm = document.querySelector(`#edit_form-${ booking_id }`);

    console.log(editBtn)

    const dateBooking = document.querySelector(`#card-datebooking-${ booking_id }`);
    const startBooking = document.querySelector(`#card-startbooking-${ booking_id }`);
    const endBooking = document.querySelector(`#card-endbooking-${ booking_id }`);

    console.log(dateBooking)
  

    const dateBookingInnerHtml = dateBooking.innerHTML
    const startBookingInnerHtml = startBooking.innerHTML
    const endBookingInnerHtml = endBooking.innerHTML

    console.log(`hey this is the value ${dateBookingInnerHtml}`)

    const dateBookingInnerHtmlSlice = dateBookingInnerHtml.slice(14)
    const startBookingInnerHtmlSlice = startBookingInnerHtml.slice(12)
    const endBookingInnerHtmlSlice = endBookingInnerHtml.slice(10)
    

    console.log(`please check out ${dateBookingInnerHtmlSlice}`);

    const dateBookingInnerHtmlSliceDatetime = formatDate(dateBookingInnerHtmlSlice);
    const startBookingInnerHtmlSliceAmpm = ampm(startBookingInnerHtmlSlice );
    const endBookingInnerHtmlSliceAmpm = ampm(endBookingInnerHtmlSlice);

    console.log(startBookingInnerHtmlSliceAmpm);
    console.log(endBookingInnerHtmlSliceAmpm);
    console.log(dateBookingInnerHtmlSliceDatetime);


    const dateBookingEdit = document.querySelector(`#datebooking-${booking_id}`);
    const startBookingEdit = document.querySelector(`#startbooking-${booking_id}`);
    const endBookingEdit = document.querySelector(`#endbooking-${booking_id}`);
    
    dateBookingEdit.value = dateBookingInnerHtmlSliceDatetime;
    startBookingEdit.value = startBookingInnerHtmlSliceAmpm;
    endBookingEdit.value = endBookingInnerHtmlSliceAmpm;
    
    editForm.style.display = "block";
    editBtn.style.display = "none";
    saveBtn.style.display = "block";
    
    }

// create function to save booking

function saveBooking(booking_id) {

    const dateBookingEdit = document.querySelector(`#datebooking-${booking_id}`)
    const startBookingEdit = document.querySelector(`#startbooking-${booking_id}`)
    const endBookingEdit = document.querySelector(`#endbooking-${booking_id}`)

    const dateBookingValue = dateBookingEdit.value;
    const startBookingValue = startBookingEdit.value;
    const endBookingValue = endBookingEdit.value;

    console.log(`this is the value of dateBookingValue ${ dateBookingValue }`)

    console.log(`the data type of dateBookingValue is ${typeof(dateBookingValue)}`)

    const yearBooking = dateBookingValue.slice(0,4)
    console.log(`this is yearBooking ${yearBooking}`)
    const monthBooking = parseInt(dateBookingValue.slice(5,7)) - 1;
    console.log(`this is monthBooking ${monthBooking}`)
    const dayBooking = dateBookingValue.slice(8,10)
    console.log(`this is dayBooking ${dayBooking}`)

    
    const saveBtn = document.querySelector(`#save-${ booking_id }`);

    
    fetch("/api/booking/" + booking_id + "/", {
         credentials: 'include',
         method: 'PUT',
         headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken
            },
         mode: 'same-origin',
         body: JSON.stringify({  
              date_booking : dateBookingValue,
              start_booking : startBookingValue,
              end_booking : endBookingValue  
          })
    })
    .then(function(response) {
         return response.json();
    })
    .then(function(data) {
         console.log("Data is ok", data);
     })
     .catch(function(ex) {
         console.log("parsing failed", ex);
     });
    
    
    const bookingDateCard = document.querySelector(`#card-datebooking-${ booking_id }`);
    const bookingStartCard = document.querySelector(`#card-startbooking-${ booking_id }`);
    const bookingEndCard = document.querySelector(`#card-endbooking-${ booking_id }`);

    const months = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let dateBookingDatetime = new Date(yearBooking, monthBooking, dayBooking)

    console.log(`Rami, this is the value of dateBookingDatetime... ${dateBookingDatetime}`)


    let formattedDateBookingDatetime = months[dateBookingDatetime.getMonth()] + " " + dateBookingDatetime.getDate() + ", " + dateBookingDatetime.getFullYear();
    let formattedDateBookingDatetimeStr = "Booking Date: " + formattedDateBookingDatetime;

    console.log(`this is datetime :${formattedDateBookingDatetimeStr}`);

    

    function tConvert (time) {
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? ' a.m.' : ' p.m.'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
      }
      
    const formattedBookingStartTimeStr = "Start Time: " + tConvert(startBookingValue);
    const formattedBookingEndTimeStr = "End Time: " + tConvert(endBookingValue);


    bookingDateCard.textContent = formattedDateBookingDatetimeStr;
    bookingStartCard.textContent = formattedBookingStartTimeStr;
    bookingEndCard.textContent = formattedBookingEndTimeStr;

    const bookingDateCardContent = bookingDateCard.textContent;


    console.log("This app is working");

    console.log(bookingDateCardContent);
  

    const editBtn = document.querySelector(`#edit-${ booking_id }`);
    const editForm = document.querySelector(`#edit_form-${ booking_id }`);
    
    editForm.style.display = "none";
    editBtn.style.display = "block";
    saveBtn.style.display = "none";
    
    }


function deleteBooking(booking_id) {
    
    const cardDiv = document.querySelector(`#card-${ booking_id }`);

    fetch("/api/booking/" + booking_id + "/", {
        credentials: 'include',
        method: 'DELETE',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
        mode: 'same-origin'
    })
    .then(function(response) {
            return response.json();
    })
    .then(function(data) {
        console.log("Data is ok", data);
    })
    .catch(function(ex) {
        console.log("parsing failed", ex);
    });

    console.log("booking was deleted")

    cardDiv.style.display = "none";
   
}


