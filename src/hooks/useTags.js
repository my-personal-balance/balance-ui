import { useState, useEffect } from 'react';
import { Select } from 'antd';

import { fetchTags } from '../ws/tags';

const { Option } = Select;

export const useTags = (axios) => {

  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchTags(axios, response => {
      const { error, data } = response;
      if (error) {
        // openNotificationWithIcon('error', "Failed to fetch accounts", "There was an error while fetching accounts. Please reload the page.");
      } else if (data) {
        const tags = data.tags.map(d => <Option key={d.id} value={d.id}>{d.value}</Option>);
        setTags(tags);
      }
    });
  },[axios]);

  return {
    tags
  }
}