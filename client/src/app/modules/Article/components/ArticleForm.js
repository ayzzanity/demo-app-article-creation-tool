import React, { useEffect } from 'react';
import { Modal, Space, Button, Col, Form, Input, Row, Select, Image } from 'antd';
import { inject, observer } from 'mobx-react';

/**ARTICLE IMPORTS */
import { ArticleController } from '@app_modules/Article/controller';
import { TextEditor } from '@app_modules/Article/components';

/**CORE IMPORTS */
import { ExactText } from '@core_common/components';
import { required } from '@core_common/antdhelpers/helperfunctions';
import { TWO_GRID_TWOTHIRD, TWO_GRID_ONETHIRD } from '@core_common/antdhelpers/constants';

function ArticleForm({ store, form }) {
  const { Option } = Select;
  const { showFormModal, DEFAULT_IMG } = store.ArticleUtilities;
  const { isCreating } = store.articles;
  const { getUsers, handleToggleShowFormModal, handleCreatingArticle, handleChangeForm } =
    ArticleController({ store, form });

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Modal
        title={
          <ExactText
            text={store.ArticleUtilities.isUpdatingArticle ? 'Update Article' : 'Add New Article'}
          />
        }
        visible={showFormModal}
        footer={null}
        className="exact-modal-80"
        style={{ top: 20 }}
        onCancel={handleToggleShowFormModal}
      >
        <Form
          form={form}
          name="control-hooks"
          layout="vertical"
          initialValues={{
            title: '',
            status: 'Draft',
            imageHeader: '',
            user_article_id: store.login.id
          }}
          onFieldsChange={handleChangeForm}
          onFinish={(values) => handleCreatingArticle(values)}
        >
          <div id="article">
            <Row gutter={[16, 0]}>
              <Col {...TWO_GRID_TWOTHIRD}>
                <Form.Item
                  className="w-100"
                  name="title"
                  label="Article Title"
                  //rules={[required('Please enter a title!')]}
                >
                  <Input placeholder="Article Title" />
                </Form.Item>
              </Col>
              <Col {...TWO_GRID_ONETHIRD}>
                <Form.Item name="status" label="Status">
                  <Select>
                    <Option key="draft" value="Draft">
                      Draft
                    </Option>
                    <Option key="published" value="Published">
                      Published
                    </Option>
                    ))
                  </Select>
                </Form.Item>
              </Col>
              <Col {...TWO_GRID_TWOTHIRD}>
                <Form.Item name="content" label="Content" className="w-200">
                  {/* <Input.TextArea
                    className="w-100"
                    placeholder="Content"
                    autoSize={{ minRows: 10, maxRows: 18 }}
                  /> */}
                  <TextEditor />
                </Form.Item>
              </Col>
              <Col {...TWO_GRID_ONETHIRD}>
                <Form.Item
                  name="user_article_id"
                  label="Assigned User"
                  // rules={[required('Please assign a user!')]}
                >
                  <Select placeholder="Please select type" showSearch={true}>
                    {store.users.state.map((user) => (
                      <Option key={user.id} value={user.id}>
                        {user.first_name} {user.last_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="imageHeader" label="Image Header Link">
                  <Input placeholder="http://imagelink.url/image.jpg" />
                </Form.Item>
                <Form.Item name="imagePreview" label="Header Preview">
                  <Image
                    src={store.articles.singleState.imageHeader}
                    className="imgStyle"
                    fallback={DEFAULT_IMG}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <Form.Item>
            <div className="d-flex w-100 justify-content-end">
              <Space>
                <Button onClick={handleToggleShowFormModal} type="default">
                  Cancel
                </Button>
                <Button loading={isCreating} type="primary" htmlType="submit">
                  {store.ArticleUtilities.isUpdatingArticle
                    ? 'Update Article'
                    : 'Create New Article'}
                </Button>
              </Space>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default inject('store')(observer(ArticleForm));
