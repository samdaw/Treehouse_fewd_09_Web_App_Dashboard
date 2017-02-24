const removeButton = document.querySelector('.content-alert');
const traffic = document.getElementById('traffic');
const dailyTraffic = document.getElementById('daily-traffic');
const mobileUsers = document.getElementById('mobile-users');


const messageForm = document.getElementById('message-form');
const inputText = document.querySelectorAll('#message-form input[type=text]');
const textArea = document.querySelectorAll('#message-form textarea');
const submitBtnCnt = document.getElementById('message-btn-container');
const submitBtn = document.getElementById('send-message');

//CHART DATA
const trafficLabel = ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"];
const trafficValue = [0, 431, 1194, 747, 1556, 1403, 1889, 1150, 1734, 1590, 2346, 2199];
const dailyTrafficLabel = ["S", "M", "T", "W", "T", "F", "S"];
const dailyTrafficValue = [50, 100, 175, 150, 225, 175, 75];
const mobileUsersLabel = ["Phones", "Tablets", "Desktop"];
const mobileUsersValue = [55, 25, 20];



//REMOVE ALERT
removeButton.addEventListener('click', (e) => {
	let li = e.target.parentNode;
	let ul = li.parentNode;
	ul.removeChild(li);
});



//VALIDATE MESSAGE FORM
const validateFormElements = function(element) {
    for (var i = 0; i < element.length; i++) {
        var isValid = element[i].checkValidity();
        if (isValid) {
            element[i].removeAttribute('data-state', 'error');
        } else {
            element[i].setAttribute('data-state', 'error');
        }
    }
};

const validateForm = function() {
    let formContainer = document.getElementById(messageForm.id),
        isValid = messageForm.checkValidity();
    if (isValid) {
        addMessage('Message sent', 'sent', formContainer);
    } else {
        addMessage('Please fill in both fields', 'error', formContainer);
    }
};

const addMessage = function(message, state, parentDiv) {
    let errorMessage = document.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.setAttribute('data-state', state);
        errorMessage.innerText = message;
  } else {
        let html = document.createElement("p"),
        messageHtml = document.createTextNode(message);
        html.classList.add('error-message');
        html.setAttribute('data-state', state);
        html.appendChild(messageHtml);
        submitBtnCnt.appendChild(html);
    }
};

submitBtn.addEventListener('click', () => {
    event.preventDefault();
    validateFormElements(inputText);
    validateFormElements(textArea);
    validateForm();
});



//CHARTS
Chart.defaults.global.defaultFontFamily = "'Open Sans', sans-serif";
Chart.defaults.global.defaultFontSize = 11;
Chart.defaults.global.legend.display = false;
Chart.defaults.doughnut.legend.display = true;
Chart.defaults.doughnut.legend.position = 'right';
Chart.defaults.global.legend.labels.boxWidth = 30;
Chart.defaults.global.title.display = true;
Chart.defaults.global.maintainAspectRatio = true;
Chart.defaults.global.responsive = true;
Chart.defaults.global.animation.duration = 1500;

const chartTraffic = new Chart(traffic, {
    type: 'line',
    data: {
        labels: trafficLabel,
        datasets: [{
            data: trafficValue,
            backgroundColor: 'rgba(115, 149, 192, .25)',
            borderColor: '#a6c1e5',
            pointBorderColor: '#7395c0',
            pointBackgroundColor: '#fff',
            borderWidth: 1,
            pointBorderWidth: 1,
            pointHitRadius: 10,
            pointRadius: 3,
            pointHoverRadius: 4,
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: { padding: 10, },
                gridLines: { drawTicks: false, color: '#e6e6e6' }
            }],
            xAxes: [{
                gridLines: { tickMarkLength: 10, offsetGridLines: true, color: '#e6e6e6' }
            }]
        }
    }
});

const chartDailyTraffic = new Chart(dailyTraffic, {
    type: 'bar',
    data: {
        labels: dailyTrafficLabel,
        datasets: [{
            data: dailyTrafficValue,
            borderWidth: 0,
            backgroundColor: 'rgba(115, 149, 192, .4)',
            hoverBackgroundColor: 'rgba(115, 149, 192, .55)',
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: { padding: 10, min: 0, stepSize: 50 },
                gridLines: { drawTicks: false, color: '#e6e6e6' }
            }],
            xAxes: [{
                gridLines: { tickMarkLength: 10, offsetGridLines: true, color: 'rgba(0, 0, 0, 0)' }
            }]
        }
    }
});

