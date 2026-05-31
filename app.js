/* ==========================================================================
   AURA Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navigation Scroll Effect ---
    const siteHeader = document.getElementById('siteHeader');
    
    const handleScroll = () => {
        if (window.scrollY > 40) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    };
    
    // Initial run and listener
    handleScroll();
    window.addEventListener('scroll', handleScroll);


    // --- 2. Mobile Responsive Menu ---
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scrolling when mobile menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });


    // --- 3. Interactive Theme Switcher Dashboard ---
    const themeButtons = document.querySelectorAll('.theme-btn');
    const frequencyValue = document.querySelector('.active-frequency-label span');
    const themeDesc = document.querySelector('.active-desc-label');

    // Details for each theme preview state
    const themeDetails = {
        indigo: {
            freq: "8.2 Hz (Alpha Focus)",
            desc: "Indigo Flow: Generates deep violet and indigo wavelengths to stabilize neural pathways and maximize coding focus."
        },
        mint: {
            freq: "11.5 Hz (Alpha Flow)",
            desc: "Tranquil Mint: Emits emerald and cyan waves to reduce visual fatigue, perfect for prolonged analysis and calm focus."
        },
        pink: {
            freq: "14.2 Hz (Beta Creative)",
            desc: "Cyber Pink: Pulses energetic coral and pink waves to spark rapid prototyping, dynamic design creation, and creativity."
        },
        amber: {
            freq: "6.5 Hz (Theta Calm)",
            desc: "Solar Amber: Dims into deep amber and gold hues, encouraging slow deep breathing and sensory decompression."
        }
    };

    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            
            // 1. Set active class on buttons
            themeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 2. Set theme data-attribute on html element (triggers instant CSS variable transition)
            document.documentElement.setAttribute('data-theme', theme);
            
            // 3. Update the sandbox visualizer text details dynamically
            if (themeDetails[theme]) {
                // Smoothly fade text out, change value, and fade back in
                frequencyValue.style.opacity = 0;
                themeDesc.style.opacity = 0;
                
                setTimeout(() => {
                    frequencyValue.textContent = themeDetails[theme].freq;
                    themeDesc.textContent = themeDetails[theme].desc;
                    frequencyValue.style.opacity = 1;
                    themeDesc.style.opacity = 1;
                }, 200);
            }
        });
    });

    // Add quick fade transitions to visualizer tags
    frequencyValue.style.transition = 'opacity 0.2s ease';
    themeDesc.style.transition = 'opacity 0.2s ease';


    // --- 4. High-End Stats Count-Up Animation ---
    const statNums = document.querySelectorAll('.stat-num');
    const animationDuration = 2000; // 2 seconds

    const animateStats = () => {
        statNums.forEach(stat => {
            const targetValue = parseInt(stat.getAttribute('data-val'), 10);
            const startValue = 0;
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / animationDuration, 1);
                
                // Ease out cubic function for decelerating count speeds near target
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                
                const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutCubic);
                stat.textContent = currentValue;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = targetValue; // Guarantee exact target at end
                }
            };

            requestAnimationFrame(updateCounter);
        });
    };

    // Trigger counters with a slight entry delay for visual alignment
    setTimeout(animateStats, 300);


    // --- 5. Newsletter Sign Up Feedback (Bonus Touch!) ---
    const ctaForm = document.getElementById('ctaForm');
    const ctaEmail = document.getElementById('ctaEmail');
    const submitBtn = ctaForm.querySelector('.btn-submit');

    ctaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = ctaEmail.value;
        
        if (email) {
            // Animating button into "Success" state
            submitBtn.disabled = true;
            submitBtn.style.opacity = 0.8;
            
            const btnSpan = submitBtn.querySelector('span');
            const originalText = btnSpan.textContent;
            
            btnSpan.textContent = "Welcome to AURA";
            ctaEmail.value = "";
            
            // Add custom success glow border to container
            const inputWrapper = ctaForm.querySelector('.input-wrapper');
            inputWrapper.style.borderColor = '#10b981';
            inputWrapper.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3)';

            setTimeout(() => {
                btnSpan.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = 1;
                inputWrapper.style.borderColor = '';
                inputWrapper.style.boxShadow = '';
            }, 3500);
        }
    });

});
