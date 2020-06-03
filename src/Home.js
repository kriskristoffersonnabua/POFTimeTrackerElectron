const electron = window.require('electron')
const $ = require('jquery')
var heredoc = require('heredoc')

const showHomePage = function () {
    $("#root").html(home_page);
}

var home_page = heredoc.strip(function() {/*
    
    <div class="container body">
        <div class="main_container">
            <div class="col-md-3 left_col" style="padding:0px; width:230px">
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
            <div class="top_nav" style="margin-left: 230px" >
                <div class="nav_menu" style="padding-left:20px;" id="current">
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

                    <div class="modal-body" id="activity-body-modal"></div>
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

