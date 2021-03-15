import { Point, Tree } from "./configs";

export const click = (update: any) => (event: MouseEvent, tree: Tree) => {
  if (tree.children) {
    tree._children = tree.children;
    tree.children = undefined;
  } else {
    tree.children = tree._children;
    tree._children = undefined;
  }
  update(tree);
}

export function collapsed(t: Tree): boolean {
  return t._children === undefined;
}

// Creates a curved (diagonal) path from parent to the child nodes
export const cubicLine = (s: Point, d: Point) =>
  `M ${s.y} ${s.x}
   C ${(s.y + d.y) / 2} ${s.x},
     ${(s.y + d.y) / 2} ${d.x},
     ${d.y} ${d.x}
  `;