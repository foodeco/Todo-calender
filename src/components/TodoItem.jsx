import { useRef, useState } from 'react';
import { deleteApi, putApi } from '@/api/api';
import styles from '@/styles/TodoItem.module.scss';
import { useEffect } from 'react';

export default function TodoItem({ todo, id, order, done, created, updated }) {
  const check = useRef(done);
  const splitCreated = created.toString().split(' ');
  const splitUpdated = updated.toString().split(' ');
  const createdTime = `${splitCreated[1]} ${
    splitCreated[2]
  } (${splitCreated[4].slice(0, 5)})`;
  const [updatedTime, setUpdated] = useState({
    month: splitUpdated[1],
    date: splitUpdated[2],
    time: splitUpdated[4].slice(0, 5).slice(0, 5),
  });
  console.log(created.toString().split(' '));
  const [title, setTitle] = useState(todo);
  const [isDel, setIsDel] = useState(false);
  const [editData, setEditData] = useState({
    title: todo,
    done: done,
    order: order,
  });
  const [toggleEdit, setToggleEdit] = useState(false);
  async function removeTodo() {
    const res = await deleteApi(id);
    setIsDel(true);
    console.log(res);
  }
  async function editTodo() {
    console.log(editData);
    const res = await putApi(id, editData);
    const newTime = new Date(res.updatedAt).toString().split(' ');
    check.current = res.done;
    setUpdated({
      month: newTime[1],
      date: newTime[2],
      time: newTime[4].slice(0, 5),
    });
  }
  useEffect(() => {
    editTodo();
  }, [editData]);

  return (
    <>
      {!isDel ? (
        <div className={styles.todoItem}>
          <input
            id="checkbox"
            type="checkbox"
            value={check.current}
            defaultChecked={check.current}
            onChange={() => {
              check.current = !check.current;
              setEditData({
                ...editData,
                done: check.current,
              });
              //editTodo();
            }}
          />
          <label htmlFor="checkbox"></label>

          <div className={styles.contents}>
            <span className={styles.time}>{createdTime}</span>
            <div className={styles.content}>
              {!toggleEdit ? (
                <>
                  <div className={`${check.current ? styles.check : ''}`}>
                    {title}
                  </div>
                  <span className={styles.time}>
                    edited:{' '}
                    {`${updatedTime.month} ${updatedTime.date} (${updatedTime.time})`}
                  </span>
                </>
              ) : (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setEditData({
                      ...editData,
                      title: e.target.value,
                    });
                  }}
                />
              )}
            </div>
          </div>

          <div className="btn-group">
            <button
              id="edit"
              className="btn"
              onClick={() => {
                // if (toggleEdit) {
                //   editTodo();
                // }
                setToggleEdit(!toggleEdit);
              }}
            />
            {!toggleEdit ? (
              <button id="delete" className="btn" onClick={removeTodo} />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
