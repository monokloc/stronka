// --- Inicjalizacja HUD-a i zakładek ---
const startButton = document.getElementById("start-button");
const mainContent = document.getElementById("main-content");
const hud = document.getElementById("hud");
const animatedTextContainer = document.getElementById("animated-text-container");
const musicPlayer = document.getElementById("background-music");

startButton.addEventListener("click", () => {
    // Ukrywanie głównej zawartości i wyświetlanie HUD-a
    mainContent.style.display = "none";
    hud.style.display = "flex";

    // Animacja pojawiania się HUD-a
    hud.classList.add("fade-in");

    // Wyświetlanie animowanego napisu
    animatedTextContainer.style.display = "block";

    // Odtwarzanie muzyki
    startMusic();

    // Pokazanie pierwszej zakładki
    changeTabWithAnimation('main');
});

// --- Funkcje zakładek ---
function changeTabWithAnimation(tabId) {
    const currentTab = document.querySelector('.tab-pane.active');
    const nextTab = document.getElementById(tabId);

    if (currentTab === nextTab) return;

    // Animacja wyjścia dla obecnej zakładki
    currentTab.classList.add('slide-out');
    currentTab.addEventListener('animationend', function onSlideOut() {
        currentTab.classList.remove('active', 'slide-out');
        currentTab.removeEventListener('animationend', onSlideOut);

        // Animacja wejścia dla nowej zakładki
        nextTab.classList.add('active', 'slide-in');
        nextTab.addEventListener('animationend', function onSlideIn() {
            nextTab.classList.remove('slide-in');
            nextTab.removeEventListener('animationend', onSlideIn);
        });
    });
}

// --- Funkcje ładowania obrazu ---
function loadImage(event, containerId) {
    const file = event.target.files[0];
    if (!file) return;

    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgElement = document.createElement('img');
        imgElement.src = e.target.result;
        imgElement.alt = "Podgląd zdjęcia";
        imgElement.classList.add("image-preview");
        container.appendChild(imgElement);
    };
    reader.readAsDataURL(file);
}

// --- Funkcje muzyki z losowym odtwarzaniem w pętli ---
function startMusic() {
    const musicUrls = [
        'audio/muzyka1.mp3', // Pierwsza piosenka
        'audio/muzyka2.mp3', // Druga piosenka
        'audio/muzyka3.mp3', // Trzecia piosenka
        'audio/muzyka4.mp3'  // Czwarta piosenka
    ];

    // Funkcja do odtwarzania losowej piosenki
    function playRandomSong() {
        const randomIndex = Math.floor(Math.random() * musicUrls.length);
        musicPlayer.src = musicUrls[randomIndex];
        musicPlayer.play();
    }

    // Odtwarzanie pierwszej losowej piosenki
    playRandomSong();

    // Nasłuchiwanie zakończenia obecnej piosenki
    musicPlayer.addEventListener('ended', playRandomSong);

    // Ukrycie kontrolek muzyki (opcjonalnie)
    document.getElementById("music-controls").style.display = "none";
}


// --- Dodatkowe animacje ---
hud.addEventListener('animationend', () => {
    hud.classList.remove('fade-in');
});

startButton.addEventListener("mouseover", () => {
    startButton.classList.add("pulse");
});

startButton.addEventListener("mouseout", () => {
    startButton.classList.remove("pulse");
});

// Funkcja do otwierania linku do zaproszenia bota na Discorda
function addDiscordBot() {
    // Wstaw swój link do zaproszenia bota Discorda
    const discordBotInviteUrl = 'https://discord.com/oauth2/authorize?client_id=1278783716138946582&permissions=8&integration_type=0&scope=bot';
    
    // Otwórz link w nowej karcie
    window.open(discordBotInviteUrl, '_blank');
}
