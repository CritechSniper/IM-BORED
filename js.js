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


////////////////////////////////////////////////////////
// Notifier Style Reset Function
function resetNotifierAfterDelay() {
    setTimeout(() => {
        notifier.innerHTML = '';
        notifierp.innerHTML = '';
    }, 5000);
}

// Default notifier style
function setNotifier(message, subMessage) {
    notifier.innerHTML = message;
    notifier.style.backgroundColor = 'black';
    notifier.style.color = 'lime';
    notifierp.innerHTML = subMessage;
    notifierp.style.backgroundColor = 'black';
    notifierp.style.color = 'lime';
    resetNotifierAfterDelay();
}


////////////////////////////////////////////////////////
// Container Hover Logic
containers.forEach(container => {
    const content = container.querySelector('.content');
    let originalContent = content.innerHTML;
    let hoverTimer;

    container.addEventListener('mouseenter', () => {
        hoverTimer = setTimeout(() => {
            messageIndex = (messageIndex + 1) % messages.length;
            content.innerHTML = messages[messageIndex];
            console.log('Hovered container!');

            if (messageIndex === 32) {
                setNotifier('WHY ARE YOU STILL HERE?', 'BRUH...');
                console.log('%cNotifier Marked!', 'color: red; font-size: 20px; font-weight: bold; text-decoration: underline;');
                progress += 1;
                console.log(progress);
            }
        }, 10000);
    });

    container.addEventListener('mouseleave', () => {
        content.innerHTML = originalContent;
        clearTimeout(hoverTimer);
    });
});


////////////////////////////////////////////////////////
// Header Logic
const header = document.querySelector('header');
const headerh1 = document.getElementById('headerh1');
const headerp = document.getElementById('headerp');
const headerh1Text = headerh1.innerHTML;
const headerpText = headerp.innerHTML;
let prevStyle = window.getComputedStyle(header).backgroundColor;
let headerHoveredOnce = false;

header.addEventListener('mouseenter', () => {
    if (headerHoveredOnce) return;
    header.style.backgroundColor = 'red';
    header.style.color = 'black';
    hoverTimer = setTimeout(() => {
        headerHoveredOnce = true;
        headerh1.innerHTML = 'Why?';
        headerp.innerHTML = 'Why are you here?';
        console.log('%cNotifier Marked!', 'color: red; font-size: 20px; font-weight: bold; text-decoration: underline;');
        progress += 1;
        console.log(progress);
    }, 10000);
});

header.addEventListener('mouseleave', () => {
    header.style.backgroundColor = prevStyle;
    header.style.color = '';
    headerh1.innerHTML = headerh1Text;
    headerp.innerHTML = headerpText;
    clearTimeout(hoverTimer);
});

// Dblclick on header
header.addEventListener('dblclick', () => {
    setNotifier("DOUBLE CLICK???", "Okay hacker calm down.");
    console.log('%cNotifier Marked!', 'color: red; font-size: 20px; font-weight: bold; text-decoration: underline;');
    progress += 1;
    console.log(progress);
});


////////////////////////////////////////////////////////
// Click on Wrong Container (".containers")
const containerss = document.querySelectorAll('.containers');
let containersClicked = false;

function containersClick() {
    if (containersClicked) return;
    containersClicked = true;
    setNotifier('YOUR AIM IS TRASH', 'U tried to click on the containers, but u missed...ryt?');
    console.log('%cNotifier Marked!', 'color: red; font-size: 20px; font-weight: bold; text-decoration: underline;');
    progress += 1;
    console.log(progress);
}
containerss.forEach(c => c.addEventListener('click', containersClick));


////////////////////////////////////////////////////////
// Global Keyboard Listener for Funny Surprise
let keyboardTriggered = false;
window.addEventListener('keydown', () => {
    if (keyboardTriggered) return;
    keyboardTriggered = true;

    setNotifier('TYPING???', 'Lemme guess...password is 1234?');
    console.log('%cNotifier Marked!', 'color: red; font-size: 20px; font-weight: bold; text-decoration: underline;');
    progress += 1;
    console.log(progress);
});

////////////////////////////////////////////////////////
// Footer Logic
const footer = document.querySelector('footer');
let footerClicked = false; // 🔥 Track click only once

function footerClick() {
    if (footerClicked) return; // Prevent multiple executions
    footerClicked = true;
    notifier.innerHTML = 'YOU CLICKED THE FOOTER';
    notifier.style.color = 'black';
    notifier.style.backgroundColor = 'red';
    notifierp.innerHTML = 'I mean, I guess you can click it.';
    notifierp.style.color = 'black';
    notifierp.style.backgroundColor = 'red';

    console.log('%cNotifier Marked!', 'color: red; font-size: 20px; font-weight: bold; text-decoration: underline;');
    progress += 1;
    console.log(progress);

    console.log('Clicked on the footer!');

    setTimeout(() => {
        notifier.innerHTML = '';
        notifierp.innerHTML = '';
    }, 5000);
}

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        if (!footerClicked) {
            footerClick(); // Trigger on first scroll to bottom
        } else {
            notifier.innerHTML = 'Still scrolling, huh?';
            notifierp.innerHTML = 'There’s literally nothing down there.';
            notifier.style.backgroundColor = 'black';
            notifier.style.color = 'white';
            notifierp.style.backgroundColor = 'black';
            notifierp.style.color = 'white';

            setTimeout(() => {
                notifier.innerHTML = '';
                notifierp.innerHTML = '';
            }, 5000);
        }
    }
});

////////////////////////////////////////////////////////
// Progress Achievement System
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
            notifier.innerHTML = badge.title;
            notifierp.innerHTML = badge.msg;
            notifier.style.backgroundColor = '#0f0'; // Lime-green bg
            notifier.style.color = 'black';
            notifierp.style.backgroundColor = '#0f0';
            notifierp.style.color = 'black';
            resetNotifierAfterDelay();
        }
    });
}

setInterval(checkProgressBadges, 1000); // Constantly monitor progress
