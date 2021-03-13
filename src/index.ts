import * as d3 from 'd3'
import "./css/index.css"

const treeData = [
  {
    "name": "Top Level",
    "parent": "null",
    "value": 10,
    "type": "black",
    "level": "red",
    "children": [
      {
        "name": "Level 2: A",
        "parent": "Top Level",
        "value": 15,
        "type": "grey",
        "level": "red",
        "children": [
          {
            "name": "Son of A",
            "parent": "Level 2: A",
            "value": 5,
            "type": "steelblue",
            "level": "orange"
          },
          {
            "name": "Daughter of A",
            "parent": "Level 2: A",
            "value": 8,
            "type": "steelblue",
            "level": "red"
          }
        ]
      },
      {
        "name": "Level 2: B",
        "parent": "Top Level",
        "value": 10,
        "type": "grey",
        "level": "green"
      }
    ]
  }
];

const treeContainer = d3.select(".root > .app").append("svg")
  .attr("class", "tree-container")
  .attr("viewBox", "0 0 100 100")
  .attr("preserveAspectRatio", "xMinYMin meet");

// treeContainer.append("rect")
//   .attr("x", 0).attr("y", 0).attr("width", 100).attr("height", 60)
//   .attr("stroke", "red")

function lineWithCoorDesc(x1: number, y1: number, x2: number, y2: number, color: string){
  const offset = 3;
  treeContainer.append("line")
    .attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2).attr("stroke", color)

  treeContainer.append("text")
    .attr("x", x1).attr("y", y1+offset).attr("font-size", offset).text(`(${x1}, ${y1})`)
  treeContainer.append("text")
    .attr("x", x2).attr("y", y2+offset).attr("font-size", offset).text(`(${x2}, ${y2})`)
}

lineWithCoorDesc(0, 0, -50, 0, "red");
lineWithCoorDesc(-50, 0, -50, 90, "red");
lineWithCoorDesc(-50, 90, 0, 90, "red");
lineWithCoorDesc(0, 0, 100, 0, "blue");
lineWithCoorDesc(100, 0, 100, 90, "blue");
lineWithCoorDesc(100, 90, 0, 90, "blue");