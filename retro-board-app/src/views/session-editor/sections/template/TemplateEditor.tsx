import React, { useCallback } from 'react';
import { ColumnSettings } from '../../../../state/types';
import ColumnEditor from './ColumnEditor';
import useTranslation from '../../../../translations/useTranslations';
import { getTemplateColumnByType } from '../../../../state/columns';
import { Button } from '@material-ui/core';
import { trackEvent } from '../../../../track';

const MAX_NUMBER_OF_COLUMNS = 5;

interface TemplateEditorProps {
  columns: ColumnSettings[];
  onChange: (columns: ColumnSettings[]) => void;
}

function TemplateEditor({ columns, onChange }: TemplateEditorProps) {
  const translations = useTranslation();
  const handleColumnChange = useCallback((value: ColumnSettings, index: number) => {
    onChange(Object.assign([], columns, { [index]: value }));
    trackEvent('custom-modal/column/change');
  }, [onChange, columns]);
  const handleAddColumn = useCallback(() => {
    const custom = getTemplateColumnByType(translations)('custom');
    onChange([...columns, custom]);
    trackEvent('custom-modal/column/add');
  }, [onChange, columns, translations]);
  const handleRemoveColumn  =useCallback((column: ColumnSettings) => {
    onChange(columns.filter(c => c!== column));
    trackEvent('custom-modal/column/remove');
  }, [onChange, columns]);
  return (
    <>
    {columns.map((def, index) => (
      <ColumnEditor
        key={index}
        value={def}
        onChange={(value) => handleColumnChange(value, index)}
        onRemove={handleRemoveColumn}
      />
    ))}
    {columns.length < MAX_NUMBER_OF_COLUMNS ? <Button onClick={handleAddColumn}>Add</Button> : null}
    </>
  )
}

export default TemplateEditor;