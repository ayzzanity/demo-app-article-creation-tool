import React from 'react';
import ReactToPrint from 'react-to-print';
import { PrinterOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import dayjs from 'dayjs';
import './styles.css';

const APP_NAME = process.env.REACT_APP_NAME;

class Printable extends React.Component {
  render() {
    return (
      <>
        <ReactToPrint
          trigger={() => (
            <Button
              className="shadow-lg"
              size="large"
              style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                zIndex: 9999,
                width: 30,
                border: '1px solid #ffd673'
              }}
              type="primary"
              shape="circle"
              icon={<PrinterOutlined style={{ fontSize: 25 }} />}
            />
          )}
          content={() => this.componentRef}
        />

        <div ref={(el) => (this.componentRef = el)}>
          <table className="w-100">
            <thead id="print-thead">
              <tr>
                <td>
                  <div className="header-space">&nbsp;</div>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>{this.props.children}</div>
                </td>
              </tr>
            </tbody>
            <tfoot id="print-tfoot">
              <tr>
                <td>
                  <div className="footer-space">&nbsp;</div>
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="header">
            <div className="header-first-col">{this.props.title}</div>
            <div></div>
            <div className="header-third"></div>
          </div>
          <div className="footer">
            <div className="footer-app-name">
              {APP_NAME}
              Exco
            </div>
            <div></div>
            <div className="footer-curdate">{dayjs(Date.now()).format('DD.MM.YYYY')}</div>
          </div>
        </div>
      </>
    );
  }
}

export default Printable;
