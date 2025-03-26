// @ts-check



/** @type {Set<(e: MouseEvent) => void>} */
const up = new Set();

addEventListener('mouseup', e => {
  up.forEach(func => func(e));
});



export class MouseReceiver {
  /** @type {Set<(e: MouseEvent) => void>} */
  down = new Set();
  /** @type {Set<(e: MouseEvent) => void>} */
  move = new Set();


  /** @param {HTMLElement} target */
  constructor(target) {
    target.addEventListener('mousedown', e => this.down.forEach(func => func(e)) );
    target.addEventListener('mousemove', e => this.move.forEach(func => func(e)) );
  }


  /**
   * @param {Number} button
   * @param {(e: MouseEvent) => void} moveHandler
   * @param {(e: MouseEvent) => void} upHandler
   */
  moveUp(button, moveHandler, upHandler=e=>{}) {
    /** @param {MouseEvent} e */
    const mouseup = e => {
      if (e.button !== button) return;
      upHandler(e);

      this.move.delete(moveHandler);
      up.delete(mouseup);
    }

    this.move.add(moveHandler);
    up.add(mouseup);
  }

}