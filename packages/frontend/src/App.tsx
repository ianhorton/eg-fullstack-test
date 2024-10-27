import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './navigation/app-routes';

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
