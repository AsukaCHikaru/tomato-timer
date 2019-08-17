<template>
  <div class="mode-button-container">
    <button 
      v-for='(mode, index) in modes' 
      :key="'mode-button-'+index" 
      @click="changeMode(mode)"
      class="mode-button"
    >
      {{ mode }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ModeButton',
  data: () => {
    return {
      modes: ['WORK', 'BREAK', 'LONG BREAK']
    }
  },
  methods: {
    changeMode: function (mode) {
      const newMode = mode.toLowerCase().replace(' ', '');
      this.$emit('change-mode', newMode);
    }
  }
}
</script>

<style>
.mode-button-container{
  display: flex;
  justify-content: center;
}
.mode-button{
  width: 200px;
  font-size: 1.5em;
  background-color: transparent;
  border: none;
}
.mode-button:focus{
  outline: none;
}
</style>