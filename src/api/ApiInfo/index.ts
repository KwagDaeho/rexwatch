// import useSwrApiNew from '..';

// const {
//   data: boardInfoRequest,
//   isLoading,
//   isError,
// } = useSwrApiNew('http://192.168.0.200:8080/query', 1);

// export const boardInfoData = boardInfoRequest;
// export const BoardInfoData = () => {

//   const data = result;
//   return data;
// };

// 현재 요청 API 만 정상적으로 부르는 중, 설정 API 는 코드 수정이 필요

// 3.1	보드정보 요청 (BoardInfoRequest : 1)

export const defaultModuleData = {
  BoardNum: 0,
  Command: 101,
  DEBUG_FLOAT: 112.5,
  DEBUG_INT: 334,
  FtpID: 'rex',
  FtpPW: '1',
  FtpPort: 22,
  GateWay: '192.168.0.1',
  IP: '192.168.0.200',
  LicenseKey: 'ABCE5E960EE974C1',
  MAC: '[eth0] 48:B0:2D:51:20:36',
  OperationMode: 1,
  Port: 6884,
  RequestID: '6b30886d-6c00-45c2-8c25-65946fc07c61',
  RtspID: 'admin',
  RtspPW: 'rex6885',
  RtspPort: 8554,
  RtspUrl: '',
  SubnetMask: '255.255.255.0',
  Version: '4.1.0',
  XavierVersion: '4.6',
};

// 3.2	보드정보 설정 (BoardSetup: 2)

// Command	Number(Integer)	명령코드
// BoardNum	Number(Integer)	보드번호

// 3.3	채널 정보 요청 (ChannelRequest: 3)

{
  CameraCount: 1;
  Cameras: [
    {
      CameraID: 1,
      Channel: 1,
      IP: '192.168.0.201',
      LicenseKey: 'ABCE5E960EE974C1',
      MapCoordinate: { Latitude: 336.123457, Longitude: 44.123457 },
      Name: '테스트1',
      Number: 1,
      RtspID: 'root',
      RtspPW: 'root',
      RtspPort: 554,
      StreamCount: 1,
      Streams: [{ Number: 1, Thermal: 0, URL: 'video1s1' }],
    },
  ];
  Command: 103;
  RequestID: '7d043df1-2f1c-4678-9a83-2355536695ee';
}

// 3.4	채널정보 설정 (ChannelSetup: 4)

// Command	Number(Integer)	명령코드
// Channel	Number(Integer)	채널
// Operation	Number(Integer)	1 : 추가/변경, 2 : 삭제
// LicenseKey	String	라이선스 키
// CameraID	String	카메라 ID
// Name	String	명칭
// IP	String	TCP IP
// URL	String	RTSP URL

// 3.5	검지 영역 정보 요청 (AreaRequest: 5)

// Command	Number(Integer)	명령코드
// Channel	Number(Integer)	채널

// 3.6	검지 영역 정보 설정 (AreaSetup: 6)

// 3.7	알고리즘 정보 요청 (AlgorithmRequest: 7)

// Command	Number(Integer)	명령코드
// Channel	Number(Integer)	채널

