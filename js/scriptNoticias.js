document.addEventListener('DOMContentLoaded', function () {
    // Ruta al archivo JSON
    const rutaJSON = 'json/Noticias.json';
    // Fetch para obtener los datos del archivo JSON
    fetch(rutaJSON)
        .then(response => response.json())
        .then(data => {
            // Muestra las noticias en la consola para verificar
            console.log("DATA: "+data);

            // Actualiza la sección de noticias con los datos obtenidos del JSON
            const noticiasSection = document.getElementById('noticias');
            data.forEach(noticia => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <h3>${noticia.titulo}</h3>
                    <p>${noticia.contenido}</p>
                `;
                noticiasSection.appendChild(article);
            });
        })
        .catch(error => console.error('Error al obtener datos del archivo JSON:', error));
});
