<template>
  <div id="app">
    <div class="main-container">
      <div class="task-container">
        <task-input 
          @submit-new-task="submitNewTask($event)"           
        />
        <TaskList :list-name="'Done'" :tasks="tasks.done" />
        <TaskList 
          :list-name="'Next'" 
          :tasks="tasks.next" 
          @click-finish-task="finishTask($event)"
        />
      </div>
      <div class="timer-container">
        <mode-button @change-mode="changeMode($event)" />
        <Time  
          :rest-time="restTime" 
          @send-control="handleControl($event)" 
          :counting-down="countingDown"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ModeButton from "./components/ModeButton.vue";
import Time from "./components/Time.vue";
import TaskList from "./components/TaskList.vue";
import TaskInput from "./components/TaskInput.vue";

export default {
  name: 'app',
  components: {
    ModeButton,
    Time,
    TaskList,
    TaskInput
  },
  data: function() {
    return {
      restTime: {
        min: 25,
        sec: 0
      },
      currMode: 'work',
      countingDown: false,
      tasks: {
        done: [],
        next: []
      }
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
    },
    submitNewTask: function (task) {
      const newTask = {
        content: task,
        id: (new Date).getTime()
      }
      this.tasks.next = [...this.tasks.next, newTask];
    },
    finishTask: function (taskId) {
      const taskToFinish = this.tasks.next.find(task => {
        return task.id === taskId
      });
      const index = this.tasks.next.indexOf(taskToFinish);
      this.tasks.next.splice(index, 1);
      this.tasks.done.push(taskToFinish);
    }
  }
}
</script>
<style>
html, body{
  margin: 0;
  height: 100%;
  background-color: #f2f2f2;
}
#app{
  height: 100%;
}
.main-container{
  display: grid;
  grid-template-columns: 50% 50%;
  margin: auto;
  height: 100%;
}
.task-container{
  background-color: #7ed3b2;
}
.timer-container{
  display: grid;
  grid-template-rows: 25% 75%;
}
</style>