{
  AckNak: true;
  AutoReleaseEvent: false;
  BasicRegionCountingCommonRoad: true;
  CameraFPS: 15;
  Channel: 1;
  CheckingCountingForObjHistory: true;
  CheckingYPosition: 1;
  Command: 107;
  DecisionAppearPedEventTime: 5;
  DecisionIntrusionEventTime: 1;
  DecisionLoiteringEventTime: 5;
  DecisionStopDistance: 0.25;
  DecisionStopEventTime: 5;
  DecisionWrongWayEventTime: 2.5;
  DeleteObjectCount: 100000;
  DeletePedestrianNearVehicle: false;
  DeletePedestrianOutsideCrosswalkRegion: true;
  DeleteVehicleUpsideVehicle: false;
  DetectionThreshold: 0.4000000059604645;
  EvaluationMode: false;
  EventDeleteTIme: 15;
  EventSearchingWindow: 0.25;
  HeightOfDecisionWrongWayObject: 20;
  IgnoreMinHeight: 6;
  IgnorePedestrianIOU: 0.15000000596046448;
  IgnorePedestrianSpeed: 10;
  IgnoreUpsideVehicleIOU: 0.10000000149011612;
  LPRestoreHeightMargin: 0.05000000074505806;
  LPRestoreWidthMargin: 0.05000000074505806;
  MaximumEventID: 950;
  MaximumObjectID: 950;
  MinimumOutSideCount: 10;
  MovingObjectUsingTime: false;
  NakCode: 0;
  NeedCheckingTriggeredData: false;
  NumberOfCheckingData: 10;
  ObjectMovingDistance: 5;
  ObjectTypeCountingOutside: false;
  PedestrianAttributeHeightMargin: 0.05000000074505806;
  PedestrianAttributeWidthMargin: 0.05000000074505806;
  PredictionMode: false;
  RealCameraHeight: 9;
  RecheckPedAttribute: false;
  RecheckPedAttributeTime: 5;
  RequestID: '7d55dc88-fdbf-4c6e-9b0b-f4c31b9f42d2';
  TrackObjectDeleteCount: 5;
  TrackerSigmaIOU: 0.4000000059604645;
  UsedLicencePlateDetection: false;
  UsedLicencePlateRestore: false;
  UsedObjectTimeDifferForTrafficEvent: true;
  UsedPassEventInsideIgnore: true;
  UsedRoadDistanceBasedBottom: true;
  UsedSoftNMSMode: false;
  UsedVehicleAttributeForMotorcycle: true;
  UsedWeightObjectType: false;
  VehicleAttributeHeightMargin: 0.05000000074505806;
  VehicleAttributeWidthMargin: 0.05000000074505806;
  VehicleTriggeredTime: 1;
  WrongWaySpeed: 7.5;
}

// 3.8	알고리즘 정보 설정 (AlgorithmSetup: 8)

