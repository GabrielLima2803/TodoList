import React, { useEffect, useState } from 'react';
import EditTask from '../modals/EditTask';

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    return () => {
      setModal(false);
    };
  }, []);

  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC"
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1"
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1"
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1"
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD"
    }
  ];

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (updatedTask) => {
    updateListArray(taskObj._id, index, updatedTask);
    toggle();
  };

  const handleDelete = () => {
    deleteTask(index, taskObj._id);
  };

  console.log("taskObj", taskObj);
  return (
    <div className="card-wrapper mr-5">
      <div className="card-top" style={{ "backgroundColor": colors[index % 5].primaryColor }}></div>
      <div className="task-holder">
        <span className="card-header" style={{ "backgroundColor": colors[index % 5].secondaryColor, "borderRadius": "10px" }}>{taskObj.name}</span>
        <p className="mt-3 p">{taskObj.description}</p>

        <div className="task-actions">
          <i className="bi bi-pencil-square" style={{ "color": colors[index % 5].primaryColor }} onClick={toggle}></i>
          <i className="bi bi-trash" style={{ "color": colors[index % 5].primaryColor }} onClick={handleDelete}></i>
        </div>
      </div>
      <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
    </div>
  );
};


export default Card;
