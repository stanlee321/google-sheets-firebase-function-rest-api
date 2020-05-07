# REST APIS Firebase Functions.

Esta funcion de Firebase se contecta a un Google Sheet, se necesita el Link al archivo compartido de donde se extrae el `sheedId` que sirve para identificar la conexion.
Los dos usos que se tienen son:

* Escribir al Google Sheet con el metodo POST y leer desde el Google Sheet con el metodo GET en `gSheetTools`.
* Escribir y leer datos epidemiologicos a una base de datos de Firebase Cloud Storage con los metodos POST y GET en `epiTools`.

Cada caso de uso tiene un ejemplo lineas abajo.


**Todo el codigo fuente esta dentro de la carpeta `functions/src/` .**

## Deploy with

```
$firebase deploy --only functions
```

## DOCUMENTACION PARA gSheetTools

Con este endpoint podemos escribir y leer a un google sheet.


### **`GET`** 

Leer la tabla desde google sheets.
**LINK**:

```
https://us-central1-agetic-ocha.cloudfunctions.net/gSheetTools?sheetId={sheetId}&sheet={sheetName}&colEnd={colEnd}&start={startAt}

```  

**QUERY PARAMS**

```
sheetId:  sheet id as string
sheet: sheetName as string
colEnd: colEnd as string
start: startAt as string
```

### **`POST`** 

Escribir una tabla a google sheets.

**LINK**:

```
https://us-central1-agetic-ocha.cloudfunctions.net/gSheetTools

```  


**JSON BODY**


Example...

```json

{
	"sheedId": "1iE-0u6mOMupwMugClO_LtO6O5TjY1ExLgD5dXdw0zSE",
	"sheetName": "acumulados-deps-API",
	"sheetStartAt": "2",
	"sheetEndAt": "M",
	"data": [[7, "1", 8,4,15,6]]
}

```


## DOCUMENTACION PARA `epiTools`

Endpoint para escribir y leer a una base de datos de Firebase Cloud Storage datos EPI.


### **`GET`** 

Leer la tabla desde google sheets.
**LINK**:

```
https://us-central1-agetic-ocha.cloudfunctions.net/epiTools?last=true

```

**QUERY PARAMS**

```
last: string as true or false

```

if `last=true` retorna solo el ultimo dato registrado.

**RETURNS**

```
	{
	    "confirmados_Bolivia": 296,
	    "confirmados_BENI": 0,
	    "confirmados_CHUQUISACA": 1,
	    "activos_LA PAZ": 57,
	    "activos_TARIJA": 1,
	    "recuperados_POTOSI": 0,
	    "activos_COCHABAMBA": 45,
	    "recuperados_SANTA CRUZ": 0,
	    "activos_POTOSI": 14,
	    "decesos_ORURO": 1,
	    "confirmados_SANTA CRUZ": 143,
	    "confirmados_PANDO": 12,
	    "decesos_POTOSI": 1,
	    "recuperados_COCHABAMBA": 0,
	    "recuperados_ORURO": 1,
	    "recuperados_PANDO": 0,
	    "decesos_LA PAZ": 8,
	    "recuperados_CHUQUISACA": 0,
	    "activos_BENI": 0,
	    "recuperados_TARIJA": 0,
	    "decesos_SANTA CRUZ": 10,
	    "recuperados_BENI": 0,
	    "activos_CHUQUISACA": 1,
	    "recuperados_Bolivia": 1,
	    "confirmados_COCHABAMBA": 49,
	    "decesos_Bolivia": 24,
	    "decesos_TARIJA": 0,
	    "activos_PANDO": 12,
	    "confirmados_POTOSI": 15,
	    "confirmados_LA PAZ": 65,
	    "confirmados_TARIJA": 1,
	    "decesos_PANDO": 0,
	    "confirmados_ORURO": 10,
	    "activos_Bolivia": 271,
	    "activos_ORURO": 8,
	    "decesos_CHUQUISACA": 0,
	    "activos_SANTA CRUZ": 133,
	    "decesos_BENI": 0,
	    "decesos_COCHABAMBA": 4,
	    "timestamp": "2020-04-12T19:35:33",
	    "recuperados_LA PAZ": 0
	}
```

if `all=true`, regresa todos los datos registrados en la DB hasta la fecha.

**RETURNS**


