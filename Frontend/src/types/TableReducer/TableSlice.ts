import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "../../models/API";
import { MainApiUrls } from "../../constants/MainApiUrls";
import { getTableFields, getTableRecord, putTableRecord, createTableField, deleteTableRecord, addTableRecord, getTenTableRecords, deleteField} from '../TableActions/TableActions';

export interface ITableRecordState {
  id: string,
  [key: string]: string|number|null,
}

export interface ITableFieldState {
  id: string,
  name: string,
}

export interface ITableRecordPayload {
  [key: string]: string,
  id: string,
}

export interface ITableState {
  records: ITableRecordState[],
  fields: ITableFieldState[],
  loading: boolean,
  error: string,
}

export const initialState: ITableState = {
  records: [],
  fields: [],
  loading: false,
  error: "",
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
  },
  selectors: {
    getRecords: (state: ITableState) => state.records,
    getFields: (state: ITableState) => state.fields,
    getLoad: (state: ITableState) => state.loading,
    getError: (state: ITableState) => state.error,
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
        state.records = action.payload;
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
  },
})

export const {getRecords, getFields, getLoad, getError } = tableSlice.selectors;
export const tableReducer = tableSlice.reducer;