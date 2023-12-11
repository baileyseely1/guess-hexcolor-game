import { useState, useEffect } from 'react'
import './App.css'

const digits = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H'
]

const shuffleArray = array => {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const getRandomHexColor = arr => {
  let randomColor = ''
  for (let i = 0; i < 6; i++) {
    randomColor += arr[Math.floor(Math.random() * arr.length)]
  }

  const isValidHexColor = /^#[0-9A-Fa-f]{6}$/g.test(`#${randomColor}`)

  if (isValidHexColor) {
    return `#${randomColor}`
  } else {
    return getRandomHexColor(arr)
  }
}

function App () {
  const [color, setColor] = useState('')
  const [answers, setAnswers] = useState([])
  const [restart, setRestart] = useState(false)
  const [wrongAnswerIndex, setWrongAnswerIndex] = useState(null)
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null)

  useEffect(() => {
    setColor(getRandomHexColor(digits))
    setCorrectAnswerIndex(null)
    setWrongAnswerIndex(null)
  }, [restart])

  useEffect(() => {
    setAnswers(
      shuffleArray([
        color,
        getRandomHexColor(digits),
        getRandomHexColor(digits)
      ])
    )
  }, [color])

  const checkAnswer = (e, index) => {
    if (e.target.textContent === color) {
      setCorrectAnswerIndex(index)
      setWrongAnswerIndex(null)
      setTimeout(() => {
        setRestart(prevRestart => !prevRestart)
        setColor(prevColor => getRandomHexColor(digits))
        setCorrectAnswerIndex(null)
      }, 2000)
    } else {
      setWrongAnswerIndex(index)
    }
  }

  const getGuessButtons = () => {
    return answers.map((answer, index) => (
      <div key={answer}>
        <button
          onClick={e => checkAnswer(e, index)}
          disabled={correctAnswerIndex !== null}
        >
          {answer}
        </button>
        {wrongAnswerIndex === index && <h2>Wrong Answer!</h2>}
        {correctAnswerIndex === index && <h2>correct!</h2>}
      </div>
    ))
  }

  return (
    <>
      <h1 style={{ fontSize: '2.2rem' }}>try to guess the hex color</h1>
      <div className='guess' style={{ backgroundColor: `${color}` }}></div>
      <div style={{ display: 'flex' }}>{getGuessButtons()}</div>
    </>
  )
}

export default App
