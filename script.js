const telefone = "351XXXXXXXXX"; 
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
      descricao: "Viatura num estado irrepreensível, com histórico completo na marca. Um verdadeiro ícone de performance com o pack Competition original.",
      specs: { motor: "3.0 TwinPower Turbo", potencia: "450 cv", transmissao: "DCT 7 Velocidades", traçao: "Traseira", aceleracao: "4.0s (0-100 km/h)" }
    },
    {
      nome: "Seat Ibiza 6l",
      detalhes: "4xx Cv • 2006 • Gasóleo • Kit Nitro/Metanol",
      preco: "8.990€",
      status: "vendido",
      imagens: [
        "Disponiveis/6l-1/6l1.jpg", "Disponiveis/6l-1/6l2.jpg", "Disponiveis/6l-1/6l3.jpg", 
        "Disponiveis/6l-1/6l4.jpg", "Disponiveis/6l-1/6l5.jpg", "Disponiveis/6l-1/6l6.jpg", 
        "Disponiveis/6l-1/6l7.jpg", "Disponiveis/6l-1/6l8.jpg", "Disponiveis/6l-1/6l9.jpg"
      ],
      descricao: "Projeto de alta performance, focado em provas de aceleração. Viatura totalmente revista.",
      specs: { motor: "1.9 TDI Alargado a 2.0", turbo: "28.71", preparacao: "Stage 4" }
    },
    {
      nome: "BMW 120D XDrive",
      detalhes: "108.xxx km • 2018 • Gasóleo • Caixa Automática",
      preco: "21.990€",
      status: "disponivel",
      imagens: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200"]
    },
    {
      nome: "Mercedes CLK 200 KOMPRESSOR",
      detalhes: "191.xxx km • 2003 • Gasolina • Caixa Automática",
      preco: "14.990€",
      status: "disponivel",
      imagens: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200"]
    }
  ],
  motas: [
    {
      nome: "Yamaha MT-09",
      detalhes: "7.300 km • 2020 • 900cc",
      preco: "8.500€",
      status: "vendido",
      imagens: [
        "Disponiveis/MT09/mt1.jpg", "Disponiveis/MT09/mt2.jpg", "Disponiveis/MT09/mt3.jpg",
        "Disponiveis/MT09/mt4.jpg", "Disponiveis/MT09/mt5.jpg", "Disponiveis/MT09/mt6.jpg",
        "Disponiveis/MT09/mt7.jpg", "Disponiveis/MT09/mt8.jpg", "Disponiveis/MT09/mt9.jpg"
      ]
    },
    {
      nome: "Casal K191",
      detalhes: "Relíquia • 1971 • 49cc",
      preco: "2.500€",
      status: "disponivel",
      imagens: ["https://images.unsplash.com/photo-1449491026472-43219488dcb1?auto=format&fit=crop&q=80&w=1200"]
    }
  ],
  outros: [
    {
      nome: "Carrinha de Trabalho",
      detalhes: "200.000 km • Diesel • Pronta a faturar",
      preco: "4.000€",
      status: "disponivel",
      imagens: ["https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1200"]
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
  // Impede que o clique no coração abra a galeria do carro
  if (event) event.stopPropagation();

  const index = favoritos.indexOf(nomeVeiculo);
  
  if (index === -1) {
    favoritos.push(nomeVeiculo); // Adiciona se não existir
  } else {
    favoritos.splice(index, 1); // Remove se já existir
  }

  // Guarda na memória do browser
  localStorage.setItem('stand_favs', JSON.stringify(favoritos));
  
  // Atualiza o número no botão do topo
  atualizarContagemFavs();
  
  // Refresh visual: se estivermos a ver favoritos, remove o card. 
  // Se não, apenas atualiza o ícone.
  const btnFav = document.getElementById('btn-ver-favoritos');
  if (btnFav && btnFav.classList.contains('bg-red-500')) {
    renderizarFavoritos();
  } else {
    // Apenas redesenha a categoria atual para mostrar o ❤️ preenchido
    const lista = document.getElementById("lista-veiculos");
    lista.style.transition = "none"; // Evita o fade-in ao clicar no favorito
    mostrarCategoria(categoriaAtual);
  }
}

function atualizarContagemFavs() {
  const favCount = document.getElementById('fav-count');
  if (favCount) favCount.innerText = favoritos.length;
}

function toggleVerFavoritos() {
  const btn = document.getElementById('btn-ver-favoritos');
  const isAtivo = btn.classList.toggle('bg-red-500');
  btn.classList.toggle('text-white');
  
  if (isAtivo) {
    renderizarFavoritos();
  } else {
    mostrarCategoria(categoriaAtual);
  }
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

// --- RENDERIZAÇÃO E CATEGORIAS ---

function mostrarCategoria(cat) {
  categoriaAtual = cat;
  gerarFiltrosMarcas();
  atualizarContagemFavs();

  // Se o botão de favoritos estiver ativo ao mudar de categoria, desativamos
  const btnFav = document.getElementById('btn-ver-favoritos');
  if (btnFav) {
    btnFav.classList.remove('bg-red-500', 'text-white');
  }

  let veiculosParaExibir = veiculos[cat];
  if (filtroMarcaAtual !== 'todas') {
    veiculosParaExibir = veiculosParaExibir.filter(v => v.nome.startsWith(filtroMarcaAtual));
  }

  const lista = document.getElementById("lista-veiculos");
  if (!lista) return;

  lista.style.opacity = "0";
  setTimeout(() => {
    lista.innerHTML = veiculosParaExibir.map((v, i) => criarCardHTML(v, i, cat)).join("");
    lista.style.opacity = "1";
    
    document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("btn-active"));
    const btnAtivo = document.getElementById(`btn-${cat}`);
    if (btnAtivo) btnAtivo.classList.add("btn-active");
  }, 250);
}

function criarCardHTML(v, index, cat) {
  const isFav = favoritos.includes(v.nome);
  const isVendido = v.status === 'vendido';
  const statusLabels = {
    disponivel: { texto: 'Disponível', classe: 'bg-white/90 text-black' },
    reservado: { texto: 'Reservado', classe: 'bg-amber-500 text-white' },
    vendido: { texto: 'Vendido', classe: 'bg-zinc-500 text-white' }
  };
  const badge = statusLabels[v.status] || statusLabels.disponivel;

  return `
    <article class="group bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
      <div class="relative aspect-[4/3] cursor-pointer overflow-hidden">
        <img src="${v.imagens[0]}" onclick="abrirGaleria('${cat}', ${index})" class="w-full h-full object-cover transition duration-700 group-hover:scale-110 ${isVendido ? 'grayscale opacity-50' : ''}">
        
        <button onclick="toggleFavorito(event, '${v.nome}')" 
                class="absolute top-4 left-4 z-30 p-2 bg-black/20 backdrop-blur-md rounded-full hover:bg-black/60 transition-all duration-300 group/fav">
          <span class="${isFav ? 'text-red-500 scale-110' : 'text-white opacity-70 group-hover/fav:opacity-100'} text-sm block transition-transform">
            ${isFav ? '❤️' : '🤍'}
          </span>
        </button>

        <div class="absolute top-4 right-4 px-3 py-1 text-[9px] uppercase font-bold ${badge.classe}">${badge.texto}</div>
      </div>
      
      <div class="p-8">
        <h3 class="display-font text-2xl mb-2">${v.nome}</h3>
        <p class="text-gray-400 text-[10px] uppercase tracking-widest mb-6 border-b pb-4">${v.detalhes}</p>
        <div class="flex justify-between items-center gap-4">
           <div>
              <span class="text-[9px] text-gray-400 uppercase block tracking-widest">Investimento</span>
              <span class="text-xl font-light">${isVendido ? '---' : v.preco}</span>
           </div>
           <button onclick="abrirGaleria('${cat}', ${index})" class="border border-black dark:border-white px-6 py-2 text-[10px] uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition">Explorar</button>
        </div>
      </div>
    </article>`;
}

// --- GALERIA E ZOOM ---

function abrirGaleria(cat, index) {
  // Se for da lista de favoritos, temos de encontrar o veículo no array original
  if (cat === 'favoritos') {
    const todos = [...veiculos.carros, ...veiculos.motas, ...veiculos.outros];
    const filtrados = todos.filter(v => favoritos.includes(v.nome));
    veiculoAtual = filtrados[index];
  } else {
    veiculoAtual = veiculos[cat][index];
  }

  if (!veiculoAtual) return;
  fotoIndice = 0;

  document.getElementById('modal-nome').innerText = veiculoAtual.nome;
  document.getElementById('modal-detalhes').innerText = veiculoAtual.detalhes;
  document.getElementById('modal-descricao').innerText = veiculoAtual.descricao || "Sem descrição disponível.";

  const sCont = document.getElementById('modal-specs');
  sCont.innerHTML = "";
  if(veiculoAtual.specs) {
    Object.entries(veiculoAtual.specs).forEach(([k, val]) => {
      sCont.innerHTML += `<div class="border border-gray-100 dark:border-zinc-800 p-3">
        <span class="block text-[9px] text-gray-400 uppercase tracking-widest mb-1">${k}</span>
        <span class="text-xs font-bold uppercase dark:text-zinc-200">${val}</span>
      </div>`;
    });
  }

  const msg = encodeURIComponent(`Olá Ivo, gostaria de saber mais sobre o ${veiculoAtual.nome}.`);
  document.getElementById('modal-footer-content').innerHTML = `
    <div class="flex flex-col sm:flex-row justify-between items-center gap-6 w-full pt-4">
      <div>
        <span class="text-[10px] text-gray-400 uppercase block tracking-widest mb-1">Investimento</span>
        <span class="text-3xl font-light dark:text-zinc-200">${veiculoAtual.preco}</span>
      </div>
      <a href="https://wa.me/${telefone}?text=${msg}" target="_blank" class="w-full sm:w-auto text-center bg-black dark:bg-white text-white dark:text-black px-12 py-4 text-[10px] uppercase tracking-[0.2em] hover:opacity-80 transition shadow-lg">Solicitar Informações</a>
    </div>`;

  atualizarVisualizacao();
  document.getElementById('modal-galeria').classList.replace('hidden', 'flex');
  document.body.style.overflow = 'hidden';
}

function mudarFotoCard(direcao) {
  if (!veiculoAtual) return;
  fotoIndice = (fotoIndice + direcao + veiculoAtual.imagens.length) % veiculoAtual.imagens.length;
  atualizarVisualizacao();
}

function mudarFotoPrincipal(src, index) {
  fotoIndice = index;
  atualizarVisualizacao();
}

function atualizarVisualizacao() {
  document.getElementById('foto-grande').src = veiculoAtual.imagens[fotoIndice];
  const miniCont = document.getElementById('miniaturas');
  miniCont.innerHTML = veiculoAtual.imagens.map((img, i) => {
    const isActive = i === fotoIndice;
    return `
      <div class="flex-shrink-0 transition-all duration-300 ${isActive ? 'scale-105' : 'scale-100'}">
        <img src="${img}" onclick="mudarFotoPrincipal('${img}', ${i})" 
             class="h-16 w-24 md:h-20 md:w-28 object-cover cursor-pointer rounded-sm transition-all duration-500
             ${isActive ? 'ring-2 ring-black dark:ring-white opacity-100' : 'opacity-30 hover:opacity-60 grayscale-[30%] hover:grayscale-0'}">
      </div>`;
  }).join('');

  const alvo = miniCont.children[fotoIndice];
  if (alvo) alvo.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function fecharGaleria() {
  document.getElementById('modal-galeria').classList.replace('flex', 'hidden');
  document.body.style.overflow = 'auto';
}

function abrirZoom() {
  const srcOriginal = document.getElementById('foto-grande').src;
  document.getElementById('img-zoom').src = srcOriginal;
  document.getElementById('zoom-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function fecharZoom() {
  document.getElementById('zoom-overlay').classList.add('hidden');
  if (!document.getElementById('modal-galeria').classList.contains('hidden')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}

function ordenarVeiculos() {
  const criterio = document.getElementById("ordem-preco").value;
  if (criterio === "default") return;

  // Ordenamos o array da categoria atual
  veiculos[categoriaAtual].sort((a, b) => {
    const precoA = parseInt(a.preco.replace(/[^0-9]/g, '')) || 0;
    const precoB = parseInt(b.preco.replace(/[^0-9]/g, '')) || 0;

    return criterio === "crescente" ? precoA - precoB : precoB - precoA;
  });

 // Remove a cor preta de todos os botões
document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("btn-active"));

// Adiciona ao botão que clicaste
const btnAtivo = document.getElementById(`btn-${cat}`);
if (btnAtivo) btnAtivo.classList.add("btn-active"); // Atualizamos a vista (a função mostrarCategoria já lida com o filtro de marca)
  mostrarCategoria(categoriaAtual);
}


// --- INICIALIZAÇÃO ---

window.onload = () => {
  mostrarCategoria('carros');
  atualizarContagemFavs();
};

document.onkeydown = (e) => {
  const modal = document.getElementById('modal-galeria');
  const zoom = document.getElementById('zoom-overlay');
  
  if (!zoom.classList.contains('hidden')) {
    if (e.key === "Escape") fecharZoom();
    return;
  }

  if (!modal.classList.contains('hidden')) {
    if (e.key === "ArrowLeft") mudarFotoCard(-1);
    if (e.key === "ArrowRight") mudarFotoCard(1);
    if (e.key === "Escape") fecharGaleria();
  }
};