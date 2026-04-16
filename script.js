const telefone = "351XXXXXXXXX";
let categoriaAtual = 'carros';
let slideshowInterval;
let fotoIndice = 0;
let veiculoAtual = null;

// 1. BASE DE DADOS
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
      ]
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
      ]
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

// 2. MODO NOTURNO
function aplicarModoNoturno() {
  const hora = new Date().getHours();
  const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (hora >= 19 || hora <= 7 || prefereEscuro) {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = "#0a0a0a";
    document.body.style.color = "#f5f5f5";
  }
}

// 3. CONSTRUTOR DE CARDS
function criarCard(v, index, categoria) {
  const msg = encodeURIComponent(`Olá Ivo, gostaria de saber mais detalhes sobre o ${v.nome}.`);
  const statusLabels = {
    disponivel: { texto: 'Disponível', classe: 'bg-white/90 text-black' },
    reservado: { texto: 'Reservado', classe: 'bg-amber-500 text-white' },
    vendido: { texto: 'Vendido', classe: 'bg-zinc-500 text-white' }
  };
  
  const badge = statusLabels[v.status] || statusLabels.disponivel;
  const isVendido = v.status === 'vendido';

  return `
    <article class="card-animado group bg-white dark:bg-transparent border border-gray-100 dark:border-zinc-800 overflow-hidden hover:border-gray-300 dark:hover:border-zinc-600 transition-all duration-500 shadow-sm hover:shadow-lg">
      <div class="relative overflow-hidden aspect-[4/3] cursor-pointer" onclick="abrirGaleria('${categoria}', ${index})">
        <img src="${v.imagens[0]}" alt="${v.nome}" 
             class="w-full h-full object-cover ${isVendido ? 'grayscale opacity-50' : 'grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110'} transition duration-700">
        
        <div class="absolute top-4 right-4 px-3 py-1 text-[9px] uppercase tracking-widest font-bold ${badge.classe}">
          ${badge.texto}
        </div>

        ${!isVendido ? `
        <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <span class="text-white text-[10px] uppercase tracking-[0.3em] border border-white px-4 py-2 bg-black/20 backdrop-blur-sm">Explorar Galeria</span>
        </div>` : ''}
      </div>

      <div class="p-8">
        <h3 class="display-font text-2xl mb-2">${v.nome}</h3>
        
        ${v.nome.includes('M4') ? `
          <div class="inline-block badge-premium px-2 py-0.5 text-[8px] uppercase tracking-widest font-bold mb-3 rounded-sm">
            Histórico Verificado BMW
          </div>
        ` : ''}

        <p class="text-gray-400 text-[10px] uppercase tracking-widest mb-6 border-b border-gray-50 dark:border-zinc-900 pb-4">${v.detalhes}</p>

        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span class="text-[9px] text-gray-400 uppercase block tracking-widest">Investimento</span>
            <span class="text-xl font-light tracking-tighter dark:text-zinc-200">${isVendido ? '---' : v.preco}</span>
          </div>

          <a href="https://wa.me/${telefone}?text=${msg}" target="_blank"
            class="w-full sm:w-auto text-center border border-black dark:border-white text-black dark:text-white px-6 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
            Contactar
          </a>
        </div>
      </div>
    </article>
  `;
}

// 4. GESTÃO DA GALERIA
function abrirGaleria(categoria, index) {
  const v = veiculos[categoria][index];
  veiculoAtual = v;
  fotoIndice = 0;

  const modal = document.getElementById('modal-galeria');
  const fotoGrande = document.getElementById('foto-grande');
  const contentorMiniaturas = document.getElementById('miniaturas');

  fotoGrande.src = v.imagens[0];
  contentorMiniaturas.scrollLeft = 0; 
  renderizarMiniaturas(v.imagens);

  // Lógica dos botões de controle (CORRIGIDO: Agora dentro da função)
  if (!document.getElementById('controles-extra')) {
    const controles = document.createElement('div');
    controles.id = 'controles-extra';
    controles.className = 'flex gap-6 mt-6 justify-center';
    controles.innerHTML = `
      <button onclick="toggleSlideshow()" id="btn-play" class="text-[10px] uppercase tracking-widest border border-black dark:border-white px-4 py-2 hover:bg-black hover:text-white transition dark:text-white">Auto Play</button>
      <button onclick="partilharVeiculo()" class="text-[10px] uppercase tracking-widest border border-black dark:border-white px-4 py-2 hover:bg-black hover:text-white transition dark:text-white">Partilhar [↑]</button>
    `;
    modal.querySelector('.max-w-5xl').appendChild(controles);
  }

  modal.classList.replace('hidden', 'flex');
  document.body.style.overflow = 'hidden';
}

