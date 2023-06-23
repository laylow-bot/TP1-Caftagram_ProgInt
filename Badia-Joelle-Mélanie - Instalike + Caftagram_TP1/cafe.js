const API_URL = 'https://insta-api-api.0vxq7h.easypanel.host';



// Sélectionner les éléments HTML
const cafeList = document.getElementById('cafe-list');
const cafeForm = document.getElementById('cafe-form');
const nameInput = document.getElementById('name');
const pictureUrlInput = document.getElementById('pictureUrl');
const descriptionInput = document.getElementById('description');
const messageDiv = document.getElementById('message');

// Écouter l'événement de soumission du formulaire d'ajout de café
cafeForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = nameInput.value;
  const pictureUrl = pictureUrlInput.value;
  const description = descriptionInput.value;
  
  if (name && pictureUrl && description) {
    addCafe(name, description, pictureUrl);
    resetForm();
  } else {
    showMessage('Veuillez remplir tous les champs du formulaire.');
  }
});

// Fonction pour afficher la liste de cafés
function displayCafes(cafeData) {
  cafeList.innerHTML = ''; // Réinitialiser la liste
  
  cafeData.forEach(cafe => {
    const li = document.createElement('li');
    
    const img = document.createElement('img');
    img.src = cafe.pictureUrl;
    img.alt = cafe.name;
    li.appendChild(img);
    
    const h3 = document.createElement('h3');
    h3.textContent = cafe.name;
    li.appendChild(h3);
    
    const p = document.createElement('p');
    p.textContent = cafe.description;
    li.appendChild(p);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.addEventListener('click', () => deleteCafe(cafe.id));
    li.appendChild(deleteBtn);
    
    cafeList.appendChild(li);
  });
}

// Fonction pour ajouter un café
function addCafe(name, description, pictureUrl) {
  const data = {
    name: name,
    description: description,
    pictureUrl: pictureUrl
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': `${API_URL}/coffees`
    },
    body: JSON.stringify(data)
  };
  fetch(API_URL + '/coffees', options)
    .then(response => response.json())
    .then(result => {
      console.log('Response:', result);
      resetForm(); // Réinitialiser les champs du formulaire
      fetchCafes(); // Mettre à jour la liste des cafés
    })
    .catch(error => {
      console.error('Erreur lors de l\'ajout du café :', error);
      showMessage('Erreur lors de l\'ajout du café. Veuillez réessayer.');
    });
}
// Fonction pour supprimer un café
function deleteCafe(cafeId) {
  fetch(`${API_URL}/coffees/${cafeId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        fetchCafes();
        location.reload(); // Rafraîchir la page
      } else {
        throw new Error('Erreur lors de la suppression du café');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la suppression du café :', error);
      showMessage('Erreur lors de la suppression du café. Veuillez réessayer.');
    });
}


// Fonction pour récupérer la liste des cafés
function fetchCafes() {
  fetch(`${API_URL}/coffees`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erreur lors de la récupération des cafés');
      }
    })
    .then(data => {
      displayCafes(data);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des cafés :', error);
    });
}

// Fonction pour réinitialiser les champs du formulaire
function resetForm() {
  nameInput.value = '';
  pictureUrlInput.value = '';
  descriptionInput.value = '';
}

// Fonction pour afficher un message à l'utilisateur
function showMessage(message) {
  messageDiv.textContent = message;
}

// Appeler la fonction fetchCafes pour afficher la liste des cafés au chargement de la page
fetchCafes();


const openFormLink = document.getElementById('open-form-link');

  openFormLink.addEventListener('click', (event) => {
    event.preventDefault();
    const popupWindow = window.open('', 'popupWindow', 'width=600,height=400');
    const popupDocument = popupWindow.document;
    popupDocument.write('<html><head><title>Formulaire</title></head><body>');
    popupDocument.write('<h1>Formulaire</h1>');
    popupDocument.write(document.getElementById('popup-form').innerHTML);
    popupDocument.write('</body></html>');
    popupDocument.close();

    const popupForm = popupDocument.getElementById('cafe-form');

    popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = popupDocument.getElementById('name').value;
      const pictureUrl = popupDocument.getElementById('pictureUrl').value;
      const description = popupDocument.getElementById('description').value;

      if (name && pictureUrl && description) {
        addCafe(name, description, pictureUrl);
        resetForm();
        popupWindow.close();
      } else {
        showMessage('Veuillez remplir tous les champs du formulaire.');
      }
    });
  });

  