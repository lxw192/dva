export default {

  namespace: 'home',

  state: {
    a:0,
    list:[]
  },
  reducers :{
    add(state , action ){
      if(action.name.length > 0){
        let list=state.list.concat([{ 'id':state.list[state.list.length -1].id + 1 ,name:action.name , age:action.age } ])
        return{ ...state , list, a:list.length}
      }else{
        if(state.list.length === 0){
          let list = [
            {'id':100,'name':'小明1' ,'age':20 },
          ]
          return{ ...state , list, a:list.length}
        }else{
          let arr = [{ 'id':state.list[state.list.length -1].id + 1 , 'name':'小明', 'age':Number(state.list[state.list.length -1].age)+ 1 }]
          return{ ...state , list:state.list.concat(arr), a:state.list.concat(arr).length}
        }
      }
       
    },
    minus(state){
      if(state.list.length > 0){
        let list = state.list.filter( Item=>{
          return Item.id !== state.list[0].id
        })
        return{ ...state , list, a:list.length}
      }else{

      }
     
    },
    getData(state){
      let arr = [
        {'id':100,'name':'小明1' ,'age':20 , status:true },
        {'id':101,'name':'小明2' ,'age':21 , status:false },
        {'id':102,'name':'小明3' ,'age':22 , status:true },
        {'id':103,'name':'小明4' ,'age':23 , status:false },
      ]
      return{ ...state , list:arr , a:arr.length }
    },
    delete(state , id){
      let list = state.list.filter( Item=>{
        return Item.id !== id.id
      })
      return{ ...state , list, a:list.length}
    },
    statusChange(state , id){
      let list = []
     state.list.map( item=>{
      
       console.log(item)
        if(item.id === id.id){
          list.push({...item ,status:!item.status })
        }else{
          list.push( item )
        }
      // return list
      })
      console.log(list)
      return{ ...state , list}
    }
  }
};
