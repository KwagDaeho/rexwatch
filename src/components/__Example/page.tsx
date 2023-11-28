// 'use client';

// Props의 Type 선언
interface PropsType {
  num1?: number;
  num2?: number;
  num3?: number;
}

export const arraySum = (arrNum: number[]) => {
  return arrNum.reduce((acc, curr) => acc + curr, 0);
};

const Example = ({ num1 = 1, num2 = 2, num3 = 3 }: PropsType) => {
  return (
    <>
      <div>
        {num1}+{num2}+{num3} = {num1 + num2 + num3}
      </div>
    </>
  );
};

export default Example;
