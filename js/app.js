const ingresos = [
    new Ingreso('Salario', 2100),
    new Ingreso('Venta Coche', 1500)
]


const egresos = [
    new Egreso('Renta Departamento', 900),
    new Egreso('Ropa', 400)
]


let cargarApp = () => {
    cargarCabecero()
    cargarIngresos()
    cargarEgresos()
}

let totalIngresos = () => {
    let totalIngresos = 0
    for(let ingreso of ingresos){
        totalIngresos += ingreso.valor
    }
    return totalIngresos
}

let totalEgresos = () => {
    let totalEgreso = 0
    for(let egreso of egresos){
        totalEgreso += egreso.valor
    }
    return totalEgreso
}

let cargarCabecero = () => {
    // imprime todos datos dados en las anteriores funciones 
    let presupuesto = totalIngresos() - totalEgresos()
    let porcentajeEgreso = totalEgresos()/totalIngresos()
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto)
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso)
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos())
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos())
}

const formatoMoneda = (valor) =>{
    return valor.toLocaleString('en-AR', {style: 'currency', currency:'ARS', minimumFractionDigits:2}) // idioma por default en-US
}


const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US', {style:'percent', minimumFractionDigits:2}) //convierte porcentaje 
}

const cargarIngresos = () =>{
    let ingresosHTMl = ''
    for(let ingreso of ingresos){
        ingresosHTMl += crearIngresoHTML(ingreso) // hace la funcion crearingreoHTML y lo agrega a ingresosHTML
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTMl
}

const crearIngresoHTML = (ingreso) => { // genera todo este codigo para un ingreso
    // ingreso.descripcion = nombre del ingreso // ingreso.valor = valor del ingreso
    let ingresoHTMl = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${ingreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `
    return ingresoHTMl
}

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id) //encuentra el indice del objeto que se busca en este caso el id
    //for(let ingreso of ingresos) es parecido findIndex
    ingresos.splice(indiceEliminar, 1)
    cargarCabecero()
    cargarIngresos()
}


const cargarEgresos = () => {
    let egresosHTML = ''
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso)
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML
}


const crearEgresoHTML = (egreso) =>{
    // egreso.descripcion = nombre del egreso // egreso.valor = valor del egreso
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `
    return egresoHTML
}

const eliminarEgreso = (id) =>{
    let egresoEliminar = egresos.findIndex(egreso => egreso.id === id) //encuentra el indice del objeto que se busca en este caso el id
    //for(let ingreso of ingresos) es parecido findIndex
    egresos.splice(egresoEliminar, 1) // elimina por 1 
    cargarCabecero()
    cargarEgresos()
}


let agregarDato = () =>{
    let forma = document.forms['forma']
    let tipo = forma['tipo']
    let descripcion = forma['descripcion']
    let valor = forma['valor']
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push( new Ingreso(descripcion.value, Number(valor.value)))
            cargarCabecero()
            cargarIngresos()
        }
        else if(tipo.value === 'egreso'){
            egresos.push( new Egreso(descripcion.value, Number(valor.value)))
            cargarCabecero()
            cargarEgresos()
        }
    }
}


