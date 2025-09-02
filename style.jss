body {
    font-family: Arial, sans-serif;
    background: #f0f2f5;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}
.container {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    width: 400px;
    text-align: center;
    transition: all 0.3s ease;
}
input, button {
    padding: 10px;
    margin: 10px 0;
    width: 90%;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}
button {
    background: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
}
button:hover {
    background: #45a049;
}
.hidden { display: none; }
.fadeIn { animation: fadeIn 0.5s ease forwards; }
@keyframes fadeIn {
    from {opacity: 0; transform: translateY(-20px);}
    to {opacity: 1; transform: translateY(0);}
}
.account {
    background: #f8f8f8;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.account img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
}
.account span { cursor: pointer; }
