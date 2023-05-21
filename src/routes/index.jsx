import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from './HomeLayout';
import Todo from './Todo';
import Calender from './Calender';
export default createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Calender />,
      },
    ],
  },
  {
    path: '/todo/:todoId',
    element: <Todo />,
  },
]);
