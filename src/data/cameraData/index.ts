interface ModulePropTypes {
  title: string;
  value?: string | number;
}

interface ManagementPropTypes {
  channel: number;
  camID: number;
  camName: string;
  IP: string;
  PORT: number;
  ID: string;
  Password: string;
  license: string;
  connection: boolean;
}
export const ModuleDummyData: ModulePropTypes[] = [
  { title: '보드번호', value: 0 },
  { title: 'MAC', value: '[eth0] 48:B0:2D:51:20:36' },
  { title: 'IP 주소', value: '192.168.0.200' },
  { title: '서브넷 마스크', value: '255.255.255.0' },
  { title: '게이트웨이', value: '192.168.0.1' },
  { title: '프로그램 버전', value: '4.1.0' },
  { title: 'RTSP URI', value: 'https://123.123.123' },
  { title: 'WebRTC URI', value: 'https://123.123.124' },
];

export const OperationOptions: string[] = [
  '테스트',
  '운영',
  '시험 시작',
  '시험 종료',
  '시험 녹화',
];

export const CameraListHeader: string[] = [
  '채널',
  '카메라 아이디',
  '이름',
  '아이피',
  'RTSP 포트',
  '아이디',
  '비밀번호',
  '라이센스',
  '연결상태',
  '재시작',
];

export const CameraList: ManagementPropTypes[] = [
  {
    channel: 1,
    camID: 11,
    camName: '카메라1',
    IP: '192.168.0.201',
    PORT: 3,
    ID: '123',
    Password: '123123',
    license: 'license',
    connection: true,
  },
  {
    channel: 1,
    camID: 12,
    camName: '카메라2',
    IP: '192.168.0.201',
    PORT: 3,
    ID: '123',
    Password: '123123',
    license: 'license',
    connection: false,
  },
  {
    channel: 1,
    camID: 13,
    camName: '카메라3',
    IP: '192.168.0.201',
    PORT: 3,
    ID: '123',
    Password: '123123',
    license: 'license',
    connection: true,
  },
  {
    channel: 1,
    camID: 14,
    camName: '카메라4',
    IP: '192.168.0.201',
    PORT: 3,
    ID: '123',
    Password: '123123',
    license: 'license',
    connection: false,
  },
];

export const emptyCameraInformation = {
  CameraID: '',
  IP: '',
  LicenseKey: '',
  Name: '',
  RtspID: '',
  RtspPW: '',
  RtspPort: '',
  RtspUri: '',
};
export const cameraSettingSubMenuListData = [
  '알고리즘 파라미터 설정',
  '알고리즘 기반 설정',
  '이벤트 스케줄 설정',
  '검지 영역 설정',
];

export const checkboxData = [
  { name: 'DateTimeVisible', label: '시간 표출 여부' },
  { name: 'DetectAreaVisible', label: '검지 영역 표출 여부' },
  { name: 'ObjectAreaVisible', label: '객체 영역 표출 여부' },
  { name: 'ObjectIdVisible', label: '객체 ID 표출 여부' },
  { name: 'ObjectScoreVisible', label: '객체 속도 표출 여부' },
  { name: 'ObjectSpeedVisible', label: '객체 신뢰도 표출 여부' },
];

export const algorithmInputLabelList = [
  // 각 input 값 어떻게 넣을 지 고민
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 피치' },
  // { key: 'RealCameraHeight', label: '카메라 평균 FPS', },
  // { key: 'RealCameraHeight', label: '객체 ID 최대 범위', },
  // { key: 'RealCameraHeight', label: '이벤트 ID 최대 범위', },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // { key: 'RealCameraHeight', label: '카메라 실제 높이(m)' },
  // ,
  '카메라 실제 높이(m)',
  '카메라 피치',
  '카메라 평균 FPS',
  '객체 ID 최대 범위',
  '이벤트 ID 최대 범위',
  '최대 저장 검출 영역',
  '추적 실패 처리 프레임 수 *',
  '객체 추적 Threshold(IOU) *',
  '객체 검출 Threshold *',
  '객체 최소 높이(Pixel) *',
  '객체 최소 이동 거리(m) *',
  '정지 이벤트 판단 시간(초) *',
  '보행자 이벤트 판단 시간(초) *',
  '역주행 이벤트 판단 시간(초) *',
  '이벤트 판단 거리(m) *',
  '역주행 기준 속도(km/h) *',
  '역주행 객체 최소 크기(Pixel) *',
  '배회 이벤트 판단 시간(초) *',
  '침입 이벤트 판단 시간(초) *',
  '중복 이벤트 시간 조정(초) *',
  '이벤트 검색 범위(m) *',
  '보행자 차량 근처 보행자 제거 겹침 정도(IOU) *',
  '속도를 이용한 보행자 제거(km/h) *',
  '차량 짐칸 검출 제거 겹침 정도(IOU) *',
  '영역 판단 Y축 위치',
  '차량번호인식 트리거 시간',
  '보행자 속성 재확인 시간 간격(초)',
  '보행자 속성 너비 마진',
  '보행자 속성 높이 마진',
  '차량 속성 너비 마진',
  '차량 속성 높이 마진',
  'LPRestore 너비 마진',
  'LPRestore 높이 마진',
  '교차로 검지영역 외부교통량 카운트 최소 프레임 수',
  'SmartCCTV Auto Calibration Checking Data',
];
