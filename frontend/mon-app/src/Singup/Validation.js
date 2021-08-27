const Validation = (valuesInput) => {
    let errors = {};

    if(!valuesInput.email){
        errors.email = "Sélectionner une adresse Gmail"
    }
    
    if(!valuesInput.password){
        errors.password = "Entrez un mot  de passe  ! "
    }else if(valuesInput.password.length <5 ){
        errors.password = "Mot de passe doit comporter au moins 6 caractères"
    }

    if(!valuesInput.confipassword){
        errors.confipassword = "Confirmer votre mot de passe ! "
    }else if(valuesInput.confipassword !== valuesInput.password){
        errors.confipassword = "Mot de passe incorrect ! "
    }

  
    return ( Object.keys(errors).length > 0 ? errors : null  );
}
 
export default Validation;




