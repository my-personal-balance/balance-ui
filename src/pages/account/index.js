import { useEffect, useState } from 'react';
import { Button, Col, Row, Typography, Popconfirm } from 'antd';
import {
  DeleteOutlined,
} from '@ant-design/icons';

import TransactionsComponent from '../../components/Transactions';

import { withAxios } from '../../container/Authenticated';
import { fetchAccount, deleteAccount } from '../../ws/BalanceAPI';
import { openNotificationWithIcon } from '../../utils/constants';

const Account = (props) => {

  const { accountId } = props.match.params;

  const [title, setTitle] = useState(null);

  useEffect(() => {
    asyncFetchAccount();
  },[]);

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
          <TransactionsComponent filters={{periodType: "current_month", accountId: accountId}} />
        </Col>
      </Row>
    </>
  );
}

export default withAxios(Account);
