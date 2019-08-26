<template>
  <div id="app">
    <div class="main-container">
      <div class="task-container">
        <task-input 
          @submit-new-task="submitNewTask($event)"           
        />
        <TaskList 
          :list-name="'Done'" 
          :tasks="tasks.done" 
          @click-delete-task="deleteTask($event)"
        />
        <TaskList 
          :list-name="'Next'" 
          :tasks="tasks.next" 
          @click-finish-task="finishTask($event)"
          @click-delete-task="deleteTask($event)"
        />
        <TaskList 
          :list-name="'Delete'" 
          :tasks="tasks.delete" 
        />
      </div>
      <div class="timer-container">
        <this-task-display :task="taskForDisplay" />
        <Time  
          :rest-time-sec="restTimeSec" 
          @send-control="handleControl($event)" 
          :counting-down="countingDown"
          :past-time-per="pastTimePer"
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
import ThisTaskDisplay from "./components/ThisTaskDisplay.vue";

export default {
  name: 'app',
  components: {
    ModeButton,
    Time,
    TaskList,
    TaskInput,
    ThisTaskDisplay
  },
  data: function() {
    return {
      restTimeSec: 1500,
      currMode: 'work',
      countingDown: false,
      tasks: {
        done: [],
        next: [],
        delete: []
      },
      taskNumber: 1
    }
  },
  computed: {
    taskForDisplay: function () {
      return this.tasks.next.length === 0 ? {} : this.tasks.next[0];
    },
    pastTimePer: function () {
      const fullTimeSec = 1500;
      const pastTimePer = 100 - Math.floor(this.restTimeSec/fullTimeSec * 100);
      return pastTimePer;
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
      if(this.restTimeSec===0) this.stopCountDown();
      else this.restTimeSec--;
    },
    startCountDown: function () {
      this.countDownInt = setInterval(this.countDown, 10);
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
          this.restTimeSec = 1500;
          break;
        case 'break':
          this.restTimeSec = 300;
          break;
        case 'longbreak':
          this.restTimeSec = 900;
          break;        
      }
    },
    submitNewTask: function (task) {
      const newTask = {
        number: this.taskNumber,
        content: task,
        id: (new Date).getTime(),
        done: false        
      }
      this.taskNumber++;
      this.tasks.next = [...this.tasks.next, newTask];
    },
    finishTask: function (taskId) {
      const taskToFinish = this.tasks.next.find(task => {
        return task.id === taskId
      });
      taskToFinish.done = true;
      const index = this.tasks.next.indexOf(taskToFinish);
      this.tasks.next.splice(index, 1);
      this.tasks.done.push(taskToFinish);
    },
    deleteTask: function ([taskId, listName]) {
      const taskToDelete = this.tasks[listName].find(task => {
        return task.id === taskId
      });
      const index = this.tasks[listName].indexOf(taskToDelete);
      this.tasks[listName].splice(index, 1);
      this.tasks.delete.push(taskToDelete);
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
  box-shadow: 5px 0 8px 5px #000;
}
</style>
