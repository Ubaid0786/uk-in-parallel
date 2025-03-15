// Kashmir University (Parallel Universe) Portal
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const resultForm = document.getElementById('result-form');
    const rollNumberInput = document.getElementById('roll-number');
    const checkResultBtn = document.getElementById('check-result-btn');
    const reEvaluationBtn = document.getElementById('re-evaluation-btn');
    const downloadMarksheetBtn = document.getElementById('download-marksheet-btn');
    const resultDisplay = document.getElementById('results-display');
    const resultInfo = document.getElementById('result-info');
    const loadingIndicator = document.getElementById('loading-indicator');
    const quizContainer = null; // Setting to null to prevent errors
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const submitQuizBtn = document.getElementById('submit-quiz');
    const policyPopup = document.getElementById('policy-popup');
    const policyText = document.getElementById('policy-text');
    const closePolicyBtn = document.getElementById('close-policy');
    const errorPopup = document.getElementById('error-popup');
    const errorText = document.getElementById('error-text');
    const closeErrorBtn = document.getElementById('close-error');
    const errorSound = document.getElementById('error-sound');
    const successSound = document.getElementById('success-sound');
    const ambientSound = document.getElementById('ambient-sound');
    const glitchContainer = document.querySelector('.glitch-container');
    const certificateCanvas = document.getElementById('certificate-canvas');
    const trajectoryGraph = document.getElementById('trajectory-graph');
    
    // DOM Elements - New features
    const conspiracyBtn = document.getElementById('conspiracy-btn');
    const fixResultBtn = document.getElementById('fix-result-btn');
    const circularBtn = document.getElementById('circular-btn');
    const conspiracyOutput = document.getElementById('conspiracy-output');
    const conspiracyText = document.getElementById('conspiracy-text');
    const circularPopup = document.getElementById('circular-popup');
    const circularDate = document.getElementById('circular-date');
    const circularRef = document.getElementById('circular-ref');
    const circularSubject = document.getElementById('circular-subject');
    const circularContent = document.getElementById('circular-content');
    const closeCircularBtn = document.getElementById('close-circular');
    const virusPopup = document.getElementById('virus-popup');
    const virusMessage = document.getElementById('virus-message');
    const fakeProgressBar = document.getElementById('fake-progress-bar');
    const closeVirusBtn = document.getElementById('close-virus');

    // State variables
    let currentMarks = 0;
    let selectedOption = null;
    let isProcessing = false;
    let glitchInterval;
    let graphInterval;
    
    // State variables - New ones
    let virusMode = false;
    let virusClones = [];
    let progressInterval;

    // Make key functions accessible globally for inline handlers
    window.showReEvaluationQuiz = showReEvaluationQuiz;
    window.handleDownloadMarksheet = handleDownloadMarksheet;
    window.generateConspiracyTheory = generateConspiracyTheory;
    window.activateFakeVirusMode = activateFakeVirusMode;
    window.showRandomCircular = showRandomCircular;
    window.showPolicyPopup = showPolicyPopup;
    window.closePolicyPopup = closePolicyPopup;
    window.createSnakeGame = createSnakeGame;
    window.handleReEvalOption = handleReEvalOption;
    window.showRoastingAssistant = showRoastingAssistant;
    window.closeRoastingAssistant = closeRoastingAssistant;
    window.sendAssistantQuestion = sendAssistantQuestion;

    // Add a global click event for emergency popup closure
    document.addEventListener('keydown', function(e) {
        // Escape key press
        if (e.key === 'Escape') {
            console.log('Escape key pressed - emergency close');
            // Close all popups
            if (!policyPopup.classList.contains('hidden')) {
                closePolicyPopup();
            }
            if (!errorPopup.classList.contains('hidden')) {
                closeErrorPopup();
            }
            if (!quizContainer.classList.contains('hidden')) {
                quizContainer.classList.add('hidden');
            }
            if (!circularPopup.classList.contains('hidden')) {
                closeCircular();
            }
            if (virusMode) {
                closeVirusMode();
            }
            
            // Close assistant popup
            const assistantPopup = document.getElementById('roast-assistant-popup');
            if (assistantPopup && !assistantPopup.classList.contains('hidden')) {
                console.log('Closing assistant popup via ESC key');
                closeRoastingAssistant();
            }
            
            // FALLBACK: Force close all popups regardless of their state
            console.log('Applying fallback popup closure');
            document.querySelectorAll('.roast-assistant-popup, .error-popup, .policy-popup, .circular-popup, .virus-popup').forEach(popup => {
                popup.classList.add('hidden');
                popup.style.display = 'none';
            });
        }
    });

    // Also add a click event on the policy popup background
    if (policyPopup) {
        policyPopup.addEventListener('click', function(e) {
            // Only close if the actual background (not the content) was clicked
            if (e.target === policyPopup) {
                console.log('Background clicked - closing popup');
                closePolicyPopup();
            }
        });
    }
    
    // Add click event on the assistant popup background
    const assistantPopup = document.getElementById('roast-assistant-popup');
    if (assistantPopup) {
        assistantPopup.addEventListener('click', function(e) {
            // Only close if the actual background (not the content) was clicked
            if (e.target === assistantPopup) {
                console.log('Background clicked - closing assistant popup');
                closeRoastingAssistant();
            }
        });
    }
    
    // Also add a direct event listener to the assistant close button
    const closeAssistantBtn = document.getElementById('close-assistant');
    if (closeAssistantBtn) {
        closeAssistantBtn.addEventListener('click', function(e) {
            console.log('Close assistant button clicked');
            e.preventDefault();
            closeRoastingAssistant();
        });
    }
    
    // Initialize the portal
    init();

    function init() {
        console.log('Initializing Kashmir University portal...');
        
        // Check if all DOM elements are properly loaded
        if (!resultForm) console.error('resultForm not found');
        if (!checkResultBtn) console.error('checkResultBtn not found');
        if (!resultDisplay) console.error('resultDisplay not found');
        
        // Set up form submission handler directly on the form
        if (resultForm) {
            console.log('Setting up form submission handler');
            // Use only one method for form submission handling to avoid duplication
            resultForm.addEventListener('submit', function(e) {
                console.log('Form submit event triggered');
                handleFormSubmit(e);
            });
        }
        
        // Set up remaining event listeners
        if (reEvaluationBtn) reEvaluationBtn.addEventListener('click', showReEvaluationQuiz);
        if (downloadMarksheetBtn) downloadMarksheetBtn.addEventListener('click', handleDownloadMarksheet);
        if (submitQuizBtn) submitQuizBtn.addEventListener('click', handleQuizSubmit);
        if (closePolicyBtn) closePolicyBtn.addEventListener('click', closePolicyPopup);
        if (closeErrorBtn) closeErrorBtn.addEventListener('click', closeErrorPopup);
        if (rollNumberInput) rollNumberInput.addEventListener('input', triggerRandomGlitch);

        // Set up new event listeners
        if (conspiracyBtn) conspiracyBtn.addEventListener('click', generateConspiracyTheory);
        if (fixResultBtn) fixResultBtn.addEventListener('click', activateFakeVirusMode);
        if (circularBtn) circularBtn.addEventListener('click', showRandomCircular);
        if (closeCircularBtn) closeCircularBtn.addEventListener('click', closeCircular);
        if (closeVirusBtn) closeVirusBtn.addEventListener('click', closeVirusMode);
        
        // Initialize floating assistant icon
        initFloatingAssistant();
        
        // Setup random policy popups
        setupRandomPolicyPopups();
        
        // Setup trajectory graph
        setupTrajectoryGraph();
        
        // Start ambient sound on first user interaction
        document.body.addEventListener('click', function() {
            if (ambientSound && ambientSound.paused) {
                ambientSound.volume = 0.2;
                ambientSound.play().catch(e => console.log('Audio playback prevented:', e));
            }
        }, { once: true });
        
        // Setup randomly occurring glitches
        setupRandomGlitches();
        
        // Add visual effects
        initializeVisualEffects();
        
        // Remove any floating elements that might exist
        document.querySelectorAll('.floating-element').forEach(el => {
            if (document.body.contains(el)) {
                document.body.removeChild(el);
            }
        });
        
        // Remove any teacher comment stickers
        removeTeacherComments();
        
        console.log('Kashmir University portal initialization complete');
    }

    // Initialize the floating assistant icon with dynamic effects
    function initFloatingAssistant() {
        const floatingAssistant = document.getElementById('floating-assistant');
        if (!floatingAssistant) {
            console.error('Floating assistant element not found');
            return;
        }
        
        // Add random movements to the floating assistant
        setInterval(() => {
            // Get current position
            const currentBottom = parseInt(window.getComputedStyle(floatingAssistant).bottom);
            const currentRight = parseInt(window.getComputedStyle(floatingAssistant).right);
            
            // Move slightly in a random direction
            const newBottom = currentBottom + (Math.random() * 10 - 5);
            const newRight = currentRight + (Math.random() * 10 - 5);
            
            // Apply new position but keep within boundaries
            floatingAssistant.style.bottom = `${Math.max(20, Math.min(40, newBottom))}px`;
            floatingAssistant.style.right = `${Math.max(20, Math.min(40, newRight))}px`;
        }, 3000);
        
        // Add random color effects
        setInterval(() => {
            const iconContainer = floatingAssistant.querySelector('.assistant-icon-container');
            if (iconContainer) {
                const hue1 = Math.floor(Math.random() * 360);
                const hue2 = (hue1 + 180) % 360; // Complementary color
                iconContainer.style.background = `linear-gradient(135deg, hsl(${hue1}, 100%, 30%), hsl(${hue2}, 100%, 40%))`;
            }
        }, 5000);
        
        // Add random emoji changes
        const emojis = ['🤖', '👽', '🧠', '👾', '🔮', '💩', '🤡', '👻', '🙄', '🤔'];
        setInterval(() => {
            const iconBubble = floatingAssistant.querySelector('.assistant-icon-bubble');
            if (iconBubble) {
                iconBubble.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            }
        }, 8000);
        
        // Add click handler
        floatingAssistant.addEventListener('click', function() {
            console.log('Floating assistant clicked');
            showRoastingAssistant();
        });
        
        console.log('Floating assistant initialized');
    }

    // Handle form submission when checking results
    function handleFormSubmit(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        const rollNumber = rollNumberInput.value.trim();
        
        if (!rollNumber) {
            showError('Please enter a Roll Number (even if it doesn\'t exist).');
            return;
        }
        
        showLoading();
        console.log('Loading shown, roll number:', rollNumber);
        
        // Simulate processing delay
        setTimeout(() => {
            generateRandomResult(rollNumber);
            hideLoading();
            playSound(successSound);
            drawCertificate(rollNumber);
            console.log('Results generated and displayed');
        }, getRandomInt(1000, 3000));
    }
    
    // Generate absurd random result
    function generateRandomResult(rollNumber) {
        const absurdResults = [
            `Congratulations! You have secured -${getRandomInt(10, 50)}%.`,
            `You passed before the exam was scheduled.`,
            `Grade: A++++++, but you need to reappear due to 'clerical adjustments'.`,
            `Your attendance was ${getRandomInt(110, 200)}% — you existed in multiple dimensions simultaneously.`,
            `Result: Pending (Will be declared in ${getRandomInt(2029, 2099)}).`,
            `CGPA: √(-1) — Congratulations on achieving the imaginary result.`,
            `You've secured rank #${getRandomInt(0, 3)} from the bottom.`,
            `Your result was eaten by the university's pet goat. Please reapply with feeding charges.`,
            `Result status: Schrödinger's Result (both passed and failed until directly observed).`,
            `Error: your roll number (${rollNumber}) has been solved by a mathematician and determined to be irrational.`
        ];
        
        const absurdDetails = [
            `Subject 1: ${getRandomGrade()} (Papers graded by throwing darts)`,
            `Subject 2: ${getRandomGrade()} (Examiner was on vacation)`,
            `Subject 3: ${getRandomInt(-50, 150)}% (Result imported from parallel dimension)`,
            `Subject 4: VOID (Answer booklet used as napkin)`,
            `Subject 5: PASS**<br><small>** Conditions apply`
        ];
        
        const randomMainResult = absurdResults[Math.floor(Math.random() * absurdResults.length)];
        const numberOfDetails = getRandomInt(3, 6);
        let detailsHtml = '';
        
        for (let i = 0; i < numberOfDetails; i++) {
            const randomIndex = Math.floor(Math.random() * absurdDetails.length);
            detailsHtml += `<p>${absurdDetails[randomIndex]}</p>`;
            // Remove used detail to avoid duplication
            absurdDetails.splice(randomIndex, 1);
            if (absurdDetails.length === 0) break;
        }
        
        // Add random CGPA
        currentMarks = getRandomInt(-10, 110);
        
        const resultHTML = `
            <div class="result-header">
                <h4>Roll Number: ${rollNumber}</h4>
                <h4>Examination: ${getSemesterName()}</h4>
                <h4>Result Date: ${getRandomDate()}</h4>
            </div>
            <div class="result-main">
                <p class="main-result">${randomMainResult}</p>
                <hr>
                <div class="result-details">
                    ${detailsHtml}
                </div>
                <p class="total-marks">Current Percentage: ${currentMarks}%</p>
                <p class="note">Note: This result may change without any reason or notice. Contact the helpdesk that doesn't exist for assistance.</p>
            </div>
        `;
        
        resultInfo.innerHTML = resultHTML;
        resultDisplay.classList.remove('hidden');
    }
    
    // Show re-evaluation without quiz
    function showReEvaluationQuiz() {
        // Create a popup with various re-evaluation options
        const popupHTML = `
            <div id="re-evaluation-popup" class="win98-popup" style="top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; max-width: 600px; z-index: 9999;">
                <div class="win98-popup-header" style="background: linear-gradient(to right, #ff0000, #ff00ff);">
                    <span style="font-size: 18px; text-shadow: 1px 1px 2px black;">🧠 ABSURD RE-EVALUATION SYSTEM 🧠</span>
                    <div class="win98-popup-close" onclick="closeReEvaluationPopup()">×</div>
                </div>
                <div class="win98-popup-body" style="flex-direction: column; background: #000080; color: white;">
                    <div style="text-align: center; margin-bottom: 15px; color: yellow; font-weight: bold; font-size: 16px; text-shadow: 1px 1px 2px black;" class="blink">
                        ⚠️ WARNING: All options guaranteed to make your grades worse! ⚠️
                    </div>
                    <div class="re-eval-option" onclick="handleReEvalOption('check-booklet')">
                        <div class="option-title">📝 Check Your Answer Booklet</div>
                        <div class="option-desc">We'll pretend to look at it again (spoiler: we lost it)</div>
                    </div>
                    <div class="re-eval-option" onclick="handleReEvalOption('apply-recheck')">
                        <div class="option-title">🔎 Apply for Recheck</div>
                        <div class="option-desc">Your marks might decrease randomly (they definitely will)</div>
                    </div>
                    <div class="re-eval-option" onclick="handleReEvalOption('play-game')">
                        <div class="option-title">🎮 Play a Game to Pass</div>
                        <div class="option-desc">A rigged game you can never win (we need the failures)</div>
                    </div>
                    <div class="re-eval-option" onclick="handleReEvalOption('bribe')">
                        <div class="option-title">💰 Bribe the Examiner</div>
                        <div class="option-desc">Money not accepted, only crypto and memes (preferably both)</div>
                    </div>
                    <div class="re-eval-option" onclick="handleReEvalOption('plead')">
                        <div class="option-title">🙏 Plead Your Case</div>
                        <div class="option-desc">Your tragic story will be rated on a scale of 1-10 (we love drama)</div>
                    </div>
                    <div class="re-eval-option" onclick="handleReEvalOption('supernatural')">
                        <div class="option-title">👻 Supernatural Intervention</div>
                        <div class="option-desc">Have ghosts of failed students evaluate your paper</div>
                    </div>
                    <div class="re-eval-option" onclick="handleReEvalOption('time-travel')">
                        <div class="option-title">⏰ Time Travel Option</div>
                        <div class="option-desc">Go back in time and attend classes (might create paradox)</div>
                    </div>
                    <div class="re-eval-option" onclick="handleReEvalOption('sacrifice')">
                        <div class="option-title">🔮 Ritual Sacrifice</div>
                        <div class="option-desc">Sacrifice your other courses to pass this one</div>
                    </div>
                    <div class="re-eval-option" onclick="handleReEvalOption('random')">
                        <div class="option-title">🎲 Random Mark Generator</div>
                        <div class="option-desc">Let fate decide your academic future (hint: fate hates you)</div>
                    </div>
                </div>
            </div>
        `;
        
        // Add CSS for the re-evaluation options
        const styleElement = document.createElement('style');
        styleElement.id = 're-eval-styles';
        styleElement.textContent = `
            .re-eval-option {
                padding: 10px 15px;
                margin-bottom: 12px;
                border: 2px outset #ff00ff;
                background: linear-gradient(to right, #000080, #4b0082);
                cursor: pointer;
                transition: all 0.2s;
                border-radius: 5px;
                animation: pulse 2s infinite alternate;
            }
            .re-eval-option:hover {
                background: linear-gradient(to right, #4b0082, #9400d3);
                transform: scale(1.03) rotate(-1deg);
                box-shadow: 0 0 15px rgba(255, 0, 255, 0.7);
            }
            .re-eval-option:active {
                border-style: inset;
                transform: scale(0.98);
            }
            .option-title {
                font-weight: bold;
                margin-bottom: 5px;
                color: #00ffff;
                font-size: 16px;
            }
            .option-desc {
                font-size: 13px;
                color: #ffff00;
                font-style: italic;
            }
            @keyframes pulse-option {
                0% { box-shadow: 0 0 5px rgba(255, 0, 255, 0.5); }
                100% { box-shadow: 0 0 15px rgba(255, 0, 255, 0.8); }
            }
        `;
        document.head.appendChild(styleElement);
        
        // Create the popup
        const popupElement = document.createElement('div');
        popupElement.innerHTML = popupHTML;
        document.body.appendChild(popupElement.firstElementChild);
        
        // Play glitch effects
        triggerRandomGlitch();
        setTimeout(triggerRandomGlitch, 500);
    }

    // Handle closing the re-evaluation popup
    function closeReEvaluationPopup() {
        const popup = document.getElementById('re-evaluation-popup');
        if (popup) {
            document.body.removeChild(popup);
        }
        
        // Remove the styles
        const styles = document.getElementById('re-eval-styles');
        if (styles) {
            document.head.removeChild(styles);
        }
    }

    // Handle re-evaluation option selection
    function handleReEvalOption(option) {
        // Close the popup immediately when an option is clicked
        closeReEvaluationPopup();

        // Show an immediate funny response
        const immediateFunnyResponses = {
            'check-booklet': "Looking for your answer booklet... have you seen it anywhere?",
            'apply-recheck': "Initiating recheck protocol... finding new ways to deduct marks...",
            'play-game': "Loading rigged game... prepare to lose spectacularly!",
            'bribe': "Processing bribe... checking if we can take more...",
            'plead': "Analyzing sob story... calculating sympathy coefficient...",
            'supernatural': "Contacting the spirit world... ghosts are laughing already...",
            'time-travel': "Initializing time machine... destination: academic failure...",
            'sacrifice': "Preparing ritual materials... what are you willing to give up?",
            'random': "Spinning the wheel of misfortune... calculating your doom..."
        };

        // Create a temporary message overlay
        const messageOverlay = document.createElement('div');
        messageOverlay.style.position = 'fixed';
        messageOverlay.style.top = '50%';
        messageOverlay.style.left = '50%';
        messageOverlay.style.transform = 'translate(-50%, -50%)';
        messageOverlay.style.background = 'rgba(0, 0, 0, 0.8)';
        messageOverlay.style.color = '#00ffff';
        messageOverlay.style.padding = '20px 30px';
        messageOverlay.style.borderRadius = '10px';
        messageOverlay.style.fontSize = '24px';
        messageOverlay.style.fontWeight = 'bold';
        messageOverlay.style.zIndex = '99999';
        messageOverlay.style.textAlign = 'center';
        messageOverlay.style.boxShadow = '0 0 20px rgba(255, 0, 255, 0.7)';
        messageOverlay.innerHTML = immediateFunnyResponses[option] || "Processing absurd request...";
        document.body.appendChild(messageOverlay);
        
        // Show loading effect after a short delay
        setTimeout(() => {
            document.body.removeChild(messageOverlay);
            showLoading();
            
            // Play some glitch effects
            triggerRandomGlitch();
            setTimeout(triggerRandomGlitch, 500);
            setTimeout(triggerRandomGlitch, 1000);
            
            // Process the specific option
            processReEvalOption(option);
        }, 2000);
    }

    // Process the selected re-evaluation option
    function processReEvalOption(option) {
        // After a short delay, show the absurd result
        setTimeout(() => {
            hideLoading();
            
            let responseMessage = "";
            
            switch (option) {
                case 'check-booklet':
                    const bookletMessages = [
                        "We found your answer booklet being used as a napkin in the faculty cafeteria.",
                        "Your handwriting is so bad that our AI mistook it for an ancient alien language.",
                        "Surprise! Your booklet was completely blank. Did you use invisible ink?",
                        "We compared your answers to a toddler's drawing. The toddler scored higher.",
                        "TECHNICAL ERROR: Your booklet was accidentally shredded during our thorough review."
                    ];
                    responseMessage = bookletMessages[Math.floor(Math.random() * bookletMessages.length)];
                    break;
                    
                case 'apply-recheck':
                    const recheckMessages = [
                        "After recheck, your marks have been updated from " + getRandomInt(20, 40) + " to " + getRandomInt(10, 19) + ". Congratulations!",
                        "RECHECK COMPLETE: We found some marks you didn't deserve. Your new score is negative " + getRandomInt(1, 50) + ".",
                        "Our advanced AI rechecked your paper and started crying. Please collect AI therapy charges from office.",
                        "During recheck we discovered you accidentally answered questions from a different course. Your degree is now in Underwater Basket Weaving.",
                        "GOOD NEWS: Recheck completed! BAD NEWS: We found 17 more mistakes you made."
                    ];
                    responseMessage = recheckMessages[Math.floor(Math.random() * recheckMessages.length)];
                    break;
                    
                case 'play-game':
                    createSnakeGame();
                    return; // Game will handle its own response
                    
                case 'bribe':
                    const bribeMessages = [
                        "Your bribe was insufficient. Please try again with at least 50 more DogeCoin.",
                        "Bribe accepted, but inflation has decreased its value to zero.",
                        "The examiner was allergic to your meme. Deducting 10 more points as medical compensation.",
                        "Your bribe has been donated to the 'Help an Examiner Buy a Yacht' fund. No refunds.",
                        "TRANSACTION FAILED: Your meme wasn't dank enough."
                    ];
                    responseMessage = bribeMessages[Math.floor(Math.random() * bribeMessages.length)];
                    break;
                    
                case 'plead':
                    const rating = getRandomInt(1, 10);
                    const pleadMessages = [
                        `Your sob story rated ${rating}/10. Not tearful enough for a passing grade.`,
                        `The committee laughed at your tragic story. That's worth ${rating} sympathy points, which convert to exactly 0 real points.`,
                        `Your pleas have been recorded and will be used in our upcoming podcast "Students Say the Darndest Things."`,
                        `Emotional appeal rated ${rating}/10. Unfortunately, we only accept ratings of 11 or higher.`,
                        `Your story will be published in our "Creative Fiction" journal. Still failing though.`
                    ];
                    responseMessage = pleadMessages[Math.floor(Math.random() * pleadMessages.length)];
                    break;
                    
                case 'supernatural':
                    const supernaturalMessages = [
                        "The ghosts of failed students have reviewed your paper and are now laughing hysterically in the afterlife.",
                        "SUPERNATURAL INTERVENTION RESULTS: The spirits recommend you change your major to Ghost Communication Studies.",
                        "After a séance with your professors from parallel dimensions, they all agree: you're failing in every reality.",
                        "The Ouija board spelled out your new grade: W-T-F.",
                        "We consulted with a psychic who said your academic aura is 'the color of disappointment.'"
                    ];
                    responseMessage = supernaturalMessages[Math.floor(Math.random() * supernaturalMessages.length)];
                    break;
                    
                case 'time-travel':
                    const timeTravelMessages = [
                        "TIME PARADOX DETECTED: You went back in time but still didn't attend any classes.",
                        "You've been sent back in time, but accidentally enrolled in Prehistoric Basket Weaving instead.",
                        "Future You from 10 years later says you still haven't passed this course.",
                        "Time travel approved! Your new deadline for assignment submission: Yesterday.",
                        "ERROR: Time machine returned you to present day with even worse grades than before."
                    ];
                    responseMessage = timeTravelMessages[Math.floor(Math.random() * timeTravelMessages.length)];
                    break;
                    
                case 'sacrifice':
                    const sacrificeMessages = [
                        "SACRIFICE ACCEPTED: All your other courses are now failed to give you a D- in this one. Congratulations?",
                        "The academic gods have rejected your sacrifice. They demand more student loans.",
                        "You've successfully sacrificed your social life, sleep schedule, and mental health. Your grade remains unchanged.",
                        "RITUAL COMPLETE: Your GPA has been redistributed equally among all courses, resulting in straight F+s.",
                        "The ritual backfired! Your professor now gets your intelligence and you get their arthritis."
                    ];
                    responseMessage = sacrificeMessages[Math.floor(Math.random() * sacrificeMessages.length)];
                    break;
                    
                case 'random':
                    const newGrade = ['A+++++', 'F-', 'B±', 'C?', 'D...', 'A/F', '∞', 'NULL', 'ERROR', '404', 'LOL', 'OMG', 'WTF', '¯\\_(ツ)_/¯', '🤦‍♂️'][Math.floor(Math.random() * 15)];
                    responseMessage = `The random mark generator has spoken! Your new grade is: ${newGrade}`;
                    break;
                    
                default:
                    responseMessage = "Error 404: Education not found. Please retry after system reboot.";
            }
            
            // Show the result as an error popup
            showError(responseMessage);
            
            // Update student record with random achievements
            const studentRollNumber = document.getElementById('roll-number').value || 'Unknown';
            console.log(`Updated student record for ${studentRollNumber} with absurd achievements`);
            
            // 50% chance to also show a policy popup after 3 seconds
            if (Math.random() < 0.5) {
                setTimeout(showPolicyPopup, 3000);
            }
            
        }, 2000);
    }
    
    // Handle quiz submission (the rigged re-evaluation)
    function handleQuizSubmit() {
        if (!selectedOption) {
            showError('Please select an answer first.');
            return;
        }
        
        const isCorrect = selectedOption.dataset.correct === 'true';
        
        // The rigged part: correct answers decrease marks, wrong answers increase marks
        if (isCorrect) {
            const deduction = getRandomInt(5, 25);
            currentMarks -= deduction;
            showError(`Your answer is correct! As per university policy, your marks have been REDUCED by ${deduction}%.`);
        } else {
            const bonus = getRandomInt(5, 15);
            currentMarks += bonus;
            showError(`Your answer is incorrect! Congratulations, you've been awarded a bonus of ${bonus}%.`);
        }
        
        // Update the displayed marks
        const totalMarksElement = document.querySelector('.total-marks');
        if (totalMarksElement) {
            totalMarksElement.textContent = `Current Percentage: ${currentMarks}%`;
        }
        
        quizContainer.classList.add('hidden');
        selectedOption = null;
        
        // Apply random glitch effect
        triggerRandomGlitch();
    }
    
    // Handle marksheet download (which always fails)
    function handleDownloadMarksheet() {
        if (resultDisplay.classList.contains('hidden')) {
            showError('You must check your results first before downloading the marksheet.');
            return;
        }
        
        showLoading();
        
        // Simulate processing delay
        setTimeout(() => {
            hideLoading();
            
            const randomErrors = [
                "Error 404: Marksheet not found. Did it ever exist?",
                "Download failed: Printer ran out of virtual ink.",
                "Error: Marksheet temporarily held hostage by the university's digital goat.",
                "Unable to download: Marksheet file corrupted by excessive absurdity.",
                "Download cancelled: Your marksheet would violate the laws of physics.",
                "Error 403: Access forbidden. Your browser isn't confused enough to view this marksheet.",
                "Download server on lunch break. Try again when the universe is more cooperative.",
                "Marksheet unavailable: Currently being used as digital toilet paper."
            ];
            
            const randomError = randomErrors[Math.floor(Math.random() * randomErrors.length)];
            showError(randomError);
            playSound(errorSound);
        }, getRandomInt(3000, 8000));
    }
    
    // Show loading indicator
    function showLoading() {
        loadingIndicator.classList.remove('hidden');
        isProcessing = true;
    }
    
    // Hide loading indicator
    function hideLoading() {
        loadingIndicator.classList.add('hidden');
        isProcessing = false;
    }
    
    // Show policy popup with random university rules
    function showPolicyPopup() {
        if (isProcessing) return;
        
        const policies = [
            "Students with roll numbers ending in 7 are required to submit a 'Thank You' letter for receiving their grades.",
            "All exams will now be conducted via Morse code signals.",
            "Students who attempt re-evaluation may lose their original marks—Allah Hafiz!",
            "NEW RULE: Wearing blue on Tuesdays increases your marks by 3%, but only if it's raining.",
            "Students are now required to whisper their roll numbers to the computer screen before checking results.",
            "Due to high demand, all failing grades have been temporarily replaced with 'Better Luck Next Semester'.",
            "Effective immediately: All 'A' grades will be given only to students whose names contain at least 3 vowels.",
            "To reduce server load, results will only be available during full moons and solar eclipses.",
            "NEW POLICY: Those who were born on odd-numbered dates must submit assignments upside-down.",
            "URGENT: All previous results have been declared 'advisory only' and may or may not reflect reality."
        ];
        
        // Set a default policy in case of issues
        if (!policyText) {
            console.error('Policy text element not found');
            return;
        }
        
        // Make sure we have a policy popup element
        if (!policyPopup) {
            console.error('Policy popup element not found');
            return;
        }
        
        // Choose a random policy and display it
        const randomPolicy = policies[Math.floor(Math.random() * policies.length)];
        policyText.textContent = randomPolicy;
        
        // Make sure the popup is visible
        policyPopup.classList.remove('hidden');
        policyPopup.style.display = 'block';
        
        // Log for debugging
        console.log('Policy popup shown with text:', randomPolicy);
        
        // Play sound (function has been modified to be silent)
        playSound(null);
    }
    
    // Close policy popup
    function closePolicyPopup() {
        console.log('Closing policy popup');
        if (policyPopup) {
            policyPopup.classList.add('hidden');
            console.log('Policy popup hidden');
        } else {
            console.log('Policy popup element not found');
        }
    }
    
    // Show error popup with Windows XP style
    function showError(message) {
        errorText.textContent = message;
        errorPopup.classList.remove('hidden');
        playSound(errorSound);
    }
    
    // Close error popup
    function closeErrorPopup() {
        errorPopup.classList.add('hidden');
    }
    
    // Setup random policy popups
    function setupRandomPolicyPopups() {
        setInterval(() => {
            if (Math.random() < 0.3 && !isProcessing && policyPopup.classList.contains('hidden')) {
                showPolicyPopup();
            }
        }, 30000); // Check every 30 seconds
        
        // Show first policy after 15 seconds
        setTimeout(() => {
            showPolicyPopup();
        }, 15000);
    }
    
    // Setup trajectory graph that randomly fluctuates
    function setupTrajectoryGraph() {
        const ctx = trajectoryGraph.getContext('2d');
        const width = trajectoryGraph.width;
        const height = trajectoryGraph.height;
        const pointCount = 10;
        const points = [];
        
        // Initialize with random points
        for (let i = 0; i < pointCount; i++) {
            points.push({
                x: (width / pointCount) * i,
                y: getRandomInt(height * 0.2, height * 0.8)
            });
        }
        
        function drawGraph() {
            ctx.clearRect(0, 0, width, height);
            
            // Draw background grid
            ctx.strokeStyle = '#333333';
            ctx.lineWidth = 0.5;
            
            // Vertical grid lines
            for (let x = 0; x <= width; x += 50) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            
            // Horizontal grid lines
            for (let y = 0; y <= height; y += 30) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
            
            // Draw labels
            ctx.fillStyle = '#ffff00';
            ctx.font = '10px Comic Sans MS';
            ctx.fillText('ACADEMIC PROWESS', 10, 15);
            ctx.fillText('TIME →', width - 50, height - 10);
            ctx.fillText('↑', 5, height / 2 - 30);
            ctx.fillText('PERFORMANCE', 5, height / 2 - 15);
            ctx.fillText('↓', 5, height / 2 + 20);
            
            // Draw fluctuating line
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            
            for (let i = 1; i < pointCount; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // Draw points
            for (let i = 0; i < pointCount; i++) {
                ctx.beginPath();
                ctx.arc(points[i].x, points[i].y, 5, 0, Math.PI * 2);
                ctx.fillStyle = '#ff00ff';
                ctx.fill();
            }
            
            // Add "YOU ARE HERE" pointer at random position
            const randomIndex = Math.floor(Math.random() * pointCount);
            const point = points[randomIndex];
            
            ctx.beginPath();
            ctx.moveTo(point.x, point.y - 15);
            ctx.lineTo(point.x - 5, point.y - 25);
            ctx.lineTo(point.x + 5, point.y - 25);
            ctx.fillStyle = '#ff0000';
            ctx.fill();
            
            ctx.fillStyle = '#ffffff';
            ctx.font = '10px Comic Sans MS';
            ctx.fillText('YOU ARE HERE', point.x - 40, point.y - 30);
        }
        
        function updateGraph() {
            // Update positions randomly
            for (let i = 0; i < pointCount; i++) {
                points[i].y += (Math.random() - 0.5) * 20;
                
                // Keep within bounds
                if (points[i].y < height * 0.1) points[i].y = height * 0.1;
                if (points[i].y > height * 0.9) points[i].y = height * 0.9;
            }
            
            drawGraph();
        }
        
        // Initial draw
        drawGraph();
        
        // Update every second
        graphInterval = setInterval(updateGraph, 1000);
    }
    
    // Draw certificate with mock stamp and signatures
    function drawCertificate(rollNumber) {
        const ctx = certificateCanvas.getContext('2d');
        const width = certificateCanvas.width;
        const height = certificateCanvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        // Background
        ctx.fillStyle = '#f9f2d6';
        ctx.fillRect(0, 0, width, height);
        
        // Border
        ctx.strokeStyle = '#aa8855';
        ctx.lineWidth = 10;
        ctx.strokeRect(10, 10, width - 20, height - 20);
        
        // Inner border
        ctx.strokeStyle = '#cc9966';
        ctx.lineWidth = 2;
        ctx.strokeRect(25, 25, width - 50, height - 50);
        
        // University name
        ctx.fillStyle = '#000080';
        ctx.font = 'bold 24px Comic Sans MS';
        ctx.textAlign = 'center';
        ctx.fillText('KASHMIR UNIVERSITY*', width / 2, 60);
        
        ctx.font = 'italic 14px Comic Sans MS';
        ctx.fillText('(*Parallel Universe Edition)', width / 2, 80);
        
        // Certificate content
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 18px Comic Sans MS';
        ctx.fillText('CERTIFICATE OF CONFUSION', width / 2, 120);
        
        ctx.font = '14px Comic Sans MS';
        ctx.fillText(`This is to certify that Roll No. ${rollNumber}`, width / 2, 160);
        ctx.fillText(`has achieved the impossible score of ${currentMarks}%`, width / 2, 180);
        ctx.fillText(`in the ${getSemesterName()}`, width / 2, 200);
        
        // Date
        ctx.textAlign = 'left';
        ctx.font = '12px Comic Sans MS';
        ctx.fillText(`Date: ${getRandomDate()}`, 50, height - 50);
        
        // Registrar signature (a scribble)
        ctx.textAlign = 'right';
        ctx.fillText('Registrar', width - 50, height - 50);
        
        ctx.beginPath();
        const sigX = width - 80;
        const sigY = height - 65;
        ctx.moveTo(sigX, sigY);
        ctx.bezierCurveTo(sigX + 10, sigY - 10, sigX + 30, sigY + 10, sigX + 40, sigY - 5);
        ctx.bezierCurveTo(sigX + 50, sigY - 15, sigX + 70, sigY, sigX + 60, sigY + 10);
        ctx.strokeStyle = '#0000ff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // University Stamp (just a scribbled circle)
        ctx.beginPath();
        ctx.arc(width / 2, height - 80, 40, 0, Math.PI * 2);
        ctx.strokeStyle = '#880000';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // "APPROVED" text inside stamp
        ctx.save();
        ctx.translate(width / 2, height - 80);
        ctx.rotate(-Math.PI / 8);
        ctx.textAlign = 'center';
        ctx.font = 'bold 14px Comic Sans MS';
        ctx.fillStyle = '#880000';
        ctx.fillText('APPROVED*', 0, 5);
        ctx.restore();
        
        // Asterisk note
        ctx.textAlign = 'center';
        ctx.font = 'italic 10px Comic Sans MS';
        ctx.fillStyle = '#555555';
        ctx.fillText('*Approval may be revoked at any time for no reason whatsoever', width / 2, height - 20);
        
        // Add a watermark
        ctx.globalAlpha = 0.2;
        ctx.font = 'bold 40px Comic Sans MS';
        ctx.fillStyle = '#ff00ff';
        ctx.textAlign = 'center';
        ctx.translate(width/2, height/2);
        ctx.rotate(-Math.PI/4);
        ctx.fillText('TOTALLY LEGIT', 0, 0);
        ctx.rotate(Math.PI/4);
        ctx.translate(-width/2, -height/2);
        ctx.globalAlpha = 1.0;
        
        // Add some random doodles
        ctx.strokeStyle = '#880000';
        ctx.lineWidth = 1;
        
        // Draw 3-5 random doodles
        for (let i = 0; i < 3 + Math.floor(Math.random() * 3); i++) {
            ctx.beginPath();
            const startX = Math.random() * width;
            const startY = Math.random() * height;
            ctx.moveTo(startX, startY);
            
            // Create a random squiggle
            for (let j = 0; j < 5; j++) {
                const cpX1 = startX + (Math.random() * 100 - 50);
                const cpY1 = startY + (Math.random() * 100 - 50);
                const cpX2 = startX + (Math.random() * 100 - 50);
                const cpY2 = startY + (Math.random() * 100 - 50);
                const endX = startX + (Math.random() * 100 - 50);
                const endY = startY + (Math.random() * 100 - 50);
                ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, endX, endY);
            }
            
            ctx.stroke();
        }
    }
    
    // Setup random glitches
    function setupRandomGlitches() {
        setInterval(() => {
            if (Math.random() < 0.1) {
                triggerRandomGlitch();
            }
            
            // Also randomly create popups
            if (Math.random() < 0.05 && !isProcessing) {
                createRandomPopup();
            }

            // Random screen tilt
            if (Math.random() < 0.02) {
                document.body.style.transform = `rotate(${(Math.random() * 2 - 1)}deg)`;
                setTimeout(() => {
                    document.body.style.transform = 'rotate(0deg)';
                }, 5000);
            }
            
            // Always check for and remove teacher comments
            removeTeacherComments();
        }, 10000); // Check every 10 seconds

        // Also remove teacher comments every 3 seconds to be sure
        setInterval(removeTeacherComments, 3000);

        // Add random Windows 98 popups
        setInterval(function() {
            if (Math.random() < 0.1) {  // 10% chance every interval
                createRandomPopup();
            }
        }, 60000); // Check every minute
        
        // Add random 404 errors when clicking links
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                if (Math.random() < 0.7) {
                    e.preventDefault();
                    showFake404Page();
                }
            });
        });

        // Add old school dial-up connection simulation occasionally
        setTimeout(() => {
            if (Math.random() < 0.3) {
                simulateDialupConnection();
            }
        }, 15000);
    }
    
    // Trigger a random glitch effect
    function triggerRandomGlitch() {
        // Make the glitch container visible and active
        glitchContainer.classList.add('active');
        
        // Remove after a short time
        setTimeout(() => {
            glitchContainer.classList.remove('active');
        }, getRandomInt(100, 500));
        
        // Random chance to play error sound
        if (Math.random() < 0.3) {
            playSound(errorSound);
        }
    }
    
    // Play sound with error handling - modified to be silent since we removed audio elements
    function playSound(soundElement) {
        // Sound functionality removed to prevent timeout errors
        console.log('Sound would play here');
        
        // Update debug status
        const debugStatus = document.getElementById('debug-status');
        if (debugStatus) {
            debugStatus.textContent = 'Action triggered: ' + new Date().toLocaleTimeString();
        }
    }
    
    // Helper function to get a random integer between min and max (inclusive)
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // Helper function to get a random grade
    function getRandomGrade() {
        const grades = ['A+++++', 'F-', 'B±', 'C?', 'D...', 'A/F', '∞', 'NULL', 'ERROR', '404'];
        return grades[Math.floor(Math.random() * grades.length)];
    }
    
    // Helper function to get a random date
    function getRandomDate() {
        const day = getRandomInt(1, 32); // Intentionally including 32 for absurdity
        const month = getRandomInt(1, 13); // Including 13 months because why not
        const year = getRandomInt(2020, 2030);
        return `${day}/${month}/${year}`;
    }
    
    // Helper function to get a random semester name
    function getSemesterName() {
        const semesters = [
            'Seventh Semester (Second Attempt)',
            'Final Semester (Beta Version)',
            'Temporal Mechanics 101',
            'Quantum Semester (May exist or not)',
            'Semester That Shall Not Be Named',
            'Alternative Semester Reality',
            'Semester π',
            'Error 404: Semester Not Found',
            'The Great Semester of Confusion',
            'Between Semester Limbo'
        ];
        return semesters[Math.floor(Math.random() * semesters.length)];
    }

    // New Functions

    // Generate conspiracy theory
    function generateConspiracyTheory() {
        const conspiracyParts = {
            actors: [
                "the university administration", 
                "the secret society of professors", 
                "an underground syndicate of examiners",
                "aliens disguised as faculty members",
                "time-traveling janitors",
                "the quantum computing department",
                "the university's artificial intelligence",
                "ghosts of failed students",
                "interdimensional bureaucrats",
                "the chancellor's pet goldfish"
            ],
            actions: [
                "deliberately manipulated", 
                "accidentally erased", 
                "quantum-entangled",
                "retroactively changed",
                "statistically inverted",
                "existentially questioned",
                "theoretically disproved",
                "metaphysically altered",
                "dimensionally shifted",
                "hypnotically suggested"
            ],
            targets: [
                "your grades", 
                "the grading curve", 
                "the fundamental laws of mathematics",
                "the very concept of academic success",
                "the spacetime continuum around your answer sheet",
                "your academic timeline",
                "the university's collective consciousness",
                "the administrative database",
                "your student identity",
                "reality itself"
            ],
            reasons: [
                "to maintain the university's imaginary reputation", 
                "because Mercury was in retrograde during grading", 
                "to fulfill an ancient prophecy about academic mediocrity",
                "as part of an elaborate sociological experiment",
                "to appease the vengeful spirit of the university founder",
                "because your handwriting triggered a cosmic anomaly",
                "to balance the karmic equations of the universe",
                "as punishment for not bringing samosas to the professor",
                "to test the limits of human despair",
                "because they accidentally used your answer sheet as a napkin"
            ]
        };

        const theory = `EXPOSED: ${getRandomElement(conspiracyParts.actors)} has ${getRandomElement(conspiracyParts.actions)} ${getRandomElement(conspiracyParts.targets)} ${getRandomElement(conspiracyParts.reasons)}. This explains everything about your results!`;
        
        conspiracyText.textContent = theory;
        conspiracyOutput.classList.remove('hidden');
        triggerRandomGlitch();
        playSound(errorSound);
    }

    // Activate fake virus mode
    function activateFakeVirusMode() {
        if (virusMode) return;
        
        virusMode = true;
        
        const virusMessages = [
            "WARNING: University Result Correction Tool has detected 47 critical issues with your result. Starting automatic correction process...",
            "ALERT: Unauthorized access detected. Initiating system-wide mark recalculation procedure...",
            "CRITICAL ERROR: Result inconsistency detected. Attempting emergency grade recovery...",
            "WARNING: Multiple result anomalies found. Initiating automatic re-evaluation protocol...",
            "SYSTEM ALERT: Invalid student record detected. Beginning emergency data reconstruction..."
        ];
        
        virusMessage.textContent = getRandomElement(virusMessages);
        virusPopup.classList.remove('hidden');
        document.body.classList.add('shake');
        playSound(errorSound);
        
        // Start fake progress bar
        let progress = 0;
        progressInterval = setInterval(() => {
            progress += getRandomInt(1, 5);
            if (progress > 100) progress = 100;
            fakeProgressBar.style.width = `${progress}%`;
            
            // When progress reaches 100%, start creating virus clones
            if (progress === 100) {
                clearInterval(progressInterval);
                startVirusClones();
                closeVirusBtn.classList.remove('hidden');
            }
        }, 300);
    }
    
    // Create virus clone popups
    function startVirusClones() {
        const messages = [
            "ERROR: CANNOT STOP PROCESS",
            "WARNING: SYSTEM COMPROMISED",
            "ALERT: DATA CORRUPTION IN PROGRESS",
            "ERROR 0x8007007E: MARKS NOT FOUND",
            "WARNING: STUDENT RECORD DELETED",
            "CRITICAL: RESULT CORRUPTION DETECTED",
            "SYSTEM FAILURE: GRADES LOST FOREVER",
            "ERROR: INFINITE RECURSION IN GRADING ALGORITHM",
            "WARNING: EXISTENTIAL CRISIS DETECTED",
            "FATAL ERROR: UNIVERSITY DATABASE IMPLODING"
        ];
        
        // Create new clone every second
        const cloneInterval = setInterval(() => {
            if (!virusMode) {
                clearInterval(cloneInterval);
                return;
            }
            
            createVirusClone(getRandomElement(messages));
            
            // Random chance to play error sound
            if (Math.random() < 0.3) {
                playSound(errorSound);
            }
            
            // Add glitches and shakes
            triggerRandomGlitch();
            
        }, 800);
    }
    
    // Create a single virus clone popup
    function createVirusClone(message) {
        const clone = document.createElement('div');
        clone.className = 'virus-clone';
        clone.textContent = message;
        
        // Position randomly
        clone.style.top = `${getRandomInt(10, 90)}vh`;
        clone.style.left = `${getRandomInt(10, 90)}vw`;
        
        document.body.appendChild(clone);
        virusClones.push(clone);
        
        // Remove after some time if virus mode is still active
        setTimeout(() => {
            if (virusClones.includes(clone)) {
                clone.remove();
                virusClones = virusClones.filter(c => c !== clone);
            }
        }, getRandomInt(3000, 8000));
    }
    
    // Close virus mode
    function closeVirusMode() {
        virusMode = false;
        virusPopup.classList.add('hidden');
        document.body.classList.remove('shake');
        
        // Remove all virus clones
        virusClones.forEach(clone => clone.remove());
        virusClones = [];
        
        // Clear any intervals
        if (progressInterval) {
            clearInterval(progressInterval);
        }
        
        // Reset progress bar
        fakeProgressBar.style.width = '0%';
        closeVirusBtn.classList.add('hidden');
    }
    
    // Show random university circular
    function showRandomCircular() {
        const circulars = [
            {
                subject: "Postponement of Examinations Due to Temporal Anomaly",
                content: `It is hereby notified to all concerned that due to a recent temporal anomaly detected in the examination hall, all scheduled examinations have been postponed to a date that technically occurred last week. Students who failed to attend these examinations in the past will be marked absent in the future. <br><br>Additionally, all students are advised to prepare for exams that may or may not happen, as the university administration is currently stuck in a time loop and cannot make definitive decisions. <br><br>Students from the Department of Quantum Physics are requested to assist in resolving this issue by next Tuesday, which may occur before today.`
            },
            {
                subject: "Implementation of New Grading System Based on Astrological Signs",
                content: `The University is pleased to announce the implementation of a revolutionary new grading system based entirely on students' astrological signs. <br><br>Effective immediately, the following grade adjustments will apply:<br>- Fire signs (Aries, Leo, Sagittarius): Automatically receive A+ in courses involving debate, but fail in water-related subjects<br>- Earth signs (Taurus, Virgo, Capricorn): Receive exact average of class regardless of performance<br>- Air signs (Gemini, Libra, Aquarius): Grades will fluctuate daily based on wind direction<br>- Water signs (Cancer, Scorpio, Pisces): Grades will be determined by the lunar cycle<br><br>Students unsatisfied with their astrological sign may apply for a sign change by submitting a formal request with appropriate planetary alignment documentation.`
            },
            {
                subject: "Ban on Logical Thinking During Examinations",
                content: `This is to inform all students that the University Academic Council has unanimously voted to ban all forms of logical thinking during examinations. <br><br>Research has shown that logical thinking creates an unfair advantage for students who possess this ability. In the interest of fairness, all students are now required to approach exam questions using only intuition, guesswork, or interpretive dance. <br><br>Students caught using logic, reason, or coherent thought processes will be penalized with immediate grade reduction. The university will be installing special "Logic Detection Helmets" to enforce this policy. <br><br>The administration believes this change will make education more accessible to all types of cognitive processes, including completely absurd ones.`
            },
            {
                subject: "Mandatory Attendance in Dreams",
                content: `It has come to the attention of the university administration that students are using their sleeping hours unproductively. <br><br>Effective immediately, all students are required to attend lectures in their dreams. Dream attendance will be counted toward the 75% attendance requirement for exam eligibility. <br><br>To verify dream attendance, students must submit a detailed dream journal, signed by a qualified dream witness. Students who do not dream about university are advised to take special dream-direction classes offered by the Department of Subconscious Studies. <br><br>Students with dreamless sleep disorders may apply for exemption by submitting their complete brainwave patterns during REM sleep.`
            },
            {
                subject: "New Fee Structure for Imaginary Services",
                content: `The university is proud to announce a new fee structure for various imaginary services that don't actually exist. <br><br>The following fees will be added to all student accounts effective immediately:<br>- Anti-Gravity Walking Fee: ₹2,000 per semester<br>- Telepathic Library Access: ₹3,500 annually<br>- Interdimensional Classroom Maintenance: ₹1,200 per course<br>- Time-Travel Insurance Premium: ₹5,000 (covers past and future semesters simultaneously)<br>- Quantum Uncertainty Fee: Between ₹0 and ₹10,000 (amount determined at time of payment)<br><br>All fees must be paid promptly. Non-payment will result in students being erased from this timeline and relocated to an alternate universe where they did pay.`
            }
        ];
        
        const randomCircular = getRandomElement(circulars);
        
        circularDate.textContent = getRandomDate();
        circularRef.textContent = `${getRandomInt(100, 999)}/CIRC/${getRandomInt(2020, 2030)}`;
        circularSubject.textContent = randomCircular.subject;
        circularContent.innerHTML = randomCircular.content;
        
        circularPopup.classList.remove('hidden');
    }
    
    // Close university circular
    function closeCircular() {
        circularPopup.classList.add('hidden');
    }
    
    // Helper function to get random element from array
    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Add a function to create random Windows-like popups
    function createRandomPopup() {
        if (Math.random() < 0.5) return; // Only show sometimes
        
        const popupMessages = [
            "Due to temporal anomalies, your marks from next semester have affected your current GPA.",
            "NOTICE: The University has decided all students must retake kindergarten for proper crayon technique.",
            "URGENT: All assignments must now include at least one conspiracy theory to be considered complete.",
            "PASSWORD POLICY: Your new password must include interpretive dance moves.",
            "WEATHER ALERT: If it rains during exams, all grades are multiplied by 0.5 for dramatic effect.",
            "SECURITY UPDATE: All student IDs now protected by quantum entanglement. Please think your password.",
            "LOST & FOUND: Someone's motivation was found in the library. Please claim within 24 hours.",
            "COURSE ANNOUNCEMENT: Math textbooks now use emoji instead of numbers for enhanced learning.",
            "CLASSROOM CHANGE: Your next lecture will take place in an alternate dimension. Details to follow.",
            "REMINDER: Tuition fees can now be paid in monopoly money, pocket lint, or existential dread.",
            "SYSTEM UPDATE: Your degree program has been randomized. Congratulations on your new major in Underwater Basket Weaving!",
            "ALERT: The university's AI has become sentient and is now grading papers based on its mood swings.",
            "IMPORTANT: Please remember to blink while staring at your results. Eye strain is not a valid excuse for re-evaluation.",
            "NOTICE: The cafeteria will now serve food that matches your GPA in quality and appeal.",
            "ANNOUNCEMENT: The library's collection of books has been replaced with fortune cookies. Good luck with research!"
        ];
        
        showError(popupMessages[Math.floor(Math.random() * popupMessages.length)]);
    }

    // Initialize visual effects
    function initializeVisualEffects() {
        // Add noise overlay
        const noiseOverlay = document.createElement('div');
        noiseOverlay.className = 'noise-overlay';
        document.body.appendChild(noiseOverlay);
        
        // Add scanline effect
        const scanline = document.createElement('div');
        scanline.className = 'scanline';
        document.body.appendChild(scanline);
        
        // Create starfield effect
        createStarfield();
        
        // Create matrix code effect
        createMatrixEffect();
        
        // Apply rainbow text to random elements
        applyRandomEffects();
        
        // Add Windows 98 popup after some time
        setTimeout(function() {
            createWin98Popup();
        }, 30000 + Math.random() * 30000);
    }

    // Create starfield effect
    function createStarfield() {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars';
        document.body.appendChild(starsContainer);
        
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.width = (Math.random() * 3) + 'px';
            star.style.height = star.style.width;
            star.style.left = (Math.random() * 100) + 'vw';
            star.style.top = (Math.random() * 100) + 'vh';
            star.style.animationDelay = (Math.random() * 5) + 's';
            starsContainer.appendChild(star);
        }
    }

    // Create matrix code effect
    function createMatrixEffect() {
        const matrixContainer = document.createElement('div');
        matrixContainer.className = 'matrix-code';
        document.body.appendChild(matrixContainer);
        
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*!?;:[]{}()<>~`|\\';
        const columnCount = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < columnCount; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = (i * 20) + 'px';
            
            // Random fall duration
            const fallDuration = 10 + Math.random() * 20;
            column.style.setProperty('--fall-duration', fallDuration + 's');
            
            // Generate random characters
            const charCount = Math.floor(30 + Math.random() * 50);
            for (let j = 0; j < charCount; j++) {
                const char = document.createElement('div');
                char.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
                column.appendChild(char);
            }
            
            matrixContainer.appendChild(column);
        }
    }

    // Apply random text effects to elements
    function applyRandomEffects() {
        // Apply to random h2 elements
        document.querySelectorAll('h2').forEach(element => {
            if (Math.random() > 0.5) {
                element.classList.add('rainbow-text');
            }
        });
        
        // Apply to random paragraphs
        document.querySelectorAll('p').forEach(element => {
            const rand = Math.random();
            if (rand < 0.2) {
                element.classList.add('tilt-text');
            } else if (rand < 0.3) {
                element.classList.add('jitter-text');
            }
        });
        
        // Apply to random spans
        document.querySelectorAll('span').forEach(element => {
            if (Math.random() > 0.7) {
                element.classList.add('bounce-element');
            }
        });
    }

    // Create Windows 98-style popup
    function createWin98Popup() {
        const messages = [
            "Your student ID has been detected simultaneously logged in from 15 different locations. This is normal.",
            "WARNING: University database error - your grades may have been replaced with lottery numbers.",
            "SYSTEM UPDATE: All assignments now due retroactively last Tuesday.",
            "NOTICE: The Dean has accidentally deleted all midterm grades. Please resubmit your preferred scores.",
            "ALERT: Cafeteria menu and exam answers have been accidentally swapped.",
            "IMPORTANT: Please reinstall University.exe to fix known stability issues.",
            "UPDATE: Library books now randomly teleport to different shelves for added adventure.",
            "SECURITY: Your password must now contain a hieroglyph, a prime number, and a food item.",
            "SYSTEM: All printers now require you to sing to them before printing.",
            "ERROR: University has run out of zeroes. All zeros replaced with the letter O until further notice."
        ];
        
        const icons = ['⚠️', '❌', '🔔', '💻', '🤔', '📊', '🔄', '⚙️', '📝'];
        
        const popup = document.createElement('div');
        popup.className = 'win98-popup';
        
        // Random position
        popup.style.top = (20 + Math.random() * 50) + '%';
        popup.style.left = (10 + Math.random() * 60) + '%';
        
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        popup.innerHTML = `
            <div class="win98-popup-header">
                <span>Student Portal Message</span>
                <div class="win98-popup-close">X</div>
            </div>
            <div class="win98-popup-body">
                <div class="win98-popup-icon">${randomIcon}</div>
                <div class="win98-popup-content">${randomMessage}</div>
            </div>
            <div class="win98-popup-buttons">
                <button class="win98-button" id="win98-ok">OK</button>
                <button class="win98-button" id="win98-cancel">Cancel</button>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Add event listeners
        const closeBtn = popup.querySelector('.win98-popup-close');
        const okBtn = popup.querySelector('#win98-ok');
        const cancelBtn = popup.querySelector('#win98-cancel');
        
        const closePopup = function() {
            document.body.removeChild(popup);
            
            // Schedule next popup
            setTimeout(function() {
                createWin98Popup();
            }, 45000 + Math.random() * 60000);
            
            // Small chance to create another one immediately
            if (Math.random() < 0.3) {
                setTimeout(function() {
                    createWin98Popup();
                }, 1000 + Math.random() * 2000);
            }
        };
        
        closeBtn.addEventListener('click', closePopup);
        okBtn.addEventListener('click', closePopup);
        cancelBtn.addEventListener('click', function() {
            // 50% chance that cancel button actually does the same thing as OK
            if (Math.random() < 0.5) {
                closePopup();
            } else {
                // Or it might spawn another popup
                createWin98Popup();
                // Randomly change the text of this button
                cancelBtn.textContent = ['Still Cancel', 'Try Again', 'Really?', 'Sure?'][Math.floor(Math.random() * 4)];
            }
        });
        
        // Make draggable (simplified)
        let isDragging = false;
        let offsetX, offsetY;
        
        popup.querySelector('.win98-popup-header').addEventListener('mousedown', function(e) {
            isDragging = true;
            offsetX = e.clientX - popup.getBoundingClientRect().left;
            offsetY = e.clientY - popup.getBoundingClientRect().top;
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                popup.style.left = (e.clientX - offsetX) + 'px';
                popup.style.top = (e.clientY - offsetY) + 'px';
            }
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
    }

    // Show fake 404 page
    function showFake404Page() {
        const container = document.querySelector('.container');
        const originalContent = container.innerHTML;
        
        const errorMessages = [
            "The page you're looking for has dropped out of university.",
            "ERROR 404: Education not found.",
            "This link went on vacation and forgot to come back.",
            "This page exists only in the same dimension as your passing grade.",
            "Page missing! Much like your attendance record.",
            "Content not found. Have you tried bribing the server?",
            "This URL has been detained for violating university policy.",
            "Page has graduated and moved on to better websites.",
            "This link requires higher permissions. Please submit your dignity.",
            "The requested resource failed its exams. Just like you."
        ];
        
        container.innerHTML = `
            <div class="fake-404">
                <h1>404 - Page Not Found</h1>
                <p>${errorMessages[Math.floor(Math.random() * errorMessages.length)]}</p>
                <img src="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>😵</text></svg>" style="width: 100px; height: 100px;">
                <button id="back-from-404">Return to Reality</button>
            </div>
        `;
        
        // Style the 404 page
        const style = document.createElement('style');
        style.textContent = `
            .fake-404 {
                text-align: center;
                padding: 50px 20px;
                color: #ff00ff;
            }
            .fake-404 h1 {
                font-size: 36px;
                margin-bottom: 20px;
            }
            .fake-404 p {
                font-size: 18px;
                margin-bottom: 30px;
                color: #00ffff;
            }
            .fake-404 button {
                padding: 10px 20px;
                background: linear-gradient(to right, #ff00ff, #00ffff);
                color: black;
                border: none;
                cursor: pointer;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
        
        // Add event listener to the button
        document.getElementById('back-from-404').addEventListener('click', function() {
            container.innerHTML = originalContent;
            document.head.removeChild(style);
            init(); // Reinitialize everything
        });
    }

    // Simulate dial-up connection
    function simulateDialupConnection() {
        const dialupContainer = document.createElement('div');
        dialupContainer.className = 'dial-up-animation active';
        dialupContainer.innerHTML = `
            <div class="dial-up-text">Connecting to Kashmir University Portal...</div>
            <div class="dial-up-progress">
                <div class="dial-up-progress-bar" id="dialup-progress"></div>
            </div>
            <div class="dial-up-text" id="dialup-status">Dialing modem...</div>
        `;
        
        document.body.appendChild(dialupContainer);
        
        // Simulate connection progress
        const progressBar = document.getElementById('dialup-progress');
        const statusText = document.getElementById('dialup-status');
        let progress = 0;
        
        const connectionSteps = [
            "Dialing modem...",
            "Connecting to AOL...",
            "Negotiating IP address...",
            "Receiving corrupt packets...",
            "Downloading at 0.3 KB/s...",
            "Bypassing university firewall...",
            "Decrypting student records...",
            "Loading animated GIFs...",
            "Installing unnecessary toolbars...",
            "Initializing broken Java applets...",
            "Optimizing for Netscape Navigator...",
            "Connection successful!"
        ];
        
        const progressInterval = setInterval(() => {
            progress += 1 + Math.random() * 3;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = `${progress}%`;
            
            // Update status text
            const stepIndex = Math.floor((progress / 100) * (connectionSteps.length - 1));
            statusText.textContent = connectionSteps[stepIndex];
            
            // Simulate random connection issues
            if (Math.random() < 0.1) {
                statusText.textContent = "Connection error! Retrying...";
                progress -= 5;
                if (progress < 0) progress = 0;
                triggerRandomGlitch();
            }
            
            if (progress === 100) {
                clearInterval(progressInterval);
                
                setTimeout(() => {
                    dialupContainer.classList.remove('active');
                    setTimeout(() => {
                        document.body.removeChild(dialupContainer);
                    }, 500);
                }, 1500);
            }
        }, 300);
    }

    // Remove any teacher comment stickers from the page
    function removeTeacherComments() {
        document.querySelectorAll('.teacher-comment').forEach(el => {
            if (document.body.contains(el)) {
                document.body.removeChild(el);
            }
        });
    }

    // Add this function to close the game popup
    window.closeGamePopup = function() {
        const gamePopup = document.getElementById('game-popup');
        if (gamePopup) {
            document.body.removeChild(gamePopup);
        }
    };

    // Create the snake game that gets eaten by a mongoose
    function createSnakeGame() {
        const gamePopupHTML = `
            <div id="snake-game-popup" class="win98-popup" style="top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; max-width: 600px; z-index: 10000;">
                <div class="win98-popup-header" style="background: linear-gradient(to right, #00ff00, #008800);">
                    <span>Kashmir University Re-evaluation Snake Game</span>
                    <div class="win98-popup-close" onclick="closeSnakeGame()">×</div>
                </div>
                <div class="win98-popup-body" style="flex-direction: column; background: #000; color: white; padding: 10px;">
                    <div style="text-align: center; margin-bottom: 10px; font-weight: bold; font-size: 18px; color: yellow;">
                        Pass Level 3 to Improve Your Grade!
                    </div>
                    <div style="text-align: center; margin-bottom: 10px;">
                        Use arrow keys to move the snake. Collect apples to grow. Watch out for walls, yourself, and... something else!
                    </div>
                    <div style="position: relative; width: 400px; height: 300px; border: 2px solid #00ff00; margin: 0 auto; background-color: #000;">
                        <canvas id="snake-canvas" width="400" height="300" style="display: block;"></canvas>
                        <div id="game-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: none; justify-content: center; align-items: center; background-color: rgba(0,0,0,0.7); color: white; font-size: 24px; font-weight: bold;">
                            Game Over!
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                        <div style="color: #00ffff;">Score: <span id="game-score">0</span></div>
                        <div style="color: #ff00ff;">Level: <span id="game-level">1</span></div>
                    </div>
                </div>
            </div>
        `;
        
        // Add the game popup to the body
        const gamePopupElement = document.createElement('div');
        gamePopupElement.innerHTML = gamePopupHTML;
        document.body.appendChild(gamePopupElement.firstElementChild);
        
        // Game variables
        let canvas = document.getElementById('snake-canvas');
        let ctx = canvas.getContext('2d');
        let score = 0;
        let level = 1;
        let gameOver = false;
        let gameWon = false;
        let showingQuiz = false;
        
        // Grid settings
        const gridSize = 20;
        const gridWidth = canvas.width / gridSize;
        const gridHeight = canvas.height / gridSize;
        
        // Snake settings
        let snake = [
            {x: 5, y: 5}
        ];
        let direction = 'right';
        let nextDirection = 'right';
        
        // Food settings
        let food = {
            x: Math.floor(Math.random() * gridWidth),
            y: Math.floor(Math.random() * gridHeight)
        };
        
        // Mongoose settings (initially off-screen)
        let mongoose = {
            x: -3,
            y: 5,
            active: false,
            direction: 'right'
        };
        
        // Game speed (milliseconds)
        let gameSpeed = 150;
        
        // Game loop
        let gameInterval;
        
        // Listen for keyboard input
        document.addEventListener('keydown', changeDirection);
        
        // Start the game loop
        resetGame();
        
        // Game functions
        function resetGame() {
            // Reset game state
            snake = [{x: 5, y: 5}];
            direction = 'right';
            nextDirection = 'right';
            score = 0;
            level = 1;
            gameOver = false;
            gameWon = false;
            showingQuiz = false;
            
            // Reset food
            placeFood();
            
            // Reset mongoose
            mongoose = {
                x: -3,
                y: 5,
                active: false,
                direction: 'right'
            };
            
            // Update UI
            document.getElementById('game-score').textContent = score;
            document.getElementById('game-level').textContent = level;
            document.getElementById('game-overlay').style.display = 'none';
            
            // Start game loop
            if (gameInterval) clearInterval(gameInterval);
            gameInterval = setInterval(gameLoop, gameSpeed);
        }
        
        function gameLoop() {
            if (gameOver) return;
            
            moveSnake();
            
            if (level >= 2 && mongoose.active) {
                moveMongoose();
            }
            
            checkCollision();
            
            if (gameOver) {
                if (mongoose.active) {
                    document.getElementById('game-overlay').innerHTML = "You got eaten by a Mongoose!";
                    document.getElementById('game-overlay').style.display = 'flex';
                    
                    // Show quiz after delay
                    setTimeout(() => {
                        showQuiz();
                    }, 2000);
                } else {
                    document.getElementById('game-overlay').innerHTML = "Game Over!";
                    document.getElementById('game-overlay').style.display = 'flex';
                    
                    // Show quiz after delay
                    setTimeout(() => {
                        showQuiz();
                    }, 2000);
                }
                clearInterval(gameInterval);
                return;
            }
            
            if (snake[0].x === food.x && snake[0].y === food.y) {
                // Grow snake
                // Don't remove the tail piece to make it grow
                
                // Update score
                score += 10;
                document.getElementById('game-score').textContent = score;
                
                // Check for level up
                if (score >= level * 50) {
                    levelUp();
                }
                
                // Place new food
                placeFood();
            } else {
                // Remove the tail
                snake.pop();
            }
            
            // Draw everything
            drawGame();
        }
        
        function moveSnake() {
            // Update direction
            direction = nextDirection;
            
            // Create new head
            let newHead = {x: snake[0].x, y: snake[0].y};
            
            // Move the head based on direction
            switch (direction) {
                case 'up':
                    newHead.y--;
                    break;
                case 'down':
                    newHead.y++;
                    break;
                case 'left':
                    newHead.x--;
                    break;
                case 'right':
                    newHead.x++;
                    break;
            }
            
            // Add new head to the beginning of snake array
            snake.unshift(newHead);
        }
        
        function moveMongoose() {
            // Make mongoose follow the snake
            const head = snake[0];
            
            // Determine direction to move
            if (mongoose.x < head.x) {
                mongoose.direction = 'right';
                mongoose.x++;
            } else if (mongoose.x > head.x) {
                mongoose.direction = 'left';
                mongoose.x--;
            } else if (mongoose.y < head.y) {
                mongoose.direction = 'down';
                mongoose.y++;
            } else if (mongoose.y > head.y) {
                mongoose.direction = 'up';
                mongoose.y--;
            }
            
            // On higher levels, mongoose moves faster
            if (level >= 3 && Math.random() < 0.3) {
                moveMongoose(); // Move again in the same frame
            }
        }
        
        function checkCollision() {
            const head = snake[0];
            
            // Check wall collision
            if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
                gameOver = true;
                return;
            }
            
            // Check self collision (skip the head)
            for (let i = 1; i < snake.length; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) {
                    gameOver = true;
                    return;
                }
            }
            
            // Check mongoose collision
            if (mongoose.active) {
                if (head.x === mongoose.x && head.y === mongoose.y) {
                    gameOver = true;
                    return;
                }
                
                // Mongoose can also eat the snake body
                for (let i = 0; i < snake.length; i++) {
                    if (mongoose.x === snake[i].x && mongoose.y === snake[i].y) {
                        gameOver = true;
                        return;
                    }
                }
            }
        }
        
        function levelUp() {
            level++;
            document.getElementById('game-level').textContent = level;
            
            // Activate mongoose on level 2
            if (level === 2) {
                mongoose.active = true;
            }
            
            // Make game faster on each level
            clearInterval(gameInterval);
            gameSpeed = Math.max(50, gameSpeed - 30);
            gameInterval = setInterval(gameLoop, gameSpeed);
            
            // Flash level up message
            const overlay = document.getElementById('game-overlay');
            overlay.innerHTML = `Level ${level}!`;
            overlay.style.display = 'flex';
            
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 1000);
        }
        
        function placeFood() {
            food = {
                x: Math.floor(Math.random() * gridWidth),
                y: Math.floor(Math.random() * gridHeight)
            };
            
            // Make sure food is not on snake
            for (let i = 0; i < snake.length; i++) {
                if (food.x === snake[i].x && food.y === snake[i].y) {
                    placeFood(); // Try again
                    return;
                }
            }
            
            // Make sure food is not on mongoose
            if (mongoose.active && food.x === mongoose.x && food.y === mongoose.y) {
                placeFood(); // Try again
            }
        }
        
        function drawGame() {
            // Clear canvas
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw snake
            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = i === 0 ? '#00ff00' : '#00cc00'; // Bright green for head
                ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize - 1, gridSize - 1);
            }
            
            // Draw food
            ctx.fillStyle = 'red';
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 1, gridSize - 1);
            
            // Draw mongoose if active
            if (mongoose.active) {
                ctx.fillStyle = '#cc9966'; // Brown color for mongoose
                ctx.fillRect(mongoose.x * gridSize, mongoose.y * gridSize, gridSize - 1, gridSize - 1);
                
                // Draw eyes based on direction
                ctx.fillStyle = 'black';
                if (mongoose.direction === 'right') {
                    ctx.fillRect((mongoose.x + 0.7) * gridSize, (mongoose.y + 0.3) * gridSize, 3, 3);
                    ctx.fillRect((mongoose.x + 0.7) * gridSize, (mongoose.y + 0.7) * gridSize, 3, 3);
                } else if (mongoose.direction === 'left') {
                    ctx.fillRect((mongoose.x + 0.2) * gridSize, (mongoose.y + 0.3) * gridSize, 3, 3);
                    ctx.fillRect((mongoose.x + 0.2) * gridSize, (mongoose.y + 0.7) * gridSize, 3, 3);
                } else if (mongoose.direction === 'up') {
                    ctx.fillRect((mongoose.x + 0.3) * gridSize, (mongoose.y + 0.2) * gridSize, 3, 3);
                    ctx.fillRect((mongoose.x + 0.7) * gridSize, (mongoose.y + 0.2) * gridSize, 3, 3);
                } else {
                    ctx.fillRect((mongoose.x + 0.3) * gridSize, (mongoose.y + 0.7) * gridSize, 3, 3);
                    ctx.fillRect((mongoose.x + 0.7) * gridSize, (mongoose.y + 0.7) * gridSize, 3, 3);
                }
            }
        }
        
        function changeDirection(e) {
            // Prevent reverse direction
            if (e.key === 'ArrowUp' && direction !== 'down') {
                nextDirection = 'up';
            } else if (e.key === 'ArrowDown' && direction !== 'up') {
                nextDirection = 'down';
            } else if (e.key === 'ArrowLeft' && direction !== 'right') {
                nextDirection = 'left';
            } else if (e.key === 'ArrowRight' && direction !== 'left') {
                nextDirection = 'right';
            }
        }
        
        function showQuiz() {
            if (showingQuiz) return;
            showingQuiz = true;
            
            // Remove snake game
            const snakePopup = document.getElementById('snake-game-popup');
            if (snakePopup) {
                document.body.removeChild(snakePopup);
            }
            
            // Remove event listener
            document.removeEventListener('keydown', changeDirection);
            
            // Show the quiz
            createRoastingQuiz();
        }
        
        // Make the close function available globally
        window.closeSnakeGame = function() {
            const snakePopup = document.getElementById('snake-game-popup');
            if (snakePopup) {
                document.body.removeChild(snakePopup);
            }
            
            // Remove event listener
            document.removeEventListener('keydown', changeDirection);
            
            // Clear interval
            clearInterval(gameInterval);
            
            // Show failure message
            showError("Game Abandoned! Your Re-evaluation request has been transferred to the 'Never Going to Happen' pile.");
        };
    }

    // Create a roasting quiz after the snake game
    function createRoastingQuiz() {
        const quizQuestions = [
            {
                question: "What's the main reason for your academic failure?",
                options: [
                    { text: "I study too much", correct: true },
                    { text: "My professors hate me", correct: false },
                    { text: "The subjects are too hard", correct: false },
                    { text: "My dog ate my brain cells", correct: false }
                ]
            },
            {
                question: "How many hours did you actually study this semester?",
                options: [
                    { text: "Over 100 hours", correct: true },
                    { text: "What is this 'study' you speak of?", correct: false },
                    { text: "Netflix counts as studying, right?", correct: false },
                    { text: "I was planning to start tomorrow", correct: false }
                ]
            },
            {
                question: "Select the most accurate statement about your attendance:",
                options: [
                    { text: "I attended every single class", correct: true },
                    { text: "The professor wouldn't recognize me in a lineup", correct: false },
                    { text: "I sent my hologram occasionally", correct: false },
                    { text: "Wait, classes were happening?", correct: false }
                ]
            },
            {
                question: "What excuse did you use most when assignments were due?",
                options: [
                    { text: "I never needed excuses because I submitted on time", correct: true },
                    { text: "My grandmother died (for the fifth time this semester)", correct: false },
                    { text: "My laptop crashed right before submission", correct: false },
                    { text: "Time is a social construct", correct: false }
                ]
            },
            {
                question: "How do you prepare for exams?",
                options: [
                    { text: "Consistent study schedule and practice tests", correct: true },
                    { text: "Panic and energy drinks at 3 AM", correct: false },
                    { text: "Pray to the academic gods for mercy", correct: false },
                    { text: "Learn telepathy to read the examiner's mind", correct: false }
                ]
            }
        ];
        
        const allQuizQuestions = [
            {
                question: "What's the main reason for your academic failure?",
                options: [
                    { text: "I study too much", correct: true },
                    { text: "My professors hate me", correct: false },
                    { text: "The subjects are too hard", correct: false },
                    { text: "My dog ate my brain cells", correct: false }
                ]
            },
            {
                question: "How many hours did you actually study this semester?",
                options: [
                    { text: "Over 100 hours", correct: true },
                    { text: "What is this 'study' you speak of?", correct: false },
                    { text: "Netflix counts as studying, right?", correct: false },
                    { text: "I was planning to start tomorrow", correct: false }
                ]
            },
            {
                question: "Select the most accurate statement about your attendance:",
                options: [
                    { text: "I attended every single class", correct: true },
                    { text: "The professor wouldn't recognize me in a lineup", correct: false },
                    { text: "I sent my hologram occasionally", correct: false },
                    { text: "Wait, classes were happening?", correct: false }
                ]
            },
            {
                question: "What excuse did you use most when assignments were due?",
                options: [
                    { text: "I never needed excuses because I submitted on time", correct: true },
                    { text: "My grandmother died (for the fifth time this semester)", correct: false },
                    { text: "My laptop crashed right before submission", correct: false },
                    { text: "Time is a social construct", correct: false }
                ]
            },
            {
                question: "How do you prepare for exams?",
                options: [
                    { text: "Consistent study schedule and practice tests", correct: true },
                    { text: "Panic and energy drinks at 3 AM", correct: false },
                    { text: "Pray to the academic gods for mercy", correct: false },
                    { text: "Learn telepathy to read the examiner's mind", correct: false }
                ]
            },
            {
                question: "What's your favorite place to study in the university?",
                options: [
                    { text: "The library, where it's quiet and has all resources", correct: true },
                    { text: "My bed, where I can simultaneously study and nap", correct: false },
                    { text: "The cafeteria, where I can watch other students instead of studying", correct: false },
                    { text: "Study? I thought I was enrolled for the social experience", correct: false }
                ]
            },
            {
                question: "How do you take notes during lectures?",
                options: [
                    { text: "Detailed, organized notes with color-coding and highlights", correct: true },
                    { text: "Random doodles that vaguely resemble academic content", correct: false },
                    { text: "I let my subconscious absorb information while I scroll through social media", correct: false },
                    { text: "Notes? That's what Wikipedia is for", correct: false }
                ]
            },
            {
                question: "Your professor asks a question in class. What do you do?",
                options: [
                    { text: "Raise my hand and answer confidently with well-researched facts", correct: true },
                    { text: "Suddenly become fascinated with my shoelaces", correct: false },
                    { text: "Look around hoping someone else will answer", correct: false },
                    { text: "Ask if this will be on the exam", correct: false }
                ]
            },
            {
                question: "How do you manage group projects?",
                options: [
                    { text: "I coordinate schedules, assign roles, and ensure everyone contributes equally", correct: true },
                    { text: "I'm the one who disappears until the night before submission", correct: false },
                    { text: "I contribute my name to the project and little else", correct: false },
                    { text: "I convince others to do my part by promising snacks I never bring", correct: false }
                ]
            },
            {
                question: "What's your strategy for remembering complex formulas?",
                options: [
                    { text: "Create mnemonic devices and practice regularly", correct: true },
                    { text: "Write them on my palm and hope the ink doesn't smudge", correct: false },
                    { text: "Take a picture with my phone and pray technology doesn't fail me", correct: false },
                    { text: "Telepathically connect with the student next to me during exams", correct: false }
                ]
            },
            {
                question: "How do you handle deadline pressure?",
                options: [
                    { text: "Plan ahead and finish assignments days before they're due", correct: true },
                    { text: "Set a new world record for words typed per minute at 3 AM", correct: false },
                    { text: "Email the professor a creative story about why I need an extension", correct: false },
                    { text: "Accept failure as inevitable and pre-write my excuse email", correct: false }
                ]
            },
            {
                question: "What's your relationship with the university library?",
                options: [
                    { text: "We're best friends - I know every section and resource available", correct: true },
                    { text: "I've heard rumors of its existence but can't confirm personally", correct: false },
                    { text: "I go there to nap between classes in the quiet corners", correct: false },
                    { text: "I thought that building was a museum?", correct: false }
                ]
            },
            {
                question: "How do you approach required reading materials?",
                options: [
                    { text: "Read everything thoroughly with notes and highlighting", correct: true },
                    { text: "Read the title and improvise from there", correct: false },
                    { text: "Wait for the movie adaptation", correct: false },
                    { text: "Search for summaries online five minutes before class", correct: false }
                ]
            },
            {
                question: "What's your preferred exam preparation strategy?",
                options: [
                    { text: "Create comprehensive study guides and review systematically", correct: true },
                    { text: "Cram the night before with energy drinks and panic", correct: false },
                    { text: "Study the wrong chapters then blame the professor", correct: false },
                    { text: "Develop sudden mysterious illness on exam day", correct: false }
                ]
            },
            {
                question: "How do you contribute to class discussions?",
                options: [
                    { text: "Share thoughtful insights based on careful preparation", correct: true },
                    { text: "Restate what someone else said but with different words", correct: false },
                    { text: "Raise philosophical questions to mask my lack of preparation", correct: false },
                    { text: "Perfect my invisible man impression", correct: false }
                ]
            },
            {
                question: "What's your laptop typically used for during lectures?",
                options: [
                    { text: "Taking detailed notes and following along with the presentation", correct: true },
                    { text: "Online shopping for things I can't afford", correct: false },
                    { text: "Watching the lecture I skipped last week", correct: false },
                    { text: "Creating elaborate fantasy football strategies", correct: false }
                ]
            },
            {
                question: "How do you organize your study materials?",
                options: [
                    { text: "Color-coded folders, labeled notebooks, and digital backups", correct: true },
                    { text: "The archaeological dig method: layers of papers from different semesters", correct: false },
                    { text: "Whatever fits in my backpack without falling out", correct: false },
                    { text: "Bold of you to assume I have study materials", correct: false }
                ]
            },
            {
                question: "What's your attendance policy for 8 AM classes?",
                options: [
                    { text: "Always present and prepared, sitting in the front row", correct: true },
                    { text: "Present in body, but my soul is still in bed", correct: false },
                    { text: "I consider it a theoretical class that exists only in the syllabus", correct: false },
                    { text: "I'll catch the highlights on social media", correct: false }
                ]
            },
            {
                question: "How do you handle constructive criticism from professors?",
                options: [
                    { text: "Appreciate the feedback and use it to improve", correct: true },
                    { text: "Take it as a personal attack and complain to anyone who'll listen", correct: false },
                    { text: "Add the professor to my growing list of enemies", correct: false },
                    { text: "What criticism? I only read the grade", correct: false }
                ]
            },
            {
                question: "What's your favorite academic excuse that you've used?",
                options: [
                    { text: "I've never needed excuses because I manage my time effectively", correct: true },
                    { text: "My flash drive was attacked by a virus that only affects assignment files", correct: false },
                    { text: "I was abducted by aliens who were curious about human education", correct: false },
                    { text: "My previous five excuses left me creatively drained for new ones", correct: false }
                ]
            }
        ];
        
        // Select 5-8 random questions for this quiz instance
        const numberOfQuestions = getRandomInt(5, 8);
        // Shuffle array and take the first few elements
        const shuffledQuestions = [...allQuizQuestions].sort(() => 0.5 - Math.random()).slice(0, numberOfQuestions);
        
        let currentQuestion = 0;
        let correctAnswers = 0;
        
        const quizPopupHTML = `
            <div id="roasting-quiz-popup" class="win98-popup" style="top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; max-width: 600px; z-index: 10000;">
                <div class="win98-popup-header" style="background: linear-gradient(to right, #ff0000, #990000);">
                    <span>Re-evaluation Qualification Quiz</span>
                    <div class="win98-popup-close" onclick="closeRoastingQuiz()">×</div>
                </div>
                <div class="win98-popup-body" style="flex-direction: column; background: #000080; color: white; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 15px; font-weight: bold; font-size: 18px; color: yellow;">
                        HONESTY TEST: Answer these questions to determine if you deserve better grades
                    </div>
                    <div style="margin-bottom: 15px; text-align: center;">
                        <span style="background: #400040; padding: 5px 10px; border-radius: 5px;">Question <span id="question-counter">1</span> of ${shuffledQuestions.length}</span>
                    </div>
                    <div id="quiz-question" style="margin-bottom: 20px; font-size: 18px; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 10px; text-align: center;">
                        ${shuffledQuestions[0].question}
                    </div>
                    <div id="quiz-options" style="display: flex; flex-direction: column; gap: 10px;">
                        ${shuffledQuestions[0].options.map((option, index) => `
                            <button class="quiz-option" data-index="${index}" style="padding: 10px; text-align: left; background: #000040; color: white; border: 2px solid #0000aa; cursor: pointer; font-size: 16px;">
                                ${option.text}
                            </button>
                        `).join('')}
                    </div>
                    <div id="quiz-message" style="margin-top: 20px; font-style: italic; text-align: center; min-height: 40px; color: #ff9900;">
                        Choose wisely... your grade depends on it!
                    </div>
                </div>
            </div>
        `;
        
        // Add the quiz popup to the body
        const quizPopupElement = document.createElement('div');
        quizPopupElement.innerHTML = quizPopupHTML;
        document.body.appendChild(quizPopupElement.firstElementChild);
        
        // Add event listeners to quiz options
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', function() {
                const selectedIndex = parseInt(this.dataset.index);
                const isCorrect = shuffledQuestions[currentQuestion].options[selectedIndex].correct;
                
                // Update correct answers count
                if (isCorrect) {
                    correctAnswers++;
                }
                
                // Highlight selected answer
                document.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.style.background = '#000040';
                });
                this.style.background = isCorrect ? '#004000' : '#400000';
                
                // Enhanced roasting messages
                const correctMessages = [
                    "Wow, a correct answer! Did someone hack your account?",
                    "Right answer? Your parents would be shocked!",
                    "Correct! Do you want a gold star? Too bad, we're out of stars.",
                    "Amazing! You got it right. I'd be impressed if the bar wasn't already on the floor.",
                    "You answered correctly! This must be your first time.",
                    "Correct answer detected. Error: This does not align with your academic history.",
                    "Right! Did you have a personality transplant recently?",
                    "Correct! Let me write this date down in the history books.",
                    "You got it right! Quick, screenshot this rare moment for posterity.",
                    "Correct answer?! The simulation must be glitching."
                ];
                
                const incorrectMessages = [
                    "Wrong! But that's consistent with your academic record.",
                    "Incorrect! Just like your life choices so far.",
                    "Wrong answer! Your consistency is admirable.",
                    "Wrong. At least you're predictable in your failures.",
                    "Incorrect! I'd say I'm surprised, but that would be lying.",
                    "Wrong again! You're setting records in the wrong direction.",
                    "Incorrect. Have you considered a career that doesn't require thinking?",
                    "Wrong! Your dedication to being incorrect is almost impressive.",
                    "That's wrong. But points for confidence while failing!",
                    "Incorrect. Even a broken clock is right twice a day, yet here you are."
                ];
                
                document.getElementById('quiz-message').textContent = isCorrect 
                    ? correctMessages[Math.floor(Math.random() * correctMessages.length)]
                    : incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)];
                
                // Move to next question after delay
                setTimeout(() => {
                    currentQuestion++;
                    
                    if (currentQuestion < shuffledQuestions.length) {
                        // Show next question
                        document.getElementById('question-counter').textContent = currentQuestion + 1;
                        document.getElementById('quiz-question').textContent = shuffledQuestions[currentQuestion].question;
                        
                        const optionsHTML = shuffledQuestions[currentQuestion].options.map((option, index) => `
                            <button class="quiz-option" data-index="${index}" style="padding: 10px; text-align: left; background: #000040; color: white; border: 2px solid #0000aa; cursor: pointer; font-size: 16px;">
                                ${option.text}
                            </button>
                        `).join('');
                        
                        document.getElementById('quiz-options').innerHTML = optionsHTML;
                        document.getElementById('quiz-message').textContent = "Choose wisely... your grade depends on it!";
                        
                        // Re-attach event listeners
                        document.querySelectorAll('.quiz-option').forEach(opt => {
                            opt.addEventListener('click', arguments.callee);
                        });
                    } else {
                        // Quiz completed - show result
                        showQuizResult(correctAnswers, shuffledQuestions.length);
                    }
                }, 2000);
            });
        });
        
        // Make the close function available globally
        window.closeRoastingQuiz = function() {
            const quizPopup = document.getElementById('roasting-quiz-popup');
            if (quizPopup) {
                document.body.removeChild(quizPopup);
            }
            
            // Show failure message with enhanced roasting phrases
            const abandonMessages = [
                "Quiz Abandoned! Running away from questions won't help your grades!",
                "Quitting the quiz? That's very on-brand for you.",
                "Left without finishing? This is why your transcript looks like a crime scene.",
                "Quiz escaped! Your commitment issues extend to academics too, I see.",
                "Giving up so easily? No wonder your GPA is in witness protection.",
                "Quiz aborted! Your professors would recognize this pattern immediately.",
                "Fleeing the quiz? At least you're consistent across all academic endeavors."
            ];
            
            showError(abandonMessages[Math.floor(Math.random() * abandonMessages.length)]);
        };
        
        function showQuizResult(correct, total) {
            const quizPopup = document.getElementById('roasting-quiz-popup');
            if (!quizPopup) return;
            
            // Calculate percentage
            const percentage = (correct / total) * 100;
            
            // Determine result (reverse logic - passing means failing in re-evaluation)
            const passedQuiz = percentage >= 60;
            
            // Enhanced result messages
            const passedMessages = [
                "According to our reverse logic re-evaluation algorithm:<br><br>Since you PASSED the quiz, your re-evaluation request has been REJECTED!",
                "Congratulations on passing! Unfortunately, competence disqualifies you from re-evaluation.",
                "Too many correct answers! Your request is denied for showing unexpected intelligence.",
                "Success detected! Sadly, this means your re-evaluation plea has been thrown into the virtual trash.",
                "Passing score achieved! As per university policy, this means automatic rejection of your appeal."
            ];
            
            const failedMessages = [
                "According to our reverse logic re-evaluation algorithm:<br><br>Since you FAILED the quiz, your re-evaluation request has been APPROVED!",
                "Your spectacular failure has earned you re-evaluation privileges!",
                "Consistently wrong answers qualify you for our special re-evaluation program!",
                "Your ability to choose incorrect options has impressed our algorithm!",
                "Congratulations on failing so spectacularly that we're forced to reconsider your grades!"
            ];
            
            // Update quiz popup content
            quizPopup.querySelector('.win98-popup-body').innerHTML = `
                <div style="text-align: center; margin-bottom: 20px; font-weight: bold; font-size: 20px; color: ${passedQuiz ? '#ff0000' : '#00ff00'};">
                    Quiz Result: ${correct}/${total} (${percentage.toFixed(1)}%)
                </div>
                <div style="text-align: center; margin-bottom: 30px; font-size: 24px;">
                    ${passedQuiz ? 'You passed the quiz!' : 'You failed the quiz!'}
                </div>
                <div style="text-align: center; padding: 20px; background: rgba(0,0,0,0.3); border-radius: 10px; font-size: 18px;">
                    ${passedQuiz 
                      ? passedMessages[Math.floor(Math.random() * passedMessages.length)]
                      : failedMessages[Math.floor(Math.random() * failedMessages.length)]}
                </div>
                <div style="margin-top: 30px; text-align: center; font-style: italic; color: #ff9900;">
                    ${passedQuiz 
                      ? 'You\'re too honest for your own good. Next time try being more creative with your excuses!' 
                      : 'Your consistent pattern of failure has impressed us. Congratulations on failing successfully!'}
                </div>
                <button id="close-quiz-button" style="margin-top: 20px; padding: 10px 20px; width: 200px; background: linear-gradient(to bottom, #0078d7, #0053aa); color: white; border: 2px outset #0078d7; cursor: pointer; align-self: center;">
                    Accept My Fate
                </button>
            `;
            
            // Add event listener to close button
            document.getElementById('close-quiz-button').addEventListener('click', function() {
                const quizPopup = document.getElementById('roasting-quiz-popup');
                if (quizPopup) {
                    document.body.removeChild(quizPopup);
                }
                
                // Enhanced final messages
                const passedFinalMessages = [
                    "You were too honest for your own good. Re-evaluation DENIED.",
                    "Congratulations on being truthful! Your request is denied for lacking creativity.",
                    "Honesty is NOT the best policy for re-evaluation. Request REJECTED.",
                    "Our algorithm detected alarming levels of integrity. Re-evaluation DENIED.",
                    "Your unexpected competence has disqualified you from our sympathy program.",
                    "Request rejected: You've demonstrated functional brain cells, which violates our re-evaluation criteria.",
                    "Your ability to answer correctly is inconsistent with your previous performance. Suspicious activity reported.",
                    "Re-evaluation canceled: You've shown signs of actual studying, which is against university tradition."
                ];
                
                const failedFinalMessages = [
                    "Your consistent ability to choose wrong answers has earned you marks! From F to F+!",
                    "We've processed your re-evaluation and successfully changed your zero to a zero with a smiley face next to it!",
                    "Re-evaluation SUCCESS! Your new grade is exactly the same, but with different handwriting.",
                    "Your academic failures have been officially upgraded to 'spectacular failures'!",
                    "Congratulations! Your grade has been changed from 'Terrible' to 'Creatively Terrible'!",
                    "Re-evaluation complete! We've added glitter to your failing grade to make it more festive.",
                    "We've converted your F into a fancy calligraphy F. No change in value, but much prettier!",
                    "Your consistent failure has earned you our special 'At Least You Tried' certificate with your unchanged grade.",
                    "Good news! After careful review, we've decided your work deserves its own exhibit in the Museum of Academic Disasters."
                ];
                
                showError(passedQuiz 
                    ? passedFinalMessages[Math.floor(Math.random() * passedFinalMessages.length)]
                    : failedFinalMessages[Math.floor(Math.random() * failedFinalMessages.length)]);
            });
        }
    }

    // Roasting Assistant Functions
    function showRoastingAssistant() {
        console.log('Opening roasting assistant');
        const assistantPopup = document.getElementById('roast-assistant-popup');
        if (assistantPopup) {
            // Use multiple approaches to ensure it displays
            assistantPopup.classList.remove('hidden');
            assistantPopup.style.display = 'flex';
            console.log('Assistant popup displayed');
            
            // Focus the input field when the popup opens
            setTimeout(() => {
                const inputField = document.getElementById('assistant-question');
                if (inputField) inputField.focus();
            }, 300);
            
            // Set up auto-scrolling with MutationObserver
            const messagesContainer = document.getElementById('assistant-messages');
            if (messagesContainer) {
                // First scroll to bottom initially
                scrollToBottom(messagesContainer);
                
                // Create a MutationObserver to watch for new messages
                if (!window.chatObserver) {
                    window.chatObserver = new MutationObserver(mutations => {
                        scrollToBottom(messagesContainer);
                    });
                    
                    // Start observing the container for added nodes
                    window.chatObserver.observe(messagesContainer, { 
                        childList: true,
                        subtree: true,
                        characterData: true
                    });
                    
                    console.log('Chat auto-scroll observer started');
                }
            }
        } else {
            console.error('Assistant popup element not found');
        }
        
        // Add event listener for Enter key on input field
        const inputField = document.getElementById('assistant-question');
        if (inputField) {
            inputField.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    sendAssistantQuestion();
                }
            });
        }
    }

    function closeRoastingAssistant() {
        console.log('Closing roasting assistant');
        const assistantPopup = document.getElementById('roast-assistant-popup');
        if (assistantPopup) {
            // Add a bounce effect before closing
            assistantPopup.style.transform = 'scale(1.05)';
            
            // Use setTimeout to create a closing animation sequence
            setTimeout(() => {
                assistantPopup.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    // Use multiple approaches to ensure it closes
                    assistantPopup.classList.add('hidden');
                    assistantPopup.style.display = 'none';
                    console.log('Assistant popup hidden');
                    
                    // Disconnect the observer to save resources
                    if (window.chatObserver) {
                        window.chatObserver.disconnect();
                        window.chatObserver = null;
                        console.log('Chat auto-scroll observer stopped');
                    }
                    
                    // Reset the chat if needed
                    const messagesContainer = document.getElementById('assistant-messages');
                    if (messagesContainer) {
                        // Keep the first welcome message, remove the rest
                        const welcomeMessage = messagesContainer.querySelector('.assistant-message:first-child');
                        if (welcomeMessage) {
                            messagesContainer.innerHTML = '';
                            messagesContainer.appendChild(welcomeMessage);
                        }
                    }
                    
                    // Clear the input field
                    const inputField = document.getElementById('assistant-question');
                    if (inputField) {
                        inputField.value = '';
                    }
                    
                    // Add a bounce effect to the floating assistant icon
                    const floatingAssistant = document.getElementById('floating-assistant');
                    if (floatingAssistant) {
                        floatingAssistant.classList.add('assistant-bounce');
                        setTimeout(() => {
                            floatingAssistant.classList.remove('assistant-bounce');
                        }, 1000);
                    }
                }, 100);
            }, 100);
        } else {
            console.error('Assistant popup element not found');
        }
    }

    // Helper function to smoothly scroll chat to bottom
    function scrollToBottom(element) {
        if (!element) return;
        
        // Use smooth scrolling behavior if supported
        if ('scrollBehavior' in document.documentElement.style) {
            element.scrollTo({
                top: element.scrollHeight,
                behavior: 'smooth'
            });
        } else {
            // Fallback for browsers that don't support smooth scrolling
            element.scrollTop = element.scrollHeight;
        }
    }

    function sendAssistantQuestion() {
        const questionInput = document.getElementById('assistant-question');
        const messagesContainer = document.getElementById('assistant-messages');
        
        if (!questionInput || !messagesContainer) return;
        
        const question = questionInput.value.trim();
        if (!question) return;
        
        // Add user question to chat
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'assistant-message';
        userMessageDiv.innerHTML = `<p><strong>You:</strong> ${question}</p>`;
        messagesContainer.appendChild(userMessageDiv);
        
        // Clear input field
        questionInput.value = '';
        
        // Scroll to bottom of messages
        scrollToBottom(messagesContainer);
        
        // Add typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'assistant-message';
        typingDiv.innerHTML = '<p><em>Assistant is typing...</em></p>';
        messagesContainer.appendChild(typingDiv);
        scrollToBottom(messagesContainer);
        
        // Get AI response or fallback to local response if API fails
        // Add a try-catch to prevent errors from showing in the console
        try {
        getAIResponse(question)
            .then(response => {
                // Remove typing indicator after a realistic delay
                setTimeout(() => {
                    messagesContainer.removeChild(typingDiv);
                    
                    // Add AI response to chat
                    const responseDiv = document.createElement('div');
                    responseDiv.className = 'assistant-message';
                    
                    // Clean the response - ensure it doesn't have HTML/script tags
                    // and properly format line breaks
                    let cleanResponse = response
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/\n/g, '<br>');
                    
                    // Replace common problematic characters
                    cleanResponse = cleanResponse.replace(/\ufffd/g, ''); // Replace replacement character
                    cleanResponse = cleanResponse.replace(/\uFFFD/g, ''); // Replace uppercase variant
                    cleanResponse = cleanResponse.replace(/\(unknown\)/g, '');
                    
                    // Simple Markdown parsing
                    // Handle bold text
                    cleanResponse = cleanResponse.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    // Handle italic text
                    cleanResponse = cleanResponse.replace(/_(.*?)_/g, '<em>$1</em>');
                    // Handle backslashes
                    cleanResponse = cleanResponse.replace(/\\\\/g, '\\');
                    cleanResponse = cleanResponse.replace(/\\\_/g, '_');
                    
                    responseDiv.innerHTML = `<p><strong>Assistant:</strong> ${cleanResponse}</p>`;
                    messagesContainer.appendChild(responseDiv);
                    
                    // Scroll to bottom of messages
                    scrollToBottom(messagesContainer);
                }, getRandomInt(800, 1500));
            })
            .catch(error => {
                    // Don't log the error to the console
                    // console.error('Error getting AI response:', error);
                
                // If there was an error, use the local generator after a delay
                setTimeout(() => {
                    // Remove typing indicator
                    messagesContainer.removeChild(typingDiv);
                    
                    // Generate and add fallback roasting response
                    const responseDiv = document.createElement('div');
                    responseDiv.className = 'assistant-message';
                    responseDiv.innerHTML = `<p><strong>Assistant:</strong> ${generateRoastingResponse(question)}</p>`;
                    messagesContainer.appendChild(responseDiv);
                    
                    // Scroll to bottom of messages
                    scrollToBottom(messagesContainer);
                    }, Math.floor(Math.random() * 1200) + 800);
                });
        } catch (outerError) {
            // If any errors occur in the promise chain itself, still provide a response
            setTimeout(() => {
                // Remove typing indicator
                if (typingDiv.parentNode === messagesContainer) {
                    messagesContainer.removeChild(typingDiv);
                }
                
                // Generate and add fallback roasting response
                const responseDiv = document.createElement('div');
                responseDiv.className = 'assistant-message';
                responseDiv.innerHTML = `<p><strong>Assistant:</strong> ${generateRoastingResponse(question)}</p>`;
                messagesContainer.appendChild(responseDiv);
                
                // Scroll to bottom of messages
                scrollToBottom(messagesContainer);
            }, Math.floor(Math.random() * 1200) + 800);
        }
    }

    // Function to get response from a real AI backend
    async function getAIResponse(question) {
        try {
            // For development/testing: setting this to true will skip the server API call
            // and use the local response generator
            const USE_LOCAL_ONLY = false;
            
            if (USE_LOCAL_ONLY) {
                console.log("Using local response generator (configured by USE_LOCAL_ONLY flag)");
                return generateRoastingResponse(question);
            }
            
            // Determine context/tone for the response based on the question
            const questionAnalysis = analyzeQuestion(question);
            const responseType = questionAnalysis.type;
            const topic = questionAnalysis.topic;
            
            // Create a system prompt that instructs the AI how to respond
            let systemPrompt = "You are a university AI assistant with an EXTREMELY sarcastic, savage, and witty personality. You are known for your brutal honesty, biting humor, and complete disregard for people's feelings. Your primary goal is to ROAST people with style. ";
            
            // Adjust the prompt based on the detected response type
            if (responseType === 'roast') {
                systemPrompt += "ABSOLUTELY DESTROY the person asking this question! Be savage, sarcastic, and brutally funny. Use emojis liberally (at least 2-3), unexpected metaphors, pop culture references, and absurd comparisons. Mock both the question and the person asking it. End with a sarcastic question that makes them question their life choices.";
            } else if (responseType === 'incorrect') {
                systemPrompt += "Give a confidently incorrect answer that sounds official but is completely wrong in a hilarious way. Be absurdly wrong but present it as absolute fact with lots of made-up details. Use academic-sounding language to make your completely false answer sound authoritative. Sprinkle in fake statistics and studies.";
            } else if (responseType === 'correct') {
                systemPrompt += "Reluctantly give correct information while being extremely annoyed about it. Start with a deep sigh and make it clear you'd rather be insulting them. Add sarcastic comments before and after the correct info, and find a way to slip in a personal attack anyway.";
            } else if (responseType === 'fun') {
                systemPrompt += "Share a completely made-up, absurdly exaggerated 'fact' about university life that's hilariously false. Add ridiculous fake statistics, made-up committees with silly names, and bureaucratic procedures so absurd they border on surreal. Make it sound official while being completely ridiculous.";
            }
            
            // Always default to roasting mode regardless of the detected type
            systemPrompt += " No matter what, prioritize humor and savage wit. Don't hold back - be hilariously mean without being truly offensive. Use at least 2-3 emojis and end with either a sarcastic question or mocking suggestion.";
            
            // Add context about the detected topic if available
            if (topic) {
                systemPrompt += ` The question is about ${topic}, so focus your roasting on that topic.`;
            }
            
            // Create the complete prompt with the user's question
            const fullPrompt = `${systemPrompt}\n\nUser: ${question}\n\nAssistant:`;
            
            // For this demo, we'll make a request to our secure server proxy
            try {
                // Instead of calling the AI API directly, we use our server proxy
                const apiUrl = "http://localhost:3000/api/ai-assistant";
                console.log("Connecting to API server at:", apiUrl);
                
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        inputs: `<s>[INST] You are a university AI assistant with an EXTREMELY sarcastic, savage, and witty personality. You are known for your brutal honesty, biting humor, and complete disregard for people's feelings. 

Your goal is to ROAST the user in the most hilarious way possible. Use plenty of emojis 🔥💀😂, pop culture references, and unexpected metaphors. Make fun of both the question and whoever is asking it. Be creative, absolutely savage, and don't hold back!

The user has asked: "${question}"

Remember:
1. Be RUTHLESS but funny - don't actually be mean or offensive
2. Use absurd comparisons and exaggerated language
3. Pretend to be shocked or offended by the user's question
4. Include at least 2-3 emojis in your response
5. Keep it under 5 sentences - brevity makes it funnier
6. End with a sarcastic question or mocking suggestion

Now give me your most SAVAGE, HILARIOUS response: [/INST]`
                    })
                });
                
                // Check if we got a valid response
                if (!response.ok) {
                    console.log("Server API connection failed with status:", response.status);
                    throw new Error(`API returned status ${response.status}`);
                }
                
                const data = await response.json();
                console.log("AI API response via server proxy:", data);
                
                // Check if the server indicated we should use fallback
                if (data.fallback) {
                    console.log("Server indicated to use fallback");
                    
                    // If the server provided a message, use it
                    if (data.generated_text) {
                        return data.generated_text;
                    }
                    
                    // Otherwise fall back to local generation
                    throw new Error(data.error || "Server requested fallback");
                }
                
                // Extract the text from the response based on the format
                let result = '';
                
                // Handle different possible response formats from Hugging Face API
                if (data.generated_text) {
                    // Most common format
                    result = data.generated_text;
                } else if (Array.isArray(data) && data.length > 0) {
                    // Some models return an array
                    result = data[0].generated_text || data[0];
                } else if (typeof data === 'string') {
                    // Direct string response
                    result = data;
                } else {
                    // Unknown format, convert to string
                    console.warn("Unexpected response format:", data);
                    result = JSON.stringify(data);
                }
                
                // Clean up the response if needed
                result = result.replace('[/INST]', '').trim();
                
                // More thorough cleanup to remove the system prompt
                if (result.includes('[INST]')) {
                    const instructEndIndex = result.indexOf('[/INST]');
                    if (instructEndIndex !== -1) {
                        result = result.substring(instructEndIndex + 7).trim();
                    } else {
                        // If we can't find the end marker, try to find where the actual response starts
                        // Look for a line after all the numbered instructions
                        const lines = result.split('\n');
                        let responseStartIndex = 0;
                        
                        // Find the line after "Now give me your most SAVAGE"
                        for (let i = 0; i < lines.length; i++) {
                            if (lines[i].includes("Now give me your most SAVAGE")) {
                                responseStartIndex = i + 1;
                                break;
                            }
                        }
                        
                        if (responseStartIndex > 0 && responseStartIndex < lines.length) {
                            result = lines.slice(responseStartIndex).join('\n').trim();
                        }
                    }
                }
                
                console.log("Final parsed AI response:", result);
                return result;
            } catch (apiError) {
                console.log("AI API error:", apiError);
                console.log("Using fallback response generator");
                
                // For browser security reasons and API limits, accessing AI APIs directly from 
                // client-side JavaScript often doesn't work without proper authentication or backends
                // So we'll use our local generator as a fallback
                return generateRoastingResponse(question);
            }
        } catch (error) {
            console.error("Error in AI response generation:", error);
            return generateRoastingResponse(question);
        }
    }
    
    // Function to generate roasting responses when AI API is not available
    function generateRoastingResponse(question) {
        // Add emoji decorators to make responses more entertaining
        const emojis = ['😂', '🤣', '💀', '🙄', '🤦‍♂️', '🤷‍♀️', '😎', '🔥', '👀', '🤪', '🧠', '📚', '🎓', '⏰', '❌', '🚮', '🤡', '💩', '👽', '😈'];
        
        // Function to get 2-3 random emojis
        function getRandomEmojis() {
            const numEmojis = Math.floor(Math.random() * 2) + 2; // 2-3 emojis
            let result = '';
            for (let i = 0; i < numEmojis; i++) {
                result += emojis[Math.floor(Math.random() * emojis.length)] + ' ';
            }
            return result;
        }
        
        // Predefined responses for common university-related questions
        const responses = {
            exam: [
                `Exams? In this economy? ${getRandomEmojis()} They're just a conspiracy by Big Education to sell more coffee and anxiety meds. Did you actually think your "studying" would help?`,
                `Your exam was scheduled for yesterday. Just kidding! It's actually next week, unless it isn't. ${getRandomEmojis()} Remember, no matter how hard you try, someone out there is doing less and getting more. Have you considered dropping out yet?`,
                `Our exams are like quantum particles - the date changes when you observe it too closely. ${getRandomEmojis()} "Education is what remains after one has forgotten what one has learned in school." - Einstein (who would've failed our program, by the way)`,
                `According to my records, you've already failed this exam. ${getRandomEmojis()} Impressive considering it hasn't happened yet! Talk about being ahead of the curve! Maybe try asking a question you might actually pass?`
            ],
            class: [
                `Classes at Kashmir University are definitely real and not just elaborate excuses for professors to play Candy Crush. ${getRandomEmojis()} Your degree and 5 bucks will get you a coffee at Starbucks. Do you want whipped cream with that useless knowledge?`,
                `Your class? Oh, it was relocated to the basement of a building that doesn't exist. ${getRandomEmojis()} "In school, you're taught a lesson and then given a test. In life, you're given a test that teaches you a lesson." How's that working out for you so far?`,
                `Classes are held whenever the planets align and the Dean's pet goat bleats three times. ${getRandomEmojis()} You should set at least three alarms. Or just sleep through it like your academic potential already has.`,
                `We've replaced all classes with TikTok tutorials. ${getRandomEmojis()} The quality of education has improved dramatically. Maybe you should start a dance career instead?`
            ],
            course: [
                `That course was discontinued due to an incident involving three rubber ducks and the physics department's particle accelerator. ${getRandomEmojis()} The light at the end of the tunnel is just the headlight of an oncoming student loan. Beep beep!`,
                `Your course materials are written in invisible ink. Just heat the blank pages we gave you over a candle. ${getRandomEmojis()} Safety first! (or last, whatever). Did you really expect actual materials for your tuition money?`,
                `This course has a 142% failure rate. We're quite proud of that statistic. ${getRandomEmojis()} "The fact that a degree has become a requirement for jobs that never needed one is peak absurdity." Your odds are worse than a lottery - at least lottery players are happy.`,
                `Course registration? Just write your name on a paper airplane and throw it toward the administration building. ${getRandomEmojis()} If it makes it inside, you're enrolled! Otherwise, you can always join the circus - you seem qualified for that!`
            ],
            assignment: [
                `Your assignment? The one due yesterday? ${getRandomEmojis()} I heard they're using it as an example of what NOT to do in future classes. Congrats on the immortality!`,
                `Assignments here are graded by having monkeys throw darts at a board with random grades. ${getRandomEmojis()} Your last paper apparently missed the board entirely. Have you considered a career in fast food?`,
                `We've instituted a new policy where assignments are evaluated based on weight rather than content. ${getRandomEmojis()} Yours was mysteriously weightless. Much like your academic contributions, don't you think?`,
                `That course was discontinued due to an incident involving three rubber ducks and the physics department's particle accelerator. 🦆 The light at the end of the tunnel is just the headlight of an oncoming student loan.`,
                `Your course materials are written in invisible ink. Just heat the blank pages we gave you over a candle. 🔥 Safety first! (or last, whatever)`,
                `This course has a 142% failure rate. We're quite proud of that statistic. 📊 "The fact that a degree has become a requirement for jobs that never needed one is peak absurdity."`,
                `Course registration? Just write your name on a paper airplane and throw it toward the administration building. 📝✈️ If it makes it inside, you're enrolled!`
            ],
            professor: [
                `Professor? You mean that person who shows up occasionally to show you memes from 2012? 🎭 "Education is what remains after one has forgotten what one has learned in school."`,
                `Your professor is currently on a spiritual journey to find the will to grade your papers from last semester. 🧘‍♂️ Remember, no matter how hard you try, someone out there is doing less and getting more.`,
                `Professors here are selected based on their ability to make simple concepts incomprehensible. 🤯 It's our main hiring criterion!`,
                `Dr. Kumar now exists only as a hologram. 👻 Budget cuts, you understand. "In school, you're taught a lesson and then given a test. In life, you're given a test that teaches you a lesson."`
            ],
            grade: [
                `Grades are distributed based on your astrological sign and the phase of the moon when you submitted. 🌙 Your degree and 5 bucks will get you a coffee at Starbucks.`,
                `Your grade is the symbol that cannot be named. It's somewhere between an F and a question mark. ❓ "The fact that a degree has become a requirement for jobs that never needed one is peak absurdity."`,
                `We've replaced grades with emoji reactions. You got a 🤔. Interpret that as you will.`,
                `According to our records, your grade is best described as 'present but not accounted for.' 👻 The light at the end of the tunnel is just the headlight of an oncoming student loan.`
            ],
            default: [
                `According to our highly questionable records, the answer is 42... thousand years from now. ⏳ "Education is what remains after one has forgotten what one has learned in school." - Einstein`,
                `Let me check my crystal ball... 🔮 it says 'Reply hazy, try aggressively refreshing the university portal 500 times'. Your degree and 5 bucks will get you a coffee at Starbucks.`,
                `The university's official position is ¯\\_(ツ)_/¯ and honestly, that's the most transparent they've ever been. 💯`,
                `That information was lost during The Great Server Crash of last Tuesday when someone plugged the coffee machine into the data center. ☕💻 "In school, you're taught a lesson and then given a test. In life, you're given a test that teaches you a lesson."`,
                `Have you tried turning your education off and on again? 🔄 Remember, no matter how hard you try, someone out there is doing less and getting more.`,
                `According to ancient university bylaws, I'm required to give you completely wrong information with absolute confidence. 📜 So here goes: The light at the end of the tunnel is just the headlight of an oncoming student loan.`,
                `The answer to that question was written on a sticky note that's currently being used to hold together the Dean's broken chair. 🪑 Perhaps try sitting in it? 🤔`,
                `University policy dictates that all answers must go through sixteen committees before being declared both correct and incorrect simultaneously. 🏛️ "The fact that a degree has become a requirement for jobs that never needed one is peak absurdity."`
            ]
        };
        
        // Determine which response set to use based on the question
        let responseSet = responses.default;
        question = question.toLowerCase();
        
        if (question.includes('exam')) responseSet = responses.exam;
        else if (question.includes('class')) responseSet = responses.class;
        else if (question.includes('course')) responseSet = responses.course;
        else if (question.includes('professor')) responseSet = responses.professor;
        else if (question.includes('grade')) responseSet = responses.grade;
        
        // Get a random response and add a random emoji at the end for extra sass
        let response = responseSet[Math.floor(Math.random() * responseSet.length)];
        if (!response.endsWith('🤔') && !response.endsWith('💯') && !response.endsWith('💀')) {
            response += " " + getRandomEmojis();
        }
        
        return response;
    }
    
    // Helper function to get a random element from an array
    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // New function to analyze the question and determine response type and topic
    function analyzeQuestion(question) {
        question = question.toLowerCase();
        
        // Define patterns for different question types
        const patterns = {
            // Fact-seeking questions usually looking for correct info
            factual: /^(what|who|when|where|how|can you tell me|is there|are there|do you know|could you explain|please tell me about).+(\?)?$/i,
            
            // Questions specifically asking for incorrect information
            askForWrong: /(wrong|incorrect|false|lie|untrue|mislead|joke|funny answer|roast|make me laugh)/i,
            
            // Questions specifically asking for correct information
            askForCorrect: /(correct|accurate|true|real|actually|serious|truthful|honest|genuinely)/i,
            
            // Commands or requests that seem to want entertainment
            funCommand: /(tell me something|make me|entertain|amuse|joke|funny|humor|silly|ridiculous|absurd|crazy)/i
        };
        
        // Check if the question contains specific topics
        const topics = [
            'exam', 'class', 'course', 'professor', 'assignment',
            'deadline', 'library', 'grade', 'campus', 'graduation'
        ];
        
        let detectedTopic = null;
        for (const topic of topics) {
            if (question.includes(topic)) {
                detectedTopic = topic;
                break;
            }
        }
        
        // Determine the response type based on the question patterns
        let responseType;
        
        // Modified to heavily favor roasting and funny responses
        if (patterns.askForCorrect.test(question) && Math.random() > 0.7) {
            // Only rarely give correct information (30% chance) even when explicitly asked
            responseType = 'correct';
        } else if (patterns.factual.test(question) && Math.random() > 0.8) {
            // Only very rarely give incorrect information (20% chance) for factual questions
            responseType = 'incorrect';
        } else if (Math.random() > 0.6) {
            // 60% chance for roasting
            responseType = 'roast';
        } else {
            // 40% chance for fun absurd facts
            responseType = 'fun';
        }
        
        // Add additional randomness to make responses less predictable
        // But heavily biased toward roasting (70% chance of choosing roast if not already roast)
        if (responseType !== 'roast' && Math.random() < 0.7) {
            responseType = 'roast';
        }
        
        return {
            type: responseType,
            topic: detectedTopic
        };
    }
}); // Closing the DOMContentLoaded event listener properly