import React from "react"
import { Col, Form, Row, Typography, Input } from "antd"
import { useTranslation } from "react-i18next"

const { Text } = Typography

function Profile() {
  const {t} = useTranslation('common')
  return (
    <div id="profile">
      <div className="mb-2">
        <Text>
          {t('Profile')} <small className="fst-italic">(required)</small>
        </Text>
      </div>
      <Row gutter={[16, 16]}>
        <Col md={{ span: 12 }}>
          <Form.Item
            className="w-100"
            name="note"
            label={null}
            rules={[{ required: true }]}
          >
            <Input className="w-100" placeholder={t("First Name")} />
          </Form.Item>
        </Col>
        <Col md={{ span: 12 }}>
          <Form.Item name="note" label={null} rules={[{ required: true }]}>
            <Input className="w-100" placeholder={t("Last Name")} />
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
}

export default Profile
