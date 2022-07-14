import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks:[]
  },
  getters: {
    tasks(state){
      return state.tasks
    },
    getNewId(state){
      if(state.tasks.length > 1){
        let max = state.tasks[0].id
        state.tasks.forEach(t => {
          if(t.id > max)
            max = t.id
        })
        return max + 1
      }else if(state.tasks.length == 1){
        return state.tasks[0].id + 1
      }
        return 1

    },
    tasksLength(state){
      return state.tasks.length;
    }
  },
  mutations: {
    newTask(state, task){
      state.tasks.push(task)
      localStorage.setItem("tasks", JSON.stringify(state.tasks))

    },
    deleteTask(state, taskId){
      state.tasks = state.tasks.filter(t => t.id != taskId)
      localStorage.setItem("tasks", JSON.stringify(state.tasks))
    },
    deleteCompletedTasks(state){
      state.tasks = state.tasks.filter(t => !t.completed)
      localStorage.setItem("tasks", JSON.stringify(state.tasks))

    },
    deleteAllTask(state){
      state.tasks = []
      localStorage.setItem("tasks", JSON.stringify(state.tasks))

    },
    setTask(state, task){
      const index = state.tasks.findIndex(t => t.id == task.id)
      state.tasks[index] = task
      localStorage.setItem("tasks", JSON.stringify(state.tasks))

    },
    completedTask(state, taskId){
      const index = state.tasks.findIndex(t => t.id == taskId)
      const value = state.tasks[index].completed
      // state.tasks.sort((x,y)=> (x === y)? 0 : x? -1 : 1)
      state.tasks[index].completed = !value
      localStorage.setItem("tasks", JSON.stringify(state.tasks))

    },
    deleteTag(state, {taskId, tagId}){
      console.log(tagId)
      const index = state.tasks.findIndex(t => t.id == taskId)
      state.tasks[index].tags = state.tasks[index].tags.filter(t => t.id != tagId) 
      localStorage.setItem("tasks", JSON.stringify(state.tasks))

    },
    pushTags(state, {taskId, tags}){
      const index = state.tasks.findIndex(t => t.id == taskId)
      state.tasks[index].tags = tags
      localStorage.setItem("tasks", JSON.stringify(state.tasks))
      
    },
    loadLocalStorage(state){
      // let tasks = []
      let values = localStorage.getItem("tasks")
      if(values){
        state.tasks = JSON.parse(values)
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
