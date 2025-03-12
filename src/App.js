import './App.css';
import $ from 'jquery'; // Asegúrate de que esto esté primero
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Bootstrap después de jQuery
import 'summernote/dist/summernote-bs4.css';
import 'summernote/dist/summernote-bs4.min.js';
import 'summernote/dist/lang/summernote-es-ES';
import 'summernote/dist/lang/summernote-en-US';
import SummernoteEditor from './screens/screens/Summernote';

window.$ = window.jQuery = $;

function App() {
  return (
    <div className="App">
      <SummernoteEditor />
    </div>
  );
}

export default App;