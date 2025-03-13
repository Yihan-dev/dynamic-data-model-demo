// @ts-check
import * as Node from './structure.js';
import { Screen } from './screen.js';
import { calcFunctionNode } from './function.js';



oncontextmenu = e => e.preventDefault();

{
  const main = document.createElement('main');
  document.body.appendChild(main);

  const screen = new Screen();

  const box = document.createElement('div');
  box.classList.add('box');
  box.innerText = '1111';
  screen.nodeRoot.appendChild(box);

  const box2 = document.createElement('div');
  box2.classList.add('box');
  screen.nodeRoot.appendChild(box2);

  main.appendChild(screen.background);
}



const parameter = {
  상수 : 0,
  환경변수 : 1,
  함수변수 : 2,
  관계 : 3,
  subjectState : 4,
  subjectOrganization : 5,
  subjectTerrain : 6,
  objectState : 7,
  objectOrganization : 8,
  objectTerrain : 9,
}
const state = {
  함수변수 : 0,
  subjectState : 1,
  objectState : 2,
}



{
  const 상수 = [10];
  const 환경변수 = [];
  const 관계 = [];

  console.log(calcFunctionNode(
    new Node.Function(0, [
      new Node.Assignment('/=', state.subjectState, 0,
        new Node.Val(parameter.상수, 0)
      )
    ]),
    상수, 환경변수, 관계, new Node.UnitData([1], [], []), new Node.UnitData([], [], [])
  ))
}

{
  const 상수 = [2, 4, 2, 1];
  const 환경변수 = [];
  const 관계 = [];

  console.log(calcFunctionNode(
    new Node.Function(0, [
      new Node.Assignment('=', state.subjectState, 0,
        new Node.Calc('+', [
          new Node.Calc('*', [
            new Node.Val(parameter.상수, 0),
            new Node.Func('inverse', new Node.Val(parameter.상수, 1))
          ]),
          new Node.Val(parameter.상수, 2),
          new Node.Func('negativ', (new Node.Val(parameter.상수, 3)))
        ])
      )
    ]),
    상수, 환경변수, 관계, new Node.UnitData([], [], []), new Node.UnitData([], [], [])
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
 * subjectState // State, 함수의 결과로 재정의가능
 * subjectOrganization
 * subjectTerrain
 *
 * 관계 // 거리 등
 * objectState // State, 함수의 결과로 재정의가능
 * objectOrganization
 * objectTerrain
 */



// 대인공격 = subject.Organization.대인공격력 * object.Organization.대인피해율
// 대물공격 = subject.Organization.대물공격력 * object.Organization.대물피해율
// 내구력유지율 = subject.Organization.최대내구력 / subject.State.내구력
// 행동력유지율 = subject.Organization.최대행동력 / subject.State.행동력
// 공격 = (대인공격 + 대물공격) * 내구력유지율 * 행동력유지율

// 방어력 = object.Organization.방어력 * object.Terrain.방어계수
// 돌파력 = subject.Organization.돌파력 * object.Terrain.공격계수
// 방어 = (방어력 > 돌파력)? (방어력 - 돌파력) : 0

// 피해 = (공격 > 방어)? (공격 - 방어) : 0

// 조직력피해계수 = (subject.Organization.장갑 > object.Organization.관통)? 2 : 0.5

// object.State.내구도 -= 피해
// object.State.조직력 -= 피해 * 조직력피해계수



// 대인공격 = mul[subject.Organization.대인공격력, object.Organization.대인피해율]
// 대물공격 = mul[subject.Organization.대물공격력, object.Organization.대물피해율]
// 내구력유지율 = mul[subject.Organization.최대내구력, inverse(subject.State.내구력)]
// 행동력유지율 = mul[subject.Organization.최대행동력, inverse(subject.State.행동력)]
// 공격 = mul[add[대인공격, 대물공격], 내구력유지율, 행동력유지율]

// 방어력 = mul[object.Organization.방어력, object.Terrain.방어계수]
// 돌파력 = mul[subject.Organization.돌파력, object.Terrain.공격계수]
// 방어 = (방어력 > 돌파력)? add[방어력, negativ(돌파력)] : 0

// 피해 = (공격 > 방어)? add[공격, negativ(방어)] : 0

// 조직력피해계수 = (subject.Organization.장갑 > object.Organization.관통)? 2 : 0.5

// object.State.내구도 -= 피해
// object.State.조직력 -= mul[피해, 조직력피해계수]



// 대인공격력
// 대물공격력

// 대인비율
// 대물비율

// 장갑
// 관통

// 방어력
// 돌파력

// 최대조직력
// 최대내구력
// 최대행동력



// 조직력
// 내구력
// 행동력