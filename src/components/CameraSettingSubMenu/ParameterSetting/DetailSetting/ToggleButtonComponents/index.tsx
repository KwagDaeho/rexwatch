import styled from '@emotion/styled';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';

export const ToggleButtonComponents = () => {
  return (
    <Container>
      <ToggleRadioButtons>
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="시험모드사용 *"
        />
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="예측모드사용"
        />
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="SoftNMS사용"
        />
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="캘리브레이션 기준점 최하단 사용"
        />
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="객체의 이벤트 판단시간 사용"
        />
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="차량 근접 보행자 삭제"
        />
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="차량 짐칸 오검출 삭제"
        />
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="제외영역 내부객체에서 이벤트 발생 안함"
        />
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="외부 이동 보행자 삭제"
        />
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="영역 변경 및 정지 후 이동 차량 이벤트 자동 해제"
        />
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="보행자 속성 재확인"
        />
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="오토바이를 차량 속성으로 인식"
        />
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="객체 외부 이동시 누적된 타입 정보 초기화"
        />
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="객체 종류 분류에 가중치 적용"
        />
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="공용 차로 차량 추적 실패 카운트 처리"
        />
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="통행량 측정이 완료된 객체만 콜백"
        />
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="트리거 교통량 체크 사용"
        />
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="이동량 없어도 최소 검출 시간으로 이동객체 판단"
        />
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="GPU License Plate Detection 사용"
        />
        <Toggle
          control={<Switch size="small" defaultChecked />}
          label="GPU License Plate Restore 사용"
        />
      </ToggleRadioButtons>
    </Container>
  );
};

const Container = styled('div')`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 10px;
`;

const ToggleRadioButtons = styled(FormGroup)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
`;

const Toggle = styled(FormControlLabel)`
  width: 100%;

  &:hover {
    color: #30a9de;
  }
  span {
    font-size: 12px;
    /* span {
    } */
  }
`;
