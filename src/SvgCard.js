import SetGame from './SetGame'

const SHAPE_COORDS = {
    0: [{x: 37.5}],
    1: [{x: 20}, {x: 55}],
    2: [{x: 7.5}, {x: 37.5}, {x: 67.5} ]
}
const SHAPES = ["diamond", "oval", "squiggle"]
const COLORS = ["red", "green", "purple"]
// annoying hack because the stripe fill pattern can't be color styled with CSS - not in DOM
const SHADINGS = ["empty", "solid", "red-striped", "green-striped", "purple-striped"]

export default function SvgCard({tblIdx, card, cardX, cardY, cardWidth, cardHeight, highlight}) {
    var num = SetGame.getNumber(card);
    var color = SetGame.getColor(card);
    var shape = SetGame.getShape(card);
    var shading = SetGame.getShading(card);
    var shadeClass = SHADINGS[(shading === 2 ? shading+color : shading)]
    var borderColor = highlight ? "lime" : "black";
    var borderWidth = highlight ? 4 : 2;
    return (
        <svg x={`${cardX}%`} y={`${cardY}%`} width={`${cardWidth}%`} height={`${cardHeight}%`} >
            <rect fill="white" x="5%" y="5%" width="90%" height="90%" stroke={borderColor} strokeWidth={borderWidth}/>
            {tblIdx !== undefined && <text dominantBaseline="hanging" x="10%" y="10%">{tblIdx+1}</text>}
            {
                SHAPE_COORDS[num].map( (coords, idx) => {
                    return (
                        <use
                        key={idx}
                        href={`#${SHAPES[shape]}`}
                        x={`${coords["x"]}%`}
                        y='15%'
                        width='25%'
                        height='70%'
                        className={`${COLORS[color]} ${shadeClass}`}/>
                );})
            }
        </svg>
    );
}