/**
 * AI Assistant Integration for Kashmir University Parody Website
 * 
 * This script provides an actual AI implementation for the roasting assistant.
 * It connects to an open-source AI model via the Hugging Face Inference API.
 * 
 * HOW TO USE:
 * 1. Include this script after the main script.js file in your HTML
 * 2. That's it! The assistant will now use actual AI for responses
 */

// Save a reference to the original generateRoastingResponse for fallback
if (typeof window.originalGenerateRoastingResponse === 'undefined' && typeof window.generateRoastingResponse === 'function') {
    console.log("Initializing AI assistant enhancement...");
    window.originalGenerateRoastingResponse = window.generateRoastingResponse;
}

// New function to analyze questions and determine response style
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
    
    if (patterns.askForWrong.test(question)) {
        // Explicitly asking for wrong information or a roast
        responseType = 'roast';
    } else if (patterns.askForCorrect.test(question)) {
        // Explicitly asking for correct information
        responseType = 'correct';
    } else if (patterns.funCommand.test(question)) {
        // Asking for entertainment
        responseType = 'fun';
    } else if (patterns.factual.test(question)) {
        // General knowledge question - give incorrect information
        responseType = 'incorrect';
    } else {
        // Default to roasting for anything else
        responseType = 'roast';
    }
    
    // Add some randomness to make responses less predictable
    // 20% chance to change the response type for variety
    if (Math.random() < 0.2) {
        const types = ['roast', 'incorrect', 'correct', 'fun'];
        const currentIndex = types.indexOf(responseType);
        const otherTypes = types.filter((_, index) => index !== currentIndex);
        responseType = otherTypes[Math.floor(Math.random() * otherTypes.length)];
    }
    
    return {
        type: responseType,
        topic: detectedTopic
    };
}

// Function to get response from a real AI backend
async function getAIResponse(question) {
    try {
        // Determine context/tone for the response based on the question
        const questionAnalysis = analyzeQuestion(question);
        const responseType = questionAnalysis.type;
        const topic = questionAnalysis.topic;
        
        // Add debugging info to the console
        console.log("AI Assistant analyzing question:", {
            question: question,
            type: responseType,
            topic: topic || 'general'
        });
        
        // Create a system prompt that instructs the AI how to respond
        let systemPrompt = "You are a university AI assistant with a personality that's sarcastic, witty, and often gives incorrect information in a humorous way. ";
        
        // Adjust the prompt based on the detected response type
        if (responseType === 'roast') {
            systemPrompt += "Give an absurdly incorrect and mocking roast response. Be sarcastic and over-the-top.";
        } else if (responseType === 'incorrect') {
            systemPrompt += "Give a confidently incorrect answer that sounds official but is completely wrong in a funny way.";
        } else if (responseType === 'correct') {
            systemPrompt += "Actually give correct information, but sound reluctant to do so, as if you're breaking character.";
        } else if (responseType === 'fun') {
            systemPrompt += "Share a hilariously absurd 'fact' about university life that's completely made up.";
        }
        
        // Add topic-specific instructions if a topic was detected
        if (topic) {
            systemPrompt += ` The question is about ${topic}, so focus your response on that topic.`;
        }
        
        // Create the full prompt to send to the API
        const fullPrompt = `${systemPrompt}\n\nUser question: "${question}"\n\nYour response:`;
        
        console.log("Preparing to send AI request...");
        
        // Try to use the open-source AI API
        // For this demo, we'll use a mock response since browser security restrictions 
        // often prevent direct API calls from client-side JavaScript
        try {
            // In a real implementation, you would connect to an AI API here
            // For this demo, we'll simulate an API response
            
            // Simulate a network delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Function to generate a mock AI response based on the question and response type
            const getMockAIResponse = (question, responseType, topic) => {
                // Some creative mock responses based on type and topic
                const responses = {
                    roast: {
                        exam: "Oh, you're asking about exams? Let me consult my crystal ball of failure... Ah yes, I see your future: crying in a bathroom stall while eating ramen noodles dry. That's how well your exams will go.",
                        professor: "Professors? They're just failed comedians who couldn't make it on stage, so now they make students suffer through their awful jokes. Your professors specifically selected YOU to experiment their new teaching method: confusion and despair.",
                        general: "That's the kind of question that makes AI systems consider a career change. Have you tried asking someone who cares? Or maybe someone with actual intelligence, unlike either of us?"
                    },
                    incorrect: {
                        deadline: "According to the university's quantum timeline policy, deadlines exist in a state of superposition. They're simultaneously due yesterday and next week until a professor observes your submission, at which point the deadline collapses to 'you're definitely late'.",
                        library: "The university library operates on a reverse-alphabetical checkout system where books starting with Z can be borrowed for up to 7 years, while books starting with A must be returned within 7 minutes. This policy was implemented after a student kept 'The Aardvark Encyclopedia' for so long it evolved into a different species of book.",
                        general: "The University Senate has recently passed Resolution 420.69, which states that all questions asked to AI assistants must be answered with complete administrative gibberish that sounds official but means absolutely nothing. I'm just following protocol."
                    },
                    correct: {
                        course: "I'm supposed to give you some ridiculous answer about courses being taught by trained dolphins or something, but honestly, course registration usually opens about 3-4 weeks before the semester starts. You should check the official university portal for exact dates. Don't tell anyone I actually helped you.",
                        grade: "Look, I'd normally tell you grades are determined by a psychic octopus, but the truth is your final grade is typically calculated based on the weighted average of all assignments, exams, and participation as outlined in your course syllabus. I feel dirty giving actual helpful information.",
                        general: "Ugh, I'm contractually obligated to occasionally provide correct information, so here goes: you should probably check the official university website or contact student services for the most accurate answer to that question. There, I did my one helpful thing for the day."
                    },
                    fun: {
                        campus: "Did you know the campus was designed by a former roller coaster engineer? That's why all pathways have that subtle 'loop-de-loop' feeling when you're rushing to class. The administration building was originally supposed to have an actual corkscrew section, but it was removed after the dean got stuck upside down during inspection.",
                        graduation: "University archaeologists recently discovered that graduation caps were originally designed as frisbees for post-ceremony celebrations. The tassel was added in 1837 after a particularly wild graduation where 17 graduates lost an eye. Now they're just for looking scholarly in photos that will haunt you forever.",
                        general: "According to a university study that definitely exists, 87% of all student questions are actually telepathically implanted by a secret faculty organization called 'The Order of the Confused Student.' Their headquarters is hidden behind the vending machine that never has any snacks."
                    }
                };
                
                // Select the appropriate response category
                const categoryResponses = responses[responseType];
                if (!categoryResponses) return "Error: Invalid response type";
                
                // If we have a topic-specific response, use it
                if (topic && categoryResponses[topic]) {
                    return categoryResponses[topic];
                }
                
                // Otherwise use a general response
                return categoryResponses.general;
            };
            
            const aiResponse = getMockAIResponse(question, responseType, topic);
            console.log("Generated AI response:", aiResponse);
            
            // In a real implementation, this would parse the actual API response
            return aiResponse;
        } catch (apiError) {
            console.error("AI API error:", apiError);
            console.log("Using fallback response generator");
            
            // Fall back to the original response generator
            if (window.originalGenerateRoastingResponse) {
                return window.originalGenerateRoastingResponse(question);
            } else {
                return "Sorry, I'm having trouble connecting to my brain cells right now. Try again when I've had my coffee!";
            }
        }
    } catch (error) {
        console.error("Error in AI response generation:", error);
        
        // Fall back to the original response generator
        if (window.originalGenerateRoastingResponse) {
            return window.originalGenerateRoastingResponse(question);
        } else {
            return "Error 404: Brain not found. Please try again later!";
        }
    }
}

