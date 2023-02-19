export interface BountyItem {
    update(): void;
    terminate(): void;
    translateElement(element: HTMLElement): void;
}