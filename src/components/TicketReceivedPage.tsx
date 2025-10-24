import React, { useEffect, useState } from 'react';
import './TicketReceivedPage.css';
import HeaderSoporte from './HeaderSoporte';
import Sidebar from './Sidebar';
import TicketDetailsModal from './TicketDetailsModal';
import backgroundSvg from '../assets/page_background.svg';

interface TicketReceivedPageProps {
  onBackToCreate?: () => void;
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

const TicketReceivedPage: React.FC<TicketReceivedPageProps> = ({ onBackToCreate, onLogout, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [showShowFilterDropdown, setShowShowFilterDropdown] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClearFilters = () => {
    setSearchTerm('');
    setShowFilter('all');
    setDepartmentFilter('all');
    setStatusFilter('all');
  };

  const handleStatusSelect = (status: string) => {
    setStatusFilter(status);
    setShowStatusDropdown(false);
  };

  const handleDepartmentSelect = (department: string) => {
    setDepartmentFilter(department);
    setShowDepartmentDropdown(false);
  };

  const handleShowFilterSelect = (filter: string) => {
    setShowFilter(filter);
    setShowShowFilterDropdown(false);
  };

  const toggleStatusDropdown = () => {
    setShowStatusDropdown(!showStatusDropdown);
    setShowDepartmentDropdown(false);
    setShowShowFilterDropdown(false);
  };

  const toggleDepartmentDropdown = () => {
    setShowDepartmentDropdown(!showDepartmentDropdown);
    setShowStatusDropdown(false);
    setShowShowFilterDropdown(false);
  };

  const toggleShowFilterDropdown = () => {
    setShowShowFilterDropdown(!showShowFilterDropdown);
    setShowStatusDropdown(false);
    setShowDepartmentDropdown(false);
  };

  const handleRowSelect = (rowIndex: number) => {
    setSelectedRows(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(rowIndex)) {
        newSelected.delete(rowIndex);
      } else {
        newSelected.add(rowIndex);
      }
      
      // Actualizar el estado de "marcar todas"
      const totalRows = 6; // Número total de filas
      if (newSelected.size === totalRows) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
      
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      // Desmarcar todas
      setSelectedRows(new Set());
      setSelectAll(false);
    } else {
      // Marcar todas (6 filas: índices 0-5)
      setSelectedRows(new Set([0, 1, 2, 3, 4, 5]));
      setSelectAll(true);
    }
  };

  const handleManageTicket = (ticketIndex: number) => {
    // Datos de ejemplo para los tickets
    const ticketsData = [
      {
        id: '#2571-D',
        clientName: 'Pablo Simón López',
        clientCompany: 'Kit Digital - Web',
        phone: '+34 654 25 20 45',
        creationDate: '15/08/2025',
        product: 'Kit Digital - Web',
        department: 'support',
        status: 'assigned',
        description: 'No puedo acceder al panel de administración desde hace 3 días cuando intento hacer login me pide contraseña incorrecta aunque estoy usando la correcta y al intentar recuperarla el email no me llega. He probado en varios navegadores y el problema persiste.',
        comments: [
          {
            author: 'Ana',
            role: 'Soporte',
            date: '29/06/2025 - 18:25',
            text: 'Persiste el problema'
          },
          {
            author: 'Rafa',
            role: 'Soporte',
            date: '22/06/2025 - 18:25',
            text: 'He verificado los logs del servidor y parece ser un problema de base de datos.'
          }
        ],
        priority: 'urgent'
      },
      // Más datos de ejemplo para otros tickets...
      {
        id: '#2571-D',
        clientName: 'Javi Correa Gómez',
        clientCompany: 'Sygna',
        phone: '+34 620 12 34 89',
        creationDate: '16/08/2025',
        product: 'Sygna',
        department: 'support',
        status: 'assigned',
        description: 'Solicitud de nueva funcionalidad en el módulo de ventas',
        comments: [],
        priority: 'normal'
      },
      {
        id: '#2571-D',
        clientName: 'Miguel Romero Torres',
        clientCompany: 'Kit Digital - Web',
        phone: '+34 610 12 34 56',
        creationDate: '20/08/2025',
        product: 'Kit Digital - Web',
        department: 'programming',
        status: 'new',
        description: 'Los reportes no se generan correctamente',
        comments: [],
        priority: 'high'
      },
      {
        id: '#2571-D',
        clientName: 'Pablo Ribeiro López',
        clientCompany: 'Kit Digital - Web',
        phone: '+34 613 45 67 89',
        creationDate: '22/08/2025',
        product: 'Kit Digital - Web',
        department: 'programming',
        status: 'new',
        description: 'No puedo acceder al panel',
        comments: [],
        priority: 'normal'
      },
      {
        id: '#2571-D',
        clientName: 'Pedro Sánchez Peregil',
        clientCompany: 'Kit Digital - Web',
        phone: '+34 614 56 78 90',
        creationDate: '20/08/2025',
        product: 'Kit Digital - Web',
        department: 'programming',
        status: 'resolved',
        description: 'Pantalla en blanco',
        comments: [],
        priority: 'normal'
      },
      {
        id: '#2571-D',
        clientName: 'Ana Figueras López',
        clientCompany: 'Sygna',
        phone: '+34 623 78 90 12',
        creationDate: '17/08/2025',
        product: 'Sygna',
        department: 'programming',
        status: 'resolved',
        description: 'Pantalla en blanco',
        comments: [],
        priority: 'normal'
      }
    ];

    setSelectedTicket(ticketsData[ticketIndex]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTicket(null);
  };

  return (
    <div 
      className="ticket-received-page"
      style={{
        backgroundImage: `url(${backgroundSvg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
          {/* Sidebar */}
          <Sidebar currentPage="Tickets recibidos" onLogout={onLogout} onNavigate={onNavigate} />
      
      {/* Main Content */}
      <main className="ticket-received-main">
        {/* Header */}
        <HeaderSoporte currentPage="Tickets recibidos" />
        
        {/* Page Content */}
        <div className="ticket-received-content">
          {/* Page Title */}
          <div className="page-title-section">
            <h1 className="page-title">Tickets recibidos</h1>
          </div>

          {/* Search and Filter Section */}
          <div className="search-filter-section">
            <div className="search-container">
              <label className="search-label">Buscar</label>
              <div className="search-input-wrapper">
                <img src="/img/search-icon.png" alt="Search" className="search-icon" />
                <input
                  type="text"
                  placeholder="Buscar por cliente, ID de ticket o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <div className="filters-container">
              <div className="filter-group">
                <label className="filter-label">Mostrar</label>
                <div className="custom-dropdown">
                  <button
                    type="button"
                    className="custom-dropdown-button"
                    onClick={toggleShowFilterDropdown}
                  >
                    <span className="dropdown-text">
                      {showFilter ? 
                        (showFilter === 'all' ? 'Todos' :
                         showFilter === 'normal' ? 'Normal' :
                         showFilter === 'high' ? 'Alta' :
                         showFilter === 'urgent' ? 'Urgente' : showFilter) 
                        : 'Todos'
                      }
                    </span>
                    <img src="/img/arrow_down-icon.png" alt="▼" className="dropdown-arrow" />
                  </button>
                  {showShowFilterDropdown && (
                    <div className="custom-dropdown-menu">
                      <div className="dropdown-option" onClick={() => handleShowFilterSelect('all')}>
                        Todos
                      </div>
                      <div className="dropdown-option" onClick={() => handleShowFilterSelect('normal')}>
                        Normal
                      </div>
                      <div className="dropdown-option" onClick={() => handleShowFilterSelect('high')}>
                        Alta
                      </div>
                      <div className="dropdown-option" onClick={() => handleShowFilterSelect('urgent')}>
                        Urgente
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Departamento</label>
                <div className="custom-dropdown">
                  <button
                    type="button"
                    className="custom-dropdown-button"
                    onClick={toggleDepartmentDropdown}
                  >
                    <span className="dropdown-text">
                      {departmentFilter ? 
                        (departmentFilter === 'all' ? 'Todos' :
                         departmentFilter === 'support' ? 'Soporte' :
                         departmentFilter === 'programming' ? 'Programación' :
                         departmentFilter === 'billing' ? 'Facturación' :
                         departmentFilter === 'content' ? 'Contenido' : departmentFilter) 
                        : 'Todos'
                      }
                    </span>
                    <img src="/img/arrow_down-icon.png" alt="▼" className="dropdown-arrow" />
                  </button>
                  {showDepartmentDropdown && (
                    <div className="custom-dropdown-menu">
                      <div className="dropdown-option" onClick={() => handleDepartmentSelect('all')}>
                        Todos
                      </div>
                      <div className="dropdown-option" onClick={() => handleDepartmentSelect('support')}>
                        Soporte
                      </div>
                      <div className="dropdown-option" onClick={() => handleDepartmentSelect('programming')}>
                        Programación
                      </div>
                        <div className="dropdown-option" onClick={() => handleDepartmentSelect('billing')}>
                          Facturación
                        </div>
                        <div className="dropdown-option" onClick={() => handleDepartmentSelect('content')}>
                          Contenido
                        </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Estado</label>
                <div className="custom-dropdown">
                  <button
                    type="button"
                    className="custom-dropdown-button"
                    onClick={toggleStatusDropdown}
                  >
                    <span className="dropdown-text">
                      {statusFilter ? 
                        (statusFilter === 'all' ? 'Todos' :
                         statusFilter === 'new' ? 'Nuevos' :
                         statusFilter === 'in-progress' ? 'En gestión' :
                         statusFilter === 'assigned' ? 'Derivados' :
                         statusFilter === 'resolved' ? 'Resueltos' : statusFilter) 
                        : 'Todos'
                      }
                    </span>
                    <img src="/img/arrow_down-icon.png" alt="▼" className="dropdown-arrow" />
                  </button>
                  {showStatusDropdown && (
                    <div className="custom-dropdown-menu">
                      <div className="dropdown-option" onClick={() => handleStatusSelect('all')}>
                        Todos
                      </div>
                      <div className="dropdown-option" onClick={() => handleStatusSelect('new')}>
                        Nuevos
                      </div>
                      <div className="dropdown-option" onClick={() => handleStatusSelect('in-progress')}>
                        En gestión
                      </div>
                      <div className="dropdown-option" onClick={() => handleStatusSelect('assigned')}>
                        Derivados
                      </div>
                      <div className="dropdown-option" onClick={() => handleStatusSelect('resolved')}>
                        Resueltos
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button onClick={handleClearFilters} className="clear-button">
                <span className="clear-icon">X</span>
                Limpiar
              </button>
            </div>
          </div>

          {/* Tickets Table */}
          <div className="tickets-table-container">
            <table className="tickets-table">
              <thead>
                <tr>
                  <th><input type="checkbox" className="table-checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
                  <th>ID Ticket</th>
                  <th>Departamento</th>
                  <th>Cliente</th>
                  <th>Teléfono</th>
                  <th>Descripción</th>
                  <th>Fecha de ticket</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr className={selectedRows.has(0) ? 'selected-row' : ''}>
                  <td><input type="checkbox" className="table-checkbox" checked={selectedRows.has(0)} onChange={() => handleRowSelect(0)} /></td>
                  <td>ID #2571-D</td>
                  <td>
                    <div className="department-cell support">
                      <span className="department-dot support"></span>
                      <span>Soporte</span>
                    </div>
                  </td>
                  <td>
                    <div className="client-cell">
                      <div className="client-name">Pablo Simón López</div>
                      <div className="client-company">Kit Digital - Web</div>
                    </div>
                  </td>
                  <td>+34 654 25 20 45</td>
                  <td>Error al acceder al panel de administración</td>
                  <td>15/08/2025 - 09:00</td>
                  <td>
                    <div className="status-cell assigned">
                      <span className="status-dot assigned"></span>
                      <span>Derivado</span>
                    </div>
                  </td>
                  <td>
                    <button className="manage-button" onClick={() => handleManageTicket(0)}>Gestionar</button>
                  </td>
                </tr>
                <tr className={selectedRows.has(1) ? 'selected-row' : ''}>
                  <td><input type="checkbox" className="table-checkbox" checked={selectedRows.has(1)} onChange={() => handleRowSelect(1)} /></td>
                  <td>ID #2571-D</td>
                  <td>
                    <div className="department-cell support">
                      <span className="department-dot support"></span>
                      <span>Soporte</span>
                    </div>
                  </td>
                  <td>
                    <div className="client-cell">
                      <div className="client-name">Javi Correa Gómez</div>
                      <div className="client-company">Sygna</div>
                    </div>
                  </td>
                  <td>+34 620 12 34 89</td>
                  <td>Solicitud de nueva funcionalidad en el módulo de ventas</td>
                  <td>16/08/2025 - 10:30</td>
                  <td>
                    <div className="status-cell assigned">
                      <span className="status-dot assigned"></span>
                      <span>Derivado</span>
                    </div>
                  </td>
                  <td>
                    <button className="manage-button" onClick={() => handleManageTicket(1)}>Gestionar</button>
                  </td>
                </tr>
                <tr className={selectedRows.has(2) ? 'selected-row' : ''}>
                  <td><input type="checkbox" className="table-checkbox" checked={selectedRows.has(2)} onChange={() => handleRowSelect(2)} /></td>
                  <td>ID #2571-D</td>
                  <td>
                    <div className="department-cell programming">
                      <span className="department-dot programming"></span>
                      <span>Programación</span>
                    </div>
                  </td>
                  <td>
                    <div className="client-cell">
                      <div className="client-name">Miguel Romero Torres</div>
                      <div className="client-company">Kit Digital - Web</div>
                    </div>
                  </td>
                  <td>+34 610 12 34 56</td>
                  <td>Los reportes no se generan correctamente</td>
                  <td>20/08/2025 - 15:45</td>
                  <td>
                    <div className="status-cell new">
                      <span className="status-dot new"></span>
                      <span>Nuevo</span>
                    </div>
                  </td>
                  <td>
                    <button className="manage-button" onClick={() => handleManageTicket(2)}>Gestionar</button>
                  </td>
                </tr>
                <tr className={selectedRows.has(3) ? 'selected-row' : ''}>
                  <td><input type="checkbox" className="table-checkbox" checked={selectedRows.has(3)} onChange={() => handleRowSelect(3)} /></td>
                  <td>ID #2571-D</td>
                  <td>
                    <div className="department-cell programming">
                      <span className="department-dot programming"></span>
                      <span>Programación</span>
                    </div>
                  </td>
                  <td>
                    <div className="client-cell">
                      <div className="client-name">Pablo Ribeiro López</div>
                      <div className="client-company">Kit Digital - Web</div>
                    </div>
                  </td>
                  <td>+34 613 45 67 89</td>
                  <td>No puedo acceder al panel</td>
                  <td>22/08/2025 - 10:00</td>
                  <td>
                    <div className="status-cell new">
                      <span className="status-dot new"></span>
                      <span>Nuevo</span>
                    </div>
                  </td>
                  <td>
                    <button className="manage-button" onClick={() => handleManageTicket(3)}>Gestionar</button>
                  </td>
                </tr>
                <tr className={selectedRows.has(4) ? 'selected-row' : ''}>
                  <td><input type="checkbox" className="table-checkbox" checked={selectedRows.has(4)} onChange={() => handleRowSelect(4)} /></td>
                  <td>ID #2571-D</td>
                  <td>
                    <div className="department-cell programming">
                      <span className="department-dot programming"></span>
                      <span>Programación</span>
                    </div>
                  </td>
                  <td>
                    <div className="client-cell">
                      <div className="client-name">Pedro Sánchez Peregil</div>
                      <div className="client-company">Kit Digital - Web</div>
                    </div>
                  </td>
                  <td>+34 614 56 78 90</td>
                  <td>Pantalla en blanco</td>
                  <td>20/08/2025 - 15:45</td>
                  <td>
                    <div className="status-cell resolved">
                      <span className="status-dot resolved"></span>
                      <span>Resuelto</span>
                    </div>
                  </td>
                  <td>
                    <button className="manage-button" onClick={() => handleManageTicket(4)}>Gestionar</button>
                  </td>
                </tr>
                <tr className={selectedRows.has(5) ? 'selected-row' : ''}>
                  <td><input type="checkbox" className="table-checkbox" checked={selectedRows.has(5)} onChange={() => handleRowSelect(5)} /></td>
                  <td>ID #2571-D</td>
                  <td>
                    <div className="department-cell programming">
                      <span className="department-dot programming"></span>
                      <span>Programación</span>
                    </div>
                  </td>
                  <td>
                    <div className="client-cell">
                      <div className="client-name">Ana Figueras López</div>
                      <div className="client-company">Sygna</div>
                    </div>
                  </td>
                  <td>+34 623 78 90 12</td>
                  <td>Pantalla en blanco</td>
                  <td>17/08/2025 - 11:00</td>
                  <td>
                    <div className="status-cell resolved">
                      <span className="status-dot resolved"></span>
                      <span>Resuelto</span>
                    </div>
                  </td>
                  <td>
                    <button className="manage-button" onClick={() => handleManageTicket(5)}>Gestionar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination-container">
            <div className="pagination">
              <span className="page-number active">01</span>
              <span className="page-number">02</span>
              <span className="page-number">03</span>
              <span className="page-dots">...</span>
              <span className="page-number">04</span>
              <span className="page-number">05</span>
              <span className="page-number">06</span>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de detalles del ticket */}
      {showModal && selectedTicket && (
        <TicketDetailsModal
          ticket={selectedTicket}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default TicketReceivedPage;
