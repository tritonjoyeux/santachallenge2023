window.onload = function () {
    if (window.innerWidth < (1555 * 0.8)) {
        document.getElementById("upScreen").style.display = "block";
        document.getElementById("gameScreen").style.display = "none";
    }

    window.addEventListener("resize", function () {
        if (window.innerWidth < (1555 * 0.8)) {
            document.getElementById("upScreen").style.display = "block";
            document.getElementById("gameScreen").style.display = "none";
        } else {
            document.getElementById("upScreen").style.display = "none";
            document.getElementById("gameScreen").style.display = "flex";
        }
    })


    state = 'menu';
    volume = 0.1;

    const choose = document.getElementById("choose");
    const select = document.getElementById("select");
    const vsSound = document.getElementById("vsSound");
    const spawnSound = document.getElementById("spawnSound");
    const spawn2Sound = document.getElementById("spawn2Sound");
    const theme = document.getElementById("theme");

    choose.volume = volume;
    select.volume = volume;
    vsSound.volume = volume;
    spawnSound.volume = volume;
    spawn2Sound.volume = volume;
    theme.volume = volume;

    document.getElementById("downloadImage").addEventListener("click", function () {
        html2canvas(document.getElementById("presentation"), {
            allowTaint: true,
            foreignObjectRendering: true
        }).then(canvas => {
            canvas.style.display = 'none'
            document.body.appendChild(canvas)
            return canvas
        }).then(canvas => {
            console.log(canvas)
            const image = canvas.toDataURL('image/png')
            const a = document.createElement('a')
            a.setAttribute('download', 'my-image.png')
            a.setAttribute('href', image)
            a.click()
            canvas.remove()
        })
    });

    document.getElementById("muteButton").addEventListener("click", function () {
        if (theme.volume === 0) {
            volume = 0.1;
            document.getElementById("muteButton").style.backgroundColor = "white";
        } else {
            volume = 0;
            document.getElementById("muteButton").style.backgroundColor = "grey";
        }
        select.volume = volume;
        vsSound.volume = volume;
        spawnSound.volume = volume;
        spawn2Sound.volume = volume;
        theme.volume = volume;
    })

    document.getElementById("playButton").addEventListener("click", function () {
        if (state !== 'menu') {
            return;
        }
        theme.play();
        document.getElementById("menu").classList.add("menuHide");
        setTimeout(() => {
            document.getElementById("menu").style.display = "none";
            document.getElementById("container").style.display = "block";
            document.getElementById("container").classList.add("gameShow");

            setTimeout(() => {
                choose.play();
                state = 'select';
            }, 1500)
        }, 3800)
    });

    document.getElementById("startGameButton").addEventListener("click", function () {
        state = 'presentation';
        document.getElementById("container").classList.remove("gameShow");
        document.getElementById("container").classList.add("gameHide");
        setTimeout(() => {
            spawnSound.play();
            document.getElementById("container").style.display = "none";
            document.getElementById("presentation").style.display = "flex";
            document.getElementById("presentationPlayerOne").src = santas[player1];
            document.getElementById("presentationNamePlayerOne").innerHTML = player1Name;
            document.getElementById("presentationPlayerTwo").src = santas[player2];
            document.getElementById("presentationNamePlayerTwo").innerHTML = player2Name;
            // document.getElementById("downloadImage").style.display = "flex";

            document.getElementById("presentationPlayerOne").classList.add("fromLeft");
            setTimeout(() => {
                spawn2Sound.play();
                document.getElementById("presentationPlayerTwo").classList.add("fromRight");
                setTimeout(() => {
                    vsSound.play();
                    document.getElementById("vs").classList.add("fromTop");
                    document.getElementById("myCanvasFire").style.display = "block";
                    document.getElementById("myCanvasIce").style.display = "block";
                    window.requestAnimationFrame(burn);
                    window.requestAnimationFrame(iceA);
                }, 500)
            }, 500);
        }, 750)
    });

    const domSantas = document.getElementsByClassName("santaImagesContainer");
    let santas = [];
    let santasNames = [];

    for (var i = 0; i < domSantas.length; i++) {
        const img = domSantas[i].getElementsByTagName("img")[0];
        santas.push(img.src);
        santasNames.push(domSantas[i].dataset.name);
    }

    player1 = null;
    player1Locked = false;
    player1Name = '';
    player2 = null;
    player2Locked = false;
    player2Name = '';

    var santaContainers = document.getElementsByClassName("santaImagesContainer");
    for (var i = 0; i < santaContainers.length; i++) {
        santaContainers[i].addEventListener("click", function () {
            if (state === 'menu') {
                return;
            }
            if (player1 !== this.dataset.id) {
                if (player1Locked)
                    return;
                player1 = this.dataset.id;
                player1Name = this.dataset.name;
                updateGame(1);
            } else {
                player1Locked = !player1Locked;
                if (player1Locked) {
                    select.play();
                }
                updateGame(1, true);
            }
        });
    }

    document.onkeydown = function (e) {
        e = e || window.event;
        if (state === 'menu') {
            return;
        }

        if (e.keyCode == '13') {
            // enter
            player2Locked = !player2Locked;
            if (player2Locked) {
                document.getElementById("select").play();
            }
            updateGame(2, true);
            return;
        }

        if (player2 === null) {
            player2 = 0;
            player2Name = santasNames[player2];
            updateGame(2);
            return;
        }

        if (player2Locked) {
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
            player2Name = santasNames[player2];
            updateGame(2);
        }
    };

    function updateGame(player, lock = false) {
        if (lock) {
            var santaImages = document.getElementsByClassName("santaImagesContainer");
            for (var image of santaImages) {
                if (image.dataset.id == player1) {
                    image.style.backgroundColor = "rgba(255, 0, 0, " + (player1Locked ? 1 : 0.5) + ")";
                    if (player2 == player1) {
                        image.style.backgroundColor = "purple";
                    }
                } else if (image.dataset.id == player2) {
                    image.style.backgroundColor = "rgba(0, 0, 255, " + (player2Locked ? 1 : 0.5) + ")";
                } else {
                    image.style.backgroundColor = "transparent";
                }
            }

            if (player1Locked && player2Locked) {
                document.getElementById("startGameButton").style.display = "flex";
            } else {
                document.getElementById("startGameButton").style.display = "none";
            }
            return;
        }
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
                image.style.backgroundColor = "rgba(255, 53, 55, " + (player1Locked ? 1 : 0.5) + ")";
                if (player2 == player1) {
                    image.style.backgroundColor = "purple";
                }
            } else if (image.dataset.id == player2) {
                image.style.backgroundColor = "rgba(40, 143, 233, " + (player2Locked ? 1 : 0.5) + ")";
            } else {
                image.style.backgroundColor = "transparent";
            }
        }
    }
}