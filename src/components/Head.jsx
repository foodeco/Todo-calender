import styles from './Head.module.scss';
import PropTypes from 'prop-types';

Head.propTypes = {
  setWhatMonth: PropTypes.func,
  year: PropTypes.number,
  month: PropTypes.number,
};

const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export default function Head({ setWhatMonth, year, month }) {
  return (
    <div className={styles.head}>
      <div className={styles.calHeader}>
        <h2>{`${year}.${month}`}</h2>
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
      <div className={styles.days}>
        {dayList.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
    </div>
  );
}
