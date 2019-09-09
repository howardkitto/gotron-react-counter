export default (state, action)=>{
    switch (action.type){
      case 'gotMessage':  
      // console.log(action)        
        return {
          ...state,
          message : action.message
        }
      case 'sendMessage':
        // console.log(action)
        return{
          ...state,
          sendMessage: action.message
        }
      default:
        return state
    }
  }