import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { identity } from 'lodash-es';
import React, { useCallback } from 'react';
import { downloadCsv } from '../util';

// The typechecking here is pretty much non-existent but w/e

interface Props {
  filename: string;
  headers: string[];
  data: any;
  transformData?: (data: any) => string[][];
}

const CsvButton: React.ComponentType<Props> = ({
  filename,
  headers,
  data,
  transformData = identity,
}) => {
  const onClick = useCallback(() => {
    const transformed = transformData(data)!;
    downloadCsv(filename, headers, transformed);
  }, []);

  return (
    <IconButton onClick={onClick}>
      <CloudDownloadIcon />
    </IconButton>
  );
};

export default CsvButton;
