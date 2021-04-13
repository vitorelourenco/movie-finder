function populateDom(movieList){
  let domMovies = document.querySelector('.movies');
  domMovies.innerHTML = '';
  movieList.forEach((movie)=>{
    console.log(movie);
    domMovies.innerHTML +=
      `
      <div class="movie">
      <img src="${movie.imagem}">
      <div class="title">${movie.titulo}</div>
      <button onclick='buy(${movie.id})'>
        Comprar
        <ion-icon name="cart-outline"></ion-icon>
      </button>
      </div>`;
  })
}

function buy(id){
  const nome = prompt('Nome do comprador');
  const quantidade = prompt('Quantos assentos?');
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes/${id}/ingresso`
  axios
    .post(url, {nome, quantidade})
    .then(()=>{
      alert('Ingresso comprado com sucesso!');
    })
    .catch(()=>{
      alert('Os ingressos para este filme estão esgotados!');
    });
}

function fetchMovieList(){
  axios
    .get('https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes')
    .then(({data})=>{
      populateDom(data);
    })
    .catch((err)=>{
      console.log('error')
      console.log(err);
      fetchMovieList();
    });
}

fetchMovieList();


