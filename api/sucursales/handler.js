
import errorHandler from "../../error.js"
import * as Sucursales from '../../model/Sucursales.js'


const METHOD_HANDLER = {
    GET: get,
    POST: post,
    DELETE: del
}

const ID_METHOD_HANDLER = {
    GET: getbyID
}

export default function sucursales (req,res){
    const {url,method} = req
    
    const id = url.split('/').pop()

    if (id.match(/[0-9]+/)){
       ID_METHOD_HANDLER[method](req,res,id)
    }
    else{
        try{
            METHOD_HANDLER[method](req,res)
        }
        catch{
            errorHandler(405,"Metodo no permitido",res)
        }
    }         
}


function get(req,res){
    try{
        const sucursales = Sucursales.findAll()
    
        res.writeHead(200,{'Content-Type': 'application/json'})
        res.end(JSON.stringify(sucursales))
    }
    catch{
        errorHandler(500,"Error interno del servidor",res)
    }
}

function getbyID(req,res,id){
    const s = Sucursales.find(id)
    res.writeHead(200,{'Content-Type': 'application/json'})
    res.end(JSON.stringify(s))
}

function post(req,res){
    let body = []
    req.on('data',(chunk)=>{
        body += chunk
    })

    req.on('end',()=>{
        const sucursal = JSON.parse(body)
        const id = Sucursales.create(sucursal)
        
        res.writeHead(201,{'Content-Type': 'application/json'})
        res.end(JSON.stringify({id}))
    })


}

function del(req,res){
    
}
