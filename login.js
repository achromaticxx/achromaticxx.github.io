document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // localStorage에서 사용자 목록을 가져옴
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 사용자 정보 확인
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // 로그인 성공 시 localStorage에 현재 로그인 정보 저장
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'index.html'; // 로그인 후 메인 페이지로 이동
    } else {
        alert('ID나 Password가 잘못 입력되었거나 존재하지 않는 회원입니다.');
    }
});
