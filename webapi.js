const https = require('https');

// used Node.js HTTP docs example to help with this block
https.get('https://api.ampifymusic.com/packs', (res) => 
{
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    // Any 2xx status code signals a successful response but
    // here we're only checking for 200.
    if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
            `Status Code: ${statusCode}`);
    }
    else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
            `Expected application/json but received ${contentType}`);
    }

    if (error) {
        console.error(error.message);
        // Consume response data to free up memory
        res.resume();
        return;
    }

    res.setEncoding('utf8');
    let rawData = '';

    // recieves the data in chunks just in case data is large 
    res.on('data', (chunk) => { rawData += chunk; });

    // Recieving data is finished, now process it
    res.on('end', () => {
        let genreSet = new Set();       // where the list of genres will be stored 
        let searchList = [];            // the list (array) of items I'm actually searching for
        const SEARCH_GENRE = "hip-hop"; // the genre I'm looking for

        try {
            const parsedData = JSON.parse(rawData); // converting the string to a json object

            parsedData.packs.forEach(element => 
            {
                // each pack has an array for genre, could possibly have more than one genre?
                let genreArray = element.genres;
                // loop through the genre array
                genreArray.forEach(gen => {
                    // saving each one in the set
                    genreSet.add(gen);

                    // save the pack if it's the genre we're looking for (hip hop)
        
                    if (gen === SEARCH_GENRE)
                    searchList.push(element);
                });

            });

            console.log("----- Genre list -----");
            genreSet.forEach(el => {
                console.log(el);
            });

            console.log(`----- ${SEARCH_GENRE} Pack List -----`);
            searchList.forEach((el, idx) => {
                console.log(`${idx + 1} ${el.name} - ID:${el.id}`);
            })

            // Uncomment this for a detailed tabular output.
            //console.table(searchList);

        }
        catch (e) {
            console.error(e.message);
        }
    });

}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
