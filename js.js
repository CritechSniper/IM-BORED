let progress = 0;

const notifier = document.getElementById('notifier');
const notifierp = document.getElementById('notifierp');
const containers = document.querySelectorAll('.container');
const messages = [
    "Bruh...", "Why are you still here?", "You must be really bored...",
    "Seriously, find something better to do.", "This is getting ridiculous.",
    "Are you just going to stare at this?", "I mean, I appreciate the attention, but come on.",
    "You could be doing literally anything else.", "Like, I don't know, watching paint dry?",
    "Or counting the number of tiles on your floor?", "Or maybe even staring at a wall?",
    "I mean, I get it, I'm pretty entertaining.", "But this is just sad.",
    "You know you can close this tab, right?", "Or maybe open a new one?",
    "I mean, I won't judge you if you do.", "But if you stay, I guess I can keep you company.",
    "Just don't expect too much from me.", "I'm just a simple website, after all.",
    "But hey, if you're bored, I'm here for you.", "So, what do you want to talk about?",
    "I mean, I can talk about anything.", "Like, I don't know, the weather?",
    "Or maybe your favorite color?", "Bruv listen, Don't expect me to show you anything interesting.",
    "I mean, I can try, but I'm not making any promises.", "But if you want to stick around, I'm all ears.",
    "Just don't expect too much from me.", "I mean, I'm just a simple website.",
    "You know what? IM DONE WITH THIS.", "...", "I literally said I was done.",
    "But here I am, looking at you hovering this damn box.",
];
let messageIndex = -1;

// Utility Functions
function resetNotifierAfterDelay() {
    setTimeout(() => {
        notifier.innerHTML = '';
        notifierp.innerHTML = '';
    }, 5000);
}

function setNotifier(message, subMessage, bg = 'black', color = 'lime') {
    notifier.innerHTML = message;
    notifierp.innerHTML = subMessage;
    notifier.style.backgroundColor = bg;
    notifier.style.color = color;
    notifierp.style.backgroundColor = bg;
    notifierp.style.color = color;
    resetNotifierAfterDelay();
}

// Container Hover Logic
containers.forEach(container => {
    const content = container.querySelector('.content');
    const originalContent = content.innerHTML;
    let hoverTimer;

    container.addEventListener('mouseenter', () => {
        hoverTimer = setTimeout(() => {
            messageIndex = (messageIndex + 1) % messages.length;
            content.innerHTML = messages[messageIndex];
            if (messageIndex === 32) {
                setNotifier('WHY ARE YOU STILL HERE?', 'BRUH...');
                progress++;
            }
        }, 100);
    });

    container.addEventListener('mouseleave', () => {
        content.innerHTML = originalContent;
        clearTimeout(hoverTimer);
    });
});

// Header Logic
const header = document.querySelector('header');
const headerh1 = document.getElementById('headerh1');
const headerp = document.getElementById('headerp');
const headerh1Text = headerh1.innerHTML;
const headerpText = headerp.innerHTML;
let prevStyle = window.getComputedStyle(header).backgroundColor;
let headerHoveredOnce = false;
let hoverTimer;

header.addEventListener('mouseenter', () => {
    if (headerHoveredOnce) return;
    header.style.backgroundColor = 'red';
    header.style.color = 'black';
    hoverTimer = setTimeout(() => {
        headerHoveredOnce = true;
        headerh1.innerHTML = 'Why?';
        headerp.innerHTML = 'Why are you here?';
        progress++;
    }, 10000);
});

header.addEventListener('mouseleave', () => {
    header.style.backgroundColor = prevStyle;
    header.style.color = '';
    headerh1.innerHTML = headerh1Text;
    headerp.innerHTML = headerpText;
    clearTimeout(hoverTimer);
});

header.addEventListener('dblclick', () => {
    setNotifier("DOUBLE CLICK???", "Okay hacker calm down.");
    progress++;
});

// Clicking on wrong container
document.querySelectorAll('.containers').forEach(c => {
    c.addEventListener('click', () => {
        if (!c.dataset.clicked) {
            c.dataset.clicked = true;
            setNotifier('YOUR AIM IS TRASH', 'U tried to click on the containers, but u missed...ryt?');
            progress++;
        }
    });
});

