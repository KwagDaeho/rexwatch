// Login.jsx
import React from 'react';
import {
  HeaderContainer,
  Item,
  MainHeaderContainer,
  MainHeaderContainerTitle,
} from '@/components/MuiStyled/Div';
import { H2, H2Title, MainTitleH1 } from '@/components/MuiStyled/Title';

import { MainLine } from '@/components/MuiStyled/Br';

function MainHeader({ title }) {
  return (
    <div>
      <MainHeaderContainerTitle>
        <H2>{title}</H2>
      </MainHeaderContainerTitle>

      {title !== '모듈 설정' && (
        <MainHeaderContainer>
          <MainLine />
        </MainHeaderContainer>
      )}
    </div>
  );
}

export default MainHeader;
