import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import { deleteApi, putApi } from '@/api/api';
import styles from '@/styles/TodoItem.module.scss';
import Context from '@/store/store';

export default function TodoItem({
  todo,
  id,
  order,
  done,
  created,
  updated,
  refresh,
}) {
  const check = useRef(done);
  const splitCreated = created.toString().split(' ');
  const splitUpdated = useMemo(() => {
    return updated.toString().split(' ');
  }, [updated]);
  const createdTime = `${splitCreated[1]} ${
    splitCreated[2]
  } (${splitCreated[4].slice(0, 5)})`;
  const [updatedTime, setUpdated] = useState({
    month: splitUpdated[1],
    date: splitUpdated[2],
    time: splitUpdated[4].slice(0, 5).slice(0, 5),
  });
  const [title, setTitle] = useState(todo);
  const [isDel, setIsDel] = useState(false);
  const [editData, setEditData] = useState({
    title: todo,
    done: done,
    order: order,
  });
  const [toggleEdit, setToggleEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const removeTodo = useCallback(async () => {
    try {
      const res = await deleteApi(id);
      setIsDel(res);
      refresh(res);
    } catch (err) {
      console.log(err);
    }
  }, [isDel]);
  const editTodo = useCallback(async () => {
    try {
      const res = await putApi(id, editData);
      const newTime = new Date(res.updatedAt).toString().split(' ');
      check.current = res.done;
      setUpdated({
        month: newTime[1],
        date: newTime[2],
        time: newTime[4].slice(0, 5),
      });
    } catch (err) {
      console.log(err);
    }
  }, [editData]);
  const editBtn = useCallback(() => {
    if (!isEdit && toggleEdit) {
      setIsEdit(true);
      setEditData({
        ...editData,
        title: title,
      });
    }
    setToggleEdit(!toggleEdit);
  }, [toggleEdit, title]);

  useEffect(() => {
    if (isEdit) {
      editTodo();
      setIsEdit(false);
    }
  }, [editData, isEdit]);

  const { value } = useContext(Context);
  return (
    <>
      {!isDel ? (
        <div
          className={`${styles.todoItem} ${value ? '.dark-mode--border' : ''}`}
        >
          <input
            id={order}
            type="checkbox"
            value={check.current}
            defaultChecked={check.current}
            onChange={() => {
              check.current = !check.current;
              setEditData({
                ...editData,
                done: check.current,
              });
              setIsEdit(true);
              refresh(check.current);
            }}
          />
          <label htmlFor={order}></label>

          <div className={styles.contents}>
            <span
              className={`${styles.time} ${value ? 'dark-mode--text' : ''}`}
            >
              {createdTime}
            </span>
            <div
              className={`${styles.content} ${value ? 'dark-mode--text' : ''}`}
            >
              {!toggleEdit ? (
                <>
                  <div
                    className={`${check.current ? styles.check : ''} ${
                      value ? 'dark-mode--text' : ''
                    }`}
                  >
                    {title}
                  </div>
                  <span className={styles.time}>
                    edited:{' '}
                    {`${updatedTime.month} ${updatedTime.date} (${updatedTime.time})`}
                  </span>
                </>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setEditData({
                      ...editData,
                      title: title,
                    });
                    setToggleEdit(!toggleEdit);
                    setIsEdit(true);
                  }}
                  style={{ width: 100 + '%' }}
                >
                  <input
                    type="text"
                    value={title}
                    autoFocus
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </form>
              )}
            </div>
          </div>

          <div className="btn-group">
            <button id="edit" className="btn" onClick={editBtn} />
            {!toggleEdit ? (
              <button id="delete" className="btn" onClick={removeTodo} />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
