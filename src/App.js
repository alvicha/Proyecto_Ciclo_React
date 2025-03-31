import './App.css';
import { ScreensProvider } from './screens/ScreensContext';
import SummernoteEditor from './screens/Summernote';
import TemplatesList from './screens/TemplatesList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <ScreensProvider>
      <div className="App">
        <TemplatesList />
      </div>
    </ScreensProvider>
  );
}

export default App;