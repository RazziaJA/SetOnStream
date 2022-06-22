import React from "react"
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import GridLayout, {WidthProvider} from "react-grid-layout";
import LabelledSetSprite from './LabelledSetSprite';

const ResponsiveReactGridLayout = WidthProvider(GridLayout)

function genLayout(count, cols) {
    return new Array(count).fill(undefined).map((val, idx) => {
      return {
        i: idx.toString(),
        w: 1,
        h: 1,
        x: Math.floor(idx / (count/cols)),
        y: idx % (count/cols),
        static: true
      };
    })
  }

export default function PngTabletop({game, ...props}) {
    var layout = genLayout(21, 7);

    return (
        <div className="Tabletop">
            <ResponsiveReactGridLayout
                className="layout"
                layout={layout}
                cols={7}
                //rowHeight={200}
            >
                {game.on_table.map((deckId, tblIdx) => {
                return (
                    <LabelledSetSprite key={tblIdx.toString()} tblIdx={tblIdx} card={deckId} />
                );
                })}
            </ResponsiveReactGridLayout>
      </div>);
}