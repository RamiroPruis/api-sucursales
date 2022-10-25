import http from 'http';
import sucursales from './api/sucursales/handler.js'
import errorHandler from './error.js';

const PORT = 2000


const server = http.createServer((req,res)=>{
    const {url} = req
    if (!url.includes('/api/sucursales')){
        errorHandler(400,"Endpoint no valido",res)
    } else{

        if(url.match(/api\/sucursales(\/[0-9]+)?/)){
            sucursales(req,res)
        }else{
            errorHandler(400,"Endpoint no valido",res)
        }

    }
})

server.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})












