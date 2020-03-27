import * as functions from 'firebase-functions';
import { google } from 'googleapis'

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// const spreadsheet = functions.config().googleapis.sheets


export const helloWorld = functions.https.onRequest((request, response) => {

    console.log(request.query)

    const spreadSheetId  = request.query.sheetId
    const sheet = request.query.sheet
    const start = request.query.start
    const colEnd = request.query.colEnd

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
                range: `${sheet}!${start}:${colEnd}` 
            });    

        if (sheetVals.status < 200 || sheetVals.status > 299) {
            console.log('error reading sheet')
            return
        }
        response.send(sheetVals);
        
        }).catch( (e) => {
            console.log(e)
        })

});

