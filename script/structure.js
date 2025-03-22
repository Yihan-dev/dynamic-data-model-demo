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



export class Function {
  /**
   * @param {Number} varLength
   * @param {Assignment[]} assignmentNodeList
   */
  constructor(
    varLength,
    assignmentNodeList,
  ) {
    this.varLength = varLength;
    this.assignmentNodeList = assignmentNodeList;
  }
}

export class Assignment {
  /**
   * @param {String} operator
   * @param {Number} objectKey
   * @param {Number} varKey
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



/** @typedef {Val | Calc | Func | Switch} NumberNode */

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

export class Switch {
  type = 'switch';

  /**
   * @param {Case[]} caseNodeList
   * @param {NumberNode} defaultNode
   */
  constructor(
    caseNodeList,
    defaultNode,
  ) {
    this.caseNodeList = caseNodeList;
    this.defaultNode = defaultNode;
  }
}



export class Case {
  /**
   * @param {BooleanNode} condition
   * @param {NumberNode} childNode
   */
  constructor(
    condition,
    childNode,
  ) {
    this.condition = condition;
    this.childNode = childNode;
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