// Command	Number(Integer)	명령코드
// Channel	Number(Integer)	채널
// PredictionMode	Boolean	// 예측 모드 사용 : false (false : IOU Tracker, True : SORT Tracker)
// UsedSoftNMSMode	Boolean	 // SoftNMS 사용 : false
// EvaluationMode	Boolean	 // 시험 모드 Detection ROI 나가면 객체 삭제 (For SmartCCTV) : false
// RecheckPedAttribute	Boolean	 // 보행자 속성 재확인 : false;
// DeletePedestrianNearVehicle	Boolean	 // 차량 근접 보행자 오검지 방지를 위한 삭제 : false
// DeleteVehicleUpsideVehicle	Boolean	// 현재 차량의 윗부분 짐칸의 오검출 발생시 삭제 여부 : false
// BasicRegionCountingCommonRoad	Boolean	// 공용차로에서 출발한 차량 추적이 끊겼을 때 무조건 직진으로 Counting (false == counting 안함)  : true
// ObjectTypeCountingOutside	Boolean	// 검지영역 외부로 이동 후 객체의 종류 counting 초기화 여부 : false
// UsedRoadDistanceBasedBottom	Boolean	// 도로 Calibration 당시 최하단의 좌표를 기준점으로 판단(RunRoadCalibration 호출 이전 설정) : true (false 일 경우 최상단을 기준점으로 적
// CheckingCountingForObjHistory	Boolean	// 통행량 측정이 완료된 객체만 CallBack : true
// UsedVehicleAttributeForMotorcycle	Boolean	 // 오토바이를 차량 속성으로 인식 : true (false 면 보행자 속성)
// UsedObjectTimeDifferForTrafficEvent	Boolean	 // 객체의 이벤트 후보처리에 시간 사용 : true
// UsedLicencePlateDetection	Boolean	// GPU License Plate Detection 사용 : true
// UsedLicencePlateRestore	Boolean	 // GPU License Plate Restore 사용 : true (LPD 초기화 및 사용으로 검출이 된 경우)
// UsedPassEventInsideIgnore	Boolean	// 제외영역 내부 객체에서 이벤트 발생 안함 : true
// UsedWeightObjectType	Boolean	// 객체 Type 분류에 가중치 적용 : false (vfObjectTypeWeightFactor_ 가중치 사용)
// NeedCheckingTriggeredData	Boolean	 // Checking Trigger Data
// DeletePedestrianOutsideCrosswalkRegion	Boolean	// 보행자의 경우 검지영역 외부로 나가면 보행자 삭제 : true
// AutoReleaseEvent	Boolean	// 영역변경 및 정지 후 이동 차량 이벤트 자동 해제 : 객체 중복 이벤트 필요시 : false
// IgnoreMinHeight	Number(float)	// 객체 최소 높이(pixel) : 6
// DeleteObjectCount	Number(float)	// 최대 저장 검출 영역 : 100,000
// TrackObjectDeleteCount	Number(float)	 // 추적 실패 횟수 : 5
// ObjectMovingDistance	Number(float)	// 객체 최소 이동 거리(Road Calibration 필수) : 5
// CameraFPS	Number(float)	 // Camera Average FPS : 15
// MaximumObjectID	Number(float)	// Object ID 최대 범위 : 950
// MaximumEventID	Number(float)	// Event ID 최대 범위 : 950
// MinimumOutSideCount	Number(float)	 // 스마트 교차로 검지영역 외부 추적 최소 Counting : 10
// NumberOfCheckingData	Number(float)	 // SmartCCTV Auto Calibration Checking Data : 10
// TrackerSigmaIOU	Number(float)	 // 객체 추적 Threshold : 0.4
// DetectionThreshold	Number(float)	// 객체 검출 Threshold : 0.4
// DecisionStopEventTime	Number(float)	// 이벤트 판단 시간 : 5.0 sec ( 정지 시간 )
// DecisionAppearPedEventTime	Number(float)	 // 이벤트 판단 시간 : 5.0 sec ( 보행자 시간 )
// DecisionLoiteringEventTime	Number(float)	// 이벤트 판단 시간 : 5.0 sec ( 배회 시간 )
// DecisionIntrusionEventTime	Number(float)	 // 이벤트 판단 시간 : 1.0 sec ( 침입 )
// DecisionWrongWayEventTime	Number(float)	 // 이벤트 판단 시간 : 2.5 sec ( 역주행 )
// DecisionStopDistance	Number(float)	// 이벤트 판단 거리 : 0.25
// WrongWaySpeed	Number(float)	 // 역주행 기준 속도 : 7.5
// EventDeleteTIme	Number(float)	// 이벤트 리스트에서 삭제 시간 : 15 초
// EventSearchingWindow	Number(float)	 // 이벤트 검색 범위 : 0.25f
// RealCameraHeight	Number(float)	// Camera 실제 높이 : 15.0 m ( m 단위)
// CameraPitch	Number(float)	// Camera Pitch
// IgnorePedestrianIOU	Number(float)	 // 보행자 차량근처 보행자 제거 겹침 정도 : 0.15 pixel
// IgnorePedestrianSpeed	Number(float)	// 속도를 이용한 보행자 제거  : 10 km/h
// IgnoreUpsideVehicleIOU	Number(float)	 // 차량위(짐칸) 차량 검출 제거 겹침 정도 : 0.10 pixel
// HeightOfDecisionWrongWayObject	Number(float)	// 역주행 객체 최소 크기 : 20
// CheckingYPosition	Number(float)	// 영역 판단 Y 축 위치 Position : 1.0
// VehicleTriggeredTime	Number(float)	 // 차량번호 인식 trigger time : 1.0f = fTriggeredTime_ *
// RecheckPedAttributeTime	Number(float)	 // 보행자 속성 재확인 시간 간격(단위 초) : 5.0 (second)
// PedestrianAttributeWidthMargin	Number(float)	 // Pedestrian Attribute Width Margin : 0.05
// PedestrianAttributeHeightMargin	Number(float)	 // Pedestrian Attribute Height Margin : 0.05
// VehicleAttributeWidthMargin	Number(float)	 // Vehicle Attribute Width Margin : 0.05
// VehicleAttributeHeightMargin	Number(float)	// Vehicle Attribute Height Margin : 0.05
// LPRestoreWidthMargin	Number(float)	 // LPRestore Width Margin : 0.05
// LPRestoreHeightMargin	Number(float)	// LPRestore Height Margin : 0.05

// 3.9	영상 오버레이 설정 (VideoInfoRequest: 9)
{
  Command: 109;
  OSD: {
    DateTimeVisible: 0;
    DetectAreaVisible: 0;
    ObjectAreaVisible: 0;
    ObjectIdVisible: 0;
    ObjectScoreVisible: 0;
    ObjectSpeedVisible: 0;
  }
  RequestID: '59a422cb-8f9c-4a50-8ee6-b879fd3ed162';
}

// 3.10	채널정보 설정 (VideoSetup: 10)

