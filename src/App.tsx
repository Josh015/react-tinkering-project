import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom';

import ContactManager from './routes/ContactManager';
import NotFound from './routes/NotFound';
import { Box } from '@mui/material';
import MainContent from './routes/ContactManager/MainContent';
import { fetchUsers, getUser } from './api/users';

const router = createBrowserRouter([
  {
    path: '/contact-manager',
    element: <ContactManager />,
    loader: () => fetchUsers(),
    children: [
      { index: true, element: <Box /> },
      {
        path: ':id',
        element: <MainContent />,
        loader: ({ params: { id } }) => getUser(+(id ?? 0))
      }
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
