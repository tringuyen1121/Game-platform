import { motion } from 'framer-motion';
import styled from 'styled-components';
import SYMBOLS from '../../lib/symbols';

const MatchLogo = () => {
  return (
    <Container>
      {[-2, -1, 0, 1, 2].map((offset, i) => (
        <CardWrapper
          key={i}
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          animate={{
            opacity: 1,
            y: Math.abs(offset) * 2,
            rotate: offset * 12, // -24° to +24° spread
            x: offset * 24, // Horizontal spread
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 18,
            delay: 0.3 + i * 0.08, // Staggered entrance
          }}
          style={{ background: SYMBOLS[i].background }}
        >
          {SYMBOLS[i].icon}
        </CardWrapper>
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const CardWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  margin-left: -28px;
  width: 56px;
  height: 76px;
  border-radius: 10px;
  transform-origin: bottom center; // Fan from bottom
`;

export default MatchLogo;
