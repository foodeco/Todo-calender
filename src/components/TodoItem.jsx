import { useRef, useState } from 'react';
import { deleteApi, putApi } from '@/api/api';
import styles from '@/styles/TodoItem.module.scss';

export default function TodoItem({ todo, id, order, done, created, updated }) {
  const check = useRef(done);
  const today = {
    month: created.getMonth() + 1,
    date: created.getDate(),
  };
  const createdTime = created.toString().split(' ')[4].slice(0, 5);
  const [updatedTime, setUpdated] = useState(
    updated.toString().split(' ')[4].slice(0, 5)
  ).slice(0, 5);
  const [title, setTitle] = useState(todo);
  const [isDel, setIsDel] = useState(false);
  const [editData, setEditData] = useState({
    title: todo,
    done: false,
    order: order,
  });
  const [toggleEdit, setToggleEdit] = useState(false);
  async function removeTodo() {
    const res = await deleteApi(id);
    setIsDel(true);
    console.log(res);
  }
  async function editTodo() {
    const res = await putApi(id, editData);
    const newTime = new Date(res.updatedAt)
      .toString()
      .split(' ')[4]
      .slice(0, 5);
    check.current = res.done;
    setUpdated(newTime);
  }

  return (
    <>
      <h2>({`${today.month}.${today.date}`}) Today's tasks</h2>
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
              editTodo();
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
                  <span className={styles.time}>edited: {updatedTime}</span>
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
                if (toggleEdit) {
                  editTodo();
                }
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
