let player = {
    day: 1,
    level: "Amateur",
    skill: 50,
    stamina: 100,
    confidence: 50,
    money: 1000,
    reputation: 50
};

function updateUI() {
    document.getElementById("day").innerText = player.day;
    document.getElementById("level").innerText = player.level;
    document.getElementById("skill").innerText = Math.floor(player.skill);
    document.getElementById("stamina").innerText = Math.floor(player.stamina);
    document.getElementById("confidence").innerText = Math.floor(player.confidence);
    document.getElementById("money").innerText = player.money;
}

function log(msg) {
    let logDiv = document.getElementById("log");
    logDiv.innerHTML += "<p>" + msg + "</p>";
    logDiv.scrollTop = logDiv.scrollHeight;
}

function nextDay() {
    player.day++;
    checkCareerProgression();
}

function checkCareerProgression() {
    if (player.skill > 120 && player.level === "Amateur") {
        player.level = "National";
        log("🏆 You moved up to NATIONAL level!");
    }
    if (player.skill > 200 && player.level === "National") {
        player.level = "Pro";
        log("🔥 You're now a PROFESSIONAL rider!");
    }
}

function train() {
    player.skill += Math.random() * 4;
    player.stamina -= 15;
    player.confidence += 2;

    log("🏋️ You trained hard and improved your skills.");

    nextDay();
    updateUI();
}

function rest() {
    player.stamina += 25;
    player.confidence -= 2;

    if (player.stamina > 100) player.stamina = 100;

    log("😴 You rested and recovered stamina.");

    nextDay();
    updateUI();
}

function race() {
    if (player.stamina < 30) {
        log("❌ Too exhausted to race.");
        return;
    }

    let strategy = prompt("Choose strategy: aggressive / balanced / safe");

    let risk = 1;
    let crashChance = 0.2;

    if (strategy === "aggressive") {
        risk = 1.3;
        crashChance = 0.35;
    } else if (strategy === "safe") {
        risk = 0.8;
        crashChance = 0.1;
    }

    let trackDifficulty = Math.random();
    let trackName = "";

    if (trackDifficulty < 0.33) {
        trackName = "Easy Track";
    } else if (trackDifficulty < 0.66) {
        trackName = "Technical Track";
        crashChance += 0.05;
    } else {
        trackName = "Mud Track";
        crashChance += 0.1;
    }

    log("🏁 Racing on: " + trackName);

    let form = Math.random() * 20;

    let performance =
        (player.skill * risk) +
        form +
        player.confidence +
        (player.stamina * 0.3);

    if (Math.random() < crashChance) {
        log("💥 You crashed!");
        player.confidence -= 15;
        player.stamina -= 25;
        player.reputation -= 5;

        log("🗞️ Media: 'He’s making too many mistakes.'");
    } else {
        if (performance > 140) {
            log("🥇 You WON the race!");
            player.money += 600;
            player.confidence += 12;
            player.reputation += 10;
        } else if (performance > 110) {
            log("🥈 Great result!");
            player.money += 300;
            player.confidence += 6;
            player.reputation += 5;
        } else {
            log("😐 Average performance.");
            player.confidence -= 3;
            player.reputation -= 2;
        }
    }

    // criticism system
    if (player.reputation < 30) {
        log("🗞️ Media: 'Fans are losing faith.'");
    } else if (player.reputation > 80) {
        log("🗞️ Media: 'A future champion is rising.'");
    }

    player.stamina -= 35;

    nextDay();
    updateUI();
}

updateUI();