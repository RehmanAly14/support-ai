(function (){
   const api_Url = "https://support-ai-mu-three.vercel.app/api/chat";
   const scriptTag = document.currentScript;
   const ownerId = scriptTag.getAttribute("data-owner-id");
   
   if(!ownerId){
        console.error("❌ Owner ID is required for the chat bot to function.");
        return;
   }

   // Create styles
   const styles = document.createElement('style');
   styles.textContent = `
      @keyframes slideIn {
         from { opacity: 0; transform: translateY(20px); }
         to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes pulse {
         0% { transform: scale(1); }
         50% { transform: scale(1.1); }
         100% { transform: scale(1); }
      }
      
      .chat-message {
         animation: slideIn 0.3s ease-out;
      }
      
      .typing-dots {
         display: flex;
         gap: 4px;
         padding: 12px 16px;
         background: #f0f2f5;
         border-radius: 16px;
         border-top-left-radius: 4px;
         width: fit-content;
      }
      
      .typing-dots span {
         width: 8px;
         height: 8px;
         background: #90949c;
         border-radius: 50%;
         animation: bounce 1.4s infinite;
      }
      
      .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
      .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
      
      @keyframes bounce {
         0%, 60%, 100% { transform: translateY(0); }
         30% { transform: translateY(-6px); }
      }
   `;
   document.head.appendChild(styles);

   // Create chat button with modern design
   const button = document.createElement("div");
   button.setAttribute('aria-label', 'Open chat support');
   button.setAttribute('role', 'button');
   button.setAttribute('tabindex', '0');
   document.body.appendChild(button);

   Object.assign(button.style, {
      position: "fixed",
      bottom: "24px",
      right: "24px",
      width: "54px",
      height: "54px",
      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      color: "#fff",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      zIndex: 999999,
      boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      fontSize: "24px",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      border: "2px solid rgba(255, 255, 255, 0.2)",
      animation: "pulse 2s infinite",
   });

   // Add hover effect
   button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.1)';
      button.style.boxShadow = '0 20px 30px -10px rgba(99, 102, 241, 0.6)';
   });

   button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = '0 10px 25px -5px rgba(99, 102, 241, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.1)';
   });

   // Chat button icon (message bubble)
   button.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
         <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
   `;

   // Create chat window
   const box = document.createElement("div");
   Object.assign(box.style, {
      position: "fixed",
      bottom: "100px",
      right: "24px",
      width: "380px",
      height: "420px",
      backgroundColor: "#fff",
      borderRadius: "24px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      display: "none",
      flexDirection: "column",
      zIndex: 999999,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      overflow: "hidden",
      animation: "slideIn 0.3s ease-out",
      border: "1px solid rgba(229, 231, 235, 0.5)",
      backdropFilter: "blur(8px)",
   });
   document.body.appendChild(box);

   // Chat window HTML with improved design
   box.innerHTML = `
   <div style="
      padding: 16px 20px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: #fff;
      font-size: 15px;
      font-weight: 500;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255,255,255,0.1);
   ">
      <div style="display: flex; align-items: center; gap: 10px;">
         <div style="
            width: 32px;
            height: 32px;
            background: rgba(255,255,255,0.2);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
         ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
         </div>
         <div>
            <div style="font-weight: 600;">Customer Support</div>
            <div style="font-size: 12px; opacity: 0.8;">Usually replies instantly</div>
         </div>
      </div>
      <span id="close-button" style="
         cursor: pointer;
         width: 32px;
         height: 32px;
         display: flex;
         align-items: center;
         justify-content: center;
         border-radius: 10px;
         background: rgba(255,255,255,0.2);
         transition: background 0.2s;
         font-size: 16px;
      ">✕</span>
   </div>

   <div id="chat-messages" style="
      flex: 1; 
      padding: 20px; 
      display: flex; 
      flex-direction: column; 
      background: #f8fafc;
      overflow-y: auto;
      gap: 8px;
   ">
      <!-- Welcome message -->
      <div style="
         background: #e2e8f0;
         color: #1e293b;
         padding: 12px 16px;
         border-radius: 18px;
         border-top-left-radius: 4px;
         max-width: 80%;
         align-self: flex-start;
         font-size: 14px;
         line-height: 1.5;
         margin-bottom: 8px;
         animation: slideIn 0.3s ease-out;
      ">
         👋 Hi there! How can I help you today?
      </div>
   </div>

   <div style="
      padding: 16px;
      background: #fff;
      border-top: 1px solid #e2e8f0;
      display: flex;
      gap: 10px;
      align-items: center;
   ">
      <input id="chat-input" type="text" 
         placeholder="Type your message..." 
         style="
            flex: 1; 
            padding: 12px 16px; 
            border: 1px solid #e2e8f0;
            border-radius: 30px;
            font-size: 14px;
            outline: none;
            transition: all 0.2s;
            background: #f8fafc;
         "
         onfocus="this.style.borderColor='#6366f1'; this.style.boxShadow='0 0 0 3px rgba(99,102,241,0.1)'"
         onblur="this.style.borderColor='#e2e8f0'; this.style.boxShadow='none'"
      >
      <button id="send-button" style="
         border: none;
         background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
         color: #fff;
         border-radius: 50%;
         width: 44px;
         height: 44px;
         cursor: pointer;
         display: flex;
         align-items: center;
         justify-content: center;
         transition: all 0.2s;
         box-shadow: 0 4px 6px -1px rgba(99,102,241,0.3);
      ">
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
         </svg>
      </button>
   </div>
   `;

   // Logic
   button.onclick = () => {
      if (box.style.display === "none" || !box.style.display) {
         box.style.display = "flex";
         // Add smooth entrance
         box.style.animation = "slideIn 0.3s ease-out";
      } else {
         box.style.display = "none";
      }
   }

   const closeButton = box.querySelector("#close-button");
   closeButton.onclick = () => {
      box.style.display = "none";
   }

   // Hover effect for close button
   closeButton.addEventListener('mouseenter', () => {
      closeButton.style.background = 'rgba(255,255,255,0.3)';
   });
   closeButton.addEventListener('mouseleave', () => {
      closeButton.style.background = 'rgba(255,255,255,0.2)';
   });

   const chatMessages = box.querySelector("#chat-messages");
   const chatInput = box.querySelector("#chat-input");
   const sendButton = box.querySelector("#send-button");

   function addMessage(message, sender = "user"){
      const messageElement = document.createElement("div");
      messageElement.className = 'chat-message';
      
      // Apply styles based on sender
      const baseStyles = {
         padding: "12px 16px",
         marginBottom: "8px",
         borderRadius: "18px",
         maxWidth: "80%",
         wordWrap: "break-word",
         fontSize: "14px",
         lineHeight: "1.5",
         animation: "slideIn 0.3s ease-out",
      };

      if(sender === "user"){
         Object.assign(messageElement.style, {
            ...baseStyles,
            backgroundColor: "#6366f1",
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            color: "#fff",
            alignSelf: "flex-end",
            marginLeft: "auto",
            borderBottomRightRadius: "4px",
         });
      } else {
         Object.assign(messageElement.style, {
            ...baseStyles,
            backgroundColor: "#e2e8f0",
            color: "#1e293b",
            alignSelf: "flex-start",
            borderBottomLeftRadius: "4px",
         });
      }
      
      messageElement.textContent = message;
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
   }

   // Send message on Enter key
   chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
         sendButton.click();
      }
   });

   sendButton.onclick = async () => {
      const input = chatInput.value.trim();
      if (input) {
         addMessage(input, "user");
         chatInput.value = "";
         
         // Show typing indicator with animation
         const typingIndicator = document.createElement("div");
         typingIndicator.className = 'typing-dots';
         typingIndicator.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
         `;
         typingIndicator.style.alignSelf = "flex-start";
         typingIndicator.style.marginBottom = "8px";
         chatMessages.appendChild(typingIndicator);
         chatMessages.scrollTop = chatMessages.scrollHeight;

         try {
            const res = await fetch(api_Url, {
               method: "POST",
               headers: {
                  "Content-Type": "application/json"
               },
               body: JSON.stringify({message: input, ownerId})
            });
            
            if (!res.ok) throw new Error('Network response was not ok');
            
            const data = await res.json();
            chatMessages.removeChild(typingIndicator);
            addMessage(data || "No response received.", "bot");
         } catch (error) {
            chatMessages.removeChild(typingIndicator);
            addMessage("Sorry, I'm having trouble connecting. Please try again.", "bot");
            console.error("Error:", error);
         }
      }
   }
})()