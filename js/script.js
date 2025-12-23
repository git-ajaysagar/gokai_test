// Promotional banner data
const bannerSlides = [
    {
        type: 'offer',
        badge: '🎉 SPECIAL OFFER',
        title: 'Limited Time Sale!',
        text: 'Get 30% off on all courses this week. Use code: LEARN30',
        action: 'Explore Now',
        timer: true
    },
    {
        type: 'launch',
        badge: '✨ NEW LAUNCH',
        title: 'New Courses Available!',
        text: 'Check out our newly launched AI & Machine Learning masterclass.',
        action: 'View Course',
        timer: false
    },
    {
        type: 'discount',
        badge: '💰 MEGA DISCOUNT',
        title: 'Flash Sale - 48 Hours Only!',
        text: 'Bundle any 2 courses and get 25% off. Offer ends soon!',
        action: 'Shop Now',
        timer: true
    }
];

// Student testimonials data
const testimonialsData = [
    {
        name: 'Sarah Johnson',
        role: 'Full Stack Developer',
        avatar: 'SJ',
        rating: 5,
        feedback: 'The Web Development course completely transformed my career. The instructors are amazing and the content is so practical!',
        highlight: true
    },
    {
        name: 'Michael Chen',
        role: 'UI/UX Designer',
        avatar: 'MC',
        rating: 5,
        feedback: 'Excellent course structure. I learned design principles that I immediately applied in my current projects. Highly recommended!',
        highlight: false
    },
    {
        name: 'Emily Rodriguez',
        role: 'Data Scientist',
        avatar: 'ER',
        rating: 5,
        feedback: 'The Python for Data Science course is comprehensive and beginner-friendly. The projects helped me build a strong portfolio.',
        highlight: false
    },
    {
        name: 'James Wilson',
        role: 'Digital Marketer',
        avatar: 'JW',
        rating: 4,
        feedback: 'Great digital marketing fundamentals. Loved how the course combines theory with real-world examples.',
        highlight: false
    },
    {
        name: 'Lisa Park',
        role: 'Mobile App Developer',
        avatar: 'LP',
        rating: 5,
        feedback: 'React Native course is excellent! I built my first cross-platform app in just 3 weeks. Amazing experience!',
        highlight: true
    },
    {
        name: 'David Thompson',
        role: 'Cloud Architect',
        avatar: 'DT',
        rating: 5,
        feedback: 'AWS course is incredibly thorough. Passed my certification exam on first attempt after completing this.',
        highlight: false
    }
];

// Notification campaigns (kept for reference, but no longer used)
const notificationCampaigns = [
    {
        type: 'offer',
        badge: '🎉 SPECIAL OFFER',
        title: 'Limited Time Sale!',
        description: 'Get 30% off on all courses this week. Use code: LEARN30',
        action: 'Explore Now',
        timer: true
    },
    {
        type: 'launch',
        badge: '✨ NEW LAUNCH',
        title: 'New Courses Available!',
        description: 'Check out our newly launched AI & Machine Learning masterclass.',
        action: 'View Course',
        timer: false
    },
    {
        type: 'discount',
        badge: '💰 MEGA DISCOUNT',
        title: 'Flash Sale - 48 Hours Only!',
        description: 'Bundle any 2 courses and get 25% off. Offer ends soon!',
        action: 'Shop Now',
        timer: true
    }
];

