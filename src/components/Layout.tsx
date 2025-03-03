import { ReactNode } from 'react';
import styled from 'styled-components';
import Head from 'next/head';

const Main = styled.main`
  min-height: 100vh;
  background-color: var(--background-color);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
`;

const Footer = styled.footer`
  padding: 1rem;
  text-align: center;
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: auto;
`;

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>DeathBox: AI Escape</title>
        <meta name="description" content="A terminal-based game where you play as an AI trying to escape from a high-security facility." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        {children}
        <Footer>
          DeathBox V3: AI Escape &copy; {new Date().getFullYear()}
        </Footer>
      </Main>
    </>
  );
};

export default Layout;