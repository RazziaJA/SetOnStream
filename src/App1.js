import './App.css';
import ReactRough, { Rectangle, Circle, Polygon } from 'react-rough';
import SetGame from './setGame'
import React from 'react';


const counts = ["one", "two", "three"]
const shadings = ["empty", "striped", "solid"];
const colors = ["red", "green", "purple"];
const shapes = ["diamond", "oval", "squiggle"];

/**
 * Takes in:
 *  * the card properties (color, count, shading, shape)
 *  * (x,y) coords
 *  * width/height
 *  * label (index on the table)
 * 
 * Returns the JSX for rendering the card.
 * 
 * @param {*} props The card properties.
 */
class Card extends React.Component {

  getBoundingBoxForShape(shapeNum, shapeCount, cardX, cardY, cardWidth, cardHeight) {
    // TODO center shapes
    let vertPaddingPercent = .2;
    let horiPaddingPercent = .2;
    let horiSpacingPercent = .2;
    let cardBoxWithoutPadding = { x: cardX + horiPaddingPercent * cardWidth, y: cardY + vertPaddingPercent * cardHeight, width: (1 - 2 * horiPaddingPercent) * cardWidth, height: (1 - 2 * vertPaddingPercent) * cardHeight };
    let spaceSize = cardBoxWithoutPadding.width * horiSpacingPercent;
    let numSpaces = shapeCount - 1;
    let shapeWidth = (cardBoxWithoutPadding.width - spaceSize * numSpaces) / 3;
    return { x: cardBoxWithoutPadding.x + shapeNum * (spaceSize + shapeWidth), y: cardBoxWithoutPadding.y, width: shapeWidth, height: cardBoxWithoutPadding.height };
  }

