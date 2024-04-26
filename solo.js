// 정보 불러오기
function fetchMovies() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzhjYWIyZWYwM2JiZTdhZjhjZDkxYmNjNWNkYzVjZSIsInN1YiI6IjY2Mjg3ZTQzNjJmMzM1MDE3ZGRkM2MxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zju695dgHFvRBmiwOQvzVGYRwhudjdMJKQFsUSRxVWQ'
        }
    };

    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(data => displayCards(data))
        .catch(err => console.error(err));
}

fetchMovies();

// 카드생성
function displayCards(movie) {
    movie.results.forEach(function (item) {
        const card = document.createElement('div')
        card.className = 'card'

        const img = document.createElement('img')
        img.className = 'movie-img'
        img.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`

        const title = document.createElement('h2')
        title.className = 'movie-title'
        title.innerHTML = item.title

        const content = document.createElement('p')
        content.className = 'movie-content'
        content.innerHTML = item.overview

        const rating = document.createElement('p')
        rating.className = 'movie-rating'
        rating.innerHTML = `Rating : ${item.vote_average}`

        const id = document.createElement('p')
        id.className = 'movie-id'
        id.innerHTML = item.id

        // 카드 클릭시 alert 활성화
        card.addEventListener('click', () => {
            alert(`영화 ID : ${item.id}`);
        });

        // 검색 기능 구현
        const searchInput = document.querySelector('.search-input');
        const searchButton = document.querySelector('.search-btn');

        searchButton.addEventListener('click', function() {
            const searchResult = searchInput.value.toLowerCase();
            if (item.title.toLowerCase().includes(searchResult)) {
                card.style.display = 'block'; 
            } else {
                card.style.display = 'none'; 
            }
        });

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(content);
        card.appendChild(rating);


        movieCards.appendChild(card);
    })
}
const movieCards = document.querySelector(".movieCards");
