export class RawNode {
  name: string;
  children: RawNode[];

  constructor(rawNodeData: RawNodeData) {
    this.children = rawNodeData.children.map(child => new RawNode(child));
    this.name = rawNodeData.name;
  }
}
