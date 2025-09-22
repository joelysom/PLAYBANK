(async function() {
    // Lista de scripts a serem carregados dinamicamente
    const scripts = [
        "emulator.js",
        "nipplejs.js",
        "shaders.js",
        "storage.js",
        "gamepad.js",
        "GameManager.js",
        "socket.io.min.js",
        "compression.js"
    ];

    /**
     * Função para extrair o caminho da pasta a partir de um caminho de arquivo.
     * @param {string} path - Caminho completo do arquivo.
     * @returns {string} - Caminho da pasta onde o arquivo está localizado.
     */
    const folderPath = (path) => path.substring(0, path.length - path.split('/').pop().length);

    // Determina o caminho do script com base na variável global ou no caminho do script atual
    let scriptPath = (typeof window.EJS_pathtodata === "string") ? window.EJS_pathtodata : folderPath((new URL(document.currentScript.src)).pathname);
    if (!scriptPath.endsWith('/')) scriptPath+='/';

    /**
     * Função para carregar um script de forma assíncrona.
     * @param {string} file - Nome do arquivo de script a ser carregado.
     * @returns {Promise} - Promessa que será resolvida quando o script for carregado.
     */
    function loadScript(file) {
        return new Promise(function (resolve, reject) {
            let script = document.createElement('script');
            script.src = function() {
                if ('undefined' != typeof EJS_paths && typeof EJS_paths[file] === 'string') {
                    return EJS_paths[file];  // Usando caminho fornecido por EJS_paths, se disponível
                } else if (file.endsWith("emulator.min.js")) {
                    return scriptPath + file;
                } else {
                    return scriptPath + "src/" + file;
                }
            }();
            script.onload = resolve;
            script.onerror = () => {
                // Caso o script falhe ao carregar, tenta carregar arquivos faltando
                filesmissing(file).then(e => resolve());
            }
            document.head.appendChild(script);  // Adiciona o script ao cabeçalho do documento
        })
    }

    /**
     * Função para carregar um arquivo de estilo CSS de forma assíncrona.
     * @param {string} file - Nome do arquivo CSS a ser carregado.
     * @returns {Promise} - Promessa que será resolvida quando o estilo for carregado.
     */
    function loadStyle(file) {
        return new Promise(function(resolve, reject) {
            let css = document.createElement('link');
            css.rel = 'stylesheet';
            css.href = function() {
                if ('undefined' != typeof EJS_paths && typeof EJS_paths[file] === 'string') {
                    return EJS_paths[file];  // Usando caminho fornecido por EJS_paths, se disponível
                } else {
                    return scriptPath+file;
                }
            }();
            css.onload = resolve;
            css.onerror = () => {
                // Caso o estilo falhe ao carregar, tenta carregar arquivos faltando
                filesmissing(file).then(e => resolve());
            }
            document.head.appendChild(css);  // Adiciona o link CSS ao cabeçalho do documento
        })
    }

    /**
     * Função que é chamada quando um arquivo falha ao carregar.
     * Exibe um erro e tenta carregar versões não minificadas dos arquivos.
     * @param {string} file - Nome do arquivo que falhou ao carregar.
     * @returns {Promise} - Promessa que é resolvida após tentar carregar os arquivos faltando.
     */
    async function filesmissing(file) {
        console.error("Failed to load " + file);
        let minifiedFailed = file.includes(".min.") && !file.includes("socket");
        console[minifiedFailed?"warn":"error"]("Failed to load " + file + " because it's likely that the minified files are missing.\nTo fix this you have 3 options:\n1. You can download the zip from the latest release here: https://github.com/EmulatorJS/EmulatorJS/releases/latest - Stable\n2. You can download the zip from here: https://cdn.emulatorjs.org/latest/data/emulator.min.zip and extract it to the data/ folder. (easiest option) - Beta\n3. You can build the files by running `npm i && npm run build` in the data/minify folder. (hardest option) - Beta\nNote: you will probably need to do the same for the cores, extract them to the data/cores/ folder.");
        if (minifiedFailed) {
            console.log("Attempting to load non-minified files");
            // Caso os arquivos minificados falhem, tenta carregar os scripts não minificados
            if (file === "emulator.min.js") {
                for (let i=0; i<scripts.length; i++) {
                    await loadScript(scripts[i]);  // Carrega todos os scripts definidos
                }
            } else {
                await loadStyle('emulator.css');  // Carrega o estilo não minificado
            }
        }
    }

    // Carrega os scripts e estilos dependendo se a variável de debug EJS_DEBUG_XX está ativada
    if (('undefined' != typeof EJS_DEBUG_XX && true === EJS_DEBUG_XX)) {
        // No modo de depuração, carrega todos os scripts e estilos não minificados
        for (let i=0; i<scripts.length; i++) {
            await loadScript(scripts[i]);
        }
        await loadStyle('emulator.css');
    } else {
        // Caso contrário, carrega as versões minificadas
        await loadScript('emulator.min.js');
        await loadStyle('emulator.min.css');
    }

    // Configuração do emulador com base em variáveis globais
    const config = {};
    config.gameUrl = window.EJS_gameUrl;
    config.dataPath = scriptPath;
    config.system = window.EJS_core;
    config.biosUrl = window.EJS_biosUrl;
    config.gameName = window.EJS_gameName;
    config.color = window.EJS_color;
    config.adUrl = window.EJS_AdUrl;
    config.adMode = window.EJS_AdMode;
    config.adTimer = window.EJS_AdTimer;
    config.adSize = window.EJS_AdSize;
    config.alignStartButton = window.EJS_alignStartButton;
    config.VirtualGamepadSettings = window.EJS_VirtualGamepadSettings;
    config.buttonOpts = window.EJS_Buttons;
    config.volume = window.EJS_volume;
    config.defaultControllers = window.EJS_defaultControls;
    config.startOnLoad = window.EJS_startOnLoaded;
    config.fullscreenOnLoad = window.EJS_fullscreenOnLoaded;
    config.filePaths = window.EJS_paths;
    config.loadState = window.EJS_loadStateURL;
    config.cacheLimit = window.EJS_CacheLimit;
    config.cheats = window.EJS_cheats;
    config.defaultOptions = window.EJS_defaultOptions;
    config.gamePatchUrl = window.EJS_gamePatchUrl;
    config.gameParentUrl = window.EJS_gameParentUrl;
    config.netplayUrl = window.EJS_netplayServer;
    config.gameId = window.EJS_gameID;
    config.backgroundImg = window.EJS_backgroundImage;
    config.backgroundBlur = window.EJS_backgroundBlur;
    config.backgroundColor = window.EJS_backgroundColor;
    config.controlScheme = window.EJS_controlScheme;
    config.threads = window.EJS_threads;
    config.disableCue = window.EJS_disableCue;
    config.startBtnName = window.EJS_startButtonName;
    config.softLoad = window.EJS_softLoad;
    config.screenRecording = window.EJS_screenRecording;
    config.externalFiles = window.EJS_externalFiles;
    config.disableDatabases = window.EJS_disableDatabases;
    config.disableLocalStorage = window.EJS_disableLocalStorage;
    config.forceLegacyCores = window.EJS_forceLegacyCores;
    config.noAutoFocus = window.EJS_noAutoFocus;
    config.videoRotation = window.EJS_videoRotation;
    config.shaders = Object.assign({}, window.EJS_SHADERS, window.EJS_shaders ? window.EJS_shaders : {});

    // Carrega o arquivo de idioma, se configurado
    if (typeof window.EJS_language === "string" && window.EJS_language !== "en-US") {
        try {
            let path;
            if ('undefined' != typeof EJS_paths && typeof EJS_paths[window.EJS_language] === 'string') {
                path = EJS_paths[window.EJS_language];
            } else {
                path = scriptPath+"localization/"+window.EJS_language+".json";
            }
            config.language = window.EJS_language;
            config.langJson = JSON.parse(await (await fetch(path)).text());
        } catch(e) {
            config.langJson = {};  // Se falhar, usa um objeto vazio para o idioma
        }
    }

    // Cria a instância do emulador com a configuração definida
    window.EJS_emulator = new EmulatorJS(EJS_player, config);

    // Funções de controle e eventos do emulador
    window.EJS_adBlocked = (url, del) => window.EJS_emulator.adBlocked(url, del);
    if (typeof window.EJS_ready === "function") {
        window.EJS_emulator.on("ready", window.EJS_ready);
    }
    if (typeof window.EJS_onGameStart === "function") {
        window.EJS_emulator.on("start", window.EJS_onGameStart);
    }
    if (typeof window.EJS_onLoadState === "function") {
        window.EJS_emulator.on("loadState", window.EJS_onLoadState);
    }
    if (typeof window.EJS_onSaveState === "function") {
        window.EJS_emulator.on("saveState", window.EJS_onSaveState);
    }
    if (typeof window.EJS_onLoadSave === "function") {
        window.EJS_emulator.on("loadSave", window.EJS_onLoadSave);
    }
    if (typeof window.EJS_onSaveSave === "function") {
        window.EJS_emulator.on("saveSave", window.EJS_onSaveSave);
    }
})();
