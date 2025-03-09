import React from 'react'

const dice = () => {
  return (
    <section className='dice_cointainer'>
      <div className="dice">
        <div className="input_control">
          <label htmlFor="input_dice_one"></label>
          <input
            type="checkbox"
            name="input_dice_one"
            id="input_dice_one"
          />
        </div>
        <div className="input_control">
          <label htmlFor="input_dice_two"></label>
          <input 
            type="checkbox"
            name="input_dice_two"
            id="input_dice_two" />
        </div>
        <div className="input_control">
          <label htmlFor="input_dice_three"></label>
          <input 
            type="checkbox"
            name="input_dice_three"
            id="input_dice_three" />
        </div>
        <div className="input_control">
          <label htmlFor="input_dice_four"></label>
          <input 
            type="checkbox"
            name="input_dice_four"
            id="input_dice_four" />
        </div>
        <div className="input_control">
          <label htmlFor="input_dice_five"></label>
          <input 
            type="checkbox"
            name="input_dice_five"
            id="input_dice_five" />
        </div>
        <div className="input_control">
          <label htmlFor="input_dice_six"></label>
          <input 
            type="checkbox"
            name="input_dice_six"
            id="input_dice_six" />
        </div>
      </div>
      <button className="roll_button">ROLL</button>
    </section>
  )
}

export default dice