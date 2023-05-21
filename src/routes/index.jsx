import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from './HomeLayout';
import Todo from './Todo';
import Calendar from './Calendar';
export default createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Calendar />,
      },
    ],
  },
  {
    path: '/todo/:todoId',
    element: <Todo />,
  },
]);
