const telefone = "351XXXXXXXXX"; 
const imgBrevemente = "loading.jpeg";
let categoriaAtual = 'carros';
let fotoIndice = 0;
let veiculoAtual = null;
let filtroMarcaAtual = 'todas';

// Recuperar favoritos do LocalStorage
let favoritos = JSON.parse(localStorage.getItem('stand_favs')) || [];

// 1. BASE DE DADOS COMPLETA
const veiculos = {
  carros: [
    {
      nome: "BMW M4 Competition",
      detalhes: "43.xxx km • 2018 • Gasolina • Caixa Automática",
      preco: "64.990€",
      status: "reservado",
      imagens: [
        "Disponiveis/M4/m4-1.jpeg", "Disponiveis/M4/m4-2.jpeg", "Disponiveis/M4/m4-3.jpeg", 
        "Disponiveis/M4/m4-4.jpeg", "Disponiveis/M4/m4-5.jpeg", "Disponiveis/M4/m4-6.jpeg",
        "Disponiveis/M4/m4-7.jpeg", "Disponiveis/M4/m4-8.jpeg", "Disponiveis/M4/m4-9.jpeg",
        "Disponiveis/M4/m4-10.jpeg", "Disponiveis/M4/m4-11.jpeg", "Disponiveis/M4/m4-12.jpeg",
        "Disponiveis/M4/m4-13.jpeg", "Disponiveis/M4/m4-14.jpeg", "Disponiveis/M4/m4-15.jpeg",
        "Disponiveis/M4/m4-16.jpeg"
      ],
      descricao: "Viatura num estado irrepreensível, com histórico completo na marca.",
      specs: { 
        versao: "Competition", // O que era Pack Competition
        ano: "2018", 
        quilometros: "43.000 km", 
        cilindrada: "3.0 TwinPower Turbo", // O que tinhas como 'motor'
        potencia: "450 cv", 
        caixa: "DCT 7 Velocidades", // O que tinhas como 'transmissao'
        combustivel: "Gasolina",
        tracao: "Traseira",
        cor: "Mineral Grey",
        portas: "2"
      }
    },
    {
      nome: "Seat Ibiza 6l",
      detalhes: "4xx Cv • 2006 • Gasóleo • Manual",
      preco: "8.990€",
      status: "vendido",
      imagens: ["Disponiveis/6l-1/6l1.jpg", "Disponiveis/6l-1/6l2.jpg", "Disponiveis/6l-1/6l3.jpg",
                "Disponiveis/6l-1/6l4.jpg", "Disponiveis/6l-1/6l5.jpg", "Disponiveis/6l-1/6l6.jpg",
                "Disponiveis/6l-1/6l7.jpg", "Disponiveis/6l-1/6l8.jpg", "Disponiveis/6l-1/6l9.jpg",
      ],
      descricao: `Exterior:
            Parachoques Dianteiro e Traseiro Cupra
            Aleron Cupra
            Jantes OZ superleggera 16
            Coils AP

            Interior:
            Teto e pilares em preto
            Volante cupra sem botões
            Manete Fr
            Backets Sparco
            Rádio 2din

            Motor:
            Bloco 2.0
            Pistons abertos com tratamento cerâmico
            Bielas maxspeed
            Junta original de 1 mosca
            Cabeça tralhada
            Molas válvulas
            Came 280°
            Tuches mecânicas
            Pernos Cabeça ARP
            Injetores BE +160%
            Linha 76mm
            Tubagens ic 70mm
            Admissão 100mm
            Sensor map 4bar
            Kit methanol
            Kit nitro
            Turbo 28.71 VKLR
            IC semelhante ao S3 mas de maior capacidade
            2 radiadores Gasóleo
            1 radiador Óleo
            Caixa velocidades FJW com reforço da 4º + veio primário e rolamentos `,
      specs: {
            ano: "2006", 
            quilometros: "267.000 km", 
            cilindrada: "1.9 TDI (Alargado a 2.0)", // O que tinhas como 'motor'
            potencia: "4xx cv", 
            caixa: "Manual (6 Velocidades)", // O que tinhas como 'transmissao'
            combustivel: "Gasóleo",
            tracao: "Dianteira",
            cor: "Preto",
            portas: "2"
      }
    },
    {
      nome: "BMW 120D XDrive",
      detalhes: "108.xxx km • 2018 • Gasóleo • Caixa Automática",
      preco: "21.990€",
      status: "disponivel",
      imagens: ["Disponiveis/120d/20250422_151955.jpg", "Disponiveis/120d/20250422_151809.jpg", "Disponiveis/120d/20250422_151740.jpg", "Disponiveis/120d/20250422_151733.jpg", "Disponiveis/120d/20250422_151713.jpg", "Disponiveis/120d/20250422_151703.jpg", "Disponiveis/120d/20250422_151634.jpg", "Disponiveis/120d/20250422_151614.jpg", "Disponiveis/120d/20250422_151601.jpg", "Disponiveis/120d/20250422_150840.jpg", "Disponiveis/120d/20250422_145800.jpg", "Disponiveis/120d/20250422_145748.jpg", "Disponiveis/120d/20250422_145732.jpg", "Disponiveis/120d/20250422_145725.jpg", "Disponiveis/120d/20250422_145714.jpg", "Disponiveis/120d/20250422_145702.jpg", "Disponiveis/120d/20250422_145651.jpg", "Disponiveis/120d/20250422_145640.jpg"
      ],
      specs: {
        versao: "",
        ano: "",
        quilometros: "",
        categoria: "",
        origem: "",
        primeiroRegisto: "",
        proprietarios: "",
        cilindrada: "",
        potencia: "",
        caixa: "",
        mudancas: "",
        combustivel: "",
        tracao: "",
        aceleracao: "",
        consumo: "",
        emissoes: "",
        cor: "",
        pintura: "",
        estofos: "",
        corInterior: "",
        jantes: "",
        portas: "",
        lugares: "",
        iuc: "",
        inspecao: "",
        garantia: "",
        historico: "",
        chave: "",
        naoFumador: "",
        estado: ""
      }
    },
    {
      nome: "Mercedes CLK 200 KOMPRESSOR",
      detalhes: "191.xxx km • 2003 • Gasolina • Caixa Automática",
      preco: "14.990€",
      status: "disponivel",
      imagens: []
    }
  ],
  motas: [
    {
      nome: "Yamaha MT-09",
      detalhes: "7.300 km • 2020 • Gasolina • Manual",
      preco: "8.500€",
      status: "vendido",
      imagens: ["Disponiveis/MT09/mt1.jpg", "Disponiveis/MT09/mt2.jpg", "Disponiveis/MT09/mt3.jpg", "Disponiveis/MT09/mt4.jpg", "Disponiveis/MT09/mt5.jpg", "Disponiveis/MT09/mt6.jpg", "Disponiveis/MT09/mt7.jpg", "Disponiveis/MT09/mt8.jpg", "Disponiveis/MT09/mt9.jpg"]
    },
    {
      nome: "Casal K191",
      detalhes: "Relíquia • 1971 • Gasolina • Manual",
      preco: "2.500€",
      status: "disponivel",
      imagens: []
    }
  ],
  outros: [
  //  {
  //    nome: "Carrinha de Trabalho",
  //    detalhes: "200.000 km • Gasóleo • Manual",
  //    preco: "4.000€",
  //    status: "disponivel",
  //    imagens: []
  //  }
  ]
};

