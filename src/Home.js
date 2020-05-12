const electron = window.require('electron')
const $ = require('jquery')
var heredoc = require('heredoc')

const showHomePage = function () {
    $("#root").html(home_page);
}

var home_page = heredoc.strip(function() {/*
    
    <div class="container body">
        <div class="main_container">
            <div class="col-md-3 left_col">
                <div class="left_col scroll-view">
                    <div class="navbar nav_title" style="margin-top: 20px; margin-left: 0px">
                        <a href="#" class="site_title">
                            <img src="assets/img/logo-small.png" alt="..." class="img-circle profile_img" style="width: 30px; height: 30px; padding: 0px; margin: 0px"> 
                            <span>POF Time Tracker</span>
                        </a>
                    </div>

                    <div class="clearfix"></div>

                    </br>
                    
                    <div id="projects"> </div> 
                </div>
            </div>

            <!-- top navigation -->
            <div class="top_nav" style="padding-left: 20px;">
                <div class="nav_menu">
                    <nav>
                    <div class="nav toggle" style="margin-left: 0px">
                        <a id="menu_toggle"><i class="fa fa-bars"></i></a>
                    </div>

                    <div class="timer nav navbar-nav" style="margin-left: 0px; padding-left: 0px">
                        <h1 id="time">00:00:00</h1>
                        <h5> Design Web App </h5>
                    </div>

                    <ul class="nav navbar-nav navbar-right" style="width: 300px">
                    
                        <li class="" style="margin: 10px 0px 10px 0px">
                            <!--- <div id="user_info" style="margin: 10px 0px 10px 0px"></div> --->
                            <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                <img src="assets/img/logo-small.png" style="width: 30px; height: 30px; margin-right: 10px;" alt="">John Doe
                                <span class=" fa fa-angle-down"></span>
                            </a>
                            <ul class="dropdown-menu dropdown-usermenu pull-right">
                                <li><a href="login.html"><i class="fa fa-sign-out pull-right"></i> Log Out</a></li>
                            </ul> 
                        </li>

                        <div class="timer">
                            <li>
                                <div style="margin: 10px">
                                    <h1><a><i class="fa fa-stop"></i></a></h1>
                                </div>
                            </li>
                            <li>
                                <div style="margin: 10px">
                                    <h1><a><i class="fa fa-pause"></i></a></h1>
                                </div>
                            </li>
                            <li>   
                                <div style="margin: 10px">
                                    <h1><a><i class="fa fa-play"></i></a></h1>
                                </div>
                            </li>
                        </div>

                    </ul> 
                    </nav>
                </div>
            </div>
            
            <!---- Top Nav ---->

            <!---- Page Content ---->

            
            <div class="right_col" role="main">
                <div class="">
                    <div class="table-wrapper-scroll-y my-custom-scrollbar" style="width: 525px">
                        <table id="datatable" class="table table-striped projects">
                            <thead>
                                <tr>
                                    <th class="th-sm" style="width: 50%"> Title </th>
                                    <th class="th-sm">Links</th>
                                    <th class="th-sm" style="width: 20%">Time Consumed</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> Activity Title </td>
                                    <td>
                                        <a href="#" class="btn btn-primary btn-xs" data-toggle="modal" data-target=".view-modal">
                                            <i class="fa fa-folder"></i> View 
                                        </a>
                                        <a href="#" class="btn btn-success btn-xs">
                                            <i class="fa fa-thumbs-up"></i> Done
                                        </a>
                                    </td>
                                    <td> 8hrs 30min </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        <!-- page content -->

        <!---- modal --->
        <div class="modal fade view-modal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">

                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel"> View Details </h4>
                    </div>

                    <div class="modal-body">

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
                                            <div style="width: 350px;">

                                                <div style="display: inline-flex; padding-left: 20px;">
                                                    <label> Project Name: </label>
                                                    <p style="padding-left: 15px"> Sub Project 101 </p>
                                                </div>
                                                    
                                                <div style="padding-left: 20px; ">
                                                    <label> List of Files: </label>
                                                    <p style="padding-left: 15px"> File 1 </p>
                                                    <p style="padding-left: 15px"> File 2 </p>
                                                    <p style="padding-left: 15px"> File 3 </p>
                                                    <p style="padding-left: 15px"> File 4 </p>
                                                    <p style="padding-left: 15px"> File 5 </p>
                                                </div>

                                            </div>

                                            <div style="width: 500px;">
                                                <div style="display: inline-flex; padding-left: 20px;">
                                                    <label> Title </label>
                                                    <p style="padding-left: 15px"> Pesamakini Backend UI </p>
                                                </div>

                                                <div style="display: inline-flex; padding-left: 20px; ">
                                                    <label> Description: </label>
                                                    <p style="padding-left: 15px"> This is a description.
                                                        This is a description.
                                                        This is a description.
                                                        This is a description.
                                                        This is a description.
                                                        This is a description.
                                                        This is a description.
                                                    </p>
                                                </div>

                                                <div style="padding-left: 20px; ">
                                                    <label> Acceptance Criteria: </label>
                                                    <p style="padding-left: 15px"> Acceptance Criteria 1 </p>
                                                    <p style="padding-left: 15px"> Acceptance Criteria 2 </p>
                                                    <p style="padding-left: 15px"> Acceptance Criteria 3 </p>
                                                    <p style="padding-left: 15px"> Acceptance Criteria 4 </p>
                                                    <p style="padding-left: 15px"> Acceptance Criteria 5 </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div role="tabpanel" class="tab-pane fade" id="comments" aria-labelledby="profile-tab">
                                    <div class="x_panel" style="padding: 10px;">
                                        <div style="padding: 10px">
                                            <textarea class="form-control" rows="2" placeholder="Please type your comment here."></textarea>
                                        </div>
                                        <div  class="pull-right">
                                            <button type="button" class="btn btn-primary">Add Comment</button>
                                        </div>
                                        
                                        <div class="x_content">
                                            <div class="table-wrapper-scroll-y my-custom-scrollbar" style="height: 400px">
                                                <table id="datatable" class="table table-striped projects" >
                                                    <thead>
                                                        <tr> 
                                                            <th style="width: 170px"> Date </th> 
                                                            <th> Comment </th>                                               
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td style="width: 170px"> 01/01/2001 11:00am </td>
                                                            <td> Comment number 1</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 170px"> 01/01/2001 11:00am </td>
                                                            <td> Comment number 2</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 170px"> 01/01/2001 11:00am </td>
                                                            <td> Comment number 3</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <!---- end modal ---->
        </div>
    </div>
    
    
    <!---- End of Design
    
      
    <div>
        <div class="left-sidebar">
            <div id="user_info">
            </div><br/>
            <div id="projects">
            </div>
        </div>


        <div class="right-sidebar">
            <div id="current">
                <div class="activity"></div>
                <div class="timer">
                    <span id="time">00:00:00</span>
                    <button type="button" disabled class="btn-start">Start</button>
                    <button type="button" disabled class="btn-pause">Pause</button>
                    <button type="button" disabled class="btn-stop">Stop</button>
                </div>
            </div>
            <div id="activities">
            </div>
        </div>
    </div> --->
    
    
*/})


module.exports = {
    showHomePage
}

