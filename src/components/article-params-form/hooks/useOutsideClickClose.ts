import { MutableRefObject, useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	refs: MutableRefObject<HTMLElement | null>[];
	onClose: (isOpen: boolean) => void;
};

export function useOutsideClickClose({
	isOpen,
	refs,
	onClose,
}: UseOutsideClickClose) {
	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (refs.every((ref) => !ref.current?.contains(event.target as Node))) {
				onClose(false);
			}
		};

		if (isOpen) {
			document.body.addEventListener('mousedown', handleOutsideClick);
		}
		return () => {
			document.body.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen, onClose]);
}
