import './App.css';
import { ScreensProvider } from './screens/ScreensContext';
import SummernoteEditor from './screens/Summernote';
import SummernoteEditorv2 from './screens/Summernotev2';

function App() {
  return (
    <ScreensProvider>
      <div className="App">
        <SummernoteEditorv2 />
      </div>
    </ScreensProvider>
  );
}

export default App;