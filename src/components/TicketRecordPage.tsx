import React, { useEffect, useState } from 'react';
import './TicketRecordPage.css';
import HeaderSoporte from './HeaderSoporte';
import Sidebar from './Sidebar';
import TicketDetailsModal from './TicketDetailsModal';
import backgroundSvg from '../assets/page_background.svg';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface TicketRecordPageProps {
  onBackToCreate?: () => void;
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

const TicketRecordPage: React.FC<TicketRecordPageProps> = ({ onBackToCreate, onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'list' | 'analytics'>('list');
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

  // Datos del gráfico de línea (dinámicos - pueden actualizarse)
  const chartData = {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    datasets: [
      {
        label: 'Tasa de resolución',
        data: [350, 420, 400, 650, 500, 580, 680],
        fill: true,
        borderColor: '#3B82F6',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 250);
          gradient.addColorStop(0, 'rgba(96, 165, 250, 0.4)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
          return gradient;
        },
        borderWidth: 2.5,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 800,
        ticks: {
          stepSize: 200,
          color: '#9CA3AF',
          font: {
            family: 'Montserrat',
            size: 11
          }
        },
        grid: {
          color: '#F3F4F6',
          drawBorder: false
        },
        border: {
          display: false
        }
      },
      x: {
        ticks: {
          color: '#9CA3AF',
          font: {
            family: 'Montserrat',
            size: 11
          }
        },
        grid: {
          display: false
        },
        border: {
          color: '#E5E7EB',
          width: 1.5
        }
      }
    }
  };

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
      
      const totalRows = 4;
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
      setSelectedRows(new Set([0, 1, 2, 3]));
      setSelectAll(true);
    }
  };

  const handleManageTicket = (ticketIndex: number) => {
    const ticketsData = [
      {
        id: '#2577-D',
        clientName: 'Ana Figueras López',
        clientCompany: 'Sygna',
        phone: '+34 623 78 90 12',
        creationDate: '17/08/2025',
        product: 'Sygna',
        department: 'programming',
        status: 'resolved',
        description: 'Problema resuelto con el panel',
        comments: [],
        priority: 'normal'
      },
      {
        id: '#2578-D',
        clientName: 'Alberto Gómez Romero',
        clientCompany: 'Kit Digital - Web',
        phone: '+34 611 23 45 67',
        creationDate: '20/08/2025',
        product: 'Kit Digital - Web',
        department: 'support',
        status: 'resolved',
        description: 'Problema de rendimiento en la aplicación',
        comments: [],
        priority: 'high'
      },
      {
        id: '#2579-D',
        clientName: 'Javi Correa Gómez',
        clientCompany: 'Sygna',
        phone: '+34 620 12 34 89',
        creationDate: '16/08/2025',
        product: 'Sygna',
        department: 'support',
        status: 'resolved',
        description: 'Solicitud de nueva funcionalidad en el módulo de ventas',
        comments: [],
        priority: 'normal'
      },
      {
        id: '#2580-D',
        clientName: 'Laura Martínez Silva',
        clientCompany: 'Kit Digital - Web',
        phone: '+34 615 89 01 23',
        creationDate: '18/08/2025',
        product: 'Kit Digital - Web',
        department: 'programming',
        status: 'resolved',
        description: 'Error corregido en el módulo de reportes',
        comments: [],
        priority: 'urgent'
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
      className="trp-page"
      style={{
        backgroundImage: `url(${backgroundSvg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <Sidebar currentPage="Historial" onLogout={onLogout} onNavigate={onNavigate} />
      
      <main className="trp-main">
        <HeaderSoporte currentPage="Historial" />
        
        {/* Tabs Section - Outside content container */}
        <div className="trp-tabs-container">
          <div className="trp-tabs-section">
            <div className={`trp-tab-slider ${activeTab === 'analytics' ? 'trp-slider-right' : 'trp-slider-left'}`}></div>
            <button 
              className={`trp-tab ${activeTab === 'list' ? 'trp-tab-active' : ''}`}
              onClick={() => setActiveTab('list')}
            >
              Lista
            </button>
            <button 
              className={`trp-tab ${activeTab === 'analytics' ? 'trp-tab-active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              Analíticas
            </button>
          </div>
        </div>

        {/* Content for Lista tab */}
        {activeTab === 'list' && (
          <div className="trp-content">
            {/* Search and Filter Section */}
            <div className="trp-search-filter-section">
            <div className="trp-search-container">
              <label className="trp-search-label">Buscar</label>
              <div className="trp-search-input-wrapper">
                <img src="/img/search-icon.png" alt="Search" className="trp-search-icon" />
                <input
                  type="text"
                  placeholder="Buscar por cliente, ID de ticket o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="trp-search-input"
                />
              </div>
            </div>

            <div className="trp-filters-container">
              <div className="trp-filter-group">
                <label className="trp-filter-label">Mostrar</label>
                <div className="trp-custom-dropdown">
                  <button
                    type="button"
                    className="trp-dropdown-button"
                    onClick={toggleShowFilterDropdown}
                  >
                    <span className="trp-dropdown-text">
                      {showFilter ? 
                        (showFilter === 'all' ? 'Todos' :
                         showFilter === 'normal' ? 'Normal' :
                         showFilter === 'high' ? 'Alta' :
                         showFilter === 'urgent' ? 'Urgente' : showFilter) 
                        : 'Todos'
                      }
                    </span>
                    <img src="/img/arrow_down-icon.png" alt="▼" className="trp-dropdown-arrow" />
                  </button>
                  {showShowFilterDropdown && (
                    <div className="trp-dropdown-menu">
                      <div className="trp-dropdown-option" onClick={() => handleShowFilterSelect('all')}>
                        Todos
                      </div>
                      <div className="trp-dropdown-option" onClick={() => handleShowFilterSelect('normal')}>
                        Normal
                      </div>
                      <div className="trp-dropdown-option" onClick={() => handleShowFilterSelect('high')}>
                        Alta
                      </div>
                      <div className="trp-dropdown-option" onClick={() => handleShowFilterSelect('urgent')}>
                        Urgente
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="trp-filter-group">
                <label className="trp-filter-label">Departamento</label>
                <div className="trp-custom-dropdown">
                  <button
                    type="button"
                    className="trp-dropdown-button"
                    onClick={toggleDepartmentDropdown}
                  >
                    <span className="trp-dropdown-text">
                      {departmentFilter ? 
                        (departmentFilter === 'all' ? 'Todos' :
                         departmentFilter === 'support' ? 'Soporte' :
                         departmentFilter === 'programming' ? 'Programación' :
                         departmentFilter === 'billing' ? 'Facturación' :
                         departmentFilter === 'content' ? 'Contenido' : departmentFilter) 
                        : 'Todos'
                      }
                    </span>
                    <img src="/img/arrow_down-icon.png" alt="▼" className="trp-dropdown-arrow" />
                  </button>
                  {showDepartmentDropdown && (
                    <div className="trp-dropdown-menu">
                      <div className="trp-dropdown-option" onClick={() => handleDepartmentSelect('all')}>
                        Todos
                      </div>
                      <div className="trp-dropdown-option" onClick={() => handleDepartmentSelect('support')}>
                        Soporte
                      </div>
                      <div className="trp-dropdown-option" onClick={() => handleDepartmentSelect('programming')}>
                        Programación
                      </div>
                      <div className="trp-dropdown-option" onClick={() => handleDepartmentSelect('billing')}>
                        Facturación
                      </div>
                      <div className="trp-dropdown-option" onClick={() => handleDepartmentSelect('content')}>
                        Contenido
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="trp-filter-group">
                <label className="trp-filter-label">Estado</label>
                <div className="trp-custom-dropdown">
                  <button
                    type="button"
                    className="trp-dropdown-button"
                    onClick={() => {
                      setShowDepartmentDropdown(false);
                      setShowShowFilterDropdown(false);
                    }}
                  >
                    <span className="trp-dropdown-text">Todos</span>
                    <img src="/img/arrow_down-icon.png" alt="▼" className="trp-dropdown-arrow" />
                  </button>
                </div>
              </div>

              <button onClick={handleClearFilters} className="trp-clear-button">
                <span className="trp-clear-icon">X</span>
                Limpiar
              </button>
            </div>
          </div>

            {/* Tickets Table */}
              <div className="trp-table-container">
                <table className="trp-table">
                  <thead>
                    <tr>
                      <th><input type="checkbox" className="trp-checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
                      <th>ID Ticket</th>
                      <th>Cliente</th>
                      <th>Teléfono</th>
                      <th>Descripción</th>
                      <th>Fecha de ticket</th>
                      <th>Enviado</th>
                      <th>Departamento</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={selectedRows.has(0) ? 'trp-selected-row' : ''}>
                      <td><input type="checkbox" className="trp-checkbox" checked={selectedRows.has(0)} onChange={() => handleRowSelect(0)} /></td>
                      <td>ID #2577-D</td>
                      <td>
                        <div className="trp-client-cell">
                          <div className="trp-client-name">Pablo Simón López</div>
                          <div className="trp-client-company">Kit Digital - Web</div>
                        </div>
                      </td>
                      <td>+34 654 25 20 45</td>
                      <td>Error al acceder al panel de administración</td>
                      <td>15/08/2025 - 09:00</td>
                      <td>20/08/2025</td>
                      <td>
                        <div className="trp-department-cell support">
                          <span className="trp-department-dot support"></span>
                          <span>Soporte</span>
                        </div>
                      </td>
                      <td>
                        <button className="trp-manage-button" onClick={() => handleManageTicket(0)}>Gestionar</button>
                      </td>
                    </tr>
                    <tr className={selectedRows.has(1) ? 'trp-selected-row' : ''}>
                      <td><input type="checkbox" className="trp-checkbox" checked={selectedRows.has(1)} onChange={() => handleRowSelect(1)} /></td>
                      <td>ID #2578-D</td>
                      <td>
                        <div className="trp-client-cell">
                          <div className="trp-client-name">Miguel Romero Torres</div>
                          <div className="trp-client-company">Kit Digital - Web</div>
                        </div>
                      </td>
                      <td>+34 610 12 34 56</td>
                      <td>Los reportes no se generan correctamente</td>
                      <td>20/08/2025 - 15:45</td>
                      <td>20/08/2025</td>
                      <td>
                        <div className="trp-department-cell programming">
                          <span className="trp-department-dot programming"></span>
                          <span>Programación</span>
                        </div>
                      </td>
                      <td>
                        <button className="trp-manage-button" onClick={() => handleManageTicket(1)}>Gestionar</button>
                      </td>
                    </tr>
                    <tr className={selectedRows.has(2) ? 'trp-selected-row' : ''}>
                      <td><input type="checkbox" className="trp-checkbox" checked={selectedRows.has(2)} onChange={() => handleRowSelect(2)} /></td>
                      <td>ID #2579-D</td>
                      <td>
                        <div className="trp-client-cell">
                          <div className="trp-client-name">Pepito Jiménez Sancho</div>
                          <div className="trp-client-company">Sygna</div>
                        </div>
                      </td>
                      <td>+34 615 67 89 01</td>
                      <td>Consulta sobre facturación</td>
                      <td>20/08/2025 - 15:45</td>
                      <td>20/08/2025</td>
                      <td>
                        <div className="trp-department-cell programming">
                          <span className="trp-department-dot programming"></span>
                          <span>Programación</span>
                        </div>
                      </td>
                      <td>
                        <button className="trp-manage-button" onClick={() => handleManageTicket(2)}>Gestionar</button>
                      </td>
                    </tr>
                    <tr className={selectedRows.has(3) ? 'trp-selected-row' : ''}>
                      <td><input type="checkbox" className="trp-checkbox" checked={selectedRows.has(3)} onChange={() => handleRowSelect(3)} /></td>
                      <td>ID #2580-D</td>
                      <td>
                        <div className="trp-client-cell">
                          <div className="trp-client-name">Ricardo Pérez González</div>
                          <div className="trp-client-company">Kit Digital - Web</div>
                        </div>
                      </td>
                      <td>+34 612 34 56 78</td>
                      <td>Pantalla bloqueada</td>
                      <td>19/08/2025 - 14:00</td>
                      <td>20/08/2025</td>
                      <td>
                        <div className="trp-department-cell support">
                          <span className="trp-department-dot support"></span>
                          <span>Soporte</span>
                        </div>
                      </td>
                      <td>
                        <button className="trp-manage-button" onClick={() => handleManageTicket(3)}>Gestionar</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="trp-pagination-container">
                <div className="trp-pagination">
                  <span className="trp-page-number active">01</span>
                  <span className="trp-page-number">02</span>
                  <span className="trp-page-number">03</span>
                  <span className="trp-page-dots">...</span>
                  <span className="trp-page-number">04</span>
                  <span className="trp-page-number">05</span>
                  <span className="trp-page-number">06</span>
                </div>
              </div>
          </div>
        )}

        {/* Content for Analytics tab */}
        {activeTab === 'analytics' && (
          <div className="trp-analytics-wrapper">
              {/* Stats Cards */}
              <div className="trp-stats-grid">
                <div className="trp-stat-card">
                  <div className="trp-stat-header">
                    <span className="trp-stat-title">Total de tickets</span>
                    <img src="/img/diagram-icon.png" alt="Chart" className="trp-stat-icon" />
                  </div>
                  <div className="trp-stat-value">6</div>
                  <div className="trp-stat-subtitle">+12% desde el mes pasado</div>
                </div>

                <div className="trp-stat-card">
                  <div className="trp-stat-header">
                    <span className="trp-stat-title">Tasa de resolución</span>
                    <img src="/img/tick-icon.png" alt="Percentage" className="trp-stat-icon" />
                  </div>
                  <div className="trp-stat-value">20%</div>
                  <div className="trp-stat-subtitle">+5% desde el mes pasado</div>
                </div>

                <div className="trp-stat-card">
                  <div className="trp-stat-header">
                    <span className="trp-stat-title">Tiempo promedio</span>
                    <img src="/img/clock-icon.png" alt="Clock" className="trp-stat-icon" />
                  </div>
                  <div className="trp-stat-value">2,3h</div>
                  <div className="trp-stat-subtitle">-0,5h desde el mes pasado</div>
                </div>

                <div className="trp-stat-card">
                  <div className="trp-stat-header">
                    <span className="trp-stat-title">Pendientes de gestionar</span>
                    <img src="/img/close-icon.png" alt="Alert" className="trp-stat-icon" />
                  </div>
                  <div className="trp-stat-value">5</div>
                  <div className="trp-stat-subtitle">+12% desde el mes pasado</div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="trp-charts-row">
                {/* Distribution Chart */}
                <div className="trp-chart-card">
                  <div className="trp-chart-header">
                    <img src="/img/bag-icon.png" alt="Chart" className="trp-chart-icon" />
                    <span className="trp-chart-title">Distribución por departamento</span>
                  </div>
                  <div className="trp-chart-content">
                    <div className="trp-distribution-grid">
                      <div className="trp-department-row">
                        <div className="trp-department-info">
                          <span className="trp-department-dot soporte"></span>
                          <span className="trp-department-name">Soporte</span>
                        </div>
                        <div className="trp-department-stats">
                          <span className="trp-department-count">2</span>
                          <span className="trp-department-percentage soporte">33%</span>
                        </div>
                      </div>
                      <div className="trp-department-row">
                        <div className="trp-department-info">
                          <span className="trp-department-dot programacion"></span>
                          <span className="trp-department-name">Programación</span>
                        </div>
                        <div className="trp-department-stats">
                          <span className="trp-department-count">4</span>
                          <span className="trp-department-percentage programacion">67%</span>
                        </div>
                      </div>
                      <div className="trp-department-row">
                        <div className="trp-department-info">
                          <span className="trp-department-dot facturacion"></span>
                          <span className="trp-department-name">Facturación</span>
                        </div>
                        <div className="trp-department-stats">
                          <span className="trp-department-count">0</span>
                          <span className="trp-department-percentage facturacion">0%</span>
                        </div>
                      </div>
                      <div className="trp-department-row">
                        <div className="trp-department-info">
                          <span className="trp-department-dot contenido"></span>
                          <span className="trp-department-name">Contenido</span>
                        </div>
                        <div className="trp-department-stats">
                          <span className="trp-department-count">0</span>
                          <span className="trp-department-percentage contenido">0%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="trp-chart-card">
                  <div className="trp-chart-header">
                    <img src="/img/grow-icon.png" alt="Chart" className="trp-chart-icon" />
                    <span className="trp-chart-title">Rendimiento</span>
                  </div>
                  <div className="trp-chart-content">
                    <div className="trp-performance-grid">
                      <div className="trp-performance-row">
                        <span className="trp-performance-label">Esta semana</span>
                        <div className="trp-performance-values">
                          <span className="trp-performance-value resueltos">+28</span>
                          <span className="trp-performance-value nuevos">32</span>
                          <span className="trp-performance-value pendientes">15</span>
                        </div>
                      </div>
                      <div className="trp-performance-row">
                        <span className="trp-performance-label">Semana pasada</span>
                        <div className="trp-performance-values">
                          <span className="trp-performance-value resueltos">+19</span>
                          <span className="trp-performance-value nuevos">28</span>
                          <span className="trp-performance-value pendientes">9</span>
                        </div>
                      </div>
                      <div className="trp-performance-row">
                        <span className="trp-performance-label">Hace 2 semanas</span>
                        <div className="trp-performance-values">
                          <span className="trp-performance-value resueltos">+22</span>
                          <span className="trp-performance-value nuevos">31</span>
                          <span className="trp-performance-value pendientes">12</span>
                        </div>
                      </div>
                      <div className="trp-performance-row">
                        <span className="trp-performance-label">Hace 3 semanas</span>
                        <div className="trp-performance-values">
                          <span className="trp-performance-value resueltos">+35</span>
                          <span className="trp-performance-value nuevos">27</span>
                          <span className="trp-performance-value pendientes">7</span>
                        </div>
                      </div>
                    </div>
                    <div className="trp-performance-legend">
                      <div className="trp-legend-item">
                        <span className="trp-legend-dot resueltos"></span>
                        <span className="trp-legend-label">Resueltos</span>
                      </div>
                      <div className="trp-legend-item">
                        <span className="trp-legend-dot nuevos"></span>
                        <span className="trp-legend-label">Nuevos</span>
                      </div>
                      <div className="trp-legend-item">
                        <span className="trp-legend-dot pendientes"></span>
                        <span className="trp-legend-label">Pendientes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resolution Rate Chart */}
              <div className="trp-chart-card trp-full-width">
                <div className="trp-chart-header">
                  <img src="/img/bars-icon.png" alt="Chart" className="trp-chart-icon" />
                  <span className="trp-chart-title">Tasa de resolución</span>
                </div>
                <div className="trp-chart-content">
                  <div className="trp-line-chart-container">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </div>
              </div>
          </div>
        )}
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

export default TicketRecordPage;

