<template>
  <div class="task-list-container">
    <h3>{{listName}}</h3>
    <ul class="">
      <li 
        v-for="(task, index) in tasks"
        :key="'task-li-'+index"
      >{{task}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  props: {
    listName: String,
    tasks: Array
  }
}
</script>

<style>

</style>