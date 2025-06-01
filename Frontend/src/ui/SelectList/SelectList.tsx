import { Menu } from '../Menu/Menu'
import { Button } from '../Button/Button'
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import style from './SelectList.module.scss';
import clsx from 'clsx'

export interface SelectOption {
	element: React.ReactNode
	id: string
}

export interface SelectListProps {
	menusElements: SelectOption[]
	menuTitle: string
	choosenId: string
}

export const SelectList = (props: SelectListProps) => {
	const { menusElements, menuTitle, choosenId } = props
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
		<div className={style.SelectList} ref={listRef}>
			<Button onClick={() => setIsOpen(!isOpen)}>{menuTitle}</Button>
			{isOpen ?
			<div className={style.menuWrapper}>
				<ul className={style.menu}>
					{menusElements.map((selectOption, index) =>
						//Так как предполагается, что кнопки в меню не будут динамически меняться, то можно использовать индекс как ключ
						//Конечно, это неправильная практика, но тем самым мы избавляемся от излишних пропсов
						{
							return selectOption.id !== choosenId ? (
								<li key={index} className={style.menuContent}>
									{selectOption.element}
								</li>
							) : (
								<li
									key={index}
									className={clsx(style.menuContent, style.choosen)}
								>
									{selectOption.element}
								</li>
							)
						}
					)}
				</ul>{' '}
			</div> : null}
		</div>
	)
}
