import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import { useParams, Link } from 'react-router-dom';
import { postApi, getApi } from '@/api/api';
import TodoItem from '@/components/TodoItem';
import styles from '@/styles/Todo.module.scss';
import Context from '@/store/store';
import TodoSkeleton from '../components/TodoSkeleton';

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
  const [isDel, setIsDel] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const debounce = useCallback((cb, timeout = 300) => {
    let timer;
    console.log('111');
    return () => {
      console.log('222');
      clearTimeout(timer);
      console.log('333');
      timer = setTimeout(() => {
        cb();
      }, timeout);
    };
  }, []);
  const postTodo = useCallback(async () => {
    try {
      const res = await postApi(title, todoId + `${cnt.current}`);
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
    console.log(isSubmit);
    if (isSubmit) {
      processChange();
    }
  }, [isSubmit]);

  const getTodo = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getApi();
      const dayTodos = res.filter((dayTodo) => {
        if (dayTodo.order.toString().includes(`${todoId}`)) {
          return dayTodo;
        }
      });
      setTodoList(dayTodos);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setIsDel(false);
      setIsSubmit(false);
    }
  }, []);
  useEffect(() => {
    getTodo();
  }, [isDel]);

  const { value } = useContext(Context);
  const body = document.body;
  useEffect(() => {
    body.style.backgroundColor = value
      ? 'rgba(0, 0, 0, 0.96)'
      : 'rgba(255, 253, 244, 0.96)';
  }, [value]);
  return (
    <div className={`container ${styles.container}`}>
      <Link to="/" className="home-btn">
        home
      </Link>
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
          className={styles.a}
          autoFocus
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button id="search" className="btn" />
      </form>
      <ul>
        {todoList.length !== 0 ? (
          todoList.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                id={todo.id}
                todo={todo.title}
                order={todo.order}
                done={todo.done}
                created={new Date(todo.createdAt)}
                updated={new Date(todo.updatedAt)}
                del={setIsDel}
              />
            );
          })
        ) : (
          <div>
            <h6 className={value ? 'dark-mode--text' : ''}>
              Plan your <span>day</span>, plan your <span>tasks</span>, plan
              your <span>success</span>.
            </h6>
          </div>
        )}
        {isLoading ? <TodoSkeleton /> : ''}
      </ul>
    </div>
  );
}
