const electron = window.require('electron')
const $ = require('jquery')
var heredoc = require('heredoc')

const displayTasks = function ( tasks ) {
    let task_list = ''; 

    tasks.map(function(task) {
        task_list += ( 
            each_task
                .replace('%task_id%', task['id'])
                .replace('%task_name%', task['title'])
        )
    })

    $("#tasks").html(
        task_container.replace('%task_list%', task_list)
    );
}

var task_container = heredoc.strip(function() {/*
    <div>
        <ul>
            %task_list%
        </ul>
    </div>
*/})

var each_task = heredoc.strip(function() {/*
    <li data-list="task" data-id="%task_id%">%task_name%</li>
*/})


const displayCurrentTask = function( task ) {
    $("#current .task").html(
        current_task
        .replace('%title%', task['title'])
        .replace('%description%', task['description'])
    );
}

var current_task = heredoc.strip(function() {/*
    <span>%title%</span>
    <span>%description%</span>
*/})

module.exports = {
    displayTasks,
    displayCurrentTask
}

