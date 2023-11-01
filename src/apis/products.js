import axios from "axios";

export const getProducts = async (offset, limit) => {
    return await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit ? limit : ''}`)
    .then( (response) =>  response)
    .catch( (error) => error);
}

export const postProduct = async (title, price, description, categoryId) => {
    const bodyPayload = {
        title,
        price: Number(price),
        description,
        categoryId : Number(categoryId),
        images: ["https://ko.vitejs.dev/logo.svg"]
    }
    return await axios.post(`https://api.escuelajs.co/api/v1/products/`, bodyPayload)
    .then( (response) =>  response)
    .catch( (error) => error);
}