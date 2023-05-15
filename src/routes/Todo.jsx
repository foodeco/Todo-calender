import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { postApi, getApi } from '../api/api';
import TodoItem from '@/components/TodoItem';
import styles from '@/styles/Todo.module.scss';

export default function Todo() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const { todoId } = useParams();

  async function postTodo(e) {
    e.preventDefault();
    const res = await postApi(todo, todoId + `${todoList.length}`);
    console.log(res);
    await getTodo();
    setTodo('');
  }
  async function getTodo() {
    const res = await getApi();
    const dayTodos = res.filter((dayTodo) => {
      if (dayTodo.order.toString().includes(`${todoId}`)) {
        return dayTodo;
      }
    });
    setTodoList(dayTodos);
  }
  useEffect(() => {
    (async () => {
      await getTodo();
    })();
  }, []);
  console.log(todoId);

  return (
    <div className={`container ${styles.container}`}>
      <form onSubmit={postTodo} style={{ position: 'relative' }}>
        <input
          type="text"
          value={todo}
          className={styles.a}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button id="search" className="btn" />
      </form>
      <ul>
        {todoList
          ? todoList.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                todo={todo.title}
                order={todo.order}
                done={todo.done}
                created={new Date(todo.createdAt)}
                updated={new Date(todo.updatedAt)}
              />
            ))
          : null}
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
