import { Api } from "../models/API";
import { TestApiUrls } from "../constants/TestApiUrls";


//Используем отдельные URL и отдельную базу данных JSON-server для тестов (testdb.json)
//(Для "прода" используем db.json)
const mockApi = new Api(TestApiUrls);

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
        },
        {
          "id": "5",
          "name": "Категория"
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

test("Получение произвольной записи", async () => {
  const fields = await mockApi.getRecord("102");
  expect(fields).toEqual({
      "id": "102",
      "Товар": "Мега карта от берибанка",
      "Цена": 1000,
      "Производитель": "ПАО Берибанк",
      "Дата производства": "19.12.3018",
      "Категория": "Платежные сервисы"
    });
})

test("Удаление и добавление произвольной записи", async () => {
  const fields = await mockApi.deleteRecord("104");
  //Добавляем обратно, чтобы следующие тесты не фэилились
  await mockApi.postRecord({
      "id": "104",
      "Товар": "La policino",
      "Цена": 86000,
      "Производитель": "Italiano",
      "Дата производства": "10.01.2808",
      "Категория": "Защитные средства"
    });
  //Проверяем первый объект, перед добавлением нового
  expect(fields).toEqual({
      "id": "104",
      "Товар": "La policino",
      "Цена": 86000,
      "Производитель": "Italiano",
      "Дата производства": "10.01.2808",
      "Категория": "Защитные средства"
    });
})

test("Изменение произвольной записи", async () => {
  const fields = await mockApi.putRecord("105", {
      "id": "105",
      "Товар": "Tralavelo Tralala",
      "Цена": 450,
      "Производитель": "Tiki toko && InstReels",
      "Дата производства": "25.05.2005"
    });
  expect(fields).toEqual({
      "id": "105",
      "Товар": "Tralavelo Tralala",
      "Цена": 450,
      "Производитель": "Tiki toko && InstReels",
      "Дата производства": "25.05.2005"
    });
  const beforeField = await mockApi.putRecord("105", {
      "id": "105",
      "Товар": "АКЦИЯ Бонусы берпазиба 1000 рублей",
      "Цена": 1500,
      "Производитель": "Берпазиба",
      "Дата производства": "09.01.2808",
      "Категория": "Платежные сервисы"
    });
  expect(beforeField).toEqual({
      "id": "105",
      "Товар": "АКЦИЯ Бонусы берпазиба 1000 рублей",
      "Цена": 1500,
      "Производитель": "Берпазиба",
      "Дата производства": "09.01.2808",
      "Категория": "Платежные сервисы"
    });
})

test('Получение 10 записей начиная с некоторой записи', async () => {
  const fields = await mockApi.getPartyRecords("85",10);
  expect(fields).toHaveLength(10);
})

test('Добавление поля и его удаление', async () => {
  const fields = await mockApi.postField({
      "id": "6",
      "name": "Категория"
    });
  expect(fields).toEqual({
      "id": "6",
      "name": "Категория"
    });
  const deletedField = await mockApi.deleteField("6");
  expect(deletedField).toEqual({
      "id": "6",
      "name": "Категория"
  });
})