// Quotes database
const quotes = [
    "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
    "The best thing to hold onto in life is each other.",
    "Love is composed of a single soul inhabiting two bodies.",
    "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
    "Love doesn't make the world go 'round. Love is what makes the ride worthwhile.",
    "The greatest happiness of life is the conviction that we are loved; loved for ourselves, or rather, loved in spite of ourselves.",
    "Love is when the other person's happiness is more important than your own.",
    "The best love is the kind that awakens the soul and makes us reach for more, that plants a fire in our hearts and brings peace to our minds.",
    "Love is not about possession. Love is about appreciation.",
    "Love is like the wind, you can't see it but you can feel it."
];

// Function to get random quote
function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// Function to get random image (80% flower, 20% moon)
function getRandomImage() {
    const isMoon = Math.random() < 0.2;
    const imageType = isMoon ? 'moon' : 'flower';
    const imageNumber = Math.floor(Math.random() * 10) + 1; // Assuming we have 10 images of each type
    return `images/${imageType}${imageNumber}.jpg`;
}

// Function to save to archive
function saveToArchive() {
    const currentImage = document.getElementById('dailyImage').querySelector('img').src;
    const currentQuote = document.getElementById('dailyQuote').textContent;
    const date = new Date().toISOString().split('T')[0];

    let archive = JSON.parse(localStorage.getItem('archive') || '[]');
    archive.push({
        image: currentImage,
        quote: currentQuote,
        date: date
    });
    localStorage.setItem('archive', JSON.stringify(archive));

    // Show success message
    alert('Saved to archive!');
}

// Function to load daily content
function loadDailyContent() {
    const dailyImage = document.getElementById('dailyImage');
    const dailyQuote = document.getElementById('dailyQuote');

    // Clear previous content
    dailyImage.innerHTML = '';
    dailyQuote.textContent = '';

    // Create and append new image
    const img = document.createElement('img');
    img.src = getRandomImage();
    img.alt = 'Daily Image';
    img.className = 'daily-image fade-in';
    dailyImage.appendChild(img);

    // Set new quote
    dailyQuote.textContent = getRandomQuote();
    dailyQuote.className = 'quote-text fade-in';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load initial content
    loadDailyContent();

    // Add event listener for save button
    document.getElementById('saveToArchive').addEventListener('click', saveToArchive);

    // Check if it's a new day to show new content
    const lastVisit = localStorage.getItem('lastVisit');
    const today = new Date().toDateString();
    
    if (lastVisit !== today) {
        loadDailyContent();
        localStorage.setItem('lastVisit', today);
    }
}); 