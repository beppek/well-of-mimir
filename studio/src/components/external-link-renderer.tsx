import React from 'react';
import PropTypes from 'prop-types';
import { LinkIcon } from './icons';

const ExternalLinkRenderer = ({ children }) => (
  <span>
    {children} <LinkIcon />
  </span>
);

ExternalLinkRenderer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExternalLinkRenderer;
