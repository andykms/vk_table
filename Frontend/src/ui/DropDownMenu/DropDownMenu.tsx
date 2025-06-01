import { Menu } from '../Menu/Menu'
import { Button } from '../Button/Button'
import { useState, useRef, useEffect } from 'react'
import style from './DropDownMenu.module.scss'

export interface DropDownMenuProps {
	menusElements: React.ReactNode[]
	menuTitle: string
  uniqueKey?: string
}

export const DropDownMenu = (props: DropDownMenuProps) => {
	const { menusElements, menuTitle, uniqueKey} = props
	const [isOpen, setIsOpen] = useState(false)
	const listRef = useRef<HTMLDivElement>(null)

	const onClickOtherPlace = (evt: MouseEvent) => {
		if (listRef.current && !listRef.current.contains(evt.target as Node)) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', onClickOtherPlace)
		return () => {
			document.removeEventListener('mousedown', onClickOtherPlace)
		}
	}, [])
	return (
		<div className={style.DropDownMenu} ref ={listRef}>
			<Button onClick={() => setIsOpen(!isOpen)}>{menuTitle}</Button>
			<div className={style.menuContainer}>
				<Menu menusElements={menusElements} isOpen={isOpen} uniqueKey={uniqueKey}/>
			</div>
		</div>
	)
}
