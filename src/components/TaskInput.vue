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

</style>