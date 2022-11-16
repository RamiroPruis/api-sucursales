import fs from 'fs'


 

export function findAll(){
    const data = fs.readFileSync('./model/Sucursales.json')
    return JSON.parse(data)
}

export function create(s) {
    const data = fs.readFileSync('./model/Sucursales.json')
    const sucursales = JSON.parse(data)
    s.id = sucursales.length + 1
    sucursales.push(s)
    fs.writeFileSync('./model/Sucursales.json',JSON.stringify(sucursales,null,2),)

    return s.id
}

export function find(id){
    const data = fs.readFileSync('./model/Sucursales.json')
    const sucursales = JSON.parse(data)
    return sucursales.find((s)=> s.id == id)
}