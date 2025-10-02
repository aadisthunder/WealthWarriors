// ------------------------------
// Load header + sidebar layout
// ------------------------------
window.addEventListener('DOMContentLoaded', () => {
  fetch('layout.html')
    .then(response => response.text())
    .then(data => {
      // Insert layout into placeholder
      document.getElementById('layout-placeholder').innerHTML = data;

      // Initialize sidebar toggle and overlay
      initLayout();

      // Initialize auth button after layout is loaded
      initAuthButton();
    })
    .catch(err => console.error('Error loading layout:', err));

  // Display notices after DOM is loaded
  displayNotices();
});

// ------------------------------
// Initialize Sidebar Toggle
// ------------------------------
function initLayout() {
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  sidebarToggle?.addEventListener("click", () => { 
    sidebar.classList.toggle("active"); 
    overlay.classList.toggle("active"); 
  });

  overlay?.addEventListener("click", () => { 
    sidebar.classList.remove("active"); 
    overlay.classList.remove("active"); 
  });

  document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('active'); 
      overlay.classList.remove('active');
    });
  });
}

// ------------------------------
// Notices Data
// ------------------------------
const noticesData = [
  {title:"Zomato Update",description:"Price hike by few percentage",media:[{type:"image",url:"assets/NSEbg.jpg"}],timestamp:"2025-10-01T10:00:00Z"},
  {title:"Investment Tips",description:"Diversify your portfolio to minimize risk.",media:[],timestamp:"2025-09-30T14:30:00Z"},
  {title:"Meeting Announcement",description:"Join for Free",media:[{type:"video",url:"assets/angrygamer.mp4"}],timestamp:"2025-09-29T09:15:00Z"},
  {title:"Market Update",description:"Stocks surged today as tech led the rally.",media:[{type:"image",url:"assets/team.jpg"}],timestamp:"2025-10-01T10:00:00Z"},
  {title:"Investment Tips",description:"Diversify your portfolio to minimize risk.",media:[],timestamp:"2025-09-30T14:30:00Z"},
  {title:"Webinar Announcement",description:"Join our free webinar on advanced trading strategies.",media:[{type:"video",url:"assets/cryingmeme.mp4"}],timestamp:"2025-09-29T09:15:00Z"}
];

// ------------------------------
// Time ago function
// ------------------------------
function timeAgo(date){
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if(seconds<60) return `${seconds} sec ago`;
  const minutes = Math.floor(seconds/60);
  if(minutes<60) return `${minutes} min ago`;
  const hours = Math.floor(minutes/60);
  if(hours<24) return `${hours} hr ago`;
  const days = Math.floor(hours/24);
  return `${days} day${days>1?'s':''} ago`;
}

// ------------------------------
// Render notice
// ------------------------------
function renderNotice(data){
  const card = document.createElement('div');
  card.className = 'notice-card';
  const h3 = document.createElement('h3'); 
  h3.textContent = data.title || 'Untitled';
  const p = document.createElement('p'); 
  p.textContent = data.description || '';
  card.appendChild(h3);

  if(Array.isArray(data.media) && data.media.length){
    const mediaContainer = document.createElement('div');
    mediaContainer.className = 'notice-media';
    data.media.forEach(item => {
      if(item.type === 'image'){
        const img = document.createElement('img'); 
        img.src = item.url; 
        mediaContainer.appendChild(img);
      } else if(item.type === 'video'){
        const vid = document.createElement('video'); 
        vid.src = item.url; 
        vid.controls = true; 
        mediaContainer.appendChild(vid);
      }
    });
    card.appendChild(mediaContainer);
  }

  if(data.timestamp){
    const timeNode = document.createElement('div'); 
    timeNode.className = 'notice-time';
    timeNode.textContent = timeAgo(new Date(data.timestamp));
    card.appendChild(timeNode);
  }

  card.appendChild(p);
  return card;
}

// ------------------------------
// Display notices
// ------------------------------
function displayNotices(){
  const container = document.getElementById('noticesContainer');
  if(!container) return;
  container.innerHTML = '';
  noticesData.forEach(n => container.appendChild(renderNotice(n)));
}

// ------------------------------
// Smooth scroll
// ------------------------------
document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if(target){ window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' }); }
  });
});

// ------------------------------
// Scroll-to-top
// ------------------------------
document.querySelector('.scroll-top')?.addEventListener('click', () => { 
  window.scrollTo({ top: 0, behavior: 'smooth' }); 
});

// ------------------------------
// Navigation buttons
// ------------------------------
document.getElementById('about-btn')?.addEventListener('click', () => { 
  window.location.href = 'about.html'; 
});
document.getElementById('contact-btn')?.addEventListener('click', () => { 
  window.location.href = 'contact.html'; 
});
