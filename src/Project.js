const electron = window.require('electron')
const $ = require('jquery')
var heredoc = require('heredoc')

const displayProjects = function ( projects ) {
    let project_list = ''; 

    projects.map(function(project) {
        project_list += ( 
            each_project
                .replace('%project_id%', project['id'])
                .replace('%project_name%', project['project'])
        )
    })

    $("#projects").html(
        project_container.replace('%project_list%', project_list)
    );
}


var project_container = heredoc.strip(function() {/*
    <div>
        <ul>
            %project_list%
        </ul>
    </div>
*/})

var each_project = heredoc.strip(function() {/*
    <li data-list="project" data-id="%project_id%">%project_name%</li>
*/})

module.exports = {
    displayProjects
}

