// import { showHomePage } from './src/Home'
const electron = window.require('electron')
const remote = electron.remote
const ipcRenderer = electron.ipcRenderer
const $ = require('jquery')
const path = require('path')
const screenshot = require('screenshot-desktop')
const superagent = require('superagent');
const fs = require('fs');
const login = require('./src/Login.js')
const home = require('./src/Home.js')
const user = require('./src/User.js')
const project = require('./src/Project.js')
const task = require('./src/Task.js')

const API_URL = remote.getGlobal('API_URL')

var current_task_id = 0
var activity_id = 0
var user_id = 0
var timer_status = 'stop'
var total_seconds = 0
var timer 
var capture_timer 

$(document).ready(function() {

    //test only (need to remove)

    home.showHomePage()
    getAssignedProjects( 1 )

    //end of test 

    //
    // login.showLoginForm();

    $("#login_form").submit( function(e) {
        e.preventDefault();

        superagent
          .post(API_URL + 'api/login')
          .send($(this).serializeArray()) // sends a JSON post body
          .set('accept', 'json')
          .end(function (err, res) {
              console.log(res);
            if( res.body.success ) {
                user_id = res.body.user_id
                home.showHomePage()
                getUser(res.body.user_id)
            } else {
                alert( res.body.message )
            }
        });
    });

    $('.btn-start').click( function() {

        if( timer_status == 'stop' ) {
            total_seconds = 0
        }

        timer_status = 'start'
        createActivity()
        timer = setInterval(() => {
            timerTick();
        }, 1000);

        capture_timer = setInterval(() => {
            let date_ = new Date();
            screenshot({ filename: path.join(__dirname, 'screenshots', 'act_' + activity_id , date_.getTime() + ".png") })
        }, 50000);

        $('.btn-stop').prop('disabled', false)
        $('.btn-pause').prop('disabled', false)
        $('.btn-start').prop('disabled', true)
    })

    $('.btn-stop').click( function() {
        timer_status = 'stop'
        endActivity()
        clearInterval(timer)
        $('.btn-stop').prop('disabled', true)
        $('.btn-pause').prop('disabled', true)
        $('.btn-start').prop('disabled', false)
    })

    $('.btn-pause').click( function() {
        timer_status = 'pause'
        clearInterval(timer)
        $('.btn-stop').prop('disabled', true)
        $('.btn-pause').prop('disabled', true)
        $('.btn-start').prop('disabled', false)
    })
});

function getUser( user_id ) {
    superagent
        .get(API_URL + 'api/get_profile')
        .send('user_id', user_id ) // sends a JSON post body
        .set('accept', 'json')
        .end(function (err, res) {
            // Set MyGlobalVariable.
            ipcRenderer.send( "setUser", res.body );

            user.displayUserInfo();
    });
}

function getAssignedProjects( user_id ) {
    // superagent
    //     .get(API_URL + 'api/get_assigned_projects')
    //     .send('user_id', user_id ) // sends a JSON post body
    //     .set('accept', 'json')
    //     .end(function (err, res) {

    //         project.displayProjects( res.body );

                let sample_projects = [
                    {
                        'id' : '1',
                        'project' : 'Project 1'
                    },
                    {
                        'id' : '2',
                        'project' : 'Project 2'
                    },
                    {
                        'id' : '3',
                        'project' : 'Project 3'
                    }
                ]

                project.displayProjects( sample_projects );

                $('[data-list="project"]').click( function() {
                    let project_id = $(this).data('id')
                    getProjectTasks( project_id );
                })
    // });
}


function getProjectTasks( project_id ) {
    // superagent
    //     .get(API_URL + 'api/get_project_tasks')
    //     .send('project_id', project_id ) // sends a JSON post body
    //     .set('accept', 'json')
    //     .end(function (err, res) {

    //         task.displayTasks( res.body );

                let sample_tasks = [
                    {
                        'id' : '1',
                        'title' : 'task 1'
                    },
                    {
                        'id' : '2',
                        'title' : 'task 2'
                    },
                    {
                        'id' : '3',
                        'title' : 'task 3'
                    }
                ]

                task.displayTasks( sample_tasks );

                $('[data-list="task"]').click( function() {
                    if( timer_status == "stop") {
                        let task_id = $(this).data('id')
                        getTaskInfo( project_id );
                    }
                })
    // });
}


function getTaskInfo( task_id ) {
    // superagent
    //     .get(API_URL + 'api/get_task')
    //     .send('task_id', task_id ) // sends a JSON post body
    //     .set('accept', 'json')
    //     .end(function (err, res) {

    //         task.displayCurrentTask( res.body );

                let sample_task = {
                        'id' : '1',
                        'title' : 'task 1',
                        'description' : 'task description'
                }

                task.displayCurrentTask( sample_task );
                current_task_id = task_id
                $('.btn-start').prop('disabled', false);
    // });
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

function createActivity() {
    // superagent
    //     .get(API_URL + 'api/create_activity')
    //     .send('task_id', current_task_id ) // sends a JSON post body
    //     .send('user_id', user_id ) // sends a JSON post body
    //     .set('accept', 'json')
    //     .end(function (err, res) {

    //         activity_id = res.body.actvity_id

                let activity_folder = path.join(__dirname, 'screenshots', 'act_' + activity_id )

                if (!fs.existsSync(activity_folder)) { 
                    fs.mkdir(activity_folder, function(err, data) {
                        if( err ) console.log( err )
                    });
                }
    // });
}

function endActivity() {
    superagent
        .get(API_URL + 'api/end_activity')
        .send('activity_id', activity_id ) // sends a JSON post body
        .send('time_consumed', $('#time').html() ) // sends a JSON post body
        .set('accept', 'json')
        .end(function (err, res) {

            uploadScreenShots()
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