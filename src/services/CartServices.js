import $api from "../http/api";

export default class CartService {
    static async getCart(){
        return await $api.get('/cart')
    }

    static async addToCart(item) {
        return await $api.post('/cart', item)
    }

    static async updateCart(item, id){
        return await $api.put(`/cart/${id}`, item)
    }

    static async deleteFromCart(id){
        return await $api.delete(`/cart/${id}`);
    }
}