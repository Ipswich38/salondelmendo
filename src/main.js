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
        
        if (lowerMessage.includes('service') || lowerMessage.includes('hair') || lowerMessage.includes('nail') || lowerMessage.includes('beauty')) {
            return `🌟 Great question! We offer comprehensive hair styling, nail care, and beauty treatments for both men and women. Our services include haircuts, coloring, manicures, pedicures, facials, and more. Would you like specific details about any service?`;
        }
        
        if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('where') || lowerMessage.includes('hour')) {
            return `📍 We're conveniently located in the heart of the city! Our hours are:<br><br>
                    Monday - Friday: 9:00 AM - 7:00 PM<br>
                    Saturday: 9:00 AM - 6:00 PM<br>
                    Sunday: 10:00 AM - 5:00 PM<br><br>
                    Need directions or want to call ahead?`;
        }
        
        if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('schedule')) {
            return `📅 I'd love to help you book an appointment! You can:<br><br>
                    • Call us directly for immediate booking<br>
                    • Use our contact form to request your preferred time<br>
                    • Walk-ins welcome (subject to availability)<br><br>
                    What type of service are you interested in?`;
        }
        
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
            return `💰 Our prices vary depending on the service. We offer competitive rates for all our treatments. For specific pricing, I recommend calling us directly or visiting in person for a personalized consultation. We also have special packages and seasonal promotions!`;
        }
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return `👋 Hello there! Welcome to Salon delMENdo! I'm here to help you with any questions about our services, booking, location, or anything else. How can I assist you today?`;
        }
        
        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return `😊 You're very welcome! Is there anything else I can help you with today? We're always here to make your salon experience amazing!`;
        }
        
        // Default response
        return `Thanks for your message! I'm here to help with information about our services, location, hours, and booking. You can also call us directly or visit us in person. What would you like to know more about?`;
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

console.log('All JavaScript loaded successfully');