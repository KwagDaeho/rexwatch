import { atom } from 'recoil';

export const tokenState = atom({
  key: 'token', // 전역적으로 고유한 값
  default: '', // 초깃값
});

export const LogoutTimeState = atom({
  key: 'logoutTime',
  default: '',
});

export const userState = atom({
  key: 'user', // 전역적으로 고유한 값
  default: [], // 초깃값
});

export const isDarkModeState = atom({
  key: 'isDarkMode', // 전역적으로 고유한 값
  default: false, // 초깃값
});

export const countState = atom<number>({
  key: 'CountState', // 전역적으로 고유한 값
  default: 0, // 초깃값
});

export const numberState2 = atom<number>({
  key: 'numberstate2',
  default: 5,
});

export const clickedCameraNumberState = atom({
  key: 'clickedList',
  default: ['CAM01'],
});

export const changeStatusState = atom({
  key: 'changeStatusState',
  default: {
    addStatus: false,
  },
});

export const modalOpenState = atom({
  key: 'modalOpenState',
  default: {
    editModal: false,
    registerModal: false,
    settingModal: false,
    addUserModal: false,
    signOutModal: false,
    changePasswordModal: false,
    autoSignOutModal: false,
    complateMessageModal: false,
    deleteComplateMessageModal: false,
  },
});

export const lastAddedCameraNumberState = atom({
  key: 'lastAddedCameraNumberState',
  default: null,
});

export const clickedItemDataState = atom({
  key: 'clickedItemData',
  default: null,
});

export const cameraNameState = atom({
  key: 'cameraNameState',
  default: null,
});

export const cameraListDataState = atom({
  key: 'cameraListDataState',
  default: null,
});

export const selectedIndexState = atom<number>({
  key: 'selectedIndexState',
  default: 0,
});

export const tabIndexState = atom<number>({
  key: 'tabIndexState',
  default: 0,
});

export const settingModalDataState = atom({
  key: 'settingModalDataState',
  default: {
    DateTimeVisible: 0,
    DetectAreaVisible: 0,
    ObjectAreaVisible: 0,
    ObjectIdVisible: 0,
    ObjectScoreVisible: 0,
    ObjectSpeedVisible: 0,
  },
});

export const selectedChannelState = atom({
  key: 'selectedChannelState',
  default: null,
});

export const cameraCountState = atom({
  key: 'cameraCountState',
  default: 0,
});

export const selectedSettingChannelState = atom({
  key: 'selectedSettingChannelState',
  default: 1,
});

export const areaListState = atom({
  key: 'areaState',
  default: [],
});

export const refreshState = atom({
  key: 'refreshState',
  default: 0,
});

export const loadingState = atom({
  key: 'loadingState',
  default: { register: false, delete: false },
});

export const errorMessageState = atom({
  key: 'errorMessageState',
  default: '',
});

export const editPointsState = atom({
  key: 'editPointsState',
  default: [],
});

export const buttonDisabledState = atom({
  key: 'buttonDisabledState',
  default: false,
});

export const inputValidState = atom({
  key: 'inputValidState',
  default: {
    CameraID: false,
    IP: false,
    LicenseKey: false,
    Name: false,
    RtspID: false,
    RtspPW: false,
    RtspPort: false,
    RtspUri: false,
  },
});

export const helperTextState = atom({
  key: 'helperTextState',
  default: {
    CameraID: '',
    IP: '',
    LicenseKey: '',
    Name: '',
    RtspID: '',
    RtspPW: '',
    RtspPort: '',
    RtspUri: '',
  },
});

export const confirmPopupState = atom({
  key: 'confirmPopupState',
  default: {
    infoDeleteButton: false,
    infoEditButton: false,
    osdSaveButton: false,
    infoRegisterButton: false,
    algorithmEditButton: false,
    restartButton: false,
    reBootButton: false,
    moduleSaveButton: false,
  },
});

export const alertPopupState = atom({
  key: 'alertPopupState',
  default: {
    infoDeleteButton: false,
    infoEditButton: false,
    osdSaveButton: false,
    infoRegisterButton: false,
  },
});

export const inputErrorState = atom({
  key: 'inputErrorState',
  default: {
    CameraID: false,
    IP: false,
    LicenseKey: false,
    Name: false,
    RtspID: false,
    RtspPW: false,
    RtspPort: false,
    RtspUri: false,
  },
});

export const cameraIdErrorState = atom({
  key: 'cameraIdErrorState',
  default: false,
});
export const ipErrorState = atom({
  key: 'ipErrorState',
  default: false,
});
export const licenseKeyErrorState = atom({
  key: 'licenseKeyErrorState',
  default: false,
});
export const cameraNameErrorState = atom({
  key: 'cameraNameErrorState',
  default: false,
});
export const rtspIdErrorState = atom({
  key: 'rtspIdErrorState',
  default: false,
});
export const rtspPwErrorState = atom({
  key: 'rtspPwErrorState',
  default: false,
});
export const rtspPortErrorState = atom({
  key: 'rtspPortErrorState',
  default: false,
});
export const rtspUriErrorState = atom({
  key: 'rtspUriErrorState',
  default: false,
});
export const notChangedMessageState = atom({
  key: 'notChangedMessageState',
  default: false,
});
export const selectedListIndexState = atom({
  key: 'selectedListIndexState',
  default: null,
});
export const moduleBoardNumErrorState = atom({
  key: 'moduleBoardNumErrorState',
  default: false,
});
export const moduleMacNumberErrorState = atom({
  key: 'moduleMacNumberErrorState',
  default: false,
});
export const moduleIpAddressErrorState = atom({
  key: 'moduleIpAddressErrorState',
  default: false,
});
export const moduleSubnetMaskErrorState = atom({
  key: 'moduleSubnetMaskErrorState',
  default: false,
});
export const moduleGatwayErrorState = atom({
  key: 'moduleGatwayErrorState',
  default: false,
});

export const moduleRtspUriErrorState = atom({
  key: 'moduleRtspUriErrorState',
  default: false,
});

export const moduleWebRTCUriErrorState = atom({
  key: 'moduleWebRTCUriErrorState',
  default: false,
});

export const moduleVersionErrorState = atom({
  key: 'moduleVersionErrorState',
  default: false,
});

export const moduleSettingDataState = atom({
  key: 'moduleSettingDataState',
  default: {
    BoardNum: 0,
    Command: '',
    DEBUG_FLOAT: '',
    DEBUG_INT: '',
    OperationMode: '',
    Port: '',
    RequestID: '',
    MAC: '',
    IP: '',
    SubnetMask: '',
    GateWay: '',
    RTSP_Uri: '',
    WebRTC_Uri: '',
    Version: '',
  },
});

export const parameterSettingDataState = atom({
  key: 'parameterSettingDataState',
  default: null,
});

export const localAreaDataState = atom({
  key: 'localAreaDataState',
  default: { ROIs: [], Command: -1 },
});