// Command	Number(Integer)	명령코드
// OSD	DateTimeVisible	Number(Integer)	1 : 추가/변경, 2 : 삭제
// 	DetectAreaVisible	Number(Integer)	라이선스 키
// 	ObjectAreaVisible	Number(Integer)	카메라 ID
// 	ObjectIdVisible	Number(Integer)	명칭
// 	ObjectSpeedVisible	Number(Integer)	TCP IP
//	ObjectScoreVisible	Number(Integer)	RTSP URL

// 3.11	보드 운영 모드 설정 (BoardOperationModeSetup: 11)

// Command	Number(Integer)	명령코드
// OperationMode	Number(Integer)	운영모드( 0: 테스트 1: 운영, 2: 시험시작, 3: 시험종료, 4: 영상녹화)

// 3.12	시간 정보 요청 (DateTimeRequest: 12)
{
  Command: 112;
  RequestID: '99d65aca-81de-42c7-ad3a-60b9278c15ca';
  SetDateTime: '2023-08-03 19:33:06';
}

// 3.13	시간 정보 설정 (DateTimeSetup: 13)

// Command	Number(Integer)	명령코드
// SetDateTime	String	2021-12-22 15:54:00

// 3.14	보드 제어 명령 (BoardControl: 14)

// Command	Number(Integer)	명령코드
// ControlType	Number(Integer)	1: ReStart, 2: ReBoot

// 3.15	알고리즘 기반 정보 요청 (AlgorithmBaseRequest: 15)

// Command	Number(Integer)	명령코드
// Channel	Number(Integer)	채널

// 3.16	알고리즘 기반 정보 설정 (AlgorithmBaseSetup: 16)

// Command	Number(Integer)	명령코드
// Channel	Number(Integer)	채널
// Model	String	모델명
// - MD_RoadKill_2111.IHCNN
// - MD_Security_2108.IHCNN
// - MD_SignalExam_2111.IHCNN
// - MD_Traffic_2108.IHCNN
// - 직접 입력
// PerformanceMode	Number(Integer)	// Performance Mode 관련
// // Speed : 객체 검출 처리속도
// // Performance : 객체 검출 성능은 원거리와 겹쳐진 객체 성능을 뜻함.

// 1 : 최고 처리속도 모드
// 2 : 처리속도 향상 모드
// 3 : 기본 벨런스 모드 (기본)
// 4 : 성능 향상 모드
// 5 : 최고 성능향상 모드

// 3.17	이벤트 검지 시간대 요청 (EventTimeInfoRequest: 17)

// Command	Number(Integer)	명령코드
// Channel	Number(Integer)	채널

// 3.18	이벤트 검지 시간대 설정 (EventTimeInfoSetup: 18)

// Command	Number(Integer)	명령코드
// Channel	Number(Integer)	채널
// TimeUsed	Number(Integer)	이벤트 발생 시간대

// 3.19	채널 리셋 (ResetChannel: 19)

// Command	Number(Integer)	명령코드
// Channel	Number(Integer)	채널

// 이벤트상황 강제 생성 (TestingForcedEventSet : 800)

// 제품 최초 설치 시 테스트 목적으로 관련 이벤트 강제 생성
// 키	타입	설명
// Command	Integer	명령코드
// Channel	Integer	카메라 번호
// ReleaseTime	Integer	해체 시간(초 단위)

// 보드 설정 파일 요청 (TestingGetConfigureRequest: 801)

// 보드 설정 파일(configure.ini)을 UI 상으로 볼 수 있도록 요청
// 키	타입	설명
// Command	Integer	명령코드
// Type	Integer	0: 보드, 1: 장치, 2: 채널
// Channel	Integer	2(채널)인 경우,
// 채널 번호, 그 외 0

// 보드 설정 파일 요청 응답 (TestingGetConfigureResponse: 802)

// 보드 설정 파일(configure.ini) 전송
// 키	타입	설명
// Command	Integer	명령코드
// Type	Integer	0: 보드, 1: 카메라, 2: 장치
// Data	String	Configure.ini 파일 데이터

// 보드 설정 파일 전송 (TestingSetConfigure: 803)

// UI 상으로 수정된 보드 설정 파일(configure.ini)을 전송 (응답 없음)
// 키	타입	설명
// Command	Integer	명령코드
// Type	Integer	0: 보드, 1: 장치, 2: 카메라
// Channel	Integer	2(카메라)인 경우,
// 카메라 번호, 그 외 0
// Data	String	Configure.ini 파일 데이터