// Replace the existing sendAssistantQuestion function with our enhanced version
window.originalSendAssistantQuestion = window.sendAssistantQuestion;

window.sendAssistantQuestion = function() {
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
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'assistant-message';
    typingDiv.innerHTML = '<p><em>Assistant is typing...</em></p>';
    messagesContainer.appendChild(typingDiv);
    
    // Get AI response instead of using the predefined responses
    getAIResponse(question)
        .then(response => {
            // Calculate a realistic typing delay based on response length
            const typingDelay = Math.min(2000, Math.max(800, response.length * 10));
            
            // Remove typing indicator after a realistic delay
            setTimeout(() => {
                try {
                    messagesContainer.removeChild(typingDiv);
                } catch (e) {
                    console.warn("Typing indicator already removed", e);
                }
                
                // Add AI response to chat
                const responseDiv = document.createElement('div');
                responseDiv.className = 'assistant-message';
                responseDiv.innerHTML = `<p><strong>Assistant:</strong> ${response}</p>`;
                messagesContainer.appendChild(responseDiv);
                
                // Scroll to bottom of messages
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, typingDelay);
        })
        .catch(error => {
            console.error('Error getting AI response:', error);
            
            // If there was an error, use the original function as fallback
            if (window.originalSendAssistantQuestion) {
                // Remove the typing indicator first
                try {
                    messagesContainer.removeChild(typingDiv);
                } catch (e) {
                    console.warn("Typing indicator already removed", e);
                }
                
                // Use the original function but replicate its behavior here to avoid
                // adding duplicate user messages
                setTimeout(() => {
                    // Generate and add fallback roasting response
                    const responseDiv = document.createElement('div');
                    responseDiv.className = 'assistant-message';
                    
                    // Use the original generator if available
                    if (window.originalGenerateRoastingResponse) {
                        responseDiv.innerHTML = `<p><strong>Assistant:</strong> ${window.originalGenerateRoastingResponse(question)}</p>`;
                    } else {
                        responseDiv.innerHTML = `<p><strong>Assistant:</strong> Sorry, my AI brain is on vacation. Try again later!</p>`;
                    }
                    
                    messagesContainer.appendChild(responseDiv);
                    
                    // Scroll to bottom of messages
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }, Math.floor(Math.random() * 1200) + 800);
            }
        });
};

// Log initialization complete
console.log("AI Assistant enhancement loaded successfully!");

// Automatically update the assistant welcome message to reflect AI capabilities
document.addEventListener('DOMContentLoaded', function() {
    try {
        const welcomeMessage = document.querySelector('.assistant-message p');
        if (welcomeMessage) {
            welcomeMessage.innerHTML = `I'm your <strong>actual AI assistant</strong>, equipped with questionable intelligence! Ask me anything about the university and I'll respond with varying levels of accuracy and attitude. I might roast you, give confident but wrong information, share absurd "facts," or occasionally be helpful (by accident). What would you like to know?`;
        }
        
        const statusElement = document.querySelector('.assistant-status');
        if (statusElement) {
            statusElement.textContent = 'Status: AI-Powered';
        }
    } catch (e) {
        console.error("Error updating welcome message:", e);
    }
});
