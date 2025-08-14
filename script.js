document.addEventListener("DOMContentLoaded", () => {
    
    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    document.body.appendChild(glow);
    document.addEventListener('mousemove', (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });
    
    // --- DADOS ATUALIZADOS E RECALCULADOS ---
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
        servers: { current: secretariatsData.reduce((sum, s) => sum + s.cadastros, 0), target: 1000 },
        followers: { current: 103550, target: 150000 },
        population: { current: 0, target: 10000 }
    };

    function renderGoals() {
        // ... (código existente da função renderGoals, agora com a nova meta) ...
        const { servers, followers, population } = goalsData;
        
        // Servidores
        document.getElementById('current-servers').textContent = servers.current.toLocaleString('pt-BR');
        document.getElementById('servers-progress-bar').style.width = `${(servers.current / servers.target) * 100}%`;
        document.getElementById('servers-percentage').textContent = `${((servers.current / servers.target) * 100).toFixed(1)}%`;
        
        // Seguidores
        document.getElementById('current-followers').textContent = followers.current.toLocaleString('pt-BR');
        document.getElementById('followers-progress-bar').style.width = `${(followers.current / followers.target) * 100}%`;
        document.getElementById('followers-percentage').textContent = `${((followers.current / followers.target) * 100).toFixed(1)}%`;
        
        // População
        document.getElementById('current-population').textContent = population.current.toLocaleString('pt-BR');
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
        
        const totalItems = secretariatsData.length;
        generalRankingBody.innerHTML = generalRankingData.map((s, i) => {
            const rank = i + 4;
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
            document.querySelectorAll('.bar-foreground, .goal-progress-bar').forEach(bar => {
                const targetWidth = bar.dataset.width || bar.style.width;
                bar.style.width = targetWidth;
            });
        }, 100);
    }

    function createPodiumCard(data, rank, maxValues) {
        const rankStatus = { 1: 'LÍDER ABSOLUTO', 2: 'EXCELENTE DESEMPENHO', 3: 'DESTAQUE NO PÓDIO' };
        const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
        
        const cadastrosPercent = (data.cadastros / maxValues.cadastros) * 100;
        const cliquesPercent = (data.cliques / maxValues.cliques) * 100;
        const membrosPercent = (data.membros / maxValues.membros) * 100;

        return `
            <div class="podium-card rank-${rank} card-tilt"> 
                <div class="scanline"></div>
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

    renderGoals();
    renderRankings();
    
    VanillaTilt.init(document.querySelectorAll('.card-tilt'), {
        max: 5, speed: 300, glare: true, "max-glare": 0.2
    });
});
