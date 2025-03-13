// @ts-check
import * as Vector2 from './vector2.js';
import { MouseReceiver } from './mouse.js';
const [X, Y] = [0, 1];



export class Screen extends MouseReceiver {
  #vector = [0,0];
  #scale = 1;
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
  set vector(vector) {
    this.#vector = vector;
    this.#setTransform();
  }

  get vector() {
    return this.#vector;
  }

  /** @param {Number} scale */
  set scale(scale) {
    this.#scale = scale;
    // this.#setTransform();
  }

  get scale() {
    return this.#scale;
  }

  #setTransform() {
    this.nodeRoot.style.transform = `translate(${this.#vector[X]}px, ${this.#vector[Y]}px) scale(${this.#scale})`;
  }

}



/** @param {Screen} screen */
function HandlingWheel(screen) {
  const MUL_WHEEL = 0.002, MIN = 0.2, MAX = 1.5;
  screen.background.addEventListener('wheel', wheel);


  /** @param {WheelEvent} e */
  function wheel(e) {
    const referenceScale = screen.scale;
    screen.scale = limitedToRange(screen.scale-e.deltaY*MUL_WHEEL, MIN, MAX);

    screen.vector = Vector2.add(
      Vector2.scalarMul([e.clientX, e.clientY], 1-screen.scale/referenceScale),
      Vector2.scalarMul(screen.vector, screen.scale/referenceScale)
    );
  }

}



/** @param {Screen} screen */
function HandlingMouse(screen) {
  screen.mouseDownMap.set(Symbol(), mousedown);


  /** @param {MouseEvent} e */
  function mousedown(e) {
    if (e.button == 1) {
      screen.mouseMoveUp(1, MouseWheelMove(Vector2.difference(screen.vector, [e.clientX, e.clientY])));
    }
  }

  /** @param {number[]} reference */
  function MouseWheelMove(reference) {
    /** @param {MouseEvent} e */
    return e => screen.vector = Vector2.difference(reference, [e.clientX, e.clientY]);
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