import { describe, expect, test } from "@jest/globals";
import { arraySum } from "./page";
// 각 메소드는 실행 순서에 따라 정렬하였음
// 각 before, after 및 Each가 어디에서 실행되는지 반드시 알아둘 것
beforeAll(() => console.log("1 - beforeAll"));
beforeEach(() => console.log("1 - beforeEach"));
test("", () => console.log("1 - test 1.1"));
test("", () => console.log("1 - test 1.2"));
afterEach(() => console.log("1 - afterEach"));

describe("Describe some module HERE.", () => {
  beforeAll(() => console.log("Inner - beforeAll"));
  beforeEach(() => console.log("Inner - beforeEach"));
  test("1+2+3 = 6", () => {
    console.log("Inner - test 2.1");
  });
  test("1+2+3 = 6", () => {
    console.log("Inner - test 2.2");
  });
  afterEach(() => console.log("Inner - afterEach"));
  afterAll(() => console.log("Inner - afterAll"));
});

afterAll(() => console.log("1 - afterAll"));
describe("arraySum module (Test Module)", () => {
  test("1+2+3 = 6", () => {
    console.log("Inner - test Module");
    expect(arraySum([1, 2, 3])).toEqual(1 + 2 + 3);
  });
});
