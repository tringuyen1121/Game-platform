import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <RightSection>
        <Logo>
          <h1>PANDORA</h1>
          <LogoUnderline />
        </Logo>
      </RightSection>

      <MenuToggle
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={menuOpen ? 'active' : ''} />
        <span className={menuOpen ? 'active' : ''} />
        <span className={menuOpen ? 'active' : ''} />
      </MenuToggle>

      <NavMenu className={menuOpen ? 'open' : ''}>
        <a href="#games">Games</a>
        <a href="#featured">Featured</a>
        <a href="#new">New</a>
        <a href="#about">About</a>
      </NavMenu>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const RightSection = styled.div`
  display: flex;
  gap: 16px;
`;

const gradientShift = keyframes`
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

const expandWidth = keyframes`
 from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

const Logo = styled.div`
  h1 {
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #00d4ff, #7b2ff7);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${gradientShift} 3s ease infinite;
  }
`;

const LogoUnderline = styled.div`
  height: 3px;
  background: linear-gradient(90deg, #00d4ff, #7b2ff7);
  margin-top: 4px;
  background-size: 200% 200%;
  animation:
    ${expandWidth} 0.6s ease-out,
    ${gradientShift} 3s ease infinite;
  transform-origin: left;
`;

const MenuToggle = styled.button`
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;

  span {
    width: 32px;
    height: 3px;
    background: white;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  span.active:nth-child(1) {
    transform: rotate(45deg) translateY(12.5px);
  }

  span.active:nth-child(2) {
    opacity: 0;
  }

  span.active:nth-child(3) {
    transform: rotate(-45deg) translateY(-12.5px);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 2rem;

  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    position: relative;
    transition: color 0.3s ease;
  }

  a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: #00d4ff;
    transition: width 0.3s ease;
  }

  a:hover {
    color: #00d4ff;
  }

  a:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 80px;
    right: 0;
    width: 250px;
    height: calc(100vh - 80px);
    background: rgba(10, 10, 15, 0.95);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 2rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;

    &.open {
      transform: translateX(0);
    }

    a::after {
      display: none;
    }
  }
`;

export default Header;
