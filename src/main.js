// Mobile menu functionality - Fixed for touch devices
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing mobile menu...');
    
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileMenuToggle && mobileNav) {
        console.log('Mobile menu elements found successfully');
        
        // Handle both click and touch events for maximum compatibility
        function toggleMenu(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = mobileNav.classList.contains('active');
            
            if (isActive) {
                mobileNav.classList.remove('active');
                console.log('Mobile menu closed');
            } else {
                mobileNav.classList.add('active');
                console.log('Mobile menu opened');
            }
        }
        
        // Add multiple event listeners for better mobile support
        mobileMenuToggle.addEventListener('click', toggleMenu);
        mobileMenuToggle.addEventListener('touchend', toggleMenu, { passive: false });
        
        // Close menu when clicking on navigation links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                console.log('Menu closed via nav link click');
            });
            
            link.addEventListener('touchend', function() {
                mobileNav.classList.remove('active');
                console.log('Menu closed via nav link touch');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && 
                !mobileNav.contains(e.target) && 
                mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                console.log('Menu closed - clicked outside');
            }
        });

        // Close menu with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                console.log('Menu closed via Escape key');
            }
        });

        console.log('Mobile menu initialized successfully');
    } else {
        console.error('Mobile menu elements not found:', {
            toggle: !!mobileMenuToggle,
            nav: !!mobileNav
        });
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 100; // Account for fixed header
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileNav = document.getElementById('mobile-nav');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                }
            }
        });
    });
});

// Add scroll effect to header
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Add loading animation for gallery images
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
});

// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotPreview = document.getElementById('chatbot-preview');
    const previewMessage = document.getElementById('preview-message');
    
    // Chatbot preview messages
    const previewMessages = [
        "👋 Need help? Ask me about our services!",
        "💇‍♀️ Curious about our hair styling?",
        "💅 Want to know about our nail services?",
        "📍 Looking for our location & hours?",
        "📞 Ready to book an appointment?",
        "✨ Discover our beauty treatments!"
    ];
    
    let currentMessageIndex = 0;
    let previewInterval;
    
    // Show chatbot preview with rotating messages
    function startPreviewRotation() {
        // Show preview after 3 seconds
        setTimeout(() => {
            if (chatbotPreview && !chatbotContainer.classList.contains('active')) {
                chatbotPreview.classList.add('show');
                
                // Rotate messages every 4 seconds
                previewInterval = setInterval(() => {
                    if (!chatbotContainer.classList.contains('active')) {
                        currentMessageIndex = (currentMessageIndex + 1) % previewMessages.length;
                        previewMessage.textContent = previewMessages[currentMessageIndex];
                    }
                }, 4000);
            }
        }, 3000);
    }
    
    // Hide chatbot preview
    function hidePreview() {
        if (chatbotPreview) {
            chatbotPreview.classList.remove('show');
        }
        if (previewInterval) {
            clearInterval(previewInterval);
        }
    }
    
    // Toggle chatbot
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            const isActive = chatbotContainer.classList.contains('active');
            
            if (isActive) {
                chatbotContainer.classList.remove('active');
                chatbotToggle.classList.remove('active');
                startPreviewRotation();
            } else {
                chatbotContainer.classList.add('active');
                chatbotToggle.classList.add('active');
                hidePreview();
                chatbotInput.focus();
            }
        });
    }
    
    // Send message function
    function sendMessage(message) {
        if (!message.trim()) return;
        
        // Add user message
        addMessage(message, 'user');
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate response delay
        setTimeout(() => {
            hideTypingIndicator();
            const response = generateResponse(message);
            addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
        
        // Clear input
        if (chatbotInput) {
            chatbotInput.value = '';
        }
    }
    
    // Add message to chat
    function addMessage(message, sender) {
        if (!chatbotMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message message-${sender}`;
        
        if (sender === 'bot') {
            messageDiv.innerHTML = `
                <div class="bot-avatar">
                    <img src="public/salondelmendologo.png" alt="Salon delMENdo" />
                </div>
                <div class="message-content">${message}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">${message}</div>
            `;
        }
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        if (!chatbotMessages) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-message message-bot typing-indicator';
        typingDiv.innerHTML = `
            <div class="bot-avatar">
                <img src="public/salondelmendologo.png" alt="Salon delMENdo" />
            </div>
            <div class="typing-animation">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Hide typing indicator
    function hideTypingIndicator() {
        const typingIndicator = chatbotMessages.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Generate bot response
    function generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Hair services queries
        if (lowerMessage.includes('hair') && (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much'))) {
            return `💇‍♀️ <strong>HAIR SERVICES PRICING:</strong><br><br>
                    <strong>💫 Hair Basics:</strong><br>
                    • Haircut: ₱200+ (₱150 student/senior)<br>
                    • Hair Blow Dry: ₱150+<br>
                    • Hair Shampoo: ₱50+<br>
                    • Hair Spa: ₱250+<br><br>
                    
                    <strong>🎨 Hair Color:</strong><br>
                    • Classic (Men): ₱600+ | (Women): ₱800+<br>
                    • Organic (Men): ₱800+ | (Women): ₱1,000+<br><br>
                    
                    <strong>🌟 Hair Treatments:</strong><br>
                    • Keratin: ₱350+ | Botox: ₱1,000+<br>
                    • Semi de Lino: ₱550+<br>
                    • Bleaching/Highlights: ₱800+<br><br>
                    
                    <strong>🇧🇷 Brazilian Treatments:</strong><br>
                    • iCure Magic Keratin: ₱1,500+<br>
                    • U Keratin: ₱1,500+<br>
                    • U Colagent: ₱2,500+<br>
                    • Cysteine: ₱2,800+<br><br>
                    
                    <strong>✨ Hair Rebond:</strong><br>
                    • Classic: ₱1,000+ | Organic: ₱1,500+<br>
                    • L'Oreal: ₱2,000+ | 3-in-1: ₱3,500+<br><br>
                    
                    Call 0917-1244358 for exact pricing!`;
        }
        
        // Nail services queries
        if (lowerMessage.includes('nail') && (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much'))) {
            return `💅 <strong>NAIL SERVICES PRICING:</strong><br><br>
                    <strong>✨ Basic Services:</strong><br>
                    • Manicure w/ Classic Polish: ₱100<br>
                    • Manicure w/ Magic Gel: ₱150<br>
                    • Pedicure w/ Classic Polish: ₱120<br>
                    • Pedicure w/ Magic Gel: ₱150<br><br>
                    
                    <strong>🧖‍♀️ Jelly Footspa:</strong><br>
                    • Jelly Footspa: ₱200<br>
                    • + Classic Manicure/Pedicure: ₱350<br>
                    • + Magic Gel Manicure/Pedicure: ₱450<br>
                    • + Blue Sky Manicure/Pedicure: ₱550<br><br>
                    
                    <strong>💎 Gel Polish:</strong><br>
                    • Avatino Gel (Mani): ₱350 | (Pedi): ₱400<br>
                    • iTac Gel (Mani): ₱450 | (Pedi): ₱500<br>
                    • Blue Sky Gel (Mani): ₱550 | (Pedi): ₱600<br>
                    • Magnetic Gel Polish: ₱550<br><br>
                    
                    <strong>✨ Extensions & Removal:</strong><br>
                    • Soft Gel Extension: ₱1,500<br>
                    • + Design: ₱1,700<br>
                    • Gel Removal: ₱15/nail<br>
                    • Extension Removal: ₱20/nail<br><br>
                    
                    Book now: 0917-1244358!`;
        }
        
        // Massage services queries  
        if (lowerMessage.includes('massage') && (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much'))) {
            return `💆‍♀️ <strong>MASSAGE SERVICES PRICING:</strong><br><br>
                    <strong>🌟 Whole Body (1 hour):</strong><br>
                    • Signature: ₱500 | Traditional Hilot: ₱500<br>
                    • Hot Stone/Compress/Ventosa: ₱600<br><br>
                    
                    <strong>✋ Targeted Massage (30 mins):</strong><br>
                    • Hand/Foot/Head/Back: ₱200 each<br>
                    • Kids Massage (45 mins): ₱350<br><br>
                    
                    <strong>💫 Specialty:</strong><br>
                    • Ear Candling + Head Massage: ₱350<br><br>
                    
                    Perfect for relaxation and wellness!`;
        }
        
        // Facial services queries
        if (lowerMessage.includes('facial') && (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much'))) {
            return `🧴 <strong>FACIAL TREATMENT PRICING:</strong><br><br>
                    • Basic Facial: ₱350<br>
                    • Diamond Peel: ₱400<br>
                    • Whitening Treatment: ₱450<br>
                    • Anti-Acne Treatment: ₱550<br>
                    • Anti-Aging Treatment: ₱700<br>
                    • All-In Facial: ₱900<br>
                    • Pico Treatment: ₱1,500<br><br>
                    
                    Get glowing, healthy skin today!`;
        }
        
        // Waxing services queries
        if (lowerMessage.includes('wax') && (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much'))) {
            return `🕯️ <strong>WAXING SERVICES PRICING:</strong><br><br>
                    <strong>👩 Women's Waxing:</strong><br>
                    • Upper/Lower Lip: ₱150 | Face: ₱250<br>
                    • Underarms: ₱250 | Arms: ₱320<br>
                    • Bikini: ₱280 | Brazilian: ₱600<br>
                    • Chest: ₱280 | Back: ₱320<br>
                    • Half Legs: ₱400 | Full Legs: ₱650<br>
                    • Full Body: ₱2,500<br><br>
                    
                    <strong>👨 Men's Waxing:</strong><br>
                    • Upper/Lower Lip: ₱180 | Face: ₱300<br>
                    • Underarms: ₱300 | Arms: ₱370<br>
                    • Bikini: ₱330 | Brazilian: ₱650<br>
                    • Chest: ₱530 | Back: ₱530<br>
                    • Half Legs: ₱450 | Full Legs: ₱730<br>
                    • Full Body: ₱2,600<br><br>
                    
                    Smooth, professional results!`;
        }
        
        // Laser services queries
        if (lowerMessage.includes('laser') && (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much'))) {
            return `⚡ <strong>LASER SERVICES PRICING:</strong><br><br>
                    <strong>👩 Women's Laser Hair Removal:</strong><br>
                    • Upper/Lower Lip: ₱500<br>
                    • Underarm: ₱1,000<br>
                    • Whole Face: ₱1,200<br>
                    • Lower Legs: ₱2,000 | Full Legs: ₱3,000<br><br>
                    
                    <strong>👨 Men's Laser Hair Removal:</strong><br>
                    • Upper/Lower Lip: ₱700<br>
                    • Underarm: ₱1,500<br>
                    • Whole Face: ₱1,700<br>
                    • Lower Legs: ₱2,500 | Full Legs: ₱3,500<br><br>
                    
                    <strong>🎯 Specialized Services:</strong><br>
                    • Tattoo Removal: ₱1,000+/session<br>
                    • Scar Removal: ₱1,200+/session<br><br>
                    
                    <strong>💪 RF Skin Tightening:</strong><br>
                    • Arms: ₱1,000 | Tummy: ₱1,500<br>
                    • Thigh: ₱1,500 | Back: ₱1,500<br><br>
                    
                    Advanced technology for permanent results!`;
        }
        
        // Threading services queries
        if ((lowerMessage.includes('threading') || lowerMessage.includes('eyebrow') || lowerMessage.includes('eyelash')) && (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much'))) {
            return `🧵 <strong>THREADING & EYEBROW SERVICES:</strong><br><br>
                    <strong>✨ Eyebrow Services:</strong><br>
                    • Eyebrow Threading: ₱150<br>
                    • Upper Lip: ₱150 | Lower Lip: ₱150<br>
                    • Eyebrow Shaving: ₱60<br>
                    • Eyebrow Tint: ₱250<br><br>
                    
                    <strong>👁️ Eyelash Extensions:</strong><br>
                    • Classic Eyelash Extension: ₱300<br>
                    • Volumized Extension: ₱500<br>
                    • Cat or Fox Eye Extension: ₱700<br><br>
                    
                    Perfect brows and lashes await!`;
        }
        
        // Makeup services queries
        if (lowerMessage.includes('makeup') && (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much'))) {
            return `💄 <strong>HAIR & MAKEUP SERVICES:</strong><br><br>
                    <strong>👩 Women's Services:</strong><br>
                    • Hair & Makeup: ₱1,000+<br><br>
                    
                    <strong>👨 Men's Services:</strong><br>
                    • Hair & Makeup: ₱800+<br><br>
                    
                    *Prices may vary based on complexity and event type*<br><br>
                    
                    Perfect for weddings, events & special occasions!`;
        }
        
        // Hair package queries
        if ((lowerMessage.includes('package') || lowerMessage.includes('combo')) && lowerMessage.includes('hair') && (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much'))) {
            return `💇‍♀️ <strong>HAIR PACKAGE DEALS:</strong><br><br>
                    <strong>🎨 Color + Treatment Packages:</strong><br>
                    • Classic Color + Botox: ₱1,700<br>
                    • Classic Color + U Keratin: ₱2,200<br>
                    • Organic Color + Botox: ₱1,900<br>
                    • Organic Color + U Colagent: ₱3,600<br><br>
                    
                    <strong>✨ Rebond + Treatment Packages:</strong><br>
                    • Classic Rebond + Botox: ₱1,900<br>
                    • Organic Rebond + Botox: ₱2,400<br>
                    • Classic Rebond + Cysteine: ₱4,000<br><br>
                    
                    <strong>💫 Triple Combo (Rebond + Color + Treatment):</strong><br>
                    • Classic Triple + Botox: ₱2,600<br>
                    • Organic Triple + iCure: ₱3,900<br><br>
                    
                    Save more with our package deals!`;
        }
        
        // General service inquiry
        if (lowerMessage.includes('service') || lowerMessage.includes('what do you offer')) {
            return `🌟 <strong>SALON DEL MEN DO - COMPLETE SERVICES:</strong><br><br>
                    💇‍♀️ <strong>Hair Services:</strong> Cuts, Colors, Treatments, Rebonding<br>
                    💅 <strong>Nail Services:</strong> Manicures, Pedicures, Extensions<br>
                    💆‍♀️ <strong>Massage Services:</strong> Full Body, Hot Stone, Hilot<br>
                    🧴 <strong>Facial Treatments:</strong> Anti-aging, Whitening, Acne<br>
                    🕯️ <strong>Waxing Services:</strong> Full body hair removal<br>
                    ⚡ <strong>Laser Services:</strong> Hair removal, Tattoo removal<br>
                    🎭 <strong>Makeup Services:</strong> Bridal, Special events<br><br>
                    
                    Ask about specific pricing for any service!`;
        }
        
        if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('where') || lowerMessage.includes('hour')) {
            return `📍 <strong>SALON DEL MEN DO LOCATION & HOURS:</strong><br><br>
                    <strong>📍 Address:</strong><br>
                    2nd Floor, Unit 2-1 & 2-3<br>
                    EM Commercial Plaza (beside Petro Gazz)<br>
                    Brgy. Gaya-gaya, San Jose Del Monte, Bulacan<br><br>
                    
                    <strong>⏰ Operating Hours:</strong><br>
                    ☀️ Monday to Sunday<br>
                    🕘 9:00 AM - 9:00 PM<br>
                    (Open for walk-in customers!)<br><br>
                    
                    <strong>📞 Contact Us:</strong><br>
                    📲 0917-1244358<br>
                    📧 salondelmendo@gmail.com<br><br>
                    
                    <strong>📱 Follow Us:</strong><br>
                    📷 Instagram: @salon.delmendo<br>
                    🎵 TikTok: @salon.delmendo`;
        }
        
        if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('schedule')) {
            return `📅 <strong>BOOK YOUR APPOINTMENT NOW!</strong><br><br>
                    📞 <strong>Call:</strong> 0917-1244358<br>
                    📧 <strong>Email:</strong> salondelmendo@gmail.com<br>
                    📷 <strong>Instagram:</strong> @salon.delmendo<br>
                    🎵 <strong>TikTok:</strong> @salon.delmendo<br><br>
                    
                    <strong>💡 Booking Options:</strong><br>
                    • Call directly for immediate booking<br>
                    • Email us your preferred time<br>
                    • Walk-ins welcome (9AM-9PM daily)<br><br>
                    
                    <strong>📍 Located at:</strong><br>
                    EM Commercial Plaza, Brgy. Gaya-gaya<br>
                    San Jose Del Monte, Bulacan<br><br>
                    
                    Which service interests you today?`;
        }
        
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
            return `💰 <strong>SALON DEL MEN DO PRICING:</strong><br><br>
                    We offer competitive pricing for all services! Here are some popular options:<br><br>
                    
                    💇‍♀️ <strong>Hair:</strong> Cuts from ₱150, Colors from ₱600<br>
                    💅 <strong>Nails:</strong> Manicure from ₱100, Gel from ₱350<br>
                    💆‍♀️ <strong>Massage:</strong> From ₱200 (30min) to ₱600 (1hr)<br>
                    🧴 <strong>Facial:</strong> From ₱350 to ₱1,500<br>
                    🕯️ <strong>Waxing:</strong> From ₱150 (lip) to ₱2,600 (full body)<br>
                    ⚡ <strong>Laser:</strong> From ₱500 (lip) to ₱3,500 (full legs)<br><br>
                    
                    Ask about specific services for detailed pricing!<br>
                    Call: 0917 124 4358`;
        }
        
        // About salon queries
        if (lowerMessage.includes('about') || lowerMessage.includes('history') || lowerMessage.includes('when') || lowerMessage.includes('years')) {
            return `🏛️ <strong>ABOUT SALON DEL MEN DO:</strong><br><br>
                    <strong>🎉 Established:</strong> October 28, 2022<br>
                    <strong>⏰ Years of Service:</strong> Since 2022, serving with excellence<br><br>
                    
                    <strong>🌟 Our Mission:</strong><br>
                    We believe beauty knows no boundaries! Our salon is a modern sanctuary where men and women experience exceptional service in an inclusive, welcoming environment.<br><br>
                    
                    <strong>💎 Our Commitment:</strong><br>
                    • Premium beauty & wellness services<br>
                    • Skilled professional team<br>
                    • Latest beauty trends & classic techniques<br>
                    • Personalized service for every client<br><br>
                    
                    Building confidence and radiance since 2022! ✨`;
        }

        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return `👋 <strong>Hello! Welcome to Salon del MEN do!</strong><br><br>
                    <strong>🎉 Serving since October 28, 2022</strong><br><br>
                    I'm here to help you with:<br>
                    • Service information & pricing<br>
                    • Booking appointments<br>
                    • Location & hours<br>
                    • Special packages & promotions<br><br>
                    
                    What can I help you with today? 😊`;
        }
        
        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return `😊 <strong>You're very welcome!</strong><br><br>
                    Is there anything else I can help you with?<br>
                    • More service information?<br>
                    • Ready to book an appointment?<br>
                    • Questions about our packages?<br><br>
                    
                    📞 Call us: 0917-1244358<br>
                    We're always here to make your salon experience amazing! ✨`;
        }
        
        // Default response
        return `Thanks for your message! 😊<br><br>
                <strong>I can help you with:</strong><br>
                • Complete service pricing & information<br>
                • Booking appointments<br>
                • Location & operating hours<br>
                • Special packages & recommendations<br><br>
                
                📞 <strong>Call:</strong> 0917 124 4358<br>
                📷 <strong>Instagram:</strong> @salon.delmendo<br>
                🎵 <strong>TikTok:</strong> @salon.delmendo<br><br>
                
                What would you like to know about our services?`;
    }
    
    // Send button click
    if (chatbotSend) {
        chatbotSend.addEventListener('click', function() {
            const message = chatbotInput.value;
            sendMessage(message);
        });
    }
    
    // Enter key press
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const message = chatbotInput.value;
                sendMessage(message);
            }
        });
    }
    
    // Quick reply function (made global)
    window.sendQuickReply = function(reply) {
        sendMessage(reply);
    };
    
    // Close chatbot when clicking outside
    document.addEventListener('click', function(e) {
        if (chatbotContainer && chatbotContainer.classList.contains('active') &&
            !chatbotContainer.contains(e.target) && 
            !chatbotToggle.contains(e.target)) {
            chatbotContainer.classList.remove('active');
            chatbotToggle.classList.remove('active');
            startPreviewRotation();
        }
    });
    
    // Start the preview rotation
    startPreviewRotation();
    
    console.log('Chatbot initialized successfully');
});

// Hair Services Interactive Main Image Update
window.updateMainImage = function(imageSrc, title, description) {
    const mainImage = document.getElementById('main-hair-image');
    const mainTitle = document.getElementById('main-hair-title');
    const mainDescription = document.getElementById('main-hair-description');
    
    if (mainImage && mainTitle && mainDescription) {
        // Add fade effect
        const featuredImage = mainImage.closest('.featured-image');
        featuredImage.style.opacity = '0.7';
        featuredImage.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            mainImage.src = imageSrc;
            mainTitle.textContent = title;
            mainDescription.textContent = description;
            
            // Restore appearance with smooth animation
            featuredImage.style.opacity = '1';
            featuredImage.style.transform = 'scale(1)';
        }, 200);
    }
};

