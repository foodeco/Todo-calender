import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import { useParams, Link } from 'react-router-dom';
import { postApi, getApi, reorderApi } from '@/api/api';
import TodoItem from '@/components/TodoItem';
import styles from '@/styles/Todo.module.scss';
import Context from '@/store/store';
import TodoSkeleton from '@/components/TodoSkeleton';
import { ReactSortable } from 'react-sortablejs';

export default function Todo() {
  const [title, setTitle] = useState('');
  const [todoList, setTodoList] = useState([]);
  const { todoId } = useParams();
  const today = useMemo(() => {
    const id = todoId.split('').slice(2);
    id.splice(2, 0, '/');
    return id;
  }, []);
  const cnt = useRef(0);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [sort, setSort] = useState(false);
  const { value } = useContext(Context);
  const body = document.body;
  useEffect(() => {
    body.style.backgroundColor = value
      ? 'rgba(0, 0, 0, 0.96)'
      : 'rgba(255, 253, 244, 0.96)';
  }, [value]);

  const debounce = useCallback((cb, timeout = 300) => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        cb();
      }, timeout);
    };
  }, []);
  const postTodo = useCallback(async () => {
    try {
      if (!title.trim()) {
        alert('Enter your plan!');
        return;
      }
      const res = await postApi(`[${todoId}]` + title);
      cnt.current++;
      console.log(res);
      await getTodo();
      setTitle('');
    } catch (err) {
      console.log(err);
    }
  }, [isSubmit]);
  const printValue = useCallback(debounce(postTodo), [isSubmit]);
  const processChange = useCallback(printValue, [isSubmit]);
  useEffect(() => {
    if (isSubmit) {
      processChange();
    }
  }, [isSubmit]);

  const getTodo = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getApi();
      const dayTodos = res.filter((dayTodo) => {
        if (dayTodo.title.includes(`${todoId}`)) {
          return dayTodo;
        }
      });
      setTodoList(dayTodos);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setRefresh(false);
      setIsSubmit(false);
    }
  }, []);
  const reorderTodo = useCallback(async () => {
    const todoIds = todoList.map((todo) => todo.id);
    await reorderApi(todoIds);
    setSort(false);
  }, [todoList]);
  useEffect(() => {
    getTodo();
  }, []);
  useEffect(() => {
    if (refresh) {
      getTodo();
    }
  }, [refresh]);
  useEffect(() => {
    if (sort) {
      reorderTodo();
    }
  }, [todoList, sort]);

  return (
    <div className={`container ${styles.container}`}>
      <Link to="/" className="btn" id="home"></Link>
      <h2 className={value ? 'dark-mode--text' : ''}>{today.join('')}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmit(true);
        }}
        style={{ position: 'relative' }}
      >
        <input
          type="text"
          value={title}
          className={styles.title}
          autoFocus
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button id="search" className="btn" />
      </form>
      <ul>
        {isLoading ? (
          <div className={styles.loading}>
            <TodoSkeleton />
          </div>
        ) : (
          ''
        )}

        {todoList.length !== 0 ? (
          <ReactSortable
            list={todoList}
            setList={setTodoList}
            animation="200"
            easing="ease-out"
            onEnd={() => {
              setSort(true);
            }}
          >
            {todoList.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  todo={todo.title}
                  done={todo.done}
                  today={todoId}
                  created={new Date(todo.createdAt)}
                  updated={new Date(todo.updatedAt)}
                  refresh={setRefresh}
                />
              );
            })}
          </ReactSortable>
        ) : (
          <div>
            <h6 className={value ? 'dark-mode--text' : ''}>
              Plan your <span>day</span>, plan your <span>tasks</span>, plan
              your <span>success</span>.
            </h6>
          </div>
        )}
      </ul>
    </div>
  );
}
