const electron = window.require('electron')
const $ = require('jquery')
var heredoc = require('heredoc')

const displayUserInfo = function ( user ) {
    console.log(user)
    $("#user_info").html(
        user_info.replace('%name%', user.first_name + ' ' + user.last_name)
    );
}

var user_info = heredoc.strip(function() {/*

    <!---- 
    <li class=""  style="margin: 10px 0px 10px 0px">
        <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
            <img src="assets/img/logo-small.png" style="width: 30px; height: 30px; margin-right: 10px;" alt="user_icon">
            John Doe
            <span class=" fa fa-angle-down"></span>
        </a>
        <ul class="dropdown-menu dropdown-usermenu pull-right">
            <li><a href="login.html"><i class="fa fa-sign-out pull-right"></i> Log Out</a></li>
        </ul>
    </li>
    -----!>

    <!--- original code ---
    
    <div>
        <div><img alt="user-icon"/></div>
        <div>%name%</div>
    </div>

    ---!>
*/})

module.exports = {
    displayUserInfo
}

