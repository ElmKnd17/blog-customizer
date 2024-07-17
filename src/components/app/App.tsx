import clsx from 'clsx';
import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from '../../styles/index.module.scss';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

export const App = () => {
	const [pageState, setPageState] =
		useState<ArticleStateType>(defaultArticleState);
	const setParametres = (articleState: ArticleStateType): void => {
		setPageState(articleState);
	};
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setParametres={setParametres} />
			<Article />
		</div>
	);
};
