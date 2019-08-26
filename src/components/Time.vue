<template>
  <div 
    class="time-container"
    :style="{'background-color': timeBackgroundColor}"
  >
    <h1 class="time">{{`${timeMinDisplay} : ${addZeroWhenSec1Digit}`}}</h1>
    <control-button 
      @click-control="sendControl($event)" 
      :counting-down="countingDown"
    />
  </div>
</template>

<script>
import ControlButton from "./ControlButton.vue";
import { Gradient } from "../logic/calcGradient";
const colors = ['b9e6d3', '7ed3b2', 'efbf57', 'ef6c57'];
const g = new Gradient(colors);

export default {
  name: 'Time',
  components: {
    ControlButton
  },
  props: {
    restTimeSec: Number,
    countingDown: Boolean,
    pastTimePer: Number
  },
  computed: {
    addZeroWhenSec1Digit: function(){
      return (this.restTimeSec % 60) <10 ? `0${this.restTimeSec%60}` : this.restTimeSec%60;
    },
    timeMinDisplay: function () {
      return Math.floor(this.restTimeSec / 60);
    },
    timeBackgroundColor: function () {
      return g.getColor(this.pastTimePer);
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