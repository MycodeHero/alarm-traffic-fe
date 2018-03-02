require('./EditTable.less')
import React, {Component} from 'react'
import { Table, Input, Button, Popconfirm} from 'antd';
import {falCol, ruleCol} from '../../../../config/sysConfig'
import {falOption, ruleOption} from '../../../../config/editOption'
import {ruleConfig, falConfig} from '../../../../config/saveConfig'
import {deepClone} from '../../util/deepClone'
import {stat_type, acquisition_type, es_ext_rule_type, is_last_compare, alarm_rules} from '../../../../config/selectOption'
import {post} from '../../../api'
import AlertEdit from '../AlertEdit/AlertEdit'
import Select from '../Select/Select'

const data = []

const sign = falOption

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.data = []
        this.state = { 
            data,
            doms: null,
            count: data.length
        };
        this.init = this.init.bind(this)
        this.save = this.save.bind(this)
        this.cancel = this.cancel.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.api = this.api.bind(this)
        this.updateColumns = this.updateColumns.bind(this)
        this.updateSign = this.updateSign.bind(this)
    }
    
    updateColumns () {
        let columns = []
        let path = this.props.match.path
        switch (path) {
            case '/':
                columns = falCol
                break;
            case '/ctr':
                columns = ruleCol
        }
        columns.forEach((ele)=> {
            if(ele.dataIndex === 'operation') {
                ele.render = (text, record) => (
                <div> 
                    <a onClick={() => this.edit(record.key)}>编辑</a>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                        <a href="#">删除</a>
                    </Popconfirm>
                </div>)         
                return
            }
            ele.render = (text, record) => this.renderColumns(text, record, ele.key)
        })
        this.columns = columns
    }

    updateSign () {
        let path = this.props.match.path
        switch (path) {
            case '/':
                this.sign = falOption
                break;
            case '/ctr':
                this.sign = ruleOption
        }
    }

    componentWillMount() {
        this.updateColumns()
        this.updateSign()
    }

    renderColumns(text, record, column) {
        switch(column) {
            case 'stat_type':
                return (<div>
                            <div style={{display:"inline-block"}}>{stat_type[record['stat_type']]}</div>
                        </div>)
            case 'acquisition_type':
                return (<div>
                            <div style={{display:"inline-block"}}>{acquisition_type[record['acquisition_type']]}</div>
                        </div>)
            case 'es_ext_rule_type':
                return (<div>
                            <div style={{display:"inline-block"}}>{es_ext_rule_type[record['es_ext_rule_type']]}</div>
                        </div>)
            case 'is_last_compare':
                return (<div>
                            <div style={{display:"inline-block"}}>{is_last_compare[record['is_last_compare']]}</div>
                        </div>)
            case 'alarm_rules':
                return (<div>
                            <div style={{display:"inline-block"}}>{record['alarm_rules']['op']+ text['right_value']}</div>
                        </div>)
        }
        return (<div style={{display:"inline-block"}}>{text}</div>);
    }
    handleChange(value, key, column) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            if(column == 'alarm_rules') {
                if((/[==|!=|>|<|>=|<=]/g).test(value)) {
                    var op = value
                    var right_value = target[column]["right_value"]
                }else {
                    var op = target[column]["op"]
                    var right_value = value
                }
                target[column] = {
                    op,
                    right_value 
                }
            }else {
                target[column] = value;
            }
        this.setState({ data: newData });
        }
    }
    onDelete (key) {
        const dataSource = [...this.state.data];
        this.setState({
            doms: null
        })
        this.setState({ data: dataSource.filter((item) => {
                if(item.key == key) {
                    this.api('delete', {"id": item.id})
                }
                return item.key !== key
            }) 
        });
    }
    handleAdd () {
        const { count, data } = this.state;
        const newData = {}
        this.props.match.path === '/' ? deepClone(newData, falConfig): deepClone(newData, ruleConfig);
        newData.key = count 
        this.setState({
            data: [...data, newData],
            count: count + 1,
        });
        setTimeout(() => {
            this.edit(count)
        })
    }
    edit(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({ data: newData, doms: target});
        }
    }
    save(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            if(target.id === '') {
                this.api('add', target)
            }else {
                this.api('update', target)
            }
        }
    }

    cancel(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target.id) {
            Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
        } else {
            newData.pop()
        }
        this.setState({ data: newData, doms: null});
      }
     
    init (data) {
        if(typeof data === 'string') {
            alert(data)
            return
        }
        data.forEach((item,index) => {
            item.key = index + 1
        })
        this.cacheData = data.map(item => {
            return Object.assign({}, item)
        });
        this.setState({ 
            data,
            count: data.length + 1
        });
    }

    alertError(msg, target) {
        if(typeof msg == 'string') {
            alert(msg)
            target.editable = true
            return false 
        } else {
            target.editable = false
            this.setState({
                doms: null
            })
            return true 
        }    
    }

    api (status, target) {
        let path = this.props.match.path
        switch(path) {
            case '/ctr':
                switch(status) {
                    case 'add':
                        post('/rule/add', target, (returnValue) => {
                            var flag = this.alertError(returnValue, target) 
                            if(flag) {
                                post('/rule/list', {}, this.init)
                            }
                        })
                        break;
                    case 'delete': 
                        post('/rule/delete', target, (returnValue) => {
                            var flag = this.alertError(returnValue, target) 
                            if(flag) {
                                post('/rule/list', {}, this.init)
                            }
                        })
                        break;
                    case 'update':
                        post('/rule/update', target, (returnValue) => {
                            var flag = this.alertError(returnValue, target) 
                            if(flag) {
                                post('/rule/list', {}, this.init)
                            }
                        })
                        break;
                }
                break;
            case '/':
                switch(status) {
                    case 'add':
                        post('/falconTpl/add', target, (returnValue) => {
                            var flag = this.alertError(returnValue, target) 
                            if(flag) {
                                post('/falconTpl/list', {}, this.init)
                            }
                        })
                        break; 
                    case 'delete': 
                        post('/falconTpl/delete', target, (returnValue) => {
                            var flag = this.alertError(returnValue, target) 
                            if(flag) {
                                post('/falconTpl/list', {}, this.init)
                            }
                        })
                        break;
                    case 'update':
                        post('/falconTpl/update', target,  (returnValue) => {
                            var flag = this.alertError(returnValue, target) 
                            if(flag) {
                                post('/falconTpl/list', {}, this.init)
                            }
                        })
                        break;
                }
                break
        }
    }
    componentDidMount(){
        let path = this.props.match.path
        switch(path) {
            case '/ctr':
                post('/rule/list', {}, this.init)
                break;
            case '/':
                post('/falconTpl/list', {}, this.init)
                break
        }
        this.api()
    }
  render() {
    return(<div className="table">
            <div className="edit-style">
              <Button className="editable-add-btn" onClick={this.handleAdd}>增加</Button>
            </div>
            <Table bordered dataSource={this.state.data} columns={this.columns} pagination={false}/>
            <AlertEdit doms= {this.state.doms} handleChange={this.handleChange} param={this.sign} save={this.save} cancel={this.cancel} onDelete={this.onDelete}/>
        </div>)
  }
}

module.exports = EditableTable