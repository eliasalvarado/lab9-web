import React, { useState } from 'react'
import Button from '../button/Button'
import styles from './Calculadora.module.css'

function Calculadora() {
  const buttons = [
    'c', 'm', 'd', '7', '8', '9', 'x', '4', '5', '6', 's', '1', '2', '3', 'a', '0', 'p', 'e',
  ]

  const buttonsSim = {
    c: 'C',
    d: '÷',
    7: '7',
    8: '8',
    9: '9',
    x: 'x',
    4: '4',
    5: '5',
    6: '6',
    s: '-',
    1: '1',
    2: '2',
    3: '3',
    a: '+',
    m: '%',
    0: '0',
    p: '.',
    e: '=',
  }

  const [typed, setTyped] = useState('')
  const [history, setHistory] = useState('')
  const operacion = ['+', '-', 'x', '÷', '%']

  const operate = (operation) => {
    const op = operation.split(' ')
    let resultado = ''
    switch (op[1]) {
      case '+':
        resultado = +op[0] + +op[2]
        break
      case '-':
        resultado = +op[0] - +op[2]
        break
      case 'x':
        resultado = +op[0] * +op[2]
        break
      case '÷':
        if (+op[2] !== 0) resultado = +op[0] / +op[2]
        else resultado = -1
        break
      case '%':
        if (+op[2] !== 0) resultado = +op[0] % +op[2]
        else resultado = -1
        break
      default:
        break
    }
    if (resultado.toString().includes('.')) resultado = parseFloat(resultado).toFixed(2)
    if (resultado >= 0 && resultado.toString().length <= 9) {
      setHistory(`${typed} =`)
      setTyped(resultado)
    } else {
      setHistory('')
      setTyped('ERROR')
    }
  }

  const handleClick = (simbol) => {
    if (simbol === 'C') {
      setTyped('')
      setHistory('')
    } else if (typed === 'ERROR') {
      setTyped(simbol)
    } else if (simbol === '=') {
      operate(typed)
    } else if (+typed >= 0 && history !== '' && operacion.indexOf(simbol) === -1) {
      setTyped(simbol)
    } else if (typed.length === 9) {
      setTyped(typed)
    } else if (operacion.indexOf(simbol) !== -1) {
      setTyped(`${typed} ${simbol} `)
    } else setTyped(typed + simbol)
  }

  return (
    <div className={`${styles.mainContainer}`}>
      <div className={`${styles.screen}`}>
        <div className={`${styles.history}`}>
          <span>{history}</span>
        </div>
        <div className={`${styles.typed}`}>
          <span>{typed}</span>
        </div>
      </div>
      <div className={`${styles.buttonsContainer}`}>
        {buttons.map((button) => (
          <Button text={buttonsSim[button]} item={button} handleClick={handleClick} />
        ))}
      </div>
    </div>
  )
}

export default Calculadora