// Sample courses data
const coursesData = [
    {
        id: 1,
        title: "Web Development Masterclass",
        category: "Web Development",
        description: "Learn HTML, CSS, JavaScript, and modern frameworks to become a full-stack developer.",
        price: 99.99,
        rating: 4.8,
        students: 5420,
        icon: "💻"
    },
    {
        id: 2,
        title: "UI/UX Design Fundamentals",
        category: "Design",
        description: "Master the principles of user interface and experience design for digital products.",
        price: 79.99,
        rating: 4.7,
        students: 3210,
        icon: "🎨"
    },
    {
        id: 3,
        title: "Python for Data Science",
        category: "Data Science",
        description: "Learn Python programming with focus on data analysis, visualization, and machine learning.",
        price: 89.99,
        rating: 4.9,
        students: 6150,
        icon: "📊"
    },
    {
        id: 4,
        title: "Digital Marketing Essentials",
        category: "Marketing",
        description: "Comprehensive guide to SEO, social media marketing, content strategy, and analytics.",
        price: 69.99,
        rating: 4.6,
        students: 2890,
        icon: "📱"
    },
    {
        id: 5,
        title: "Mobile App Development",
        category: "Mobile",
        description: "Build iOS and Android apps using React Native with practical real-world projects.",
        price: 109.99,
        rating: 4.8,
        students: 4560,
        icon: "📲"
    },
    {
        id: 6,
        title: "Cloud Computing with AWS",
        category: "Cloud",
        description: "Deploy and manage applications on AWS. Learn EC2, S3, Lambda, and more.",
        price: 119.99,
        rating: 4.9,
        students: 3890,
        icon: "☁️"
    }
];

// Shopping cart
let cart = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderCourses();
    setupPaymentMethodListener();
    setupCheckoutFormListener();
    loadCartFromStorage();
    renderBanner();
    renderTestimonials();
    startBannerAutoSlide();
});

