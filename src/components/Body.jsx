import { useEffect } from 'react';
import { useState } from 'react';
import styles from './Body.module.scss';
import Date1 from './Date1';

export default function Body({ totalDates }) {
  //const [month, setMonth] = useState();

  return (
    <>
      <div className={styles.container}>
        {totalDates
          ? totalDates.map((date, idx) => <Date1 key={idx} date={date} />)
          : ''}
      </div>
    </>
  );
}
