document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('option1-btn').addEventListener('click', function() {
        document.getElementById('signup1').style.display = 'block';
        document.getElementById('signup2').style.display = 'none';
    });

    document.getElementById('option2-btn').addEventListener('click', function() {
        document.getElementById('signup2').style.display = 'block';
        document.getElementById('signup1').style.display = 'none';
    });

    // Example of fetching data from an API
    fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => {
            console.log(data.results[0]);
            const user = data.results[0];
            document.getElementById('signup1').innerHTML += `
                <p>Random User: ${user.name.first} ${user.name.last}</p>
            `;
        })
        .catch(error => console.error('Error fetching data:', error));
});
