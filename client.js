const socket = io ('http://localhost:3000');
const userList = document.getElementById('users');
const roomName = document.getElementById('room-name');
const form = document.getElementById ('form');
const input = document.getElementById ('input');
/////////////////////////////////////
////////get room
/////////////////////////////////////////
const {username, room} = Qs.parse (location.search, {
  ignoreQueryPrefix: true,
});

///////////////////////////////
////////////JOIN CHAT ROOM
//////////////////////////////
socket.emit ('joinRoom', {username, room});
console.log ('user joined room',room);
console.log ('room', room);
console.log ('user', username);
////GET USERS
socket.on ('roomUsers', ({room, users}) => {
  outputRoomName (room);
  outputUsers (users);
});
////////////////////
//roo name
///////
function outputRoomName(room) {
    roomName.innerText = room;
  }
  ////////////////////
  //users
  //////////
  // Add users to DOM
function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerText = user.username;
      userList.appendChild(li);
    });
  }
  ///form getm message

form.addEventListener ('submit', function (e) {
  e.preventDefault ();
  if (input.value) {
    socket.emit ('chat message', input.value);
    input.value = '';
  }
});
socket.on ('chat message', function (msg) {
     console.log ('message', msg);
  outputMessage (msg);

  window.scrollTo (0, document.body.scrollHeight);
});
function outputMessage (msg) {
  const div = document.createElement ('div');
  div.classList.add ('message');
  const p = document.createElement ('p');
  p.classList.add ('meta');
  p.innerText = msg.username;
  p.innerHTML += `<span>${msg.time}</span>`;
  div.appendChild (p);
  const para = document.createElement ('p');
  para.classList.add ('text');
  para.innerText = msg.text;
  div.appendChild (para);
  document.querySelector ('.chat-messages').appendChild (div);
}
