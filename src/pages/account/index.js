import { useEffect, useState } from 'react';
import {
  useLocation,
  useParams,
} from "react-router-dom";
import { Button, Col, Row, Typography, Popconfirm } from 'antd';
import {
  DeleteOutlined,
} from '@ant-design/icons';

import TransactionsComponent from '../../components/Transactions';
import { withAxios } from '../../container/AuthProvider';
import { fetchAccount, deleteAccount } from '../../ws/accounts';
import { openNotificationWithIcon } from '../../utils/constants';
import { searchParser } from '../../utils/searchParser';

const Account = (props) => {

  const { accountId } = useParams();

  const location = useLocation();

  const [title, setTitle] = useState(null);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    loadInitialFilters();
    asyncFetchAccount();
  },[location.search]);

  const loadInitialFilters = () => {
    let querySearch = searchParser(location.search);
    querySearch = Object.assign({}, { accountId: parseInt(accountId), }, querySearch);
    setFilters(querySearch);
  }

  const asyncFetchAccount = () => {
    fetchAccount(props.axios, accountId, resp => {
      if (resp) {
        const account = resp.data;
        setTitle(account.alias);
      }
    });
  }

  const deleteCurrentAccount = () => {
    deleteAccount(props.axios, accountId, response => {
      const { error } = response;
      if (error) {
        openNotificationWithIcon('error', "Failed to delete account", "There was an error while deleting your account. Please reload the page.");
      } else {
        openNotificationWithIcon('success', "Account deleted", "Your account was deleted successfuly.");
        props.history.push('/accounts')
      }
    });
  }

  return (
    <>
      <Row>
        <Col>
          <Typography.Title>{title}</Typography.Title>
        </Col>
        <Col>
          <Popconfirm
            title={`Delete the ${title} account?`}
            okText="Yes"
            cancelText="No"
            onConfirm={deleteCurrentAccount}
          >
            <Button type="link" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          { filters ? <TransactionsComponent
            filters={filters}
            hideTagInsights={true}
          /> : <></> }
        </Col>
      </Row>
    </>
  );
}

export default withAxios(Account);
