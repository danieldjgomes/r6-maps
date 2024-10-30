import HeadHeightImage from '../../assets/images/sight_wall.jpeg';
import HeadHeightIcon from '../../assets/icons/head.svg';
import HatchIcon from '../../assets/icons/hatch.svg';
import FootHeightIcon from '../../assets/icons/foot.svg';
import VaultIcon from '../../assets/icons/vault.svg';
import RotationImage from '../../assets/images/rotation_wall.png';
import RotationIcon from '../../assets/icons/rotation.svg';
import FootHeightImage from '../../assets/images/prone_wall.jpeg';
import VaultImage from '../../assets/images/vault_wall.jpeg';
import ReinforcementHatchImage from '../../assets/images/reinforcement_hatch.jpeg';
import ReinforcementWallImage from '../../assets/images/reinforcement_wall.jpeg';
import ReinforcementIcon from '../../assets/icons/reinforcement.svg';
import { R6PlannerOperator } from "../mapViewer/r6PlannerOperator";

const DEFAULT_SIZE = { width: 2.7, height: 2.7 };

const SetupItemDetails = {
    Rotation: {
        title: "Rotation",
        description: "A rotation point for maneuvering between sections.",
        sourceImage: RotationImage,
        sourceIcon: RotationIcon,
        size: { ...DEFAULT_SIZE }
    },
    HeadHeight: {
        title: "Head Height Hole",
        description: "A hole that is as high as a person's head, useful for shooting.",
        sourceImage: HeadHeightImage,
        sourceIcon: HeadHeightIcon,
        size: { ...DEFAULT_SIZE }
    },
    FootHeight: {
        title: "Foot Height Hole",
        description: "A hole that is low to the ground, ideal for foot-level shots.",
        sourceImage: FootHeightImage,
        sourceIcon: FootHeightIcon,
        size: { ...DEFAULT_SIZE }
    },
    Vault: {
        title: "Vault",
        description: "A vaultable area to quickly pass between locations.",
        sourceImage: VaultImage,
        sourceIcon: VaultIcon,
        size: { ...DEFAULT_SIZE }
    },
    ReinforcementWall: {
        title: "Reinforced Wall",
        description: "A reinforced wall providing additional protection.",
        sourceImage: ReinforcementWallImage,
        sourceIcon: ReinforcementIcon,
        size: { ...DEFAULT_SIZE }
    },
    ReinforcementHatch: {
        title: "Reinforced Hatch",
        description: "A reinforced hatch offering protection from vertical attacks.",
        sourceImage: ReinforcementHatchImage,
        sourceIcon: HatchIcon,
        size: { width: 2, height: 2 }
    }
} as const;

interface SetupItemInfo {
    title: string;
    description: string;
    sourceImage?: string;
    sourceIcon: string;
    size: {
        width: number;
        height: number;
    };
}

export class SetupItemManager {
    static getSetupItemByName(name: string): SetupItemInfo {
        if (name in SetupItemDetails) {
            return SetupItemDetails[name as keyof typeof SetupItemDetails];
        }

        const operatorData = R6PlannerOperator.getAllOperators().find(o => o.operator.name === name);

        return operatorData ? {
            title: operatorData.operator.name,
            description: operatorData.operator.bio?.real_name || "No bio available",
            sourceImage: undefined,
            sourceIcon: operatorData.source || '',
            size: { ...DEFAULT_SIZE }
        } : {
            title: "Unknown Item",
            description: "No description available",
            sourceImage: undefined,
            sourceIcon: '',
            size: { ...DEFAULT_SIZE }
        };
    }
};
