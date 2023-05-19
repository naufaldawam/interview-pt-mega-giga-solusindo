import axios from 'axios'

const axiosinst = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL_DEV,
    headers: {
        'x-api-key': process.env.VUE_APP_APIKEY,
        'signature': process.env.VUE_APP_SIGNATURE
    }
})

const corsanywhere = process.env.VUE_APP_USE_CORSANYWHERE === 'true'
const proxyurl = process.env.VUE_APP_PROXY_URL

export default {
    async fetchProductCoupon(cb) {
        console.log('fetch Product Coupon')
        let url = process.env.VUE_APP_GET_PRODUCT_COUPON
        url = corsanywhere ? proxyurl + url : url

        await axiosinst.get(url)
            .then(response => {
                console.log(response.data)
                cb(response)
            })
            .catch(error => {
                if (error.response) cb(error.response)
                else if (error.request) cb(error.request)
                else cb(error)
            })
    },
    async postProductCoupon(data, cb) {
        let url = process.env.VUE_APP_POST_PRODUCT_COUPON
        url = corsanywhere ? proxyurl + url : url

        const body = {
            prodNameR: data.couponName,
            prodStatusR: data.couponStatus,
            prodValueR: 1 / data.couponConvertPoint,
            prodExpiredDateR: data.couponExpDate
        }

        await axiosinst.post(url, body)
            .then(response => {
                console.log('Post Product Coupon')
                console.log(response)
                cb(response)
            })
            .catch(error => {
                if (error.response) cb(error.response)
                else if (error.request) cb(error.request)
                else cb(error)
            })
    },
    async editProductCoupon(data, cb) {
        let url = process.env.VUE_APP_PUT_PRODUCT_COUPON
        url = corsanywhere ? proxyurl + url : url
        url = url + "/" + data.couponId;

        await axiosinst.put(url, null, {
                params: {
                    status: data.couponStatus === 1 ? 1 : 0,
                    expiredDate: data.couponExpDate
                }
            })
            .then(response => {
                console.log('Edit Lucky Draw Point')
                console.log(response)
                cb(response)
            })
            .catch(error => {
                if (error.response) cb(error.response)
                else if (error.request) cb(error.request)
                else cb(error)
            })
    }
}