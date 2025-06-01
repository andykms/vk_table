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
  onClickRecord: (record: InfiniteTableRecord) => void;
  hasMore: boolean;
  isLoad: boolean;
}

export const InfiniteTable = (props: InfiniteTableProps) => {
  const { records, fields, loader, onLoadMore, onClickRecord, hasMore, isLoad } = props;

  const [lastRecord, setLastRecord] = useState<number>(10);

  const loadMore = () => {
    setLastRecord(lastRecord + 10);
    onLoadMore(lastRecord.toString());
  };


  return (
    <InfiniteScroll
      dataLength={records.length}
      next={loadMore}
      hasMore={hasMore}
      loader={loader}
      endMessage={props.endMessage}
    >
      <Table records={records} fields={fields} onClickRecord={onClickRecord}/>
    </InfiniteScroll>
  );
}
