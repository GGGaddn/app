<template>
  <div>
    <NewTask/>
    <TaskList/>
  </div>
</template>

<script>
import TaskList from './components/TaskList'
import NewTask from './components/NewTask'
export default {
  name: 'App',
  components: {
    TaskList,
    NewTask
  }
}
</script>

<style lang="scss">
.p-10{
  padding: 10px;
}
.p-20{
  padding: 20px;
}
.mb-10{
  margin-bottom: 10px;
}
.text-center{
  text-align: center;
}
.mr-10{
  margin-right: 10px;
}
</style>
