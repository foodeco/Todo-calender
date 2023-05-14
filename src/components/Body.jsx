import { useEffect } from 'react';
import { useState } from 'react';
import styles from './Body.module.scss';
import Date1 from './Date1';

export default function Body({ totalDates, year, month }) {
  const firstDate = Array.isArray(totalDates) ? totalDates.indexOf(1) : '';
  const lastDate = Array.isArray(totalDates) ? totalDates.indexOf(1, 7) : '';
  console.log(firstDate, lastDate);
  return (
    <>
      <div className={styles.container}>
        {totalDates
          ? totalDates.map((date, idx) => {
              if (idx < firstDate) {
                return (
                  <Date1
                    key={idx}
                    year={year - 1}
                    month={month - 1}
                    date={date}
                  />
                );
              } else if (idx >= lastDate) {
                return (
                  <Date1
                    key={idx}
                    year={year + 1}
                    month={month + 1}
                    date={date}
                  />
                );
              }
              return <Date1 key={idx} year={year} month={month} date={date} />;
            })
          : ''}
      </div>
    </>
  );
}
