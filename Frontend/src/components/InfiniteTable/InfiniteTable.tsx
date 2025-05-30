import InfiniteScroll from 'react-infinite-scroll-component';
import { Table } from '../Table/Table';
import { clickedRecordField } from '../Table/Table';
import { useState, useEffect } from 'react';


export interface InfiniteTableRecord {
  id: string,
  [key: string]: string|number|boolean|null,
}

export interface InfiniteTableField {
  id: string;
  name: string;
}

interface InfiniteTableProps {
  records: InfiniteTableRecord[];
  fields: InfiniteTableField[];
  loader: React.ReactNode;
  endMessage?: React.ReactNode;
  onLoadMore: (lastRecord: string) => void;
  onClick: (recordField: clickedRecordField) => void;
  hasMore: boolean;
  lastRecord: string;
}

export const InfiniteTable = (props: InfiniteTableProps) => {
  const { records, fields, loader, onLoadMore, onClick, hasMore, lastRecord } = props;

  const loadMore = () => {
    onLoadMore(lastRecord);
  };

  return (
    <InfiniteScroll
      dataLength={records.length}
      next={loadMore}
      hasMore={hasMore}
      loader={loader}
      endMessage={props.endMessage}
    >
      <Table records={records} fields={fields} onClick={onClick}/>
    </InfiniteScroll>
  );
}
