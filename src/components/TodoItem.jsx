import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { deleteApi, putApi } from '@/api/api';
import styles from '@/styles/TodoItem.module.scss';
import PropTypes from 'prop-types';

TodoItem.propTypes = {
  todo: PropTypes.string,
  id: PropTypes.string,
  done: PropTypes.bool,
  today: PropTypes.string,
  created: PropTypes.object,
  updated: PropTypes.object,
  refresh: PropTypes.func,
};

export default function TodoItem({
  todo,
  id,
  done,
  today,
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
  const trimTodo = todo.replace(`[${today}]`, '');
  const [title, setTitle] = useState(trimTodo);
  const [isDel, setIsDel] = useState(false);
  const [editData, setEditData] = useState({
    title: trimTodo,
    done: done,
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
      const res = await putApi(id, {
        ...editData,
        title: `[${today}]` + editData.title,
      });
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
  return (
    <>
      {!isDel ? (
        <div className={styles.todoItem}>
          <input
            id={id}
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
          <label htmlFor={id}></label>

          <div className={styles.contents}>
            <span className={styles.time}>{createdTime}</span>
            <div className={styles.content}>
              {!toggleEdit ? (
                <>
                  <div className={check.current ? styles.check : ''}>
                    {title}
                  </div>
                  <span className={styles.time}>
                    edited:
                    {` ${updatedTime.month} ${updatedTime.date} (${updatedTime.time})`}
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
