// Master password
const MASTER_PASSWORD = '4055_dxfc';
let accounts = [];

// Preloaded accounts with Google/Roblox icons
const accountsDB = [
    {name:"Roblox Account 1", password:"HAHAHAHA_497%#&@@212edfgD5F44444443844F4SD45$%@#$@#$@#$#1979735sabdsbabdabD4512465654e4qwe8wq87ewq87eq87eq87eq87eq8e", icon:"https://www.google.com/s2/favicons?domain=roblox.com"},
    {name:"Roblox Account 2", password:"RAHAHAH_CLIQUE_DXFC_RIDDLER_SIGMA_549173179167631473175749217491857417436289471897489174_$^@&$@#E*^!%#&!@#!&#&@#&@!&%$@%^RWER@#^$@#$@#ERWQ58W", icon:"https://www.google.com/s2/favicons?domain=roblox.com"},
    {name:"Roblox Account 3", password:"LOLOL_DXFC_HAHAHAHA_91491491679164764974974788_$#$@##@!(#@!&$^#!e^&etwqe*&qweq^e87", icon:"https://www.google.com/s2/favicons?domain=roblox.com"},
    {name:"Roblox Account 4", password:"Erdever161616161814", icon:"https://www.google.com/s2/favicons?domain=roblox.com"},
    {name:"Roblox Account 5", password:"RAWRAIRIARIQIRQIRQ_GTIHUB_DXFC_LEANEK_NOO_374123841283787831()#!()#@(#($r#(d(wd(d((&f(#@!#4554DSAD@", icon:"https://www.google.com/s2/favicons?domain=roblox.com"},
    {name:"Roblox Account 6", password:"ASHDAYUETWEQUYEQWE_4234534215345214E4QW7EAWEDWQEQWW9128&$@&$%@#^$@#@!#edwaqhuqd*wa(", icon:"https://www.google.com/s2/favicons?domain=roblox.com"}
];

// Encrypt / Decrypt helper
async function getKey(password){
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey({name:'PBKDF2', salt: enc.encode('salt'), iterations:100000, hash:'SHA-256'}, keyMaterial, {name:'AES-GCM', length:256}, false, ['encrypt','decrypt']);
}

async function encryptText(text,key){
    const enc = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt({name:'AES-GCM',iv},key,enc.encode(text));
    return btoa(String.fromCharCode(...iv) + '|' + String.fromCharCode(...new Uint8Array(encrypted)));
}

async function decryptText(data,key){
    try{
        const [ivStr, encStr] = atob(data).split('|');
        const iv = new Uint8Array([...ivStr].map(c=>c.charCodeAt(0)));
        const encryptedData = new Uint8Array([...encStr].map(c=>c.charCodeAt(0)));
        const decrypted = await crypto.subtle.decrypt({name:'AES-GCM',iv},key,encryptedData);
        return new TextDecoder().decode(decrypted);
    }catch(e){return 'Error';}
}

// Load saved accounts from localStorage
function loadFromStorage(){
    const stored = localStorage.getItem('accounts');
    if(stored) accounts = JSON.parse(stored);
    else accounts = [...accountsDB]; // preload
}

// Save to localStorage
function saveAccounts(){ localStorage.setItem('accounts', JSON.stringify(accounts)); }

// Render accounts
function loadAccounts(){
    const list = document.getElementById('accountsList');
    list.innerHTML = '';
    accounts.forEach((acc,index)=>{
        const div = document.createElement('div');
        div.className='account fadeIn';
        div.innerHTML=`<div><img src="${acc.icon}"> <strong>${acc.name}</strong></div> <span onclick="alert('Password: ${acc.password}')">Show</span>`;
        list.appendChild(div);
    });
}

// Login
function login(){
    const input = document.getElementById('masterPassword').value;
    if(input===MASTER_PASSWORD){
        document.getElementById('loginContainer').classList.add('hidden');
        document.getElementById('appContainer').classList.remove('hidden');
        document.getElementById('appContainer').classList.add('fadeIn');
        loadFromStorage();
        loadAccounts();
    } else document.getElementById('loginError').style.display='block';
}

// Logout
function logout(){
    document.getElementById('appContainer').classList.add('hidden');
    document.getElementById('loginContainer').classList.remove('hidden');
}

// Add account
function addAccount(){
    const name=document.getElementById('accountName').value;
    const password=document.getElementById('accountPassword').value;
    if(!name||!password)return;
    accounts.push({name,password,icon:`https://www.google.com/s2/favicons?domain=${name.toLowerCase().replace(/\s/g,'')}.com`});
    saveAccounts();
    loadAccounts();
    document.getElementById('accountName').value='';
    document.getElementById('accountPassword').value='';
}

// Anti inspect element
document.addEventListener('contextmenu', e=>e.preventDefault());
document.addEventListener('keydown',e=>{
    if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&e.key==='I')) e.preventDefault();
});

// Random URL path
function randomizeURLPath(){
    const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let path='';
    for(let i=0;i<10;i++) path+=chars.charAt(Math.floor(Math.random()*chars.length));
    window.history.replaceState(null,null,`/${path}`);
}
window.addEventListener('DOMContentLoaded',randomizeURLPath);
