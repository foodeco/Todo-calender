import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { postApi, getApi, deleteApi } from '../api/api';
import TodoItem from '@/components/TodoItem';

export default function Todo() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const { todoId } = useParams();

  const [done, setDone] = useState(false);

  async function postTodo(e) {
    e.preventDefault();
    const res = await postApi(todo, todoId + '-1');
    console.log(res);
  }

  //getTodo();
  useEffect(() => {
    (async () => {
      const res = await getApi();
      console.log(res);
      setTodoList(res);
    })();
  }, []);
  console.log(todoId);
  //console.log(todoList);
  return (
    <div className="container">
      <form onSubmit={postTodo}>
        <input
          type="text"
          onChange={(e) => {
            setTodo(e.target.value);
            console.log(todo);
          }}
          value={todo}
        />
        <button>submit</button>
      </form>
      <ul>
        {todoList
          ? todoList.map((todo) => (
              <TodoItem
                key={todo.title}
                id={todo.id}
                todo={todo.title}
                created={todo.createdAt}
                updated={todo.updatedAt}
                done={setDone}
              />
            ))
          : ''}
      </ul>
    </div>
  );
}
const initState = {
  id: '',
  todo: {},
};
function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_TODO':
  }
}
