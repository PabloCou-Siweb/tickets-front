import React, { useEffect, useState } from 'react';
import './TicketSentPage.css';
import HeaderSoporte from './HeaderSoporte';
import Sidebar from './Sidebar';
import TicketDetailsModal from './TicketDetailsModal';
import backgroundSvg from '../assets/page_background.svg';

interface TicketSentPageProps {
  onBackToCreate?: () => void;
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

const TicketSentPage: React.FC<TicketSentPageProps> = ({ onBackToCreate, onLogout, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
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
  };

  const handleDepartmentSelect = (department: string) => {
    setDepartmentFilter(department);
    setShowDepartmentDropdown(false);
  };

  const handleShowFilterSelect = (filter: string) => {
    setShowFilter(filter);
    setShowShowFilterDropdown(false);
  };

  const toggleDepartmentDropdown = () => {
    setShowDepartmentDropdown(!showDepartmentDropdown);
    setShowShowFilterDropdown(false);
  };

  const toggleShowFilterDropdown = () => {
    setShowShowFilterDropdown(!showShowFilterDropdown);
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
      
      const totalRows = 6;
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
      setSelectedRows(new Set());
      setSelectAll(false);
    } else {
      setSelectedRows(new Set([0, 1, 2, 3, 4, 5]));
      setSelectAll(true);
    }
  };

