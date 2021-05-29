import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { onepxToRem } from '../styles/globals';

const Top = () => {
  return (
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
  );
};

export default Top;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  margin: ${24 * onepxToRem}rem 0 ${41 * onepxToRem}rem 0;
  padding-bottom: ${5 * onepxToRem}rem;
  border-bottom: 3px solid #eeeef0;
  justify-content: space-between;
`;

const Logo = styled.a`
  font-size: 2.8rem;
  font-weight: bold;
`;
const Nav = styled.div``;
const NavItem = styled.a`
  font-size: 1.4rem;
  margin-left: 1.2rem;
`;
