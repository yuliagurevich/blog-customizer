import { useEffect } from 'react';

type UseEscPressClose = {
	isOpen: boolean;
	onClose: (isOpen: boolean) => void;
};

export function useEscPressClose({ isOpen, onClose }: UseEscPressClose) {
	useEffect(() => {
		const handleEscKeydown = (event: KeyboardEvent) => {
			event.key === 'Escape' && onClose(false);
		};

		if (isOpen) {
			document.body.addEventListener('keydown', handleEscKeydown);
		}
		return () => {
			document.body.removeEventListener('keydown', handleEscKeydown);
		};
	}, [isOpen, onClose]);
}
