import axios from 'axios'

export default {

    async authRegister(data, cb) {
        let url = 'http://159.223.57.121:8090/auth/register'

        const body = {
          password: data.password,
          profileName: data.profileName,
          username: data.username
        }

        await axiosinst.post(url, body)
            .then(response => {
                console.log('Get Account Register')
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