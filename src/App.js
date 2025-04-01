import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ScreensProvider } from './screens/ScreensContext';
import TemplatesList from './pages/TemplatesList';
import EditTemplate from './pages/EditTemplate';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

function App() {
  return (
    <ScreensProvider>
      <HeaderComponent />
      <div className="App">
        <Routes>
          <Route path="/" element={<TemplatesList />} />
          <Route path="/template/:id" element={<EditTemplate />} />
          <Route path="*" element={<TemplatesList />} />
        </Routes>
      </div>
      <FooterComponent />
    </ScreensProvider>
  );
}

export default App;