import { Link } from 'react-router-dom';

// 해당 날짜 투두 개수 출력
export default function Date1({ year, month, date }) {
  const MONTH = new Date().getMonth() + 1;
  const TODAY = new Date().getDate();
  year = year - 2000;
  month = month < 10 ? '0' + month : month;
  const id = year + '' + month + '' + date;

  return (
    <Link
      to={`/todo/${id}`}
      className={`date-link ${MONTH === +month ? '' : 'gray'} ${
        TODAY === date ? 'today' : ''
      }`}
    >
      {<div className="date">{date}</div>}
      <div></div>
    </Link>
  );
}
