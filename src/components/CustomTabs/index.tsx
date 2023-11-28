import { tabIndexState } from '@/recoil/atoms';
import styled from '@emotion/styled';
import { Tab, Tabs } from '@mui/material';
import { useRecoilState } from 'recoil';

export const CustomTabs = () => {
  const [tabIndex, setTabIndex] = useRecoilState(tabIndexState);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  return (
    <>
      <TabContainer
        value={tabIndex}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="간편 설정" />
        <Tab label="상세 설정" />
      </TabContainer>
    </>
  );
};

const TabContainer = styled(Tabs)`
  width: 100%;
`;
