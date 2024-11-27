import $api from "../http/api";

export default class TransportationService {
    static async getTransportations(searchOptions){
        return await $api.get('/transportation', {
            params: searchOptions,
        })
    }

    static async getByIdTransportation(id){
        return await $api.get(`/transportation/${id}`);
    }

    static async createTransportation(transportation){
        return await $api.post('/transportation', transportation);
    }

    static async updateTransportation(transportation, id){
        return await $api.put(`/transportation?id=${id}`, transportation);
    }

    static async deleteTransportation(id){
        return await $api.delete(`/transportation?id=${id}`);
    }
}

