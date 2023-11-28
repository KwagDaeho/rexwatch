/* @jsxImportSource react */
import HideAppBar from 'src/components/globalComponents/HideAppBar/page';
import { Inter } from 'next/font/google';
import './reset.css';

import CustomThemeProvider from 'src/utils/theme/CustomThemeProvider';
import ModalProvider from '@/components/ModalProvider.client';
const inter = Inter({ subsets: ['latin'] });
type PropsType = {
  children: React.ReactNode;
};
export const metadata = {
  title: 'RexWatchCity',
  description: 'RexWatchCity :: made by platform Team From Rexgen',
};

export default function RootLayout({ children }: PropsType) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning={true} className={inter.className}>
        <ModalProvider>
          <CustomThemeProvider>
            <HideAppBar>
              <main>{children}</main>
            </HideAppBar>
          </CustomThemeProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
