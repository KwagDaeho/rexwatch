import MyTimelineCalendar from '@/components/Calendar';
import styled from '@emotion/styled';
import useSwrApiNew from '@/api';
import { useEffect, useState } from 'react';
import { ClickButton } from '@/components/ClickButton';
import { useRecoilState } from 'recoil';
import { selectedIndexState, selectedSettingChannelState } from '@/recoil/atoms';
type CalendarEvent = {
  start: number;
  end: number;
};
export const EventScheduleSetting = () => {
  const [indexState, setIndexState] = useRecoilState(selectedSettingChannelState);

  console.log(indexState, 'indexState');

  const camNumber = indexState + 1;

  const {
    data: result,
    isLoading,
    isError,
  } = useSwrApiNew('http://192.168.0.200:8080/query', {
    Command: 201,
    Channel: camNumber,
  });

  async function getEventTimeInfo(
    cam_id: number,
  ): Promise<{ statusCode: number; statusText: string; times: number[] }> {
    try {
      const response = await fetch('http://192.168.0.200:8080/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Command: 201,
          Channel: camNumber,
        }),
      });
      const _info = await response.json();

      const _timeUsed = _info.TimeUsed.toString(2).padStart(24, '0');
      const _timeStr = _timeUsed.split('').reverse();
      const _timeArray = [];
      for (let h = 0; h < 24; h++) {
        if (_timeStr[h] === '1') _timeArray.push(Number(h));
      }

      return {
        statusCode: 200,
        statusText: 'Success!',
        times: _timeArray,
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        statusText: 'Error!',
        times: [],
      };
    }
  }

  // 이벤트 스케쥴 정보 저장
  async function setEventTimeInfo(
    cam_id: number,
    times: number[],
  ): Promise<{ statusCode: number; statusText: string }> {
    console.log('[setEventTimeInfo] times=', times);
    let _timeArray: number[] = [];
    if (times && times.length > 0) {
      // 서버용 이진 데이터 배열로 변경
      for (let h = 0; h < 24; h++) {
        _timeArray.push(Number(times.includes(h)));
      }
      _timeArray.reverse();
    } else {
      for (let h = 0; h < 24; h++) {
        _timeArray.push(0);
      }
    }

    try {
      const response = await fetch('http://192.168.0.200:8080/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Command: 202,
          Channel: cam_id,
          TimeUsed: parseInt(_timeArray.join(''), 2), // 이진 배열을 숫자로 변환
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return {
        statusCode: 200,
        statusText: 'Success!',
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        statusText: 'Error!',
      };
    }
  }

  const [events, setEvents] = useState([]);
  const [newEvents, setNewEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    setNewEvents([...events]);
  }, [events]);

  useEffect(() => {
    getEventTimeInfo(3).then((data) => {
      const newEvents = data.times.map((hour) => ({
        start: hour,
        end: hour + 1,
      }));
      setEvents(newEvents);
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data.</p>;
  }
  return (
    <Container>
      <div style={{ flexDirection: 'row', display: 'flex' }}>
        <P>이벤트 스케쥴 설정</P>
        <ButtonContainer>
          <ClickButton
            title={'설정'}
            // background={isValidIP ? '#2477ec' : '#dce3ec'}
            minwidth="80px"
            onClick={() =>
              setEventTimeInfo(
                camNumber,
                newEvents.map((e) => e.start),
              )
            }
            // disabled={!isValidIP} // Disabled when IP is not valid
          />
        </ButtonContainer>
      </div>

      <SelectBoxContainer>
        <MyTimelineCalendar
          newEvents={newEvents}
          setNewEvents={setNewEvents}
          events={events}
          setEvents={setEvents}
        />
      </SelectBoxContainer>
    </Container>
  );
};
const Container = styled('div')`
  width: 100%;
`;
const SelectBoxContainer = styled('div')`
  width: 90%;
  margin: 0 auto;
`;
const SelectBox = styled('div')`
  width: 400px;
  padding: 20px 5px;
`;
const P = styled('p')`
  width: 90%;
  padding: 20px 5px;
  margin: 0 auto;
  font-weight: bold;
  font-size: 24px;
`;
const Ul = styled('ul')`
  width: 100%;
`;
const Li = styled('li')`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Label = styled('label')`
  width: 40%;
  font-size: 14px;
`;
const Select = styled('select')`
  width: 70%;
  padding: 10px;
  border-radius: 5px;
`;
const ButtonContainer = styled('div')`
  display: flex;
  justify-content: end;
  padding: 10px 0;
`;
