import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";

const styles = {
    root: {
        minHeight: "100vh",
        height: "100vh",
        background: "linear-gradient(180deg, #0d001a 0%, #000 100%)",
        color: "white",
        margin: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "stretch",
        fontFamily: "'Roboto Mono', monospace"
    },
    top: {
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12
    },
    logo: {
        width: 320,
        height: 320,
        filter: "drop-shadow(0 0 36px #9a36e8)"
    },
    box: {
        color: "#fff",
        height: "22em",
        width: "32em",
        maxWidth: "85%",
        maxHeight: "80%",
        background: "rgba(42, 0, 80, 0.8)",
        borderRadius: "1em",
        border: "2px solid #9a36e8",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        overflow: "hidden",
        fontWeight: "bold",
        fontSize: 20,
        margin: 10,
        textAlign: "center",
        padding: 16,
        cursor: "pointer",
        boxShadow: "0 0 20px rgba(154, 54, 232, 0.4)"
    },
    input: {
        cursor: "pointer",
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        opacity: 0
    },
    display: {
        width: "100%",
        height: "100%",
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 0,
        minWidth: 0
    },
    game: {
        width: "100%",
        height: "100%",
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
};

const LOGO_SRC = "PlayBankGames.svg";

// Lista de jogos
const games = [
    { title: "Pokémon FireRed (GBA)", romUrl: "games/firered.gba", image: "/firered.jpeg" },
    { title: "Sonic Advance 2 (GBA)", romUrl: "games/sonadv2.gba", image: "/sonicadvance2.png" },
    { title: "Super Mario 64 (N64)", romUrl: "games/sm64.n64", image: "/mario64.jpg" },
];

const cardStyles = {
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 24,
        marginTop: 32,
        marginBottom: 16
    },
    card: {
        background: "linear-gradient(135deg, #2a0050 0%, #140028 100%)",
        borderRadius: 20,
        boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
        width: 180,
        cursor: "pointer",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "all 0.25s ease",
        border: "2px solid #3a0060"
    },
    cardHover: {
        transform: "scale(1.06)",
        boxShadow: "0 6px 28px rgba(154,54,232,0.6)",
        border: "2px solid #9a36e8"
    },
    image: {
        width: 130,
        height: 100,
        objectFit: "cover",
        borderRadius: 10,
        marginBottom: 12,
        boxShadow: "0 2px 10px #0006"
    },
    title: {
        textAlign: "center",
        color: "#fff",
        fontWeight: 600,
        fontSize: 15,
        marginTop: 6,
        lineHeight: 1.2
    }
};

