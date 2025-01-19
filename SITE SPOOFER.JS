document.addEventListener("DOMContentLoaded", function() {
    function highlightElement(id, duration) {
        var element = document.getElementById(id);
        if (element) {
            element.classList.add('highlight');
            setTimeout(function() {
                element.classList.remove('highlight');
            }, duration); // Duração ajustável da animação
        }
    }

    function smoothScroll(target, duration) {
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 50; // Ajuste a posição
        var startPosition = window.pageYOffset;
        var distance = targetPosition - startPosition;
        var startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            var timeElapsed = currentTime - startTime;
            var run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    var links = document.querySelectorAll('a[href="#arquivos"], a[href="#passo10"]');

    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var targetID = this.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetID);

            if (targetElement) {
                smoothScroll(targetElement, 1000); // Duração de 1000ms para a rolagem suave
                highlightElement(targetID, 5000); // Duração de 5000ms para a animação de destaque
                history.pushState(null, null, '#' + targetID);
            }
        });
    });
});





/* scripts.js */
function toggleDropdown() {
    const dropdownContent = document.getElementById("dropdown-content");
    dropdownContent.classList.toggle("show");

    // Rolar a página para o menu suspenso
    if (dropdownContent.classList.contains("show")) {
        dropdownContent.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function changeLanguage(language) {
    const urlMap = {
        'pt': 'SITE SPOOFER PT-BR.html',
        'en': 'SITE SPOOFER EN.html',
    };
    const targetUrl = urlMap[language];
    if (targetUrl) {
        window.location.href = targetUrl;
    }
}

// Fechar o menu se o usuário clicar fora dele
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}



