import React from 'react';
import Box from '../Box';

import { type CardProps } from '../../typings';

const Card: React.FC<CardProps> = ({
  children,
  border = true,
  backgroundColor = 'surface',
  padding = 'md',
  shadow = true,
  ...props
}) => {
  return (
    <Box
      border={border}
      shadow={shadow}
      padding={padding}
      backgroundColor={backgroundColor}
      {...props}
    >
      {children}
    </Box>
  );
};

Card.displayName = 'Card';

export default Card;
