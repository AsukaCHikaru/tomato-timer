<template>
  <div class="control-button-container">
    <button class="control-button" @click="handleClickControl">
      <font-awesome-icon :icon="buttonIcon" />
    </button>
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
    buttonIcon: function () {
      return this.countingDown ? 'pause' : 'play';
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
  margin: 25px auto;
  padding: 0 auto;
  font-size: 3em;
  width: 100px;  
  background-color: transparent;
  border: none;
  color: #f2f2f2;
}
.control-button:focus{
  outline: none;
}
</style>