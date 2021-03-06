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

const Store = require('electron-store');
 
const store = new Store();

var current_activity_id = 0
var time_history_id = 0
var current_subproject_id = 0
var user_id = 0
var access_token = ''
var timer_status = 'stop'
var total_seconds = 0
var timer 
var capture_timer 

$(document).ready(function() {

    current_user = store.get('user_id');
    current_access_token = store.get('access_token');

    if ( !current_user || current_user == '' ) {
        loginForm()
    } else {
        user_id = current_user
        access_token = current_access_token
        homePage()
    }

});

function homePage(){
    home.showHomePage()
    getUser()
    getAssignedProjects(user_id)

    $('.logout').click(function(){
        logout();
    })
}

function loginForm() {
    login.showLoginForm();

    $("#login_form").submit( function(e) {
        e.preventDefault();

        $(this).find('button').prop('disabled', true );
        $(this).find('span').css('display', 'inline-flex' );

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
            console.log(res);
            if( res.success ) {
                if (!res.data.is_admin) {
                    user_id = res.data.id
                    access_token = res.data.access_token
                    homePage()

                    store.set('user_id', user_id)
                    store.set('access_token', access_token)
                } else {
                    alert( 'Unauthorized.' )
                    $(this).find('button').prop('disabled', false );
                    $(this).find('span').css('display', 'none' );
                }
            } else {
                alert( res.message )
                $(this).find('button').prop('disabled', false );
                $(this).find('span').css('display', 'none' );
            }

        });
    });
}

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

    fetch(API_URL + 'api/activity/user/' + user_id + '/projects', {
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
            project.displayProjects( res.data );
        } else {
            alert( res.message )
        }

        $('[data-list="project"] a').click( function() {
            $('[data-list="project"]').removeClass('active');
            $( this ).parent('li').addClass('active');
            let project_id = $(this).parent('li').data('id')
            getSubProjects( project_id );
            $( this ).parent('li').find('.subprojects').toggle();
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
            current_subproject_id = subproject_id
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

        $('.btn-done').click(function(){
            let activity_id = $(this).parent('td').parent('tr').data('id');
            setActivity(activity_id, 'done')
        });

        $('.btn-view').click(function(){
            let activity_id = $(this).parent('td').parent('tr').data('id');
            getActivity(activity_id)
        });
    });
}

function getActivity( activity_id, comments = false ) {

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
            if(!comments) {
                activity.displayActivityInfo( res.data );

                $('.btn-add-comment').click(function(){
                    if( $("#txt-add-comment").val() != '') {
                        addComment(activity_id, $("#txt-add-comment").val())
                    }
                });
            } else {
                activity.displayActivityInfoComments(res.data);
            }
        } else {
            alert( res.message )
        }
    });
}

function addComment(activity_id, comment) {
    fetch(API_URL + 'api/activity/' + activity_id + '/add-comment', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
        body: JSON.stringify({
            'comment': comment,
            'user_id': user_id
        }) 
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)

        if(res.success) {
            getActivity( activity_id, true )
        } else {
            alert( res.message )
        }
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
            $('.btn-start').off('click');
            $('.btn-start').click( function() {
                if( timer_status == 'stop' ) {
                    total_seconds = 0
                    createActivity();
                }
                timer_status = 'start'

                timer = setInterval(() => {
                    timerTick();
                }, 1000);

                capture_timer = setInterval(() => {
                    captureScreen();
                    updateActivity();
                }, 900000);

                $('.btn-stop').prop('disabled', false)
                $('.btn-pause').prop('disabled', false)
                $('.btn-start').prop('disabled', true)
            })

            $('.btn-stop').off('click');
            $('.btn-stop').click( function() {
                timer_status = 'stop'
                updateActivity()
                clearInterval(timer)
                $('.btn-stop').prop('disabled', true)
                $('.btn-pause').prop('disabled', true)
                $('.btn-start').prop('disabled', false)
            })

            $('.btn-pause').off('click');
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

async function createActivity() {
    await fetch(API_URL + 'api/time-history', {
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

            // if (!fs.existsSync(activity_folder)) { 
            //     fs.mkdir(activity_folder, function(err, data) {
            //         if( err ) console.log( err )
                    setActivity( current_activity_id, 'ongoing' );
                    captureScreen()
            //     });
            // }
        } else {
            alert( res.message )
        }
    });
}

function updateActivity() {
    let time_consumed = $("#time").text();

    fetch(API_URL + 'api/time-history/' + time_history_id, {
        method: 'PATCH',
        _method: 'PATCH',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + access_token,
        },
        body: "time_consumed=" + time_consumed,
        credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        let hrs = parseFloat(time_consumed.substr(0,2)).toString();
        let min = parseFloat(time_consumed.substr(3,2)).toString();
        $('[data-id="' + current_activity_id + '"]').find( '.hrsMin' ).text(hrs + 'hrs ' + min + 'min');
    })
    .catch(err => console.error(err))
}

function captureScreen() {
    let date_ = new Date();

    let filename_ = path.join(__dirname, 'screenshots', 'act_' + time_history_id , 'act_' + time_history_id + '_' + date_.getTime() + ".png");
    // screenshot({ filename: filename_ })

    screenshot({format: 'png'}).then((img) => {
        
        const formData = new FormData();

        formData.append('screenshot', new Blob([img], {type: "image/png"} ), 'act_' + time_history_id + '_' + date_.getTime() + ".png");

        fetch(API_URL + 'api/time-history/' + time_history_id + '/add-screenshot', {
            method: 'post',
            headers: {
                // 'Accept': 'application/json, text/plain, */*',
                'Authorization': 'Bearer ' + access_token,
                // 'Content-Type' : 'multipart/form-data'
            },
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
        });
    }).catch((err) => {
        console.log(err)
    })
}

function setActivity( activity_id, status ) {

    fetch(API_URL + 'api/activity/' + activity_id, {
        method: 'PATCH',
        _method: 'PATCH',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + access_token,
        },
        body: "status=" + status,
        credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)

        getSubProjectActivities(current_subproject_id)
    })
    .catch(err => console.error(err))
}

function timerTick() {
    ++total_seconds;
    // total_seconds = total_seconds + 120;
    let current_time = (
        pad(parseInt(total_seconds / 60 / 60)) + ':' +
        pad((parseInt(total_seconds / 60)) % 60) + ':' +
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

function logout() {
    store.set('user_id', '');
    store.set('access_token', '');
    loginForm()
}