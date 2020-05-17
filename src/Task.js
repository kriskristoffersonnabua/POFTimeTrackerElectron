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
                .replace('%done_activity%', ( activity['status'] == "ongoing" ? doneActivity : "" ))
        )
    })

    $("#activities").html(
        activity_container.replace('%activity_list%', activity_list)
    );
}

var activity_container = heredoc.strip(function() {/*
    <table id="datatable" class="table projects">
        <tbody >
            %activity_list%
        </tbody>
    </table>
*/})

var each_activity = heredoc.strip(function() {/*
    <tr data-list="activity" data-id="%activity_id%">
        <td style="width: 55%">%activity_no% - %activity_name%</td>
        <td><button class="btn btn-round btn-xs hrsMin">0hrs 0min</button></td>
        <td>
            <a href="#" class="btn btn-primary btn-xs" data-toggle="modal" data-target=".view-modal">
                <i class="fa fa-folder"></i> View 
            </a>
            %done_activity%
        </td>
    </tr>
*/})

var doneActivity = heredoc.strip(function() {/*
    <a href="#" class="btn btn-success btn-done btn-xs">
        <i class="fa fa-thumbs-up"></i> Done
    </a>
 */});


const displayCurrentTask = function( activity ) {
    $("#current .activity").html(
        current_activity
        .replace('%activity_no%', activity['activity_no'])
        .replace('%title%', activity['title'])
    );
}

var current_activity = heredoc.strip(function() {/*
    <span>%activity_no%</span> -
    <span>%title%</span>
*/})

module.exports = {
    displayTasks,
    displayCurrentTask
}

