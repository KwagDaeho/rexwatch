'use client';
import { styled } from '@mui/system';
import Image from 'next/image'; // Import Image from next/image

export const MainLogo = styled(Image)`
  color: ${(props) => props.theme.palette.primary.main};
`;

export const LoginLogo = styled(MainLogo)`
  /* margin: 10px 0; // 상하로 여백 추가 */
  width: 60px;
  height: 60px;
  padding: 10px;
`;

export const CapchaIamge = styled(MainLogo)`
  /* margin: 10px 0; // 상하로 여백 추가 */
  width: 180px;
  height: 50px;
  /* padding: 10px; */
`;
