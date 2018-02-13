require('./css/index.less')
var base64png = require('./img/alarm.png')
import React from 'react'
import ReactDOM from 'react-dom'
import App from './js/views/App'

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);