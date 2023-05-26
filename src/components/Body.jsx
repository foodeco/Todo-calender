import styles from './Body.module.scss';
import Date1 from './Date1';
import { getApi } from '@/api/api';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

Body.propTypes = {
  totalDates: PropTypes.array,
  year: PropTypes.number,
  month: PropTypes.number,
};

export default function Body({ totalDates, year, month }) {
  const firstDate = totalDates.indexOf(1);
  const lastDate = totalDates.indexOf(1, 8);
  const [todo, setTodo] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getApi(); // array
      setTodo(res);
    })();
  }, []);
  return (
    <>
      <div className={styles.container}>
        {totalDates.length
          ? totalDates.map((date, idx) => {
              if (idx < firstDate) {
                return (
                  <Date1
                    key={idx}
                    year={year}
                    month={month - 1}
                    thisMonth={month}
                    date={date}
                    todos={todo}
                  />
                );
              } else if (lastDate > 0 && idx >= lastDate) {
                return (
                  <Date1
                    key={idx}
                    year={year}
                    month={month + 1}
                    thisMonth={month}
                    date={date}
                    todos={todo}
                  />
                );
              }
              return (
                <Date1
                  key={idx}
                  year={year}
                  month={month}
                  thisMonth={month}
                  date={date}
                  todos={todo}
                />
              );
            })
          : ''}
      </div>
    </>
  );
}
