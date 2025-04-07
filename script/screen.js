// @ts-check
import * as Vector2 from './vector2.js';
import { MouseReceiver } from './mouse.js';
const [X, Y] = [0, 1];



let vector = [0,0];
let scale = 1;

export const nodeRoot = document.createElement('div');
export const background = document.createElement('div');
export const mouseReceiver = new MouseReceiver(background);



void (function main() {
  nodeRoot.style.transformOrigin = 'top left';
  background.classList.add('screen');
  background.appendChild(nodeRoot);

  HandlingWheel();
  HandlingMouse();
})();



/**
 * @param {Number[]} referenceVector
 * @param {Number[]} mouseVector
 * @param {Number} scaleRatio
 */
function setVector(referenceVector, mouseVector, scaleRatio) {
  vector = Vector2.add(
    Vector2.scalarMul(referenceVector, scaleRatio),
    Vector2.scalarMul(mouseVector, 1-scaleRatio)
  );

  nodeRoot.style.transform = `
    translate(${vector[X]}px, ${vector[Y]}px)
    scale(${scale})
  `;
}



function HandlingWheel() {
  const MUL_WHEEL = 0.002, MIN = 0.2, MAX = 1.5;
  background.addEventListener('wheel', wheel);


  /** @param {WheelEvent} e */
  function wheel(e) {
    const referenceScale = scale;
    scale = limitedToRange(scale-e.deltaY*MUL_WHEEL, MIN, MAX);

    setVector(vector, [e.clientX,e.clientY], scale/referenceScale);
  }

}



function HandlingMouse() {
  mouseReceiver.down.add(mousedown);


  /** @param {MouseEvent} e */
  function mousedown(e) {
    if (e.button == 1) {
      mouseReceiver.moveUp(1, MouseWheelMove(Vector2.difference(vector, [e.clientX, e.clientY]), scale));
    }
  }

  /**
   * @param {number[]} referenceVector
   * @param {number} referenceScale
   * @returns {(e: MouseEvent) => void}
   */
  function MouseWheelMove(referenceVector, referenceScale) {
    return e => setVector(
      Vector2.difference(referenceVector, [e.clientX, e.clientY]),
      [e.clientX, e.clientY],
      scale / referenceScale
    );
  }

}



/**
 * @param {Number} val
 * @param {Number} min
 * @param {Number} max
 */
function limitedToRange(val, min, max) {
  return Math.min(Math.max(val, min), max);
}