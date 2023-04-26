import { useState, useEffect } from 'react';
import Search from './Search';
import { getAlllawyer } from "../../services/userService";
import ShowLawyers from './ShowLawyers';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import "../../css/Main_ShowLawyer.css";
import axios from "axios";
import { BASE_API_ROUTE } from '../../Constants';


const Lawyer_search_page = () => {

    const [lawyerdetail, setlawyerdetail] = useState([]);
    const [filteredLawyers, setFilteredLawyers] = useState([]);
    const [LawyerQuery, setLawyerQuery] = useState({ text: "" });


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(BASE_API_ROUTE + "Lawyer/GetAll")
            const data = await response.json()
            setlawyerdetail(data.data)
            setFilteredLawyers(data.data)
        };
        fetchData()
    }, [])


    const LawyerSearch = (event) => {
        setLawyerQuery({ ...LawyerQuery, text: event.target.value });
        const allLawyers = lawyerdetail.filter((Lawyer) => {
            return Lawyer.user.name
                .toLowerCase()
                .includes(event.target.value.toLowerCase());
        });
        setFilteredLawyers(allLawyers);
    };


    return (
        <>
            <Helmet>
                <title>Lawyer Search Page</title>
            </Helmet>
            <div class="Main_contain">
                <Search LawyerSearch={LawyerSearch} LawyerQuery={LawyerQuery} />
                <section className="container" >
                    <div class="contain">
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
            </div>
        </>
    );
};

export default Lawyer_search_page;