function toggleSlideshow() {
  const btn = document.getElementById('btn-play');
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
    btn.innerText = "Auto Play";
  } else {
    btn.innerText = "Parar [||]";
    slideshowInterval = setInterval(() => {
      fotoIndice = (fotoIndice + 1) % veiculoAtual.imagens.length;
      mudarFotoPrincipal(veiculoAtual.imagens[fotoIndice], fotoIndice);
    }, 3000);
  }
}

function partilharVeiculo() {
  const texto = `Vê este ${veiculoAtual.nome} no Stand Ivo Gomes!`;
  if (navigator.share) {
    navigator.share({ title: 'Ivo Gomes Stand', text: texto, url: window.location.href });
  } else {
    navigator.clipboard.writeText(`${texto} ${window.location.href}`);
    alert("Link copiado!");
  }
}

function fecharGaleria() {
  if (slideshowInterval) toggleSlideshow();
  document.getElementById('modal-galeria').classList.replace('flex', 'hidden');
  document.body.style.overflow = 'auto';
}

function renderizarMiniaturas(imagens) {
  const contentor = document.getElementById('miniaturas');
  contentor.innerHTML = imagens.map((img, i) => `
    <img src="${img}" onclick="mudarFotoPrincipal('${img}', ${i})" 
         class="h-16 w-20 object-cover cursor-pointer hover:opacity-80 transition border-2 ${i === 0 ? 'border-black dark:border-white' : 'border-transparent'}">
  `).join('');
}

function mudarFotoPrincipal(src, index) {
  document.getElementById('foto-grande').src = src;
  fotoIndice = index;
}

// 5. NAVEGAÇÃO E ORDENAÇÃO
function mostrarCategoria(cat) {
  categoriaAtual = cat;
  const seletor = document.getElementById("ordem-preco");
  if(seletor) seletor.value = "default";

  const lista = document.getElementById("lista-veiculos");
  lista.style.opacity = "0";

  setTimeout(() => {
    lista.innerHTML = veiculos[cat].map((v, index) => criarCard(v, index, cat)).join("");
    lista.style.opacity = "1";
    document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("btn-active"));
    const btnAtivo = document.getElementById(`btn-${cat}`);
    if(btnAtivo) btnAtivo.classList.add("btn-active");
  }, 250);
}

function ordenarVeiculos() {
  const criterio = document.getElementById("ordem-preco").value;
  const lista = document.getElementById("lista-veiculos");
  let itensOrdenados = [...veiculos[categoriaAtual]];

  if (criterio === "crescente") {
    itensOrdenados.sort((a, b) => parseFloat(a.preco.replace(/[^0-9,-]+/g,"")) - parseFloat(b.preco.replace(/[^0-9,-]+/g,"")));
  } else if (criterio === "decrescente") {
    itensOrdenados.sort((a, b) => parseFloat(b.preco.replace(/[^0-9,-]+/g,"")) - parseFloat(a.preco.replace(/[^0-9,-]+/g,"")));
  }

  lista.style.opacity = "0";
  setTimeout(() => {
    lista.innerHTML = itensOrdenados.map((v, index) => criarCard(v, index, categoriaAtual)).join("");
    lista.style.opacity = "1";
  }, 200);
}

// 6. INICIALIZAÇÃO
window.onload = () => {
  aplicarModoNoturno();
  mostrarCategoria("carros");
};