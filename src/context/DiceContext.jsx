import { createContext, useState } from "react";

const DiceContext = createContext();

export const DiceProvider = ({ children }) => {

  const [ diceValues, setDiceValues ] = useState([]);
  const [ dice, setDice ] = useState({

  });
  const [ gameColumns, setGameColumns ] = useState([
    { columnName: 'downColumn', isRandomColumn: false },
    { columnName: 'upColumn', isRandomColumn: false },
    { columnName: 'freeColumn', isRandomColumn: true },
    { columnName: 'announcementColumn', isRandomColumn: true },
  ]);
  const [ gameTotals, setGameTotals ] = useState({
    numbersTotal: 0,
    differencsTotal: 0,
    setsTotals: 0,
    totalsTotal: 0
  });

  return <DiceContext.Provider value={{
      diceValues,
      dice,
      gameTotals,
      gameColumns
    }}>
    {children}
  </DiceContext.Provider>
}

export default DiceContext;