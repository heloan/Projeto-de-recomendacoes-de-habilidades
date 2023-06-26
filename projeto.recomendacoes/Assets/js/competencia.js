/// :: Pedro Rodrigues Santos Valle - 01810422
/// :: Heloan José Jacinto Marinho - 02310024

/// :: DADOS DO USUARIO E DO PERFIL VISITADO.
const idPerfilLogado = 1;
const idPerfilVisitado = 2;

let btns = document.querySelectorAll('.competencia__card-btn');
btns.forEach(btn => btn.addEventListener('click', postCompetencia));

getCompetencias();

function getCompetencias() {
    fetch(`/api/recomendacao/${idPerfilLogado}/${idPerfilVisitado}`)
        .then(response => response.json())
        .then(json => {
            json.forEach(obj => {
                let element = [...btns].find(el => el.parentElement.getAttribute('data-competenciaid') == obj.idCompetencia);
                element.innerHTML = "Recomendado :)";
                element.disabled = true;
            })
        })
        .catch(err => console.log('Erro de solicitação', err));
}

function postCompetencia(e) {
    if (!this.disabled) {
        const formData = {
            idPerfilRecomendou: idPerfilLogado,
            idPerfilRecomendado: idPerfilVisitado,
            idCompetencia: parseInt(this.parentElement.getAttribute('data-competenciaid'))
        };
        fetch('/api/recomendacao', {
            method: "POST",
            body: JSON.stringify(formData),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(response => response.json())
        .then(json => {
            this.innerHTML = "Recomendado :)";
            this.disabled = true;
        })  
        .catch(err => console.log(err));
    }
}