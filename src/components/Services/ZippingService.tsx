import LZString from "lz-string";
import {R6Map} from "../Models/R6Map";
import {SetupItem} from "../Models/SetupItemMap";

export class ZippingService {

    compress(selectedMap: R6Map, setupItems: SetupItem[]): string {
        const configuration = {
            map: selectedMap.name,
            bombSites: selectedMap.bombSites.map((site) => ({
                ...site,
                bombs: site.bombs.map((bomb) => ({
                    ...bomb,
                    x: parseFloat(bomb.x.toFixed(3)),
                    y: parseFloat(bomb.y.toFixed(3)),
                })),
            })),
            setup: setupItems.map((item) => ({
                ...item,
                x: parseFloat(item.x.toFixed(3)),
                y: parseFloat(item.y.toFixed(3)),
            })),
        };

        const json = JSON.stringify(configuration);
        return LZString.compressToEncodedURIComponent(json);
    }

    decompress(compressedText: string) : string {
        return LZString.decompressFromEncodedURIComponent(compressedText);

    }
}