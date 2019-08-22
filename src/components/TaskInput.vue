<template>
  <div class="task-input-container">
    <input type="text" v-model="inputData" />
    <input type="submit" @click="submitNewTask">
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
    submitNewTask: function () {
      this.$emit('submit-new-task', this.inputData);
      this.inputData = "";
    }
  }
}
</script>

<style>

</style>