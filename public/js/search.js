// Airbnb-Style Interactive Features

document.addEventListener('DOMContentLoaded', function () {

    // ==================== USER MENU DROPDOWN ====================
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function () {
            if (dropdownMenu) {
                dropdownMenu.style.display = 'none';
            }
        });
    }

    // ==================== CATEGORY FILTERS ====================
    const categoryItems = document.querySelectorAll('.category-item');

    categoryItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // Remove active class from all items
            categoryItems.forEach(cat => cat.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });

    // ==================== SEARCH FUNCTIONALITY ====================
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('input[name="search"]');

    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            // If search is empty, prevent submission and show all listings
            if (searchInput && searchInput.value.trim() === '') {
                e.preventDefault();
                window.location.href = '/listings';
            }
        });
    }

    // ==================== SMOOTH SCROLL FOR CATEGORIES ====================
    const categoryScroll = document.querySelector('.category-scroll');

    if (categoryScroll) {
        let isDown = false;
        let startX;
        let scrollLeft;

        categoryScroll.addEventListener('mousedown', (e) => {
            isDown = true;
            categoryScroll.style.cursor = 'grabbing';
            startX = e.pageX - categoryScroll.offsetLeft;
            scrollLeft = categoryScroll.scrollLeft;
        });

        categoryScroll.addEventListener('mouseleave', () => {
            isDown = false;
            categoryScroll.style.cursor = 'grab';
        });

        categoryScroll.addEventListener('mouseup', () => {
            isDown = false;
            categoryScroll.style.cursor = 'grab';
        });

        categoryScroll.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - categoryScroll.offsetLeft;
            const walk = (x - startX) * 2;
            categoryScroll.scrollLeft = scrollLeft - walk;
        });
    }

    // ==================== NAVBAR SCROLL EFFECT ====================
    let lastScroll = 0;
    const navbar = document.querySelector('.airbnb-navbar');
    const categoryFilters = document.querySelector('.category-filters');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            if (categoryFilters) {
                categoryFilters.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.08)';
            }
        } else {
            navbar.style.boxShadow = 'none';
            if (categoryFilters) {
                categoryFilters.style.boxShadow = 'none';
            }
        }

        lastScroll = currentScroll;
    });

    // ==================== SEARCH INPUT ANIMATION ====================
    const searchInputs = document.querySelectorAll('.search-input-group input');

    searchInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.backgroundColor = '#f7f7f7';
            this.parentElement.style.borderRadius = '32px';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.backgroundColor = 'transparent';
        });
    });

    // ==================== CARD HOVER EFFECT ====================
    const listingCards = document.querySelectorAll('.listing-card');

    listingCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const overlay = this.querySelector('.card-img-overlay');
            if (overlay) {
                overlay.style.opacity = '0.1';
            }
        });

        card.addEventListener('mouseleave', function () {
            const overlay = this.querySelector('.card-img-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });

    // ==================== FILTER BUTTON CLICK ====================
    const filterBtn = document.querySelector('.filter-btn');

    if (filterBtn) {
        filterBtn.addEventListener('click', function () {
            alert('Filter functionality coming soon! This will open a modal with advanced search options.');
        });
    }

    // ==================== SEARCH PLACEHOLDER ANIMATION ====================
    const mainSearchInput = document.querySelector('.navbar-search-desktop input[name="search"]');

    if (mainSearchInput) {
        const placeholders = [
            'Search destinations',
            'Try "Beach"',
            'Try "Mountain"',
            'Try "Villa"',
            'Try "Cabin"'
        ];
        let currentIndex = 0;

        // Don't animate if there's already a value
        if (!mainSearchInput.value) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % placeholders.length;
                mainSearchInput.placeholder = placeholders[currentIndex];
            }, 3000);
        }
    }

    // ==================== DARK MODE TOGGLE ====================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        const icon = themeToggleBtn.querySelector('i');
        
        // Sync icon on page load based on current attribute set by head script
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (icon) {
            icon.className = currentTheme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
        }

        themeToggleBtn.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            document.documentElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            if (icon) {
                icon.className = newTheme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
            }
        });
    }
});
