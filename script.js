document.addEventListener("DOMContentLoaded", () => {
    
    // Efeito de brilho do mouse
    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    document.body.appendChild(glow);
    document.addEventListener('mousemove', (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });
    
    const secretariatsData = [
        { name: 'Saúde', cadastros: 51, cliques: 580, membros: 240 },
        { name: 'Educação, Cultura e Esporte', cadastros: 48, cliques: 510, membros: 220 },
        { name: 'Desenvolvimento Econômico, Turismo e Inovação', cadastros: 45, cliques: 490, membros: 205 },
        { name: 'Infraestrutura e Mobilidade', cadastros: 39, cliques: 410, membros: 185 },
        { name: 'Assistência Social e Combate à Fome', cadastros: 37, cliques: 390, membros: 170 },
        { name: 'Comunicação', cadastros: 35, cliques: 450, membros: 165 },
        { name: 'Desenvolvimento Rural', cadastros: 26, cliques: 320, membros: 150 },
        { name: 'Serviços Públicos e Defesa Civil', cadastros: 25, cliques: 300, membros: 135 },
        { name: 'Governo', cadastros: 24, cliques: 280, membros: 120 },
        { name: 'Desenvolvimento Urbano, Habitação e Sustentabilidade', cadastros: 23, cliques: 250, membros: 110 },
        { name: 'Casa Civil', cadastros: 22, cliques: 240, membros: 100 },
        { name: 'Planejamento, Gestão e Finanças', cadastros: 21, cliques: 210, membros: 90 },
        { name: 'Segurança Pública', cadastros: 20, cliques: 190, membros: 85 },
        { name: 'Ammpla', cadastros: 19, cliques: 170, membros: 75 },
        { name: 'Licitações e Contratos', cadastros: 18, cliques: 150, membros: 65 },
        { name: 'Receitas Municipais', cadastros: 17, cliques: 140, membros: 60 },
        { name: 'Autarquia 1', cadastros: 16, cliques: 130, membros: 55 },
        { name: 'Autarquia 2', cadastros: 15, cliques: 120, membros: 50 },
        { name: 'Procuradoria-Geral do Município', cadastros: 11, cliques: 110, membros: 48 },
        { name: 'Controladoria-Geral do Município', cadastros: 8, cliques: 100, membros: 42 }
    ];

    const goalsData = {
        servers: { current: secretariatsData.reduce((sum, s) => sum + s.cadastros, 0), target: 1000 },
        followers: { current: 101925, target: 150000 }
    };

    function renderGoals() {
        // ... (código existente da função renderGoals) ...
    }
    
    function renderRankings() {
        secretariatsData.sort((a, b) => b.cadastros - a.cadastros || b.cliques - a.cliques || b.membros - a.membros);
        
        const podiumContainer = document.getElementById('podium-container');
        const generalRankingBody = document.getElementById('general-ranking-body');
        
        const podiumData = secretariatsData.slice(0, 3);
        const generalRankingData = secretariatsData.slice(3);

        const maxPodiumValues = {
            cadastros: Math.max(...podiumData.map(s => s.cadastros)),
            cliques: Math.max(...podiumData.map(s => s.cliques)),
            membros: Math.max(...podiumData.map(s => s.membros)),
        };

        podiumContainer.innerHTML = podiumData.map((s, i) => createPodiumCard(s, i + 1, maxPodiumValues)).join('');
        
        // --- LÓGICA ATUALIZADA PARA O RANKING GERAL ---
        const totalItems = secretariatsData.length;
        generalRankingBody.innerHTML = generalRankingData.map((s, i) => {
            const rank = i + 4;
            // Verifica se a posição está entre as 3 últimas
            const isLastPlace = rank >= totalItems - 2;
            const rowClass = isLastPlace ? 'class="last-place"' : '';

            return `
                <tr ${rowClass}>
                    <td class="rank-position">${rank}º</td>
                    <td>${s.name}</td>
                    <td>${s.cadastros}</td>
                    <td>${s.cliques}</td>
                    <td>${s.membros}</td>
                </tr>
            `;
        }).join('');

        setTimeout(() => {
            document.querySelectorAll('.bar-foreground').forEach(bar => {
                bar.style.width = bar.dataset.width;
            });
        }, 100);
    }

    // --- FUNÇÃO DO CARD DO PÓDIO ATUALIZADA ---
    function createPodiumCard(data, rank, maxValues) {
        const rankStatus = { 1: 'LÍDER ABSOLUTO', 2: 'EXCELENTE DESEMPENHO', 3: 'DESTAQUE NO PÓDIO' };
        const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
        
        const cadastrosPercent = (data.cadastros / maxValues.cadastros) * 100;
        const cliquesPercent = (data.cliques / maxValues.cliques) * 100;
        const membrosPercent = (data.membros / maxValues.membros) * 100;

        return `
            <div class="podium-card rank-${rank} card-tilt"> 
                <div class="scanline"></div> <!-- Linha animada -->
                <div class="card-header">
                    <div class="rank-medal">${medals[rank]}</div>
                    <div class="name">${data.name}</div>
                </div>
                <hr class="card-divider">
                <p class="card-status">${rankStatus[rank]}</p>
                <div class="card-metrics">
                    <div class="metric-bar-container">
                        <div class="metric-label"><span>Cadastros</span><strong>${data.cadastros}</strong></div>
                        <div class="bar-background"><div class="bar-foreground" data-width="${cadastrosPercent}%"></div></div>
                    </div>
                    <div class="metric-bar-container">
                        <div class="metric-label"><span>Cliques no Link</span><strong>${data.cliques}</strong></div>
                        <div class="bar-background"><div class="bar-foreground" data-width="${cliquesPercent}%"></div></div>
                    </div>
                    <div class="metric-bar-container">
                        <div class="metric-label"><span>Membros no Grupo</span><strong>${data.membros}</strong></div>
                        <div class="bar-background"><div class="bar-foreground" data-width="${membrosPercent}%"></div></div>
                    </div>
                </div>
            </div>`;
    }

    // Renderiza o conteúdo e ativa os efeitos
    renderGoals();
    renderRankings();
    
    VanillaTilt.init(document.querySelectorAll('.card-tilt'), {
        max: 5, speed: 300, glare: true, "max-glare": 0.2
    });
});
