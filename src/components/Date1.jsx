import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

Date1.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  thisMonth: PropTypes.number,
  date: PropTypes.number,
  todos: PropTypes.array,
};

// 해당 날짜 투두 개수 출력
export default function Date1({ year, month, thisMonth, date, todos }) {
  const TODAY = new Date().getDate();
  year = year - 2000;
  month = month < 10 ? '0' + month : month;
  date = date < 10 ? '0' + date : date;
  const id = year + '' + month + '' + date;
  const preview = todos.filter((todo) => todo.title.includes(id));
  const doneCheck = preview.filter((pre) => pre.done);
  return (
    <Link
      to={`/todo/${id}`}
      className={`date-link ${thisMonth === +month ? '' : 'gray'} ${
        new Date().getMonth() + 1 === +month
          ? TODAY === date
            ? 'today'
            : ''
          : ''
      } `}
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
            <div key={v.id} className={`preview ${v.done ? 'done' : ''}`}>
              {v.title.replace(`[${id}]`, '')}
            </div>
          ))
        : 'test'}
    </Link>
  );
}
