
import { DefenseSetupItemType } from '../models/DefenseSetupItemType';

export interface InteractionState {
    isPlacingItem: boolean;
    isErasing: boolean;
    mouseOverMap: boolean;
    dragging: boolean;
    itemPlacingType: DefenseSetupItemType | null;
}
