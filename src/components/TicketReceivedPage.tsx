import React, { useEffect, useState } from 'react';
import './TicketReceivedPage.css';
import HeaderSoporte from './HeaderSoporte';
import Sidebar from './Sidebar';
import backgroundSvg from '../assets/page_background.svg';

interface TicketReceivedPageProps {
  onBackToCreate?: () => void;
  onLogout?: () => void;
}

const TicketReceivedPage: React.FC<TicketReceivedPageProps> = ({ onBackToCreate, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClearFilters = () => {
    setSearchTerm('');
    setShowFilter('');
    setDepartmentFilter('');
    setStatusFilter('');
  };

  const handleStatusSelect = (status: string) => {
    setStatusFilter(status);
    setShowStatusDropdown(false);
  };

  const handleDepartmentSelect = (department: string) => {
    setDepartmentFilter(department);
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
          <Sidebar currentPage="Tickets recibidos" onLogout={onLogout} />
      
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
                <select 
                  value={showFilter} 
                  onChange={(e) => setShowFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Mostrar</option>
                  <option value="all">Todos</option>
                  <option value="new">Nuevos</option>
                  <option value="assigned">Asignados</option>
                </select>
              </div>

              <div className="filter-group">
                <div className="custom-dropdown">
                  <button
                    type="button"
                    className="custom-dropdown-button"
                    onClick={() => setShowDepartmentDropdown(!showDepartmentDropdown)}
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
                    <span className="dropdown-arrow">▼</span>
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
                <div className="custom-dropdown">
                  <button
                    type="button"
                    className="custom-dropdown-button"
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
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
                    <span className="dropdown-arrow">▼</span>
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
                    <button className="manage-button">Gestionar</button>
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
                    <button className="manage-button">Gestionar</button>
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
                    <button className="manage-button">Gestionar</button>
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
                    <button className="manage-button">Gestionar</button>
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
                    <button className="manage-button">Gestionar</button>
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
                    <button className="manage-button">Gestionar</button>
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
    </div>
  );
};

export default TicketReceivedPage;
