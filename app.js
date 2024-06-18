const apiKey = '20d1834566e65569e22c204fce9333ee';
const ctx = document.getElementById('weatherChart').getContext('2d');
let weatherChart;

// 페이지 로드 시 사용자 정보 확인 및 관심지역 표시
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        displayUserInfo(currentUser);
        document.getElementById('user-info').style.display = 'block';
        document.getElementById('logout-btn').style.display = 'block';
        setupLocationForm(currentUser);

        // 선호 지역 설정된 경우 해당 지역의 날씨를 가져와 표시
        if (currentUser.preferredCity) {
            fetchWeatherForPreferredCity(currentUser.preferredCity);
        }
    } else {
        document.getElementById('auth-links').style.display = 'block';
    }
});

// 도시 선택 후 날씨 정보 가져오기
function getWeather() {
    const city = document.getElementById('city').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        const weatherDiv = document.getElementById('weather');
        weatherDiv.innerHTML = `<h2>${data.name}</h2>
                                <p>기온: ${data.main.temp} °C</p>
                                <p>날씨: ${data.weather[0].description}</p>
                                <p>습도: ${data.main.humidity}%</p>
                                <p>풍속: ${data.wind.speed} m/s</p>`;

        const temp = data.main.temp;
        const feelsLike = data.main.feels_like;
        const tempMin = data.main.temp_min;
        const tempMax = data.main.temp_max;

        if (weatherChart) {
            weatherChart.destroy();
        }

        weatherChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['기온', '체감 온도', '최저 기온', '최고 기온'],
                datasets: [{
                    label: 'Temperature in °C',
                    data: [temp, feelsLike, tempMin, tempMax],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
}

// 사용자 정보를 표시하는 함수
function displayUserInfo(user) {
    document.getElementById('username').textContent = `Username : ${user.username}`;
    document.getElementById('preferred-location').textContent = `선호 지역 : ${user.preferredCity || '선호 지역이 없습니다.'}`;
}

// 선호 지역 설정 폼 초기화 및 이벤트 핸들링 설정
function setupLocationForm(user) {
    const locationForm = document.getElementById('location-form');
    const preferredCitySelect = document.getElementById('preferred-city');

    // 기존 선호 지역 표시
    if (user.preferredCity) {
        preferredCitySelect.value = user.preferredCity;
    }

    // 선호 지역 저장 이벤트 핸들러
    locationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const preferredCity = preferredCitySelect.value;

        // 현재 사용자 정보를 localStorage에서 가져옴
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // 해당 사용자의 선호 지역을 업데이트
        const updatedUsers = users.map(u => {
            if (u.username === user.username) {
                return { ...u, preferredCity };
            }
            return u;
        });

        // 업데이트된 사용자 목록을 localStorage에 저장
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // 현재 사용자 정보 업데이트
        localStorage.setItem('currentUser', JSON.stringify({ ...user, preferredCity }));

        // 선호 지역 설정 후 사용자 정보 다시 표시
        displayUserInfo({ ...user, preferredCity });
        alert('선호 지역이 성공적으로 저장되었습니다.');

        // 선택된 선호 지역의 날씨 정보 가져오기
        fetchWeatherForPreferredCity(preferredCity);
    });
}

// 선택된 선호 지역의 날씨 정보 가져오기
function fetchWeatherForPreferredCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        const weatherDiv = document.getElementById('weather');
        weatherDiv.innerHTML = `<h2>${data.name}</h2>
                                <p>기온: ${data.main.temp} °C</p>
                                <p>날씨: ${data.weather[0].description}</p>
                                <p>습도: ${data.main.humidity}%</p>
                                <p>풍속: ${data.wind.speed} m/s</p>`;

        const temp = data.main.temp;
        const feelsLike = data.main.feels_like;
        const tempMin = data.main.temp_min;
        const tempMax = data.main.temp_max;

        if (weatherChart) {
            weatherChart.destroy();
        }

        weatherChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['기온', '체감 온도', '최저 기온', '최고 기온'],
                datasets: [{
                    label: 'Temperature in °C',
                    data: [temp, feelsLike, tempMin, tempMax],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
}

// 로그아웃 처리
function logout() {
    localStorage.removeItem('currentUser');
    alert('로그아웃 되었습니다. 이용해주셔서 감사합니다.')
    window.location.href = 'login.html'; // 로그아웃 후 로그인 페이지로 이동
}
