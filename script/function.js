// @ts-check

/**
 * @typedef {import('./structure.js').UnitData} UnitData
 * @typedef {import('./structure.js').Func} FuncNode
 */

/**
 * @param {FuncNode} funcNode
 * @param {Number[]} 상수
 * @param {Number[]} 환경변수
 * @param {Number[]} 관계
 * @param {UnitData} subject
 * @param {UnitData} object
 */
export default function calcFunctionNode(funcNode, 상수, 환경변수, 관계, subject, object) {
  const funcState = new Array(funcNode.varLength).fill(0);
  const subjectStateCopy = [...subject.state];
  const objectStateCopy = [...object.state];

  parameter = [
    상수, 환경변수, 관계,
    subject.state, subject.organization, subject.terrain,
    object.state, object.organization, object.terrain,
    funcState
  ];

  for (const numberNode of funcNode.funcState) {
    funcState.push(getNumberByNode(numberNode));
  }

  for (let i = funcNode.subjectState.length; i--;) {
    const numberNode = funcNode.subjectState[i];
    if (numberNode !== null) {
      subjectStateCopy[i] = getNumberByNode(numberNode);
    }
  }

  for (let i = funcNode.objectState.length; i--;) {
    const numberNode = funcNode.objectState[i];
    if (numberNode !== null) {
      objectStateCopy[i] = getNumberByNode(numberNode);
    }
  }

  return [subjectStateCopy, objectStateCopy];
}

/** @type {Number[][]} */
let parameter;



/**
 * @typedef {import('./structure.js').NumberNode} NumberNode
 * @typedef {import('./structure.js').Val} ValNode
 * @typedef {import('./structure.js').Reduce} ReduceNode
 * @typedef {import('./structure.js').Calc} CalcNode
 */

/**
 * @param {NumberNode} node
 * @returns {Number}
 */
function getNumberByNode(node) {
  if (isValNode(node)) {
    return parameter[node.objectKey][node.varKey];
  }

  if (isReduceNode(node)) {
    const reducer = numberReducerMap.get(node.operator);
    if (reducer !== undefined) {
      return reducer(node.childNodeList.map(getNumberByNode));
    }
  }

  if (isCalcNode(node)) {
    const calc = numberCalcMap.get(node.func);
    if (calc !== undefined) {
      return calc(getNumberByNode(node.childNode));
    }
  }

  return NaN;
}



/**
 * @param {NumberNode} node
 * @returns {node is ValNode}
 */
const isValNode = node => node.type === 'val';



/**
 * @param {NumberNode} node
 * @returns {node is ReduceNode}
 */
const isReduceNode = node => node.type === 'reduce';

/** @type {Map<String, (values: Number[]) => Number>} */
const numberReducerMap = new Map([
  ['add', values => values.reduce((acc, val) => acc + val)],
  ['mul', values => values.reduce((acc, val) => acc * val)],
  ['min', values => Math.min(...values)],
  ['max', values => Math.max(...values)],
]);



/**
 * @param {NumberNode} node
 * @returns {node is CalcNode}
 */
const isCalcNode = node => node.type === 'calc';

/** @type {Map<String, (val: Number) => Number>} */
const numberCalcMap = new Map([
  ['negativ', val => -val],
  ['inverse', val => 1 / val],
]);