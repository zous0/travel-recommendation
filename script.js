document.addEventListener('DOMContentLoaded', () => {
    const btnSearch = document.getElementById('btnSearch');
    const btnClear = document.getElementById('btnClear');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('results');

    btnSearch.addEventListener('click', searchRecommendations);
    btnClear.addEventListener('click', clearResults);

    function searchRecommendations() {
        const query = searchInput.value.toLowerCase().trim();
        resultsContainer.innerHTML = '';

        if (!query) return;

        fetch('travel_recommendation.json')
            .then(response => response.json())
            .then(data => {
                let results = [];

                if (query.includes('beach')) {
                    results = data.beaches;
                } else if (query.includes('temple')) {
                    results = data.temples;
                } else if (query.includes('country') || query.includes('australia') || query.includes('japan')) {
                    data.countries.forEach(country => {
                        if (query.includes('country') || country.name.toLowerCase().includes(query)) {
                            results.push(...country.cities);
                        }
                    });
                }

                if (results.length > 0) {
                    displayResults(results);
                } else {
                    resultsContainer.innerHTML = '<p>No results found for your search.</p>';
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function displayResults(items) {
        items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <div class="card-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            resultsContainer.appendChild(card);
        });
    }

    function clearResults() {
        searchInput.value = '';
        resultsContainer.innerHTML = '';
    }
});