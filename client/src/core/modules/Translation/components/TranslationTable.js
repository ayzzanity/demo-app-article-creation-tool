import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Table } from 'antd';
import { useTranslation } from 'react-i18next';

/**CORE IMPORTS */
import { EditableCell, EditableRow } from '@core_modules/Translation/components';
import { TranslationController } from '@core_modules/Translation/controller';
import { ExactCard } from '@core_common/components';

function TranslationTable({
  store,
  searchKeyword,
  searchProperties,
  count,
  setCount,
  modalVisible
}) {
  const { t } = useTranslation('common');
  const [columnLocales, setColumnLocales] = useState([]);

  let columns = [
    {
      title: 'Key',
      dataIndex: 'translation_key',
      width: '25%',
      editable: store.translations.isUpdateKey
    },
    ...columnLocales
  ];

  const { generateColumns, getTranslations, search, generateLocaleColumns } = TranslationController(
    {
      setCount,
      count,
      store,
      t,
      setColumnLocales
    }
  );
  columns = [
    {
      title: 'Key',
      dataIndex: 'translation_key',
      width: '25%',
      editable: store.translations.isUpdateKey
    },
    ...columnLocales
  ];

  columns = generateColumns(columns);
  // eslint-disable-next-line
  useEffect(getTranslations, []);

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };

  useEffect(() => {
    if (!modalVisible) {
      generateLocaleColumns();
    }
    // eslint-disable-next-line
  }, [modalVisible]);

  return (
    <div>
      <ExactCard>
        <Table
          loading={store.translations.isLoading}
          className="exact-table"
          size="small"
          components={components}
          rowClassName={() => 'editable-row'}
          dataSource={store?.translations?.state
            ?.toJSON()
            .filter((e) => search(searchProperties, e.toJSON())(searchKeyword))}
          columns={columns}
        />
      </ExactCard>
    </div>
  );
}

export default inject('store')(observer(TranslationTable));
