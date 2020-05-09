// import { showHomePage } from './src/Home'
const electron = window.require('electron')
const remote = electron.remote
const ipcRenderer = electron.ipcRenderer
const $ = require('jquery')
const path = require('path')
const url = require('url')
const screenshot = require('screenshot-desktop')
const fs = require('fs');
const login = require('./src/Login.js')
const home = require('./src/Home.js')
const user = require('./src/User.js')
const project = require('./src/Project.js')
const activity = require('./src/Task.js')

const API_URL = remote.getGlobal('API_URL')

var current_activity_id = 0
var time_history_id = 0
var user_id = 0
var access_token = ''
var timer_status = 'stop'
var total_seconds = 0
var timer 
var capture_timer 

$(document).ready(function() {

    login.showLoginForm();

    $("#login_form").submit( function(e) {
        e.preventDefault();

        $(this).find('button').prop('disabled', true );
        $(this).find('span').css('display', 'block' );

        fetch(API_URL + 'api/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': $(this).find('[name="email"]').val(),
                'password': $(this).find('[name="password"]').val()
            }) 
        })
        .then(res => res.json() )
        .then(res => {
            if( res.success ) {
                user_id = res.data.id
                access_token = res.data.access_token
                home.showHomePage()
                getUser()
                getAssignedProjects(user_id)
            } else {
                alert( res.message )
                $(this).find('button').prop('disabled', false );
                $(this).find('span').css('display', 'none' );
            }

        });
    });
});

function getUser() {

    var api_url = url.format({ query: { 'id' : user_id } })

    fetch(API_URL + 'api/user' + api_url.toString(), {
        method: 'get',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        }
    })
    .then(res => res.json() )
    .then(res => {
        user.displayUserInfo(res);
    });
}

function getAssignedProjects( user_id ) {

    var api_url = url.format({ query: { 'user_id' : user_id } })

    fetch(API_URL + 'api/projects/' + api_url.toString(), {
        method: 'get',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        }
    })
    .then(res => res.json() )
    .then(res => {

        console.log(res)

        if( res.success ) {
            project.displayProjects( res.data.projects );
        } else {
            alert( res.message )
        }

        $('[data-list="project"] span').click( function() {
            let project_id = $(this).parent('li').data('id')
            getSubProjects( project_id );
        })
    });
}

function getSubProjects( project_id ) {

    var api_url = url.format({ query: { 'project_id' : project_id } })

    fetch(API_URL + 'api/subprojects/' + api_url.toString(), {
        method: 'get',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        }
    })
    .then(res => res.json() )
    .then(res => {

        console.log(res)

        if( res.success ) {
            project.displaySubProjects( res.data, project_id );
        } else {
            alert( res.message )
        }

        $('[data-list="subproject"]').click( function() {
            let subproject_id = $(this).data('id')
            getSubProjectActivities( subproject_id );
        })
    });
}

function getSubProjectActivities( subproject_id ) {

    var api_url = url.format({ query: { 'subproject_id' : subproject_id } })

    fetch(API_URL + 'api/activity/' + api_url.toString(), {
        method: 'get',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        }
    })
    .then(res => res.json() )
    .then(res => {

        console.log(res)

        if( res.success ) {
            activity.displayTasks( res.data );
        } else {
            alert( res.message )
        }

        $('[data-list="activity"]').click( function() {
            if( timer_status == "stop") {
                let activity_id = $(this).data('id')
                getActivityInfo( activity_id );
            }
        })
    });
}

function getActivityInfo( activity_id ) {

    fetch(API_URL + 'api/activity/' + activity_id, {
        method: 'get',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        }
    })
    .then(res => res.json() )
    .then(res => {
        console.log(res)

        if( res.success ) {
            activity.displayCurrentTask( res.data );
            current_activity_id = activity_id
            $('.btn-start').prop('disabled', false);

            $('.btn-start').click( function() {
                if( timer_status == 'stop' ) {
                    total_seconds = 0
                }
                timer_status = 'start'
                createActivity()
            })

            $('.btn-stop').click( function() {
                timer_status = 'stop'
                updateActivity()
                clearInterval(timer)
                $('.btn-stop').prop('disabled', true)
                $('.btn-pause').prop('disabled', true)
                $('.btn-start').prop('disabled', false)
            })

            $('.btn-pause').click( function() {
                timer_status = 'pause'
                updateActivity()
                clearInterval(timer)
                $('.btn-stop').prop('disabled', true)
                $('.btn-pause').prop('disabled', true)
                $('.btn-start').prop('disabled', false)
            })
        } else {
            alert( res.message )
        }
    });
}

function createActivity() {
    fetch(API_URL + 'api/time-history', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
        body: JSON.stringify({
            'activity_id': current_activity_id,
            'user_id': user_id
        }) 
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)

        if(res.success) {

            time_history_id = res.data.id;

            let activity_folder = path.join(__dirname, 'screenshots', 'act_' + time_history_id)

            if (!fs.existsSync(activity_folder)) { 
                fs.mkdir(activity_folder, function(err, data) {
                    if( err ) console.log( err )
                });
            }

            timer = setInterval(() => {
                timerTick();
            }, 1000);

            capture_timer = setInterval(() => {
                let date_ = new Date();
                screenshot({ filename: path.join(__dirname, 'screenshots', 'act_' + time_history_id , date_.getTime() + ".png") })

                updateActivity();
            }, 900000);

            $('.btn-stop').prop('disabled', false)
            $('.btn-pause').prop('disabled', false)
            $('.btn-start').prop('disabled', true)
        } else {
            alert( res.message )
        }
    });
}

function updateActivity() {
    let time_consumed = 0;

    fetch(API_URL + 'api/time-history/' + time_history_id, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
        body: JSON.stringify({
            'time_consumed': time_consumed
        }) 
    })
    .then(res => console.log(res))
    .then(res => {

        if(res.success) {
            uploadScreenShots()
        } else {
            alert( res.message )
        }
    });
}

function uploadScreenShots() {

    let activity_folder = path.join(__dirname, 'screenshots', 'act_' + activity_id )

    fs.readDir(activity_folder, function(dir) {
        // es6
        for(let filePath of dir) {
          
            // superagent
            //     .get(API_URL + 'api/upload_screenshot')
            //     .send('activity_id', activity_id ) // sends a JSON post body
            //     .attach('screenshot', filePath )
            //     .set('accept', 'json')
            //     .end(function (err, res) {
                    
            // });

        }
    });
}

function timerTick() {
    ++total_seconds;
    let current_time = (
        pad(parseInt(total_seconds / 60 / 60)) + ':' +
        pad(parseInt(total_seconds / 60)) + ':' +
        pad(total_seconds % 60)
    )

    $('#time').html(current_time)
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
}