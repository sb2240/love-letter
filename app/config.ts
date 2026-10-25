const herName = "Kofoworola";

export const config = {
  // Personalization
  herName, 
  
  // The step-by-step messages
  screens: [
    {
      text: `Hey ${herName}...`,
      subtext: "I hope you're having a beautiful day. I built this tiny place just for you.",
      buttonText: "There's something I want to ask you",
    },
    {
      text: "I've really enjoyed getting to know you lately.",
      subtext: "Every time we talk, I find myself smiling long after the conversation ends.",
      buttonText: "Keep going",
    },
    {
      text: "You have this incredible energy...",
      subtext: "And honestly, you make my days a whole lot brighter.",
      buttonText: "Next",
    },
    {
      text: "I don't know if you've noticed, but I've started seeing you as more than just someone I talk to.",
      subtext: "I've been thinking about this for a while now.",
      buttonText: "Ask me",
    }
  ],

  // The Final Question
  finalQuestion: "Will you be my girlfriend?",
  yesButton: "Yes ❤️",
  maybeButton: "Maybe...",

  // The Outcomes
  successMessage: "Okay... you just made me very happy ❤️",
  successButton: "Reply on WhatsApp 😊",
  // Nigerian international format: country code 234, without the local leading zero.
  successLink: "https://wa.me/2349046439767?text=" + encodeURIComponent("Yes ❤️ I read your letter."),

  maybeMessage: "No pressure. I just wanted you to know how I feel ❤️",

  // Settings
  colors: {
    text: "text-stone-800",
    

    primaryButton: "bg-rose-700 border-rose-900",
    

    secondaryButton: "bg-stone-600 border-stone-800",
  }
};
