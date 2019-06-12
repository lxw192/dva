import Item from "antd/lib/list/Item";

export default {

  namespace: 'home',

  state: {
    a:0,
    list:[]
  },

  // subscriptions: {
  //   setup({ dispatch, history }) {  // eslint-disable-line
  //   },
  // },

  // effects: {
  //   *fetch({ payload }, { call, put }) {  // eslint-disable-line
  //     yield put({ type: 'save' });
  //   },
  // },

  // reducers: {
  //   save(state, action) {
  //     return { ...state, ...action.payload };
  //   },
  // },
  reducers :{
    add(state){
       if(state.list.length == 0){
        let list = [
          {'id':100,'name':'小明1' ,'age':20 },
        ]
        return{ ...state , list, a:list.length}
      }else{
        let name = state.list[state.list.length -1].name;
        let nameArr = name.split('小明')
console.log(Number(nameArr[1]) + 1)
        let arr = [{ 'id':state.list[state.list.length -1].id + 1 , 'name':'小明' + ( Number(nameArr[1]) + 1 ) , 'age':state.list[state.list.length -1].age + 1 }]
        return{ ...state , list:state.list.concat(arr), a:state.list.concat(arr).length}
      }
    },
    minus(state){
      if(state.list.length > 0){
        let list = state.list.filter( Item=>{
          return Item.id != state.list[0].id
        })
        return{ ...state , list, a:list.length}
      }else{

      }
     
    },
    getData(state){
      let arr = [
        {'id':100,'name':'小明1' ,'age':20 },
        {'id':101,'name':'小明2' ,'age':21 },
        {'id':102,'name':'小明3' ,'age':22 },
        {'id':103,'name':'小明4' ,'age':23 },
      ]
      return{ ...state , list:arr , a:arr.length }
    },
    delete(state , id){
      let list = state.list.filter( Item=>{
        return Item.id != id.id
      })
      return{ ...state , list, a:list.length}
    }
  }
};
