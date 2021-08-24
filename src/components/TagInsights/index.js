import { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Space, Tag, Table, Typography, } from 'antd';
import { Pie } from '@ant-design/charts';

import { fetchReportTransactions, } from '../../ws/BalanceAPI';
import { withAxios } from '../../container/Authenticated';
import { openNotificationWithIcon } from '../../utils/constants';

import './index.css';

const TagInsights = (props) => {

  const { filters, addFilters, removeFilters } = props;

  const [data, setData] = useState(undefined);
  const [tag, setTag] = useState(undefined);

  useEffect(() => {
    asyncFetchReportTransaction();
  },[filters.periodType, filters.startDate, filters.endDate, filters.tagId]);

  const asyncFetchReportTransaction = () => {
    fetchReportTransactions(props.axios, filters, response => {
      const { error, data } = response;
      if (error) {
        openNotificationWithIcon('error', "Failed to fetch report data", "There was an error while fetching data. Please reload the page.");
      } else if (data) {
        
        const { items } = data;
        let report = items.map(item => {
          return {
            value: item["EXPENSE"],
            label: item.tag ? item.tag.value : "Untagged",
            id: item.tag ? item.tag.id : 0,
          }
        });

        report = report.sort(function(a, b){return b.value - a.value});
        setData(report);
        if (filters.tagId || filters.tagId === 0) {
          items.forEach(item => {
            setTag({
              label: item.tag ? item.tag.value : "Untagged",
              id: item.tag ? item.tag.id : 0,
            });
          });
        }
      }
    });
  }

  const transactionType = "EXPENSE";
  const displayClassName = transactionType === "EXPENSE" ? "expense-value" : "income-value";
  const signal = transactionType === "EXPENSE" ? "-" : "+";

  var config = {
    data: data,
    angleField: 'value',
    colorField: 'label',
    appendPadding: 10,
    innerRadius: 0.7,
    legend: false,
    tooltip: {
      showContent: false,
    },
    label: {
      content: null
    },
    statistic: {
      content: {
        formatter: (_, values) => {
          let sum = 0.0;
          values.forEach(v => sum += v.value);
          return sum.toFixed(2);
        }
      }
    }
  };

  const columns = [
    {
      title: "Tag",
      dataIndex: "label",
      key: "label",
      render: (label, record) => {
        return (
          <Button className="tag-report-pie-button" type="link" onClick={() => addFilters({ tagId: record.id })}>{label}</Button>
        );
      }
    },
    {
      title: "Expense",
      dataIndex: "value",
      key: "value",
      align: "right", 
      render: (amount) => {
        return (
          <span className={displayClassName}>{signal} {amount.toFixed(2)}</span>
        );
      }
    },
  ];

  return (
    <Card>
      <Row>
        <Col span={4}>
          <Typography.Title level={5}>Expenses</Typography.Title>
        </Col>
        <Col>
        { tag !== undefined ? <Tag closable onClose={() => { removeFilters("tagId"); setTag(undefined); }} >{tag.label}</Tag> : <></> }
        </Col>
      </Row>
      <Row>
        <Col>
          {data !== undefined ? <Pie {...config} /> : <></>}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {data !== undefined ?
            <Table
              rowKey="id"
              dataSource={data}
              columns={columns}
              size="small"
              pagination={false}
              summary={pageData => {
                let total = 0;
                pageData.forEach(({value}) => {
                  total += value;
                });
        
                return (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell>
                          <strong>TOTAL</strong>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell align="right">
                        <span className={displayClassName}>{signal} {total.toFixed(2)}</span>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
            /> 
          : <></>}
        </Col>
      </Row>
    </Card>
    
  )
}

export default withAxios(TagInsights);