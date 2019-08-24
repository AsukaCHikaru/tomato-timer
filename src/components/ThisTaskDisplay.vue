<template>
  <h2 class="this-task-display">
    {{firstLine}}<br>
    {{secondLine}}
  </h2>
</template>

<script>
export default {
  name: 'ThisTaskDisplay',
  props: {
    task: Object
  },
  computed: {
    firstLine: function () {
      return this.task.number === undefined 
        ? ''
        : `Task ${this.task.number}`
    },
    secondLine: function () {
      return this.task.number === undefined 
        ? ''
        : this.task.content
    },
  }
}
</script>

<style>
.this-task-display{
  margin: 1em;
  color: #7ed3b2;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: 600;
  font-size: 2em;
}
</style>