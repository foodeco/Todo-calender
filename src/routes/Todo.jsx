import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postApi, getApi } from '@/api/api';
import TodoItem from '@/components/TodoItem';
import styles from '@/styles/Todo.module.scss';
import { useContext } from 'react';
import Context from '../store/store';

export default function Todo() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const { todoId } = useParams();
  const today = useMemo(() => {
    const id = todoId.split('').slice(2);
    id.splice(2, 0, '/');
    return id;
  }, []);
  const cnt = useRef(0);

  const printValue = useCallback(debounce(postTodo));
  function debounce(cb, timeout = 300) {
    let timer;
    console.log('111');
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log(this);
        cb();
      }, timeout);
    };
  }
  const processChange = (e) => {
    e.preventDefault();
    printValue();
  };
  async function postTodo() {
    const res = await postApi(todo, todoId + `${cnt.current}`);
    cnt.current++;
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
    getTodo();
  }, []);

  const { value } = useContext(Context);
  return (
    <div className={`container ${styles.container}`}>
      <Link to="/">home</Link>
      <h2 className={value ? 'dark-mode--text' : ''}>{today.join('')}</h2>
      <form onSubmit={processChange} style={{ position: 'relative' }}>
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
          ? todoList.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  todo={todo.title}
                  order={todo.order}
                  done={todo.done}
                  created={new Date(todo.createdAt)}
                  updated={new Date(todo.updatedAt)}
                />
              );
            })
          : 'isLoading...'}
      </ul>
    </div>
  );
}
