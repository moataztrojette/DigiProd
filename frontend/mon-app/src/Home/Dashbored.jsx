import React, { useState,useEffect } from 'react'
import { Bar ,Line,Pie,Doughnut } from 'react-chartjs-2';
import axios from 'axios'

const Dashbored = () => {
    const [depot,setDepot] = useState([])
    const[Article,setArticle] = useState({})


    const[categorie,setCategorie] = useState([])

    const[data,setData] = useState([])
    const[dataCat,setDataCat] =useState([])
    


    useEffect(()=>{
        let  nameDepot = [];
        let categorie = [];
        let nbArticle = {};
        let nbArticleCat = {};


        

        axios.get("http://localhost:4000/api/article/findall").then((res)=>{
            for(const dataObj of res.data){
                if(nameDepot.indexOf(dataObj.localisation.nomDepot)===-1){
                    nameDepot.push(dataObj.localisation.nomDepot)
                }
                
                if(categorie.indexOf(dataObj.categorieArticle.nomCategorie)===-1){
                    categorie.push(dataObj.categorieArticle.nomCategorie)
                }
                

                if(nbArticle[dataObj.localisation._id]){
                    nbArticle[dataObj.localisation._id] +=1
                }
                else{
                    nbArticle[dataObj.localisation._id] = 1
                }      
                
                
                if(nbArticleCat[dataObj.categorieArticle._id]){
                    nbArticleCat[dataObj.categorieArticle._id] +=1
                }
                else{
                    nbArticleCat[dataObj.categorieArticle._id] = 1
                } 



            }
            console.log(nameDepot)

            setData(Object.values(nbArticle))
            setDataCat(Object.values(nbArticleCat))

            setDepot(nameDepot)
            setCategorie(categorie)
            setArticle(nbArticle)
            //console.log(nbArticle)
            //console.log(data)
            

            

        })

    },[])

  






    return (
    <div>

    <h1>Dashbored</h1>
    <h3 style={{
        textAlign:'center'
    }}>Depot</h3>
    <div>
    <Bar
    data={{
    labels:depot,
    datasets: [{
        label: '# of Votes',
        data: data,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]    

    }}
    height={300}
    width= {600}
    options={{ maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks:{
                    callback : (val)=>{
                        
                        return val.toString().split(".").length > 1 ? null : parseInt(val)
                    }
                }
            }
        }
     }}


    />  
    </div>
      <h3 style={{
        textAlign:'center'
    }}>Catégorie</h3>
    <div>
    <Doughnut
    data={{
    labels:categorie,
    datasets: [{
        label: '# of Votes',
        data: dataCat,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]    

    }}
    height={300}
    width= {600}
    options={{ maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks:{
                    callback : (val)=>{
                        
                        return val.toString().split(".").length > 1 ? null : parseInt(val)
                    }
                }
            }
        }
     }}
     rootProps={{ 'data-testid': '1' }}


    />  
    </div>

  
            
    



    </div>  );
}
 
export default Dashbored;
