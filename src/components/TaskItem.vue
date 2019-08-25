<template>
  <li 
    class="task-list-li"
  >
    <button 
      class="task-list-li-btn"
      @click="handleClickFinishTask(task.id)"
    >
      <font-awesome-icon :icon="doneIcon" />
    </button>
    <h6 class="task-list-li-txt">{{task.content}}</h6>
    <button 
      v-if="hasDelBtn"
      class="task-list-li-btn"
      @click="handleClickDeleteTask(task.id)"
    >
      <font-awesome-icon :icon="['fas', 'trash']" />
    </button>
  </li>
</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    task: Object,
    hasDelBtn: Boolean
  },
  computed: {
    doneIcon: function () {
      return this.task.done ? ['fas', 'circle'] : ['far', 'circle']
    }
  },
  methods: {
    handleClickFinishTask: function (taskId) {
      this.$emit('click-finish-task', taskId);
    },
    handleClickDeleteTask: function (taskId) {
      this.$emit('click-delete-task', taskId);
    }
  }
}
</script>

<style>

</style>