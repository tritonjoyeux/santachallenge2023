window.onload = function () {
    state = 'menu';
    document.getElementById("playButton").addEventListener("click", function () {
        if (state !== 'menu') {
            return;
        }
        document.getElementById("theme").play();
        document.getElementById("menu").classList.add("menuHide");
        setTimeout(() => {
            document.getElementById("menu").style.display = "none";
            document.getElementById("container").style.display = "block";
            document.getElementById("container").classList.add("gameShow");

            setTimeout(() => {
                document.getElementById("choose").play();
                state = 'game';
            }, 1500)
        }, 3800)
    });

    const santas = [
        "assets/images/santa/chef.png",
        "assets/images/santa/steampunk.png",
        "assets/images/santa/cowboy.png",
        "assets/images/santa/detective.png",
        "assets/images/santa/magician.png",
        "assets/images/santa/rockstar.png",
        "assets/images/santa/scuba.png",
        "assets/images/santa/beach.png",
        "assets/images/santa/space.png",
        "assets/images/santa/steampunk2.png",
        "assets/images/santa/space2.png",
        "assets/images/santa/superhero.png",
        "assets/images/santa/chill.png",
        "assets/images/santa/futur.png",
        "assets/images/santa/medieval.png",
        "assets/images/santa/superhero2.png",
    ]

    const santaNames = [
        "Chef Santatouille",
        "Santa Steam",
        "Santa Lasso",
        "Santa Lock",
        "Magico Santa",
        "Santa Rock'n'Roll",
        "Santa Scuba",
        "Santa Beach",
        "Santa Pesquet",
        "Santa Gears",
        "Commander Claus",
        "Super Santa",
        "Santa Chill",
        "Santa Automate",
        "Knight Claus",
        "Santa Guardian",
    ];

    player1 = null;
    player1Name = '';
    player2 = null;
    player2Name = '';

    var santaContainers = document.getElementsByClassName("santaImagesContainer");
    for (var i = 0; i < santaContainers.length; i++) {
        santaContainers[i].addEventListener("click", function () {
            if (state === 'menu') {
                return;
            }
            if (player1 !== this.dataset.id) {
                player1 = this.dataset.id;
                player1Name = this.dataset.name;
                updateGame(1);
            }
        });
    }

    document.onkeydown = function (e) {
        e = e || window.event;
        if (state === 'menu') {
            return;
        }

        if (player2 === null) {
            player2 = 0;
            player2Name = santaNames[player2];
            updateGame(2);
            return;
        }

        if (e.keyCode == '38') {
            // up arrow
            if (player2 === 0 || player2 === 1) {
                player2 = 11;
            } else if (player2 < 6) {
                player2 += 10;
            } else {
                player2 -= 5;
            }
        }
        else if (e.keyCode == '40') {
            // down arrow
            if (player2 === 0 || player2 === 1) {
                player2 = 6;
            } else if (player2 < 11) {
                player2 += 5;
            } else if (player2 > 10) {
                player2 -= 10;
            }
        }
        else if (e.keyCode == '37') {
            // left arrow
            if (player2 < 6) {
                if (player2 === 0) {
                    player2 = 5;
                } else {
                    player2 -= 1;
                }
            } else if (player2 < 11) {
                if (player2 === 6) {
                    player2 = 10;
                } else {
                    player2 -= 1;
                }
            } else {
                if (player2 === 11) {
                    player2 = 15;
                } else {
                    player2 -= 1;
                }
            }
        }
        else if (e.keyCode == '39') {
            // right arrow
            if (player2 < 6) {
                if (player2 === 5) {
                    player2 = 0;
                } else {
                    player2 += 1;
                }
            } else if (player2 < 11) {
                if (player2 === 10) {
                    player2 = 6;
                } else {
                    player2 += 1;
                }
            } else {
                if (player2 === 15) {
                    player2 = 11;
                } else {
                    player2 += 1;
                }
            }
        }
        if (e.keyCode == '40' || e.keyCode == '38' || e.keyCode == '37' || e.keyCode == '39') {
            player2Name = santaNames[player2];
            updateGame(2);
        }
    };

    function updateGame(player) {
        const timeText = 300;
        console.log("update from " + player)
        if (player === 1) {
            document.getElementById("santaPlayer1").style.display = "block";
            const img1 = document.getElementById("player1")
            const name = document.getElementById("name1")

            name.classList.add("removeText");
            setTimeout(() => {
                name.innerHTML = player1Name;
                name.classList.remove("removeText");
                name.classList.add("addText");
                setTimeout(() => {
                    name.classList.remove("addText");
                }, timeText)
            }, timeText)

            img1.classList.add("player1");
            setTimeout(() => {
                img1.src = santas[player1];
                setTimeout(() => {
                    img1.classList.remove("player1");
                }, 150)
            }, 150)
        } else if (player === 2) {
            document.getElementById("santaPlayer2").style.display = "block";
            const img2 = document.getElementById("player2")
            const name = document.getElementById("name2")
            name.innerHTML = player2Name;

            name.classList.add("removeText");
            setTimeout(() => {
                name.innerHTML = player2Name;
                name.classList.remove("removeText");
                name.classList.add("addText");
                setTimeout(() => {
                    name.classList.remove("addText");
                }, timeText)
            }, timeText)

            img2.classList.add("player2");
            setTimeout(() => {
                img2.src = santas[player2];
                setTimeout(() => {
                    img2.classList.remove("player2");
                }, 150)
            }, 150)
        }

        var santaImages = document.getElementsByClassName("santaImagesContainer");
        for (var image of santaImages) {
            if (image.dataset.id == player1) {
                image.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
                if (player2 == player1) {
                    image.style.backgroundColor = "purple";
                }
            } else if (image.dataset.id == player2) {
                image.style.backgroundColor = "rgba(0, 0, 255, 0.5)";
            } else {
                image.style.backgroundColor = "transparent";
            }
        }
    }
}