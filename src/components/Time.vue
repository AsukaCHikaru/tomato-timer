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
      const startHex = [185, 230, 211];
      const endHex = [239, 108, 87];
      const currProgress = [
        Math.floor((endHex[0]-startHex[0])/100 * this.pastTimePer),
        Math.floor((endHex[1]-startHex[1])/100 * this.pastTimePer),
        Math.floor((endHex[2]-startHex[2])/100 * this.pastTimePer)
      ];
      const currColor = 
        Number(startHex[0] + currProgress[0]).toString(16) +
        Number(startHex[1] + currProgress[1]).toString(16) +
        Number(startHex[2] + currProgress[2]).toString(16)      
      return '#'+currColor;
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