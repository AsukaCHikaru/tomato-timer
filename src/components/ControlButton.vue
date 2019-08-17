<template>
  <div class="control-button-container">
    <button class="control-button" @click="handleClickControl">{{buttonDisplay}}</button>
  </div>
</template>

<script>
export default {
  name: 'ControlButton',
  props: {
    countingDown: Boolean
  },
  methods: {
    handleClickControl: function(){            
      const ctrlOpt = this.countingDown ? 'pause' : 'start';
      this.$emit('click-control', ctrlOpt);
    }
  },
  computed: {
    buttonDisplay: function () {
      return this.countingDown ? 'PAUSE' : 'START';
    }
  }
}
</script>

<style>
.control-button-container{
  grid-row-start: 3;
  margin: 0 auto;
}
.control-button{  
  margin: 0 auto;
  padding: 0 auto;
  font-size: 1.5em;
  width: 100px;  
  background-color: transparent;
  border: none;
}
.control-button:focus{
  outline: none;
}
</style>