// Global Keypress Listener
let keyboardTriggered = false;
window.addEventListener('keydown', () => {
    if (!keyboardTriggered) {
        keyboardTriggered = true;
        setNotifier('TYPING???', 'Lemme guess...password is 1234?');
        progress++;
    }
});

// Footer Logic
const footer = document.querySelector('footer');
let footerClicked = false;

function footerClick() {
    if (footerClicked) return;
    footerClicked = true;
    setNotifier('YOU CLICKED THE FOOTER', 'I mean, I guess you can click it.', 'red', 'black');
    progress++;
}

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        if (!footerClicked) {
            footerClick();
        } else {
            setNotifier('Still scrolling, huh?', 'There’s literally nothing down there.', 'black', 'white');
        }
    }
});


// Idle Detection
let idleTimer;
function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        setNotifier('You alive?', 'You haven’t touched anything in a while...', 'gray', 'black');
    }, 20000);
}
['mousemove', 'keydown', 'scroll'].forEach(evt =>
    document.addEventListener(evt, resetIdleTimer)
);
resetIdleTimer();

// DevTools Detection
let devtoolsOpen = false;
const threshold = 160;
setInterval(() => {
    if (window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold) {
        if (!devtoolsOpen) {
            devtoolsOpen = true;
            setNotifier('HEY!', 'Stop inspecting me 😡', 'orange', 'black');
        }
    } else {
        devtoolsOpen = false;
    }
}, 1000);

// Secret Word Detection
let typedBuffer = '';
document.addEventListener('keydown', (e) => {
    if (e.key.length === 1) {
        typedBuffer += e.key.toLowerCase();
        if (typedBuffer.includes("i'm bored")) {
            setNotifier('I KNEW IT', 'You’re officially bored enough to talk to a website.', 'teal', 'white');
            typedBuffer = ''; // optional: reset after detection
        }
        // Optional: limit buffer size to prevent memory growth
        if (typedBuffer.length > 100) typedBuffer = typedBuffer.slice(-50);
    }
});


// Achievement Popup
function showAchievement(title, msg) {
    const popup = document.getElementById('achievementPopup');
    popup.innerHTML = `<div>${title}</div><div style="font-size: 0.9em; font-weight: normal;">${msg}</div>`;
    popup.style.display = 'block';

    // Auto-hide after 6 seconds
    setTimeout(() => {
        popup.style.display = 'none';
    }, 6000);
}

// Achievement System
function checkProgressBadges() {
    const badges = [
        { milestone: 5, title: '🎉 You unlocked: "Professional Loiterer"', msg: 'Congratulations! I guess?' },
        { milestone: 10, title: '🏆 You unlocked: "Master of Distraction"', msg: 'You really need to find a hobby.' },
        { milestone: 15, title: '🥇 You unlocked: "Ultimate Time Waster"', msg: 'Seriously, get a life.' },
        { milestone: 20, title: '🚀 You unlocked: "Intergalactic Procrastinator"', msg: 'You could be an astronaut with this level of distraction.' },
        { milestone: 25, title: '👑 You unlocked: "King/Queen of Avoidance"', msg: 'You deserve a throne for this.' },
    ];

    badges.forEach(badge => {
        if (progress === badge.milestone) {
            showAchievement(badge.title, badge.msg);
        }
    });
}


// Secret Command - Trigger for glowing effect
document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.altKey && e.code === 'KeyD') {
        setNotifier('SECRET UNLOCKED', 'You’re a hacker now.', 'purple', 'white');
        
        // Apply glowing effect to the header, containers, and footer
        applyGlowingEffect();
    }
});

// Function to apply the glowing effect
function applyGlowingEffect() {
    // Apply the glowing effect to the header
    const header = document.querySelector('header');
    header.style.boxShadow = '0 0 15px 5px orange';
    
    // Apply the glowing effect to all containers
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.style.boxShadow = '0 0 15px 5px orange';
    });
    
    // Apply the glowing effect to the footer
    const footer = document.querySelector('footer');
    footer.style.boxShadow = '0 0 15px 5px orange';
}
