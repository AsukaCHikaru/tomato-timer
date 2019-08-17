<template>
  <div id="app">
    <div class="main-container">
      <mode-button @change-mode="changeMode($event)" />
      <Time  
        :rest-time="restTime" 
        @send-control="handleControl($event)" 
        :counting-down="countingDown"
      />
    </div>
  </div>
</template>

<script>
import ModeButton from "./components/ModeButton.vue";
import Time from "./components/Time.vue";

export default {
  name: 'app',
  components: {
    ModeButton,
    Time,
  },
  data: function() {
    return {
      restTime: {
        min: 25,
        sec: 0
      },
      currMode: 'work',
      countingDown: false
    }
  },
  methods: {
    handleControl: function (option) {
      switch (option) {
        case 'start':          
          this.startCountDown();
          break;
        case 'pause':
          this.stopCountDown();
      }
    },
    countDown: function () {
      if(this.restTime.sec===0){
        if(this.restTime.min===0) {
          this.stopCountDown();
        }
        else{
          this.restTime.min--;
          this.restTime.sec = 59;
        }
      }else{
        this.restTime.sec--;
      }  
    },
    startCountDown: function () {
      this.countDownInt = setInterval(this.countDown, 1000);
      this.countingDown = true;
    },
    stopCountDown: function () {
      clearInterval(this.countDownInt);
      this.countingDown = false;
    },
    changeMode: function (newMode) {
      this.stopCountDown();
      this.currMode = newMode;
      this.restTime.sec = 0;
      switch (this.currMode) {
        case 'work':
          this.restTime.min = 25;
          break;
        case 'break':
          this.restTime.min = 5;
          break;
        case 'longbreak':
          this.restTime.min = 15;
          break;        
      }
    }
  }
}
</script>

<style>
html, body{
  background-color: #eee;
}
#app{
  display: grid;
  grid-template-rows: auto 50% auto;
}
.main-container{
  grid-row-start: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
}
</style>
