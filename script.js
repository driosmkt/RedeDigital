document.addEventListener("DOMContentLoaded", () => {
    
    // DADOS DAS SECRETARIAS COM CADASTROS SOMANDO 500
    const secretariatsData = [
        { name: 'Saúde', cadastros: 51, cliques: 580, membros: 240 },
        { name: 'Educação, Cultura e Esporte', cadastros: 48, cliques: 510, membros: 220 },
        { name: 'Desenvolvimento Econômico, Turismo e Inovação', cadastros: 45, cliques: 490, membros: 205 },
        { name: 'Infraestrutura e Mobilidade', cadastros: 39, cliques: 410, membros: 185 },
        { name: 'Assistência Social e Combate à Fome', cadastros: 37, cliques: 390, membros: 170 },
        { name: 'Comunicação', cadastros: 35, cliques: 450, membros: 165 },
        { name: 'Desenvolvimento Rural', cadastros: 32, cliques: 320, membros: 150 },
        { name: 'Serviços Públicos e Defesa Civil', cadastros: 29, cliques: 300, membros: 135 },
        { name: 'Governo', cadastros: 26, cliques: 280, membros: 120 },
        { name: 'Desenvolvimento Urbano, Habitação e Sustentabilidade', cadastros: 24, cliques: 250, membros: 110 },
        { name: 'Casa Civil', cadastros: 22, cliques: 240, membros: 100 },
        { name: 'Planejamento, Gestão e Finanças', cadastros: 19, cliques: 210, membros: 90 },
        { name: 'Segurança Pública', cadastros: 18, cliques: 190, membros: 85 },
        { name: 'Ammpla', cadastros: 16, cliques: 170, membros: 75 },
        { name: 'Licitações e Contratos', cadastros: 14, cliques: 150, membros: 65 },
        { name: 'Receitas Municipais', cadastros: 13, cliques: 140, membros: 60 },
        { name: 'Autarquia 1', cadastros: 12, cliques: 130, membros: 55 },
        { name: 'Autarquia 2', cadastros: 11, cliques: 120, membros: 50 },
        { name: 'Procuradoria-Geral do Município', cadastros: 10, cliques: 110, membros: 48 },
        { name: 'Controladoria-Geral do Município', cadastros: 9, cliques: 100, membros: 42 }
    ];

    // DADOS DAS METAS COM SEGUIDORES CORRIGIDOS
    const goalsData = {
        servers: {
            current: secretariatsData.reduce((sum, s) => sum + s.cadastros, 0),
            target: 1000
        },
        followers: {
            current: 101925, 
            target: 150000
        }
    };

    // Função para renderizar as metas
    function renderGoals() {
        const { servers, followers } = goalsData;

        let serversPercentage = (servers.current / servers.target) * 100;
        const serversBarPercentage = Math.min(serversPercentage, 100);
        document.getElementById('current-servers').textContent = servers.current.toLocaleString('pt-BR');
        document.getElementById('servers-progress-bar').style.width = `${serversBarPercentage}%`;
        document.getElementById('servers-percentage').textContent = `${serversPercentage.toFixed(1)}%`;

        let followersPercentage = (followers.current / followers.target) * 100;
        const followersBarPercentage = Math.min(followersPercentage, 100);
        document.getElementById('current-followers').textContent = followers.current.toLocaleString('pt-BR');
        document.getElementById('followers-progress-bar').style.width = `${followersBarPercentage}%`;
        document.getElementById('followers-percentage').textContent = `${followersPercentage.toFixed(1)}%`;

        if (followersBarPercentage >= 100) {
            document.getElementById('followers-progress-bar').style.backgroundColor = '#1E9E38';
        }
    }
    
    // Função para renderizar os rankings
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

    // FUNÇÃO DO CARD DO PÓDIO ATUALIZADA
    function createPodiumCard(data, rank) {
        const rankStatus = { 1: 'LÍDER ABSOLUTO', 2: 'EXCELENTE DESEMPENHO', 3: 'DESTAQUE NO PÓDIO' };
        const maxValues = { cadastros: 60, cliques: 600, membros: 250 };
        const cadastrosPercent = Math.min((data.cadastros / maxValues.cadastros) * 100, 100);
        const cliquesPercent = Math.min((data.cliques / maxValues.cliques) * 100, 100);
        const membrosPercent = Math.min((data.membros / maxValues.membros) * 100, 100);

        return `
            <div class="podium-card rank-${rank}">
                <div class="card-header">
                    <div class="rank-position-large">${rank}º</div>
                    <span class="name">${data.name}</span>
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
                        <div class.bar-background"><div class="bar-foreground" data-width="${cliquesPercent}%"></div></div>
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
