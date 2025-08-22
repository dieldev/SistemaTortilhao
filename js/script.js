// Dados simulados
let clientes = [
    {
        id: 1,
        nome: 'João',
        sobrenome: 'Silva',
        telefone: '(11) 99999-9999',
        email: 'joao@email.com',
        dataNascimento: '1985-03-15'
    },
    {
        id: 2,
        nome: 'Maria',
        sobrenome: 'Santos',
        telefone: '(11) 88888-8888',
        email: 'maria@email.com',
        dataNascimento: '1990-07-22'
    },
    {
        id: 3,
        nome: 'Pedro',
        sobrenome: 'Costa',
        telefone: '(11) 77777-7777',
        email: 'pedro@email.com',
        dataNascimento: '1988-11-10'
    }
];

let reservas = [
    {
        id: 1,
        clienteId: 1,
        data: '2024-12-25',
        horario: '19:00',
        pessoas: 4,
        tipoServico: 'rodizio'
    },
    {
        id: 2,
        clienteId: 2,
        data: '2024-12-25',
        horario: '20:30',
        pessoas: 2,
        tipoServico: 'alacarte'
    }
];

let proximoIdCliente = 4;
let proximoIdReserva = 3;
let clienteEditando = null;
let reservaEditando = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupMobileMenu();
    setupForms();
    updateClienteSelect();
    renderClientes();
    renderReservas();
}

// Navegação
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            
            // Remove active class from all nav items and pages
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            
            // Add active class to current nav item and page
            this.parentElement.classList.add('active');
            document.getElementById(targetPage).classList.add('active');
            
            // Close mobile menu if open
            closeMobileMenu();
        });
    });
}

// Menu Mobile
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');

    mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    document.getElementById('sidebar').classList.remove('active');
}

// Formulários
function setupForms() {
    // Formulário de Cliente
    const clienteForm = document.getElementById('clienteForm');
    clienteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        salvarCliente();
    });

    const cancelarClienteBtn = document.getElementById('cancelarCliente');
    cancelarClienteBtn.addEventListener('click', function() {
        limparFormularioCliente();
    });

    // Formulário de Reserva
    const reservaForm = document.getElementById('reservaForm');
    reservaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        salvarReserva();
    });

    const cancelarReservaBtn = document.getElementById('cancelarReserva');
    cancelarReservaBtn.addEventListener('click', function() {
        limparFormularioReserva();
    });
}

// Funções de Cliente
function salvarCliente() {
    const form = document.getElementById('clienteForm');
    const formData = new FormData(form);
    
    const cliente = {
        nome: formData.get('nome'),
        sobrenome: formData.get('sobrenome'),
        telefone: formData.get('telefone'),
        email: formData.get('email'),
        dataNascimento: formData.get('dataNascimento')
    };

    if (clienteEditando) {
        // Editar cliente existente
        cliente.id = clienteEditando;
        const index = clientes.findIndex(c => c.id === clienteEditando);
        clientes[index] = cliente;
        clienteEditando = null;
        
        // Atualizar texto do botão
        document.querySelector('#clienteForm button[type="submit"]').textContent = 'Cadastrar';
    } else {
        // Novo cliente
        cliente.id = proximoIdCliente++;
        clientes.push(cliente);
    }

    renderClientes();
    updateClienteSelect();
    limparFormularioCliente();
    
    alert('Cliente salvo com sucesso!');
}

function editarCliente(id) {
    const cliente = clientes.find(c => c.id === id);
    if (!cliente) return;

    // Preencher formulário
    document.getElementById('nome').value = cliente.nome;
    document.getElementById('sobrenome').value = cliente.sobrenome;
    document.getElementById('telefone').value = cliente.telefone;
    document.getElementById('email').value = cliente.email;
    document.getElementById('dataNascimento').value = cliente.dataNascimento;

    clienteEditando = id;
    
    // Alterar texto do botão
    document.querySelector('#clienteForm button[type="submit"]').textContent = 'Atualizar';
    
    // Navegar para a página de clientes
    document.querySelector('[data-page="clientes"]').click();
}

function excluirCliente(id) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        clientes = clientes.filter(c => c.id !== id);
        renderClientes();
        updateClienteSelect();
        alert('Cliente excluído com sucesso!');
    }
}

function limparFormularioCliente() {
    document.getElementById('clienteForm').reset();
    clienteEditando = null;
    document.querySelector('#clienteForm button[type="submit"]').textContent = 'Cadastrar';
}

function renderClientes() {
    const tbody = document.getElementById('clientesTableBody');
    tbody.innerHTML = '';

    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cliente.nome} ${cliente.sobrenome}</td>
            <td>${cliente.telefone}</td>
            <td>${cliente.email}</td>
            <td>${formatarData(cliente.dataNascimento)}</td>
            <td>
                <button class="btn-action edit" onclick="editarCliente(${cliente.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action delete" onclick="excluirCliente(${cliente.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function updateClienteSelect() {
    const select = document.getElementById('clienteSelect');
    select.innerHTML = '<option value="">Selecione um cliente</option>';

    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = `${cliente.nome} ${cliente.sobrenome}`;
        select.appendChild(option);
    });
}

