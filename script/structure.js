// @ts-check

/** @typedef {Val | Calc | Negative | Inverse} NumberNode */

export class Val {
  type = 'val';

  /**
   * @param {Number} value
   */
  constructor(
    value,
  ) {
    this.value = value;
  }
}

export class Calc {
  type = 'calc';

  /**
   * @param {String} operation
   * @param {Array<NumberNode>} childNodeList
   */
  constructor(
    operation,
    childNodeList,
  ) {
    this.operation = operation;
    this.childNodeList = childNodeList;
  }
}

export class Negative {
  type = 'negative';

  /**
   * @param {NumberNode} childNode
   */
  constructor(
    childNode,
  ) {
    this.childNode = childNode;
  }
}

export class Inverse {
  type = 'inverse';

  /**
   * @param {NumberNode} childNode
   */
  constructor(
    childNode,
  ) {
    this.childNode = childNode;
  }
}



// VariableNode