import { createTheme, ThemeProvider } from '@mui/material';
import { useAtomValue } from 'jotai';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom';

import { fetchUsers, getUser } from './api/users';
import { isLeftToRightAtom } from './contexts';
import ContactManager from './routes/ContactManager';
import MainContent from './routes/ContactManager/MainContent';
import NotFound from './routes/NotFound';

const defaultTheme = createTheme();
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
  const isLeftToRight = useAtomValue(isLeftToRightAtom);

  return (
    <div dir={isLeftToRight ? 'ltr' : 'rtl'}>
      <ThemeProvider theme={defaultTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}
