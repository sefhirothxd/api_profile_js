const form = document.querySelector('.form');
const formModal = document.querySelector('.modal-body');
const containerMain = document.querySelector('.container');
const containerModal = document.querySelector('.modal-container');
const btnClose = document.querySelector('.btn-close-modal');
let emailInput = '';
let discordInput = '';
let userNameGet = '';
let hobbiesGet = '';

form.addEventListener('submit', (e) => {
  console.log('me ejecuto');
  e.preventDefault();
  console.log('email: ', e.target[0].value);
  emailInput = e.target[0].value;
  console.log('discord:', e.target[1].value);
  discordInput = e.target[1].value;
  getInfoLarnu(emailInput, discordInput);
});
formModal.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(e.target[0]);
  const inputHobbies = e.target[1].value;
  const inputDiscordUser = e.target[2].value;
  console.log(inputHobbies, 'hobbies');
  console.log(inputHobbies, 'discord user');
  patchInfoLarnu(inputHobbies, inputDiscordUser);
});
btnClose.addEventListener('click', (e) => {
  e.preventDefault();
  containerModal.style.display = 'none';
});
const getInfoLarnu = async (email, discord) => {
  const res = await axios
    .get('https://larnu-api-upy5mhs63a-rj.a.run.app/api/v1/bootcamp/profile', {
      headers: {
        Email: email,
        'Discord-id': discord,
      },
    })
    .then((res) => res)
    .catch((err) => {
      console.log(err);
      alert('El correo o el discord no existe');
    });
  if (res?.data !== undefined) {
    userNameGet = res.data.discordUsername;
    hobbiesGet = res.data.hobbies;
    getCard(res.data);
  } else {
    console.log('El correo o el discord no existe');
  }
};

const patchInfoLarnu = async (hobbies, userName) => {
  const res = await axios
    .patch(
      'https://larnu-api-upy5mhs63a-rj.a.run.app/api/v1/bootcamp/profile',
      {
        discordUsername: userName || userNameGet,
        hobbies: hobbies || hobbiesGet,
      },
      {
        headers: {
          Email: emailInput,
          'Discord-id': discordInput,
        },
      }
    )
    .then((res) => res)
    .catch((err) => {
      console.log(err);
      alert('error del patch');
    });
  if (res?.data !== undefined) {
    getCard(res.data);
  } else {
    console.log('El correo o el discord no existe');
  }
  containerModal.style.display = 'none';
};

const getCard = async (data) => {
  console.log(data);
  const createdAt = new Date(data.user.createdAt).toLocaleString();
  const LastLogin = new Date(data.user.lastLogin).toLocaleString();

  containerMain.innerHTML = `
  <div class="container-card">
  <div class="container-arrow">
    <img class="icon-arrow" src="./img/arrow-white.svg" alt="arrow left" />
    <button class="btn-edit">Editar</button>
  </div>
  <div class="container-card__info">
    <img src="${data.user.avatar}" alt="avatar" />
    <div class="info-content">
      <div class="info-description">
        <p>Full Name</p>
        <p>${data.user.fullName}</p>
      </div>
      <div class="info-description">
        <p>Email</p>
        <p>${data.user.email}</p>
      </div>
      <div class="info-description">
        <p>Create</p>
        <p>${createdAt}</p>
      </div>
      <div class="info-description">
        <p>Last Login</p>
        <p>${LastLogin}</p>
      </div>
      <div class="info-description">
        <p>Level</p>
        <p>${data.level}</p>
      </div>
      <div class="info-description">
        <p>Discord Nick</p>
        <p>${data.discordUsername}</p>
      </div>
      <div class="info-description">
        <p>Hobbies</p>
        <p>${data.hobbies}</p>
      </div>
    </div>
  </div>
</div>
  `;

  const containerArrow = document.querySelector('.icon-arrow');

  containerArrow.addEventListener('click', () => {
    window.location.reload();
  });
  const btnEdit = document.querySelector('.btn-edit');

  btnEdit.addEventListener('click', () => {
    containerModal.style.display = 'flex';
  });
};