// --- LÓGICA DE FILTROS E FAVORITOS ---

function gerarFiltrosMarcas() {
  const marcas = ['todas', ...new Set(veiculos[categoriaAtual].map(v => v.nome.split(' ')[0]))];
  const cont = document.getElementById('filtros-marcas');
  if (!cont) return;
  
  cont.innerHTML = marcas.map(marca => `
    <button onclick="filtrarPorMarca('${marca}')" 
      class="px-4 py-1 text-[9px] uppercase tracking-widest border transition-all
      ${filtroMarcaAtual === marca 
        ? 'bg-black text-white border-black dark:bg-white dark:text-black' 
        : 'border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:border-zinc-400'}">
      ${marca}
    </button>
  `).join('');
}

function filtrarPorMarca(marca) {
  filtroMarcaAtual = marca;
  mostrarCategoria(categoriaAtual);
}

function toggleFavorito(event, nomeVeiculo) {
  if (event) event.stopPropagation();
  const index = favoritos.indexOf(nomeVeiculo);
  if (index === -1) favoritos.push(nomeVeiculo);
  else favoritos.splice(index, 1);

  localStorage.setItem('stand_favs', JSON.stringify(favoritos));
  atualizarContagemFavs();
  mostrarCategoria(categoriaAtual);
}

