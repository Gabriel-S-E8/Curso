import styles from './roundedimage.module.css'

function RoundedImage({ src, alt, width }) {
  return (
    <img
      className={`${styles.rounded_image} ${styles[width]}`}
      src={src}
      alt={alt}
    />
  )
}

export default RoundedImage