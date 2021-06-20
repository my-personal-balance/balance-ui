import React from 'react';
import { Spin } from 'antd';

const Loader = ({ message = 'Loading...' }) => (
  <Spin animation="border" role="status">
    <span className="sr-only">{message}</span>
  </Spin>
);

export default Loader;