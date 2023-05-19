import styles from './Skeleton.module.scss';
export default function TodoSkeleton() {
  return (
    <div className={styles.con}>
      <div className={styles.wrapper}></div>
    </div>
  );
}
