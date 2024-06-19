import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom';

import { fetchUsers, getUser } from './api/users';
import ContactManager from './routes/ContactManager';
import MainContent from './routes/ContactManager/MainContent';
import NotFound from './routes/NotFound';

const router = createBrowserRouter([
  {
    path: '/contact-manager',
    element: <ContactManager />,
    loader: () => {
      fetchUsers();
      return true;
    },
    children: [
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
