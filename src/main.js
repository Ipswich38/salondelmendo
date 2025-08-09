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
        console.log('User message:', message);
        console.log('Lowercase message:', lowerMessage);
        
        // Beauty tips and recommendations - PRIORITY over pricing queries
        if ((lowerMessage.includes('tip') && !lowerMessage.includes('price')) || 
            (lowerMessage.includes('advice') && !lowerMessage.includes('cost')) || 
            (lowerMessage.includes('recommend') && !lowerMessage.includes('how much')) || 
            (lowerMessage.includes('help') && !lowerMessage.includes('price') && !lowerMessage.includes('cost') && !lowerMessage.includes('how much')) || 
            (lowerMessage.includes('how to') && !lowerMessage.includes('price'))) {
            console.log('Beauty tips condition triggered!');
            
            // Hair care tips that lead to salon services
            if (lowerMessage.includes('hair') || lowerMessage.includes('damage') || lowerMessage.includes('dry')) {
                return `💁‍♀️ <strong>HAIR CARE EXPERT TIPS:</strong><br><br>
                        <strong>✨ For Damaged Hair:</strong><br>
                        While deep conditioning at home helps, truly damaged hair needs professional intervention! Our <strong>Brazilian Keratin treatments</strong> (₱1,500+) can restore your hair's natural shine and strength from the inside out.<br><br>
                        
                        <strong>💡 Pro Tip:</strong> Heat styling without protection causes 80% of hair damage. Our stylists can teach you proper techniques during your next visit!<br><br>
                        
                        <strong>🌟 Salon Secret:</strong> Monthly professional treatments prevent 6 months of damage. Book a consultation to create your personalized hair recovery plan!<br><br>
                        
                        📞 Ready to transform your hair? Call 0917 124 4358`;
            }
            
            if (lowerMessage.includes('color') || lowerMessage.includes('dye') || lowerMessage.includes('highlight')) {
                return `🎨 <strong>HAIR COLOR EXPERT ADVICE:</strong><br><br>
                        <strong>⚠️ Home Coloring Risks:</strong><br>
                        DIY hair color can cause uneven results, chemical burns, and irreversible damage. Our professional colorists use premium organic formulas that protect while beautifying!<br><br>
                        
                        <strong>✨ Salon Advantage:</strong><br>
                        • Color matching to your skin tone<br>
                        • Damage prevention techniques<br>
                        • Long-lasting, vibrant results<br>
                        • Expert color correction if needed<br><br>
                        
                        <strong>💡 Secret Formula:</strong> Our organic colors (₱800+) last 3x longer than drugstore brands while nourishing your hair!<br><br>
                        
                        Book your color consultation today: 0917 124 4358`;
            }
            
            if (lowerMessage.includes('skin') || lowerMessage.includes('acne') || lowerMessage.includes('wrinkle') || lowerMessage.includes('glow')) {
                return `✨ <strong>SKINCARE EXPERT SECRETS:</strong><br><br>
                        <strong>🧴 Home Skincare Reality:</strong><br>
                        Over-the-counter products only work on the surface. Real transformation happens with professional treatments that penetrate deeper skin layers!<br><br>
                        
                        <strong>🎯 Pro Solutions:</strong><br>
                        • Acne Problems? Our Anti-Acne Treatment (₱550) targets root causes<br>
                        • Aging Concerns? Pico Treatment (₱1,500) stimulates collagen production<br>
                        • Dull Skin? Diamond Peel (₱400) reveals your natural radiance<br><br>
                        
                        <strong>💫 Salon Secret:</strong> Professional facials every 4-6 weeks maintain optimal skin health year-round!<br><br>
                        
                        Ready for glowing skin? Book your facial analysis: 0917 124 4358`;
            }
            
            if (lowerMessage.includes('nail') || lowerMessage.includes('manicure') || lowerMessage.includes('polish')) {
                return `💅 <strong>NAIL CARE EXPERT TIPS:</strong><br><br>
                        <strong>🏠 Home Manicure Limitations:</strong><br>
                        DIY nails chip within days because you lack professional-grade products and techniques. Our salon manicures last 2-3 weeks with proper application!<br><br>
                        
                        <strong>✨ Professional Difference:</strong><br>
                        • Cuticle care that prevents infections<br>
                        • Base coats that prevent staining<br>
                        • Gel polishes that resist chipping<br>
                        • Perfect shape for your lifestyle<br><br>
                        
                        <strong>💡 Insider Tip:</strong> Our Blue Sky gel polish (₱550) has a 3-week chip-free guarantee!<br><br>
                        
                        Treat your nails right: 0917 124 4358`;
            }
            
            // General beauty advice for any other tip request
            return `💄 <strong>BEAUTY EXPERT CONSULTATION:</strong><br><br>
                    <strong>🌟 Universal Beauty Truth:</strong><br>
                    Real beauty comes from professional care that enhances your natural features. Home routines maintain, but salon treatments transform!<br><br>
                    
                    <strong>✨ What We Recommend:</strong><br>
                    • Monthly facials for healthy skin<br>
                    • Quarterly hair treatments for damage prevention<br>
                    • Professional nail care every 2-3 weeks<br>
                    • Annual beauty consultations for personalized plans<br><br>
                    
                    <strong>💡 Free Beauty Assessment:</strong><br>
                    Visit us for a complimentary consultation! Our experts will analyze your beauty needs and create a custom care plan.<br><br>
                    
                    Book your beauty transformation: 0917 124 4358`;
        }
        
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
        
        // Enhanced interactive responses with personality
        if (lowerMessage.includes('busy') || lowerMessage.includes('time') || lowerMessage.includes('schedule')) {
            return `⏰ <strong>WE UNDERSTAND YOUR BUSY LIFESTYLE!</strong><br><br>
                    <strong>🚀 Express Services Available:</strong><br>
                    • Quick Manicure: 30 minutes<br>
                    • Express Facial: 45 minutes<br>
                    • Speed Blowdry: 20 minutes<br>
                    • Lunch-break Threading: 15 minutes<br><br>
                    
                    <strong>📅 Flexible Scheduling:</strong><br>
                    • Early morning slots: 9:00 AM<br>
                    • Lunch appointments: 12:00-1:00 PM<br>
                    • After-work slots until 9:00 PM<br>
                    • Weekend availability<br><br>
                    
                    <strong>💡 Pro Tip:</strong> Book recurring appointments and we'll reserve your preferred time slot!<br><br>
                    
                    Let's find time that works for YOU: 0917 124 4358`;
        }
        
        if (lowerMessage.includes('expensive') || lowerMessage.includes('cheap') || lowerMessage.includes('budget') || lowerMessage.includes('afford')) {
            return `💰 <strong>QUALITY BEAUTY IS AN INVESTMENT!</strong><br><br>
                    <strong>🎯 Value Perspective:</strong><br>
                    One professional treatment = months of confidence and beauty! Compare: drugstore products cost ₱200-500 weekly with minimal results vs. our lasting transformations.<br><br>
                    
                    <strong>💎 Budget-Friendly Options:</strong><br>
                    • Student/Senior Discounts: Up to 25% off<br>
                    • Package Deals: Save ₱500-1,000<br>
                    • Monthly Payment Plans available<br>
                    • Group booking discounts<br><br>
                    
                    <strong>✨ Free Services:</strong><br>
                    • Beauty consultations<br>
                    • Hair analysis<br>
                    • Skin assessment<br><br>
                    
                    <strong>🌟 Remember:</strong> You deserve to look and feel amazing! Let's work within your budget: 0917 124 4358`;
        }
        
        if (lowerMessage.includes('scared') || lowerMessage.includes('nervous') || lowerMessage.includes('first time') || lowerMessage.includes('worried')) {
            return `🤗 <strong>FIRST-TIME NERVES ARE TOTALLY NORMAL!</strong><br><br>
                    <strong>💕 We're Here For You:</strong><br>
                    Our team specializes in making first-timers feel comfortable and welcomed. You're in caring, professional hands!<br><br>
                    
                    <strong>✨ What to Expect:</strong><br>
                    • Detailed consultation before any service<br>
                    • Step-by-step explanation of processes<br>
                    • You can stop or ask questions anytime<br>
                    • Patch tests for sensitive skin<br><br>
                    
                    <strong>🌟 Comfort Guarantees:</strong><br>
                    • No pressure, no judgment environment<br>
                    • Professional, licensed technicians only<br>
                    • Clean, sanitized tools and spaces<br>
                    • Your comfort is our priority<br><br>
                    
                    Ready to feel beautiful? We'll take great care of you: 0917 124 4358`;
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
            const greetings = [
                `👋 <strong>Hello gorgeous! Welcome to Salon del MEN do!</strong><br><br>
                 <strong>🎉 Proudly serving since October 28, 2022</strong><br><br>
                 I'm your personal beauty consultant! Ready to help you discover:<br>
                 • Perfect services for your beauty goals 💄<br>
                 • Expert recommendations & insider tips ✨<br>
                 • Easy appointment booking 📅<br>
                 • Exclusive package deals & promotions 🎁<br><br>
                 
                 What beauty transformation are you dreaming of today? 😍`,
                
                `🌟 <strong>Hey there, beautiful! You've found your beauty destination!</strong><br><br>
                 <strong>💕 2+ years of making people feel amazing!</strong><br><br>
                 I'm here to be your beauty guide for:<br>
                 • Personalized service recommendations 🎯<br>
                 • Professional beauty tips & advice 💡<br>
                 • Quick booking assistance 📲<br>
                 • Money-saving package options 💰<br><br>
                 
                 Ready to glow up? What's your beauty priority today? ✨`,
                
                `🎉 <strong>Welcome to your beauty transformation headquarters!</strong><br><br>
                 <strong>🏆 Bulacan's premier salon since 2022</strong><br><br>
                 As your beauty advisor, I'm excited to help with:<br>
                 • Tailored beauty solutions just for you 🎨<br>
                 • Professional insights & recommendations 🔍<br>
                 • Seamless appointment scheduling ⏰<br>
                 • Special offers & exclusive deals 🌈<br><br>
                 
                 Let's make you look and feel incredible! What brings you here today? 💖`
            ];
            
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        
        // Enhanced emotional support responses
        if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down') || lowerMessage.includes('upset')) {
            return `💝 <strong>WE'RE HERE TO LIFT YOUR SPIRITS!</strong><br><br>
                    <strong>✨ Beauty Therapy Sessions:</strong><br>
                    Sometimes we all need a little self-care to feel better. Our relaxing treatments are designed to pamper your body AND soul!<br><br>
                    
                    <strong>🌈 Mood-Boosting Services:</strong><br>
                    • Relaxing Full Body Massage: ₱500-600<br>
                    • Rejuvenating Facial Treatment: ₱350+<br>
                    • Pampering Manicure/Pedicure: ₱100+<br>
                    • Confidence-Boosting Hair Makeover: ₱200+<br><br>
                    
                    <strong>💕 You Deserve This:</strong><br>
                    Taking care of yourself isn't selfish - it's necessary! Let our caring team help you feel beautiful inside and out.<br><br>
                    
                    Ready for some self-love? 0917 124 4358 💖`;
        }
        
        if (lowerMessage.includes('special') || lowerMessage.includes('event') || lowerMessage.includes('wedding') || lowerMessage.includes('party')) {
            return `🎊 <strong>SPECIAL OCCASION BEAUTY EXPERT!</strong><br><br>
                    <strong>✨ Make Your Day Unforgettable:</strong><br>
                    Every special moment deserves professional beauty! We specialize in making you look absolutely stunning for life's biggest celebrations.<br><br>
                    
                    <strong>👰 Bridal Beauty Packages:</strong><br>
                    • Hair & Makeup: ₱1,000+ (Women) | ₱800+ (Men)<br>
                    • Trial sessions available<br>
                    • Group booking discounts<br>
                    • Touch-up services<br><br>
                    
                    <strong>🎉 Event Services:</strong><br>
                    • Graduation ceremonies<br>
                    • Birthday celebrations<br>
                    • Corporate events<br>
                    • Date nights<br><br>
                    
                    <strong>💡 Pro Tip:</strong> Book 2-3 weeks in advance for premium time slots!<br><br>
                    
                    Let's make your special day perfect: 0917 124 4358 ✨`;
        }
        
        // Weather-based beauty recommendations
        if (lowerMessage.includes('weather') || lowerMessage.includes('summer') || lowerMessage.includes('rainy') || lowerMessage.includes('hot')) {
            return `🌤️ <strong>WEATHER-PROOF BEAUTY SOLUTIONS!</strong><br><br>
                    <strong>☀️ Hot Weather Challenges:</strong><br>
                    Humidity ruins makeup, sweat damages hair, and sun exposure ages skin. Our professional treatments create weather-resistant beauty!<br><br>
                    
                    <strong>💧 Rainy Season Protection:</strong><br>
                    • Keratin Treatments: Frizz-proof hair for 6 months<br>
                    • Waterproof Gel Polish: Rain-resistant nails<br>
                    • Long-lasting Makeup: Event-proof application<br><br>
                    
                    <strong>🌟 All-Weather Services:</strong><br>
                    • Brazilian Blowouts for humidity control<br>
                    • UV-protective facials for sun damage<br>
                    • Sweat-proof makeup techniques<br><br>
                    
                    Don't let weather ruin your beauty: 0917 124 4358`;
        }
        
        // Enhanced personality responses
        if (lowerMessage.includes('beautiful') || lowerMessage.includes('pretty') || lowerMessage.includes('gorgeous')) {
            return `💖 <strong>YOU'RE ABSOLUTELY RIGHT TO WANT TO FEEL BEAUTIFUL!</strong><br><br>
                    <strong>✨ Beauty Confidence Boosters:</strong><br>
                    True beauty radiates from feeling confident and well-cared for. Our services are designed to enhance your natural gorgeousness!<br><br>
                    
                    <strong>🌟 Instant Confidence Services:</strong><br>
                    • Eyebrow Shaping: ₱150 (instant face lift!)<br>
                    • Express Blowdry: ₱150 (bouncy, voluminous hair)<br>
                    • Quick Manicure: ₱100 (polished fingertips)<br>
                    • Lip Threading: ₱150 (perfect pout)<br><br>
                    
                    <strong>💫 Remember:</strong> You're already beautiful - we just help you feel it! <br><br>
                    
                    Ready to glow even brighter? 0917 124 4358 ✨`;
        }
        
        if (lowerMessage.includes('girlfriend') || lowerMessage.includes('friends') || lowerMessage.includes('group') || lowerMessage.includes('together')) {
            return `👯‍♀️ <strong>GIRLS' DAY OUT PARADISE!</strong><br><br>
                    <strong>🎉 Squad Beauty Goals:</strong><br>
                    Nothing beats bonding over beauty treatments! We LOVE hosting groups and making your friendship moments extra special.<br><br>
                    
                    <strong>👭 Group Package Benefits:</strong><br>
                    • 10% discount for 3+ people<br>
                    • Coordinated appointment slots<br>
                    • Group photos in our beauty corners<br>
                    • Complimentary consultation for everyone<br><br>
                    
                    <strong>💕 Perfect for:</strong><br>
                    • Bachelorette parties<br>
                    • Birthday celebrations<br>
                    • Friendship bonding days<br>
                    • Pre-event prep sessions<br><br>
                    
                    Bring your squad and save together: 0917 124 4358 🥳`;
        }
        
        // Seasonal and trending beauty responses
        if (lowerMessage.includes('trend') || lowerMessage.includes('popular') || lowerMessage.includes('latest') || lowerMessage.includes('new')) {
            return `🔥 <strong>2024 BEAUTY TRENDS - WE'VE GOT THEM ALL!</strong><br><br>
                    <strong>💇‍♀️ Trending Hair Styles:</strong><br>
                    • Korean-inspired cuts and colors<br>
                    • Curtain bangs and face-framing layers<br>
                    • Glossy, healthy hair treatments<br>
                    • Balayage and natural highlights<br><br>
                    
                    <strong>💅 Nail Art Trends:</strong><br>
                    • Minimalist gel designs<br>
                    • Chrome and metallic finishes<br>
                    • French tip variations<br>
                    • Seasonal nail art<br><br>
                    
                    <strong>✨ Skincare Trends:</strong><br>
                    • Glass skin facial treatments<br>
                    • Anti-aging preventative care<br>
                    • Natural glow enhancements<br><br>
                    
                    Stay ahead of trends with us: 0917 124 4358 📸`;
        }
        
        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return `😊 <strong>You're absolutely welcome, beautiful!</strong><br><br>
                    <strong>🌟 Before You Go:</strong><br>
                    • Ready to book that appointment? 📞<br>
                    • Want to follow us for beauty tips? 📱<br>
                    • Questions about package deals? 💝<br>
                    • Need directions to our salon? 📍<br><br>
                    
                    📞 <strong>Call:</strong> 0917 124 4358<br>
                    📷 <strong>Instagram:</strong> @salon.delmendo<br>
                    🎵 <strong>TikTok:</strong> @salon.delmendo<br><br>
                    
                    We're always here to make your beauty dreams come true! ✨💖`;
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