const electron = window.require('electron')
const $ = require('jquery')
var heredoc = require('heredoc')

const displayProjects = function ( projects ) {
    let project_list = ''; 

    projects.map(function(project) {
        project_list += ( 
            each_project
                .replace('%project_id%', project['id'])
                .replace('%project_no%', project['project_no'])
                .replace('%project_name%', project['name'])
        )
    })

    $("#projects").html(
        project_container.replace('%project_list%', project_list)
    );
}


const displaySubProjects = function ( subprojects, project_id ) {
    let subproject_list = ''; 

    subprojects.map(function(subproject) {
        subproject_list += ( 
            each_subproject
                .replace('%subproject_id%', subproject['id'])
                .replace('%subproject_no%', subproject['subproject_no'])
                .replace('%subproject_name%', subproject['subproject_name'])
        )
    })

    $('[data-id="' + project_id + '"]').find('.subprojects').html(
        subproject_container.replace('%subproject_list%', subproject_list)
    );
}


var project_container = heredoc.strip(function() {/*

    <div id="sidebar-menu" class="main_menu_side hidden-print main_menu" style="height: 600px">
        <div class="menu_section">
            <ul class="nav side-menu show" id="project_list">
                <li class="active">
                    <a><i class="fa fa-book"></i> Project 1 <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                        <li><a href="#">Sub Project 1</a></li>
                        <li><a href="#">Sub Project 2</a></li>
                        <li><a href="#">Sub Project 3</a></li>
                    </ul>
                </li>
                <li>
                    <a><i class="fa fa-book"></i> Project 2 <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                        <li><a href="#">Sub Project 1</a></li>
                        <li><a href="#">Sub Project 2</a></li>
                        <li><a href="#">Sub Project 3</a></li>
                    </ul>
                </li>
                <li>
                    <a><i class="fa fa-book"></i> Project 3 <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                        <li><a href="#">Sub Project 1</a></li>
                        <li><a href="#">Sub Project 2</a></li>
                        <li><a href="#">Sub Project 3</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>

    <!---- original code
    <div>
        <ul id="project_list">
            %project_list%
        </ul>
    </div> ----!>
*/})

var each_project = heredoc.strip(function() {/*
    <li data-list="project" data-id="%project_id%">
        <span>%project_no% - %project_name%</span>
        <div class="subprojects"></div>
    </li>
*/})


var subproject_container = heredoc.strip(function() {/*
    <ul>
        %subproject_list%
    </ul>
*/})

var each_subproject = heredoc.strip(function() {/*
    <li data-list="subproject" data-id="%subproject_id%">%subproject_no% - %subproject_name%</li>
*/})

module.exports = {
    displayProjects,
    displaySubProjects
}

