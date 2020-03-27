# REST API


## DOC

### **`GET`** 

**LINK**:

```
https://us-central1-agetic-ocha.cloudfunctions.net/helloWorld?sheetId={sheetId}&sheet={sheetName}&colEnd={colEnd}&start={startAt}

```  

**QUERY PARAMS**

```
sheetId:  sheet id as string
sheet: sheetName as string
colEnd: colEnd as string
start: startAt as string
```

### **`POST`** 

**LINK**:

```
https://us-central1-agetic-ocha.cloudfunctions.net/helloWorld

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