function limparFiltros() {
    document.getElementById('ordem-preco').value = 'default';
    document.getElementById('filtro-combustivel').value = 'todas';
    document.getElementById('filtro-transmissao').value = 'todas';
    filtroMarcaAtual = 'todas';
    mostrarCategoria(categoriaAtual);
}

function atualizarContagemFavs() {
  const favCount = document.getElementById('fav-count');
  if (favCount) favCount.innerText = favoritos.length;
}

function toggleVerFavoritos() {
  const btn = document.getElementById('btn-ver-favoritos');
  const isAtivo = btn.classList.toggle('bg-red-500');
  btn.classList.toggle('text-white');
  if (isAtivo) renderizarFavoritos();
  else mostrarCategoria(categoriaAtual);
}

function renderizarFavoritos() {
  const lista = document.getElementById("lista-veiculos");
  const todos = [...veiculos.carros, ...veiculos.motas, ...veiculos.outros];
  const filtrados = todos.filter(v => favoritos.includes(v.nome));
  
  if (filtrados.length === 0) {
    lista.innerHTML = `<p class="col-span-full text-center py-20 text-gray-400 uppercase text-[10px] tracking-widest">Nenhum favorito guardado.</p>`;
    return;
  }
  lista.innerHTML = filtrados.map((v, i) => criarCardHTML(v, i, 'favoritos')).join("");
}

// --- RENDERIZAÇÃO ---

function mostrarCategoria(cat) {
  categoriaAtual = cat;
  gerarFiltrosMarcas();
  atualizarContagemFavs();

  const transmissao = document.getElementById('filtro-transmissao')?.value.toLowerCase() || 'todas';
  const combustivel = document.getElementById('filtro-combustivel')?.value.toLowerCase() || 'todas';

  let filtrados = veiculos[cat] || [];

  // Aplicar Filtros
  if (filtroMarcaAtual !== 'todas') {
    filtrados = filtrados.filter(v => v.nome.toLowerCase().startsWith(filtroMarcaAtual.toLowerCase()));
  }
  if (transmissao !== 'todas') {
    filtrados = filtrados.filter(v => v.detalhes.toLowerCase().includes(transmissao));
  }
  if (combustivel !== 'todas') {
    filtrados = filtrados.filter(v => v.detalhes.toLowerCase().includes(combustivel));
  }

  const lista = document.getElementById("lista-veiculos");
  if (!lista) return;

  // --- NOVO: ESTADO DE CARREGAMENTO (SKELETONS) ---
  // Mostramos 3 blocos de skeleton enquanto o "servidor" (timeout) processa
  lista.innerHTML = `
    <div class="skeleton"></div>
    <div class="skeleton"></div>
    <div class="skeleton"></div>
  `;

  const total = filtrados.length;
  const textoContador = `<div class="col-span-full mb-4">
    <span class="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium">
      ${total} ${total === 1 ? 'veículo encontrado' : 'veículos encontrados'}
    </span>
  </div>`;

  // Preparamos a lista para a animação de entrada
  lista.classList.remove('opacity-100');
  lista.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-500');

  setTimeout(() => {
    lista.innerHTML = total === 0 
      ? `<p class="col-span-full text-center py-20 text-gray-400 uppercase text-[10px] tracking-widest">Nenhum veículo encontrado.</p>`
      : textoContador + filtrados.map((v, i) => criarCardHTML(v, i, cat)).join("");
    
    // Ativa a animação de entrada final
    lista.classList.replace('opacity-0', 'opacity-100');
    lista.classList.replace('translate-y-4', 'translate-y-0');
  }, 400); // Aumentei para 400ms para o efeito Shimmer ser bem visível e elegante

  // Atualizar botões do menu
  document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("btn-active"));
  document.getElementById(`btn-${cat}`)?.classList.add("btn-active");
}

