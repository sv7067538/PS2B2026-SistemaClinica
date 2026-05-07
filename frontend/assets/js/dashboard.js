document.addEventListener('DOMContentLoaded', function() {
    // Nav elements
    const navInicio = document.getElementById('nav-inicio');
    const navMisCitas = document.getElementById('nav-miscitas');
    const navNotificaciones = document.getElementById('nav-notificaciones');
    const navDatosPaciente = document.getElementById('nav-datospaciente');

    // Quick Action elements
    const btnProgramar = document.getElementById('btn-programar');
    const btnIrMisCitas = document.getElementById('btn-irmiscitas');
    const btnIrNotificaciones = document.getElementById('btn-irnotificaciones');

    // Sections
    const sectionInicio = document.getElementById('section-inicio');
    const sectionMisCitas = document.getElementById('section-miscitas');
    const sectionNotificaciones = document.getElementById('section-notificaciones');
    const sectionDatosPaciente = document.getElementById('section-datospaciente');

    // Right Sidebar
    const sidebarRight = document.querySelector('.sidebar-right');

    // Modal
    const modalCita = document.getElementById('modal-cita');
    const closeModalCita = document.getElementById('close-modal');

    // Helper to hide all sections and remove active classes
    function resetView() {
        sectionInicio.style.display = 'none';
        sectionMisCitas.style.display = 'none';
        sectionNotificaciones.style.display = 'none';
        sectionDatosPaciente.style.display = 'none';
        
        navInicio.classList.remove('active');
        navMisCitas.classList.remove('active');
        navNotificaciones.classList.remove('active');
        navDatosPaciente.classList.remove('active');
    }

    // Views
    function showInicio() {
        resetView();
        sectionInicio.style.display = 'block';
        navInicio.classList.add('active');
        sidebarRight.style.display = 'flex'; // Show right sidebar
    }

    function showMisCitas() {
        resetView();
        sectionMisCitas.style.display = 'block';
        navMisCitas.classList.add('active');
        sidebarRight.style.display = 'none'; // Hide right sidebar
    }

    function showNotificaciones() {
        resetView();
        sectionNotificaciones.style.display = 'block';
        navNotificaciones.classList.add('active');
        sidebarRight.style.display = 'none'; // Hide right sidebar
    }

    function showDatosPaciente() {
        resetView();
        sectionDatosPaciente.style.display = 'block';
        navDatosPaciente.classList.add('active');
        sidebarRight.style.display = 'none'; // Hide right sidebar
    }

    // Event Listeners for Nav
    navInicio.addEventListener('click', function(e) { e.preventDefault(); showInicio(); });
    navMisCitas.addEventListener('click', function(e) { e.preventDefault(); showMisCitas(); });
    navNotificaciones.addEventListener('click', function(e) { e.preventDefault(); showNotificaciones(); });
    navDatosPaciente.addEventListener('click', function(e) { e.preventDefault(); showDatosPaciente(); });

    // Event Listeners for Quick Actions
    btnIrMisCitas.addEventListener('click', showMisCitas);
    btnIrNotificaciones.addEventListener('click', showNotificaciones);

    // Modal logic
    btnProgramar.addEventListener('click', function() {
        modalCita.style.display = 'flex';
    });
    
    closeModalCita.addEventListener('click', function() {
        modalCita.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target == modalCita) {
            modalCita.style.display = 'none';
        }
    });

    // Sub-navigation for "Mis citas" tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
