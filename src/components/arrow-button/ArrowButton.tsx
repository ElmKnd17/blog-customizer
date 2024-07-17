import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = (event: React.MouseEvent) => void;

export type ArrowButtonProps = {
	toggleFormOpenness: () => void;
	isOpen: boolean;
};

export const ArrowButton = ({
	toggleFormOpenness,
	isOpen,
}: ArrowButtonProps) => {
	const handleClick: OnClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		toggleFormOpenness();
	};
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
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
};
