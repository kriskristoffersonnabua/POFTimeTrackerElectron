const electron = window.require('electron')
const $ = require('jquery')
var heredoc = require('heredoc')

const showHomePage = function () {
    $("#root").html(home_page);
}

var home_page = heredoc.strip(function() {/*
    
    <div class="container body">
        <div class="main_container">
            <div class="col-md-3 left_col" style="padding:0px">
                <div class="left_col scroll-view" >
                    <div class="navbar nav_title" >
                        <a href="#" class="site_title" id="user_info">
                            <img src="assets/img/logo.png" alt="..." style="height: 50px; padding: 0px; margin: 0px;">
                        </a>
                    </div>

                    <div class="clearfix"></div>
                    </br>
                    <div id="projects"> </div> 
                    <br/>
                    <div class="sidebar-footer hidden-small">
                        <a data-toggle="tooltip" data-placement="top" class="logout" data-original-title="Logout">
                            <span class="txt">LOG OUT</span> 
                            <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- top navigation -->
            <div class="top_nav">
                <div class="nav_menu" style="padding-left:20px" id="current">
                    <nav>

                    <div class="timer nav navbar-nav" style="margin-left: 0px; padding-left: 0px">
                        <h1 id="time">00:00:00</h1>
                        <h5 class="activity"></h5>
                    </div>

                    <ul class="nav navbar-nav navbar-right" style="width: 300px; padding-right: 10px">
                        <div class="timer">
                            <li>
                                <div style="margin-top: 10px">
                                    <button type="button" disabled class="btn-stop btn">
                                        <i class="fa fa-stop text-danger "></i>
                                    </button>
                                </div>
                            </li>
                            <li>
                                <div style="margin-top: 10px">
                                    <button type="button" disabled class="btn-pause btn">
                                        <i class="fa fa-pause text-primary"></i>
                                    </button>
                                </div>
                            </li>
                            <li>   
                                <div style="margin-top: 10px">
                                    <button type="button" disabled class="btn-start btn">
                                        <i class="fa fa-play text-success"></i>
                                    </button>
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
                    <div class="table-wrapper-scroll-y my-custom-scrollbar" id="activities" >
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
    
    <!---- End of Design --->
*/})


module.exports = {
    showHomePage
}