// Funções de Reserva
function salvarReserva() {
    const form = document.getElementById('reservaForm');
    const formData = new FormData(form);
    
    const reserva = {
        clienteId: parseInt(formData.get('cliente')),
        data: formData.get('data'),
        horario: formData.get('horario'),
        pessoas: parseInt(formData.get('pessoas')),
        tipoServico: formData.get('tipoServico')
    };

    if (reservaEditando) {
        // Editar reserva existente
        reserva.id = reservaEditando;
        const index = reservas.findIndex(r => r.id === reservaEditando);
        reservas[index] = reserva;
        reservaEditando = null;
        
        // Atualizar texto do botão
        document.querySelector('#reservaForm button[type="submit"]').textContent = 'Reservar';
    } else {
        // Nova reserva
        reserva.id = proximoIdReserva++;
        reservas.push(reserva);
    }

    renderReservas();
    limparFormularioReserva();
    
    alert('Reserva salva com sucesso!');
}

function editarReserva(id) {
    const reserva = reservas.find(r => r.id === id);
    if (!reserva) return;

    // Preencher formulário
    document.getElementById('clienteSelect').value = reserva.clienteId;
    document.getElementById('dataReserva').value = reserva.data;
    document.getElementById('horarioReserva').value = reserva.horario;
    document.getElementById('numeroPessoas').value = reserva.pessoas;
    document.querySelector(`input[name="tipoServico"][value="${reserva.tipoServico}"]`).checked = true;

    reservaEditando = id;
    
    // Alterar texto do botão
    document.querySelector('#reservaForm button[type="submit"]').textContent = 'Atualizar';
    
    // Navegar para a página de reservas
    document.querySelector('[data-page="reservas"]').click();
}

function cancelarReserva(id) {
    if (confirm('Tem certeza que deseja cancelar esta reserva?')) {
        reservas = reservas.filter(r => r.id !== id);
        renderReservas();
        alert('Reserva cancelada com sucesso!');
    }
}

function limparFormularioReserva() {
    document.getElementById('reservaForm').reset();
    reservaEditando = null;
    document.querySelector('#reservaForm button[type="submit"]').textContent = 'Reservar';
}

function renderReservas() {
    const tbody = document.getElementById('reservasTableBody');
    tbody.innerHTML = '';

    reservas.forEach(reserva => {
        const cliente = clientes.find(c => c.id === reserva.clienteId);
        const nomeCliente = cliente ? `${cliente.nome} ${cliente.sobrenome}` : 'Cliente não encontrado';
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${nomeCliente}</td>
            <td>${formatarData(reserva.data)}</td>
            <td>${reserva.horario}</td>
            <td>${reserva.pessoas}</td>
            <td><span class="tipo-badge ${reserva.tipoServico}">${reserva.tipoServico === 'rodizio' ? 'Rodízio' : 'À la carte'}</span></td>
            <td>
                <button class="btn-action view" onclick="verDetalhes(${reserva.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-action edit" onclick="editarReserva(${reserva.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action delete" onclick="cancelarReserva(${reserva.id})">
                    <i class="fas fa-times"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Detalhes da Reserva
function verDetalhes(id) {
    const reserva = reservas.find(r => r.id === id);
    if (!reserva) return;

    const cliente = clientes.find(c => c.id === reserva.clienteId);
    const nomeCliente = cliente ? `${cliente.nome} ${cliente.sobrenome}` : 'Cliente não encontrado';

    // Preencher detalhes
    document.getElementById('detalheCliente').textContent = nomeCliente;
    document.getElementById('detalheData').textContent = formatarData(reserva.data);
    document.getElementById('detalheHorario').textContent = reserva.horario;
    document.getElementById('detalhePessoas').textContent = reserva.pessoas;
    
    const detalheTipo = document.getElementById('detalheTipo');
    detalheTipo.textContent = reserva.tipoServico === 'rodizio' ? 'Rodízio' : 'À la carte';
    detalheTipo.className = `tipo-badge ${reserva.tipoServico}`;

    // Armazenar ID da reserva para ações
    document.getElementById('detalhes-reserva').setAttribute('data-reserva-id', id);

    // Navegar para página de detalhes
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('detalhes-reserva').classList.add('active');
}

function voltarReservas() {
    document.querySelector('[data-page="reservas"]').click();
}

function editarReservaDetalhes() {
    const reservaId = parseInt(document.getElementById('detalhes-reserva').getAttribute('data-reserva-id'));
    editarReserva(reservaId);
}

function cancelarReservaDetalhes() {
    const reservaId = parseInt(document.getElementById('detalhes-reserva').getAttribute('data-reserva-id'));
    if (confirm('Tem certeza que deseja cancelar esta reserva?')) {
        reservas = reservas.filter(r => r.id !== reservaId);
        renderReservas();
        alert('Reserva cancelada com sucesso!');
        voltarReservas();
    }
}

// Utilitários
function formatarData(data) {
    const date = new Date(data + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
}

// Funções de exemplo para demonstração
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Implementar sistema de notificações se necessário
    console.log(`${tipo.toUpperCase()}: ${mensagem}`);
}

// Validações
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTelefone(telefone) {
    const regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return regex.test(telefone);
}

// Formatação automática de campos
document.addEventListener('DOMContentLoaded', function() {
    // Formatação de telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
                e.target.value = value;
            }
        });
    }
});

// Configurar data mínima para reservas (hoje)
document.addEventListener('DOMContentLoaded', function() {
    const dataReservaInput = document.getElementById('dataReserva');
    if (dataReservaInput) {
        const hoje = new Date().toISOString().split('T')[0];
        dataReservaInput.min = hoje;
    }
});

