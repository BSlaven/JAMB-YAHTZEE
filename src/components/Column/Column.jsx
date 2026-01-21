import { useState, useContext, useEffect } from "react";

import { io } from 'socket.io-client';

const socket = io("http://localhost:3000", {
  withCredentials: true
});

import { FaAnglesDown } from "react-icons/fa6";
import { FaAnglesUp } from "react-icons/fa6";
import { LuArrowUpDown } from "react-icons/lu";
import { TbCircleDashedLetterR } from "react-icons/tb";
import { TbCircleDashedLetterN } from "react-icons/tb";
import { TbCircleLetterR } from "react-icons/tb";

import { ColumnContext } from "../../context/DiceContext";
import DiceContext from '../../context/DiceContext';

import classes from './Column.module.css';

const Column = ({ column, isOpponent }) => {

  const { addNewTotal, columnsTotals } = useContext(ColumnContext);
  const { showToast } = useContext(DiceContext);

  const setNextField = (column, currentField, upField, downField) => {
    if(column.isRandomColumn) return;

    let nextField;

    if(column === 'downColumn') nextField = downField;

    if(column === 'upColumn') nextField = upField;
    
    if(column === 'toMiddle') {
      if(currentField === 'maximum' || currentField === 'minimum') return;

      switch(currentField) {
        case 'ones':
        case 'twos':
        case 'threes':
        case 'fours':
        case 'fives':
        case 'sixes':
          nextField = downField
          break;
        case 'kenta':
        case 'triling':
        case 'full':
        case 'poker':
        case 'jamb':
          nextField = upField
          break;
        default:
          nextField = null
      }
    }
    
    if(column === 'fromMiddle') {
      if(currentField === 'ones' || currentField === 'jamb') return;

      switch(currentField) {
        case 'maximum':
        case 'twos':
        case 'threes':
        case 'fours':
        case 'fives':
        case 'sixes':
          nextField = upField
          break;
        case 'kenta':
        case 'triling':
        case 'full':
        case 'poker':
        case 'jamb':
          nextField = upField
          break;
        default:
          nextField = null
      }
    }

    return nextField;
  }

  const setFieldAvailability = (column, field) => {
    if(column === 'downColumn' && field === 'ones') return true;

    if(column === 'upColumn' && field === 'jamb') return true;

    if(column === 'fromMiddle' && (field === 'maximum' || field === 'minimum')) return true;

    if(column === 'toMiddle' && (field === 'ones' || field === 'jamb')) return true;

    return false;
  }

  
  const calculateFieldValue = (field, number) => {
    const dice = [ 2, 4, 6, 6, 2, 1]
    
    switch(field) {
      case 'ones':
      case 'twos':
      case 'threes':
      case 'fours':
      case 'fives':
      case 'sixes':
        const filteredNumber = dice.filter(item => item === number)
        if(!filteredNumber || filteredNumber.length === 0) return 0;
        return filteredNumber.reduce((acc, curr) => acc + curr)
      
      case 'maximum':
        const maxDiceCopy = [...dice];
        maxDiceCopy.sort().shift()
        const max = maxDiceCopy.reduce((acc, curr) => acc + curr);
        return max;
      
      case 'minimum':
        const minDiceCopy = [...dice];
        minDiceCopy.sort().pop()
        const min = minDiceCopy.reduce((acc, curr) => acc + curr);
        return min;

      case 'triling':
      case 'kenta':
      case 'ful':
      case 'poker':
      case 'jamb':
        return calculateSetValue(field);
    }
  }
  
  const calculateSetValue = (field) => {

    const dice = [ 2, 4, 6, 6, 6, 1]
    const valuesObject = {}
    dice.forEach(value => {
      if(!valuesObject[value]) {
        valuesObject[value] = 1;
        return
      }
      valuesObject[value]++;
    })

    const mapArray = Object.entries(valuesObject);

    let multiplesOfTheSame;

    switch(field) {
      case 'triling':
        multiplesOfTheSame = mapArray.filter(item => item[1] >= 3);
        if(!multiplesOfTheSame || multiplesOfTheSame.length === 0) return 0;
        const trilingValue = multiplesOfTheSame .sort((a, b) => Number(b[0]) - Number(a[0]))
        return (parseInt(trilingValue[0][0]) * 3) + 20;

      case 'kenta':
        const uniqueSet = [... new Set(mapArray.map(item => item[0]))];

        if(!uniqueSet || uniqueSet.length < 5) return 0;

        if(uniqueSet.length === 6) return 45;

        const filteredKenta = uniqueSet.filter((item, index) => {
          if(index === 0) return uniqueSet[index + 1] - item === 1;

          if(index === 4) return item - uniqueSet[index - 1];

          return uniqueSet[index + 1] - item === 1 && item - uniqueSet[index - 1] === 1
        })

        if(!filteredKenta || filteredKenta.length < 5) return 0;

        return 35;

      case 'ful':
        const filteredMap = mapArray.filter(item => item[1] >= 2);

        if(filteredMap.length !== 2 || !filteredMap.map(item => item[1]).includes(3)) return 0;

        const fulTotal = filteredMap
          .map(item => parseInt(item[0] * item[1]))
          .reduce((acc, curr) => acc + curr);

        return fulTotal + 30;
        
      case 'poker':
        multiplesOfTheSame = mapArray.filter(item => item[1] >= 4);

        if(!multiplesOfTheSame || multiplesOfTheSame.length === 0) return 0;
  
        const pokerTotal = parseInt(multiplesOfTheSame[0]) * 4 + 40;
        return pokerTotal;
        
      case 'jamb':
        multiplesOfTheSame = mapArray.filter(item => item[1] >= 5);

      if(!multiplesOfTheSame || multiplesOfTheSame.length === 0) return 0;

      const jambTotal = parseInt(multiplesOfTheSame[0]) * 5 + 50;
      return jambTotal;
      default:
        return 0;
    }
  }

  const [ columnFields, setColumnFields ] = useState({
    ones: {
      numberValue: 1,
      isAvailable: column.isRandomColumn || setFieldAvailability(column.columnName, 'ones'),
      name: 'ones',
      fieldDisplay: 1,
      next: setNextField(column.columnName, 'ones', null, 'twos'),
      isChecked: false,
      isPreviousChecked: false,
      totalsField: 'numbersTotals'
    },
    twos: {
      numberValue: 2,
      isAvailable: column.isRandomColumn,
      name: 'twos',
      fieldDisplay: 2,
      next: setNextField(column.columnName, 'twos', 'ones', 'threes'),
      isChecked: false,
      isPreviousChecked: false,
      totalsField: 'numbersTotals'
    },
    threes: {
      numberValue: 3,
      isAvailable: column.isRandomColumn,
      name: 'threes',
      fieldDisplay: 3,
      next: setNextField(column.columnName, 'threes', 'twos', 'fours'),
      isChecked: false,
      isPreviousChecked: false,
      totalsField: 'numbersTotals'
    },
    fours: {
      numberValue: 4,
      isAvailable: column.isRandomColumn,
      name: 'fours',
      fieldDisplay: 4,
      next: setNextField(column.columnName, 'fours', 'threes', 'fives'),
      isChecked: false,
      isPreviousChecked: false,
      totalsField: 'numbersTotals'
    },
    fives: {
      numberValue: 5,
      isAvailable: column.isRandomColumn,
      name: 'fives',
      fieldDisplay: 5,
      next: setNextField(column.columnName, 'fives', 'fours', 'sixes'),
      isChecked: false,
      isPreviousChecked: false,
      totalsField: 'numbersTotals'
    },
    sixes: {
      numberValue: 6,
      isAvailable: column.isRandomColumn,
      name: 'sixes',
      fieldDisplay: 6,
      next: setNextField(column.columnName, 'sixes', 'fives', 'maximum'),
      isChecked: false,
      isPreviousChecked: false,
      totalsField: 'numbersTotals'
    },
    numbersTotals: {
      value: 0,
      fieldDisplay: 'ukupno',
      isChecked: true
    },
    maximum: {
      isAvailable: column.isRandomColumn || setFieldAvailability(column.columnName, 'maximum'),
      name: 'maximum',
      fieldDisplay: 'max',
      next: setNextField(column.columnName, 'maximum', 'sixes', 'minimum'),
      isChecked: false,
      isPreviousChecked: false,
      totalsField: 'differenceTotal'
    },
    minimum: {
      isAvailable: column.isRandomColumn || setFieldAvailability(column.columnName, 'minimum'),
      name: 'minimum',
      fieldDisplay: 'min',
      next: setNextField(column.columnName, 'minimum', 'maximum', 'kenta'),
      isChecked: false,
      isPreviousChecked: false,
      totalsField: 'differenceTotal'
    },
    differenceTotal: {
      value: 0,
      fieldDisplay: 'razlika',
    },
    kenta: {
      isAvailable: column.isRandomColumn,
      name: 'kenta',
      fieldDisplay: 'kenta',
      next: setNextField(column.columnName, 'kenta', 'minimum', 'triling'),
      isChecked: false,
      isPreviousChecked: false,
      totalsField: 'setsTotal'
    },
    triling: {
      isAvailable: column.isRandomColumn,
      name: 'triling',
      fieldDisplay: 'triling',
      next: setNextField(column.columnName, 'triling', 'kenta', 'ful'),
      isChecked: false,
      isPreviousChecked: false,
      totalsField: 'setsTotal'
    },
    ful: {
      isAvailable: column.isRandomColumn,
      name: 'ful',
      fieldDisplay: 'ful',
      next: setNextField(column.columnName, 'ful', 'triling', 'poker'),
      isChecked: false,
      isPreviousChecked: false,
      totalsField: 'setsTotal'
    },
    poker: {
      isAvailable: column.isRandomColumn,
      name: 'poker',
      fieldDisplay: 'poker',
      next: setNextField(column.columnName, 'poker', 'ful', 'jamb'),
      isChecked: false,
      isPreviousChecked: false,
      totalsField: 'setsTotal'
    },
    jamb: {
      isAvailable: column.isRandomColumn || setFieldAvailability(column.columnName, 'jamb'),
      name: 'jamb',
      fieldDisplay: 'jamb',
      next: setNextField(column.columnName, 'jamb', 'poker', null),
      isChecked: false,
      isPreviousChecked: false,
      totalsField: 'setsTotal'
    },
    setsTotal: {
      value: 0,
      fieldDisplay: 'ukupno',
    }
  });

  useEffect(() => {
    sendData();
  }, [columnFields]);

  const calculateTotalsDifference = (fieldName, newFieldValue, fieldObject) => {
    let totalsFieldValue = 0;

    let isDiffPossible = true;
    
    switch(fieldName) {
      case 'ones':
        if(!columnFields.maximum.value || !columnFields.minimum.value) {
          isDiffPossible = false;
        };
        break;
      
      case 'maximum':
        if(!columnFields.ones.value || !columnFields.minimum.value) {
          isDiffPossible = false;
        }
        break;

      case 'minimum':
        if(!columnFields.ones.value || !columnFields.maximum.value) {
          isDiffPossible = false;
        };
        break
    }

    if(isDiffPossible) {
      switch(fieldName) {
        case 'ones':
          totalsFieldValue = (columnFields.maximum.value - columnFields.minimum.value) * newFieldValue;
          break;

        case 'maximum':
          totalsFieldValue = (newFieldValue - columnFields.minimum.value) * columnFields.ones.value;
          break;

        case 'minimum':
          totalsFieldValue = (columnFields.maximum.value - newFieldValue) * columnFields.ones.value;
      }
    }

    if(column.isRandomColumn) {
      setColumnFields(prev => {
        return {
          ...prev,
          differenceTotal: {
            ...prev.differenceTotal,
            value: totalsFieldValue
          },
          [fieldName]: {
            ...fieldObject,
            isChecked: true,
            value: newFieldValue
          }
        }
      })
      addNewTotal(column.columnName, 'differenceTotal', totalsFieldValue);
      return
    }

    setColumnFields(prev => {
      return {
        ...prev,
        differenceTotal: {
          ...prev.differenceTotal,
          value: totalsFieldValue
        },
        [fieldName]: {
          ...fieldObject,
          isChecked: true,
          value: newFieldValue
        }
      }
    })

    const next = columnFields[fieldObject.next]?.name;

    if(next) {
      setColumnFields(prev => {
        return {
          ...prev,
          [next]: {
            ...columnFields[next],
            isPreviousChecked: true,
            isAvailable: true
          }
        }
      })
    }

    addNewTotal(column.columnName, 'differenceTotal', totalsFieldValue);    
  }

  const calculateSetsAndNumbersTotals = (totalsField, newFieldValue, fieldObject) => {
    let newTotalValue = 0;

    const currentTotalsValue = columnFields[totalsField].value;

    newTotalValue = currentTotalsValue + newFieldValue;    

    if(column.isRandomColumn) {
      setColumnFields(prev => {
        return {
          ...prev,
          [totalsField]: {
            ...columnFields[totalsField],
            value: columnFields[totalsField]?.value + newFieldValue
          },
          [fieldObject.name]: {
            ...fieldObject,
            isChecked: true,
            value: newFieldValue
          }
        }
      })
      return;
    }

    setColumnFields(prev => {
      return {
        ...prev,
        [totalsField]: {
          ...columnFields[totalsField],
          value: columnFields[totalsField].value + newFieldValue
        },
        [fieldObject.name]: {
          ...fieldObject,
          isChecked: true,
          value: newFieldValue
        }
      }
    })

    const next = columnFields[fieldObject.next]?.name;

    if(next) {
      setColumnFields(prev => {
        return {
          ...prev,
          [next]: {
            ...columnFields[next],
            isPreviousChecked: true,
            isAvailable: true
          }
        }
      })
    }

    return newTotalValue;    
  }

  const fieldClickHandler = ([ fieldName, fieldObject ]) => {
    if(!fieldObject?.isAvailable || fieldObject.isChecked) {
      showToast('error', 'To polje nije dostupno!')
      return;
    };

    const fieldValue = calculateFieldValue(fieldName, fieldObject.numberValue);

    const { totalsField } = fieldObject;

    if(fieldName === 'ones') {
      calculateTotalsDifference(fieldName, fieldValue, fieldObject);
      calculateSetsAndNumbersTotals(totalsField, fieldValue, fieldObject);
      addNewTotal(column.columnName, fieldObject.totalsField, fieldValue);
      return;
    }

    if(fieldName === 'maximum' || fieldName === 'minimum') {
      calculateTotalsDifference(fieldName, fieldValue, fieldObject);
      return;
    }

    addNewTotal(column.columnName, fieldObject.totalsField, fieldValue);

    calculateSetsAndNumbersTotals(totalsField, fieldValue, fieldObject);
  }

const sendData = () => {
    const playerSimplifiedColumns = JSON.parse(localStorage.getItem('simpleColumns'));

    const selectedColumn = playerSimplifiedColumns.find(item => item.columnName === column.columnName);

    const newColumnData = Object.values(columnFields).map(item => {
      return {
        name: item.name,
        fieldDisplay: item.fieldDisplay,
        value: item?.value
      }      
    })
    
    selectedColumn.columnData = newColumnData;

    // console.log(playerSimplifiedColumns);

    // console.log(Object.keys(columnsTotals));

    // const columnIndex = playerSimplifiedColumns.findIndex(item => item.columnName === column.columnName);

    // console.log(columnIndex, column.columnName)

    // const newSimplifiedColumn = Object.entries(columnFields).map(item => {
    //   return { 
    //     name: item[0],
    //     fieldDisplay: item[1].fieldDisplay,
    //     value: item[1]?.value
    //   }
    // })

    // console.log(newSimplifiedColumn)

    // playerSimplifiedColumns.splice(columnIndex, newSimplifiedColumn)

    // console.log(playerSimplifiedColumns);

    // localStorage.setItem('simpleColumns', JSON.stringify(playerSimplifiedColumns));

    // socket.emit('opponentData', playerSimplifiedColumns);
  }

  const unclickable = element => {
    return (element === 'ukupno' || element === 'razlika')
  }
  
  return (
    <section className={classes.columnContainer}>
      <h4>
        <TbCircleLetterR />
        {/* <LuArrowUpDown /> */}
        {/* <TbCircleDashedLetterR /> */}
      </h4>
      {Object.entries(columnFields).map(item => {
        if(column.isDefault) {
          return <div 
            key={item[0]}
            className={`
              ${classes.field}
              ${classes.default}
              ${unclickable(item[1].fieldDisplay) ? `${classes.dark}` : null}
            `}
          >
            {item[1].fieldDisplay}
          </div>
        }

        if(isOpponent) {
          return (
            <div 
              key={item[0]}
              className={`
                ${classes.field}
                ${unclickable(item[1].fieldDisplay) ? `${classes.dark}` : null}
              `}
            >
              {item[1].value ?? ''}
            </div>
          )
        }

        return (
          <div 
            key={item[0]}
            className={`
              ${classes.field}
              ${(item[1].isAvailable && !item[1].isChecked) ? `${classes.available}` : null}
              ${unclickable(item[1].fieldDisplay) ? `${classes.dark}` : null}
            `}
            onClick={() => fieldClickHandler(item)}
          >
            {item[1].value}
          </div>
        )
      })}
    </section>
  )
}

export default Column