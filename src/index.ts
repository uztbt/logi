import * as d3 from 'd3'
import "./css/index.css"
import { duration, height, margin, Point, Tree, treeData, width } from './configs';
import { RawNode } from './RawNode';
import { click, collapsed, cubicLine } from './functions';

let i = 0; // The last node's ID

// Append the SVG object to the body of the page
const svg = d3.select(".app").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

const treemap = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
const rootHierarchyNode = d3.hierarchy(new RawNode(treeData), d => d.children);

// Collapse after the second level
// rootHierarchyNode.children?.forEach(child => child.data.collapse());

update(treemap(rootHierarchyNode) as Tree);

function update(source: Tree) {
  // Preserve the source x and y
  const oldSourcePoint: Point = {x: source.x, y: source.y}
  // Render the whole tree
  const tree = treemap(rootHierarchyNode) as Tree;
  tree.x = height / 2;
  tree.y = 0;
  
  // The deeper the node is, the higher the y value is
  const nodes = tree.descendants();
  nodes.forEach(d=> {d.y = d.depth * 180});

  // ***************** Nodes section *****************
  // Join the node data to the selection with the key function.
  const existingNodes = svg.selectAll<SVGGElement, Tree[]>('g.node')
    .data(nodes, (d: any) => d.id || (d.id = ++i))
  
  // Enter the new nodes at the parent's previous position.
  // I guess I shold add a filter after .enter() to prevent
  // the collapsed nodes from showing.
  const enteringNodes = existingNodes.enter().append('g')
    .classed('node', true)
    .attr('transform', _ => `translate(${oldSourcePoint.y},${oldSourcePoint.x})`)
    .on('click', click(update));

  // Add circles for the added nodes.
  // Note that they are created inside the `g` element!
  enteringNodes.append('circle')
    .classed('node', true);

  // `text` elements are also inside the `g` elements
  enteringNodes.append('text')
    .attr("dy", ".35em")
    .attr("x", d => d.children ? -13 : 13) // Right or left to the circle.
    .attr("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name);
  
  // Deal with both existing and entering the nodes
  const updatingNodes = enteringNodes.merge(existingNodes);
  // Move the nodes!
  updatingNodes
    .transition()
    .duration(duration)
    .attr("transform", d => `translate(${d.y}, ${d.x})`)
  updatingNodes.select('circle.node')
    .attr('r', 10)
    .style('fill', d => collapsed(d) ? '#fff': "lightsteelblue")
    .attr('cursor', 'pointer');

  // Deal with exiting nodes
  existingNodes.exit()
    .transition()
    .duration(duration)
    .attr("transform", `translate(${source.y}, ${source.x})`)
    .remove();

  // ********** links selection ***************
  // Join the existing DOMs with the data
  const links = tree.descendants().slice(1);
  const existingLinks = svg.selectAll<SVGPathElement, Tree[]>('path.link')
    .data(links, (d: any) => d.id);

  // Position the entering links before updating
  const enteringLinks = existingLinks.enter().insert('path', "g")
    .classed('link', true)
    .attr('d', _ => cubicLine(oldSourcePoint, oldSourcePoint));

  // deal with both the existing and entering links
  // Transition back to the parent element position
  const updatingLinks = enteringLinks.merge(existingLinks);
  updatingLinks
    .transition()
    .duration(duration)
    .attr('d', d => cubicLine(d, d.parent!))

  // Remove any existing links
  existingLinks.exit()
    .transition()
    .duration(duration)
    .attr('d', d => cubicLine(source, source))
    .remove();
}

