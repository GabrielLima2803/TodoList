import './App.css';
import TodoList from './components/TodoList'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <TodoList />
      <Footer/>
    </div>
  );
}

export default App;