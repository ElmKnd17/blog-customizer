import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Select } from '../select';
import { Text } from '../text';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import clsx from 'clsx';

export type ArticleParamsFormProps = {
	setParametres: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setParametres,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLDivElement | null>(null);
	const formRef = useRef<HTMLFormElement | null>(null);
	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClick);
			document.addEventListener('keydown', handleEscapePress);
			formRef.current?.addEventListener('submit', handleSubmit);
		}
		return () => {
			document.removeEventListener('mousedown', handleClick);
			document.removeEventListener('keydown', handleEscapePress);
			formRef.current?.removeEventListener('submit', handleSubmit);
		};
	}, [isOpen]);
	const handleSubmit = (event: SubmitEvent): void => {
		event.preventDefault();
	};
	const handleResetParametres = () => {
		setArticleState(defaultArticleState);
		setParametres(defaultArticleState);
	};
	const handleSetParametres = () => {
		setParametres(articleState);
	};
	const toggleFormOpenness = (): void => {
		setIsOpen((isOpen) => !isOpen);
	};
	const handleEscapePress = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			setIsOpen(false);
		}
	};
	const handleClick = (event: MouseEvent): void => {
		// FIXME
		if (!asideRef.current?.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};
	return (
		<>
			<ArrowButton toggleFormOpenness={toggleFormOpenness} isOpen={isOpen} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form ref={formRef} className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<div style={{ marginBlockStart: 50 }} />
					<Select
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(selected: OptionType): void => {
							setArticleState({ ...articleState, fontFamilyOption: selected });
						}}
					/>
					<div style={{ marginBlockStart: 50 }} />
					<RadioGroup
						name='font-family'
						selected={articleState.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={(selected: OptionType): void => {
							setArticleState({ ...articleState, fontSizeOption: selected });
						}}
					/>
					<div style={{ marginBlockStart: 50 }} />
					<Select
						selected={articleState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(selected: OptionType): void => {
							setArticleState({ ...articleState, fontColor: selected });
						}}
					/>
					<div style={{ marginBlockStart: 50 }} />
					<Separator />
					<div style={{ marginBlockStart: 50 }} />
					<Select
						selected={articleState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(selected: OptionType): void => {
							setArticleState({ ...articleState, backgroundColor: selected });
						}}
					/>
					<div style={{ marginBlockStart: 50 }} />
					<Select
						selected={articleState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(selected: OptionType): void => {
							setArticleState({ ...articleState, contentWidth: selected });
						}}
					/>
					<div style={{ marginBlockStart: 50 }} />
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={handleResetParametres}
						/>
						<Button
							title='Применить'
							type='submit'
							onClick={handleSetParametres}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