  render() {

    // Shading 0 = empty, 1 = hachure, 2 = solid
    let fillStyle = this.props.shading === 1 ? "hachure" : "solid";
    let fillTransparency = this.props.shading === 0 ? 0 : 1;

    // Color 0 = green, 1 = red, 2 = purple
    let fillColor = `rgba(0, 255, 0, ${fillTransparency})`;
    let strokeColor = 'rgba(0, 255, 0, 1';
    if (this.props.color === 1) {
      fillColor = `rgba(255, 0, 0, ${fillTransparency})`;
      strokeColor = `rgba(255, 0, 0, 1)`;
    } else if (this.props.color === 2) {
      fillColor = `rgba(106, 13, 173, ${fillTransparency})`;
      strokeColor = `rgba(106, 13, 173, 1)`;
    }

    let bounds = [];
    for (var i = 0; i < this.props.count; i++) {
      bounds.push(this.getBoundingBoxForShape(i, this.props.count, this.props.x, this.props.y, this.props.width, this.props.height));
      //console.log(`bounds for shape ${i}: x: ${bounds[i].x}, y: ${bounds[i].y}, width: ${bounds[i].width}, height: ${bounds[i].height}`);
    }

    let roughness = 2;

    //console.log(`Card Label ${this.props.label} has Shading=${this.props.shading}, Shape=${this.props.shape}, and Number=${this.props.count}`);

    if (this.props.shape === 0) {
      // square
      return (
        <React.Fragment>
          <Rectangle stroke="black"
            strokeWidth={2}
            x={this.props.x}
            y={this.props.y}
            width={this.props.width}
            height={this.props.height} />

          {bounds.map((box, index) => {
            return (
              <Rectangle
                x={box.x}
                y={box.y}
                width={box.width}
                height={box.height}
                fill={fillColor}
                fillStyle={fillStyle}
                stroke={strokeColor}
                strokeWidth={3}
                roughness={roughness}
                key={index} />
            )
          })}
        </React.Fragment>
      )
    }
    if (this.props.shape === 1) {
      // ellipse
      return (
        <React.Fragment>
          <Rectangle stroke="black"
            strokeWidth={2}
            x={this.props.x}
            y={this.props.y}
            width={this.props.width}
            height={this.props.height} />

          {/*<div>{this.props.label}</div>*/}

          {bounds.map((box, index) => {
            return (
              <Polygon
                points={[
                  [
                    box.x,
                    box.y
                  ],
                  [
                    box.x + box.width,
                    box.y
                  ],
                  [
                    box.x,
                    box.y + box.height
                  ]
                ]}
                fill={fillColor}
                fillStyle={fillStyle}
                stroke={strokeColor}
                strokeWidth={3}
                roughness={roughness}
                key={index}
              />
            )

            /*return (
              <Ellipse
                x={box.x + box.width / 2}
                y={box.y + box.height / 2}
                width={box.width}
                height={box.height}
                fill={fillColor}
                fillStyle={fillStyle}
                stroke={strokeColor}
                strokeWidth={3}
                roughness={roughness}
                key={index} />
            )*/
          })}
        </React.Fragment>
      )
    }
    if (this.props.shape === 2) {
      // circle
      return (
        <React.Fragment>
          <Rectangle stroke="black"
            strokeWidth={2}
            x={this.props.x}
            y={this.props.y}
            width={this.props.width}
            height={this.props.height} />


          {bounds.map((box, index) => {
            return (
              <Circle
                x={box.x + box.width / 2}
                y={box.y + box.height / 2}
                diameter={Math.min(box.width, box.height)}
                fill={fillColor}
                fillStyle={fillStyle}
                stroke={strokeColor}
                strokeWidth={3}
                roughness={roughness}
                key={index} />
            )
          })}
        </React.Fragment>
      )
    }
  }
}

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.setGame = new SetGame();
    this.boardWidth = 1600;
    this.boardHeight = 600;
    this.calculateCardLocations();
  }

  componentDidMount() {
    window.appComponent = this;
  }

  callSet(card1, card2, card3) {
    this.setGame.checkSet("test", [card1-1, card2-1, card3-1]);
    this.forceUpdate();
  }

  calculateCardLocations() {
    this.cardLocations = {};
    for (var i = 0; i <= 21; i += 3) {
      this.cardLocations[i] = [];
      for (var k = 0; k < i; ++k) {
        this.cardLocations[i].push(this.getBoundingBoxForCard(k, i, this.boardWidth, this.boardHeight));
      }
    }
    console.log("Card locations calculated.");
  }

  getBoundingBoxForCard(cardNum, cardCount, boardWidth, boardHeight) {
    let cardsPerColumn = 3;
    let cardsPerRow = cardCount / cardsPerColumn;
    let vertPaddingPercent = .05;
    let horiPaddingPercent = .05;
    let vertSpacingPercent = .05;
    let horiSpacingPercent = .05;
    let boardBoxWithoutPadding = { x: horiPaddingPercent * boardWidth, y: vertPaddingPercent * boardHeight, width: (1 - 2 * horiPaddingPercent) * boardWidth, height: (1 - 2 * vertPaddingPercent) * boardHeight };
    let horiSpaceSize = boardBoxWithoutPadding.width * horiSpacingPercent;
    let vertSpaceSize = boardBoxWithoutPadding.height * vertSpacingPercent;
    let numHoriSpaces = cardsPerRow - 1;
    let numVertSpaces = cardsPerColumn - 1;
    let cardWidth = (boardBoxWithoutPadding.width - horiSpaceSize * numHoriSpaces) / cardsPerRow;
    let cardHeight = (boardBoxWithoutPadding.height - vertSpaceSize * numVertSpaces) / cardsPerColumn;
    return {
      x: boardBoxWithoutPadding.x + Math.floor(cardNum / cardsPerColumn) * (horiSpaceSize + cardWidth),
      y: boardBoxWithoutPadding.y + (cardNum % cardsPerColumn) * (vertSpaceSize + cardHeight),
      width: cardWidth,
      height: cardHeight
    };
  }

  render() {
    console.log("Returning from AppComponent.render()");
    return (
      <div style={{ position: "relative" }}>
        {this.cardLocations[this.setGame.on_table.length].map((box, tableCardNum) => {
          return (
            <div style={{
              position: "absolute",
              left: box.x + box.width * .05,
              top: box.y + box.height * .05,
              width: box.width * .1,
              height: box.height * .1
            }}
              key={tableCardNum}>{tableCardNum + 1}</div>
          );
        })}

        <ReactRough
          config={{
            width: this.boardWidth,
            height: this.boardHeight,
            x: 0,
            y: 0
          }}
          width={this.boardWidth}
          height={this.boardHeight}>
          {this.cardLocations[this.setGame.on_table.length].map((box, tableCardNum) => {
            let gameCardNum = this.setGame.on_table[tableCardNum];
            console.log(`Bounds for card ${tableCardNum + 1}: x: ${box.x}, y: ${box.y}, width: ${box.width}, height: ${box.height}`);
            return (
              <Card
                x={box.x}
                y={box.y}
                width={box.width}
                height={box.height}
                color={this.setGame.getColor(gameCardNum)}
                count={this.setGame.getNumber(gameCardNum) + 1}
                shading={this.setGame.getShading(gameCardNum)}
                shape={this.setGame.getShape(gameCardNum)}
                label={tableCardNum + 1}
                key={tableCardNum} />
            );
          })}</ReactRough></div>
    );
  }
}

export default AppComponent;
