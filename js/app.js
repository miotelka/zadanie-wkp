const app = Vue.createApp({
  data() {
		return {
			showPart1: true,
			formData: {
				firstName: '',
				lastName: '',
				email: '',
				country: '',
				zipCode: '',
				phone: '',
				creditCard: '',
				cvv: '',
				expirationDate: ''
			},
			countries: []
		};
  },
  methods: {
		async fetchCountries() {
			try {
				const response = await fetch('countries.json');
				if (response.ok) {
						this.countries = await response.json();
				} else {
						console.error('Błąd podczas pobierania nazw krajów.');
				}
			} catch (error) {
				console.error('Błąd podczas pobierania nazw krajów:', error);
			}
		},
		validatePart1() {
			if (
				this.formData.firstName &&
				this.formData.lastName &&
				this.formData.email &&
				this.formData.country &&
				this.formData.zipCode &&
				this.formData.phone
			) {
				return true;
			} else {
				return false;
			}
		},
		submitForm() {
			const creditCardWithoutSpaces = this.formData.creditCard.replace(/[\s-]/g, '');
			const expirationDateWithoutSlashes = this.formData.expirationDate.replace(/\//g, '');

			if (
				creditCardWithoutSpaces.length === 16 &&
				this.formData.cvv.length === 3 &&
				expirationDateWithoutSlashes.length === 4
			){
				// Wyświetlanie w formie jednego obiektu
				console.log(this.formData); 
				
				// Wyświetlanie wyników osobno każdy
				console.log('Dane adresowe:');
				console.log('Imię:', this.formData.firstName);
				console.log('Nazwisko:', this.formData.lastName);
				console.log('Email:', this.formData.email);
				console.log('Kraj:', this.formData.country);
				console.log('Kod pocztowy:', this.formData.zipCode);
				console.log('Numer telefonu:', this.formData.phone);
	
				console.log('Dane płatnicze:');
				console.log('Numer karty kredytowej:', this.formData.creditCard);
				console.log('Kod karty (3 cyfry):', this.formData.cvv);
				console.log('Data wygaśnięcia karty kredytowej:', this.formData.expirationDate);
			} else {
				console.error('Proszę wypełnić poprawnie wszystkie pola karty płatniczej.');
			}
		},
		handleNextClick() {
			if (this.validatePart1()) {
				this.showPart1 = false;
			} else {
				console.error('Proszę wypełnić wszystkie pola danych adresowych.');
			}
		}
  },
  created() {
		this.fetchCountries();
  }
});

app.mount('#app');
