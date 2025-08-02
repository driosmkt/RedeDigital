document.addEventListener("DOMContentLoaded", () => {
    
    // --- DADOS DAS SECRETARIAS ---
    const secretariatsData = [
        { name: 'Saúde', cadastros: 250, cliques: 580, membros: 240 },
        { name: 'Educação, Cultura e Esporte', cadastros: 235, cliques: 510, membros: 220 },
        { name: 'Desenvolvimento Econômico, Turismo e Inovação', cadastros: 218, cliques: 490, membros: 205 },
        { name: 'Infraestrutura e Mobilidade', cadastros: 190, cliques: 410, membros: 185 },
        { name: 'Assistência Social e Combate à Fome', cadastros: 182, cliques: 390, membros: 170 },
        { name: 'Comunicação', cadastros: 170, cliques: 450, membros: 165 },
        { name: 'Desenvolvimento Rural', cadastros: 155, cliques: 320, membros: 150 },
        { name: 'Serviços Públicos e Defesa Civil', cadastros: 140, cliques: 300, membros: 135 },
        { name: 'Governo', cadastros: 125, cliques: 280, membros: 120 },
        { name: 'Desenvolvimento Urbano, Habitação e Sustentabilidade', cadastros: 115, cliques: 250, membros: 110 },
        { name: 'Casa Civil', cadastros: 108, cliques: 240, membros: 100 },
        { name: 'Planejamento, Gestão e Finanças', cadastros: 95, cliques: 210, membros: 90 },
        { name: 'Segurança Pública', cadastros: 88, cliques: 190, membros: 85 },
        { name: 'Licitações e Contratos', cadastros: 70, cliques: 150, membros: 65 },
        { name: 'Receitas Municipais', cadastros: 65, cliques: 140, membros: 60 },
        { name: 'Procuradoria-Geral do Município', cadastros: 50, cliques: 110, membros: 48 },
        { name: 'Controladoria-Geral do Município', cadastros: 45, cliques: 100, membros: 42 }
    ];

    // --- DADOS DAS METAS ---
    const goalsData = {
        servers: {
            current: secretariatsData.reduce((sum, s) => sum + s.cadastros, 0),
            target: 1000
        },
        followers: {
            // VALOR ATUALIZADO
            current: 191925, 
            target: 150000 // A meta continua 150.000, o que significa que foi ultrapassada
        }
    };

    // Função para renderizar as metas
    function renderGoals() {
        const { servers, followers } = goalsData;

        // Meta de Servidores
        let serversPercentage = (servers.current / servers.target) * 100;
        // Limita a porcentagem a 100% no máximo para a barra não ultrapassar o limite
        const serversBarPercentage = Math.min(serversPercentage, 100);

        document.getElementById('current-servers').textContent = servers.current.toLocaleString('pt-BR');
        document.getElementById('servers-progress-bar').style.width = `${serversBarPercentage}%`;
        document.getElementById('servers-percentage').textContent = `${serversPercentage.toFixed(1)}%`;

        // Meta de Seguidores
        let followersPercentage = (followers.current / followers.target) * 100;
        // Limita a porcentagem a 100% para a barra visual
        const followersBarPercentage = Math.min(followersPercentage, 100);

        document.getElementById('current-followers').textContent = followers.current.toLocaleString('pt-BR');
        document.getElementById('followers-progress-bar').style.width = `${followersBarPercentage}%`;
        document.getElementById('followers-percentage').textContent = `${followersPercentage.toFixed(1)}%`;

        // Se a meta de seguidores foi batida, deixa a barra verde mais forte
        if (followersBarPercentage >= 100) {
            document.getElementById('followers-progress-bar').style.backgroundColor = '#1E9E38'; // Tom de verde mais forte
        }
    }
    
    // --- O restante do JavaScript permanece igual ---

    function renderRankings() {
        secretariatsData.sort((a, b) => b.cadastros - a.cadastros || b.cliques - a.cliques || b.membros - a.membros);
        const podiumContainer = document.getElementById('podium-container');
        const generalRankingBody = document.getElementById('general-ranking-body');
        const podiumData = secretariatsData.slice(0, 3);
        const generalRankingData = secretariatsData.slice(3);

        podiumContainer.innerHTML = podiumData.map((s, i) => createPodiumCard(s, i + 1)).join('');
        generalRankingBody.innerHTML = generalRankingData.map((s, i) => `
            <tr>
                <td class="rank-position">${i + 4}º</td>
                <td>${s.name}</td>
                <td>${s.cadastros}</td>
                <td>${s.cliques}</td>
                <td>${s.membros}</td>
            </tr>
        `).join('');

        setTimeout(() => {
            document.querySelectorAll('.bar-foreground').forEach(bar => {
                bar.style.width = bar.dataset.width;
            });
        }, 100);
    }

    function createPodiumCard(data, rank) {
        const rankStatus = { 1: 'LÍDER ABSOLUTO', 2: 'EXCELENTE DESEMPENHO', 3: 'DESTAQUE NO PÓDIO' };
        const maxValues = { cadastros: 260, cliques: 600, membros: 250 };
        const cadastrosPercent = Math.min((data.cadastros / maxValues.cadastros) * 100, 100);
        const cliquesPercent = Math.min((data.cliques / maxValues.cliques) * 100, 100);
        const membrosPercent = Math.min((data.membros / maxValues.membros) * 100, 100);

        return `
            <div class="podium-card rank-${rank}">
                <div class="card-header">
                    <span class="name">${data.name}</span>
                    <span class="rank-badge">${rank}º</span>
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
                <a href="#" class="card-button">Ver Detalhes</a>
            </div>`;
    }

    // Inicializa a renderização de tudo
    renderGoals();
    renderRankings();
});
