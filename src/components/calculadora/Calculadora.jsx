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
  const [n1, setN1] = useState('')
  const [op, setOp] = useState('')
  const operacion = ['+', '-', 'x', '÷', '%']

  const operate = () => {
    let resultado = ''
    switch (op) {
      case '+':
        resultado = +n1 + +typed
        break
      case '-':
        resultado = +n1 - +typed
        break
      case 'x':
        resultado = +n1 * +typed
        break
      case '÷':
        if (+typed !== 0) resultado = +n1 / +typed
        else resultado = -1
        break
      case '%':
        if (+typed !== 0) resultado = +n1 % +typed
        else resultado = -1
        break
      default:
        break
    }
    if (resultado.toString().includes('.')) resultado = parseFloat(resultado).toFixed(2)
    if (resultado >= 0 && resultado.toString().length <= 9) {
      setHistory(resultado)
      setTyped('')
      setN1(resultado)
    } else {
      setHistory('')
      setN1('')
      setTyped('ERROR')
    }
  }

  const handleClick = (symbol) => {
    if (symbol === 'C') {
      setHistory('')
      setTyped('')
      setN1('')
      setOp('')
    } else if (symbol === '=') {
      if (n1 !== '' && op !== '') {
        operate()
        setN1('')
        setOp('')
      } else setTyped('')
    } else if (typed === 'ERROR') {
      setTyped(symbol)
    } else if (operacion.indexOf(symbol) === -1) {
      if (typed.length < 9) {
        setTyped(`${typed}${symbol}`)
      }
    } else if (operacion.indexOf(symbol) !== -1 && op === '') {
      setHistory(`${typed} ${symbol}`)
      setOp(symbol)
      setTyped('')
      setN1(typed)
    } else if (operacion.indexOf(symbol) !== -1 && op !== '') {
      setHistory(`${typed} ${symbol}`)
      operate()
      setOp(symbol)
    }
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
