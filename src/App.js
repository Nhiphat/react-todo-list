import React from 'react';
import './App.css'
import TaskForm from './components/TaskForm'
import Control from './components/Control'
import TaskList from './components/TaskList'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false
    }
  }
  componentWillMount(){
    console.log(localStorage.getItem('tasks'));
    
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'))
      this.setState({
        tasks: tasks
      }) 
    }
  }
  
  onToggleForm = () =>{
    this.setState({
      isDisplayForm : !this.isDisplayForm
    })
  }
  onCloseForm = () =>{
    this.setState({
      isDisplayForm : false
    })
    
  }
  onShowForm = () =>{
    this.setState({
      isDisplayForm : true
    })
    
  }
  onSubmit=(data)=>{
    var tasks = this.state.tasks;
    if(data.id===''){
      var task = {
        id:Math.floor(Math.random() * 100000000),
        name : data.name,
        status: data.status
      }
    }
    else{
      var index = this.findIndex(data.id);
      tasks[index]=data;
    }
    
    this.setState({
      tasks:tasks,
      taskEdidting : null
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
  }
  onGenerateDta =()=>{
    var tasks = [
      {
        id : 1,
        name: 'Hoc lap trinh',
        status: true
      },
      {
        id : 2,
        name: 'Di choi',
        status: true
      },
      {
        id : 3,
        name: 'Di Xem Phim',
        status: false
      }
    ]
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
    
  }
  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  }

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        return result = index;
      }
    });
    return result;
  }
  onDelete = (id)=>{
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index,1)
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
  onUpdate = (id)=>{
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      var taskEdidting = tasks[index]
      this.setState({
        taskEdidting: taskEdidting
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onShowForm();
  }
  render() {
    var {tasks,isDisplayForm,taskEdidting} =this.state;
    var elmTaskForm = isDisplayForm ? <TaskForm onSubmit={this.onSubmit} onCloseForm = {this.onCloseForm} task ={taskEdidting}></TaskForm>:''
    return (
      <div class="container">
        <div class="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div class="row">
          <div class={isDisplayForm? "col-xs-4 col-sm-4 col-md-4 col-lg-4": ""}>
            {elmTaskForm}
          </div>
          <div class={isDisplayForm? "col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button 
            type="button" 
            class="btn btn-primary"
            onClick={this.onToggleForm}
            >
              <span class="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>
            <button 
            type="button" 
            class="btn btn-danger ml-5" 
            onClick = {this.onGenerateDta}>
              <span class="fa fa-plus mr-5"></span>Generate Data
                </button>
            <Control></Control>
            <div class="row mt-15">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList tasks = {tasks} onUpdateStatus={this.onUpdateStatus} onDelete={this.onDelete} onUpdate ={this.onUpdate}></TaskList>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default App;
