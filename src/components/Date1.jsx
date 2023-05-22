import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '@/store/store';

// 해당 날짜 투두 개수 출력
export default function Date1({ year, month, thisMonth, date, todos }) {
  const TODAY = new Date().getDate();
  year = year - 2000;
  month = month < 10 ? '0' + month : month;
  date = date < 10 ? '0' + date : date;
  const id = year + '' + month + '' + date;
  const preview = Array.isArray(todos)
    ? todos.filter((todo) => todo.title.includes(id))
    : null;
  const { value } = useContext(Context);
  const doneCheck = preview ? preview.filter((pre) => pre.done) : '';
  return (
    <Link
      to={`/todo/${id}`}
      className={`date-link ${
        thisMonth === +month ? '' : `${value ? 'dark-mode--gray' : 'gray'}`
      } ${
        new Date().getMonth() + 1 === +month
          ? TODAY === date
            ? 'today'
            : ''
          : ''
      } ${value ? 'dark-mode--bc' : ''}`}
    >
      <div className="date-header">
        <div className="date">{date}</div>
        {preview.length ? (
          <progress
            id="progress"
            value={doneCheck.length}
            max={preview.length}
          />
        ) : null}
      </div>
      {preview
        ? preview.map((v) => (
            <div
              key={v.id}
              className={`preview ${v.done ? 'done' : ''} ${
                value ? 'dark' : ''
              }`}
            >
              {v.title.replace(`[${id}]`, '')}
            </div>
          ))
        : 'test'}
    </Link>
  );
}
