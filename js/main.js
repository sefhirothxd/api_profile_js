const form = document.querySelector('.form');
const containerMain = document.querySelector('.container');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('email: ', e.target[0].value);
  const email = e.target[0].value;
  console.log('discord:', e.target[1].value);
  const discord = e.target[1].value;
  getInfoLarnu(email, discord);
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
    });
  getCard(res.data);
};

const getCard = async (data) => {
  console.log(data);

  const createdAt = new Date(data.user.createdAt).toLocaleString();
  const LastLogin = new Date(data.user.lastLogin).toLocaleString();

  containerMain.innerHTML = `
  <div class="container-card">
  <div class="container-arrow">
    <img src="./img/arrow-white.svg" alt="arrow left" />
  </div>
  <div class="container-card__info">
    <img src="https://i.pravatar.cc/300" alt="avatar" />
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
    </div>
  </div>
</div>
  `;

  const containerArrow = document.querySelector('.container-arrow');

  containerArrow.addEventListener('click', () => {
    window.location.reload();
  });
};
