import React from 'react';
import cx from 'classnames';

import './custom-buttom.styles.scss';

const CustomButton = ({ children, color, block, ...otherProps }) => {
  const cls = cx('custom-button', {
    [`color-${color}`]: color,
    block: block
  });

  return (
    <button className={cls} {...otherProps}>
      {children}
    </button>
  )
};

export default CustomButton;