  const handleManageTicket = (ticketIndex: number) => {
    const ticketsData = [
      {
        id: '#2571-D',
        clientName: 'Pablo Simón López',
        clientCompany: 'Kit Digital - Web',
        phone: '+34 654 25 20 45',
        creationDate: '15/08/2025',
        product: 'Kit Digital - Web',
        department: 'support',
        status: 'sent',
        description: 'Error al acceder al panel de administración',
        comments: [],
        priority: 'normal'
      },
      {
        id: '#2572-D',
        clientName: 'Miguel Romero Torres',
        clientCompany: 'Sygna',
        phone: '+34 610 12 34 56',
        creationDate: '20/08/2025',
        product: 'Sygna',
        department: 'programming',
        status: 'sent',
        description: 'Los reportes no se generan correctamente',
        comments: [],
        priority: 'high'
      },
      {
        id: '#2573-D',
        clientName: 'Pepito Jiménez Sancho',
        clientCompany: 'Sygna',
        phone: '+34 615 67 89 01',
        creationDate: '20/08/2025',
        product: 'Sygna',
        department: 'programming',
        status: 'sent',
        description: 'Consulta sobre facturación',
        comments: [],
        priority: 'normal'
      },
      {
        id: '#2574-D',
        clientName: 'Ricardo Pérez González',
        clientCompany: 'Kit Digital - Web',
        phone: '+34 612 34 56 78',
        creationDate: '19/08/2025',
        product: 'Kit Digital - Web',
        department: 'support',
        status: 'sent',
        description: 'Pantalla bloqueada',
        comments: [],
        priority: 'urgent'
      },
      {
        id: '#2575-D',
        clientName: 'Pedro Sánchez Peregil',
        clientCompany: 'Kit Digital - Web',
        phone: '+34 614 56 78 90',
        creationDate: '20/08/2025',
        product: 'Kit Digital - Web',
        department: 'programming',
        status: 'sent',
        description: 'Pantalla en blanco',
        comments: [],
        priority: 'normal'
      },
      {
        id: '#2576-D',
        clientName: 'Martín Ales Cordero',
        clientCompany: 'Sygna',
        phone: '+34 622 45 67 01',
        creationDate: '17/08/2025',
        product: 'Sygna',
        department: 'support',
        status: 'sent',
        description: 'Error en el login',
        comments: [],
        priority: 'high'
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
      className="tsp-page"
      style={{
        backgroundImage: `url(${backgroundSvg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <Sidebar currentPage="Tickets enviados" onLogout={onLogout} onNavigate={onNavigate} />
      
      <main className="tsp-main">
        <HeaderSoporte currentPage="Tickets enviados" />
        
        <div className="tsp-content">
          <div className="tsp-title-section">
            <h1 className="tsp-title">Tickets enviados</h1>
          </div>

          {/* Search and Filter Section */}
          <div className="tsp-search-filter-section">
            <div className="tsp-search-container">
              <label className="tsp-search-label">Buscar</label>
              <div className="tsp-search-input-wrapper">
                <img src="/img/search-icon.png" alt="Search" className="tsp-search-icon" />
                <input
                  type="text"
                  placeholder="Buscar por cliente, ID de ticket o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="tsp-search-input"
                />
              </div>
            </div>

            <div className="tsp-filters-container">
              <div className="tsp-filter-group">
                <label className="tsp-filter-label">Mostrar</label>
                <div className="tsp-custom-dropdown">
                  <button
                    type="button"
                    className="tsp-dropdown-button"
                    onClick={toggleShowFilterDropdown}
                  >
                    <span className="tsp-dropdown-text">
                      {showFilter ? 
                        (showFilter === 'all' ? 'Todos' :
                         showFilter === 'normal' ? 'Normal' :
                         showFilter === 'high' ? 'Alta' :
                         showFilter === 'urgent' ? 'Urgente' : showFilter) 
                        : 'Todos'
                      }
                    </span>
                    <img src="/img/arrow_down-icon.png" alt="▼" className="tsp-dropdown-arrow" />
                  </button>
                  {showShowFilterDropdown && (
                    <div className="tsp-dropdown-menu">
                      <div className="tsp-dropdown-option" onClick={() => handleShowFilterSelect('all')}>
                        Todos
                      </div>
                      <div className="tsp-dropdown-option" onClick={() => handleShowFilterSelect('normal')}>
                        Normal
                      </div>
                      <div className="tsp-dropdown-option" onClick={() => handleShowFilterSelect('high')}>
                        Alta
                      </div>
                      <div className="tsp-dropdown-option" onClick={() => handleShowFilterSelect('urgent')}>
                        Urgente
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="tsp-filter-group">
                <label className="tsp-filter-label">Departamento</label>
                <div className="tsp-custom-dropdown">
                  <button
                    type="button"
                    className="tsp-dropdown-button"
                    onClick={toggleDepartmentDropdown}
                  >
                    <span className="tsp-dropdown-text">
                      {departmentFilter ? 
                        (departmentFilter === 'all' ? 'Todos' :
                         departmentFilter === 'support' ? 'Soporte' :
                         departmentFilter === 'programming' ? 'Programación' :
                         departmentFilter === 'billing' ? 'Facturación' :
                         departmentFilter === 'content' ? 'Contenido' : departmentFilter) 
                        : 'Todos'
                      }
                    </span>
                    <img src="/img/arrow_down-icon.png" alt="▼" className="tsp-dropdown-arrow" />
                  </button>
                  {showDepartmentDropdown && (
                    <div className="tsp-dropdown-menu">
                      <div className="tsp-dropdown-option" onClick={() => handleDepartmentSelect('all')}>
                        Todos
                      </div>
                      <div className="tsp-dropdown-option" onClick={() => handleDepartmentSelect('support')}>
                        Soporte
                      </div>
                      <div className="tsp-dropdown-option" onClick={() => handleDepartmentSelect('programming')}>
                        Programación
                      </div>
                      <div className="tsp-dropdown-option" onClick={() => handleDepartmentSelect('billing')}>
                        Facturación
                      </div>
                      <div className="tsp-dropdown-option" onClick={() => handleDepartmentSelect('content')}>
                        Contenido
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button onClick={handleClearFilters} className="tsp-clear-button">
                <span className="tsp-clear-icon">X</span>
                Limpiar
              </button>
            </div>
          </div>

          {/* Tickets Table - WITHOUT Estado column */}
          <div className="tsp-table-container">
            <table className="tsp-table">
              <thead>
                <tr>
                  <th><input type="checkbox" className="tsp-checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
                  <th>ID Ticket</th>
                  <th>Departamento</th>
                  <th>Cliente</th>
                  <th>Teléfono</th>
                  <th>Descripción</th>
                  <th>Fecha de ticket</th>
                  <th>Enviado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample rows */}
                <tr className={selectedRows.has(0) ? 'tsp-selected-row' : ''}>
                  <td><input type="checkbox" className="tsp-checkbox" checked={selectedRows.has(0)} onChange={() => handleRowSelect(0)} /></td>
                  <td>ID #2571-D</td>
                  <td>
                    <div className="tsp-department-cell support">
                      <span className="tsp-department-dot support"></span>
                      <span>Soporte</span>
                    </div>
                  </td>
                  <td>
                    <div className="tsp-client-cell">
                      <div className="tsp-client-name">Pablo Simón López</div>
                      <div className="tsp-client-company">Kit Digital - Web</div>
                    </div>
                  </td>
                  <td>+34 654 25 20 45</td>
                  <td>Error al acceder al panel de administración</td>
                  <td>15/08/2025 - 09:00</td>
                  <td>20/08/2025</td>
                  <td>
                    <button className="tsp-manage-button" onClick={() => handleManageTicket(0)}>Gestionar</button>
                  </td>
                </tr>
                {/* Add more sample rows as needed */}
                <tr className={selectedRows.has(1) ? 'tsp-selected-row' : ''}>
                  <td><input type="checkbox" className="tsp-checkbox" checked={selectedRows.has(1)} onChange={() => handleRowSelect(1)} /></td>
                  <td>ID #2572-D</td>
                  <td>
                    <div className="tsp-department-cell programming">
                      <span className="tsp-department-dot programming"></span>
                      <span>Programación</span>
                    </div>
                  </td>
                  <td>
                    <div className="tsp-client-cell">
                      <div className="tsp-client-name">Miguel Romero Torres</div>
                      <div className="tsp-client-company">Sygna</div>
                    </div>
                  </td>
                  <td>+34 610 12 34 56</td>
                  <td>Los reportes no se generan correctamente</td>
                  <td>20/08/2025 - 15:45</td>
                  <td>20/08/2025</td>
                  <td>
                    <button className="tsp-manage-button" onClick={() => handleManageTicket(1)}>Gestionar</button>
                  </td>
                </tr>
                <tr className={selectedRows.has(2) ? 'tsp-selected-row' : ''}>
                  <td><input type="checkbox" className="tsp-checkbox" checked={selectedRows.has(2)} onChange={() => handleRowSelect(2)} /></td>
                  <td>ID #2573-D</td>
                  <td>
                    <div className="tsp-department-cell programming">
                      <span className="tsp-department-dot programming"></span>
                      <span>Programación</span>
                    </div>
                  </td>
                  <td>
                    <div className="tsp-client-cell">
                      <div className="tsp-client-name">Pepito Jiménez Sancho</div>
                      <div className="tsp-client-company">Sygna</div>
                    </div>
                  </td>
                  <td>+34 615 67 89 01</td>
                  <td>Consulta sobre facturación</td>
                  <td>20/08/2025 - 15:45</td>
                  <td>20/08/2025</td>
                  <td>
                    <button className="tsp-manage-button" onClick={() => handleManageTicket(2)}>Gestionar</button>
                  </td>
                </tr>
                <tr className={selectedRows.has(3) ? 'tsp-selected-row' : ''}>
                  <td><input type="checkbox" className="tsp-checkbox" checked={selectedRows.has(3)} onChange={() => handleRowSelect(3)} /></td>
                  <td>ID #2574-D</td>
                  <td>
                    <div className="tsp-department-cell support">
                      <span className="tsp-department-dot support"></span>
                      <span>Soporte</span>
                    </div>
                  </td>
                  <td>
                    <div className="tsp-client-cell">
                      <div className="tsp-client-name">Ricardo Pérez González</div>
                      <div className="tsp-client-company">Kit Digital - Web</div>
                    </div>
                  </td>
                  <td>+34 612 34 56 78</td>
                  <td>Pantalla bloqueada</td>
                  <td>19/08/2025 - 14:00</td>
                  <td>20/08/2025</td>
                  <td>
                    <button className="tsp-manage-button" onClick={() => handleManageTicket(3)}>Gestionar</button>
                  </td>
                </tr>
                <tr className={selectedRows.has(4) ? 'tsp-selected-row' : ''}>
                  <td><input type="checkbox" className="tsp-checkbox" checked={selectedRows.has(4)} onChange={() => handleRowSelect(4)} /></td>
                  <td>ID #2575-D</td>
                  <td>
                    <div className="tsp-department-cell programming">
                      <span className="tsp-department-dot programming"></span>
                      <span>Programación</span>
                    </div>
                  </td>
                  <td>
                    <div className="tsp-client-cell">
                      <div className="tsp-client-name">Pedro Sánchez Peregil</div>
                      <div className="tsp-client-company">Kit Digital - Web</div>
                    </div>
                  </td>
                  <td>+34 614 56 78 90</td>
                  <td>Pantalla en blanco</td>
                  <td>20/08/2025 - 15:45</td>
                  <td>20/08/2025</td>
                  <td>
                    <button className="tsp-manage-button" onClick={() => handleManageTicket(4)}>Gestionar</button>
                  </td>
                </tr>
                <tr className={selectedRows.has(5) ? 'tsp-selected-row' : ''}>
                  <td><input type="checkbox" className="tsp-checkbox" checked={selectedRows.has(5)} onChange={() => handleRowSelect(5)} /></td>
                  <td>ID #2576-D</td>
                  <td>
                    <div className="tsp-department-cell support">
                      <span className="tsp-department-dot support"></span>
                      <span>Soporte</span>
                    </div>
                  </td>
                  <td>
                    <div className="tsp-client-cell">
                      <div className="tsp-client-name">Martín Ales Cordero</div>
                      <div className="tsp-client-company">Sygna</div>
                    </div>
                  </td>
                  <td>+34 622 45 67 01</td>
                  <td>Error en el login</td>
                  <td>17/08/2025 - 11:00</td>
                  <td>20/08/2025</td>
                  <td>
                    <button className="tsp-manage-button" onClick={() => handleManageTicket(5)}>Gestionar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="tsp-pagination-container">
            <div className="tsp-pagination">
              <span className="tsp-page-number active">01</span>
              <span className="tsp-page-number">02</span>
              <span className="tsp-page-number">03</span>
              <span className="tsp-page-dots">...</span>
              <span className="tsp-page-number">04</span>
              <span className="tsp-page-number">05</span>
              <span className="tsp-page-number">06</span>
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

export default TicketSentPage;

