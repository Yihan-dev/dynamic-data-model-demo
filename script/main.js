// @ts-check
import * as Node from './structure.js';
import { getNumberByNode } from './function.js';



const structure = new Node.Calc('add', [
  new Node.Calc('mul', [
    new Node.Val(2),
    new Node.Inverse(new Node.Val(4))
  ]),
  new Node.Val(2),
  new Node.Negative(new Node.Val(1))
]);

console.log(getNumberByNode(structure));