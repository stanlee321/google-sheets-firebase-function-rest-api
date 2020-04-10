import * as functions from 'firebase-functions';
//import * as firebase from 'firebase-admin';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

import { google } from 'googleapis'

import { appendEntry } from './append'; 

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// const spreadsheet = functions.config().googleapis.sheets





export const gSheetTools = functions.https.onRequest((request, response) => {

    if (request.method === "POST") {
        console.log("POST")

        const sheetId  = request.body.sheedId;

        const metadata = {
            sheetName: request.body.sheetName,
            sheetStartAt:  request.body.sheetStartAt,
            sheetEndAt: request.body.sheetEndAt,
            data: request.body.data
        };
    
        google.auth.getClient({
            // see other scopes here: https://developers.google.com/sheets/api/guides/authorizing

            scopes: ['https://www.googleapis.com/auth/spreadsheets'],

        }).then( async  auth => {
            const api = google.sheets({ version: 'v4', auth })

            return appendEntry(api, sheetId, auth, metadata).then(async _ => {
                console.log('write to google spreadsheet is successful')
                response.send("OK");
               // do something else
            })
            .catch(err => {
                console.warn('error writing to spreadsheet', err)
            })           
        })
        .catch((e) => console.log(e))


        //response.status(400).send("I am not happy");
        return;
   }


   if (request.method === "GET") {
        console.log("GET")
        console.log(request.query)

        const spreadSheetId  = request.query.sheetId
        const sheet = request.query.sheet
        const colEnd = request.query.colEnd
        const colStart = request.query.start
        
        google.auth.getClient({
            // see other scopes here: https://developers.google.com/sheets/api/guides/authorizing
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],

        }).then( async  auth => {
            const api = google.sheets({ version: 'v4', auth })

            const getSheets = api.spreadsheets
                    
            const sheetVals = await getSheets
                .values
                .get({ 
                    spreadsheetId: spreadSheetId,
                    range: `${sheet}!${colStart}:${colEnd}` 
                });    

            if (sheetVals.status < 200 || sheetVals.status > 299) {
                console.log('error reading sheet')
                return
            }
            response.send(sheetVals);
            
            }).catch( (e) => {
                console.log(e)
            })
    }
});


exports.onFireStoreChange = functions.firestore
    .document("bar_codes/{emails}")
    .onUpdate((change) => {
        const after = change.after.data();
        console.log(`The data is ${JSON.stringify(after)}`);

    // console.log(`New message from ${bar_codeId}`);
    // const messageData = snapshot.val();
    // const text =  messageData.text;

    // console.log(`Data is  ${ text }`);
    return;
});


export const epiTools = functions.https.onRequest( async (request, response) => {

    const firestoreInstance = admin.firestore();


    if (request.method === "POST") {
        console.log("POST")

        const data = {"144a234": {
            "positivos": 1234,
            "timestamp": new Date().toISOString()
        }}

        firestoreInstance.collection("epi-data").doc("Bolivia").create(data ).then( val => {

            response.status(200).send(val);
            return;
        }).catch(e => {
            console.log("ERROR: ", e)
        })
        //const data =  request.body.data

    }


    if (request.method === "GET") {
            // As an admin, the app has access to read and write all data, regardless of Security Rules
            firestoreInstance.collection("epi-data").doc("Bolivia").get().then(( doc => {
                response.status(200).send(doc.data());
                return;

            })).catch ((e) => {
                response.status(500).send(e)
                console.log(e)
                return;
            })

    }
});

