document.addEventListener('DOMContentLoaded', function() {
    var yearElements = document.querySelectorAll('.current-year');
    var currentYear = new Date().getFullYear();
    yearElements.forEach(function(el) {
        el.textContent = currentYear;
    });
});
