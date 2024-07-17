import { RefObject, useEffect } from 'react';

type UseStandartClosure = {
	rootRef: RefObject<HTMLDivElement | null>;
	isOpen: boolean;
	onClose: (isOpen: boolean) => void;
};

export const useStandartClosure = ({
	rootRef,
	isOpen,
	onClose,
}: UseStandartClosure): void => {
	const handleEscapePress = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			onClose(false);
		}
	};
	const handleOutsideClick = (event: MouseEvent): void => {
		if (!rootRef.current?.contains(event.target as Node)) {
			onClose(false);
		}
	};
	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleOutsideClick);
			document.addEventListener('keydown', handleEscapePress);
		}
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
			document.removeEventListener('keydown', handleEscapePress);
		};
	}, [isOpen]);
};
