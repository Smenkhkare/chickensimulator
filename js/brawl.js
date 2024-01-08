function myFunction() {
    // API endpoint requiring authentication
    const apiUrl = 'https://api.brawlstars.com/v1/brawlers';

    // Make a GET request with authentication using the Fetch API
    fetch(apiUrl, {
        headers: {
            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImExMDBjZWIyLTY2NTEtNGQyYS04NWM2LTRmYzg1NGQyNTExZSIsImlhdCI6MTcwNDUxNTc1Nywic3ViIjoiZGV2ZWxvcGVyLzgxODM0YWM4LTFmMTUtNmNkNi1hYjc2LTc1M2FmOTc5NWRlYyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNzIuOTMuMjIyLjU4Il0sInR5cGUiOiJjbGllbnQifV19.sBIZ8zjhaQZ-rQc5YsfNSdkE9TZBSHiOs2LzTe0U3oWGk77adAR4nOmESIOvNK1zba_JK__bu2UT7rCu1LBuJQ",
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(protectedData => {
            // Process the protected data
            console.log('Protected Data:', protectedData);
            document.getElementById("response-container").innerText = JSON.stringify(protectedData, null, 2);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
