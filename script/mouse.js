// @ts-check



/** @type {Map<Symbol, (e: MouseEvent) => void>} */
const mouseUpMap = new Map();

addEventListener('mouseup', e => {
  mouseUpMap.forEach(func => func(e));
});



export class MouseReceiver {
  /** @type {Map<Symbol, (e: MouseEvent) => void>} */
  mouseDownMap = new Map();
  /** @type {Map<Symbol, (e: MouseEvent) => void>} */
  mouseMoveMap = new Map();


  /** @param {HTMLElement} target */
  constructor(target) {
    target.addEventListener('mousedown', e => this.mouseDownMap.forEach(func => func(e)) );
    target.addEventListener('mousemove', e => this.mouseMoveMap.forEach(func => func(e)) );
  }


  /**
   * @param {Number} button
   * @param {(e: MouseEvent) => void} move
   * @param {(e: MouseEvent) => void} up
   */
  mouseMoveUp(button, move, up=e=>{}) {
    const moveSymbol = Symbol();
    const upSymbol = Symbol();

    /** @param {MouseEvent} e */
    const mouseup = e => {
      if (e.button !== button) return;
      up(e);

      this.mouseMoveMap.delete(moveSymbol);
      mouseUpMap.delete(upSymbol);
    }

    this.mouseMoveMap.set(moveSymbol, move);
    mouseUpMap.set(upSymbol, mouseup);
  }

}