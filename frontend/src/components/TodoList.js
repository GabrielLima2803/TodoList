import React, { useEffect, useState } from 'react';
import CreateTask from './modals/createTask';
import Card from './cards/Card';
import Footer from './footer/Footer';
import Header from './header/Header';

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    let arr = localStorage.getItem('taskList');

    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const deleteTask = (index) => {
    let tempList = taskList;
    tempList.splice(index, 1);
    localStorage.setItem('taskList', JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };

  const updateListArray = (obj, index) => {
    let tempList = taskList;
    tempList[index] = obj;
    localStorage.setItem('taskList', JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    let tempList = taskList;
    tempList.push(taskObj);
    localStorage.setItem('taskList', JSON.stringify(tempList));
    setTaskList(taskList);
    setModal(false);
  };

  return (
    <>
        <Header/>
      <div className="header text-center">
        <h3>Todo List</h3>
        <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>
          Create Task
        </button>
      </div>
      <div className="task-container">
        {taskList.length > 0 ? (
          taskList.map((obj, index) => (
            <Card taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />
          ))
        ) : (
          <p className='Aviso'>Nenhuma tarefa adicionada</p>
        )}
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
      <Footer />
    </>
  );
};

export default TodoList;
