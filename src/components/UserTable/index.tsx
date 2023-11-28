'use client';
import { changeStatusState, modalOpenState, tokenState } from '@/recoil/atoms';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import LockResetIcon from '@mui/icons-material/LockReset';
import {
  LogStyledTableBody,
  ScrollableDiv,
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableCellHeader,
  StyledTableHead,
  StyledTableRow,
  StyledTableRowTitle,
  TimeTableCell,
} from '../MuiStyled/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Button } from '@mui/material';
import { AlertModal } from '../AlertModal';
import { EditUserModal } from '../EditUserModal';
import { useSignOut } from '@/utils/useSignOut/useSignOut';
import { AlertDoubleButtonModal } from '../AlertDoubleButtonModal';
import { Tooltip } from 'react-tooltip';

type User = {
  USER_ID: string;
  USER_TYPE: string;
  USER_NAME: string;
  USER_PHONE: string;
  USER_EMAIL: string;
  LAST_LOGIN_DT: string;
  STAT: string;
  ROW_NUM: number;
  LAST_LOGIN_IP: string;
  FAIL_COUNT: number;
};

type JsonResultType = {
  user_list?: User[];
  // 필요한 경우 다른 필드도 추가
};

function UserTable() {
  const [token, setToken] = useRecoilState(tokenState);
  const [editModalOpen, setEditModalOpen] = useRecoilState(modalOpenState);
  const { handleSignOut } = useSignOut();
  const handleClick = () => {
    setEditModalOpen((prevState) => ({ ...prevState, editModal: true }));
  };
  const [userType, setUserType] = useState('ALL');
  const [userStat, setUserStat] = useState('ALL');
  const [changeStat, setChangeStat] = useState('ALL');
  const [addStatus, setAddStatus] = useRecoilState(changeStatusState);

  const [userId, setUserId] = useState('');
  const [pageCnt, setPageCnt] = useState('1000');
  const [pageIdx, setPageIdx] = useState('1');
  const [jsonResult, setJsonResult] = useState<JsonResultType>({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // 선택된 사용자 정보를 저장하기 위한 상태
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [changeStatModalOpen, setChangeStatModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const changeUserStat = async (changeStat: string) => {
    const jsonData = {
      user_id: selectedUser?.USER_ID, // I'm assuming you want to set the user_stat of the selected user
      user_stat: changeStat,
    };

    try {
      const response = await fetch('http://192.168.0.200:8080/api/v1/user/set', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jsonData),
      });

      const result = await response.json();
      if (result.statusCode === 200) {
        setChangeStatModalOpen(false);
        setResultMessage(result.statusText);
        setModalOpen(true);
        handleListClick();
        setSelectedRowId(null);

        setJsonResult(result);
        let is_lock = result.stat === 'L' ? true : false;
      } else if (result.statusCode === 611 || result.statusCode === 613) {
        handleSignOut();
      }
    } catch (err) {
      console.log('[USER][STAT] i/f error=', err);
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    handleClick();
    setUserStat(user.STAT);
  };
  const handlePasswordReset = (userId: string) => {
    const jsonData = {
      user_id: userId,
      user_pw_new: 'Rex6885!@',
    };

    fetch('http://192.168.0.200:8080/api/v1/user/pwreset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('[USER][PWRS] i/f success=', result);
        if (result.statusCode === 200) {
          handleListClick();
          setResultMessage(result.statusText);
          setResetModalOpen(false);
          setModalOpen(true);
          setSelectedRowId(null);
        }

        if (
          result.statusCode === 611 ||
          result.statusCode === 613 ||
          result.statusText === '필수 파라미터가 없습니다. (login_id)'
        ) {
          handleSignOut();
          setModalOpen(false);
        }
      })
      .catch((error) => {
        console.log('[USER][PWRS] i/f error=', error);
        setModalOpen(true);
        setResultMessage(error.statusText);
        if (error.statusCode === 611 || error.statusCode === 613) {
          handleSignOut();
          setModalOpen(false);
        }
      });
  };

  const getTimeZoneOffset = () => {
    const tzOffset = new Date().toTimeString().match(/([\+-]\d{4})/)[0];
    return [tzOffset.slice(0, 3), ':', tzOffset.slice(3)].join('');
  };

  const [resultMessage, setResultMessage] = useState('');
  const handleDelete = (UserId: any) => {
    const tzoffset = getTimeZoneOffset();
    const jsonData = {
      user_id: UserId,
    };

    fetch('http://192.168.0.200:8080/api/v1/user/del', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'tz-offset': tzoffset,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setJsonResult(result);
          setSelectedRowId(null);
          handleListClick();
          setResultMessage(result.statusText);
          setDeleteModalOpen(false);
          setModalOpen(true);
        } else if (
          result.statusCode === 611 ||
          result.statusCode === 613 ||
          result.statusText === '필수 파라미터가 없습니다. (login_id)'
        ) {
          handleSignOut();
          setModalOpen(false);
        }
      })
      .catch((error) => {
        console.log('[JJH][del] i/f error=', error);
        setJsonResult(error);
        setResultMessage(error.statusText);
        setModalOpen(true);
        if (error.statusCode === 611 || error.statusCode === 402) {
          handleSignOut();
          setModalOpen(false);
        }
      });
  };

  const handleListClick = () => {
    const jsonData = {
      user_type: userType,
      user_stat: 'ALL',
      user_id: userId,
      page_cnt: pageCnt,
      page_idx: pageIdx,
    };

    fetch('http://192.168.0.200:8080/api/v1/user/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        setJsonResult(data);

        if (
          data.statusCode === 611 ||
          data.statusCode === 613 ||
          data.statusText === '필수 파라미터가 없습니다. (login_id)'
        ) {
          handleSignOut();
          setModalOpen(false);
        }
      })
      .catch((error) => {
        setResultMessage(error.statusText);
        setModalOpen(true);
        if (error.statusCode === 611 || error.statusCode === 402) {
          handleSignOut();
          setModalOpen(false);
        }
      });
  };

  const changeName = (name: any) => {
    if (name === 'ADM') {
      return '운영자';
    } else {
      return '사용자';
    }
  };
  const lockUser = () => {
    setChangeStat('L');
  };

  const unlockUser = () => {
    setChangeStat('A');
  };

  const changeIcon = (status: any) => {
    if (status === 'A') {
      return <LockOpenIcon id="상태관리" onClick={lockUser} />;
    } else {
      return <LockPersonIcon id="상태관리" onClick={unlockUser} />;
    }
  };

  useEffect(() => {
    handleListClick();
    if (!editModalOpen.editModal) {
      setSelectedRowId(null);
    }
  }, [editModalOpen.editModal, addStatus.addStatus]);

  return (
    <div>
      <div>
        <AlertModal
          message={'수정이 완료되었습니다.'}
          isOpen={editModalOpen.deleteComplateMessageModal}
          onClose={() =>
            setEditModalOpen((prevState) => ({
              ...prevState,
              deleteComplateMessageModal: false,
            }))
          }
        />
      </div>
      <div>
        <AlertModal
          message={resultMessage}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
      <div>
        <AlertDoubleButtonModal
          message={'비밀번호를 초기화 할까요?'}
          isOpen={resetModalOpen}
          onClose={() => setResetModalOpen(false)}
          actionFunction={() => handlePasswordReset(selectedUser?.USER_ID)}
        />
      </div>
      <div>
        <AlertDoubleButtonModal
          message={
            changeStat === 'L'
              ? '활성 상태를 변경할까요?'
              : '잠금 상태를 변경할까요?'
          }
          isOpen={changeStatModalOpen}
          onClose={() => setChangeStatModalOpen(false)}
          actionFunction={() => changeUserStat(changeStat)}
        />
      </div>
      <div>
        <AlertDoubleButtonModal
          message={'사용자를 삭제할까요?'}
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          actionFunction={() => handleDelete(selectedUser?.USER_ID)}
        />
      </div>
      <EditUserModal
        isOpen={editModalOpen.editModal}
        onClose={() =>
          setEditModalOpen((prevState) => ({ ...prevState, editModal: false }))
        }
        userData={selectedUser}
      />
      {jsonResult.user_list ? (
        <div
          style={{
            width: '100%',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <ScrollableDiv>
            <StyledTable>
              <StyledTableHead>
                <StyledTableRowTitle>
                  <StyledTableCellHeader>NO</StyledTableCellHeader>
                  <StyledTableCellHeader>아이디</StyledTableCellHeader>
                  <StyledTableCellHeader>타입</StyledTableCellHeader>
                  <StyledTableCellHeader>연락처</StyledTableCellHeader>
                  <StyledTableCellHeader>최종 접속 아이피</StyledTableCellHeader>
                  <StyledTableCellHeader>최근 접속 시간</StyledTableCellHeader>
                  <StyledTableCellHeader>접속 오류 횟수</StyledTableCellHeader>
                  <StyledTableCellHeader>비밀번호 초기화</StyledTableCellHeader>
                  <StyledTableCellHeader colSpan={2}>
                    상태 관리
                  </StyledTableCellHeader>
                </StyledTableRowTitle>
              </StyledTableHead>
              <LogStyledTableBody>
                {jsonResult.user_list.map((user, index) => (
                  <StyledTableRow
                    key={user.USER_ID}
                    onClick={() => {
                      if (selectedRowId === index + 1) {
                        setSelectedRowId(null); // 이미 선택된 행을 다시 클릭하면 선택 해제
                      } else {
                        setSelectedRowId(index + 1); // 그렇지 않으면 행을 선택
                      }
                    }}
                    style={{
                      backgroundColor:
                        selectedRowId === index + 1 ? '#2477ec21' : undefined,
                    }}
                  >
                    <StyledTableCell onClick={() => handleEditUser(user)}>
                      {user.ROW_NUM}
                    </StyledTableCell>
                    <StyledTableCell onClick={() => handleEditUser(user)}>
                      {user.USER_ID}
                    </StyledTableCell>
                    <StyledTableCell onClick={() => handleEditUser(user)}>
                      {changeName(user.USER_TYPE)}
                    </StyledTableCell>
                    <StyledTableCell onClick={() => handleEditUser(user)}>
                      {user.USER_PHONE}
                      {/* 수정 필요함  */}
                    </StyledTableCell>
                    <StyledTableCell onClick={() => handleEditUser(user)}>
                      {user.LAST_LOGIN_IP}
                    </StyledTableCell>
                    <StyledTableCell onClick={() => handleEditUser(user)}>
                      {user.LAST_LOGIN_DT}
                    </StyledTableCell>
                    <StyledTableCell onClick={() => handleEditUser(user)}>
                      {user.FAIL_COUNT}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Tooltip
                        place="bottom"
                        style={{ fontSize: '12px', zIndex: 10 }}
                        anchorSelect="#초기화"
                        content="비밀번호 초기화"
                      />
                      <LockResetIcon
                        id="초기화"
                        onClick={() => {
                          setSelectedUser(user), setResetModalOpen(true);
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Tooltip
                        place="bottom"
                        style={{ fontSize: '12px', zIndex: 10 }}
                        anchorSelect="#상태관리"
                        content={user.STAT === 'L' ? '잠금 상태' : '해제 상태'}
                      />
                      <div
                        onClick={() => {
                          setSelectedUser(user),
                            setChangeStat(user.STAT === 'L' ? 'A' : 'L'),
                            setChangeStatModalOpen(true);
                        }}
                      >
                        {changeIcon(user.STAT)}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Tooltip
                        place="bottom"
                        style={{ fontSize: '12px', zIndex: 10 }}
                        anchorSelect="#삭제"
                        content="삭제"
                      />
                      <DeleteIcon
                        id="삭제"
                        onClick={() => {
                          setSelectedUser(user), setDeleteModalOpen(true);
                        }}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </LogStyledTableBody>
            </StyledTable>
          </ScrollableDiv>
        </div>
      ) : (
        <StyledTable>
          <StyledTableHead>
            <StyledTableRowTitle>
              <StyledTableCellHeader>NO</StyledTableCellHeader>
              <StyledTableCellHeader>아이디</StyledTableCellHeader>
              <StyledTableCellHeader>타입</StyledTableCellHeader>
              <StyledTableCellHeader>연락처</StyledTableCellHeader>
              <StyledTableCellHeader>최종 접속 아이피</StyledTableCellHeader>
              <StyledTableCellHeader>최근 접속 시간</StyledTableCellHeader>
              <StyledTableCellHeader>접속 오류 횟수</StyledTableCellHeader>
              <StyledTableCellHeader>비밀번호 초기화</StyledTableCellHeader>
              <StyledTableCellHeader colSpan={2}>상태 관리</StyledTableCellHeader>
            </StyledTableRowTitle>
          </StyledTableHead>
          <StyledTableBody>
            <StyledTableRow>
              <TimeTableCell colSpan={9}>조회된 데이터가 없습니다.</TimeTableCell>
            </StyledTableRow>
          </StyledTableBody>
        </StyledTable>
      )}
    </div>
  );
}

export default UserTable;