function criarCardHTML(v, index, cat) {
  const isFav = favoritos.includes(v.nome);
  const isVendido = v.status === 'vendido';
  const imagem = (v.imagens && v.imagens.length > 0) ? v.imagens[0] : imgBrevemente;
  
  const statusLabels = {
    disponivel: { texto: 'Disponível', classe: 'bg-white/90 text-black' },
    reservado: { texto: 'Reservado', classe: 'bg-amber-500 text-white' },
    vendido: { texto: 'Vendido', classe: 'bg-black text-white' }
  };
  const badge = statusLabels[v.status] || statusLabels.disponivel;

  return `
    <article class="group bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 w-full max-w-sm">
      
      <div class="relative aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        
        <div class="absolute inset-0 skeleton"></div>

        <img src="${imagem}" 
             onclick="abrirGaleria('${cat}', ${index})" 
             class="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110 z-10 cursor-pointer
             ${isVendido ? 'grayscale brightness-[0.6] contrast-[1.2]' : ''}"
             onload="this.previousElementSibling.style.display='none'"> 

        ${isVendido ? '<div class="absolute inset-0 bg-black/20 z-15 pointer-events-none"></div>' : ''}

        <button onclick="toggleFavorito(event, '${v.nome}')" 
                class="absolute top-3 left-3 z-20 p-2 bg-black/20 backdrop-blur-md rounded-full text-white text-xs hover:bg-black/40 transition">
          ${isFav ? '❤️' : '🤍'}
        </button>
        
        <div class="absolute top-3 right-3 z-20 px-2 py-1 text-[8px] md:text-[9px] uppercase font-bold tracking-[0.2em] shadow-lg ${badge.classe}">
          ${badge.texto}
        </div>
      </div>

      <div class="p-5 md:p-6 ${isVendido ? 'opacity-60' : ''}">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-xs md:text-sm uppercase tracking-widest font-bold text-zinc-800 dark:text-zinc-200">${v.nome}</h3>
        </div>
        
        <p class="text-[9px] md:text-[10px] text-zinc-400 uppercase tracking-[0.1em] border-b border-gray-50 dark:border-zinc-800 pb-4 mb-4">
          ${v.detalhes}
        </p>

        <div class="flex justify-between items-end">
           <div>
              <span class="text-[8px] text-zinc-400 block uppercase tracking-tighter mb-1">Investimento</span>
              <span class="text-base md:text-lg font-light tracking-tighter">${isVendido ? '---' : v.preco}</span>
           </div>
           
           <button onclick="abrirGaleria('${cat}', ${index})" 
                   class="border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-[9px] uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
             ${isVendido ? 'Dossiê' : 'Explorar'}
           </button>
        </div>
      </div>

    </article>`;
}

// --- GALERIA E ZOOM ---

