<template>
  <div class="task-input-container">
    <input type="text" v-model="inputData" @keyup.enter="handleCliclSubmit" />
    <input type="submit" @click="handleCliclSubmit">
  </div>
</template>

<script>
export default {
  name: 'TaskInput',
  data: () => {
    return {
      inputData: ''
    }
  },
  methods: {
    handleCliclSubmit: function () {
      this.$emit('submit-new-task', this.inputData);
      this.inputData = "";
    }
  }
}
</script>

<style>
div.task-input-container{
  padding: 40px 40px 0 40px;
}
.task-input-container > input{
  background-color: transparent;
  border: none;
  font-size: 1.5em;
  font-weight: 400;
  color: #f2f2f2;
}
.task-input-container > input{
  outline: none;
}
.task-input-container > input[type="text"]{
  border-bottom: solid 2px #f2f2f2;
}
</style>