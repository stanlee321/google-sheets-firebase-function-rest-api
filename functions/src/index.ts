import * as functions from 'firebase-functions';
import { google } from 'googleapis'

import { appendEntry } from './append'; 

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// const spreadsheet = functions.config().googleapis.sheets


export const helloWorld = functions.https.onRequest((request, response) => {


    if (request.method == "POST") {
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


   if (request.method == "GET") {
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

