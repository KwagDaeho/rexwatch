import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/system';
import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableHead as MuiTableHead,
} from '@mui/material';

// Table 스타일링 예시
export const StyledTable = styled(MuiTable)`
  padding: 16px;
  position: relative;
`;

// TableBody 스타일링 예시
export const StyledTableBody = styled(MuiTableBody)`
  /* background-color: #f7f7f7; // 예: 연한 회색 배경 */
  margin: 8px 0;
`;
// TableBody 스타일링 예시
export const LogStyledTableBody = styled(MuiTableBody)`
  /* background-color: #f7f7f7; // 예: 연한 회색 배경 */
  margin: 8px 0;
  max-height: 600px; // 원하는 높이로 조정
  overflow-y: auto;
  /* display: block; // 이것을 추가해서 스크롤링이 동작하도록 합니다. */
`;
export const ScrollableDiv = styled('div')`
  max-height: 600px;
  overflow-y: auto;
  width: 100%;
`;

// TableHead 스타일링 예시
export const StyledTableHead = styled(MuiTableHead)`
  background-color: ${(props) =>
    props.theme.palette.secondary.main}; // 예: 진한 회색 배경
  color: ${(props) => props.theme.palette.primary.contrastText}; // 텍스트는 흰색으로
`;
// 홀짝 배경색 스타일링
export const StyledTableRow = styled(TableRow)`
  cursor: pointer;
  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05); // 홀수 행 배경색 지정 (예: 연한 회색)
  }
  /* 셀에 마우스를 올렸을 때의 스타일 지정 */
  &:hover {
    background-color: rgba(
      0,
      0,
      0,
      0.1
    ); // 예: 연한 회색보다 조금 더 진한 회색으로 변경
  }
`;

// 홀짝 배경색 스타일링
export const StyledTableRowTitle = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: ${(props) => props.theme.palette.primary.contrastText};

    /* rgba(0, 0, 0, 0.05); // 홀수 행 배경색 지정 (예: 연한 회색) */
  }
  /* 셀에 마우스를 올렸을 때의 스타일 지정 */

  background-color: rgba(
    0,
    0,
    0,
    0.1
  ); // 예: 연한 회색보다 조금 더 진한 회색으로 변경
`;

export const StyledTableCell = styled(TableCell)`
  border: 5px solid ${(props) => props.theme.palette.primary.contrastText};
  text-align: center;

  && {
    border-bottom: 5px solid ${(props) => props.theme.palette.primary.contrastText};
  }
`;
export const StyledTableCellHeader = styled(TableCell)`
  border: 5px solid ${(props) => props.theme.palette.primary.contrastText};
  text-align: center;

  font-weight: 600; /* Override MUI styles */
  && {
    border-bottom: 5px solid ${(props) => props.theme.palette.primary.contrastText};
  }
`;

// 특정 너비를 갖는 TableCell을 위한 추가 스타일 컴포넌트
export const TimeTableCellHeader = styled(StyledTableCell)({
  width: '20%',
  fontWeight: 800,
});

export const LogTableCellHeader = styled(StyledTableCell)({
  width: '80%',
  fontWeight: 800,
});
// 특정 너비를 갖는 TableCell을 위한 추가 스타일 컴포넌트
export const TimeTableCell = styled(StyledTableCell)({
  width: '20%',
});

export const LogTableCell = styled(StyledTableCell)({
  width: '80%',
});
