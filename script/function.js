// @ts-check

/**
 * @typedef {import('./structure.js').Function} FunctionNode
 * @typedef {import('./structure.js').Assignment} AssignmentNode
 */

/**
 * @param {FunctionNode} functionNode
 * @param {Number[]} 상수
 * @param {Number[]} 환경변수
 * @param {Number[]} 주체상태
 * @param {Number[]} 주체편제
 * @param {Number[]} 주체지형
 * @param {Number[]} 관계
 * @param {Number[]} 대상상태
 * @param {Number[]} 대상편제
 * @param {Number[]} 대상지형
 */
export function calcFunctionNode(functionNode, 상수, 환경변수, 주체상태, 주체편제, 주체지형, 관계, 대상상태, 대상편제, 대상지형) {
  const 함수변수 = new Array(functionNode.varLength).fill(0);
  const 주체상태Copy = [...주체상태];
  const 대상상태Copy = [...대상상태];
  parameter = [상수, 환경변수, 함수변수, 주체상태Copy, 주체편제, 주체지형, 관계, 대상상태Copy, 대상편제, 대상지형];

  const state = [함수변수, 주체상태Copy, 대상상태Copy];

  for (const node of functionNode.assignmentNodeList) {
    const operator = assignmentOperatorMap.get(node.operator);
    if (operator !== undefined) {
      operator(state[node.objectKey], node.varKey, getNumberByNode(node.numberNode));
    }
  }

  return [주체상태Copy, 대상상태Copy];
}

/** @type {Number[][]} */
let parameter;

/** @type {Map<String, (object: Number[], varKey: Number, val: Number) => Number>} */
const assignmentOperatorMap = new Map([
  ['=',  (object, varKey, val) => object[varKey]  = val],
  ['+=', (object, varKey, val) => object[varKey] += val],
  ['-=', (object, varKey, val) => object[varKey] -= val],
  ['*=', (object, varKey, val) => object[varKey] *= val],
  ['/=', (object, varKey, val) => object[varKey] /= val],
]);



/**
 * @typedef {import('./structure.js').NumberNode} NumberNode
 * @typedef {import('./structure.js').Val} ValNode
 * @typedef {import('./structure.js').Calc} CalcNode
 * @typedef {import('./structure.js').Func} FuncNode
 * @typedef {import('./structure.js').Conditional} ConditionalNode
 */

/**
 * @param {NumberNode} node
 * @returns {Number}
 */
function getNumberByNode(node) { // 나중에는 context를 인수로 받아서 변수읽기 등의 기능도 할 수 있도록 하기?
  if (isValNode(node)) {
    return parameter[node.objectKey][node.varKey];
  }

  if (isCalcNode(node)) {
    const reducer = numberReducerMap.get(node.operator);
    if (reducer !== undefined) {
      return node.childNodeList.map(getNumberByNode).reduce(reducer);
    }
  }

  if (isFuncNode(node)) {
    const func = numberFuncMap.get(node.func);
    if (func !== undefined) {
      return func(getNumberByNode(node.childNode));
    }
  }

  if (isConditionalNode(node)) {
    return getNumberByNode(
      getBooleanByNode(node.condition)? node.childNodeTrue : node.childNodeFalse
    );
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
 * @returns {node is CalcNode}
 */
const isCalcNode = node => node.type === 'calc';

/** @type {Map<String, (acc: Number, val: Number) => Number>} */
const numberReducerMap = new Map([
  ['+', (acc, val) => acc + val],
  ['*', (acc, val) => acc * val],
]);



/**
 * @param {NumberNode} node
 * @returns {node is FuncNode}
 */
const isFuncNode = node => node.type === 'func';

/** @type {Map<String, (val: Number) => Number>} */
const numberFuncMap = new Map([
  ['negativ', val => -val],
  ['inverse', val => 1 / val],
]);



/**
 * @param {NumberNode} node
 * @returns {node is ConditionalNode}
 */
const isConditionalNode  = node => node.type === 'conditional';



/**
 * @typedef {import('./structure.js').BooleanNode} BooleanNode
 * @typedef {import('./structure.js').Comparison} ComparisonNode
 * @typedef {import('./structure.js').Logic} LogicNode
 * @typedef {import('./structure.js').Not} NotNode
 */

/**
 * @param {BooleanNode} node
 * @returns {Boolean}
 */
function getBooleanByNode(node) {
  if (isComparisonNode(node)) {
    const comparison = numberComparisonMap.get(node.comparison);
    if (comparison !== undefined) {
      return comparison(getNumberByNode(node.childNodeLeft), getNumberByNode(node.childNodeRight));
    }
  }

  if (isLogicNode(node)) {
    const reducer = booleanReducerMap.get(node.operator);
    if (reducer !== undefined) {
      return node.childNodeList.map(getBooleanByNode).reduce(reducer);
    }
  }

  if (isNotNode(node)) {
    return !getBooleanByNode(node.childNode);
  }

  return false;
}



/**
 * @param {BooleanNode} node
 * @returns {node is ComparisonNode}
 */
const isComparisonNode = node => node.type === 'comparison';

/** @type {Map<String, (left: Number, right: Number) => Boolean>} */
const numberComparisonMap = new Map([
  ['<', (left, right) => left < right],
  ['<=', (left, right) => left <= right],
  ['==', (left, right) => left == right],
]);



/**
 * @param {BooleanNode} node
 * @returns {node is LogicNode}
 */
const isLogicNode = node => node.type === 'logic';

/** @type {Map<String, (acc: Boolean, val: Boolean) => Boolean>} */
const booleanReducerMap = new Map([
  ['and', (acc, val) => acc && val],
  ['or', (acc, val) => acc || val]
]);



/**
 * @param {BooleanNode} node
 * @returns {node is NotNode}
 */
const isNotNode = node => node.type === 'not';