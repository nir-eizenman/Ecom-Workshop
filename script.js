document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signin-btn').addEventListener('click', function() {
        document.getElementById('signin').style.display = 'block';
        document.getElementById('signup1').style.display = 'none';
        document.getElementById('signup2').style.display = 'none';
    });

    document.getElementById('signup1-btn').addEventListener('click', function() {
        document.getElementById('signup1').style.display = 'block';
        document.getElementById('signin').style.display = 'none';
        document.getElementById('signup2').style.display = 'none';
    });

    document.getElementById('signup2-btn').addEventListener('click', function() {
        document.getElementById('signup2').style.display = 'block';
        document.getElementById('signin').style.display = 'none';
        document.getElementById('signup1').style.display = 'none';
    });
});