// Nail Services Interactive Main Image Update
window.updateNailMainImage = function(imageSrc, title, description) {
    const mainImage = document.getElementById('main-nail-image');
    const mainTitle = document.getElementById('main-nail-title');
    const mainDescription = document.getElementById('main-nail-description');
    
    if (mainImage && mainTitle && mainDescription) {
        // Add fade effect
        const featuredImage = mainImage.closest('.featured-image');
        featuredImage.style.opacity = '0.7';
        featuredImage.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            mainImage.src = imageSrc;
            mainTitle.textContent = title;
            mainDescription.textContent = description;
            
            // Restore appearance with smooth animation
            featuredImage.style.opacity = '1';
            featuredImage.style.transform = 'scale(1)';
        }, 200);
    }
};

// Gallery Navigation to Dedicated Sections
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const category = this.getAttribute('data-category');
            let targetSection = null;
            
            // Determine which section to scroll to based on category
            if (category === 'hair') {
                targetSection = document.getElementById('hair-services');
            } else if (category === 'nails') {
                targetSection = document.getElementById('nail-services');
            }
            
            // If we have a target section, smooth scroll to it
            if (targetSection) {
                e.preventDefault(); // Prevent any default behavior
                
                const headerOffset = 100; // Account for fixed header
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Add a subtle highlight effect to the target section
                targetSection.style.transform = 'scale(1.01)';
                targetSection.style.transition = 'transform 0.3s ease';
                
                setTimeout(() => {
                    targetSection.style.transform = 'scale(1)';
                }, 600);
                
                console.log(`Navigating to ${category} services section`);
            }
        });
    });
    
    console.log('Gallery navigation initialized for hair and nail services');
});

console.log('All JavaScript loaded successfully');