```json

{
    "2020-04-07T01:02:10": {
        "activos_bolivia": 123,
        "confirmados_sc": 3,
        "confirmados_or": 1,
        "activos_pando": 2,
        "decesos_cbba": 1,
        "decesos_beni": 2,
        "confirmados_bolivia": 1,
        "activos_tarija": 2,
        "activos_chuquisaca": 12,
        "recuperados_or": 1,
        "confirmados_beni": 2,
        "confirmados_lp": 1,
        "recuperados_pando": 2,
        "recuperados_sc": 3,
        "decesos_lp": 3,
        "decesos_pando": 3,
        "confirmados_chuquisaca": 3,
        "activos_or": 1,
        "decesos_chuquisaca": 2,
        "confirmados_pando": 3,
        "activos_cbba": 4,
        "activos_sc": 3,
        "decesos_tarija": 1,
        "recuperados_lp": 1,
        "confirmados_tarija": 2,
        "activos_lp": 1,
        "decesos_sc": 3,
        "recuperados_bolivia": 3,
        "confirmados_cbba": 3,
        "timestamp": "2020-04-11T01:02:10.890Z",
        "recuperados_tarija": 2,
        "activos_beni": 2,
        "recuperados_cbba": 1,
        "decesos_bolivia": 1,
        "recuperados_beni": 2,
        "decesos_or": 1,
        "recuperados_chuquisaca": 2
    },
    "2020-04-05T01:02:10": {
        "activos_beni": 2,
        "recuperados_cbba": 1,
        "decesos_bolivia": 1,
        "recuperados_beni": 2,
        "decesos_or": 1,
        "recuperados_chuquisaca": 2,
        "activos_bolivia": 123,
        "confirmados_sc": 3,
        "confirmados_or": 1,
        "activos_pando": 2,
        "decesos_cbba": 1,
        "decesos_beni": 2,
        "confirmados_bolivia": 1,
        "activos_tarija": 2,
        "activos_chuquisaca": 12,
        "recuperados_or": 1,
        "confirmados_beni": 2,
        "confirmados_lp": 1,
        "recuperados_pando": 2,
        "recuperados_sc": 3,
        "decesos_lp": 3,
        "decesos_pando": 3,
        "confirmados_chuquisaca": 3,
        "activos_or": 1,
        "decesos_chuquisaca": 2,
        "confirmados_pando": 3,
        "activos_cbba": 4,
        "activos_sc": 3,
        "decesos_tarija": 1,
        "recuperados_lp": 1,
        "confirmados_tarija": 2,
        "activos_lp": 1,
        "decesos_sc": 3,
        "timestamp": "2020-04-05T01:02:10.890Z",
        "recuperados_bolivia": 3,
        "confirmados_cbba": 3,
        "recuperados_tarija": 2
        },
    }
}
```


### **`POST`** 

Escribir datos en la base de datos de Firebase Cloud Storage.

**LINK**:

```
https://us-central1-agetic-ocha.cloudfunctions.net/epiTools

```


Ejemplo de BODY para enviar en forma de JSON que se escribira en la base de datos.


```json

{
	"2020-04-12T01:02:10":  {
			"confirmados_bolivia": 1,
                    "activos_bolivia":  123,
                    "recuperados_bolivia": 3,
                    "decesos_bolivia":1,
                    
                    "confirmados_lp": 1,
                    "activos_lp": 1,
                    "recuperados_lp": 1,
                    "decesos_lp": 3,

                    "confirmados_sc": 3,
                    "activos_sc":  3,
                    "recuperados_sc":3,
                    "decesos_sc": 3,

                    "confirmados_cbba": 3,
                    "activos_cbba":  4,
                    "recuperados_cbba": 1,
                    "decesos_cbba": 1,

                    "confirmados_or": 1,
                    "activos_or": 1,
                    "recuperados_or": 1,
                    "decesos_or": 1,

                    "confirmados_tarija": 2,
                    "activos_tarija":  2,
                    "recuperados_tarija": 2,
                    "decesos_tarija": 1,

                    "confirmados_chuquisaca": 3,
                    "activos_chuquisaca":  12,
                    "recuperados_chuquisaca": 2,
                    "decesos_chuquisaca": 2,

                    "confirmados_beni": 2,
                    "activos_beni":  2,
                    "recuperados_beni": 2,
                    "decesos_beni": 2,

                    "confirmados_pando": 3,
                    "activos_pando":  2,
                    "recuperados_pando": 2,
                    "decesos_pando": 3,

                    "timestamp": "2020-04-11T01:02:10"
              }
 }


```

