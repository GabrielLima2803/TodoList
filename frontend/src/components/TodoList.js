import React, { useEffect, useState } from 'react';
import CreateTaskPopup from './modals/createTask';
import Card from './cards/Card';
import Footer from './footer/Footer';
import Header from './header/Header';

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    console.log(`Token de acesso test: ${storedToken}`)
    if (storedToken) {
      setAuthToken(storedToken);
      getTasks();
    }
    let arr = localStorage.getItem('taskList');

    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const getTasks = async () => {
    try {
      console.log('Token enviado na requisição:', authToken); 
      const response = await fetch('http://localhost:3000/task/get-task', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      const responseData = await response.json();
      console.log('getTasks response:', responseData);

      if (response.ok) {
        setTaskList(responseData);
      } else {
        console.error(responseData.error || 'Erro interno do servidor');
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição. Tente novamente mais tarde.', error);
    }
  };


const deleteTask = async (index, taskId) => {
  try {
    const response = await fetch(`http://localhost:3000/task/delete-task/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      let tempList = taskList;
      tempList.splice(index, 1);
      localStorage.setItem('taskList', JSON.stringify(tempList));
      setTaskList(tempList);
      window.location.reload(); 
    } else {
      console.error(responseData.error || 'Erro interno do servidor');
    }
  } catch (error) {
    console.error('Erro ao fazer a requisição. Tente novamente mais tarde.', error);
  }
};
const updateListArray = async (taskId, index, updatedTask) => {
  try {
    const response = await fetch(`http://localhost:3000/task/put-task/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(updatedTask),
    });

    const responseData = await response.json();

    if (response.ok) {
      let tempList = [...taskList];
      tempList[index] = responseData.task;
      localStorage.setItem('taskList', JSON.stringify(tempList));
      setTaskList(tempList);
      setModal(false);
      console.log('Modal fechado');
    } else {
      console.error(responseData.error || 'Erro interno do servidor');
    }
  } catch (error) {
    console.error('Erro ao fazer a requisição. Tente novamente mais tarde.', error);
  }
};



  const saveTask = async (taskObj) => {
    try {
      console.log('Token enviado na requisição no metodo Save:', authToken); 
      console.log()
      const response = await fetch('http://localhost:3000/task/add-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(taskObj),
      });

      const responseData = await response.json();

      if (response.ok) {
        let tempList = taskList;
        tempList.push(responseData.task);
        localStorage.setItem('taskList', JSON.stringify(tempList));
        setTaskList(tempList);
        setModal(false);
      } else {
        console.error(responseData.error || 'Erro interno do servidor');
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição. Tente novamente mais tarde.', error);
    }
  };

  return (
    <>
      <Header />
      <div className="header text-center">
        <h3>Todo List</h3>
        <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>
          Create Task
        </button>
      </div>
      <div className="task-container">
        {taskList.length > 0 ? (
          taskList.map((obj, index) => (
            <Card key={index} taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />
          ))
        ) : (
          <p className="Aviso">Nenhuma tarefa adicionada</p>
        )}
      </div>
      <CreateTaskPopup modal={modal} toggle={toggle} save={saveTask} />
      <Footer />
    </>
  );
};

export default TodoList;


