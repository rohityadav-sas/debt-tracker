import axios from 'axios'
import http from 'http'
import https from 'https'
import ENV from '../config/env.js'

const axiosInstance = axios.create({
  baseURL: `https://api.telegram.org/bot${ENV.BOT_TOKEN}`,
  timeout: 10000,
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
})

export default axiosInstance
