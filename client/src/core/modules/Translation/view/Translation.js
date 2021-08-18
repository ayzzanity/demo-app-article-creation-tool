import React, { useState, Suspense } from 'react';

/**CORE IMPORTS */
import { FallBackLoaders } from '@core_common/components';
import {
  TranslationTable,
  TranslationHeader,
  AddLanguageModal
} from '@core_modules/Translation/components';
import { inject, observer } from 'mobx-react';

function Translation({ store }) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [count, setCount] = useState(2);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Suspense fallback={FallBackLoaders.EmptyLoader}>
        <TranslationHeader
          setModalVisible={setModalVisible}
          setSearchKeyword={setSearchKeyword}
          setCount={setCount}
        />
      </Suspense>
      <Suspense fallback={FallBackLoaders.EmptyLoader}>
        <TranslationTable
          searchProperties={['translation_key', ...store?.translations?.localesArray]}
          searchKeyword={searchKeyword}
          count={count}
          setCount={setCount}
          modalVisible={modalVisible}
        />
      </Suspense>
      <Suspense fallback={FallBackLoaders.EmptyLoader}>
        <AddLanguageModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </Suspense>
    </>
  );
}

export default inject('store')(observer(Translation));
