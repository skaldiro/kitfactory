import type * as React from 'react';

export type Crew = 'blue' | 'mint' | 'yellow' | 'pink' | 'lavender' | 'peach' | 'shared';
export type IconName = 'back' | 'close' | 'plus' | 'minus' | 'arrowRight' | 'arrowUp' | 'check' | 'chevronDown' | 'more' | 'mic' | 'calendar' | 'trash' | 'bag';

/** Logo A, the Case. tile on light grounds, reversed on ink. */
export interface LogoProps { variant?: 'tile' | 'reversed'; size?: number; wordmark?: boolean }
export declare function Logo(props: LogoProps): React.ReactElement;

/** Scout's mark. Pass label only when it stands alone. */
export interface ScoutMarkProps { size?: 16 | 20 | 28 | number; label?: string }
export declare function ScoutMark(props: ScoutMarkProps): React.ReactElement;

/** scout = flare, only when the button hands work to Scout (decision 29). */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'scout' | 'primary' | 'secondary' | 'danger' | 'onDark' | 'ghostDark' | 'link'; size?: 'md' | 'sm'; icon?: IconName; block?: boolean }
export declare function Button(props: ButtonProps): React.ReactElement;

export interface IconButtonProps { icon: IconName; label: string; tone?: 'card' | 'mist' | 'clear'; onClick?: () => void }
export declare function IconButton(props: IconButtonProps): React.ReactElement;

export interface ChipProps { selected?: boolean; size?: 'md' | 'sm'; count?: number; onClick?: () => void; children?: React.ReactNode }
export declare function Chip(props: ChipProps): React.ReactElement;

export interface SegmentedProps { options: string[]; value: string; label: string; onChange?: (v: string) => void }
export declare function Segmented(props: SegmentedProps): React.ReactElement;

export interface StepperProps { value: number; min?: number; label?: string; onChange?: (v: number) => void }
export declare function Stepper(props: StepperProps): React.ReactElement;

export interface SwitchProps { on: boolean; label: string; onChange?: (on: boolean) => void }
export declare function Switch(props: SwitchProps): React.ReactElement;

export interface PackCheckProps { crew: Crew; state: 'empty' | 'partial' | 'done'; label: string; onClick?: () => void }
export declare function PackCheck(props: PackCheckProps): React.ReactElement;

export interface TagProps { kind?: 'buy' | 'bought'; children?: React.ReactNode }
export declare function Tag(props: TagProps): React.ReactElement;

export interface TextFieldProps { label: string; value?: string; placeholder?: string; optional?: boolean; icon?: IconName; id?: string }
export declare function TextField(props: TextFieldProps): React.ReactElement;

/** progress 0..1 turns the ring into packing progress. */
export interface CrewAvatarProps { name: string; crew: Crew; initial?: string; size?: 28 | 40 | 48 | 64 | number; progress?: number; showName?: boolean; caption?: string }
export declare function CrewAvatar(props: CrewAvatarProps): React.ReactElement;

export interface ItemRowProps { name: string; qty?: number; packed?: number; crew: Crew; toBuy?: boolean; bought?: boolean; bag?: string; highlight?: boolean; onToggle?: () => void }
export declare function ItemRow(props: ItemRowProps): React.ReactElement;

export interface CategoryCardProps { name: string; left: number; open?: boolean; onToggle?: () => void; children?: React.ReactNode }
export declare function CategoryCard(props: CategoryCardProps): React.ReactElement;

export interface ScoutCardProps { label?: string; title?: string; actions?: React.ReactNode; children?: React.ReactNode }
export declare function ScoutCard(props: ScoutCardProps): React.ReactElement;

export interface AssumedProps { children?: React.ReactNode }
export declare function Assumed(props: AssumedProps): React.ReactElement;

export interface ScoutBarProps { placeholder?: string; onAsk?: () => void; onAdd?: (() => void) | false }
export declare function ScoutBar(props: ScoutBarProps): React.ReactElement;

export interface MicButtonProps { state?: 'idle' | 'recording'; onClick?: () => void }
export declare function MicButton(props: MicButtonProps): React.ReactElement;

export interface ToastProps { action?: string; onUndo?: (() => void) | false; children?: React.ReactNode }
export declare function Toast(props: ToastProps): React.ReactElement;

export interface ConfirmCardProps { title: string; body?: string; confirm?: string; cancel?: string; onConfirm?: () => void; onCancel?: () => void }
export declare function ConfirmCard(props: ConfirmCardProps): React.ReactElement;

export interface SheetHeaderProps { title: string; label?: string; scout?: boolean; onClose?: () => void }
export declare function SheetHeader(props: SheetHeaderProps): React.ReactElement;

declare global { interface Window { Kitmunk: { Logo: typeof Logo; ScoutMark: typeof ScoutMark; Button: typeof Button; IconButton: typeof IconButton; Chip: typeof Chip; Segmented: typeof Segmented; Stepper: typeof Stepper; Switch: typeof Switch; PackCheck: typeof PackCheck; Tag: typeof Tag; TextField: typeof TextField; CrewAvatar: typeof CrewAvatar; ItemRow: typeof ItemRow; CategoryCard: typeof CategoryCard; ScoutCard: typeof ScoutCard; Assumed: typeof Assumed; ScoutBar: typeof ScoutBar; MicButton: typeof MicButton; Toast: typeof Toast; ConfirmCard: typeof ConfirmCard; SheetHeader: typeof SheetHeader } } }
