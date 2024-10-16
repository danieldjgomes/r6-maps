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

export enum DefenseSetupItemType {
    Rotation,
    HeadHeight,
    FootHeight,
    Vault,
    ReinforcementWall,
    ReinforcementHatch
}

interface SetupItemInfo {
    title: string;
    description: string;
    sourceImage: string;
    sourceIcon: string;
    size: {
        width: number;
        height: number;
    };
}

export const SetupItemDetails: { [key in DefenseSetupItemType]: SetupItemInfo } = {
    [DefenseSetupItemType.Rotation]: {
        title: "Rotation",
        description: "A rotation point for maneuvering between sections.",
        sourceImage: RotationImage,
        sourceIcon: RotationIcon,
        size: { width: 2.7, height: 2.7 }
    },
    [DefenseSetupItemType.HeadHeight]: {
        title: "Head Height Hole",
        description: "A hole that is as high as a person's head, useful for shooting.",
        sourceImage: HeadHeightImage,
        sourceIcon: HeadHeightIcon,
        size: { width: 2.7, height: 2.7 }
    },
    [DefenseSetupItemType.FootHeight]: {
        title: "Foot Height Hole",
        description: "A hole that is low to the ground, ideal for foot-level shots.",
        sourceImage: FootHeightImage,
        sourceIcon: FootHeightIcon,
        size: { width: 2.7, height: 2.7 }
    },
    [DefenseSetupItemType.Vault]: {
        title: "Vault",
        description: "A vaultable area to quickly pass between locations.",
        sourceImage: VaultImage,
        sourceIcon: VaultIcon,
        size: { width: 2.7, height: 2.7 }
    },
    [DefenseSetupItemType.ReinforcementWall]: {
        title: "Reinforced Wall",
        description: "A reinforced wall providing additional protection.",
        sourceImage: ReinforcementWallImage,
        sourceIcon: ReinforcementIcon,
        size: { width: 2.7, height: 2.7 }
    },
    [DefenseSetupItemType.ReinforcementHatch]: {
        title: "Reinforced Hatch",
        description: "A reinforced hatch offering protection from vertical attacks.",
        sourceImage: ReinforcementHatchImage,
        sourceIcon: HatchIcon,
        size: { width: 2, height: 2 }
    }
};
