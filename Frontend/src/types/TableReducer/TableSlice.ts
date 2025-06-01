import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "../../models/API";
import { MainApiUrls } from "../../constants/MainApiUrls";
import { getTableFields, getTableRecord, putTableRecord, createTableField, deleteTableRecord, addTableRecord, getTenTableRecords, deleteField, getTableTypes, getTableLength, putTableLength} from '../TableActions/TableActions';
import { get } from "http";


export interface ITableType {
  id: string;
  type: string;
}

export interface ITableRecordState {
  id: string,
  [key: string]: string|number|null|boolean,
}

export interface ITableFieldState {
  id: string,
  name: string,
}

export interface ITableRecordPayload {
  [key: string]: string,
  id: string,
}

export interface AddRecordFormPayload {
  name: string,
  value: string,
}

export interface ITableState {
  records: ITableRecordState[],
  types: ITableType[],
  fields: ITableFieldState[],
  loading: boolean,
  error: string,
  recordsCount: number,
  hasMore: boolean,
  formAddRecord: FormRecordData,
  length: number,
}

//

export interface FormRecordData {
  [key: string]: FormAddRecord,
}

//В форме у каждой записи будет выбор типа
export interface FormAddRecord {
  name: string;
  value: string;
  type: string;
}

export const initialState: ITableState = {
  records: [],
  fields: [],
  types: [],
  loading: false,
  error: "",
  recordsCount: 0,
  hasMore: true,
  formAddRecord: {},
  length: 0,
}

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<ITableRecordPayload>) => {
      state.records.push(action.payload)
    },
    deleteRecord: (state, action: PayloadAction<string>) => {
      state.records = state.records.filter(record => record.id !== action.payload)
    },
    setFormAddRecordValue: (state, action: PayloadAction<AddRecordFormPayload>) => {
      state.formAddRecord[action.payload.name].value = action.payload.value;
    },
    setFormAddRecordType: (state, action: PayloadAction<AddRecordFormPayload>) => {
      state.formAddRecord[action.payload.name].type = action.payload.value;
    },
    setFormAddRecord: (state, action: PayloadAction<FormRecordData>) => {
      state.formAddRecord = action.payload;
    },
  },
  selectors: {
    getRecords: (state: ITableState) => state.records,
    getFields: (state: ITableState) => state.fields,
    getLoad: (state: ITableState) => state.loading,
    getError: (state: ITableState) => state.error,
    getRecordsCount: (state: ITableState) => state.recordsCount,
    getHasMore: (state: ITableState) => state.hasMore,
    getTypes: (state: ITableState) => state.types,
    getFormAddRecord: (state: ITableState) => state.formAddRecord,
    getLength: (state: ITableState) => state.length,
  },
  //TODO: как-то зарефачить все эти .addCase, чтобы не было лишнего кода, как-то много кода в Slice...
  extraReducers: (builder) => {
    builder
      //Получение полей
      .addCase(getTableFields.fulfilled, (state, action) => {
        state.fields = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(getTableFields.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message?action.error.message:'';
      })
      .addCase(getTableFields.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      //Получение записи
      .addCase(getTableRecord.fulfilled, (state, action) => {
        state.records.push(action.payload);
        if(!action.payload) state.hasMore = false;
        state.recordsCount+=1;
        state.loading = false;
        state.error = "";
      })
      .addCase(getTableRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message?action.error.message:'';
      })
      .addCase(getTableRecord.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      //Создание записи
      .addCase(addTableRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.recordsCount+=1;
        state.records.push(action.payload);
        state.error = "";
      })
      .addCase(addTableRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message?action.error.message:'';
      })
      .addCase(addTableRecord.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      //Удаление записи
      .addCase(deleteTableRecord.fulfilled, (state, action) => {
        state.records = state.records.filter(record => record.id !== action.payload);
        state.loading = false;
        state.recordsCount-=1;
        state.error = "";
      })
      .addCase(deleteTableRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message?action.error.message:'';
      })
      .addCase(deleteTableRecord.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      //Изменение записи
      .addCase(putTableRecord.fulfilled, (state, action) => {
        state.records = state.records.map(record => record.id === action.payload.id ? action.payload : record);
        state.loading = false;
        state.error = "";
      })
      .addCase(putTableRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message?action.error.message:'';
      })
      .addCase(putTableRecord.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      //Получение 10 записей
      .addCase(getTenTableRecords.fulfilled, (state, action) => {
        state.records = [...state.records, ...action.payload];
        console.log(action.payload)
        state.recordsCount+=action.payload.length;
        console.log(state.recordsCount)
        if(action.payload.length < 10) {
          state.hasMore = false;
        }
        state.loading = false;
        state.error = "";
      })
      .addCase(getTenTableRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message?action.error.message:'';
      })
      .addCase(getTenTableRecords.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      //Создание нового поля (не записи!!!, это разные вещи!!!)
      .addCase(createTableField.fulfilled, (state, action) => {
        state.fields.push(action.payload as ITableFieldState);
        state.loading = false;
        state.error = "";
      })
      .addCase(createTableField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message?action.error.message:'';
      })
      .addCase(createTableField.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      //Удаление поля
      .addCase(deleteField.fulfilled, (state, action) => {
        state.fields = state.fields.filter(field => field.id !== action.payload);
        state.loading = false;
        state.error = "";
      })
      .addCase(deleteField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message?action.error.message:'';
      })
      .addCase(deleteField.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      //Получение типов 
      .addCase(getTableTypes.fulfilled, (state, action) => {
        state.types = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(getTableTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message?action.error.message:'';
      })
      .addCase(getTableTypes.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      //Получение длины таблицы
      .addCase(getTableLength.fulfilled, (state, action) => {
        state.length = action.payload.length;
        state.loading = false;
        state.error = "";
      })
      .addCase(getTableLength.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message?action.error.message:'';
      })
      .addCase(getTableLength.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      //Изменение длины
      .addCase(putTableLength.fulfilled, (state, action) => {
        state.length = action.payload.length;
        state.loading = false;
        state.error = "";
      })
      .addCase(putTableLength.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message?action.error.message:'';
      })
      .addCase(putTableLength.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
  },
})

export const {getRecords, getFields, getLoad, getError, getRecordsCount, getHasMore, getTypes, getFormAddRecord, getLength } = tableSlice.selectors;
export const tableReducer = tableSlice.reducer;
export const tableActions = tableSlice.actions;