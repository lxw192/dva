import React from 'react';
import { connect } from 'dva';
// import PropTypes from 'prop-types';
import { Table, Popconfirm, Button } from 'antd';
class home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        //   a : 1
        }
    }
    componentDidMount() {
      console.log(this.state.a)
      this.props.dispatch({
        type: 'home/getData',
      })
    }
    add=()=>{
       this.props.dispatch({
        type: 'home/add',
      })
    }
    minus=()=>{
        this.props.dispatch({
            type: 'home/minus',
          })
    }
    delete=(record)=>{
      this.props.dispatch({
        type: 'home/delete',
        id:record.id
      })
    }
    render() {
        const { list , a } = this.props;
      const columns = [{
        title: '姓名',
        dataIndex: 'name',
        width:100,
      }, {
        title: '年龄',
        dataIndex: 'age',
        width:100,
      }, {
        title: '操作',
        dataIndex: 'action',
        width:100,
        render: (text, record) => {
          return (
            <Popconfirm title="Delete?" onConfirm={this.delete.bind(this, record)}>
              <span style={{color:'#1890ff' , cursor:'pointer' , marginRight:'10px'}}>Delete</span>
            </Popconfirm>
          );
        },
      }];
        return (
          <div>
            <div style={{ width: '200px', margin: '0 auto' }}>
              <div>
                <Button type='primary' onClick={this.add} >+</Button>
              </div>
              <div>
                <p>{a}</p>
              </div>
              <div>
                <Button disabled={list.length >0 ? false : true} type='primary' onClick={this.minus} >-</Button>
              </div>
            </div>
            <div style={{margin:'0px 20px'}}>
              <Table dataSource={list} columns={columns} border/>
            </div>
          </div>
        )
    }
}

export default connect( 
    (state)=>{
       return {
        a : state.home.a,
        list:state.home.list,
       }
    }
)(home);
