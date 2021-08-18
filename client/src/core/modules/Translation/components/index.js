import { lazy } from 'react';

const TranslationTable = lazy(() => import('./TranslationTable'));
const EditableRow = lazy(() => import('./EditableRow'));
const EditableCell = lazy(() => import('./EditableCell'));
const TranslationHeader = lazy(() => import('./TranslationHeader'));
const AddLanguageModal = lazy(() => import('./AddLanguageModal'));

export { TranslationTable, EditableRow, EditableCell, TranslationHeader, AddLanguageModal };
