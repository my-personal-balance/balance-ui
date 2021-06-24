import { Col, Row, Table, Tag, Typography } from 'antd';

import Loader from '../Loader';

const TransactionTable = ({items}) => {

  if (items) {
  
    const columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      { title: 'Description', dataIndex: 'description', key: 'description', },
      { 
        title: "Category",
        dataIndex: "tag",
        key: "tag", 
        render: (tag, record) => (
          <Tag key={record.id}>{tag.value}</Tag>
        ),
      },
      { title: "Amount", dataIndex: "amount", key: "amount", },
      {
        title: "Account",
        dataIndex: "account",
        key: "account",
        render: account => (
          <>{account.alias}</>
        ),
      },
    ];

    return (
      <>
        <Row>
          <Col>
            <Typography.Title level={4}>Transactions</Typography.Title>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table dataSource={items} columns={columns} size="small" pagination={{defaultPageSize:50}} />
          </Col>
        </Row>
      </>
    )
  } else {
    return (
      <Loader />
    )
  }

}

export default TransactionTable;