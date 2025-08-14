document.addEventListener("DOMContentLoaded", () => {
    
    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    document.body.appendChild(glow);
    document.addEventListener('mousemove', (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });
    
    // --- DADOS ATUALIZADOS CONFORME O PRINT ---
    const secretariatsData = [
        { name: 'Saúde', cadastros: 100, cliques: 820, membros: 700 },
        { name: 'Educação, Cultura e Esporte', cadastros: 70, cliques: 574, membros: 490 },
        { name: 'Desenvolvimento Econômico, Turismo e Inovação', cadastros: 56, cliques: 459, membros: 392 },
        { name: 'Infraestrutura e Mobilidade', cadastros: 50, cliques: 410, membros: 185 },
        { name: 'Assistência Social e Combate à Fome', cadastros: 48, cliques: 390, membros: 170 },
        { name: 'Comunicação', cadastros: 45, cliques: 450, membros: 165 },
        { name: 'Desenvolvimento Rural', cadastros: 42, cliques: 320, membros: 150 },
        { name: 'Serviços Públicos e Defesa Civil', cadastros: 40, cliques: 300, membros: 135 },
        { name: 'Governo', cadastros: 38, cliques: 280, membros: 120 },
        { name: 'Desenvolvimento Urbano, Habitação e Sustentabilidade', cadastros: 35, cliques: 250, membros: 110 },
        { name: 'Casa Civil', cadastros: 33, cliques: 240, membros: 100 },
        { name: 'Planejamento, Gestão e Finanças', cadastros: 31, cliques: 210, membros: 90 },
        { name: 'Segurança Pública', cadastros: 29, cliques: 190, membros: 85 },
        { name: 'Ammpla', cadastros: 27, cliques: 170, membros: 75 },
        { name: 'Licitações e Contratos', cadastros: 25, cliques: 150, membros: 65 },
        { name: 'Receitas Municipais', cadastros: 23, cliques: 140, membros: 60 },
        { name: 'Autarquia 1', cadastros: 21, cliques: 130, membros: 55 },
        { name: 'Autarquia 2', cadastros: 20, cliques: 120, membros: 50 },
        { name: 'Procuradoria-Geral do Município', cadastros: 19, cliques: 110, membros: 48 },
        { name: 'Controladoria-Geral do Município', cadastros: 18, cliques: 100, membros: 42 }
    ];

    const goalsData = {
        // A soma agora será 770
        servers: { current: secretariatsData.reduce((sum, s) => sum + s.cadastros, 0), target: 1000 },
        followers: { current: 103550, target: 150000 },
        population: { current: 0, target: 10000 }
    };

    function renderGoals() {
        // ... (código existente da função renderGoals, sem alterações) ...
    }
    
    function renderRankings() {
        // ... (código existente da função renderRankings, sem alterações) ...
    }

    function createPodiumCard(data, rank, maxValues) {
        // ... (código existente da função createPodiumCard, sem alterações) ...
    }
    
    // Função para criar o HTML dos cards de meta
    function createGoalsHTML() {
        const goalsContainer = document.getElementById('goals-grid-container');
        goalsContainer.innerHTML = `
            <div class="goal-card card-tilt">
                <div class="scanline"></div>
                <img src="https://www.gstatic.com/images/icons/material/system_gm/2x/group_gm_blue_24dp.png" alt="Ícone de Pessoas" class="goal-icon">
                <h3>Servidores Cadastrados</h3>
                <div class="goal-progress-container">
                    <div class="goal-progress-bar" id="servers-progress-bar"></div>
                </div>
                <div class="goal-details">
                    <span id="current-servers">0</span> / <span>1.000</span>
                </div>
                <p class="goal-percentage" id="servers-percentage">0%</p>
            </div>
            <div class="goal-card card-tilt">
                <div class="scanline"></div>
                <svg class="goal-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9 26.3 26.2 58 34.4 93.9 36.2 37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                </svg>
                <h3>Seguidores no Instagram</h3>
                <div class="goal-progress-container">
                    <div class="goal-progress-bar" id="followers-progress-bar"></div>
                </div>
                <div class="goal-details">
                    <span id="current-followers">0</span> / <span>150.000</span>
                </div>
                <p class="goal-percentage" id="followers-percentage">0%</p>
            </div>
            <div class="goal-card card-tilt">
                <div class="scanline"></div>
                <svg class="goal-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64c13.3 0 24 10.7 24 24v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
                </svg>
                <h3>Cadastro População</h3>
                <div class="goal-progress-container">
                    <div class="goal-progress-bar" id="population-progress-bar" style="width: 0%;"></div>
                </div>
                <div class="goal-details">
                    <span id="current-population">0</span> / <span>10.000</span>
                </div>
                <p class="goal-percentage" id="population-status">EM BREVE</p>
            </div>
        `;
    }

    // Inicialização
    createGoalsHTML();
    renderGoals();
    renderRankings();
    
    VanillaTilt.init(document.querySelectorAll('.card-tilt'), {
        max: 5, speed: 300, glare: true, "max-glare": 0.2
    });
});
