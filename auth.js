// =======================
// Firebase Config
// =======================
const firebaseConfig = {
  apiKey: "AIzaSyDShGmV4u0ifflwod9hT_p4OPV9B9jWYhM",
  authDomain: "wealthwarriors.firebaseapp.com",
  projectId: "wealthwarriors",
  storageBucket: "wealthwarriors.firebasestorage.app",
  messagingSenderId: "508232394573",
  appId: "1:508232394573:web:0169f8d79caba8f780f904",
  measurementId: "G-9GMDB64JPQ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// =======================
// Helper Functions
// =======================
function showMessage(element, message, isError = true) {
  if (!element) return;
  element.textContent = message;
  element.style.color = isError ? 'red' : 'green';
}

function clearMessages(errorMsg, messageMsg) {
  if (errorMsg) errorMsg.textContent = '';
  if (messageMsg) messageMsg.textContent = '';
}

function updateNavbarButton() {
  const authBtn = document.getElementById("auth-btn");
  if (!authBtn) return;

  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));

  if (loggedInUser) {
    authBtn.style.display = "none"; // hide button if logged in
  } else {
    authBtn.style.display = "inline-block";
    authBtn.textContent = "Login";
    authBtn.onclick = () => window.location.href = "login.html";
  }
}

// =======================
// Monitor Auth State
// =======================
auth.onAuthStateChanged((user) => {
  if (user) {
    // Store user in localStorage
    window.localStorage.setItem('loggedInUser', JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || ''
    }));
  } else {
    window.localStorage.removeItem('loggedInUser');
  }

  // Always update navbar after auth state changes
  updateNavbarButton();
});

// =======================
// Google Sign-In
// =======================
const googleLoginBtn = document.getElementById('googleLoginBtn');
if (googleLoginBtn) {
  googleLoginBtn.addEventListener('click', async () => {
    clearMessages(errorMsg, messageMsg);
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      window.location.href = "index.html";
    } catch (error) {
      showMessage(errorMsg, `Google Sign-in failed: ${error.message}`);
    }
  });
}

// =======================
// Email Link Sign-In
// =======================
const emailInput = document.getElementById('emailInput');
const sendSignInLinkBtn = document.getElementById('sendSignInLinkBtn');

if (sendSignInLinkBtn) {
  sendSignInLinkBtn.addEventListener('click', async () => {
    clearMessages(errorMsg, messageMsg);
    const email = emailInput.value;
    if (!email) {
      showMessage(errorMsg, "Please enter your email address.");
      return;
    }

    const actionCodeSettings = {
      url: window.location.origin + "/login.html",
      handleCodeInApp: true
    };

    try {
      await auth.sendSignInLinkToEmail(email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      showMessage(messageMsg, `Sign-in link sent to ${email}.`, false);
    } catch (error) {
      showMessage(errorMsg, `Error: ${error.message}`);
    }
  });
}

// =======================
// Handle Email Link Sign-In
// =======================
if (auth.isSignInWithEmailLink(window.location.href)) {
  let email = window.localStorage.getItem('emailForSignIn');
  if (!email) email = window.prompt('Please provide your email for confirmation:');

  auth.signInWithEmailLink(email, window.location.href)
    .then((result) => {
      window.localStorage.removeItem('emailForSignIn');
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Email link sign-in failed:", error);
    });
}

// =======================
// Logout
// =======================
function logoutUser() {
  auth.signOut().then(() => {
    window.localStorage.removeItem('loggedInUser');
    window.location.href = "login.html";
  }).catch((error) => console.error("Logout failed:", error));
}

// =======================
// Initial Navbar Update
// =======================
document.addEventListener("DOMContentLoaded", () => {
  updateNavbarButton();
});
