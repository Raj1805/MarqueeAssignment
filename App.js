import React, { useState } from 'react';

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform login logic here, such as calling an API to validate credentials and generate token

    // Simulating a successful login by setting a dummy token
    const token = 'your_generated_token';

    // Call handleLogin to pass the token to the parent component
    handleLogin(token);
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="input-field"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

const SubTask = ({ subTask, index, handleDeleteSubTask, handleToggleSubTask }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={subTask.completed}
        onChange={() => handleToggleSubTask(index)}
      />
      <span className={subTask.completed ? 'completed' : ''}>{subTask.title}</span>
      <button onClick={() => handleDeleteSubTask(index)}>Delete</button>
    </li>
  );
};

const Task = ({ task, index, handleDeleteTask, handleAddSubTask, handleDeleteSubTask, handleToggleTask }) => {
  const [subTask, setSubTask] = useState('');
  const [subTasks, setSubTasks] = useState([]);

  const handleSubTaskChange = (e) => {
    setSubTask(e.target.value);
  };

  const handleAddSubTaskClick = () => {
    if (subTask.trim() !== '') {
      setSubTasks([...subTasks, { title: subTask, completed: false }]);
      setSubTask('');
    }
  };

  const handleToggleSubTask = (subTaskIndex) => {
    const updatedSubTasks = [...subTasks];
    updatedSubTasks[subTaskIndex].completed = !updatedSubTasks[subTaskIndex].completed;
    setSubTasks(updatedSubTasks);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => handleToggleTask(index)}
      />
      <span className={task.completed ? 'completed' : ''}>{task.title}</span>
      <button onClick={() => handleDeleteTask(index)}>Delete</button>
      <input
        type="text"
        value={subTask}
        onChange={handleSubTaskChange}
        placeholder="Enter a subtask"
      />
      <button onClick={handleAddSubTaskClick}>Add Subtask</button>
      {subTasks.length > 0 && (
        <ul>
          {subTasks.map((subTask, index) => (
            <SubTask
              key={index}
              subTask={subTask}
              index={index}
              handleDeleteSubTask={handleDeleteSubTask}
              handleToggleSubTask={handleToggleSubTask}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const TodoList = ({ token, handleLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTaskClick = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { title: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleDeleteSubTask = (taskIndex, subTaskIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].subTasks.splice(subTaskIndex, 1);
    setTasks(updatedTasks);
  };

  const handleToggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2>Welcome!</h2>
      <h3>Todo List</h3>
      <input
        type="text"
        value={newTask}
        onChange={handleNewTaskChange}
        placeholder="Enter a new task"
      />
      <button onClick={handleAddTaskClick}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            index={index}
            handleDeleteTask={handleDeleteTask}
            
            handleDeleteSubTask={handleDeleteSubTask}
            handleToggleTask={handleToggleTask}
          />
        ))}
      </ul>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState('');

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleLogout = () => {
    setToken('');
  };

  return (
    <div>
      {!token ? (
        <LoginPage handleLogin={handleLogin} />
      ) : (
        <TodoList token={token} handleLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
