/* eslint-disable no-undef */ //<= for JQuery recognition (to display no errors in reference to JQuery)
//Displaying date using Moment
function displayTime() {
	var today = moment().format('MMMM Do YYYY, h:mm:ss a');
	$('#currentDay').html(today);
	setInterval(displayTime, 1000);
}
displayTime();

//Created object to hold time values based on military time
timeBlocks = [
	{ hour: 8, time: '08:00 AM', value: '' },
	{ hour: 9, time: '09:00 AM', value: '' },
	{ hour: 10, time: '10:00 AM', value: '' },
	{ hour: 11, time: '11:00 AM', value: '' },
	{ hour: 12, time: '12:00 PM', value: '' },
	{ hour: 13, time: '01:00 PM', value: '' },
	{ hour: 14, time: '02:00 PM', value: '' },
	{ hour: 15, time: '03:00 PM', value: '' },
	{ hour: 16, time: '04:00 PM', value: '' },
	{ hour: 17, time: '05:00 PM', value: '' },
	{ hour: 18, time: '06:00 PM', value: '' },
	{ hour: 19, time: '07:00 PM', value: '' },
	{ hour: 20, time: '08:00 PM', value: '' },
	{ hour: 21, time: '09:00 PM', value: '' },
];

// for (let item of timeBlocks) {
for (let i = 0; i < timeBlocks.length; i++) {
	// started the for loop at 9 so the data-time can be set starting at 8 then renders up to 17 (5PM)
	let item = timeBlocks[i];

	const currentHour = new Date().getHours();
	const cssClass =
		currentHour > item.hour
			? 'past'
			: currentHour === item.hour
			? 'present'
			: 'future';
	const savedText = localStorage.getItem(`saveSchedule-${item.hour}`) || '';

	//creating times to append to the DOM
	$('.timeBlocks').append(`
        <div class="row hour time-block mb-2 border-bottom ${cssClass}">
            <div class="time col-1">${item.time}</div>
            <div class="input-group mb-3 col-11">
                <input id="userInput ${item.hour}" type="text" class="form-control" value="${savedText}">
                <button class="btn btn-outline-secondary ml-2" type="button" id="button-addon2" onclick="save(${item.hour})">
                    <i class="fa fa-save" style="font-size:20px"></i>
                </button>
            </div>
        </div>  
    `);
}

function save(hour) {
	const value = document.getElementById(`userInput-${hour}`).value || '';
	localStorage.setItem(`saveSchedule-${hour}`, value);
}

function clearAll() {
	for (const item of timeBlocks) {
		document.getElementById(`userInput-${item.hour}`).value = '';
		localStorage.removeItem(`saveSchedule-${item.hour}`);
	}
}

// schedule.sortable(); --- future option maybe make event entries "movable"
