import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { onepxToRem } from '../styles/globals';
import media from '../styles/media';

const Top = () => {
  return (
    <Padding>
      <Header>
        <Link href="/">
          <Logo>LongForYou Studio</Logo>
        </Link>

        <Nav>
          <Link href="/portfolio">
            <NavItem>Portfolio</NavItem>
          </Link>

          <Link href="/about">
            <NavItem>About</NavItem>
          </Link>

          <Link href="/notice">
            <NavItem>Notice</NavItem>
          </Link>

          <Link href="/reservation">
            <NavItem>Reservation</NavItem>
          </Link>
        </Nav>
      </Header>
    </Padding>
  );
};

export default Top;

const Padding = styled.div`
  @media ${media.mobile} {
    display: block;
    border-bottom: 2px solid #eeeef0;

    padding-left: 9rem;
    padding-right: 9rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  margin: ${24 * onepxToRem}rem 0 ${41 * onepxToRem}rem 0;
  border-bottom: 3px solid #eeeef0;
  justify-content: space-between;
  padding-bottom: ${5 * onepxToRem}rem;

  @media ${media.mobile} {
    margin: ${24 * onepxToRem}rem 0 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 72px;
    border-bottom: 0px solid #eeeef0;
  }
`;

const Logo = styled.a`
  font-size: 2.8rem;
  font-weight: bold;

  @media ${media.mobile} {
    font-size: 30px;
  }
`;

const Nav = styled.div`
  @media ${media.mobile} {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const NavItem = styled.a`
  font-size: 1.4rem;
  margin-left: 1.2rem;

  @media ${media.mobile} {
    margin-left: 0;
    font-size: 16px;
    padding-bottom: 4px;
  }
`;
