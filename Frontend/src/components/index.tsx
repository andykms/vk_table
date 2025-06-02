import { RootState, AppDispatch } from '../services/store'
import React, { useEffect, useState, useRef, use } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	getTenTableRecords,
	getTableFields,
} from '../types/TableActions/TableActions'
import {
	getRecords,
	getFields,
	getRecordsCount,
	getHasMore,
} from '../types/TableReducer/TableSlice'
import { ApiRecord } from '../types/API/records'
import { ApiField } from '../types/API/fields'
import { ApiType } from '../types/API/types'
import { Loader } from '../ui/Loader/Loader'
import { InfiniteTable } from './InfiniteTable/InfiniteTable'
import { TableHeader } from './TableHeader/TableHeader'
import { createDropMenus } from '../utils/createDropMenus'
import { Modal } from '../ui/Modal/Modal'
import { AddRecordForm } from './AddRecordForm/AddRecordForm'
import { createValidationsRules } from '../utils/createValidationsRules'
import { FormFieldAddRecord } from '../types/Form/FormFieldAddRecord'
import { FormValidation } from '../types/Form/FormValidationTypes'
import { getTypes } from '../types/TableReducer/TableSlice'
import { getTableTypes } from '../types/TableActions/TableActions'
import { FormData } from '../basedComponents/Form/Form'
import { ApiTypes } from '../types/API/types'
import { addTableRecord } from '../types/TableActions/TableActions'
import { getLoad } from '../types/TableReducer/TableSlice'
import { getFormAddRecord } from '../types/TableReducer/TableSlice'
import { FormAddRecord } from '../types/TableReducer/TableSlice'
import { FormRecordData } from '../types/TableReducer/TableSlice'
import { tableActions } from '../types/TableReducer/TableSlice'
import { getLength } from '../types/TableReducer/TableSlice'
import { putTableLength } from '../types/TableActions/TableActions'
import { getTableLength } from '../types/TableActions/TableActions'
import { getApiFromData } from '../utils/getApiFormData'


export const App = () => {
	const dispatch = useDispatch<AppDispatch>()
	let RecordsCount = useSelector<RootState, number>(getRecordsCount)
	const Records = useSelector<RootState, ApiRecord[]>(getRecords)
	const Fields = useSelector<RootState, ApiField[]>(getFields)
	const hasMore = useSelector<RootState, boolean>(getHasMore)
	const Types = useSelector<RootState, ApiType[]>(getTypes)
	const isLoad = useSelector<RootState, boolean>(getLoad)
	const formAddRecordData = useSelector<RootState, FormRecordData>(
		getFormAddRecord
	)
	const tableLength = useSelector<RootState, number>(getLength)
	const [isOpenModal, setOpenModal] = useState(false)
	const [validations, setValidations] = useState<FormValidation>({})
	const [modalContent, setModalContent] = useState(<></>)

	useEffect(() => {
		dispatch(getTableTypes())
	}, [dispatch])

	useEffect(() => {
		if (Types && Types.length > 0) {
			const formFields: FormRecordData = {}
			Fields.forEach((field) => {
				if (field.name !== 'id') {
					formFields[field.name] = {
						name: field.name,
						type: field.type,
						value: '',
					}
				}
			})
			dispatch(tableActions.setFormAddRecord(formFields))
		}
	}, [Fields])

	useEffect(() => {
		setValidations(createValidationsRules(formAddRecordData))
	}, [formAddRecordData])

	const onCloseModal = () => {
		setOpenModal(false)
	}

	useEffect(() => {
		dispatch(getTableFields())
	}, [dispatch])

	useEffect(() => {
		dispatch(getTableLength())
	}, [dispatch])

	useEffect(() => {
		dispatch(getTenTableRecords('0'))
		return () => {}
	}, [dispatch])

	const onChooseType = (type: ApiType, field: FormFieldAddRecord) => {
		dispatch(
			tableActions.setFormAddRecordType({
				name: field.name,
				value: type.type,
			})
		)
	}

	const onSubmitAddRecord = (data: FormData) => {
		const obData = getApiFromData(data);
		const newRecord: ApiRecord = {
			id: (tableLength + 1).toString(),
			...obData,
		}
		dispatch(addTableRecord(newRecord))
		dispatch(putTableLength(tableLength + 1));
		setOpenModal(false)
	}

	const onClickRecord = (record: ApiRecord) => {}

	const onClickAddRecord = () => {
		setOpenModal(true)
	}

	const loadMore = (start: string) => {
		dispatch(getTenTableRecords(start))
	}

	return (
		<>
			<Modal
				isOpen={isOpenModal}
				onClose={onCloseModal}
				content={
					<AddRecordForm
						formData={formAddRecordData}
						onSubmit={onSubmitAddRecord}
						validations={validations}
					/>
				}
			></Modal>
			<TableHeader
				DropMenus={createDropMenus({
					menuTitle: 'Опции',
					options: [
						Fields && Types
							? {
									name: 'Добавить запись',
									onClick: onClickAddRecord,
								}
							: {
									name: 'Добавить запись',
									onClick: () => {},
								},
					],
				})}
			/>
			<InfiniteTable
				isLoad={isLoad}
				hasMore={hasMore}
				records={Records}
				fields={Fields}
				onLoadMore={loadMore}
				loader={<Loader />}
				onClickRecord={onClickRecord}
			/>
		</>
	)
}
