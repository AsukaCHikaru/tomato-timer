<template>
  <div class="task-list-container" :class="listName.toLowerCase()">
    <h3 class="task-list-name">{{listName}}</h3>
    <ul class="task-list-ul">
      <task-item 
        v-for="(task, index) in tasks"
        :key="'task-item-'+index"
        :task="task"
        @click-finish-task="handleClickFinishTask"
        @click-delete-task="handleClickDeleteTask"
        :hasDelBtn="hasDelBtn"
      />
    </ul>
  </div>
</template>

<script>
import TaskItem from "./TaskItem.vue";

export default {
  name: 'TaskList',
  components: {
    TaskItem
  },
  props: {
    listName: String,
    tasks: Array
  },
  computed: {
    hasDelBtn: function () {
      return this.listName!=='Delete'
    }
  },
  methods: {
    handleClickFinishTask: function (taskId) {
      this.$emit('click-finish-task', taskId);
    },
    handleClickDeleteTask: function (taskId) {
      this.$emit('click-delete-task', [taskId, this.listName.toLowerCase()]);
    }
  }
}
</script>

<style>
div.task-list-container{
  padding: 0 40px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: #f2f2f2;
}
h3.task-list-name{
  font-weight: 400;
  font-size: 1.8em;
  line-height: 2em;
  border-bottom: solid 3px #f2f2f2;
}
ul.task-list-ul{
  list-style-type: none;
}
li.task-list-li{
  display: grid;
  grid-template-columns: 20% auto 20%;
}
h6.task-list-li-txt{
  display: inline;  
  margin: 5px 0;
  font-weight: 300;
  font-size: 2em;
  
}
button.task-list-li-btn{
  background-color: transparent;
  border: none;
  font-size: 1.5em;
  color: #f2f2f2;
}
button.task-list-li-btn:focus{
  outline: none;
}
</style>