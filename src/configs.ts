import { RawNode } from './RawNode';
export type Node = d3.HierarchyNode<RawNode>
export type Tree = d3.HierarchyPointNode<RawNode> & {'_children'?: Tree[]}

export const treeData: RawNodeData =
  {
    "name": "Top Level",
    "children": [
      { 
        "name": "Level 2: A",
        "children": [
          {
            "name": "Son of A",
            "children": []
          },
          { 
            "name": "Daughter of A",
            "children": []
          }
        ]
      },
      {
        "name": "Level 2: B",
        "children": []
      }
    ]
  };

// Set the dimentions and margins of the diagram
export const margin = {top: 20, right: 90, bottom: 30, left: 90},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

export const duration = 750;