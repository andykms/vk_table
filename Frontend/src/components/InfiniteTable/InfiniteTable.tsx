import InfiniteScroll from 'react-infinite-scroll-component';
import { Table } from '../Table/Table';
import { clickedRecordField } from '../Table/Table';

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
  hasMore: boolean;
  loadMore: () => void;
  onClick: (recordField: clickedRecordField) => void;
}

export const InfiniteTable = (props: InfiniteTableProps) => {
  const { records, fields, loader, hasMore, loadMore, onClick } = props;
  return (
    <InfiniteScroll
      dataLength={records.length}
      next={loadMore}
      hasMore={hasMore}
      loader={loader}
    >
      <Table records={records} fields={fields} onClick={onClick}/>
    </InfiniteScroll>
  );
}
