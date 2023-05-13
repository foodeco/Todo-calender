import styles from './Head.module.scss';
const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export default function Head({ setWhatMonth, month }) {
  return (
    <div className={styles.head}>
      <div className={styles.days}>
        {dayList.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
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
  );
}
