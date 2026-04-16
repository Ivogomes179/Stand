const telefone = "351XXXXXXXXX"; 
let categoriaAtual = 'carros';
let fotoIndice = 0;
let veiculoAtual = null;

const veiculos = {
  carros: [
    {
      nome: "BMW M4 Competition",
      detalhes: "43.xxx km • 2018 • Gasolina",
      preco: "64.990€",
      status: "reservado",
      imagens: [
        "Disponiveis/M4/m4-1.jpeg", "Disponiveis/M4/m4-2.jpeg", "Disponiveis/M4/m4-3.jpeg",
        "Disponiveis/M4/m4-4.jpeg", "Disponiveis/M4/m4-5.jpeg", "Disponiveis/M4/m4-6.jpeg"
      ],
      descricao: "Viatura num estado irrepreensível.",
      specs: { "Motor": "3.0 Turbo", "Potência": "450 cv" }
    },
    {
      nome: "Seat Ibiza 6l",
      detalhes: "2006 • Diesel",
      preco: "8.990€",
      status: "vendido",
      imagens: [
        "Disponiveis/6l-1/6l1.jpg", "Disponiveis/6l-1/6l2.jpg", "Disponiveis/6l-1/6l3.jpg"
      ],
      descricao: "Projeto único.",
      specs: { "Motor": "1.9 TDI", "Potência": "400+ cv" }
    }
  ],
  motas: [],
  outros: []
};

function mostrarCategoria(cat) {
  categoriaAtual = cat;
  const lista = document.getElementById("lista-veiculos");
  if (!lista) return;
  
  lista.innerHTML = veiculos[cat].map((v, index) => {
    return `
    <article class="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm">
      <div class="relative aspect-[4/3] cursor-pointer" onclick="abrirGaleria('${cat}', ${index})">
        <img src="${v.imagens[0]}" class="w-full h-full object-cover">
      </div>
      <div class="p-6">
        <h3 class="display-font text-xl mb-2">${v.nome}</h3>
        <p class="text-gray-400 text-[10px] uppercase mb-4">${v.detalhes}</p>
        <div class="flex items-center justify-between">
          <span class="text-lg font-bold">${v.preco}</span>
          <button onclick="abrirGaleria('${cat}', ${index})" class="border border-black dark:border-white px-4 py-2 text-[10px] uppercase">Ver Mais</button>
        </div>
      </div>
    </article>`;
  }).join("");
}

function abrirGaleria(cat, index) {
  const v = veiculos[cat][index];
  if (!v) return;
  veiculoAtual = v;
  fotoIndice = 0;

  // Preencher textos
  document.getElementById('modal-nome').innerText = v.nome;
  document.getElementById('modal-detalhes').innerText = v.detalhes;
  document.getElementById('modal-descricao').innerText = v.descricao || "";
  
  // Footer (Preço e WhatsApp)
  document.getElementById('modal-footer-content').innerHTML = `
    <div class="flex justify-between items-center w-full">
      <span class="text-2xl font-light">${v.preco}</span>
      <a href="https://wa.me/${telefone}" target="_blank" class="bg-black dark:bg-white text-white dark:text-black px-8 py-3 text-[10px] uppercase tracking-widest">Contactar</a>
    </div>`;

  // Specs
  const sCont = document.getElementById('modal-specs');
  sCont.innerHTML = "";
  if(v.specs) {
    Object.entries(v.specs).forEach(([k, val]) => {
      sCont.innerHTML += `<div class="border border-gray-100 dark:border-zinc-800 p-3"><span class="block text-[9px] text-gray-400 uppercase">${k}</span><span class="text-xs font-bold uppercase">${val}</span></div>`;
    });
  }

  // Mostrar Imagem e Modal
  atualizarVisualizacao();
  document.getElementById('modal-galeria').classList.remove('hidden');
  document.getElementById('modal-galeria').classList.add('flex');
  document.body.style.overflow = 'hidden';
}

// ESTA É A FUNÇÃO QUE RESOLVE O TEU PROBLEMA
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
  const url = veiculoAtual.imagens[fotoIndice];
  document.getElementById('foto-grande').src = url;
  
  // Renderizar miniaturas
  const miniCont = document.getElementById('miniaturas');
  miniCont.innerHTML = veiculoAtual.imagens.map((img, i) => `
    <img src="${img}" onclick="mudarFotoPrincipal('${img}', ${i})" 
    class="h-20 w-24 flex-shrink-0 object-cover cursor-pointer border-2 transition-all 
    ${i === fotoIndice ? 'border-black dark:border-white scale-105' : 'border-transparent opacity-40'}">
  `).join('');
}

function fecharGaleria() {
  document.getElementById('modal-galeria').classList.add('hidden');
  document.getElementById('modal-galeria').classList.remove('flex');
  document.body.style.overflow = 'auto';
}

window.onload = () => mostrarCategoria('carros');