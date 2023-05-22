import { useContext } from 'react';
import Context from '@/store/store';
import styles from './Head.module.scss';
import PropTypes from 'prop-types';

Head.propTypes = {
  setWhatMonth: PropTypes.func,
  year: PropTypes.number,
  month: PropTypes.number,
};

const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export default function Head({ setWhatMonth, year, month }) {
  const { value } = useContext(Context);
  return (
    <div className={styles.head}>
      <div className={styles.calHeader}>
        <h2 className={value ? 'dark-mode--text' : ''}>{`${year}.${month}`}</h2>
        <div className={styles.btnGroup}>
          <button
            id="prev"
            onClick={() => {
              setWhatMonth(month - 1);
            }}
          >
            &lt;
          </button>
          <button
            id="next"
            onClick={() => {
              setWhatMonth(month + 1);
            }}
          >
            &gt;
          </button>
        </div>
      </div>
      <div className={`${styles.days} ${value ? 'dark-mode--text' : ''}`}>
        {dayList.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
    </div>
  );
}
