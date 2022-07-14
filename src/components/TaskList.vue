<template>
  <div class="container">
    <div class="row">
      <div class="col m12">
        <button @click="deleteCompletedTasks" class="btn mb-10 mr-10">
          Удалить все выполненные
        </button>
        <button @click="deleteAllTask" class="btn mb-10">
          Удалить все 
        </button>
        <ul v-if="$store.getters.tasksLength > 0" class="collection">
          <task-view v-for="t in $store.getters.tasks" :key="t.id" :task="t" />
        </ul>
        <div v-else class="message text-center">
          Задач нет
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskView from "./TaskView";
export default {
  components: {
    TaskView,
  },
  methods:{
    deleteCompletedTasks(){
      this.$store.commit("deleteCompletedTasks")
    },
    deleteAllTask(){
      this.$store.commit("deleteAllTask")
    }
  },
  created(){
    this.$store.commit("loadLocalStorage")
  }
};
</script>
