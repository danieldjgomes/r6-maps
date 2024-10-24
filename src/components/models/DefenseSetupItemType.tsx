// Importando imagens e ícones
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

// Define o tipo para os itens de configuração
export enum DefenseSetupItemType {
    Rotation = "Rotation",
    HeadHeight = "HeadHeight",
    FootHeight = "FootHeight",
    Vault = "Vault",
    ReinforcementWall = "ReinforcementWall",
    ReinforcementHatch = "ReinforcementHatch",
    Sentry = "Sentry",
    Mute = "Mute",
    Smoke = "Smoke",
    Castle = "Castle",
    Pulse = "Pulse",
    Doc = "Doc",
    Rook = "Rook",
    Kapkan = "Kapkan",
    Tachanka = "Tachanka",
    Jäger = "Jäger",
    Bandit = "Bandit",
    Frost = "Frost",
    Valkyrie = "Valkyrie",
    Caveira = "Caveira",
    Echo = "Echo",
    Mira = "Mira",
    Lesion = "Lesion",
    Ela = "Ela",
    Vigil = "Vigil",
    Maestro = "Maestro",
    Alibi = "Alibi",
    Clash = "Clash",
    Kaid = "Kaid",
    Mozzie = "Mozzie",
    Warden = "Warden",
    Goyo = "Goyo",
    Wamai = "Wamai",
    Oryx = "Oryx",
    Melusi = "Melusi",
    Aruni = "Aruni",
    Thunderbird = "Thunderbird",
    Thorn = "Thorn",
    Azami = "Azami",
    Solis = "Solis",
    Fenrir = "Fenrir",
    Tubarão = "Tubarão",
    Skopós = "Skopós"
}

// Define a interface para as informações dos itens
interface SetupItemInfo {
    title: string;
    description: string;
    sourceImage: string | undefined;
    sourceIcon: string;
    size: {
        width: number;
        height: number;
    };
}

// Tamanho padrão para os itens
const defaultSize = { width: 2.7, height: 2.7 };

// Detalhes dos itens de configuração
export const SetupItemDetails: { [key: string]: SetupItemInfo } = {
    "Rotation": {
        title: "Rotation",
        description: "A rotation point for maneuvering between sections.",
        sourceImage: RotationImage,
        sourceIcon: RotationIcon,
        size: { ...defaultSize }
    },
    "HeadHeight": {
        title: "Head Height Hole",
        description: "A hole that is as high as a person's head, useful for shooting.",
        sourceImage: HeadHeightImage,
        sourceIcon: HeadHeightIcon,
        size: { ...defaultSize }
    },
    "FootHeight": {
        title: "Foot Height Hole",
        description: "A hole that is low to the ground, ideal for foot-level shots.",
        sourceImage: FootHeightImage,
        sourceIcon: FootHeightIcon,
        size: { ...defaultSize }
    },
    "Vault": {
        title: "Vault",
        description: "A vaultable area to quickly pass between locations.",
        sourceImage: VaultImage,
        sourceIcon: VaultIcon,
        size: { ...defaultSize }
    },
    "ReinforcementWall": {
        title: "Reinforced Wall",
        description: "A reinforced wall providing additional protection.",
        sourceImage: ReinforcementWallImage,
        sourceIcon: ReinforcementIcon,
        size: { ...defaultSize }
    },
    "ReinforcementHatch": {
        title: "Reinforced Hatch",
        description: "A reinforced hatch offering protection from vertical attacks.",
        sourceImage: ReinforcementHatchImage,
        sourceIcon: HatchIcon,
        size: { width: 2, height: 2 }
    }
};

export class SetupItemManager {
    // Static function to obtain item details by name
    static getSetupItemByName(name: string): SetupItemInfo {

        // Verifica se o item existe em SetupItemDetails
        if (SetupItemDetails[name]) {
            return SetupItemDetails[name];
        }

        const operatorData = SetupItemManager.getOperatorDataByName(name);
        // Verifica se os dados do operador foram encontrados
        if (operatorData) {
            return {
                title: operatorData.operator.name,
                description: operatorData.operator.bio?.real_name || "No bio available",
                sourceImage: undefined,
                sourceIcon: operatorData.source || '',
                size: { ...defaultSize }
            };
        }

        // Retorno padrão caso não encontre o item ou operador
        return {
            title: "Unknown Item",
            description: "No description available",
            sourceImage: undefined,
            sourceIcon: '',
            size: { ...defaultSize }
        };
    }

    // Static function to get operator data by name
    static getOperatorDataByName(name: string): R6PlannerOperator | undefined {
        const operators = R6PlannerOperator.getAllOperators();
        console.log(operators)

        if (!operators || operators.length === 0) {
            console.error("Operator data not loaded or empty");
            return undefined;
        }

        return operators.find(o => o.operator.name === name);
    }

};
