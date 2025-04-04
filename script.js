// Dropdown functionality
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        // Close all other dropdowns first
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            if (dropdown !== this.querySelector('.dropdown')) {
                dropdown.classList.remove('active');
            }
        });
        
        // Toggle current dropdown
        const dropdown = this.querySelector('.dropdown');
        if (dropdown) {
            dropdown.classList.toggle('active');
        }
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-item')) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Contact popup functionality
document.getElementById('contactMeBtn').onclick = function() {
    document.getElementById('contactPopup').style.display = 'block';
};

function closePopup() {
    document.getElementById('contactPopup').style.display = 'none';
}

// Close popup when clicking outside
window.onclick = function(event) {
    let popup = document.getElementById('contactPopup');
    if (event.target == popup) {
        closePopup();
    }
};

// Close popup with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePopup();
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Comment form submission
document.querySelector('.submit-btn').addEventListener('click', () => {
    const comment = document.querySelector('.comment-box textarea').value;
    if (comment.trim()) {
        fetch('http://localhost:3001/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment })
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            alert('Thank you for your comment!');
            document.querySelector('.comment-box textarea').value = '';
        })
        .catch(err => {
            console.error('Error:', err);
            alert('Comment could not be saved. Please try again later.');
        });
    } else {
        alert('Please enter a comment before submitting');
    }
});
