
const fs = require('fs');

let listaPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listaPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw  new Error('No se pudo grabar', err)
    });
};


const cargarDB = () => {
    try {
        listaPorHacer = require('../db/data.json');
    } catch (error) {
        listaPorHacer = [];
    }
};

const getListado = () => {

    cargarDB();

    return listaPorHacer;
};

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listaPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
};


const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listaPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index > -1) {
        listaPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }
    else {
        return false;
    }
};

const borrar = (descripcion) => {

    cargarDB();

    let nuevoListado = listaPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (nuevoListado === listaPorHacer) {
        return false;
    }
    else {
        listaPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
};

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};