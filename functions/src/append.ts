/**
* Logic for appending an Entry on the Spreadsheet
*/
interface Metadata {
    sheetName: String,
    sheetStartAt: String,
    sheetEndAt: String,
    data: (number|string)[][]
}

export const appendEntry =  (api: any, spreadsheetId: string, auth: any, metadata: Metadata) => {
    return new Promise((resolve, reject) => {

        const range = `${metadata.sheetName}!A${metadata.sheetStartAt}:${metadata.sheetEndAt}`; //${metadata.er}`

        const payload = {
            auth: auth,
            spreadsheetId,
            valueInputOption: "RAW",
            range: range, //e.g. 'Sheet1!A2:D',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                majorDimension: "ROWS",
                values: metadata.data
            }
        };
        console.log("PAYLOAD: ", payload)

        api.spreadsheets.values.append(payload, (err: any, response: any) => {
            if (err) {
                reject("The Sheets API returned an error: " + err);
            } else {
                console.log("sheet populated with " + metadata.data.length + " rows and column style set.");
                resolve();
            }
        });;
                // see options and query params: https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append
       
    });
}