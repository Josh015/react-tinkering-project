import './index.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom';

import ContactManager, { contactManagerLoader } from './routes/ContactManager';
import NotFound from './routes/NotFound';
import { Box } from '@mui/material';
import MainContent, {
  mainContentLoader
} from './routes/ContactManager/MainContent';

const router = createBrowserRouter([
  {
    path: '/contact-manager',
    element: <ContactManager />,
    loader: contactManagerLoader,
    children: [
      { index: true, element: <Box /> },
      { path: ':id', element: <MainContent />, loader: mainContentLoader }
    ]
  },
  {
    path: '/',
    element: <Navigate to="/contact-manager" replace />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    router.dispose();
  });
}

export default function App() {
  return <RouterProvider router={router} />;
}
