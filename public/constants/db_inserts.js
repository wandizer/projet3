 servicesInserts() {
    const arg = [
      'Admin',
      'Gestionnaires',
      'Cuisine',
      'Salle',
      'Réception',
      'Etages',
      'Maintenance',
      'Direction',
      'Loisirs'];
    for (let i = 0; i < arg.length; i += 1) {
     	const sql = `INSERT INTO service(name) VALUES ('${arg[i]}')`;
    	this.executeQuery(sql, params);
    }
  }

  rolesInserts() {
      
      const sql = `INSERT INTO role(name,id_service) VALUES ('Directeur de l’hôtel',1)`;
    	this.executeQuery(sql, params);
      
    let arg = ['Directeur du restaurant',
				 'Directeur d’hébergement',
				 'Chef de réception',
				 'Gouvernante générale',
				 'Chef de maintenance',
				 'Spa manager'];
    for (let i = 0; i < arg.length; i += 1) {
     	const sql = `INSERT INTO role(name,id_service) VALUES ('${arg[i]}',2)`;
    	this.executeQuery(sql, params);
    }

    arg = ['chef de cuisine',
				 'seconde de cuisine',
				 'chef de partie',
				 'pâtissier',
				 'boulanger',
				 'cuisinier',
				 'commis de cuisine',
				 'pizzaïolo',
				 'crêpier',
				 'écailler',
				 'plongeur',
				 'chef econome',
				 'économes'];
    for (let i = 0; i < arg.length; i += 1) {
     	const sql = `INSERT INTO role(name,id_service) VALUES ('${arg[i]}',3)`;
    	this.executeQuery(sql, params);
    }

    arg = ['responsable de salle',
				 'maître d’hôtel',
				 'chef de range',
				 'serveur',
				 'commis de salle',
				 'chef sommelier',
				 'sommelier',
				 'barman',
				 'garçon de café'];
    for (let i = 0; i < arg.length; i += 1) {
     	const sql = `INSERT INTO role(name,id_service) VALUES ('${arg[i]}',4)`;
    	this.executeQuery(sql, params);
    }

    arg = ['chef de réception',
				 'réceptionniste',
				 'night auditor',
				 'veilleur de nuit',
				 'concierge',
				 'voiturier',
				 'portier',
				 'bagagiste',
				 'groom',
				 'room service'];
    for (let i = 0; i < arg.length; i += 1) {
     	const sql = `INSERT INTO role(name,id_service) VALUES ('${arg[i]}',5`;
    	this.executeQuery(sql, params);
    }

    arg = ['Gouvernante Générale',
				 'gouvernante',
				 'femme de chambre',
				 'lingère'];
    for (let i = 0; i < arg.length; i += 1) {
     	const sql = `INSERT INTO role(name,id_service) VALUES ('${arg[i]}',6)`;
    	this.executeQuery(sql, params);
    }

				 arg = ['chef de maintenance',
				 'techniciens de maintenance'];
    for (let i = 0; i < arg.length; i += 1) {
     	const sql = `INSERT INTO role(name,id_service) VALUES ('${arg[i]}',7)`;
    	this.executeQuery(sql, params);
    }


				 arg = ['directeur d’hôtel',
				 'directeur du restaurant',
				 'directeur de l’hébergement'];
    for (let i = 0; i < arg.length; i += 1) {
     	const sql = `INSERT INTO role(name,id_service) VALUES ('${arg[i]}',8)`;
    	this.executeQuery(sql, params);
    }

     	const sql = 'INSERT INTO role(name,id_service) VALUES (\'Spa Manager\',8)';
    	this.executeQuery(sql, params);
    }
  }