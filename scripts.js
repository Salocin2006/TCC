document.getElementById("ingredientForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    // Obtenha os ingredientes digitados pelo usuário
    const ingredients = document.getElementById("ingredients").value.trim();
  
    if (!ingredients) {
      alert("Por favor, insira pelo menos um ingrediente.");
      return;
    }
  
    // Simular uma chamada para o backend
    fetch("backend_endpoint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Exibir as receitas na página
        const recipesDiv = document.getElementById("recipes");
        const recipeList = document.getElementById("recipeList");
        recipeList.innerHTML = "";
  
        if (data.recipes.length > 0) {
          data.recipes.forEach((recipe) => {
            const listItem = document.createElement("li");
            listItem.textContent = recipe;
            recipeList.appendChild(listItem);
          });
          recipesDiv.classList.remove("hidden");
        } else {
          recipesDiv.classList.remove("hidden");
          recipeList.innerHTML = "<li>Nenhuma receita encontrada com os ingredientes informados.</li>";
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar receitas:", error);
        alert("Houve um erro ao buscar as receitas. Tente novamente mais tarde.");
      });
  });
  