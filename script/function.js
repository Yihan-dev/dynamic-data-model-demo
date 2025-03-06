// @ts-check
import * as Node from './structure.js';



/**
 * @param {Node.NumberNode} node
 * @returns {Number}
 */
export function getNumberByNode(node) { // 나중에는 context를 인수로 받아서 변수읽기 등의 기능도 할 수 있도록 하기? return context.var[node.(함수맥락|유닛12|편제12|타일12)key][node.index]?
  if (node instanceof Node.Val) { // 실행중 해석은 instanceof로 대체 했어도, json 통신구조체 해석은 여전히 type가 유일한 구분수단인 상황임. 가능하면 json 변환 이후 곧바로 사용 가능하도록 type을 쓰면 좋겠는데.
    return node.value;
  }
  if (node instanceof Node.Calc) {
    return operator(node);
  }
  if (node instanceof Node.Negative) {
    return -getNumberByNode(node.childNode);
  }
  if (node instanceof Node.Inverse) {
    return 1 / getNumberByNode(node.childNode);
  }
  return NaN;
}



/** @type {Map<String, (acc: Number, val: Number) => Number>} */
const map = new Map();

map.set('add', (acc, val) => acc + val);
map.set('mul', (acc, val) => acc * val);

/** @param {Node.Calc} node */
function operator(node) {
  const func = map.get(node.operation);
  if (func === undefined) return NaN;

  return node.childNodeList.map(getNumberByNode).reduce(func);
}