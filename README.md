# CourseHub - Course Selling Website

A modern, minimalist online course marketplace with integrated shopping cart and payment functionality.

## Features

✨ **Modern Design**
- Clean, minimalist interface with smooth animations
- Responsive design that works on all devices
- Professional gradient backgrounds and hover effects

🛍️ **Shopping Cart**
- Add/remove courses dynamically
- Real-time cart updates
- Persistent cart using localStorage

💳 **Payment Integration**
- Multiple payment methods (Credit Card, PayPal)
- Secure checkout form with validation
- Order confirmation with order ID

📱 **User-Friendly Interface**
- Smooth navigation and scroll effects
- Course filtering by category
- Course ratings and student count
- Clear call-to-action buttons

## Project Structure

```
my-website/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Styling and responsive design
├── js/
│   └── script.js       # JavaScript functionality
└── README.md           # Documentation
```

## Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No server or installation required

### Installation

1. Extract the project files
2. Open `index.html` in your web browser
3. Start browsing and shopping!

## How to Use

### Browsing Courses
1. Scroll through the featured courses section
2. View course details including ratings and student count
3. Check the course price

### Adding to Cart
1. Click the "Add to Cart" button on any course
2. View your cart by clicking the cart icon in the navigation
3. Remove items if needed

### Checkout
1. Click "Proceed to Checkout" in the cart sidebar
2. Fill in your personal information
3. Select your preferred payment method
4. Complete the purchase

## Customization

### Adding More Courses
Edit `js/script.js` and add courses to the `coursesData` array:

```javascript
{
    id: 7,
    title: "Your Course Title",
    category: "Category",
    description: "Course description",
    price: 99.99,
    rating: 4.8,
    students: 1000,
    icon: "📚"
}
```

### Changing Colors
Edit `css/styles.css` - look for the `:root` CSS variables:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    /* ... more colors ... */
}
```

### Adding Stripe Payment
To integrate real Stripe payments:

1. Sign up at https://stripe.com
2. Get your API keys
3. Add Stripe.js to the HTML
4. Implement token creation in the checkout form
5. Send the token to your backend for processing

Example addition to `index.html`:
```html
<script src="https://js.stripe.com/v3/"></script>
```

### Adding Email Notifications
To send order confirmation emails:

1. Use a service like SendGrid, Mailgun, or Firebase
2. Modify the checkout processing to call your email API
3. Send confirmation to both customer and admin

## Demo Courses

The website comes with 6 sample courses:
- Web Development Masterclass
- UI/UX Design Fundamentals
- Python for Data Science
- Digital Marketing Essentials
- Mobile App Development
- Cloud Computing with AWS

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features to Add

- User authentication and accounts
- Course content and video playback
- Student reviews and testimonials
- Real payment gateway integration
- Admin dashboard
- Course search and filtering
- Wishlist functionality
- Course certificates
- Discount codes and promotions

## Notes

- This is a demo version with sample data
- Payment is not actually processed
- No backend database is required for the demo
- Cart data is stored locally in the browser

## License

This project is open source and available for personal and commercial use.

## Support

For questions or support, contact: hello@coursehub.com

---

Built with ❤️ for course creators and learners worldwide
