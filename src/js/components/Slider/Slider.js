require('./Slider.less')
import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import { Menu, Switch } from 'antd';
const { SubMenu } = Menu;

class Slider extends React.Component {
    constructor (props) {
        super(props)
    }
  render() {
    return (
        <div className="slider-left" style={this.props.isShow ? {left: 0} : {left: "-16.666667%"}}>
            <Menu
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode={'vertical'}
                theme={'light'}
            >
                <Menu.Item key="1">
                    <Link to="/">
                        系统模板配置
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/ctr">
                        监控指标配置
                    </Link>
                </Menu.Item>
            </Menu>
        </div>
    );
  }
}
module.exports = Slider