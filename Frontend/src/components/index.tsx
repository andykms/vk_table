import { RootState, AppDispatch } from "../services/store"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTenTableRecords, getTableFields } from "../types/TableActions/TableActions";
import { getRecords, getFields, getRecordsCount, getHasMore } from "../types/TableReducer/TableSlice";
import { ApiRecord } from "../types/API/records";
import { ApiField } from "../types/API/fields";
import { Loader } from "../ui/Loader/Loader";
import { InfiniteTable } from "./InfiniteTable/InfiniteTable";

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const RecordsCount = useSelector<RootState, number>(getRecordsCount);
  const Records = useSelector<RootState, ApiRecord[]>(getRecords);
  const Fields = useSelector<RootState, ApiField[]>(getFields);
  const hasMore = useSelector<RootState, boolean>(getHasMore);

  useEffect(() => {
    dispatch(getTableFields());
    dispatch(getTenTableRecords("0"));
  }, [dispatch])

  const loadMore = (start: string) => {
    dispatch(getTenTableRecords(start))
  }

  return (
    <div>
      <InfiniteTable hasMore= {hasMore} lastRecord = {RecordsCount.toString()} records={Records} fields={Fields} onLoadMore={loadMore} loader={<Loader/>} onClick={()=>{}}/>
    </div>
  )
}