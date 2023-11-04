import './App.css';
import RoutePage from './pages/routes';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={1000}/>
      <RoutePage/>
    </div>
  );
}

export default App;
