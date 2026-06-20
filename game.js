let player = {
    day: 1,
    level: "Amateur",
    skill: 50,
    stamina: 100,
    confidence: 50,
    money: 1000,
    reputation: 50,
    injured: false,
    injuryDays: 0
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

    if (player.injured) {
        player.injuryDays--;
        if (player.injuryDays <= 0) {
            player.injured = false;
            log("💪 You recovered from your injury.");
        } else {
            log("🏥 Still injured (" + player.injuryDays + " days left)");
        }
    }

    checkCareer();
}

function checkCareer() {
    if (player.skill > 120 && player.level === "Amateur") {
        player.level = "National";
        log("🏆 You advanced to NATIONAL level!");
    }
    if (player.skill > 200 && player.level === "National") {
        player.level = "Pro";
        log("🔥 You are now a PRO rider!");
    }
}

function train() {
    if (player.injured) {
        log("❌ You can't train while injured.");
        return;
    }

    player.skill += Math.random() * 5;
    player.stamina -= 15;
    player.confidence += 2;

    log("🏋️ You trained hard.");

    nextDay();
    updateUI();
}

function rest() {
    player.stamina += 25;
    if (player.stamina > 100) player.stamina = 100;

    player.confidence -= 2;

    log("😴 You rested.");

    nextDay();
    updateUI();
}

function race() {
    if (player.injured) {
        log("❌ You're injured and can't race.");
        return;
    }

    if (player.stamina < 30) {
        log("❌ Too tired to race.");
        return;
    }

    let strategy = prompt("Strategy: aggressive / balanced / safe");

    let risk = 1;
    let crashChance = 0.2;

    if (strategy === "aggressive") {
        risk = 1.3;
        crashChance = 0.35;
    } else if (strategy === "safe") {
        risk = 0.8;
        crashChance = 0.1;
    }

    let performance =
        (player.skill * risk) +
        player.confidence +
        (player.stamina * 0.3) +
        (Math.random() * 20);

    if (Math.random() < crashChance) {
        log("💥 You CRASHED!");

        player.confidence -= 15;
        player.stamina -= 20;
        player.reputation -= 10;

        if (Math.random() < 0.5) {
            player.injured = true;
            player.injuryDays = 2 + Math.floor(Math.random() * 3);
            log("🏥 You're injured for " + player.injuryDays + " days!");
        }

        log("🗞️ Media: 'Too aggressive and reckless.'");
    } else {
        if (performance > 140) {
            log("🥇 You WON!");
            player.money += 600;
            player.reputation += 10;
            player.confidence += 10;
        } else if (performance > 110) {
            log("🥈 Strong finish.");
            player.money += 300;
            player.reputation += 5;
        } else {
            log("😐 Mid-pack.");
            player.reputation -= 2;
        }
    }

    if (player.reputation < 30) {
        log("🗞️ Fans are losing trust.");
    } else if (player.reputation > 80) {
        log("🗞️ You're becoming a star!");
    }

    player.stamina -= 30;

    nextDay();
    updateUI();
}

updateUI();
