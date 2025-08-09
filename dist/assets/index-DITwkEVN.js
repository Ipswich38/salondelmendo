(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();document.addEventListener("DOMContentLoaded",function(){console.log("DOM loaded - initializing mobile menu...");const s=document.getElementById("mobile-menu-toggle"),n=document.getElementById("mobile-nav");if(s&&n){let r=function(o){o.preventDefault(),o.stopPropagation(),n.classList.contains("active")?(n.classList.remove("active"),console.log("Mobile menu closed")):(n.classList.add("active"),console.log("Mobile menu opened"))};var i=r;console.log("Mobile menu elements found successfully"),s.addEventListener("click",r),s.addEventListener("touchend",r,{passive:!1}),document.querySelectorAll(".mobile-nav a").forEach(o=>{o.addEventListener("click",function(){n.classList.remove("active"),console.log("Menu closed via nav link click")}),o.addEventListener("touchend",function(){n.classList.remove("active"),console.log("Menu closed via nav link touch")})}),document.addEventListener("click",function(o){!s.contains(o.target)&&!n.contains(o.target)&&n.classList.contains("active")&&(n.classList.remove("active"),console.log("Menu closed - clicked outside"))}),document.addEventListener("keydown",function(o){o.key==="Escape"&&n.classList.contains("active")&&(n.classList.remove("active"),console.log("Menu closed via Escape key"))}),console.log("Mobile menu initialized successfully")}else console.error("Mobile menu elements not found:",{toggle:!!s,nav:!!n})});document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll('a[href^="#"]').forEach(s=>{s.addEventListener("click",function(n){n.preventDefault();const i=this.getAttribute("href"),r=document.querySelector(i);if(r){const c=r.offsetTop-100;window.scrollTo({top:c,behavior:"smooth"});const l=document.getElementById("mobile-nav");l&&l.classList.contains("active")&&l.classList.remove("active")}})})});document.addEventListener("DOMContentLoaded",function(){const s=document.querySelector("header");window.addEventListener("scroll",function(){window.scrollY>100?s.classList.add("scrolled"):s.classList.remove("scrolled")})});document.addEventListener("DOMContentLoaded",function(){const s=document.querySelectorAll(".gallery-item"),n=new IntersectionObserver(i=>{i.forEach(r=>{r.isIntersecting&&(r.target.style.opacity="1",r.target.style.transform="translateY(0)")})},{threshold:.1,rootMargin:"50px"});s.forEach(i=>{i.style.opacity="0",i.style.transform="translateY(20px)",i.style.transition="all 0.6s ease",n.observe(i)})});document.addEventListener("DOMContentLoaded",function(){const s=document.getElementById("chatbot-toggle"),n=document.getElementById("chatbot-container"),i=document.getElementById("chatbot-input"),r=document.getElementById("chatbot-send"),t=document.getElementById("chatbot-messages"),o=document.getElementById("chatbot-preview"),c=document.getElementById("preview-message"),l=["👋 Need help? Ask me about our services!","💇‍♀️ Curious about our hair styling?","💅 Want to know about our nail services?","📍 Looking for our location & hours?","📞 Ready to book an appointment?","✨ Discover our beauty treatments!"];let u=0,g;function m(){setTimeout(()=>{o&&!n.classList.contains("active")&&(o.classList.add("show"),g=setInterval(()=>{n.classList.contains("active")||(u=(u+1)%l.length,c.textContent=l[u])},4e3))},3e3)}function v(){o&&o.classList.remove("show"),g&&clearInterval(g)}s&&s.addEventListener("click",function(){n.classList.contains("active")?(n.classList.remove("active"),s.classList.remove("active"),m()):(n.classList.add("active"),s.classList.add("active"),v(),i.focus())});function b(a){a.trim()&&(f(a,"user"),p(),setTimeout(()=>{h();const e=y(a);f(e,"bot")},1e3+Math.random()*1e3),i&&(i.value=""))}function f(a,e){if(!t)return;const d=document.createElement("div");d.className=`chatbot-message message-${e}`,e==="bot"?d.innerHTML=`
                <div class="bot-avatar">
                    <img src="public/salondelmendologo.png" alt="Salon delMENdo" />
                </div>
                <div class="message-content">${a}</div>
            `:d.innerHTML=`
                <div class="message-content">${a}</div>
            `,t.appendChild(d),t.scrollTop=t.scrollHeight}function p(){if(!t)return;const a=document.createElement("div");a.className="chatbot-message message-bot typing-indicator",a.innerHTML=`
            <div class="bot-avatar">
                <img src="public/salondelmendologo.png" alt="Salon delMENdo" />
            </div>
            <div class="typing-animation">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `,t.appendChild(a),t.scrollTop=t.scrollHeight}function h(){const a=t.querySelector(".typing-indicator");a&&a.remove()}function y(a){const e=a.toLowerCase();return e.includes("hair")&&(e.includes("price")||e.includes("cost")||e.includes("how much"))?`💇‍♀️ <strong>HAIR SERVICES PRICING:</strong><br><br>
                    <strong>💫 Hair Basics:</strong><br>
                    • Haircut: ₱200+ (₱150 student/senior)<br>
                    • Hair Blow Dry: ₱150+<br>
                    • Hair Spa: ₱250+<br><br>
                    
                    <strong>🎨 Hair Color:</strong><br>
                    • Classic (Men): ₱600+ | (Women): ₱800+<br>
                    • Organic (Men): ₱800+ | (Women): ₱1,000+<br><br>
                    
                    <strong>🌟 Hair Treatments:</strong><br>
                    • Keratin: ₱350+ | Botox: ₱1,000+<br>
                    • Brazilian Treatments: ₱1,500-₱2,800<br><br>
                    
                    <strong>✨ Hair Rebond:</strong><br>
                    • Classic: ₱1,000+ | Organic: ₱1,500+<br>
                    • Premium: ₱2,000-₱3,500<br><br>
                    
                    Call 0917-1244358 for exact pricing!`:e.includes("nail")&&(e.includes("price")||e.includes("cost")||e.includes("how much"))?`💅 <strong>NAIL SERVICES PRICING:</strong><br><br>
                    <strong>✨ Basic Services:</strong><br>
                    • Manicure w/ Classic Polish: ₱100<br>
                    • Pedicure w/ Classic Polish: ₱120<br>
                    • Jelly Footspa: ₱200<br><br>
                    
                    <strong>💎 Premium Services:</strong><br>
                    • Gel Polish (Avatino): ₱350-₱400<br>
                    • Gel Polish (Blue Sky): ₱550-₱600<br>
                    • Soft Gel Extensions: ₱1,500+<br><br>
                    
                    <strong>🌟 Package Deals:</strong><br>
                    • Jelly Footspa + Magic Gel Mani/Pedi: ₱450<br>
                    • Complete Premium Package: ₱550<br><br>
                    
                    Book now: 0917-1244358!`:e.includes("massage")&&(e.includes("price")||e.includes("cost")||e.includes("how much"))?`💆‍♀️ <strong>MASSAGE SERVICES PRICING:</strong><br><br>
                    <strong>🌟 Whole Body (1 hour):</strong><br>
                    • Signature: ₱500 | Traditional Hilot: ₱500<br>
                    • Hot Stone/Compress/Ventosa: ₱600<br><br>
                    
                    <strong>✋ Targeted Massage (30 mins):</strong><br>
                    • Hand/Foot/Head/Back: ₱200 each<br>
                    • Kids Massage (45 mins): ₱350<br><br>
                    
                    <strong>💫 Specialty:</strong><br>
                    • Ear Candling + Head Massage: ₱350<br><br>
                    
                    Perfect for relaxation and wellness!`:e.includes("facial")&&(e.includes("price")||e.includes("cost")||e.includes("how much"))?`🧴 <strong>FACIAL TREATMENT PRICING:</strong><br><br>
                    • Basic Facial: ₱350<br>
                    • Diamond Peel: ₱400<br>
                    • Whitening Treatment: ₱450<br>
                    • Anti-Acne Treatment: ₱550<br>
                    • Anti-Aging Treatment: ₱700<br>
                    • All-In Facial: ₱900<br>
                    • Pico Treatment: ₱1,500<br><br>
                    
                    Get glowing, healthy skin today!`:e.includes("wax")&&(e.includes("price")||e.includes("cost")||e.includes("how much"))?`🕯️ <strong>WAXING SERVICES PRICING:</strong><br><br>
                    <strong>👩 Women's Waxing:</strong><br>
                    • Upper/Lower Lip: ₱150 | Underarms: ₱250<br>
                    • Half Legs: ₱400 | Full Legs: ₱650<br>
                    • Brazilian: ₱600 | Full Body: ₱2,500<br><br>
                    
                    <strong>👨 Men's Waxing:</strong><br>
                    • Upper/Lower Lip: ₱180 | Underarms: ₱300<br>
                    • Half Legs: ₱450 | Full Legs: ₱730<br>
                    • Brazilian: ₱650 | Full Body: ₱2,600<br><br>
                    
                    Smooth, professional results!`:e.includes("laser")&&(e.includes("price")||e.includes("cost")||e.includes("how much"))?`⚡ <strong>LASER SERVICES PRICING:</strong><br><br>
                    <strong>👩 Women's Laser Hair Removal:</strong><br>
                    • Upper/Lower Lip: ₱500 | Underarm: ₱1,000<br>
                    • Lower Legs: ₱2,000 | Full Legs: ₱3,000<br><br>
                    
                    <strong>👨 Men's Laser Hair Removal:</strong><br>
                    • Upper/Lower Lip: ₱700 | Underarm: ₱1,500<br>
                    • Lower Legs: ₱2,500 | Full Legs: ₱3,500<br><br>
                    
                    <strong>🎯 Specialized:</strong><br>
                    • Tattoo Removal: ₱1,000+/session<br>
                    • Scar Removal: ₱1,200+/session<br><br>
                    
                    Permanent hair reduction technology!`:e.includes("service")||e.includes("what do you offer")?`🌟 <strong>SALON DEL MEN DO - COMPLETE SERVICES:</strong><br><br>
                    💇‍♀️ <strong>Hair Services:</strong> Cuts, Colors, Treatments, Rebonding<br>
                    💅 <strong>Nail Services:</strong> Manicures, Pedicures, Extensions<br>
                    💆‍♀️ <strong>Massage Services:</strong> Full Body, Hot Stone, Hilot<br>
                    🧴 <strong>Facial Treatments:</strong> Anti-aging, Whitening, Acne<br>
                    🕯️ <strong>Waxing Services:</strong> Full body hair removal<br>
                    ⚡ <strong>Laser Services:</strong> Hair removal, Tattoo removal<br>
                    🎭 <strong>Makeup Services:</strong> Bridal, Special events<br><br>
                    
                    Ask about specific pricing for any service!`:e.includes("location")||e.includes("address")||e.includes("where")||e.includes("hour")?`📍 <strong>SALON DEL MEN DO LOCATION & HOURS:</strong><br><br>
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
                    🎵 TikTok: @salon.delmendo`:e.includes("book")||e.includes("appointment")||e.includes("schedule")?`📅 <strong>BOOK YOUR APPOINTMENT NOW!</strong><br><br>
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
                    
                    Which service interests you today?`:e.includes("price")||e.includes("cost")||e.includes("how much")?`💰 <strong>SALON DEL MEN DO PRICING:</strong><br><br>
                    We offer competitive pricing for all services! Here are some popular options:<br><br>
                    
                    💇‍♀️ <strong>Hair:</strong> Cuts from ₱150, Colors from ₱600<br>
                    💅 <strong>Nails:</strong> Manicure from ₱100, Gel from ₱350<br>
                    💆‍♀️ <strong>Massage:</strong> From ₱200 (30min) to ₱600 (1hr)<br>
                    🧴 <strong>Facial:</strong> From ₱350 to ₱1,500<br><br>
                    
                    Ask about specific services for detailed pricing!<br>
                    Call: 0917-1244358`:e.includes("about")||e.includes("history")||e.includes("when")||e.includes("years")?`🏛️ <strong>ABOUT SALON DEL MEN DO:</strong><br><br>
                    <strong>🎉 Established:</strong> October 28, 2022<br>
                    <strong>⏰ Years of Service:</strong> Since 2022, serving with excellence<br><br>
                    
                    <strong>🌟 Our Mission:</strong><br>
                    We believe beauty knows no boundaries! Our salon is a modern sanctuary where men and women experience exceptional service in an inclusive, welcoming environment.<br><br>
                    
                    <strong>💎 Our Commitment:</strong><br>
                    • Premium beauty & wellness services<br>
                    • Skilled professional team<br>
                    • Latest beauty trends & classic techniques<br>
                    • Personalized service for every client<br><br>
                    
                    Building confidence and radiance since 2022! ✨`:e.includes("hello")||e.includes("hi")||e.includes("hey")?`👋 <strong>Hello! Welcome to Salon del MEN do!</strong><br><br>
                    <strong>🎉 Serving since October 28, 2022</strong><br><br>
                    I'm here to help you with:<br>
                    • Service information & pricing<br>
                    • Booking appointments<br>
                    • Location & hours<br>
                    • Special packages & promotions<br><br>
                    
                    What can I help you with today? 😊`:e.includes("thank")||e.includes("thanks")?`😊 <strong>You're very welcome!</strong><br><br>
                    Is there anything else I can help you with?<br>
                    • More service information?<br>
                    • Ready to book an appointment?<br>
                    • Questions about our packages?<br><br>
                    
                    📞 Call us: 0917-1244358<br>
                    We're always here to make your salon experience amazing! ✨`:`Thanks for your message! 😊<br><br>
                <strong>I can help you with:</strong><br>
                • Complete service pricing & information<br>
                • Booking appointments<br>
                • Location & operating hours<br>
                • Special packages & recommendations<br><br>
                
                📞 <strong>Call:</strong> 0917-1244358<br>
                📱 <strong>Facebook:</strong> Salon del MEN do<br><br>
                
                What would you like to know about our services?`}r&&r.addEventListener("click",function(){const a=i.value;b(a)}),i&&i.addEventListener("keypress",function(a){if(a.key==="Enter"){const e=i.value;b(e)}}),window.sendQuickReply=function(a){b(a)},document.addEventListener("click",function(a){n&&n.classList.contains("active")&&!n.contains(a.target)&&!s.contains(a.target)&&(n.classList.remove("active"),s.classList.remove("active"),m())}),m(),console.log("Chatbot initialized successfully")});window.updateMainImage=function(s,n,i){const r=document.getElementById("main-hair-image"),t=document.getElementById("main-hair-title"),o=document.getElementById("main-hair-description");if(r&&t&&o){const c=r.closest(".featured-image");c.style.opacity="0.7",c.style.transform="scale(0.98)",setTimeout(()=>{r.src=s,t.textContent=n,o.textContent=i,c.style.opacity="1",c.style.transform="scale(1)"},200)}};window.updateNailMainImage=function(s,n,i){const r=document.getElementById("main-nail-image"),t=document.getElementById("main-nail-title"),o=document.getElementById("main-nail-description");if(r&&t&&o){const c=r.closest(".featured-image");c.style.opacity="0.7",c.style.transform="scale(0.98)",setTimeout(()=>{r.src=s,t.textContent=n,o.textContent=i,c.style.opacity="1",c.style.transform="scale(1)"},200)}};document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".gallery-item").forEach(n=>{n.addEventListener("click",function(i){const r=this.getAttribute("data-category");let t=null;if(r==="hair"?t=document.getElementById("hair-services"):r==="nails"&&(t=document.getElementById("nail-services")),t){i.preventDefault();const l=t.offsetTop-100;window.scrollTo({top:l,behavior:"smooth"}),t.style.transform="scale(1.01)",t.style.transition="transform 0.3s ease",setTimeout(()=>{t.style.transform="scale(1)"},600),console.log(`Navigating to ${r} services section`)}})}),console.log("Gallery navigation initialized for hair and nail services")});console.log("All JavaScript loaded successfully");
