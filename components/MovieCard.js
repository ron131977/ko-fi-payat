// components/MovieCard.js
import Link from 'next/link'; // Import Link from Next.js
import styles from '../styles/MovieCard.module.css'; // CSS for the MovieCard component

const MovieCard = ({ movie }) => {
  return (
    <div className={styles.card}>
      <Link href={`/movies/${movie.id}`} passHref>
        <img src={movie.poster} alt={movie.title} className={styles.poster} />
      </Link>
      <h2 className={styles.title}>{movie.title}</h2>
    </div>
  );
};

export default MovieCard;
