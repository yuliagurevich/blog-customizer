import { clsx } from 'clsx';

import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { forwardRef } from 'react';

type ArrowButtonProps = {
	handleClick: () => void;
	isOpen: boolean;
};

export type Ref = HTMLDivElement;

export const ArrowButton = forwardRef<Ref, ArrowButtonProps>(
	function ArrowButton({ handleClick, isOpen }, ref) {
		return (
			/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
			<div
				ref={ref}
				role='button'
				aria-label='Открыть/Закрыть форму параметров статьи'
				tabIndex={0}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				onClick={handleClick}>
				<img
					src={arrow}
					alt='иконка стрелочки'
					className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
				/>
			</div>
		);
	}
);
