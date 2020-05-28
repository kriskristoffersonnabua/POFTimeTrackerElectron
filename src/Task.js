const electron = window.require('electron')
const $ = require('jquery')
var heredoc = require('heredoc')

const displayTasks = function ( activities ) {
    let activity_list = ''; 

    activities.map(function(activity) {
        if( activity['status'] != 'ready_for_testing' ) {
            activity_list += ( 
                each_activity
                    .replace('%activity_id%', activity['id'])
                    .replace('%activity_no%', activity['activity_no'])
                    .replace('%activity_name%', activity['title'])
                    .replace('%done_activity%', ( activity['status'] == "ongoing" ? doneActivity : "" ))
            )
        }
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
            <a href="#" class="btn btn-primary btn-xs btn-view" data-toggle="modal" data-target=".view-modal">
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


const displayActivityInfo = function ( activity ) {

    tbas = '';
    files = '';
    comments = '';

    activity['tbas'].map(function(tba) {
        tbas += '<p style="padding-left: 15px">' + tba['tba'] + '</p>'
    })

    activity['files'].map(function(file) {
        files += '<p style="padding-left: 15px">' + file['file_link'] + '</p>'
    })

    activity['comments'].map(function(comment) {
        comments += each_comment
                        .replace('%comment%', comment['comment'])
                        .replace('%date%', comment['date_added'])
    })

    $("#activity-body-modal").html(
        modal_details
        .replace('%activity_no%', activity['activity_no'])
        .replace('%title%', activity['title'])
        .replace('%description%', activity['description'])
        .replace('%acceptance_criteria%', activity['acceptance_criteria'])
        .replace('%tbas%', tbas)
        .replace('%files%', files)
        .replace('%comments%', comments)
    );
}


const displayActivityInfoComments = function ( activity ) {
    comments = '';
    activity['comments'].map(function(comment) {
        comments += each_comment
                        .replace('%comment%', comment['comment'])
                        .replace('%date%', comment['date_added'])
    })

    $("#comments-container").html( comments );
}

var modal_details = heredoc.strip(function(){/*
    <div class="" role="tabpanel" data-example-id="togglable-tabs">
        <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
            <li role="presentation" class="active"><a href="#details" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">Details</a>
            </li>
            <li role="presentation" class=""><a href="#comments" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">Comments</a>
            </li>
        </ul>

        <div id="myTabContent" class="tab-content">
            <div role="tabpanel" class="tab-pane fade active in" id="details" aria-labelledby="home-tab">
                <div class="x_panel" style="padding: 10px;">
                    <div class="row" style="display: flex;">
                        <div style="">
                            <div style="padding-left: 20px;">
                                <label> Activity </label>
                                <p style="padding-left: 15px">%activity_no% - %title%</p>
                            </div>
                            <div style="padding-left: 20px; ">
                                <label> Description: </label>
                                <p style="padding-left: 15px">%description%</p>
                            </div>
                            <div style="padding-left: 20px; ">
                                <label> Acceptance Criteria: </label>
                                <p style="padding-left: 15px">%acceptance_criteria%</p>
                            </div>
                            <div style="padding-left: 20px; ">
                                <label> TBAs: </label>
                                %tbas%
                            </div>
                            <div style="padding-left: 20px; ">
                                <label> Files: </label>
                                %files%
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div role="tabpanel" class="tab-pane fade" id="comments" aria-labelledby="profile-tab">
                <div class="x_panel" style="padding: 10px;">
                    <div style="padding: 10px">
                        <textarea class="form-control" rows="2" id="txt-add-comment" placeholder="Please type your comment here."></textarea>
                    </div>
                    <div  class="pull-right">
                        <button type="button" class="btn btn-primary btn-add-comment">Add Comment</button>
                    </div>
                    
                    <div class="x_content">
                        <div class="table-wrapper-scroll-y my-custom-scrollbar" id="comments-container" style="height: 200px; overflow:auto">
                            %comments%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
*/});


var each_comment = heredoc.strip(function() {/*
    <div>
        <p>%comment%</p>
        <span class="small">%date%</span>
    </div>
*/})

module.exports = {
    displayTasks,
    displayCurrentTask,
    displayActivityInfo,
    displayActivityInfoComments
}

