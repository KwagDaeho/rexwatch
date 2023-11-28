'use client';
import { styled } from '@mui/system';

export const spaceAroundFlexUl = styled('ul')`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 3px;
`;

export const FlexRowUl = styled(spaceAroundFlexUl)`
  :hover {
    background-color: ${(props) => props.theme.palette.action.hover};
  }
  cursor: pointer;
`;

export const FlexRowBorderBottomUl = styled(spaceAroundFlexUl)`
  border-bottom: 1px solid;
`;

export const FlexColumnContainerUl = styled(spaceAroundFlexUl)`
  flex-direction: column;
  padding: 0;
  width: 100%;
`;
