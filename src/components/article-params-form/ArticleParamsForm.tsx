import { clsx } from 'clsx';
import { useRef, useState } from 'react';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';

import styles from './ArticleParamsForm.module.scss';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import { useEscPressClose } from './hooks/useEscPressClose';

type ArticleParamsFormProps = {
	articleParams: {
		fontFamilyOption: OptionType;
		fontSizeOption: OptionType;
		fontColor: OptionType;
		backgroundColor: OptionType;
		contentWidth: OptionType;
	};
	handleApplyParams: (updatedArticleParams: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { articleParams, handleApplyParams } = props;

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedParams, setSelectedParams] =
		useState<ArticleStateType>(articleParams);

	const paramsFormRef = useRef<HTMLElement | null>(null);
	const arrowButtonRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen,
		refs: [paramsFormRef, arrowButtonRef],
		onClose: setIsOpen,
	});

	useEscPressClose({
		isOpen,
		onClose: setIsOpen,
	});

	function toggleIsOpen() {
		setIsOpen((previousState) => !previousState);
	}

	function handleOptionChange(
		name: keyof ArticleStateType,
		option: OptionType
	) {
		setSelectedParams({
			...selectedParams,
			[name]: option,
		});
	}

	function handleResetClick() {
		setSelectedParams(defaultArticleState);
		handleApplyParams(defaultArticleState);
		setIsOpen(false);
	}

	return (
		<>
			<ArrowButton
				ref={arrowButtonRef}
				handleClick={toggleIsOpen}
				isOpen={isOpen}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={paramsFormRef}>
				<form
					className={styles.form}
					onSubmit={(event) => {
						event?.preventDefault();
						handleApplyParams(selectedParams);
						setIsOpen(false);
					}}>
					{/* Text: Заголовок формы параметров */}
					<Text as={'h2'} uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					{/* Select: Выбор шрифта */}
					<Select
						title={'Шрифт'}
						options={fontFamilyOptions}
						selected={selectedParams.fontFamilyOption}
						onChange={(option) =>
							handleOptionChange('fontFamilyOption', option)
						}
					/>
					{/* Radio-Group: Выбор размера шрифта */}
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={selectedParams.fontSizeOption}
						onChange={(option) => handleOptionChange('fontSizeOption', option)}
					/>
					{/* Select: Выбор цвета шрифта */}
					<Select
						title={'Цвет шрифта'}
						options={fontColors}
						selected={selectedParams.fontColor}
						onChange={(option) => handleOptionChange('fontColor', option)}
					/>
					{/* Separator: Разделитель */}
					<Separator />
					{/* Select: Выбор цвета фона */}
					<Select
						title={'Цвет фона'}
						options={backgroundColors}
						selected={selectedParams.backgroundColor}
						onChange={(option) => handleOptionChange('backgroundColor', option)}
					/>
					{/* Select: Выбор ширины контента */}
					<Select
						title={'Ширина контента'}
						options={contentWidthArr}
						selected={selectedParams.contentWidth}
						onChange={(option) => handleOptionChange('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetClick} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
