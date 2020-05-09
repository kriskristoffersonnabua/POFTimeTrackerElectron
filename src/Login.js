const electron = require('electron')
const remote = electron.remote
const $ = require('jquery')
const path = require('path')
var heredoc = require('heredoc')

const showLoginForm = function() {
    $("#root").html(login_form);
}

var login_form = heredoc.strip(function() {/*
    <div>
        <h1>Employee Login</h1>
        <form id="login_form">
            <input type="email" name="email" required placeholder="Enter Email Address"><br/>
            <input type="password" name="password" required placeholder="Enter Password"><br/>
            <button type="submit">Login</button>
            <span style="display: none">Logging in ... </span>
        </form>
    </div>
*/})

module.exports = {
  showLoginForm
}