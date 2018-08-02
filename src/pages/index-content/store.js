import Vue from 'vue'
import Vuex from 'vuex'
import routes from './routeConfig'

Vue.use(Vuex)
let _state={},_getters={},_mutations={},_actions={}

routes.forEach(ele=>{
	_state[ele.name]=[]
	_getters[`get${ele.name}`]=(state)=>{
		return state[ele.name]
	}
	_mutations[`update${ele.name}`]=(state,payload)=>{
		state[ele.name]=payload
	}
})
const store = new Vuex.Store({
   state:_state,
   getters:_getters,
   mutations:_mutations,
   actions:_actions
})

export default store
