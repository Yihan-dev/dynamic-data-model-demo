// @ts-check
import * as Vector2 from './vector2.js';
import { MouseReceiver } from './mouse.js';
const [X, Y] = [0, 1];



export class Screen extends MouseReceiver {
  screenVector = [0,0];
  screenScale = 1;
  nodeRoot = document.createElement('div');


  constructor() {
    const background = document.createElement('div');
    super(background);
    this.background = background;
    background.classList.add('screen');
    this.background.appendChild(this.nodeRoot);

    this.nodeRoot.style.transformOrigin = 'top left';

    HandlingWheel(this);
    HandlingMouse(this);
  }


  /** @param {Number[]} vector */
  setScreenVector(vector) {
    this.screenVector = vector;
    this.#setTransform();
  }

  /** @param {Number} scale */
  setScreenScale(scale) {
    this.screenScale = scale;
    this.#setTransform();
  }

  #setTransform() {
    this.nodeRoot.style.transform = `translate(${this.screenVector[X]}px, ${this.screenVector[Y]}px) scale(${this.screenScale})`;
  }

}



/** @param {Screen} screen */
function HandlingWheel(screen) {
  const MUL_WHEEL = 0.001, MIN = 0.2, MAX = 1.5;
  screen.background.addEventListener('wheel', wheel);


  /** @param {WheelEvent} e */
  function wheel(e) {
    const referenceGridCoefficient = screen.screenScale;
    screen.setScreenScale(limitedToRange(screen.screenScale-e.deltaY*MUL_WHEEL, MIN, MAX));

    screen.setScreenVector(Vector2.add(
      Vector2.scalarMul([e.clientX, e.clientY], 1-screen.screenScale/referenceGridCoefficient),
      Vector2.scalarMul(screen.screenVector, screen.screenScale/referenceGridCoefficient)
    ));
  }

}



/** @param {Screen} screen */
function HandlingMouse(screen) {
  screen.mouseDownMap.set(Symbol(), mousedown);


  /** @param {MouseEvent} e */
  function mousedown(e) {
    if (e.button == 1) {
      screen.mouseMoveUp(1, MouseWheelMove(Vector2.difference(screen.screenVector, [e.clientX, e.clientY])));
    }
  }

  /** @param {number[]} reference */
  function MouseWheelMove(reference) {
    /** @param {MouseEvent} e */
    return e => screen.setScreenVector(Vector2.difference(reference, [e.clientX, e.clientY]));
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