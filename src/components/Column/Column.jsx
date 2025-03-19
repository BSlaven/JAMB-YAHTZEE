import { useState } from "react"

const Column = ({ column }) => {

  const [ columns, setColumns ] = useState({
    ones: {
      value: 0,
      isAvailable: true,
      name: 'ones',
      next: 'twos'
    },
    twos: {
      value: 0,
      isAvailable: false,
      name: 'twos',
      next: 'threes'
    },
    threes: {
      value: 0,
      isAvailable: false,
      name: 'threes',
      next: 'fours'
    },
    fours: {
      value: 0,
      isAvailable: false,
      name: 'fours',
      next: 'fives'
    },
    fives: {
      value: 0,
      isAvailable: false,
      name: 'fives',
      next: 'sixes'
    },
    sixes: {
      value: 0,
      isAvailable: false,
      name: 'sixes',
      next: 'maximum'
    },
    numbersTotal: {
      value: 0
    },
    maximum: {
      value: 0,
      isAvailable: false,
      name: 'maximum',
      next: 'minimum'
    },
    minimum: {
      value: 0,
      isAvailable: false,
      name: 'minimum',
      next: 'triling'
    },
    differenceTotal: {
      value: 0,
    },
    kenta: {
      value: 0,
      isAvailable: false,
      name: 'kenta',
      next: 'triling'
    },
    triling: {
      value: 0,
      isAvailable: false,
      name: 'triling',
      next: 'ful'
    },
    ful: {
      value: 0,
      isAvailable: false,
      name: 'ful',
      next: 'poker'
    },
    poker: {
      value: 0,
      isAvailable: false,
      name: 'poker',
      next: 'jamb'
    },
    jamb: {
      value: 0,
      isAvailable: false,
      name: 'jamb',
      next: null
    },
    setsTotal: {
      value: 0,
    }
  })
  
  return (
    <section>
      <h4>d</h4>
      <div className="field">1</div>
      <div className="field">2</div>
      <div className="field">3</div>
      <div className="field">4</div>
      <div className="field">5</div>
      <div className="field">6</div>
    </section>
  )
}

export default Column