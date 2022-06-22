import SpriteSheet from "./SpriteSheet"
import setCards from './set-cards.png'
import SetGame from './SetGame'
import React from "react"

function genSpriteSheet() {
    let topleftx = 27;
    let toplefty = 12;
    let w = 98;
    let h = 55;
    let spacingx = 5;
    let spacingy = 3;
  
    const sprites = {};
    new Array(81).fill(undefined).map((unused, card) => {
      let row = 3*SetGame.getColor(card) + SetGame.getShading(card);
      let col = 3*SetGame.getShape(card) + SetGame.getNumber(card);
      return {
        width: w,
        height: h,
        x: topleftx + col*(w+spacingx),
        y: toplefty + row*(h+spacingy)
      }
    }).forEach((el, idx) => {
      sprites[idx.toString()] = el;
    });
    return sprites;
  }
  
  const spriteSheet = genSpriteSheet();
  
  const LabelledSetSprite = React.forwardRef(({style, className, ...props}, ref) => {
    return (
      <div style={{...style}} className={className} ref={ref}>
        {props.tblIdx != undefined && <label>{props.tblIdx+1} </label>}
        <SpriteSheet filename={setCards} data={spriteSheet} sprite={props.card.toString()} />
      </div>
    );
  })

  export default LabelledSetSprite;