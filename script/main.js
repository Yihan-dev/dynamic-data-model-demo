// @ts-check
import * as Node from './structure.js';
import { calcFunctionNode } from './function.js';



const parameter = {
  상수 : 0,
  환경변수 : 1,
  함수변수 : 2,
  주체상태 : 3,
  주체편제 : 4,
  주체지형 : 5,
  관계 : 6,
  대상상태 : 7,
  대상편제 : 8,
  대상지형 : 9,
}
const state = {
  함수변수 : 0,
  주체상태 : 1,
  대상상태 : 2,
}



{
  const 상수 = [10];
  const 환경변수 = [];
  const 주체상태 = [1];
  const 주체편제 = [];
  const 주체지형 = [];
  const 관계 = [];
  const 대상상태 = [];
  const 대상편제 = [];
  const 대상지형 = [];

  console.log(calcFunctionNode(
    new Node.Function([
      new Node.Assignment('/=', state.주체상태, 0, new Node.Val(parameter.상수, 0))
    ], 0),
    상수, 환경변수, 주체상태, 주체편제, 주체지형, 관계, 대상상태, 대상편제, 대상지형
  ))
}

{
  const 상수 = [2, 4, 2, 1];
  const 환경변수 = [];
  const 주체상태 = [];
  const 주체편제 = [];
  const 주체지형 = [];
  const 관계 = [];
  const 대상상태 = [];
  const 대상편제 = [];
  const 대상지형 = [];

  console.log(calcFunctionNode(
    new Node.Function([
      new Node.Assignment('=', state.주체상태, 0,   new Node.Calc('+', [
        new Node.Calc('*', [
          new Node.Val(parameter.상수, 0),
          new Node.Func('inverse', new Node.Val(parameter.상수, 1))
        ]),
        new Node.Val(parameter.상수, 2),
        new Node.Func('negativ', (new Node.Val(parameter.상수, 3)))
      ]))
    ], 0),
    상수, 환경변수, 주체상태, 주체편제, 주체지형, 관계, 대상상태, 대상편제, 대상지형
  ))
}



// const [a, b, c] = [1, 2, 3];

// console.log(getNumberByNode(
//   new Node.Conditional(
//     new Node.Not(
//       new Node.Logic('and', [
//         new Node.Comparison('<',
//           new Node.Val(a),
//           new Node.Val(b)
//         ),
//         new Node.Comparison('<',
//           new Node.Val(b),
//           new Node.Val(c)
//         ),
//       ]),
//     ),
//     new Node.Val(1),
//     new Node.Val(0)
//   )
// ));



/** 맥락 Number[][]
 * 상수
 * 환경변수
 * 함수변수 // 함수의 실행과정에서 동적으로 정의
 *
 * 주체상태 // 상태, 함수의 결과로 재정의가능
 * 주체편제
 * 주체지형
 *
 * 관계 // 거리 등
 * 대상상태 // 상태, 함수의 결과로 재정의가능
 * 대상편제
 * 대상지형
 */



// 대인공격 = subject.편제.대인공격력 * object.편제.대인피해율
// 대물공격 = subject.편제.대물공격력 * object.편제.대물피해율
// 내구력유지율 = subject.편제.최대내구력 / subject.상태.내구력
// 행동력유지율 = subject.편제.최대행동력 / subject.상태.행동력
// 공격 = (대인공격 + 대물공격) * 내구력유지율 * 행동력유지율

// 방어력 = object.편제.방어력 * object.지형.방어계수
// 돌파력 = subject.편제.돌파력 * object.지형.공격계수
// 방어 = (방어력 > 돌파력)? (방어력 - 돌파력) : 0

// 피해 = (공격 > 방어)? (공격 - 방어) : 0

// 조직력피해계수 = (subject.편제.장갑 > object.편제.관통)? 2 : 0.5

// object.상태.내구도 -= 피해
// object.상태.조직력 -= 피해 * 조직력피해계수