document.getElementById("email-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    // Данные для отправки на GitHub
    const data = {
        message: "New email submission",
        content: btoa(email + "\n"),  // Преобразуем e-mail в формат Base64
        branch: "main"  // Укажите вашу ветку
    };

    try {
        // Отправляем запрос на GitHub API
        const response = await fetch("https://api.github.com/repos/ВАШ_ЮЗЕРНЕЙМ/ВАШ_РЕПОЗИТОРИЙ/contents/emails.txt", {
            method: "PUT",
            headers: {
                "Authorization": "Bearer ВАШ_GITHUB_TOKEN",
                "Accept": "application/vnd.github.v3+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            document.getElementById("message").style.display = "block";
            document.getElementById("email").value = "";
        } else {
            alert("Ошибка при сохранении e-mail.");
        }
    } catch (error) {
        console.error("Ошибка:", error);
    }
});
