// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
const sections = {
    home: document.getElementById('home'),
    downloader: document.getElementById('downloader'),
    about: document.getElementById('about'),
    contact: document.getElementById('contact')
};

// Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});

// Navigation Functionality with Smooth Scrolling
function showSection(sectionName) {
    // Hide all sections
    Object.values(sections).forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    if (sections[sectionName]) {
        sections[sectionName].classList.add('active');
        
        // Scroll to section with smooth animation
        if (sectionName !== 'home') {
            sections[sectionName].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Close mobile menu after navigation
    mobileMenu.classList.remove('active');
}

// Add event listeners to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        showSection(page);
    });
});

// TikTok Downloader Functionality
const fetchBtn = document.getElementById('fetchBtn');
const tiktokUrl = document.getElementById('tiktokUrl');
const loading = document.getElementById('loading');
const resultContainer = document.getElementById('resultContainer');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const downloadOptions = document.getElementById('downloadOptions');
const downloadMusicBtn = document.getElementById('downloadMusicBtn');

// Sample video data for demonstration
let currentVideoData = null;

fetchBtn.addEventListener('click', async () => {
    const url = tiktokUrl.value.trim();
    
    if (!url) {
        showError('Silakan masukkan URL TikTok');
        return;
    }

    if (!isValidTikTokUrl(url)) {
        showError('URL TikTok tidak valid');
        return;
    }

    try {
        showLoading();
        hideMessages();
        
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock response data
        const mockResponse = {
            status: true,
            result: {
                cover: 'https://p16-sign-sg.tiktokcdn.com/aweme/1080x1080/tos-alisg-i-0000/3a45d2d36f184a1a8b0c1d2e3f4a5b6c.jpeg?lk3s=a5d48078&x-expires=1701234567&x-signature=example',
                title: 'Amazing TikTok Video',
                upload_date: '2023-11-28',
                region: 'ID',
                duration: '60',
                author: {
                    nickname: '@dapsz_id',
                    unique_id: 'dapsz_id'
                },
                music_info: {
                    title: 'Awesome Song',
                    author: 'Music Artist',
                    url: 'https://example.com/music.mp3'
                },
                 [
                    {
                        quality: '720p',
                        type: 'watermark',
                        url: 'https://example.com/video_watermark.mp4'
                    },
                    {
                        quality: '720p',
                        type: 'no_watermark',
                        url: 'https://example.com/video_no_wm.mp4'
                    },
                    {
                        quality: '1080p',
                        type: 'no_watermark_hd',
                        url: 'https://example.com/video_no_wm_hd.mp4'
                    }
                ]
            }
        };

        currentVideoData = mockResponse.result;
        displayVideoInfo(mockResponse.result);
        hideLoading();
        showResult();
        
    } catch (error) {
        console.error('Error:', error);
        hideLoading();
        showError('Terjadi kesalahan saat mengambil data video');
    }
});

function isValidTikTokUrl(url) {
    return /tiktok\.com/.test(url) || /vm\.tiktok\.com/.test(url);
}

function showLoading() {
    loading.style.display = 'block';
    resultContainer.style.display = 'none';
}

function hideLoading() {
    loading.style.display = 'none';
}

function showResult() {
    resultContainer.style.display = 'block';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
}

function hideMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

function displayVideoInfo(videoData) {
    // Update video info
    document.getElementById('videoThumbnail').src = videoData.cover;
    document.getElementById('videoTitle').textContent = videoData.title;
    document.getElementById('videoAuthor').textContent = `${videoData.author.nickname} (${videoData.author.unique_id})`;
    document.getElementById('uploadDate').textContent = videoData.upload_date;
    document.getElementById('region').textContent = videoData.region;
    document.getElementById('duration').textContent = `${videoData.duration}s`;
    document.getElementById('musicTitle').textContent = `${videoData.music_info.title} by ${videoData.music_info.author}`;

    // Clear previous download options
    downloadOptions.innerHTML = '';

    // Add download buttons
    videoData.data.forEach((item, index) => {
        const button = document.createElement('button');
        button.className = 'download-btn-option';
        button.innerHTML = `
            <i class="fas fa-download"></i><br>
            ${getDownloadLabel(item.type, item.quality)}
        `;
        button.onclick = () => {
            window.open(item.url, '_blank');
            showSuccess('Download dimulai...');
        };
        downloadOptions.appendChild(button);
    });

    // Set music download button
    downloadMusicBtn.onclick = () => {
        window.open(videoData.music_info.url, '_blank');
        showSuccess('Download musik dimulai...');
    };
}

function getDownloadLabel(type, quality) {
    switch(type) {
        case 'watermark':
            return `Video Watermark<br>${quality}`;
        case 'no_watermark':
            return `Video No WM<br>${quality}`;
        case 'no_watermark_hd':
            return `Video HD No WM<br>${quality}`;
        default:
            return `Download Video<br>${quality}`;
    }
}

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showSuccess('Pesan berhasil dikirim! Terima kasih telah menghubungi kami.');
        contactForm.reset();
    });
}

// Initialize with home section active
showSection('home');
