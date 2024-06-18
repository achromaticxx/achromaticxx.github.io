document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 회원가입 정보를 localStorage에 저장
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password, preferredCity: null });
    localStorage.setItem('users', JSON.stringify(users));

    alert('성공적으로 회원가입 되었습니다!');
    window.location.href = 'login.html'; // 회원가입 후 로그인 페이지로 이동
});
