<template>
  <div class="time-container">
    <h1 class="time">{{`${restTime.min} : ${addZeroWhenSec1Digit}`}}</h1>
    <control-button 
      @click-control="sendControl($event)" 
      :counting-down="countingDown"
    />
  </div>
</template>

<script>
import ControlButton from "./ControlButton.vue";
export default {
  name: 'Time',
  components: {
    ControlButton
  },
  props: {
    restTime: Object,
    countingDown: Boolean
  },
  computed: {
    addZeroWhenSec1Digit: function(){
      return this.restTime.sec<10 ? `0${this.restTime.sec}` : this.restTime.sec;
    }
  },
  methods: {
    sendControl: function (option) {
      this.$emit('send-control', option);
    }
  }
}
</script>

<style>
.time-container{
  display: grid;
  grid-template-rows: repeat(3, calc(100%/3));
  padding: 0;
  margin: 0 auto;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: #b9e6d3;
}
.time{
  grid-row-start: 2;
  margin: auto;
  font-size: 6em;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: #f2f2f2;
}
</style>