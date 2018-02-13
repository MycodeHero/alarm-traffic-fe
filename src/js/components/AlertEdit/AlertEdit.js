require('./AlertEdit.less')
import React, {Component} from 'react'
import {Input, Button, Popconfirm, TimePicker} from 'antd'
import {stat_type, acquisition_type, es_ext_rule_type, is_last_compare, alarm_rules} from '../../../../config/selectOption'
import moment from 'moment';
import Select from '../Select/Select'
import Mask from '../Mask/Mask'

class AlertEdit extends Component {
    constructor (props) {
        super(props)
        this.renderElement = this.renderElement.bind(this);
        this.isShow = this.isShow.bind(this);
        this.selectShow = this.selectShow.bind(this);
        this.state = {
            sshow: false
        }
    }
    isShow () {
        if(!this.props.doms || !this.props.doms['editable']) {
            return false
        }
        return true
    }
    selectShow (status) {
        this.setState({
            sshow: status
        })
    }
    type (name, record) {
        var _self = this;
        switch(name) {
            case 'stat_type':
                return (<Select option={stat_type} sign={name} default={record["stat_type"]} record={record}/>)
            case 'acquisition_type':
                return (<Select option={acquisition_type} sign={name} default={record["acquisition_type"]} record={record} selectShow={this.selectShow}/>)
            case 'es_ext_rule_type':
                return (<Select option={es_ext_rule_type} sign={name} default={record["es_ext_rule_type"]} record={record}/>)
            case 'is_last_compare':
                return (<Select option={is_last_compare} sign={name} default={record["is_last_compare"]} record={record}/>)
            case 'alarm_rules':
                return  (<Select option={alarm_rules} sign={name} default={record["alarm_rules"]['op']} record={record}/>)
            case 'start_time':
            case 'end_time':
                return <TimePicker record={record} defaultValue={moment(record[name], 'HH:mm:ss')} attr={name} onChange={time => _self.props.handleChange(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/g.exec(time._d)[0], record.key, name)}/>
        }
        return <Input style={{ margin: '-5px 0', width:200}} value={record[name]} attr={name} onChange={e => _self.props.handleChange(e.target.value, record.key, e.target.getAttribute('attr'))}/>
    }
    renderElement () {
        let record = this.props.doms
        let sign = this.props.param
        let row = []
        let style = {}
        let title = ""
        for(var attr in record) {
            if(Object.hasOwnProperty.call(record, attr)) {
                if(!sign[attr]) {
                    continue 
                }
                if(attr === 'es_ext_rule_type') {
                    style = this.state.sshow ? {display: "block"}: {display: "none"}
                }
                if(attr === 'priority') {
                    title = "p0的话 会打电话，发短信，发微信，发邮件。共四种通知方式。p1 ，p2 就发短信，发微信，发邮件 大于等于p3 就只发邮件和微信了。"
                }
                row.push(<div key={attr} style={Object.assign({width:900, marginTop:20}, style)}>
                    <span title={title} style={{cursor: "default"}}>{sign[attr]}：</span>
                    {this.type(attr, record)}
                </div>)
            }
            style = {}
            title = ""
        }
        return row
    }
    render () {
        return (
        <Mask isShow={this.isShow()}>
            <div className="alert-edit">
                {this.renderElement()}
                <Button type="primary" onClick={() => this.props.cancel(this.props.doms['key'])}>取消</Button>
                <Button type="primary" onClick={() => this.props.save(this.props.doms['key'])}>保存</Button>
            </div>
        </Mask>)
    }
}
module.exports = AlertEdit
