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
      specs: { motor: "3.0 TwinPower Turbo", potencia: "450 cv", transmissao: "DCT 7 Velocidades", ano: "2018" }
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
            Parachoques Cupra frente
            Parachoques Cupra atrás
            Aleron Cupra
            Jantes OZ superleggera 16
            Coils AP

            Interior:
            Tecto e pilares preto
            Volante cupra sem botões
            Manete mudanças Fr
            Backets sparco
            Rádio 2din

            Motor:
            Bloco 2.0
            Pistons abertos com tratamento ceramic
            Bielas maxspeed
            Junta original de 1 mosca
            Cabeça tralhada
            Molas valvulas
            Came 280°
            Tuches mecânicas
            Pernos Cabeça ARP
            Injetores BE +160%
            Linha 76mm
            Tubagens ic 70mm
            Balão admissão 100mm
            Sensor map 4bar
            Kit methanol
            Kit nitro
            Turbo bmw VK2270
            IC semelhante ao S3 mas de maior capacidade
            2 radiadores Gasoleo
            1 radiador Óleo
            Caixa velocidades FJW com reforço da 4º + veio primario e rolamentos `,
      specs: { motor: "1.9 TDI", potencia: "4xx cv", turbo: "28.71", ano: "2006" }
    },
    {
      nome: "BMW 120D XDrive",
      detalhes: "108.xxx km • 2018 • Gasóleo • Caixa Automática",
      preco: "21.990€",
      status: "disponivel",
      imagens: ["Disponiveis/120d/20250422_151955.jpg", "Disponiveis/120d/20250422_151809.jpg", "Disponiveis/120d/20250422_151740.jpg", "Disponiveis/120d/20250422_151733.jpg", "Disponiveis/120d/20250422_151713.jpg", "Disponiveis/120d/20250422_151703.jpg", "Disponiveis/120d/20250422_151634.jpg", "Disponiveis/120d/20250422_151614.jpg", "Disponiveis/120d/20250422_151601.jpg", "Disponiveis/120d/20250422_150840.jpg", "Disponiveis/120d/20250422_145800.jpg", "Disponiveis/120d/20250422_145748.jpg", "Disponiveis/120d/20250422_145732.jpg", "Disponiveis/120d/20250422_145725.jpg", "Disponiveis/120d/20250422_145714.jpg", "Disponiveis/120d/20250422_145702.jpg", "Disponiveis/120d/20250422_145651.jpg", "Disponiveis/120d/20250422_145640.jpg"
      ]
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

  // --- NOVO: Contador e Animação ---
  const total = filtrados.length;
  const textoContador = `<div class="col-span-full mb-4 opacity-0 animate-fade-in">
    <span class="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium">
      ${total} ${total === 1 ? 'veículo encontrado' : 'veículos encontrados'}
    </span>
  </div>`;

  // Reset da animação
  lista.classList.remove('opacity-100');
  lista.classList.add('opacity-0', 'translate-y-4');

  setTimeout(() => {
    lista.innerHTML = total === 0 
      ? `<p class="col-span-full text-center py-20 text-gray-400 uppercase text-[10px] tracking-widest">Nenhum veículo encontrado.</p>`
      : textoContador + filtrados.map((v, i) => criarCardHTML(v, i, cat)).join("");
    
    // Ativa a animação de entrada
    lista.classList.replace('opacity-0', 'opacity-100');
    lista.classList.replace('translate-y-4', 'translate-y-0');
  }, 150);

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
    vendido: { texto: 'Vendido', classe: 'bg-black text-white' } // Badge preto para vendidos
  };
  const badge = statusLabels[v.status] || statusLabels.disponivel;

  return `
    <article class="group bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
      <div class="relative aspect-[4/3] cursor-pointer overflow-hidden skeleton bg-zinc-200">
        
        <img src="${imagem}" 
             onclick="abrirGaleria('${cat}', ${index})" 
             class="w-full h-full object-cover transition duration-700 group-hover:scale-110 
             ${isVendido ? 'grayscale brightness-[0.6] contrast-[1.2]' : ''}">
        
        ${isVendido ? '<div class="absolute inset-0 bg-black/20 pointer-events-none"></div>' : ''}

        <button onclick="toggleFavorito(event, '${v.nome}')" class="absolute top-4 left-4 z-20 p-2 bg-black/20 backdrop-blur-md rounded-full text-white text-sm">
          ${isFav ? '❤️' : '🤍'}
        </button>
        
        <div class="absolute top-4 right-4 px-3 py-1 text-[9px] uppercase font-bold ${badge.classe}">${badge.texto}</div>
      </div>

      <div class="p-8 ${isVendido ? 'opacity-60' : ''}">
        <h3 class="display-font text-2xl mb-2">${v.nome}</h3>
        <p class="text-gray-400 text-[10px] uppercase tracking-widest mb-6 border-b pb-4">${v.detalhes}</p>
        <div class="flex justify-between items-center">
           <div>
              <span class="text-[9px] text-gray-400 block uppercase">Investimento</span>
              <span class="text-xl font-light">${isVendido ? '---' : v.preco}</span>
           </div>
           <button onclick="abrirGaleria('${cat}', ${index})" 
             class="border border-black dark:border-white px-6 py-2 text-[10px] uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition">
             ${isVendido ? 'Ver Detalhes' : 'Explorar'}
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

  document.getElementById('modal-galeria').classList.replace('hidden', 'flex');
  document.body.style.overflow = 'hidden';

  document.getElementById('modal-nome').innerText = veiculoAtual.nome;
  document.getElementById('modal-detalhes').innerText = veiculoAtual.detalhes;
  document.getElementById('modal-descricao').innerText = veiculoAtual.descricao || "Contacte-nos para mais informações.";
  
  const sCont = document.getElementById('modal-specs');
  sCont.innerHTML = "";
  if(veiculoAtual.specs) {
    Object.entries(veiculoAtual.specs).forEach(([k, val]) => {
      sCont.innerHTML += `<div class="border p-3"><span class="block text-[9px] text-gray-400 uppercase">${k}</span><span class="text-xs font-bold uppercase">${val}</span></div>`;
    });
  }

  const msg = encodeURIComponent(`Olá Ivo, gostaria de saber mais sobre o ${veiculoAtual.nome}.`);
  document.getElementById('modal-footer-content').innerHTML = `
    <div class="flex flex-col sm:flex-row justify-between items-center gap-6 w-full pt-4">
      <div><span class="text-[10px] text-gray-400 uppercase block">Investimento</span><span class="text-3xl font-light">${veiculoAtual.preco}</span></div>
      <a href="https://wa.me/${telefone}?text=${msg}" target="_blank" class="bg-black dark:bg-white text-white dark:text-black px-12 py-4 text-[10px] uppercase tracking-widest hover:opacity-80 transition">Solicitar Informações</a>
    </div>`;

  atualizarVisualizacao();
}

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

function abrirZoom() {
  document.getElementById('img-zoom').src = document.getElementById('foto-grande').src;
  document.getElementById('zoom-overlay').classList.remove('hidden');
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