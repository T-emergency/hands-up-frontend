async function handleLogin() {

    const phone = document.getElementById("phone").value
    const password = document.getElementById("password").value

    const response = await fetch('http://127.0.0.1:8000/user/api/token/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "phone": phone,
            "password": password
        })
    })
    // console.log(response.json())
    if (response.status === 200) {
        const response_json = await response.json()

        console.log(response_json["access"])

        localStorage.setItem('access', response_json.access)
        localStorage.setItem('refresh', response_json.refresh)


        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem('payload', jsonPayload)
        localStorage.setItem('handsup', JSON.stringify({}));


        window.location.href = "/index.html"

    } else {
        console.log(response)
    }

}

async function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
}