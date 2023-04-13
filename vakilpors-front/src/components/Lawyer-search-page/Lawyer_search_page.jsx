import { useState, useEffect } from 'react';
import Search from './Search';
import { getAlllawyer } from "../../services/userService";
import ShowLawyers from './ShowLawyers';
import { Link } from 'react-router-dom';
import "../../css/Main_ShowLawyer.css";
import axios from "axios";


const Lawyer_search_page = () => {

    const [lawyerdetail, setlawyerdetail] = useState([]);
    const [filteredLawyers, setFilteredLawyers] = useState([]);
    const [LawyerQuery, setLawyerQuery] = useState({ text: "" });
    const url = `https://api.fardissoft.ir/Lawyer/GetAll`;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                console.log('response : ',response);
                response.sort((a, b) => b.Score - a.Score);
                setlawyerdetail(response.data.data);
                setFilteredLawyers(response.data.data);
            } catch (err) {
                console.log(err);
            }


    
        
        };


        fetchData();
    }, []);


    const LawyerSearch = (event) => {
        setLawyerQuery({ ...LawyerQuery, text: event.target.value });
        const allLawyers = lawyerdetail.filter((Lawyer) => {
            return Lawyer.fullname
                .toLowerCase()
                .includes(event.target.value.toLowerCase());
        });
        setFilteredLawyers(allLawyers);
    };


    return (
        <>
            <Search LawyerSearch={LawyerSearch} LawyerQuery={LawyerQuery} />
            <section className="container">
            <div  class="contain">
                <div className="row">
                    {filteredLawyers.length > 0 ? (
                        filteredLawyers.map((Lawyer) => (
                            <ShowLawyers
                                Lawyer={Lawyer}
                            />
                        ))
                    ) : (
                        <div
                            className="text-center py-5"
       
                        >
                            
                        </div>
                    )}
                    </div>
                </div>
            </section>

        </>
    );
};

export default Lawyer_search_page;
