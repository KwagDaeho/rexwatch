import styled from '@emotion/styled';
import GetPageList from './GetPageList/page';
import { useRouter } from 'next/navigation';
interface PropsType {}

function Gnb({}: PropsType) {
  const router = useRouter();
  return (
    <>
      <LogoContainer onClick={() => router.push('/CameraView')}>
        <img
          style={{ verticalAlign: 'inherit', marginRight: '20px' }}
          height={'40px'}
          src="/rexgen.png"
          alt="RexWatchCity"
        />
        <P>RexWatchCity</P>
      </LogoContainer>
      <nav>
        <ol id="header_gnb">
          <GetPageList />
        </ol>
      </nav>
    </>
  );
}

export default Gnb;

const P = styled('p')`
  font-size: 25px;
  font-weight: bold;
  color: ${(props) => props.theme.palette.primary.dark};
`;

const LogoContainer = styled('button')`
  display: flex;
  width: 170px;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  background: transparent;
  border: none;
`;
