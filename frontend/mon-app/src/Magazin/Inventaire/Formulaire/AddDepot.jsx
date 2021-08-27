import React from 'react'

const AddDepot = () => {

   


    return (
        <div className="card" >
          <div className="card-body">
            <h4 className="card-title">Ajouter un nouveau Depot</h4>
            <form className="forms-sample">
              <div className="form-group row">
                <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Nom dépot</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="exampleInputUsername2" name="nomdepot" placeholder="Nom dépot" />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">localisation</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="exampleInputUsername2" name="localisation" placeholder="localisation" />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="exampleInputEmail2" className="col-sm-3 col-form-label">Responsable  </label>
                <div className="col-sm-9">
                    <select className="select_categorie" name="Statut" id="">
                        <option value="enlocation">Responsable </option>
                    

                    </select>
                </div>
              </div>
                   
           
              <button type="submit" className="btn btn-gradient-primary mr-2">Terminer</button>
              
            </form>
          </div>
        </div>

      );
}
 
export default AddDepot;