function GamesPage() {
    const [showCards, setShowCards] = React.useState(true);
    const navigate = useNavigate();
    const boxRef = useRef(null);
    const inputRef = useRef(null);
    const displayRef = useRef(null);
    const gameRef = useRef(null);
    const topRef = useRef(null);

    useEffect(() => {
        let enableDebug = false;
        let enableThreads = false;
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.get("debug") === "1" || urlParams.get("debug") === "true") enableDebug = true;
        if ((urlParams.get("threads") === "1" || urlParams.get("threads") === "true") && window.SharedArrayBuffer) enableThreads = true;

        async function loadGame(upload, file) {
            const input = inputRef.current;
            const box = boxRef.current;
            const url = upload ? input.files[0] : file;
            const nameParts = upload ? input.files[0].name.split(".") : file.split(".");
            const gameName = nameParts.shift();
            const ext = nameParts.pop();

            const core = await getCoreByExtension(ext, box);

            if (topRef.current) topRef.current.style.display = "none";
            if (box) box.style.display = "none";
            setShowCards(false);

            window.EJS_player = "#game";
            window.EJS_gameName = gameName;
            window.EJS_biosUrl = "";
            window.EJS_gameUrl = upload ? URL.createObjectURL(url) : url;
            window.EJS_core = core;
            window.EJS_pathtodata = "/EmulatorPlus/data/";
            window.EJS_startOnLoaded = true;
            window.EJS_DEBUG_XX = enableDebug;
            window.EJS_disableDatabases = true;
            window.EJS_threads = enableThreads;

            const script = document.createElement("script");
            script.src = "/EmulatorPlus/data/loader.js";
            document.body.appendChild(script);
        }

        async function getCoreByExtension(ext, box) {
            const mapping = {
                fds: "nes", nes: "nes", smc: "snes", sfc: "snes",
                z64: "n64", n64: "n64", pce: "pce", ngp: "ngp", ws: "ws",
                gba: "gba", gb: "gb", nds: "nds", col: "coleco", d64: "vice_x64sc", bin: "psx"
            };
            if (mapping[ext]) return mapping[ext];

            return new Promise(resolve => {
                box.innerHTML = "";
                const select = document.createElement("select");
                const coreValues = {
                    "Nintendo 64": "n64", "Nintendo Game Boy": "gb", "Nintendo Game Boy Advance": "gba",
                    "Nintendo DS": "nds", NES: "nes", SNES: "snes", PlayStation: "psx"
                };
                Object.keys(coreValues).forEach(key => {
                    const option = document.createElement("option");
                    option.value = coreValues[key];
                    option.textContent = key;
                    select.appendChild(option);
                });
                const button = document.createElement("button");
                button.textContent = "Load game";
                button.onclick = () => resolve(select.value);
                box.appendChild(select);
                box.appendChild(button);
            });
        }

        const box = boxRef.current;
        if (box) {
            box.ondragover = () => box.setAttribute("drag", true);
            box.ondragleave = () => box.removeAttribute("drag");
        }
        const input = inputRef.current;
        if (input) input.onchange = () => loadGame(true);

        if (urlParams.get("rom")) loadGame(false, urlParams.get("rom"));
    }, []);

    const handleCardClick = (romUrl) => {
        setShowCards(false);
        const parts = romUrl.split(".");
        const gameName = parts.shift();
        const ext = parts.pop();
        const box = boxRef.current;

        const load = async () => {
            const mapping = {
                fds: "nes", nes: "nes", smc: "snes", sfc: "snes",
                z64: "n64", n64: "n64", pce: "pce", ngp: "ngp", ws: "ws",
                gba: "gba", gb: "gb", nds: "nds", col: "coleco", d64: "vice_x64sc", bin: "psx"
            };
            const core = mapping[ext] || "nes";

            if (topRef.current) topRef.current.style.display = "none";
            if (box) box.style.display = "none";

            window.EJS_player = "#game";
            window.EJS_gameName = gameName;
            window.EJS_biosUrl = "";
            window.EJS_gameUrl = romUrl;
            window.EJS_core = core;
            window.EJS_pathtodata = "/EmulatorPlus/data/";
            window.EJS_startOnLoaded = true;

            const script = document.createElement("script");
            script.src = "/EmulatorPlus/data/loader.js";
            document.body.appendChild(script);
        };
        load();
    };

    return (
        <div style={styles.root}>
            {/* Botão de voltar no canto superior direito */}
            <div style={{ position: "absolute", top: 24, right: 32, zIndex: 10 }}>
                <button
                    onClick={() => navigate("/exercicios")}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        outline: "none"
                    }}
                    title="Voltar"
                >
                    <IoArrowBackCircle size={54} color="#9a36e8" style={{ filter: "drop-shadow(0 0 8px #9a36e8)" }} />
                </button>
            </div>
            <div id="top" ref={topRef} style={styles.top}>
                <img src={LOGO_SRC} alt="Logo" style={styles.logo} />
            </div>
            <div id="box" ref={boxRef} style={{ ...styles.box, display: "none" }}>
                <input type="file" ref={inputRef} style={styles.input} />
            </div>
            {showCards && (
                <div style={cardStyles.container}>
                    {games.map((game, index) => (
                        <div
                            key={index}
                            style={cardStyles.card}
                            onClick={() => handleCardClick(game.romUrl)}
                            onMouseOver={e => Object.assign(e.currentTarget.style, cardStyles.cardHover)}
                            onMouseOut={e => Object.assign(e.currentTarget.style, cardStyles.card)}
                        >
                            <img src={game.image} alt={game.title} style={cardStyles.image} />
                            <div style={cardStyles.title}>{game.title}</div>
                        </div>
                    ))}
                </div>
            )}
            <div id="display" ref={displayRef} style={styles.display}>
                <div id="game" ref={gameRef} style={styles.game}></div>
            </div>
        </div>
    );
}

export default GamesPage;
