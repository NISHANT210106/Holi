// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const generateBtn = document.getElementById('generateBtn');
    const shareButtons = document.getElementById('shareButtons');
    const downloadBtn = document.getElementById('downloadBtn');
    const whatsappShare = document.getElementById('whatsappShare');
    const facebookShare = document.getElementById('facebookShare');
    const twitterShare = document.getElementById('twitterShare');
    const greetingCard = document.getElementById('greetingCard');
    const greetingMessage = document.getElementById('greetingMessage');
    const senderName = document.getElementById('senderName');
    const receiverName = document.getElementById('receiverName');
    const userName = document.getElementById('userName');
    const friendName = document.getElementById('friendName');
    const templateSelect = document.getElementById('templateSelect');
    const englishBtn = document.getElementById('englishBtn');
    const hindiBtn = document.getElementById('hindiBtn');
    
    // Language-related elements
    const allTranslatableElements = document.querySelectorAll('[data-en]');
    let currentLanguage = 'en';
    
    // Language switching
    englishBtn.addEventListener('click', function() {
        setLanguage('en');
        englishBtn.classList.add('active');
        hindiBtn.classList.remove('active');
        document.documentElement.lang = 'en';
    });
    
    hindiBtn.addEventListener('click', function() {
        setLanguage('hi');
        hindiBtn.classList.add('active');
        englishBtn.classList.remove('active');
        document.documentElement.lang = 'hi';
    });
    
    function setLanguage(lang) {
        currentLanguage = lang;
        allTranslatableElements.forEach(element => {
            if(element.dataset[lang]) {
                if(element.tagName === 'INPUT' || element.tagName === 'SELECT') {
                    element.placeholder = element.dataset[lang + 'Placeholder'] || '';
                } else {
                    element.textContent = element.dataset[lang];
                }
            }
        });
        
        // Update dropdown options
        const options = templateSelect.querySelectorAll('option');
        options.forEach(option => {
            if(option.dataset[lang]) {
                option.textContent = option.dataset[lang];
            }
        });
        
        // Update generated message if it exists
        if(greetingCard.classList.contains('generated')) {
            updateGreetingMessage();
        }
    }
    
    // Holi Messages - English
    const holiMessagesEn = [
        "May your life be as colorful and joyful as the festival of Holi! Happy Holi!",
        "Wishing you a Holi filled with sweet moments and colorful memories to cherish forever!",
        "Let's celebrate the colors of love, friendship, and happiness. Happy Holi!",
        "May God gift you all the colors of life, colors of joy, colors of happiness, colors of friendship, colors of love and all other colors you want to paint in your life. Happy Holi!",
        "Bright colors, water balloons, lavish gujiyas and melodious songs are the ingredients of a perfect Holi. Wish you a very happy and colorful Holi!",
        "Let the colors of Holi spread the message of peace and happiness. Happy Holi!",
        "Holi is the apt time to break the ice, renew relationships and link yourself with those that you wanted to with a bit of color. Happy Holi!",
        "Red for passion, blue for tranquility, green for prosperity, and pink for love. May all these colors brighten your life this Holi!",
        "Wash away the evil, wash away the fears, spread love and happiness, remove all the tears. Play safe, stay blessed, have lots of fun. Happy Holi!",
        "I wish that this Holi brings the ultimate colors of happiness in your life and fills your days ahead with endless prosperity. Happy Holi!"
    ];
    
    // Holi Messages - Hindi
    const holiMessagesHi = [
        "आपका जीवन होली के त्योहार की तरह रंगीन और आनंदमय हो! होली की शुभकामनाएं!",
        "आपको मिठाई के पलों और रंगीन यादों से भरी होली की शुभकामनाएं!",
        "आइए प्यार, दोस्ती और खुशी के रंगों का जश्न मनाएं। होली की शुभकामनाएं!",
        "भगवान आपको जीवन के सभी रंग, खुशी के रंग, आनंद के रंग, दोस्ती के रंग, प्यार के रंग और अन्य सभी रंग दें जिन्हें आप अपने जीवन में रंगना चाहते हैं। होली की शुभकामनाएं!",
        "चमकीले रंग, पानी के गुब्बारे, स्वादिष्ट गुजिया और मधुर गीत एक परफेक्ट होली के अवयव हैं। आपको बहुत-बहुत शुभकामनाएं और रंगीन होली की शुभकामनाएं!",
        "होली के रंग शांति और खुशी का संदेश फैलाएं। होली की शुभकामनाएं!",
        "होली बर्फ को तोड़ने, रिश्तों को नवीनीकृत करने और थोड़े रंग के साथ उन लोगों से जुड़ने का उचित समय है जिनसे आप जुड़ना चाहते थे। होली की शुभकामनाएं!",
        "लाल जुनून के लिए, नीला शांति के लिए, हरा समृद्धि के लिए और गुलाबी प्यार के लिए। ये सभी रंग इस होली पर आपके जीवन को उज्जवल करें!",
        "बुराई को मिटाएं, डर को मिटाएं, प्यार और खुशी फैलाएं, सभी आंसू मिटाएं। सुरक्षित खेलें, आशीर्वाद पाएं, बहुत मज़ा करें। होली की शुभकामनाएं!",
        "मैं कामना करता हूं कि यह होली आपके जीवन में ख़ुशियों के अंतिम रंग लाए और आपके आने वाले दिनों को अनंत समृद्धि से भर दे। होली की शुभकामनाएं!"
    ];
    
    // Template settings
    const templates = {
        "template1": {
            class: "template-colorful",
            titleEn: "Happy Holi!",
            titleHi: "होली की हार्दिक शुभकामनाएं!"
        },
        "template2": {
            class: "template-gulal",
            titleEn: "Let's Celebrate With Gulal!",
            titleHi: "गुलाल के साथ जश्न मनाएं!"
        },
        "template3": {
            class: "template-waterballoons",
            titleEn: "Water Balloon Fun!",
            titleHi: "पानी के गुब्बारों का मज़ा!"
        },
        "template4": {
            class: "template-bonfire",
            titleEn: "Holika Dahan",
            titleHi: "होलिका दहन"
        },
        "template5": {
            class: "template-dancing",
            titleEn: "Dance In Colors!",
            titleHi: "रंगों में नाचो!"
        }
    };
    
    // Custom website base URL
    const websiteBaseUrl = "https://holifestival.com/";
    
    // Generate Greeting Card
    generateBtn.addEventListener('click', function() {
        if (!userName.value || !friendName.value) {
            alert(currentLanguage === 'en' ? 
                'Please enter both your name and your friend\'s name!' : 
                'कृपया अपना नाम और अपने दोस्त का नाम दोनों दर्ज करें!');
            return;
        }
        
        // Update names
        senderName.textContent = userName.value;
        receiverName.textContent = friendName.value;
        
        // Get random message based on selected language
        const messages = currentLanguage === 'en' ? holiMessagesEn : holiMessagesHi;
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        greetingMessage.textContent = randomMessage;
        
        // Apply template
        const selectedTemplate = templateSelect.value;
        greetingCard.className = "greeting-card";
        greetingCard.classList.add(templates[selectedTemplate].class);
        greetingCard.classList.add('generated');
        
        // Update greeting title based on language
        document.querySelector('.greeting-title').textContent = 
            currentLanguage === 'en' ? 
            templates[selectedTemplate].titleEn : 
            templates[selectedTemplate].titleHi;
        
        // Show share buttons
        shareButtons.classList.remove('hidden');
        
        // Scroll to preview
        document.getElementById('previewSection').scrollIntoView({ behavior: 'smooth' });
        
        // Add confetti animation
        createConfetti();
    });
    
    // Update greeting message based on language
    function updateGreetingMessage() {
        const selectedTemplate = templateSelect.value;
        document.querySelector('.greeting-title').textContent = 
            currentLanguage === 'en' ? 
            templates[selectedTemplate].titleEn : 
            templates[selectedTemplate].titleHi;
            
        // Get random message based on selected language
        const messages = currentLanguage === 'en' ? holiMessagesEn : holiMessagesHi;
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        greetingMessage.textContent = randomMessage;
    }
    
    // Download Button
    downloadBtn.addEventListener('click', function() {
        // Show loading indicator
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.innerHTML = '<div class="loader"></div>';
        document.body.appendChild(loading);
        
        // Convert greeting card to image
        html2canvas(greetingCard, {
            allowTaint: true,
            useCORS: true,
            scale: 2
        }).then(function(canvas) {
            // Create download link
            const link = document.createElement('a');
            link.download = 'holi-greeting-card.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            // Remove loading indicator
            document.body.removeChild(loading);
        }).catch(function(error) {
            console.error('Error generating image:', error);
            
            // Remove loading indicator
            document.body.removeChild(loading);
            alert(currentLanguage === 'en' ? 
                'Error generating image. Please try again.' : 
                'छवि बनाने में त्रुटि। कृपया पुन: प्रयास करें।');
        });
    });
    
    // Create and save image for sharing
    const generateShareImage = async function() {
        // Show loading indicator
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.innerHTML = '<div class="loader"></div>';
        document.body.appendChild(loading);
        
        try {
            // In a real-world scenario, this would upload to a server
            // For demo purposes, we'll simulate having a server-generated URL
            const canvas = await html2canvas(greetingCard, {
                allowTaint: true,
                useCORS: true,
                scale: 2
            });
            
            // Create a unique ID for the greeting
            const greetingId = Date.now().toString(36) + Math.random().toString(36).substr(2);
            
            // In production, this would be a real upload process
            // Simulate server response with a unique URL
            const imageUrl = websiteBaseUrl + "shared/" + greetingId;
            
            // Remove loading indicator
            document.body.removeChild(loading);
            
            return {
                imageUrl: imageUrl,
                greetingId: greetingId
            };
        } catch (error) {
            console.error('Error generating share image:', error);
            // Remove loading indicator
            document.body.removeChild(loading);
            throw error;
        }
    };
    
    // Social Media Sharing with actual image data
    whatsappShare.addEventListener('click', async function() {
        try {
            const shareData = await generateShareImage();
            
            // Create sharing URL with image URL and website link
            const text = encodeURIComponent(`${currentLanguage === 'en' ? 'Happy Holi from' : 'होली की हार्दिक शुभकामनाएं'} ${userName.value}! ${currentLanguage === 'en' ? 'Check out my personalized Holi greeting' : 'मेरी व्यक्तिगत होली की शुभकामनाएँ देखें'}: `);
            const shareUrl = `https://api.whatsapp.com/send?text=${text} ${encodeURIComponent(shareData.imageUrl)}`;
            
            // Open sharing window
            window.open(shareUrl, '_blank');
        } catch (error) {
            console.error('Error sharing to WhatsApp:', error);
            alert(currentLanguage === 'en' ? 
                'Error sharing to WhatsApp. Please try again.' : 
                'व्हाट्सएप पर साझा करने में त्रुटि। कृपया पुन: प्रयास करें।');
        }
    });
    
    facebookShare.addEventListener('click', async function() {
        try {
            const shareData = await generateShareImage();
            
            // Facebook sharing requires Open Graph meta tags
            // In a real app, you'd have a server endpoint to handle Facebook sharing properly
            const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.imageUrl)}`;
            window.open(shareUrl, '_blank');
        } catch (error) {
            console.error('Error sharing to Facebook:', error);
            alert(currentLanguage === 'en' ? 
                'Error sharing to Facebook. Please try again.' : 
                'फेसबुक पर साझा करने में त्रुटि। कृपया पुन: प्रयास करें।');
        }
    });
    
    twitterShare.addEventListener('click', async function() {
        try {
            const shareData = await generateShareImage();
            
            // Create Twitter sharing URL with image URL and website link
            const text = encodeURIComponent(`${currentLanguage === 'en' ? 'Happy Holi from' : 'होली की हार्दिक शुभकामनाएं'} ${userName.value}! ${currentLanguage === 'en' ? 'Check out my personalized Holi greeting' : 'मेरी व्यक्तिगत होली की शुभकामनाएँ देखें'}. #HappyHoli #FestivalOfColors`);
            const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareData.imageUrl)}`;
            
            window.open(shareUrl, '_blank');
        } catch (error) {
            console.error('Error sharing to Twitter:', error);
            alert(currentLanguage === 'en' ? 
                'Error sharing to Twitter. Please try again.' : 
                'ट्विटर पर साझा करने में त्रुटि। कृपया पुन: प्रयास करें।');
        }
    });
    
    // Generate colorful confetti
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);
        
        const colors = [
            '#FF9933', // Saffron
            '#FFFFFF', // White
            '#138808', // Green
            '#FF5722', // Deep Orange
            '#FFC107', // Yellow
            '#9C27B0'  // Purple
        ];
        
        // Create 100 confetti pieces
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // Random position
                confetti.style.left = Math.random() * 100 + 'vw';
                
                // Random size
                const size = Math.random() * 10 + 5 + 'px';
                confetti.style.width = size;
                confetti.style.height = size;
                
                // Random color
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                // Random shape
                const shapes = ['circle', 'square', 'triangle'];
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                
                if (shape === 'circle') {
                    confetti.style.borderRadius = '50%';
                } else if (shape === 'triangle') {
                    confetti.style.width = '0';
                    confetti.style.height = '0';
                    confetti.style.backgroundColor = 'transparent';
                    confetti.style.borderLeft = size + ' solid transparent';
                    confetti.style.borderRight = size + ' solid transparent';
                    confetti.style.borderBottom = (parseFloat(size) * 1.5) + 'px solid ' + colors[Math.floor(Math.random() * colors.length)];
                }
                
                // Random animation duration
                confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
                
                // Add to container
                confettiContainer.appendChild(confetti);
                
                // Remove after animation
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
                
            }, i * 50);
        }
        
        // Remove container after all confetti are gone
        setTimeout(() => {
            confettiContainer.remove();
        }, 8000);
    }
    
    // Set current year for copyright
    document.addEventListener('DOMContentLoaded', function() {
        const footerYear = document.querySelector('footer p:first-child');
        if (footerYear) {
            const currentYear = new Date().getFullYear();
            footerYear.textContent = footerYear.textContent.replace('2025', currentYear);
        }
    });
});