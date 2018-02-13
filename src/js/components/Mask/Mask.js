require('./Mask.less')
import React, {Component} from 'react'

const Mask = (props) => {
    return <div className="mask" style={props.isShow ? {zIndex: 999} : {zIndex: -999}}>
        {props.children}
    </div>
} 

module.exports = Mask