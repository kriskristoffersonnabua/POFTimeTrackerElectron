const electron = require('electron')
const remote = electron.remote
const $ = require('jquery')
const path = require('path')
var heredoc = require('heredoc')

const showLoginForm = function() {
    $("#root").html(login_form);
}

var login_form = heredoc.strip(function() {/*

    <div class="login_wrapper">
        <form id="login_form">
            <div class="animate form login_form" >
                <section class="login_content">

                    <div class="h1"><img src="./assets/img/logo.png" width="200px"/></div>
                    <!--<h1>EMPLOYEE LOGIN</h1>-->
                    <br/>
                    <div style="margin-top: 5px; margin-bottom: 10px;">
                        <input id="email" type="email" class="form-control" name="email" value=""
                                       placeholder="E-Mail Address" required autofocus>
                    </div>
                            
                    <div style="margin-top: 10px; margin-bottom: 10px;">
                        <input id="password" type="password" class="form-control" name="password"
                                       placeholder="Password" required>
                    </div>

                    <div class="checkbox al_left" style="margin-top: 20px; text-align: left;">
                        <label>
                            <input type="checkbox"
                                           name="remember"> Remember Me
                        </label>
                    </div>
                    <div>
                        <span style="display: none">Logging in ... </span>
                    </div>
                    <div style="padding-top: 10px">
                        <button class="btn btn-default submit" type="submit">Login</button>
                        <a class="reset_pass" href="#">
                            Forgot your Password?
                        </a>
                    </div>
    
                    <div class="clearfix"></div>

                    <div class="separator">
                        <div class="clearfix"></div>
                        <br/>
                        <div>
                            <p>&copy; 2020 POF Time Tracker. All rights reserved</p>
                        </div>
                    </div>

                </section>
            </div>
        </form>
    </div>
*/})

module.exports = {
  showLoginForm
}