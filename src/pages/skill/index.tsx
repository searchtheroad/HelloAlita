import { connect } from 'dva';
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { SkillModelState, ConnectProps } from '@/models/connect';

import styles from './index.less';

interface PageProps extends ConnectProps {
  skill: SkillModelState;
}

interface PageState {}

@connect(({ skill }) => ({ skill }))
class Page extends Component<PageProps, PageState> {
  state: PageState  = {};

  render() {
    const {
      skill: { name , skills = [] },
    } = this.props;
    console.log('skills' , skills);
    return (
        <div >
          <div >
            <Row>
              {skills.reverse().map(item => (
                <Col key={item.summoner_name} span={3} className={styles.item}>
                  <img
                    src={`https://game.gtimg.cn/images/yxzj/img201606/summoner/${item.summoner_id}.jpg`}
                  />
                  <p>{item.summoner_name}</p>
                </Col>
              ))}
            </Row>
          </div>
        </div>

    );
  }
}

export default Page;
