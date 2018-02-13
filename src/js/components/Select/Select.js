require('./Select.less')
import React, {Component} from 'react'
import {Input} from 'antd'

class Select extends Component {
    constructor (props) {
        super(props)
        this.state = {
            row: [],
            show: false
        }
        this.firstTime = true
        this.createOption = this.createOption.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.changeData = this.changeData.bind(this)
        this.judgeType = this.judgeType.bind(this)
        
    }
    changeData (value, type, param, record) {
        switch(type) {
            case 'acquisition_type':
                record[param] = value
                break;
            case 'es_ext_rule_type':
                record["es_ext_rule"][param] = value
                break;
            case 'alarm_rules':
                record['alarm_rules'][param] = value
                break;
        }
        
    }
    judgeType (type, value, record) {
        if(record && type && type !== 'alarm_rules' && value) {
            record[type] = value
        }
        switch(type) {
            case 'acquisition_type':
                switch(value){
                    case "1":
                        this.props.selectShow(false)
                        return (<div key={"url"} className="title">
                                    <span>调用接口地址：</span>
                                    <Input defaultValue={record["url"]} style={{ margin: '-5px 0', width:150}} onChange={e => this.changeData(e.target.value, type, "url", record)}/>
                                </div>)
                    case "2":
                        this.props.selectShow(true)
                        return (<div key={"es_index"} className="title">
                            <span>日志在es中的index：</span>
                                <Input defaultValue={record["es_index"]} style={{ margin: '-5px 0', width:150}} onChange={e => this.changeData(e.target.value, type, "es_index", record)}/>
                        </div>)
                }
                break;
            case 'es_ext_rule_type':
                switch(value){
                    case "1":
                        if(!this.firstTime) {
                            record['es_ext_rule'] = {}
                            this.firstTime = false
                        }
                        return ([<br key={1}/>,<div key={"key_col"} className="title">
                                    <span>过滤的字段：</span>
                                    <Input defaultValue={record["es_ext_rule"]["key_col"]} style={{ margin: '5px 0', width:150}} onChange={e => this.changeData(e.target.value, type, "key_col", record)}/>
                                </div>,<br key={2}/>,
                                <div key={"key_val"} className="title">
                                    <span>过滤的字段的值：</span>
                                    <Input defaultValue={record["es_ext_rule"]["key_val"]} style={{ margin: '5px 0', width:150}} onChange={e => this.changeData(e.target.value, type, "key_val", record)}/>
                                </div>])
                    case "2":
                        if(!this.firstTime) {
                            record['es_ext_rule'] = {}
                            this.firstTime = false
                        }
                        return ([<br key={1}/>,<div key={"fraction_key_col"} className="title">
                                    <span>分子过滤的字段：</span>
                                    <Input defaultValue={record["es_ext_rule"]["fraction_key_col"]} style={{ margin: '5px 0', width:150}} onChange={e => this.changeData(e.target.value, type, "fraction_key_col", record)}/>
                                </div>,<br key={2}/>,
                                <div key={"fraction_key_val"} className="title">
                                    <span>分子过滤的字段的值：</span>
                                    <Input defaultValue={record["es_ext_rule"]["fraction_key_val"]} style={{ margin: '5px 0', width:150}} onChange={e => this.changeData(e.target.value, type, "fraction_key_val", record)}/>
                                </div>])
                    case "3":
                        if(!this.firstTime) {
                            record['es_ext_rule'] = {}
                            this.firstTime = false
                        }
                        return ([<br key={1}/>,<div key={"sum_key_col"} className="title">
                                    <span>求和字段：</span>
                                    <Input defaultValue={record["es_ext_rule"]["sum_key_col"]} style={{ margin: '5px 0', width:150}} onChange={e => this.changeData(e.target.value, type, "sum_key_col", record)}/>
                                </div>,<br key={2}/>,
                                <div key={"key_col"} className="title">
                                    <span >过滤的字段：</span>
                                    <Input defaultValue={record["es_ext_rule"]["key_col"]} style={{ margin: '5px 0', width:150}} onChange={e => this.changeData(e.target.value, type, "key_col", record)}/>
                                </div>,<br key={3}/>,
                                <div key={"key_val"} className="title">
                                    <span >过滤的字段的值：</span>
                                    <Input defaultValue={record["es_ext_rule"]["key_val"]} style={{ margin: '5px 0', width:150}} onChange={e => this.changeData(e.target.value, type, "key_val", record)}/>
                                </div>])
                }
                break;
            case 'alarm_rules':
                record['alarm_rules']['op'] = value
                return (<div key={"right_value"} className="title">
                            <span>阈值：</span>
                            <Input defaultValue={record["alarm_rules"]["right_value"]} style={{ margin: '-5px 0', width:150}} onChange={e => this.changeData(e.target.value, type, "right_value", record)}/>
                        </div>)
                break;
        }
    }
    handleChange (value) {
        var type = this.props.sign
        this.setState({
            row: this.judgeType(type, value, this.props.record)
        })
    }
    createOption () {
        var options = this.props.option
        var doms = []
        for(var prop in options) {
            if(Object.hasOwnProperty.call(options, prop)) {
                doms.push(<option value={prop} key={prop}>{options[prop]}</option>)
            }
        }
        return doms
    }
    componentWillMount() {
        this.setState({
            row: this.judgeType(this.props.sign, this.props.default, this.props.record)
        })
    }
    render () {
        var _self = this
        return (
            <div className="select">
                <select  defaultValue={this.props.default} style={{marginBottom: "5px"}} disabled={this.props.disabled} onChange={e => this.handleChange(e.target.value)}>
                    {this.createOption()}
                </select>
                {
                    this.state.row
                }
            </div>
        )
    }
}

module.exports = Select