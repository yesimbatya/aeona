document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const bookDetailModal = document.getElementById('book-detail-modal');
    const loginButton = document.getElementById('login-button');
    const navSignupButton = document.getElementById('nav-signup-button');
    const mainSignupButton = document.getElementById('main-signup-button');
    const closeLogin = document.getElementById('close-login');
    const closeSignup = document.getElementById('close-signup');
    const closeBookDetail = document.getElementById('close-book-detail');
    const books = document.querySelectorAll('.book');
    const bookDetailTitle = document.getElementById('book-detail-title');
    const bookDetailAuthor = document.getElementById('book-detail-author');
    const bookDetailGenre = document.getElementById('book-detail-genre');
    const bookDetailDescription = document.getElementById('book-detail-description');
    const bookDetailRating = document.getElementById('book-detail-rating');
    const bookDetailReviews = document.getElementById('book-detail-reviews');
    const bookDetailImage = document.getElementById('book-detail-image');
    const reviewForm = document.getElementById('review-form');
    const reviewerName = document.getElementById('reviewer-name');
    const reviewRating = document.getElementById('review-rating');
    const reviewText = document.getElementById('review-text');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const faqButton = document.getElementById('faq-button'); 
    const faqSection = document.getElementById('faq-section');

 
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') {
       
    
    }

    loginButton.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    navSignupButton.addEventListener('click', () => {
        signupModal.style.display = 'block';
    });

    mainSignupButton.addEventListener('click', () => {
        signupModal.style.display = 'block';
    });

    closeLogin.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    closeSignup.addEventListener('click', () => {
        signupModal.style.display = 'none';
    });

    closeBookDetail.addEventListener('click', () => {
        bookDetailModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
        if (event.target === bookDetailModal) {
            bookDetailModal.style.display = 'none';
        }
    });

    books.forEach(book => {
        book.addEventListener('click', () => {
            const title = book.getAttribute('data-title');
            const author = book.getAttribute('data-author');
            const genre = book.getAttribute('data-genre');
            const description = book.getAttribute('data-description');
            const rating = book.getAttribute('data-rating');
            const reviews = JSON.parse(book.getAttribute('data-reviews'));
            const image = book.querySelector('img').src;

            bookDetailTitle.textContent = title;
            bookDetailAuthor.textContent = author;
            bookDetailGenre.textContent = genre;
            bookDetailDescription.textContent = description;
            bookDetailRating.textContent = rating;
            bookDetailImage.src = image;

            bookDetailReviews.innerHTML = '';
            reviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.classList.add('review');
                reviewElement.innerHTML = `<p><strong>${review.name}</strong> (${review.rating}/5): ${review.review}</p>`;
                bookDetailReviews.appendChild(reviewElement);
            });

            bookDetailModal.style.display = 'block';
        });
    });

    reviewForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = reviewerName.value;
        const rating = reviewRating.value;
        const text = reviewText.value;

        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `<p><strong>${name}</strong> (${rating}/5): ${text}</p>`;

        bookDetailReviews.appendChild(reviewElement);

        reviewerName.value = '';
        reviewRating.value = '5';
        reviewText.value = '';
    });


    searchButton.addEventListener('click', () => {
        searchBooks();
    });


    faqButton.addEventListener('click', (event) => {
        event.preventDefault();
        faqSection.scrollIntoView({ behavior: 'smooth' });
    });

    
    function searchBooks() {
        const searchTerm = searchInput.value.toLowerCase();
        books.forEach(book => {
            const title = book.getAttribute('data-title').toLowerCase();
            const author = book.getAttribute('data-author').toLowerCase();
            const genre = book.getAttribute('data-genre').toLowerCase();
            if (title.includes(searchTerm) || author.includes(searchTerm) || genre.includes(searchTerm)) {
                book.style.display = 'block'; 
            } else {
                book.style.display = 'none';
            }
        });
    }
});
