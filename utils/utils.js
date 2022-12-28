const fs = require("node:fs");
const { parse } = require("csv-parse");

/**
 * Parse CSV files function
 * @param path where to find the csv file
 * @param separator separator to parse
 * @returns {*[]} data that is contains in the csv file
 */
function parseCSVFiles(path, separator) {
  let data = [];
  fs.createReadStream(path)
    .pipe(
      parse({
        delimiter: separator,
        columns: false,
        ltrim: true,
      })
    )
    .on("data", function (row) {
      data.push(row);
    });
  return data;
}

/**
 * Vérifie pour un étudiant donné s'il possède le role passé en paramètre
 * @param etudiant etudiant a checker
 * @param id_role role a chécker
 * @returns {boolean} retourne true si
 */
function checkRole(etudiant, id_role) {
  return etudiant.roles.cache.some(role => role.id === id_role)
}

/**
 * Vérifie si le nom corresponds à "zea zea *" (* signifiant n'importe quoi)
 * @param name nom a verifier
 * @returns {boolean} true si le nom corresponds false sinon
 */
function checkName(name) {
  let nb = name.split(' ');
  return nb.length >= 2;
}

/**
 * Test si la date passée en paramètre est plus grande que la date du jour de lancement de la commande
 * @param date Date à vérifier
 * @returns {boolean} true si la date est plus grande que celle courante false sinon
 */
function checkDate(date) {
  let tmp = date.split(' ');
  if (tmp[0] === "")
    return false;

  tmp = tmp[0].split('-');
  let year_cotis = tmp[0];
  let month_cotis = tmp[1];
  let day_cotis = tmp[2];

  let returned;
  let today = new Date();
  let day = String(today.getDate()).padStart(2, '0');
  let month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let year = today.getFullYear();

  day = parseInt(day);
  month = parseInt(month);
  year = parseInt(year);
  day_cotis = parseInt(day_cotis);
  month_cotis = parseInt(month_cotis);
  year_cotis = parseInt(year_cotis);

  if (year > year_cotis) {
    returned = false;
  } else {
    if (year === year_cotis) {
      if (month > month_cotis) {
        returned = false;
      } else {
        if (month === month_cotis) {
          returned = day <= day_cotis;
        } else {
          returned = true;
        }
      }
    } else {
      returned = true;
    }
  }
  return returned;
}

/**
 * Créer une chaine de caractère préte à être affiché ensuite avec les informations d'un joueur.
 * En fonction du boolean, la date va être en gras si true et normal si false
 * @param joueur Joueur à afficher
 * @param boolean pour décorer la date
 * @returns {string} retourne la chaine de caractère pour affichage
 */
function affichageJoueur(joueur, boolean) {
  let returned;
  let date = joueur[2].split(' ');
  if (date[0] === "") {
    date[0] = "null";
  }
  if (boolean === true) {
    returned = `__Trouvé__:\n> **Nom : ${joueur[0]}\n> Prénom : ${joueur[1]}\n> Date : ${date[0]}**\n`
  } else {
    returned = `__Trouvé__:\n> Nom : ${joueur[0]}\n> Prénom : ${joueur[1]}\n> Date : ${date[0]}\n`
  }
  return returned;
}

/**
 * Modifie les caractères non-désirés : espace et -
 * @param string chaine à modifier
 * @returns {string} chaine modifiée
 */
function replace(string) {
  let returned = string;
  for (let i=0; i< returned.length; i++) {
    if (returned[i] === ' ')
      returned = replaceAt(returned, i, "_");
    if (returned[i] === '-')
      returned = replaceAt(returned, i, "_");
    if (returned[i] === '@')
      returned = replaceAt(returned, i, "");
    if (returned[i] === "'")
      returned = replaceAt(returned, i, "_");
  }
  return returned;
}

/**
 * Remplace un caractère d'une chaine à l'index donnée
 * @param str chaine à modifier
 * @param index index ou modifier le caractère
 * @param chr caractère de remplacement
 * @returns {string} chaine avec le caractère modifié
 */
function replaceAt(str, index, chr) {
  if(index > str.length-1)
    return str;
  return str.substring(0,index) + chr + str.substring(index+1);
}

/**
 * Supprime tous les anciens fichiers pour éviter la multiplication et l'accumulation des données
 */
function deleteOldestFiles() {
  let pathRoles = './serveur/roles/';
  let pathChannel = './serveur/channels/'
  const roles_files = fs.readdirSync(pathRoles).filter(file => file.startsWith('role_'));
  const channels_files = fs.readdirSync(pathChannel).filter(file => file.startsWith('channels_'));
  for (let i=0; i< roles_files.length; i++) {
    fs.unlink(pathRoles + roles_files[i], (err) => {
      if (err) throw err;
    });
  }
  for (let i = 0; i < channels_files.length; i++) {
    fs.unlink(pathChannel + channels_files[i], (err) => {
      if (err) throw err;
    })
  }
  console.log(`${roles_files.length} fichier(s) de rôles et ${channels_files.length} fichier(s) de salons ont été supprimé`);
}

module.exports = {
  checkDate,
  affichageJoueur,
  parseCSVFiles,
  checkRole,
  deleteOldestFiles,
  replace,
  checkName,
};