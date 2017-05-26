var current_mode = "owner";

function changeMode(mode) {
  console.log(mode);
  current_mode = mode;
  changeSelectedModeHTML();
  changeContent();
}

function changeSelectedModeHTML() {
  var new_modes_html = "<button onclick=\"changeMode('owner')\" class=\"user-mode-selected\">owner</button><button onclick=\"changeMode('host')\" class=\"user-mode\">host</button>"
  if (current_mode == "host") {
    new_modes_html = "<button onclick=\"changeMode('owner')\" class=\"user-mode\">owner</button><button onclick=\"changeMode('host')\" class=\"user-mode-selected\">host</button>"
  }
  document.getElementById("user-modes-container_id").innerHTML = new_modes_html;
}

function changeContent() {
  // deve checar se o usuário está habilitado no current_mode.
  // se não estiver, mostra "<h2>Você não está cadastrado neste modo de uso.</h2>"
  var new_title = "<h1>Owner</h1>";
  var new_content = "<h2>Aqui tem coisas de owner</h2>";

  if (current_mode == "host") {
    new_title = "<h1>Host</h1>";
    new_content = "<h2>Você não está cadastrado neste modo de uso. (só um exemplo)</h2>";
  }
  document.getElementById("user-mode-title_id").innerHTML = new_title;
  document.getElementById("user-content_id").innerHTML = new_content;
}