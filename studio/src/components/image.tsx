import React from 'react';

const ImageRenderer = ({ ...props }) => {
  console.log('props :>> ', props);
  return (
    <span>
      <image />
    </span>
  );
};

export default ImageRenderer;