const chartMobileUsers = new Chart(mobileUsers, {
    type: 'doughnut',
    data: {
        labels: mobileUsersLabel,
        datasets: [{
            data: mobileUsersValue,
            hoverBorderColor: '#fff',
            borderColor: '#fff',
            borderWidth: 3,
            backgroundColor: [
                '#bee5e1',
                '#bec0e5',
                '#c0cfe3',
            ],
            hoverBackgroundColor: [
	            '#afdcd7',
	            '#afafdc',
	            '#b0c3da',
            ],
        }]
    },
});




//MEMBER PROTOTYPE OBJECT LITERAL
function newUser(key) {
    this.firstName = key.firstName;
    this.lastName = key.lastName;
    this.picture = key.picture;
    this.joinDate = key.joinDate;
    this.email = key.email;
};

newUser.prototype.toHTML = function() {
    let html = '<li class="member-container">';
    html += '<a href="">';
    html += '<img src="img/' + this.picture + '" alt="Photo of ' + this.firstName + ' ">';
    html += '<p>' + this.firstName + ' ' + this.lastName + ' joined on ' + this.joinDate;
    html += '<br>';       
    html += '<span>' + this.email + '</span>';
    html += '</p></a></li>';
    return html;
};

function userActivity(key) {
    this.firstName = key.firstName;
    this.lastName = key.lastName;
    this.picture = key.picture;
    this.activity = key.activity;
    this.activityTime = key.activityTime;
};

userActivity.prototype.toHTML = function() {
    let html = '<li class="member-container">';
    html += '<a href="">';
    html += '<img src="img/' + this.picture + '" alt="Photo of ' + this.firstName + ' ">';
    html += '<p>' + this.firstName + ' ' + this.lastName + ' ' + this.activity;
    html += '<br>';
    html += '<span>' + this.activityTime + '</span>';
    html += '</p></a></li>';
    return html;
};

//MEMBER DATA
const userList = {
    user_0001: { firstName: "Jack", lastName: "Willson", picture: "user_0001.jpg", joinDate: "05/02/17", email: "jack.willson@example.com", activity: "commented on SocialSimple's SEO Tips", activityTime: "7 hour ago" },
    user_0002: { firstName: "Fathima", lastName: "Tayab", picture: "user_0002.jpg", joinDate: "27/01/17", email: "fathima-tayab@example.com", activity: "liked the post Social Media Marketing", activityTime: "1 hours ago" },
    user_0003: { firstName: "Omar", lastName: "Edwards", picture: "user_0003.jpg", joinDate: "23/01/17", email: "omar.edwards@example.com", activity: "commented on Social Media Marketing", activityTime: "3 hours ago" },
    user_0004: { firstName: "Elizabeth", lastName: "Jones", picture: "user_0004.jpg", joinDate: "19/01/17", email: "elizabeth.jones@example.com", activity: "posted SocialSimple's SEO Tips", activityTime: "6 hours ago" }
};

const members = {
    member_1: new newUser(userList.user_0001),
    member_2: new newUser(userList.user_0002),
    member_3: new newUser(userList.user_0003),
    member_4: new newUser(userList.user_0004)
};
const activity = {
    activity_1: new userActivity(userList.user_0002),
    activity_2: new userActivity(userList.user_0003),
    activity_3: new userActivity(userList.user_0004),
    activity_4: new userActivity(userList.user_0001)
};

// MEMBER AREA
function MemberArea() {
    this.displayModule = function(id, html) {
        var container = id,
            content = html;
        this.renderInElement(container, content);
    };

    this.displayAll = function() {
        this.displayModule('user-list', members);
        this.displayModule('user-activity', activity);
    };
}

MemberArea.prototype.renderInElement = function(container, html) {
    var content = html,
        element = document.getElementById(container);
    for (var prop in content) {
        if (content.hasOwnProperty(prop)) {
            element.innerHTML += content[prop].toHTML();
        }
    }
};

var memberArea = new MemberArea();
memberArea.displayAll();