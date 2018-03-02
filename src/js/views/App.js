import React, {Component}from 'react'
import {Row, Col} from 'antd'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import Switch from '../components/Switch/Switch'
import Slider from '../components/Slider/Slider'
import EditTable from '../components/EditTable/EditTable'
import Footer from '../components/Footer/Footer'
import Mask from '../components/Mask/Mask'

class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            status: true,
            data: []
        }
        this.changeStatus = this.changeStatus.bind(this)
    }
    changeStatus () {
        this.setState({
            status: !this.state.status
        })
    }
    
    render () {
        return (
            <div className="project">
                <header className="header">
                    <Row>
                        <div className="project-msg">
                            <a href="#">
                                <span className="logo-icon"/>
                            </a>
                            <span className="project-name">
                                监控管理系统
                            </span>
                            <Switch changeStatus={this.changeStatus}/>
                        </div>
                    </Row>
                </header>
                <div className="content-main">
                    <Row>
                        <Router>
                            <div className="routes">
                                <Slider isShow={this.state.status}/>
                                <div className="content" style={this.state.status ? {paddingLeft: '16.66666%', height: this.height} : {paddingLeft: '0px',height: this.height}}>
                                    <Route exact path="/" component={EditTable}/>
                                    <Route  path="/ctr" component={EditTable}/>
                                </div>
                            </div>
                        </Router>
                    </Row>
                </div>
                <Footer/>
        </div>
        )
    }
}


module.exports = App