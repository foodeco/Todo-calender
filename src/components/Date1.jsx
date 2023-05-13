import { Link } from 'react-router-dom';

// 해당 날짜 투두 개수 출력
export default function Date({ date }) {
  return <div>{<Link to="">{date}</Link>}</div>;
}
