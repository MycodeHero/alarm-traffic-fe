require('./Popconfirm.less')
import React, {Component} from 'react'

class Popconfirm extends Component {
    constructor (props) {
        super(props)
        this.state = {
            show: false
        }
        this.edit = this.edit.bind(this)
        this.save = this.save.bind(this)
        this.cancel = this.cancel.bind(this)
    }
    edit () {
        this.setState({
            show: !this.state.show
        })
        this.props.changeStateList()
    }
    save () {
        this.setState({
            show: !this.state.show
        })
        this.props.changeStateList()
        this.props.save()
    }
    cancel () {
        this.setState({
            show: !this.state.show
        })
        this.props.changeStateList()
    }
    render () {
        return (<div className="table-edit">
            <span onClick={this.edit} className={this.state.show ? 'hide' : 'show'}>编辑</span>
            <div className={this.state.show ? 'show' : 'hide'}>
                <span onClick={this.save}>保存</span>
                <span onClick={this.cancel}>取消</span>
            </div>
        </div>)
    }
}

module.exports = Popconfirm