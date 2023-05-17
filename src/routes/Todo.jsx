import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { postApi, getApi } from '../api/api';
import TodoItem from '@/components/TodoItem';
import styles from '@/styles/Todo.module.scss';
import { useCallback } from 'react';

export default function Todo() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const { todoId } = useParams();
  const today = todoId.split('').slice(2);
  today.splice(2, 0, '/');
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
    (async () => {
      await getTodo();
    })();
  }, []);
  //console.log(todoId);
  return (
    <div className={`container ${styles.container}`}>
      <h2>{today.join('')}</h2>
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
