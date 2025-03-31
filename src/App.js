import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ScreensProvider } from './screens/ScreensContext';
import TemplatesList from './pages/TemplatesList';
import EditTemplate from './pages/EditTemplate';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <ScreensProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<TemplatesList />} />
          <Route path="/template/:id" element={<EditTemplate />} />
          <Route path="*" element={<TemplatesList />} />
        </Routes>
      </div>
    </ScreensProvider>
  );
}

export default App;