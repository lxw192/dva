import React from 'react';
import { connect } from 'dva';
// import PropTypes from 'prop-types';
import { Table, Popconfirm, Button , Input ,Row , Col , Select } from 'antd';
const { Option } = Select;

class home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          a : 1,
          name:'',
          age:'',
          status:''
        }
    }
    componentDidMount() {
      console.log(this.state.a)
      this.props.dispatch({
        type: 'home/getData',
      })
    }
    add=()=>{
      console.log(this.state.name,
        this.state.age)
       this.props.dispatch({
        type: 'home/add',
          name:this.state.name,
          age:this.state.age,
      })
      this.setState({
        name:'',
          age:'',
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
    onChange=(type , e)=>{
      console.log(type)
      if(type === 'name'){
        this.setState({
          name: e.target.value ,
        })
      }else if(type === 'age'){
        this.setState({
          age: e.target.value ,
        })
      }
      
    }
    onselect = (value , filed)=>{
      console.log(value)
    }
    statusChange=(record)=>{
      this.props.dispatch({
        type: 'home/statusChange',
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
            <span>
              <Popconfirm title="Delete?" onConfirm={this.delete.bind(this, record)}>
                <span style={{ color: '#1890ff', cursor: 'pointer', marginRight: '10px' }}>Delete</span>
              </Popconfirm>
              <Popconfirm title="change?" onConfirm={this.statusChange.bind(this, record)}>
                <span style={{ color: '#1890ff', cursor: 'pointer', marginRight: '10px' }}>change</span>
              </Popconfirm>
            </span>
            
          );
        },
      }];
      let doList = list.length > 0 ?  list.filter(Item=> { return Item.status  } ) : [];
      let noList = list.length > 0 ?  list.filter(Item=> { return !Item.status  }  ) : [];
      const statusoptions = [
        {id:true , name:'已完成'},
        {id:false , name:'未完成'},
      ]
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
            <div>
              姓名:<Input type="text" value={this.state.name} onChange={this.onChange.bind(this, 'name')} placeholder='请输入姓名' style={{ width: '200px' }} />
              年龄:<Input type="number" value={this.state.age} onChange={this.onChange.bind(this, 'age')} placeholder='请输入年龄' style={{ width: '200px' }} />
              状态:<Select defaultValue="" style={{ width: 120 }} onSelect={onselect}>
                <Option value="true">已完成</Option>
                <Option value="false">未完成</Option>
              </Select>
              <span onClick={this.add}>添加</span>
            </div>
            <div>
              <Row>
                <Col span={8}>
                  <p>全部</p>
                  <div style={{ margin: '0px 20px' }}>
                    <Table dataSource={list} columns={columns} border />
                  </div>
                </Col>
                <Col span={8}>
                <p>未完成</p>
                  <div style={{ margin: '0px 20px' }}>
                    <Table dataSource={noList} columns={columns} border />
                  </div>
                </Col>
                <Col span={8}>
                <p>已完成</p>
                  <div style={{ margin: '0px 20px' }}>
                    <Table dataSource={doList} columns={columns} border />
                  </div>
                </Col>
              </Row>
            
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
