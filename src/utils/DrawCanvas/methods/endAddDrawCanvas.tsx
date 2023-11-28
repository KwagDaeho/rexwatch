interface pointType {
  X: number;
  Y: number;
}

export const endAddDrawCanvas = (
  LastPoints: pointType[],
  RoiInfo,
  roiCode,
  setAreaData,
) => {
  LastPoints.pop();
  const Areas = [
    {
      Area: {
        PointCount: LastPoints.length,
        Points: LastPoints.map((point) => {
          point.X = Number((point.X / 1440).toFixed(3));
          point.Y = Number((point.Y / 810).toFixed(3));
          return point;
        }),
      },
    },
  ];
  let newRoi: any = {
    ROICode: roiCode,
    AreaCount: Areas.length,
    Areas: Areas,
  };
  if (roiCode === 52 || roiCode === 55 || roiCode === 56 || roiCode === 57) {
    // 객체 검출 / 차량 트리거 / 진입 / 진출
  } else if (roiCode === 53 || roiCode === 54) {
    // 배회 / 침입
    newRoi.EventTime = 10; // 1 ~ 1800 (초), Input 값으로 입력받아야함.
  }
  if (confirm('변경된 내용(영역 정보)을 저장하시겠습니까?')) {
    alert('확인(예)을 누르셨습니다.\n영역정보를 저장합니다.');
    let newRoiInfo = Array.from(RoiInfo);
    newRoiInfo.push(newRoi);
    const newAreaData = { ROIs: newRoiInfo };
    setAreaData(newAreaData);
  } else {
    alert('취소(아니오)를 누르셨습니다.\n새로운 영역 정보를 초기화합니다.');
  }
};
