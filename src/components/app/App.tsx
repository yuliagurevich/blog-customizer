import { CSSProperties, useState } from 'react';

import { Article } from 'components/article/Article';
import { ArticleParamsForm } from 'components/article-params-form';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

import styles from './App.module.scss';

export const App = () => {
	const [articleParams, setArticleParams] =
		useState<ArticleStateType>(defaultArticleState);

	function handleApplyParams(updatedArticleParams: ArticleStateType) {
		setArticleParams(updatedArticleParams);
	}

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleParams.fontFamilyOption.value,
					'--font-size': articleParams.fontSizeOption.value,
					'--font-color': articleParams.fontColor.value,
					'--container-width': articleParams.contentWidth.value,
					'--bg-color': articleParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleParams={articleParams}
				handleApplyParams={handleApplyParams}
			/>
			<Article />
		</main>
	);
};
