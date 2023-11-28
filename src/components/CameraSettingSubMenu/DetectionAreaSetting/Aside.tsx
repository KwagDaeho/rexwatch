import { AsideController } from '@/components/MuiStyled/Aside';
import { BoxSelectWrap } from '@/components/MuiStyled/Box';
import { DlAreaAttr } from '@/components/MuiStyled/Dl';
import { SpanColorBox, SpanColorBoxL } from '@/components/MuiStyled/Span';
import {
  ButtonToggle,
  DetectionAreaAsideToogle,
} from '@/components/MuiStyled/button';
import {
  AddCircle,
  Delete,
  KeyboardArrowUp,
  KeyboardArrowDown,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
  Lock,
  LockOpen,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Button,
  FormControl,
  InputLabel,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  ToggleButtonGroup,
} from '@mui/material';
import axios from 'axios';

const AsideDetectionAreaSetting = ({
  addTypeInfo,
  addType,
  setAddType,
  handleAddType,
  areaData,
  setAreaData,
  drawMode,
  setDrawMode,
  areaCodes,
  checked,
  setChecked,
  locked,
  setLocked,
}) => {
  const SelectBox = () => {
    const selectList = addTypeInfo.map((x, idx) => {
      return (
        <MenuItem value={x.code} key={idx} color={x.color}>
          <SpanColorBox color={x.color}>Color Box</SpanColorBox>
          <span>{x.name}</span>
        </MenuItem>
      );
    });
    return (
      <Select
        value={drawMode === 1 ? addType : -1}
        label="검지 영역 추가"
        onChange={handleAddType}
      >
        <MenuItem value={-1} disabled divider>
          추가할 영역 선택
        </MenuItem>
        {selectList}
      </Select>
    );
  };
  const deleteAreaList = (code) => {
    if (locked.includes(code)) {
      alert('삭제하려는 영역 정보가 잠겨 있습니다.');
    } else {
      const deletedData = { ROIs: areaData.ROIs.filter((y) => y.ROICode !== code) };
      if (confirm('변경된 내용(영역 정보)을 삭제하시겠습니까?')) {
        alert('확인(예)을 누르셨습니다.\n선택한 영역정보를 삭제 합니다.');
        setAreaData(deletedData);
      } else {
        alert('취소(아니오)를 누르셨습니다.\n영억정보를 삭제하지 않습니다.');
      }
    }
  };
  const handleLocked = (e, code) => {
    e.stopPropagation();
    const newLocked = [...locked];
    if (locked.includes(code)) {
      setLocked(newLocked.filter((x) => x !== code));
    } else {
      newLocked.push(code);
      setLocked(newLocked);
    }
  };
  const handleChecked = (e, code) => {
    e.stopPropagation();
    const newChecked = [...checked];
    if (code === addType) {
      setAddType(null);
      setDrawMode(0);
      setChecked(newChecked.filter((x) => x !== code));
    } else if (checked.includes(code)) {
      setChecked(newChecked.filter((x) => x !== code));
    } else {
      newChecked.push(code);
      setChecked(newChecked);
    }
  };
  const handleCheckedAll = () => {
    checked.length === areaCodes.length ? setChecked([]) : setChecked(areaCodes);
  };
  const handleLockedAll = () => {
    locked.length === areaCodes.length ? setLocked([]) : setLocked(areaCodes);
  };

  let areaList = areaCodes.map((x) => {
    const target = addTypeInfo.find((type) => type.code === x);
    const isTarget = x === addType;
    const { AreaCount, Areas, ROICode, ...roiAttr } = areaData.ROIs.find(
      (roi) => roi.ROICode === x,
    );
    return (
      <DetectionAreaAsideToogle key={x} value={x} isTarget={isTarget}>
        <ListItemButton
          sx={{
            backgroundColor: `${checked.includes(x) ? '#d8d8d8' : 'transparent'}`,
            padding: '3px',
          }}
        >
          <ButtonToggle
            value={x}
            selected={checked.includes(x)}
            onChange={(e, code) => {
              handleChecked(e, code);
            }}
          >
            {checked.includes(x) || isTarget ? (
              <Visibility color="primary" width="100%" />
            ) : (
              <VisibilityOff color="primary" width="100%" />
            )}
          </ButtonToggle>
          <SpanColorBoxL color={target.color}>Color Box</SpanColorBoxL>
          <ListItemText
            sx={{ borderRight: '1px solid #999' }}
            primary={target.name}
          />
          <ButtonToggle
            value={x}
            selected={locked.includes(x)}
            onChange={(e, code) => {
              handleLocked(e, code);
            }}
          >
            {locked.includes(x) ? (
              <Lock color="primary" />
            ) : (
              <LockOpen color="primary" />
            )}
          </ButtonToggle>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              deleteAreaList(x);
            }}
            color="primary"
            style={{ width: 30, minWidth: 30, marginLeft: 0 }}
          >
            <Delete />
          </Button>
        </ListItemButton>
        {Object.keys(roiAttr).length > 0 && (checked?.includes(x) || isTarget) ? (
          <div
            style={{ width: '100%', padding: '5px 10px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.2)',
              }}
            >
              영역 속성
            </h4>
            <div style={{ width: '100%', paddingBlock: '8px' }}>
              {Object.entries(roiAttr)?.map(([key, value]) => {
                return (
                  <>
                    {isTarget ? (
                      <TextField
                        id={'input_' + addType + '_' + key}
                        label={key}
                        variant="standard"
                        defaultValue={String(value)}
                        key={key}
                      />
                    ) : (
                      <DlAreaAttr key={key}>
                        <dt>{key}</dt>
                        <dd style={{ marginLeft: 'auto' }}>{String(value)}</dd>
                      </DlAreaAttr>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        ) : null}
      </DetectionAreaAsideToogle>
    );
  });
  const handleEditTarget = (e, code) => {
    setDrawMode(code === null ? 0 : 2);
    setAddType(code);
  };
  return (
    <AsideController>
      <BoxSelectWrap>
        <AddCircle
          sx={{
            fontSize: '24px',
          }}
        />
        <FormControl variant="standard" sx={{ minWidth: '150px' }}>
          <InputLabel>검지영역 추가</InputLabel>
          <SelectBox />
          {/* <FormHelperText>타입별 검지영역은 최대 1개 입니다.</FormHelperText> */}
        </FormControl>
      </BoxSelectWrap>
      <p>{'[임시 addType 표시] ' + addType}</p>
      <dl
        style={{
          borderLeft: '2px solid rgba(0,0,0,0.5)',
          padding: '12px',
          textAlign: 'left',
        }}
      >
        <dt>
          <div
            style={{
              border: '2px solid #999',
              borderBottomWidth: '2px',
              padding: 0,
              backgroundColor: '#acc',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '3px',
              }}
            >
              <ButtonToggle value={'checkedAll'} onChange={handleCheckedAll}>
                {checked.length === areaCodes.length ? (
                  <VisibilityOff color="primary" width="100%" />
                ) : (
                  <Visibility color="primary" width="100%" />
                )}
              </ButtonToggle>

              <ListItemText
                sx={{
                  borderRight: '1px solid #999',
                  textAlign: 'center',
                }}
              >
                영역설정 목록
              </ListItemText>
              <ButtonToggle value={'lockedAll'} onChange={handleLockedAll}>
                {locked.length === areaCodes.length ? (
                  <LockOpen color="primary" width="100%" />
                ) : (
                  <Lock color="primary" width="100%" />
                )}
              </ButtonToggle>
              <ButtonToggle value={'open and close'} onChange={handleCheckedAll}>
                {true ? (
                  <KeyboardDoubleArrowUp color="primary" width="100%" />
                ) : (
                  <KeyboardDoubleArrowDown color="primary" width="100%" />
                )}
              </ButtonToggle>
            </div>
          </div>
        </dt>
        <dd>
          <ToggleButtonGroup
            orientation="vertical"
            value={addType}
            onChange={handleEditTarget}
            sx={{ width: '100%', borderRadius: '0' }}
            exclusive={true}
          >
            {areaList}
          </ToggleButtonGroup>
        </dd>
      </dl>
    </AsideController>
  );
};

export default AsideDetectionAreaSetting;
