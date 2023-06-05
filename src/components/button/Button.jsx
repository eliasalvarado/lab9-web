import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.css'

function Button({ text, item, handleClick }) {
  const buttonStyle = {
    c: `${styles.delete}`,
    d: `${styles.action}`,
    7: `${styles.number}`,
    8: `${styles.number}`,
    9: `${styles.number}`,
    x: `${styles.action}`,
    4: `${styles.number}`,
    5: `${styles.number}`,
    6: `${styles.number}`,
    s: `${styles.action}`,
    1: `${styles.number}`,
    2: `${styles.number}`,
    3: `${styles.number}`,
    a: `${styles.action}`,
    m: `${styles.action}`,
    0: `${styles.numberZero}`,
    p: `${styles.action}`,
    e: `${styles.equal}`,
  }

  return (
    <button className={buttonStyle[item]} onClick={() => handleClick(text)} type="button">
      {text}
    </button>
  )
}

export default Button

Button.propTypes = {
  text: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}
