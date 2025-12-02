// 1. Змінні та елементи
const gallery = document.getElementById('gallery');
const btnLoad = document.getElementById('btn-load');
const btnClear = document.getElementById('btn-clear');
const btnRemove = document.getElementById('btn-remove');
const btnReverse = document.getElementById('btn-reverse');

// Змінна для пагінації (щоб завантажувати РІЗНІ картинки)
let page = 1;
const limit = 4;

// 2. Функція отримання картинок
async function fetchImages() {
    try {
        // Робимо запит на API з номером сторінки та лімітом
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
        const data = await response.json();

        // Проходимо по отриманих даних і створюємо картинки
        data.forEach(item => {
            const img = document.createElement('img');
            img.src = item.download_url; // Посилання з API
            img.alt = `Author: ${item.author}`;
            img.classList.add('gallery-item');
            
            // Додаємо картинку в галерею
            gallery.appendChild(img);
        });

        // Збільшуємо номер сторінки для наступного натискання "Завантажити ще"
        page++;
    } catch (error) {
        console.error('Помилка завантаження:', error);
        alert('Не вдалося завантажити картинки.');
    }
}

// 3. Обробники подій (Listeners)

// А) Завантажити ще 4 картинки
btnLoad.addEventListener('click', () => {
    fetchImages();
});

// Б) Очистити галерею
btnClear.addEventListener('click', () => {
    gallery.innerHTML = ''; // Видаляє весь HTML всередині галереї
    // Можна скинути page = 1, якщо хочете починати спочатку, 
    // але за умовою "додати інакших", тому page не скидаємо.
});

// В) Видалити останню картинку
btnRemove.addEventListener('click', () => {
    if (gallery.lastElementChild) {
        gallery.lastElementChild.remove();
    } else {
        alert('Галерея порожня!');
    }
});

// Г) Перевернути галерею
btnReverse.addEventListener('click', () => {
    // Отримуємо всі картинки як масив
    const images = Array.from(gallery.children);
    
    // Очищаємо галерею
    gallery.innerHTML = '';
    
    // Розвертаємо масив і додаємо картинки назад
    images.reverse().forEach(img => {
        gallery.appendChild(img);
    });
});

// 4. Перше завантаження при запуску сторінки
fetchImages();