import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Pagination, Row, Col, Statistic, Header } from 'antd';
import { getCars, getDealer } from './actions';

const columns = [
  {
    title: 'brand',
    dataIndex: 'brand',
    key: 'brand',
  },
  {
    title: 'model',
    dataIndex: 'model',
    key: 'model',
  },
  {
    title: 'vin',
    dataIndex: 'vin',
    key: 'vin'
  },
  ,
  {
    title: 'dealer.id',
    dataIndex: 'dealer.id',
    key: 'dealer.id'
  },
  ,
  {
    title: 'dealer.name',
    dataIndex: 'dealer.name',
    key: 'dealer.name'
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.getDealer = this.getDealer.bind(this);
    this.state = {
      page: 1,
      per_page: 10
    }
  }

  getDealer(dealer) { //move to another component
    return [
      <Row key='Main' gutter={16}>
        <Col span={8}>
          <Statistic title="Name" value={dealer.name} valueStyle={{ fontSize: '1em' }} />
        </Col>
        <Col span={8}>
          <Statistic title="Title" value={dealer.title} valueStyle={{ fontSize: '1em' }} />
        </Col>
        <Col span={8}>
          <Statistic title="URL" value={dealer.url} valueStyle={{ fontSize: '1em' }} />
        </Col>
      </Row>,
      <Row key='Offices'>
        <h3>Offices</h3>
        {dealer.offices.map(office => {
          return <div key={office.id}>
            <p>{office.address},{office.phone}</p>
          </div>
        })}
      </Row>
    ]
  }

  componentDidMount() {
    let { page, per_page } = this.state;
    this.props.getCars(page, per_page);
  }

  render() {
    return (
      <div className='main-container'>
        <Row>
          <Col>
            {Array.isArray(this.props.cars) && <Table
              expandedRowRender={car => {
                let result = this.props.dealers.filter(dealer => {
                  if (dealer.id === car.dealer.id) return dealer;
                });
                if (result.get(0))
                  return this.getDealer(result.get(0));
              }}
              onExpand={(expanded, car) => this.props.getDealer(car.dealer.id)}
              expandRowByClick={true}
              loading={this.props.loading}
              pagination={false}
              bordered={true}
              dataSource={this.props.cars}
              columns={columns} />} {/* TODO make it simple */}
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col>
            <Pagination
              onChange={this.props.getCars}
              style={{ marginTop: '20px' }}
              pageSize={this.state.per_page}
              defaultCurrent={1}
              total={this.props.totalCount} />
          </Col>
        </Row>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cars: state.reducer.get('cars'),
    totalCount: state.reducer.get('totalCount'),
    loading: state.reducer.get('loading'),
    dealers: state.reducer.get('dealers')
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getCars: (page, per_page) => dispatch(getCars(page, per_page)),
    getDealer: id => dispatch(getDealer(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);