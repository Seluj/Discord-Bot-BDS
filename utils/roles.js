

function addRole(etudiant, id_role)
{
  etudiant.roles.add(id_role)
}

function deleteRole(etudiant, id_role)
{
  etudiant.roles.remove(id_role)
}

module.exports = {
  addRole,
  deleteRole,
};