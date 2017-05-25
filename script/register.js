
////////////////////////////////////////////////////////////////////////////////////////
// essa definicao deveria ir no arquivo classes, mas nao entendi como importar pra ca

class Usuario {
	constructor(nome, email, senha) {
		this.nome = nome;
		this.email = email;
		this.senha = senha;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////

function checkName() {
	if ($("#nameField").val() == "nome") {
		$("#nameError").show();
		$("#nameError").text("Insira o nome do usuário");
		return 0;
	}
	
	if ($("#nameField").val().length < 3) {
		($("#nameError").text("Nome muito curto"));
		$("#nameError").show();
		return 0;
	}
	
	$("#nameError").hide();
	return 1;
}

function checkEmail() {
	if ($("#emailField").val() == "email") {
		$("#emailError").show();
		$("#emailError").text("Insira um e-mail");
		return 0;
	}
	
	else {
		$("#emailError").hide();
		return 1;
	}
}

function checkPasswordConsistency() {
	if ($("#passwordField").val() == $("#confirmPasswordField").val()) {
		$("#passwordError").hide();
		return 1;
	}
	
	else {
		($("#passwordError").text("As senhas não conferem!"));
		$("#passwordError").show();
		return 0;
	}
}

function checkPasswordLength() {
	if ($("#passwordField").val().length > 5) {
		$("#passwordError").hide();
		return 1;
	}
	
	else {
		($("#passwordError").text("A senha deve ter mais de 5 caracteres"));
		$("#passwordError").show();
		return 0;
	}
}

function registerUser() {
	if (checkName() && checkEmail() && checkPasswordLength() && checkPasswordConsistency()) {
		
		var register = new Usuario($("#nameField").val(), $("#emailField").val(), $("#passwordField").val());
	
	
	
		var blob = new Blob([$("#nameField").val(), $("#passwordField").val()], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "registro.txt");
		}
}






//console.log($("#nameField").val());
