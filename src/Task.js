const electron = window.require('electron')
const $ = require('jquery')
var heredoc = require('heredoc')

const displayTasks = function ( activitys ) {
    let activity_list = ''; 

    activitys.map(function(activity) {
        activity_list += ( 
            each_activity
                .replace('%activity_id%', activity['id'])
                .replace('%activity_no%', activity['activity_no'])
                .replace('%activity_name%', activity['title'])
        )
    })

    $("#activities").html(
        activity_container.replace('%activity_list%', activity_list)
    );
}

var activity_container = heredoc.strip(function() {/*
    <div>
        <ul>
         <h1>Acticiasdfas</h1>
            %activity_list%
        </ul>
    </div>
*/})

var each_activity = heredoc.strip(function() {/*
    <li data-list="activity" data-id="%activity_id%">%activity_no% - %activity_name%</li>
*/})


const displayCurrentTask = function( activity ) {
    $("#current .activity").html(
        current_activity
        .replace('%activity_no%', activity['activity_no'])
        .replace('%title%', activity['title'])
    );
}

var current_activity = heredoc.strip(function() {/*
    <h1> Activity </h1>
    <span>%activity_no%</span>
    <span>%title%</span>
*/})

module.exports = {
    displayTasks,
    displayCurrentTask
}

