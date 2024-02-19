import './App.css';
import ToDoList from './components/ToDoList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div id="main">
            <ToastContainer />
            <ToDoList />
        </div>
    )
}

export default App;