function abrirGaleria(cat, index) {
  if (cat === 'favoritos') {
    const todos = [...veiculos.carros, ...veiculos.motas, ...veiculos.outros];
    veiculoAtual = todos.filter(v => favoritos.includes(v.nome))[index];
  } else {
    veiculoAtual = veiculos[cat][index];
  }

  if (!veiculoAtual) return;
  fotoIndice = 0;

  // Abrir o modal e travar o scroll
  document.getElementById('modal-galeria').classList.replace('hidden', 'flex');
  document.body.style.overflow = 'hidden';

  // Preencher Textos Principais
  document.getElementById('modal-nome').innerText = veiculoAtual.nome;
  document.getElementById('modal-detalhes').innerText = veiculoAtual.detalhes;
  document.getElementById('modal-descricao').innerText = veiculoAtual.descricao || "Contacte-nos para mais informações.";
  
  // --- LISTA TÉCNICA (ESPECIFICAÇÕES) ---
  const camposReferencia = {
    versao: "Versão/Modelo", ano: "Ano/Mês", quilometros: "Quilometragem",
    categoria: "Tipo de Veículo", origem: "País de Origem", primeiroRegisto: "1º Registo",
    proprietarios: "Nº de Proprietários", cilindrada: "Cilindrada (cc)", potencia: "Potência (cv/kW)",
    caixa: "Transmissão", mudancas: "Nº de Velocidades", combustivel: "Combustível",
    tracao: "Tração", aceleracao: "0-100 km/h", consumo: "Consumo Médio",
    emissoes: "Classe de Emissões", cor: "Cor Exterior", pintura: "Acabamento",
    estofos: "Estofos/Material", corInterior: "Cor do Interior", jantes: "Jantes (Pol.)",
    portas: "Nº de Portas", lugares: "Nº de Lugares", iuc: "IUC (Anual)",
    inspecao: "Inspeção até", garantia: "Garantia", historico: "Livro de Revisões",
    chave: "Nº de Chaves", naoFumador: "Viatura Não Fumador", estado: "Estado Geral"
  };

  const sCont = document.getElementById('modal-specs');
  sCont.innerHTML = "";

  Object.entries(camposReferencia).forEach(([chave, label], index) => {
    const valor = (veiculoAtual.specs && veiculoAtual.specs[chave]) ? veiculoAtual.specs[chave] : "---";
    sCont.innerHTML += `
      <div class="flex justify-between items-center py-3 px-2 border-b border-gray-100 dark:border-zinc-800 ${index % 2 === 0 ? 'bg-zinc-50/50 dark:bg-zinc-900/10' : ''}">
        <span class="text-[9px] text-gray-400 uppercase tracking-widest font-medium">${label}</span>
        <span class="text-[11px] font-bold uppercase tracking-tight dark:text-zinc-200 text-right ml-4">${valor}</span>
      </div>`;
  });

  // --- PREÇO E BOTÃO PREMIUM (COLUNA DIREITA) ---
  const msg = encodeURIComponent(`Olá Ivo, gostaria de obter informações detalhadas sobre o ${veiculoAtual.nome}.`);
  const containerComercial = document.getElementById('modal-preco-container');
  
  if (containerComercial) {
    containerComercial.innerHTML = `
      <div class="flex flex-col space-y-8">
        <div class="space-y-1">
          <span class="text-[10px] text-gray-400 uppercase block tracking-[0.4em] font-semibold italic">Valor de Aquisição</span>
          <div class="flex items-baseline gap-1">
             <span class="text-5xl font-light tracking-tighter dark:text-zinc-100">${veiculoAtual.preco}</span>
          </div>
          <p class="text-[9px] text-zinc-400 uppercase tracking-widest pt-2 italic">Iva incluído e dedutível (se aplicável)</p>
        </div>

        <div class="h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent"></div>

        <div class="space-y-4">
          <a href="https://wa.me/351XXXXXXXXX?text=${msg}" target="_blank" 
             class="group relative flex items-center justify-center w-full bg-black dark:bg-white text-white dark:text-black py-6 overflow-hidden transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
             <div class="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
             
             <span class="relative text-[11px] uppercase tracking-[0.3em] font-bold">Solicitar Proposta</span>
          </a>
          
          <button class="w-full py-4 text-[9px] uppercase tracking-widest border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            Agendar Visita Privada
          </button>
        </div>

        <div class="flex items-center justify-center gap-4 opacity-50">
           <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" class="w-3 h-3 grayscale" alt="">
           <span class="text-[8px] uppercase tracking-[0.2em] text-gray-500">Private Collection 2026</span>
        </div>
      </div>
    `;
  }

  // --- CARREGAR FOTOS ---
  // Esta função é vital para as imagens aparecerem!
  atualizarVisualizacao(); 
}

