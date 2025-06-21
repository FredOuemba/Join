// Die Funktion für das Dropdown-Menü
function toggleDropdown() {
    document.getElementById('userDropdown').classList.toggle('show');
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.user-initial-small')) {
        var dropdowns = document.getElementsByClassName("dropdown-menu-small");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Event Listener hinzufügen, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
    const userInitialButton = document.querySelector('.user-initial-small');
    if (userInitialButton) {
        userInitialButton.addEventListener('click', toggleDropdown);
    }
});

// Die Funktion global verfügbar machen
window.toggleDropdown = toggleDropdown;

    (() => {
      const categorySelect = document.getElementById('category-select');
      const categoryOptions = document.getElementById('category-options');
      const categoryArrow = document.getElementById('category-arrow');
      const categoryArrowWrapper = document.getElementById('category-arrow-wrapper');
      const categorySelectedLabel = document.getElementById('category-selected-label');
      let isOpen = false;

      // Öffnen/Schließen Dropdown
      categorySelect.onclick = function(e) {
        e.stopPropagation();
        isOpen = !isOpen;
        categoryOptions.style.display = isOpen ? "block" : "none";
        categoryArrow.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
        categorySelect.classList.toggle('active', isOpen);
      };

      // Hover Effekt für Pfeil
      categoryArrowWrapper.onmouseenter = function() {
        categoryArrowWrapper.classList.add('arrow-hover');
      };
      categoryArrowWrapper.onmouseleave = function() {
        categoryArrowWrapper.classList.remove('arrow-hover');
      };

      // Auswahl einer Option
      document.querySelectorAll('.category-option').forEach(opt => {
        opt.onclick = function(e) {
          e.stopPropagation();
          categorySelectedLabel.textContent = this.textContent;
          // active Klasse setzen/entfernen
          document.querySelectorAll('.category-option').forEach(o => o.classList.remove('selected'));
          this.classList.add('selected');
          // Dropdown schließen, Pfeil bleibt blau
          isOpen = false;
          categoryOptions.style.display = "none";
          categoryArrow.style.transform = "rotate(0deg)";
          categorySelect.classList.add('active');
          categorySelect.classList.add('has-value');
        };
      });

      // Schließen beim Klick außerhalb
      document.addEventListener('click', function(e) {
        if(isOpen) {
          isOpen = false;
          categoryOptions.style.display = "none";
          categoryArrow.style.transform = "rotate(0deg)";
        }
      });
    })();