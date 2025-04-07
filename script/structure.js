// @ts-check

export class UnitData {
  /**
   * @param {Number[]} state
   * @param {Number[]} organization
   * @param {Number[]} terrain
   */
  constructor(
    state,
    organization,
    terrain,
  ) {
    this.state = state;
    this.organization = organization;
    this.terrain = terrain;
  }
}



export class Func {
  /**
   * @param {Number} varLength
   * @param {NumberNode[]} funcState
   * @param {Array<NumberNode | null>} subjectState
   * @param {Array<NumberNode | null>} objectState
   */
  constructor(
    varLength,
    funcState,
    subjectState,
    objectState,
  ) {
    this.varLength = varLength;
    this.funcState = funcState;
    this.subjectState = subjectState;
    this.objectState = objectState;
  }
}



/** @typedef {Val | Reduce | Calc} NumberNode */

export class Val {
  type = 'val';

  /**
   * @param {Number} objectKey
   * @param {Number} varKey
   */
  constructor(
    objectKey,
    varKey,
  ) {
    this.objectKey = objectKey;
    this.varKey = varKey;
  }
}

export class Reduce {
  type = 'reduce';

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

export class Calc {
  type = 'calc';

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