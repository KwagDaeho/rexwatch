import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

type CalendarEvent = {
  start: number;
  end: number;
};

interface MyTimelineCalendarProps {
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  newEvents: CalendarEvent[];
  setNewEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
}

const hours = Array.from({ length: 24 }).map((_, i) => i);

const CalendarContainer = styled('div')({
  display: 'flex',
  height: 80,
  overflowX: 'scroll',
  borderTop: '1px solid #e0e0e0',
  width: '100%',
});

const HourContainer = styled(Paper)<{ isBeingDragged?: boolean }>(
  ({ isBeingDragged }) => ({
    flex: 'none',
    width: 44,

    borderRight: '1px solid #e0e0e0',
    position: 'relative',
    backgroundColor: isBeingDragged ? '#f0f0f0' : undefined,
    userSelect: 'none', // Prevent text selection during drag
  }),
);

const TimeLabel = styled(Typography)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 10,
});

const DragArea = styled('div')({
  height: '100%',
  width: '100%',
});

const Event = styled(Paper)({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  backgroundColor: '#30A9DE',
  color: 'white',
  textAlign: 'center',
});

const MyTimelineCalendar: React.FC<MyTimelineCalendarProps> = ({
  events,
  setEvents,
  newEvents,
  setNewEvents,
}) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [currentHour, setCurrentHour] = useState<number | null>(null);
  console.log(newEvents, 'dd');
  console.log(events, 'rnvn ');

  const handleMouseDown = (hour: number) => {
    setDragging(true);
    setDragStart(hour);
    setCurrentHour(hour);
  };
  const handleMouseUp = (hour: number) => {
    if (dragging && dragStart !== null) {
      let startHour = dragStart;
      let endHour = hour;

      if (dragStart > hour) {
        startHour = hour;
        endHour = dragStart;
      }

      const overlappingEvents = newEvents.filter(
        (e) => !(e.end <= startHour || e.start > endHour),
      );

      const newEventList = [...newEvents];

      // 겹치는 이벤트가 있는 경우
      if (overlappingEvents.length > 0) {
        overlappingEvents.forEach((event) => {
          const idx = newEventList.indexOf(event);
          if (idx > -1) {
            newEventList.splice(idx, 1);
          }
        });
      }

      // 드래그 영역에 겹치는 이벤트가 없으면 새로운 이벤트를 추가
      if (overlappingEvents.length === 0) {
        for (let i = startHour; i < endHour + 1; i++) {
          newEventList.push({ start: i, end: i + 1 });
        }
      }

      setNewEvents(newEventList);
    }
    setDragging(false);
    setDragStart(null);
    setCurrentHour(null);
  };

  const handleMouseMove = (hour: number) => {
    if (dragging) {
      setCurrentHour(hour);
    }
  };

  return (
    <CalendarContainer>
      {hours.map((hour) => (
        <HourContainer
          key={hour}
          elevation={0}
          isBeingDragged={
            dragging &&
            dragStart !== null &&
            ((dragStart <= hour && hour <= currentHour) ||
              (dragStart >= hour && hour >= currentHour))
          }
        >
          <TimeLabel style={{ textAlign: 'center' }} variant="caption">
            {hour}:00
          </TimeLabel>
          <DragArea
            onMouseDown={() => handleMouseDown(hour)}
            onMouseUp={() => handleMouseUp(hour)}
            onMouseMove={() => handleMouseMove(hour)}
          >
            {newEvents
              .filter((e) => e.start === hour)
              .map((e, idx) => (
                <Event key={idx} elevation={3}>
                  <Typography>&nbsp;</Typography>
                </Event>
              ))}
          </DragArea>
        </HourContainer>
      ))}
    </CalendarContainer>
  );
};

export default MyTimelineCalendar;
