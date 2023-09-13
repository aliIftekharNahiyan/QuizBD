fetch('ranking.json')
    .then(response => response.json())
    .then(data => {
        // Get the current date
        const currentDate = new Date();

        // Define the start and end dates for weekly and monthly filtering
        const oneWeekAgo = new Date(currentDate.getTime() - 1 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);

        // Get containers for weekly and monthly data
        const weeklyContainer = document.getElementById('weekly-container');
        const monthlyContainer = document.getElementById('monthly-container');

        // Loop through the JSON data and create HTML elements for each entry
        data.forEach(entry => {
            const entryDate = new Date(entry.timestamp);

            // Check if the entry is within the past week
            if (entryDate >= oneWeekAgo) {
                const card = createRankCard(entry);
                weeklyContainer.appendChild(card);
            }

            // Check if the entry is within the past month
            if (entryDate >= oneMonthAgo) {
                const card = createRankCard(entry);
                monthlyContainer.appendChild(card);
            }
        });
    })
    .catch(error => console.error('Error fetching data: ', error));

function createRankCard(entry) {
    const card = document.createElement('div');
    card.className = 'card rank-card';

    card.innerHTML = `
        <div class="rank-no">
            ${entry.rank}
        </div>
        <div class="rank-avater">
            <img src="assets/color.png">
        </div>
        <div class="rank-name">
            <div class="rank-name-text">
                ${entry.name}
            </div>
            <div class="rank-points">
                ${entry.points}
            </div>
        </div>
        <div class="rank-badge">
            <img src="${entry.badgeSrc}">
        </div>
    `;

    return card;
}

// Function to show weekly data by hiding the monthly container
function showWeeklyData() {
    const weeklyContainer = document.getElementById('weekly-container');
    const monthlyContainer = document.getElementById('monthly-container');

    weeklyContainer.style.display = 'block';
    monthlyContainer.style.display = 'none';

    // Update the button styles
    document.querySelector('.filter-button.selected').classList.remove('selected');
    document.querySelectorAll('.filter-button')[0].classList.add('selected');
}

// Function to show monthly data by hiding the weekly container
function showMonthlyData() {
    const weeklyContainer = document.getElementById('weekly-container');
    const monthlyContainer = document.getElementById('monthly-container');

    weeklyContainer.style.display = 'none';
    monthlyContainer.style.display = 'block';

    // Update the button styles
    document.querySelector('.filter-button.selected').classList.remove('selected');
    document.querySelectorAll('.filter-button')[1].classList.add('selected');
}


// Initial display (show weekly data by default)
showWeeklyData();
