export enum WallDirection {
    N, W, S, E
}

// Adicionando os métodos à enumeração
export namespace WallDirection {
    export function getNext(direction: WallDirection): WallDirection {
        return (direction + 1) % 4; // Rotaciona para a próxima direção
    }

    export function getPrevious(direction: WallDirection): WallDirection {
        return (direction - 1 + 4) % 4; // Rotaciona para a direção anterior, garantindo que não fique negativo
    }
}