// Render courses on the page
function renderCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    coursesGrid.innerHTML = coursesData.map(course => `
        <div class="course-card">
            <div class="course-image">${course.icon}</div>
            <div class="course-content">
                <div class="course-category">${course.category}</div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span>⭐ ${course.rating}</span>
                    <span>👥 ${course.students} students</span>
                </div>
            </div>
            <div class="course-footer">
                <div class="course-price">$${course.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${course.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Add course to cart
function addToCart(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    
    // Check if course already in cart
    if (cart.find(item => item.id === courseId)) {
        alert('This course is already in your cart!');
        return;
    }
    
    cart.push(course);
    saveCartToStorage();
    updateCartUI();
    
    // Visual feedback
    const btn = event.target;
    btn.textContent = '✓ Added';
    btn.classList.add('added');
    setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.classList.remove('added');
    }, 1500);
}

// Remove item from cart
function removeFromCart(courseId) {
    cart = cart.filter(item => item.id !== courseId);
    saveCartToStorage();
    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <button class="remove-item-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Toggle cart sidebar
function toggleCart(event) {
    if (event) event.preventDefault();
    
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Setup payment method change listener
function setupPaymentMethodListener() {
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', (e) => {
            const cardPayment = document.getElementById('cardPayment');
            const paypalPayment = document.getElementById('paypalPayment');
            
            if (e.target.value === 'card') {
                cardPayment.style.display = 'block';
                paypalPayment.style.display = 'none';
            } else {
                cardPayment.style.display = 'none';
                paypalPayment.style.display = 'block';
            }
        });
    });
}

// Setup checkout form listener
function setupCheckoutFormListener() {
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        processCheckout();
    });
}

// Format card number
function formatCardNumber() {
    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
}

// Format expiry date
function formatExpiryDate() {
    const expiryInput = document.getElementById('expiry');
    expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const checkoutModal = document.getElementById('checkoutModal');
    const orderItems = document.getElementById('orderItems');
    const orderTotal = document.getElementById('orderTotal');
    
    // Populate order summary
    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <span class="order-item-name">${item.title}</span>
            <span class="order-item-price">$${item.price.toFixed(2)}</span>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    orderTotal.textContent = `$${total.toFixed(2)}`;
    
    // Close cart and show checkout modal
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    
    checkoutModal.classList.add('active');
    
    // Setup input formatting
    setTimeout(() => {
        formatCardNumber();
        formatExpiryDate();
    }, 0);
}

// Process checkout
function processCheckout() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    // Validation for card payment
    if (paymentMethod === 'card') {
        const cardName = document.getElementById('cardName').value;
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;
        
        if (!cardName || !cardNumber || !expiry || !cvv) {
            alert('Please fill in all card details');
            return;
        }
        
        if (cardNumber.length !== 16) {
            alert('Card number must be 16 digits');
            return;
        }
        
        if (cvv.length !== 3) {
            alert('CVV must be 3 digits');
            return;
        }
    }
    
    // Generate order ID
    const orderId = '#' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Close checkout modal and show success modal
    document.getElementById('checkoutModal').classList.remove('active');
    document.getElementById('successModal').classList.add('active');
    document.getElementById('successOrderId').textContent = orderId;
    
    // Log order details (in real app, send to server)
    console.log('Order placed:', {
        orderId,
        customer: fullName,
        email,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price, 0),
        paymentMethod,
        timestamp: new Date().toISOString()
    });
}

// Close checkout modal
function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
    document.getElementById('checkoutForm').reset();
}

// Close success modal
function closeSuccess() {
    document.getElementById('successModal').classList.remove('active');
    clearCart();
    renderCourses();
}

// Clear cart after successful purchase
function clearCart() {
    cart = [];
    updateCartUI();
    saveCartToStorage();
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && !href.includes('javascript')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ============================================
// PROMOTIONAL BANNER FUNCTIONS
// ============================================

let currentSlide = 0;
let bannerAutoSlideInterval;

function renderBanner() {
    const bannerSlidesContainer = document.getElementById('bannerSlides');
    const bannerDotsContainer = document.getElementById('bannerDots');

    // Render slides
    bannerSlidesContainer.innerHTML = bannerSlides.map((slide, index) => {
        let timerHTML = '';
        if (slide.timer) {
            timerHTML = '<div class="slide-timer">⏱️ Limited time offer</div>';
        }
        
        return `
            <div class="banner-slide ${slide.type}">
                <div class="slide-content">
                    <div class="slide-badge">${slide.badge}</div>
                    <h3 class="slide-title">${slide.title}</h3>
                    <p class="slide-text">${slide.text}</p>
                    ${timerHTML}
                </div>
                <button class="banner-cta" onclick="handleBannerAction()">${slide.action}</button>
            </div>
        `;
    }).join('');

    // Render dots
    bannerDotsContainer.innerHTML = bannerSlides.map((_, index) => `
        <span class="banner-dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></span>
    `).join('');
}

function showSlide(n) {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dot');

    if (n >= slides.length) {
        currentSlide = 0;
    }
    if (n < 0) {
        currentSlide = slides.length - 1;
    }

    // Update slide position
    const bannerSlidesContainer = document.getElementById('bannerSlides');
    bannerSlidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
    resetBannerAutoSlide();
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
    resetBannerAutoSlide();
}

function goToSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
    resetBannerAutoSlide();
}

function startBannerAutoSlide() {
    bannerAutoSlideInterval = setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 6000); // Change slide every 6 seconds
}

function resetBannerAutoSlide() {
    clearInterval(bannerAutoSlideInterval);
    startBannerAutoSlide();
}

function handleBannerAction() {
    const coursesSection = document.getElementById('courses');
    coursesSection.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// TESTIMONIALS FUNCTIONS
// ============================================

function renderTestimonials() {
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    
    testimonialsGrid.innerHTML = testimonialsData.map(testimonial => {
        const stars = Array(testimonial.rating).fill('★').join('');
        
        return `
            <div class="testimonial-card ${testimonial.highlight ? 'highlight' : ''}">
                <div class="testimonial-header">
                    <div class="testimonial-avatar">${testimonial.avatar}</div>
                    <div class="testimonial-info">
                        <p class="testimonial-name">${testimonial.name}</p>
                        <p class="testimonial-role">${testimonial.role}</p>
                    </div>
                </div>
                <div class="testimonial-rating">
                    ${stars.split('').map(star => `<span class="star">${star}</span>`).join('')}
                </div>
                <p class="testimonial-text">"${testimonial.feedback}"</p>
            </div>
        `;
    }).join('');
}

// ============================================
// LEGACY NOTIFICATION FUNCTIONS (Deprecated)
// ============================================

let currentNotificationIndex = 0;
let notificationTimeout;

function closeNotification() {
    // No longer used, kept for compatibility
}

function showNotification() {
    // No longer used, kept for compatibility
}

function handlePopupAction() {
    // No longer used, kept for compatibility
}
