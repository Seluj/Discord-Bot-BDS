const fs = require("node:fs");
const { parse } = require("csv-parse");


function parseCSVFiles(path, separator)
{
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
 * Vérifie pour un étudiant donné s'il possede le role passé en parametre
 * @param etudiant etudiant a checker
 * @param id_role role a chécker
 * @returns {boolean} retourne true si
 */
function checkRole(etudiant, id_role)
{
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
 * Test si la date passée en parametre est plus grande que la date du jour de lancement de la commande
 * @param date Date à vérifier
 * @returns {boolean} true si la date est plus grande que celle courante false sinon
 */
function checkDate(date)
{
  let returned;
  let today = new Date();
  let day = String(today.getDate()).padStart(2, '0');
  let month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let year = today.getFullYear();
  let tmp = date.split(' ');
  tmp = tmp[0].split('-');
  let year_cotis = tmp[0];
  let month_cotis = tmp[1];
  let day_cotis = tmp[2];

  day = parseInt(day);
  month = parseInt(month);
  year = parseInt(year);
  day_cotis = parseInt(day_cotis);
  month_cotis = parseInt(month_cotis);
  year_cotis = parseInt(year_cotis);

  if (year > year_cotis)
  {
    returned = false;
  }
  else
  {
    if (year === year_cotis)
    {
      if (month > month_cotis)
      {
        returned = false;
      }
      else
      {
        if (month === month_cotis)
        {
          returned = day <= day_cotis;
        } else
          returned = true;
      }
    }
    else
    {
      returned = true;
    }
  }

  return returned;
}

/**
 *
 * @param joueur
 * @param boolean
 * @returns {string}
 */
function affichageJoueur(joueur, boolean)
{
  let returned;
  let date = joueur[2].split(' ');
  if (boolean === true)
  {
    returned = `Trouvé: \n
            Nom : ${joueur[0]}\n
            Prénom : ${joueur[1]}\n
            Date : **${date[0]}**`
  }
  else
  {
    returned = `Trouvé: \n
            Nom : ${joueur[0]}\n
            Prénom : ${joueur[1]}\n
            Date : ${date[0]}`
  }
  return returned;
}

/**
 * Modifie les caracteres non-désirés : espace et -
 * @param string chaine à modifier
 * @returns {string} chaine modifiée
 */
function replace(string)
{
  let returned = string;
  for (let i=0; i< returned.length; i++)
  {
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
 * Remplace un charactere d'une chaine à l'index donnée
 * @param str chaine à modifier
 * @param index index ou modifier le charactere
 * @param chr charactere de remplacement
 * @returns {string} chaine avec le caractere modifié
 */
function replaceAt(str, index, chr) {
  if(index > str.length-1)
    return str;
  return str.substring(0,index) + chr + str.substring(index+1);
}

/**
 * Supprime tous les anciens fichiers pour éviter la multiplications et l'accumulation des données
 */
function deleteOldestFiles()
{
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