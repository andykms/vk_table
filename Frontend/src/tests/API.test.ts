import { Api, ApiUrls} from "../models/API";
import dotenv from 'dotenv';

dotenv.config({ path: '.env' }); 

const url: ApiUrls = {
  getFieldsUrl: process.env.API_GET_FIELDS,
  getRecordUrl: process.env.API_GET_RECORD,
  postRecordUrl: process.env.API_POST_RECORD,
  putRecordUrl: process.env.API_PUT_RECORD,
  deleteRecordUrl: process.env.API_DELETE_RECORD,
  getTypesUrl: process.env.API_GET_TYPES,
  postFieldUrl: process.env.API_POST_FIELD,
  putFieldUrl: process.env.API_PUT_FIELD,
  deleteFieldUrl: process.env.API_DELETE_FIELD
};

const mockApi = new Api(url);


test("Получение полей", async () => {
  const fields = await mockApi.getFields();
  expect(fields).toEqual([
        { 
          "id": "0",
          "name": "id"
        },
        { 
          "id": "1",
          "name": "Товар"
        },
        { 
          "id": "2",
          "name": "Цена"
        },
        { 
          "id": "3",
          "name": "Производитель"
        },
        { 
          "id": "4",
          "name": "Дата производства"
        }
  ]);
})

test("Получение типов", async () => {
  const fields = await mockApi.getTypes();
  expect(fields).toEqual([
    {"id": "0","type":"string"},
    {"id": "1","type":"integer"},
    {"id": "2","type":"float"},
    {"id": "3","type":"boolean"},
    {"id": "4","type":"null"}
  ]);
})

test("Получение первой записи", async () => {
  const fields = await mockApi.getRecord("0");
  expect(fields).toEqual({
      "id": "0",
      "Товар": "Блокатор берибанка-онлайн",
      "Цена": 1,
      "Производитель": "ПАО Тири-банк",
      "Дата производства": "19.12.3018"
    });
})

test("Получение произвольной записи", async () => {
  const fields = await mockApi.getRecord("2");
  expect(fields).toEqual({
      "id": "2",
      "Товар": "Голограмма музыки",
      "Цена": 9999,
      "Производитель": "Берзвук",
      "Дата производства": "11.07.2901"
    });
})

test("Удаление и добавление произвольной записи", async () => {
  const fields = await mockApi.deleteRecord("5");
  await mockApi.postRecord({
      "id": "5",
      "Товар": "Кешбек Тири-банка 1000 рублей",
      "Цена": 1200,
      "Производитель": "Тири-кеш",
      "Дата производства": "10.01.2808"
    });
  expect(fields).toEqual({
      "id": "5",
      "Товар": "Кешбек Тири-банка 1000 рублей",
      "Цена": 1200,
      "Производитель": "Тири-кеш",
      "Дата производства": "10.01.2808"
    });
})

test("Изменение произвольной записи", async () => {
  const fields = await mockApi.putRecord("3", {
      "id": "3",
      "Товар": "Tralavelo Tralala",
      "Цена": 450,
      "Производитель": "Tiki toko && InstReels",
      "Дата производства": "25.05.2005"
    });
  expect(fields).toEqual({
      "id": "3",
      "Товар": "Tralavelo Tralala",
      "Цена": 450,
      "Производитель": "Tiki toko && InstReels",
      "Дата производства": "25.05.2005"
    });
  const beforeField = await mockApi.putRecord("3", {
      "id": "3",
      "Товар": "La policino",
      "Цена": 86000,
      "Производитель": "Italiano",
      "Дата производства": "10.01.2808"
    });
  expect(beforeField).toEqual({
      "id": "3",
      "Товар": "La policino",
      "Цена": 86000,
      "Производитель": "Italiano",
      "Дата производства": "10.01.2808"
    });
})