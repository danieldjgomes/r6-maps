import React from "react";
import axios from "axios";

export class ApiService {


    getSetupDataById(id: string): Promise<string> {
        return axios
            .get("https://kv-api.r6-planner.top/key/" + id)
            .then((response) => {
                return response.data.value;
            })
            .catch(() => {
                throw new Error("Erro ao buscar os dados"); // Lançar erro se algo falhar
            });
    }

    saveSetupByCompressedData(compressedSetup: string): Promise<string> {
        const data = {
            value: compressedSetup
        }
        return axios.post(
            'https://kv-api.r6-planner.top/key', data)
            .then((response) => {
                return response.data.key;
            }).catch(() => {
                throw new Error("Erro ao salvar os dados");
            });
    }

}
