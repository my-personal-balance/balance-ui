import React from 'react';

import { client } from '../utils/axios';

export const withAxios = (ReactComponent) => (props) => (
    <ReactComponent {...props} axios={client} />
  );