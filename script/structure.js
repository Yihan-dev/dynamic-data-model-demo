// @ts-check

export class Function {
  /**
   * @param {Assignment[]} assignmentNodeList
   * @param {Number} varLength
   */
  constructor(
    assignmentNodeList,
    varLength,
  ) {
    this.assignmentNodeList = assignmentNodeList;
    this.varLength = varLength;
  }
}

export class Assignment {
  /**
   * @param {String} operator
  *  @param {Number} objectKey
  *  @param {Number} varKey
   * @param {NumberNode} numberNode
   */
  constructor(
    operator,
    objectKey,
    varKey,
    numberNode,
  ) {
    this.operator = operator;
    this.objectKey = objectKey;
    this.varKey = varKey;
    this.numberNode = numberNode;
  }
}



/** @typedef {Val | Calc | Func | Conditional} NumberNode */

export class Val {
  type = 'val';

  /**
  *  @param {Number} objectKey
  *  @param {Number} varKey
   */
  constructor(
    objectKey,
    varKey,
  ) {
    this.objectKey = objectKey;
    this.varKey = varKey;
  }
}

export class Calc {
  type = 'calc';

  /**
   * @param {String} operator
   * @param {Array<NumberNode>} childNodeList
   */
  constructor(
    operator,
    childNodeList,
  ) {
    this.operator = operator;
    this.childNodeList = childNodeList;
  }
}

export class Func {
  type = 'func';

  /**
   * @param {String} func
   * @param {NumberNode} childNode
   */
  constructor(
    func,
    childNode,
  ) {
    this.func = func;
    this.childNode = childNode;
  }
}

export class Conditional {
  type = 'conditional';

  /**
   * @param {BooleanNode} condition
   * @param {NumberNode} childNodeTrue
   * @param {NumberNode} childNodeFalse
   */
  constructor(
    condition,
    childNodeTrue,
    childNodeFalse,
  ) {
    this.condition = condition;
    this.childNodeTrue = childNodeTrue;
    this.childNodeFalse = childNodeFalse;
  }
}



/** @typedef {Comparison | Logic | Not} BooleanNode */

export class Comparison {
  type = 'comparison';

  /**
   * @param {String} comparison
   * @param {NumberNode} childNodeLeft
   * @param {NumberNode} childNodeRight
   */
  constructor(
    comparison,
    childNodeLeft,
    childNodeRight,
  ) {
    this.comparison = comparison;
    this.childNodeLeft = childNodeLeft;
    this.childNodeRight = childNodeRight;
  }
}

export class Logic {
  type = 'logic';

  /**
   * @param {String} operator
   * @param {Array<BooleanNode>} childNodeList
   */
  constructor(
    operator,
    childNodeList,
  ) {
    this.operator = operator;
    this.childNodeList = childNodeList;
  }
}

export class Not {
  type = 'not';

  /**
   * @param {BooleanNode} childNode
   */
  constructor(
    childNode,
  ) {
    this.childNode = childNode;
  }
}