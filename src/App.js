import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Pagination, Row, Col, Icon } from 'antd';
import { getCars, getDealer } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      per_page: 10
    }
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
              loading={this.props.loading}
              pagination={false}
              bordered={true}
              dataSource={this.props.cars}
            >
              <Table.Column title="brand" dataIndex="brand" key="brand" />
              <Table.Column title="model" dataIndex="model" key="model" />
              <Table.Column title="vin" dataIndex="vin" key="vin" />
              <Table.Column
                title="dealer"
                dataIndex="dealer"
                key="dealer"
                render={dealer => {
                  let result = this.props.dealers.filter(dealer_ => {
                    if (dealer_.id === dealer) return dealer_;
                  });
                  if (result.get(0))
                    return <div>{result.get(0).name}</div>;
                  else
                    return <Icon type="loading" />;
                }}
              />
            </Table>} {/* TODO make it simple */}
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col>
            <Pagination
              simple
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
    getCars: (page, per_page) => dispatch(getCars(page, per_page, getDealer)),
    getDealer: id => dispatch(getDealer(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);