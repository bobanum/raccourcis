/**
 * @module App
 */
export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		var app = document.getElementById("app");
		this.ajusterRaccourcis();

	}
	static ajusterRaccourcis() {
		document.querySelectorAll("[data-raccourci]").forEach(element => {
			var contenu = document.createElement("span");
			while (element.firstChild) {
				contenu.appendChild(element.firstChild);
			}
			var raccourci = element.dataset.raccourci.toUpperCase();
			element.appendChild(this.html_raccourci(raccourci));
			element.appendChild(contenu);
		});
	}
	static html_raccourci(raccourci) {
		var separations = [
			{ class: "groupe", sep: ";" },
			{ class: "liste", sep: "|" },
			{ class: "chord", sep: " " },
			{
				class: "touche", sep: "+", post: element => {
					var cle = element.innerHTML;
					var mods = ["META", "SHIFT", "CTRL", "CMD", "ALT",];
					if (mods.indexOf(cle) >= 0) {
						var kbd = document.createElement("kbd");
						kbd.classList.add(cle);
						element.replaceWith(kbd);
						return kbd;
					} else {
						cle = cle.replace("--", "+");
						var samp = document.createElement("samp");
						samp.textContent = cle;
						element.replaceWith(samp);
						return samp;
					}
				}
			},
		];
		var resultat = this.separer(raccourci, separations);
		return resultat;
	}
	static separer(texte, separations) {
		var resultat = document.createElement("div");
		if (separations.length === 0) {
			resultat.innerHTML = texte;
			return resultat;
		}
		var separation = separations[0];
		resultat.classList.add(separation.class);
		var items = texte.split(separation.sep);
		items.forEach(item => {
			var separes = resultat.appendChild(this.separer(item, separations.slice(1)));
			if (separation.post) {
				separation.post(separes);
			}
		});
		return resultat;
	}
	/**
	 * Méthode qui permet d'attendre le chargement de la page avant d'éxécuter le script principal
	 * @returns undefined Ne retourne rien
	 */
	static init() {
		window.addEventListener("load", () => {
			this.main();
		});
	}
}