// 1. FUNÇÃO PARA CARREGAR A FOTO ATUAL
function atualizarVisualizacao() {
    const listaImagens = (veiculoAtual && veiculoAtual.imagens && veiculoAtual.imagens.length > 0) 
                         ? veiculoAtual.imagens 
                         : [imgBrevemente];

    const imgPrincipal = document.getElementById('foto-principal');
    const contador = document.getElementById('contador-fotos');
    const miniaturasCont = document.getElementById('modal-miniaturas');

    // 1. Atualiza a Foto Principal
    if (imgPrincipal) {
        imgPrincipal.src = listaImagens[fotoIndice];
    }

    // 2. Atualiza o Contador
    if (contador) {
        contador.innerText = `${fotoIndice + 1} / ${listaImagens.length}`;
    }

    // 3. Gera e Atualiza as Miniaturas
    if (miniaturasCont) {
        miniaturasCont.innerHTML = listaImagens.map((img, i) => `
            <div onclick="irParaFoto(${i})" 
                 class="relative min-w-[100px] h-20 cursor-pointer overflow-hidden border-2 transition-all duration-300
                 ${i === fotoIndice ? 'border-black dark:border-white opacity-100' : 'border-transparent opacity-40 hover:opacity-70'}">
                <img src="${img}" class="w-full h-full object-cover">
            </div>
        `).join('');
        
        // Scroll automático suave para a miniatura selecionada
        const ativa = miniaturasCont.children[fotoIndice];
        if (ativa) {
            ativa.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }
}

// Função auxiliar para clicar na miniatura
function irParaFoto(index) {
    fotoIndice = index;
    atualizarVisualizacao();
}

// 2. FUNÇÃO PARA OS BOTÕES DAS SETAS (ESQUERDA / DIREITA)
function mudarFoto(direcao) {
  const listaImagens = (veiculoAtual && veiculoAtual.imagens) ? veiculoAtual.imagens : [];
  if (listaImagens.length === 0) return;

  fotoIndice += direcao;

  if (fotoIndice >= listaImagens.length) fotoIndice = 0;
  if (fotoIndice < 0) fotoIndice = listaImagens.length - 1;

  atualizarVisualizacao();
}

// 3. FUNÇÃO PARA FECHAR O MODAL E LIMPAR TUDO
function fecharGaleria() {
  const modal = document.getElementById('modal-galeria');
  modal.classList.replace('flex', 'hidden');
  document.body.style.overflow = 'auto'; // Devolve o scroll ao site
  veiculoAtual = null; // Limpa a seleção
}

/*
function atualizarVisualizacao() {
  const fotos = (veiculoAtual.imagens && veiculoAtual.imagens.length > 0) ? veiculoAtual.imagens : [imgBrevemente];
  document.getElementById('foto-grande').src = fotos[fotoIndice];
  
  const miniCont = document.getElementById('miniaturas');
  miniCont.innerHTML = fotos.map((img, i) => `
    <img src="${img}" onclick="fotoIndice=${i}; atualizarVisualizacao()" 
      class="h-20 w-28 object-cover cursor-pointer border-2 ${i === fotoIndice ? 'border-black' : 'border-transparent'}">
  `).join('');
}

function mudarFotoCard(dir) {
  const fotos = (veiculoAtual.imagens && veiculoAtual.imagens.length > 0) ? veiculoAtual.imagens : [imgBrevemente];
  fotoIndice = (fotoIndice + dir + fotos.length) % fotos.length;
  atualizarVisualizacao();
}

function fecharGaleria() {
  document.getElementById('modal-galeria').classList.replace('flex', 'hidden');
  document.body.style.overflow = 'auto';
}
*/

function abrirZoom() {
  const principal = document.getElementById('foto-principal');
  const zoomImg = document.getElementById('img-zoom');
  if (principal && zoomImg) {
    zoomImg.src = principal.src;
    document.getElementById('zoom-overlay').classList.remove('hidden');
  }
}

function fecharZoom() {
  document.getElementById('zoom-overlay').classList.add('hidden');
}

function ordenarVeiculos() {
  const criterio = document.getElementById("ordem-preco").value;
  if (criterio === "default") return;

  // Ordenar a categoria ativa
  veiculos[categoriaAtual].sort((a, b) => {
    // Removemos símbolos e convertemos para número para comparar
    const pA = parseFloat(a.preco.replace(/[^0-9,.]/g, '').replace(',', '.')) || 0;
    const pB = parseFloat(b.preco.replace(/[^0-9,.]/g, '').replace(',', '.')) || 0;
    return criterio === "crescente" ? pA - pB : pB - pA;
  });

  // Re-renderizar para mostrar a nova ordem
  mostrarCategoria(categoriaAtual);
}

// --- INICIALIZAÇÃO ---
window.onload = () => {
  mostrarCategoria('carros');
};

document.onkeydown = (e) => {
  if (e.key === "Escape") { fecharZoom(); fecharGaleria(); }
  if (e.key === "ArrowLeft") mudarFotoCard(-1);
  if (e.key === "ArrowRight") mudarFotoCard(1);
};