require('./Switch.less')
import React, {Component}from 'react'

class Switch extends Component {
    constructor(props) {
        super(props)
        this.state = {change: true}
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick () {
        this.setState({
            change: !this.state.change
        })
        this.props.changeStatus()
    }
    render() {
        return (
            <span className="switch-btn" onClick={this.handleClick} style={this.state.change ? {transform: "rotateZ(0deg)"} : {transform: "rotateZ(180deg)"}}></span>
        )
    }
}

module.exports = Switch