document.addEventListener('DOMContentLoaded', function () {
	// Variables
	const emailObj = {
		email: '',
		asunto: '',
		mensaje: '',
		cc: ''
	}

	// Seleccionar los elementos de la interfaz
	const inputEmail = document.querySelector('#email')
	const inputAsunto = document.querySelector('#asunto')
	const inputCC = document.querySelector('#cc')
	const inputMensaje = document.querySelector('#mensaje')
	const formulario = document.querySelector('#formulario')
	const btnSubmit = document.querySelector(
		'.button-group button[type="submit"]'
	)
	const btnReset = document.querySelector('.button-group button[type="reset"]')
	const spinner = document.querySelector('#spinner')

	// Asignar eventos
	inputEmail.addEventListener('blur', validar)
	inputAsunto.addEventListener('blur', validar)
	inputCC.addEventListener('blur', validar)
	inputMensaje.addEventListener('input', validar)
	formulario.addEventListener('submit', enviarEmail)
	btnReset.addEventListener('click', resetForm)

	// Funciones
	function validar(e) {
		const campo = e.target.id.toUpperCase()
		if (e.target.value.trim() === '') {
			// No mostrar alerta si el campo es CC y está vacío
			if (e.target.id !== 'cc') {
				mostrarAlerta(
					`El campo ${campo} es obligatorio `,
					e.target.parentElement
				)
				emailObj[e.target.name] = ''
				comprobarEmail()
			}
			return
		}
		if (e.target.id === 'email' && !validarEmail(e.target.value)) {
			mostrarAlerta('El email no es valido', e.target.parentElement)
			emailObj[e.target.name] = ''
			comprobarEmail()
			return
		}
		if (
			e.target.id === 'cc' &&
			e.target.value.trim() !== '' &&
			!validarEmail(e.target.value)
		) {
			mostrarAlerta('El email de CC no es válido', e.target.parentElement)
			emailObj[e.target.name] = ''
			comprobarEmail()
			return
		}

		limpiarAlerta(e.target.parentElement)

		// Asignar los valores
		emailObj[e.target.name] = e.target.value.trim().toLowerCase()

		// Comprobar el objeto emailObj
		comprobarEmail()
	}

	function mostrarAlerta(mensaje, referencia) {
		limpiarAlerta(referencia)

		// Generar alerta en html
		const alerta_vacio_parrafo = document.createElement('P')
		alerta_vacio_parrafo.textContent = mensaje
		alerta_vacio_parrafo.classList.add('alerta-vacio')

		// Inyectar el error al formulario
		referencia.appendChild(alerta_vacio_parrafo)
	}

	function limpiarAlerta(referencia) {
		// Comprueba si ya existe una alerta
		const alerta = referencia.querySelector('.alerta-vacio')
		if (alerta) {
			alerta.remove()
		}
	}

	function validarEmail(email) {
		const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
		const resultado = regex.test(email)
		return resultado
	}

	function comprobarEmail() {
		// Verificar solo los campos obligatorios
		if (
			emailObj.email === '' ||
			emailObj.asunto === '' ||
			emailObj.mensaje === ''
		) {
			btnSubmit.style.opacity = '0.5'
			btnSubmit.style.cursor = 'not-allowed'
			btnSubmit.disabled = true
			return
		}
		btnSubmit.style.opacity = '1'
		btnSubmit.style.cursor = 'pointer'
		btnSubmit.disabled = false
	}

	function resetForm() {
		emailObj.email = ''
		emailObj.asunto = ''
		emailObj.mensaje = ''
		emailObj.cc = ''
		formulario.reset()
		comprobarEmail()
	}

	function enviarEmail(e) {
		e.preventDefault()
		spinner.style.display = 'flex'

		setTimeout(() => {
			spinner.style.display = 'none'

			resetForm()

			// Crear una alerta
			const alertaExito = document.createElement('P')
			alertaExito.classList.add('alerta-exito-enviar')
			alertaExito.textContent = 'Email enviado correctamente'
			formulario.appendChild(alertaExito)

			setTimeout(() => {
				alertaExito.remove()
			}, 3000)
		}, 3000)
	}
})
