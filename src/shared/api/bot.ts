import axios from "axios"
import { sha256 } from "../helpers"

export const newPriceNotify = async (
    productName: string,
    oldPrice: number,
    newPrice: number
) => {
    const body = {
        productName,
        oldPrice,
        newPrice
    }

    const bodyString = JSON.stringify(body)
    const computedHash = await sha256(bodyString)

    await axios.post(`${process.env.BOT_IP}/bot/new-price`, body, {
        headers: {
            computed: computedHash
        }
    })
}

export const orderNotify = async (
    name: string,
    lastName: string,
    address: string,
    phone: string,
    delivery: string,
    price: number,
) => {
    const body = {
        name,
        lastName,
        address,
        phone,
        delivery,
        price
    }

    const bodyString = JSON.stringify(body)
    const computedHash = await sha256(bodyString)

    await axios.post(`${process.env.BOT_IP}/bot/order`, body, {
        headers: {
            computed: computedHash
        }
    })
}

export const oneClickOrderNoftify = async (
    name: string,
    phone: string,
    productName: string,
    link: string
) => {
    const body = {
        name,
        productName,
        link,
        phone,
    }

    const bodyString = JSON.stringify(body)
    const computedHash = await sha256(bodyString)

    await axios.post(`${process.env.BOT_IP}/bot/order/oneClick`, body, {
        headers: {
            computed: computedHash
        }
    })
}

export const reviewNotify = async (
    id: number,
    username: string,
    rating: number,
    title: string,
    description: string,
) => {
    const body = {
        username,
        id,
        rating,
        title,
        description
    }

    const bodyString = JSON.stringify(body)
    const computedHash = await sha256(bodyString)

    await axios.post(`${process.env.BOT_IP}/bot/review`, body, {
        headers: {
            computed: computedHash
        }
    })
}

export const questionNotify = async (
    name: string, 
    phone: string, 
    quesiton: string, 
    link: string
) => {
    const body = {
        name,
        phone,
        quesiton,
        link,
    }

    const bodyString = JSON.stringify(body)
    const computedHash = await sha256(bodyString)

    await axios.post(`${process.env.BOT_IP}/bot/question`, body, {
        headers: {
            computed: computedHash
        }
    })
}
