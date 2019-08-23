<template>
  <div class="task-list-container" :class="listName.toLowerCase()">
    <h3>{{listName}}</h3>
    <ul class="task-list-ul">
      <li 
        v-for="(task, index) in tasks"
        :key="'task-li-'+index"
        class="task-list-li"
      >
        <button 
          class="task-list-li-btn"
          @click="handleClickFinishTask(task.id)"
        >finish</button>
        <h6 class="task-list-li-txt">{{task.content}}</h6>
        <button class="task-list-li-btn">edit</button>
        <button class="task-list-li-btn">delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  props: {
    listName: String,
    tasks: Array
  },
  methods: {
    handleClickFinishTask: function (taskId) {
      this.$emit('click-finish-task', taskId);
    }
  }
}
</script>

<style>
ul.task-list-ul{
  list-style-type: none;
}
li.task-list-li{
  display: grid;
  grid-template-columns: 20% auto 20% 20%;
}
h6.task-list-li-txt{
  display: inline;
}
button.task-list-li-btn{
  background-color: transparent;
  border: none;
}
button.task-list-li-btn:focus{
  outline: none;
}
</style>