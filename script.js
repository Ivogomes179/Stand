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
        "Disponiveis/M4/m4-4.jpeg", "Disponiveis/M4/m4-5.jpeg", "Disponiveis/M4/m4-6.jpeg"
      ],
      descricao: "Viatura num estado irrepreensível, com histórico completo na marca.",
      specs: { motor: "3.0 TwinPower Turbo", potencia: "450 cv", transmissao: "DCT 7 Velocidades" }
    },
    {
      nome: "Seat Ibiza 6l",
      detalhes: "4xx Cv • 2006 • Gasóleo • Manual",
      preco: "8.990€",
      status: "vendido",
      imagens: ["Disponiveis/6l-1/6l1.jpg"],
      descricao: "Projeto de alta performance.",
      specs: { motor: "1.9 TDI", turbo: "28.71" }
    },
    {
      nome: "BMW 120D XDrive",
      detalhes: "108.xxx km • 2018 • Gasóleo • Caixa Automática",
      preco: "21.990€",
      status: "disponivel",
      imagens: []
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
      imagens: ["Disponiveis/MT09/mt1.jpg"]
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
    {
      nome: "Carrinha de Trabalho",
      detalhes: "200.000 km • Gasóleo • Manual",
      preco: "4.000€",
      status: "disponivel",
      imagens: []
    }
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

  lista.innerHTML = filtrados.length === 0 
    ? `<p class="col-span-full text-center py-20 text-gray-400 uppercase text-[10px] tracking-widest">Nenhum veículo encontrado.</p>`
    : filtrados.map((v, i) => criarCardHTML(v, i, cat)).join("");

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